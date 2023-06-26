const { Contract } = require('fabric-contract-api');

class CourtContract extends Contract {
  async instantiate(ctx) {
    console.log('Court Contract Instantiated');
  }

  async createCase(ctx, caseNumber, caseDetails) {
    const caseExists = await this.caseExists(ctx, caseNumber);
    if (caseExists) {
      throw new Error(`Case ${caseNumber} already exists`);
    }

    const courtCase = {
      caseNumber,
      caseDetails,
      status: 'Open',
      createdAt: new Date(),
      updatedAt: new Date(),
      parties: [],
      hearings: [],
    };

    await ctx.stub.putState(caseNumber, Buffer.from(JSON.stringify(courtCase)));
    return 'Case created successfully';
  }

  async getCase(ctx, caseNumber) {
    const caseAsBytes = await ctx.stub.getState(caseNumber);
    if (!caseAsBytes || caseAsBytes.length === 0) {
      throw new Error(`Case ${caseNumber} does not exist`);
    }

    return caseAsBytes.toString();
  }

  async updateCaseStatus(ctx, caseNumber, newStatus) {
    const caseAsBytes = await ctx.stub.getState(caseNumber);
    if (!caseAsBytes || caseAsBytes.length === 0) {
      throw new Error(`Case ${caseNumber} does not exist`);
    }

    const courtCase = JSON.parse(caseAsBytes.toString());
    courtCase.status = newStatus;
    courtCase.updatedAt = new Date();

    await ctx.stub.putState(caseNumber, Buffer.from(JSON.stringify(courtCase)));
    return 'Case status updated successfully';
  }

  async addPartyToCase(ctx, caseNumber, partyName) {
    const caseAsBytes = await ctx.stub.getState(caseNumber);
    if (!caseAsBytes || caseAsBytes.length === 0) {
      throw new Error(`Case ${caseNumber} does not exist`);
    }

    const courtCase = JSON.parse(caseAsBytes.toString());
    courtCase.parties.push(partyName);
    courtCase.updatedAt = new Date();

    await ctx.stub.putState(caseNumber, Buffer.from(JSON.stringify(courtCase)));
    return `Party ${partyName} added to case ${caseNumber}`;
  }

  async scheduleHearing(ctx, caseNumber, hearingDate, hearingLocation) {
    const caseAsBytes = await ctx.stub.getState(caseNumber);
    if (!caseAsBytes || caseAsBytes.length === 0) {
      throw new Error(`Case ${caseNumber} does not exist`);
    }

    const courtCase = JSON.parse(caseAsBytes.toString());
    const hearing = {
      date: hearingDate,
      location: hearingLocation,
    };
    courtCase.hearings.push(hearing);
    courtCase.updatedAt = new Date();

    await ctx.stub.putState(caseNumber, Buffer.from(JSON.stringify(courtCase)));
    return `Hearing scheduled for case ${caseNumber}`;
  }

  async getCaseParties(ctx, caseNumber) {
    const caseAsBytes = await ctx.stub.getState(caseNumber);
    if (!caseAsBytes || caseAsBytes.length === 0) {
      throw new Error(`Case ${caseNumber} does not exist`);
    }

    const courtCase = JSON.parse(caseAsBytes.toString());
    return courtCase.parties;
  }

  async getCaseHearings(ctx, caseNumber) {
    const caseAsBytes = await ctx.stub.getState(caseNumber);
    if (!caseAsBytes || caseAsBytes.length === 0) {
      throw new Error(`Case ${caseNumber} does not exist`);
    }

    const courtCase = JSON.parse(caseAsBytes.toString());
    return courtCase.hearings;
  }

  async getAllCases(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    const allCases = [];

    while (true) {
      const res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        const courtCase = JSON.parse(res.value.value.toString());
        allCases.push(courtCase);
      }

      if (res.done) {
        await iterator.close();
        return allCases;
      }
    }
  }

  async caseExists(ctx, caseNumber) {
    const caseAsBytes = await ctx.stub.getState(caseNumber);
    return caseAsBytes && caseAsBytes.length > 0;
  }
}

module.exports = CourtContract;
