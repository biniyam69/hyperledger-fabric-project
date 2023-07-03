'use strict';

const { Contract } = require('fabric-contract-api');

class InvestigatorContract extends Contract {
  
  async createInvestigation(ctx, id, caseNumber, description) {
    const investigationExists = await this.investigationExists(ctx, id);
    if (investigationExists) {
      throw new Error(`Investigation ${id} already exists`);
    }

    const investigation = {
      id,
      caseNumber,
      description,
      status: 'Open',
      evidence: [],
      investigators: [],
    };

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(investigation)));
    return 'Investigation created successfully';
  }

  async getInvestigation(ctx, id) {
    const investigationAsBytes = await ctx.stub.getState(id);
    if (!investigationAsBytes || investigationAsBytes.length === 0) {
      throw new Error(`Investigation ${id} does not exist`);
    }

    return investigationAsBytes.toString();
  }

  async addEvidence(ctx, id, evidence) {
    const investigationAsBytes = await ctx.stub.getState(id);
    if (!investigationAsBytes || investigationAsBytes.length === 0) {
      throw new Error(`Investigation ${id} does not exist`);
    }

    const investigation = JSON.parse(investigationAsBytes.toString());
    investigation.evidence.push(evidence);

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(investigation)));
    return 'Evidence added to investigation successfully';
  }

  async assignInvestigator(ctx, id, investigator) {
    const investigationAsBytes = await ctx.stub.getState(id);
    if (!investigationAsBytes || investigationAsBytes.length === 0) {
      throw new Error(`Investigation ${id} does not exist`);
    }

    const investigation = JSON.parse(investigationAsBytes.toString());
    investigation.investigators.push(investigator);

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(investigation)));
    return 'Investigator assigned to investigation successfully';
  }

  async changeInvestigationStatus(ctx, id, status) {
    const investigationAsBytes = await ctx.stub.getState(id);
    if (!investigationAsBytes || investigationAsBytes.length === 0) {
      throw new Error(`Investigation ${id} does not exist`);
    }

    const investigation = JSON.parse(investigationAsBytes.toString());
    investigation.status = status;

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(investigation)));
    return 'Investigation status changed successfully';
  }

  async investigationExists(ctx, id) {
    const investigationAsBytes = await ctx.stub.getState(id);
    return investigationAsBytes && investigationAsBytes.length > 0;
  }
}

module.exports = InvestigatorContract;
