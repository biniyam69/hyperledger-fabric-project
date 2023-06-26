'use strict';

const { Contract } = require('fabric-contract-api');

class CriminalRecord {
    constructor(obj) {
        Object.assign(this, obj);
    }
}

class CriminalRecordContract extends Contract {

  async initLedger(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    
    const records = [
        {
            id: 'record1',
            firstName: 'Abebe',
            lastName: 'Kebede',
            offenses: [],
            convictions: [],
            acquittals: [],
            investigations: []
        },
        {
            id: 'Travis',
            firstName: 'Scott',
            lastName: 'Doe',
            offenses: [],
            convictions: [],
            acquittals: [],
            investigations: []
        },
        // Add more records as needed
    ];

    for (let i = 0; i < records.length; i++) {
        records[i].docType = 'record';
        await ctx.stub.putState(records[i].id, Buffer.from(JSON.stringify(records[i])));
        console.info('Added <--> ', records[i]);
    }

    console.info('============= END : Initialize Ledger ===========');
}


    async createRecord(ctx, recordId, record) {
        console.info('============= START : Create Record ===========');
        const data = new CriminalRecord(JSON.parse(record));
        await ctx.stub.putState(recordId, Buffer.from(JSON.stringify(data)));
        console.info('============= END : Create Record ===========');
    }

    async getRecord(ctx, recordId) {
        console.info('============= START : Get Record ===========');
        const recordAsBytes = await ctx.stub.getState(recordId); 
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${recordId} does not exist`);
        }
        console.info('============= END : Get Record ===========');
        return recordAsBytes.toString();
    }

    async updateRecord(ctx, recordId, newRecord) {
        console.info('============= START : Update Record ===========');
        const record = new CriminalRecord(JSON.parse(newRecord));
        await ctx.stub.putState(recordId, Buffer.from(JSON.stringify(record)));
        console.info('============= END : Update Record ===========');
    }

    async deleteRecord(ctx, recordId) {
        console.info('============= START : Delete Record ===========');
        await ctx.stub.deleteState(recordId);
        console.info('============= END : Delete Record ===========');
    }

    async addOffense(ctx, recordId, offense) {
        console.info('============= START : Add Offense ===========');
        const recordAsBytes = await ctx.stub.getState(recordId); 
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${recordId} does not exist`);
        }
        const record = JSON.parse(recordAsBytes.toString());
        record.offenses.push(offense);
        await ctx.stub.putState(recordId, Buffer.from(JSON.stringify(record)));
        console.info('============= END : Add Offense ===========');
    }

    async addConviction(ctx, recordId, conviction) {
      console.info('============= START : Add Conviction ===========');
      
      const recordAsBytes = await ctx.stub.getState(recordId); 
      if (!recordAsBytes || recordAsBytes.length === 0) {
          throw new Error(`${recordId} does not exist`);
      }
      const record = JSON.parse(recordAsBytes.toString());
      record.convictions.push(conviction);
      await ctx.stub.putState(recordId, Buffer.from(JSON.stringify(record)));
  
      console.info('============= END : Add Conviction ===========');
  }
  
  async addAcquittal(ctx, recordId, acquittal) {
      console.info('============= START : Add Acquittal ===========');
      
      const recordAsBytes = await ctx.stub.getState(recordId); 
      if (!recordAsBytes || recordAsBytes.length === 0) {
          throw new Error(`${recordId} does not exist`);
      }
      const record = JSON.parse(recordAsBytes.toString());
      record.acquittals.push(acquittal);
      await ctx.stub.putState(recordId, Buffer.from(JSON.stringify(record)));
  
      console.info('============= END : Add Acquittal ===========');
  }
  
  async addInvestigation(ctx, recordId, investigation) {
      console.info('============= START : Add Investigation ===========');
      
      const recordAsBytes = await ctx.stub.getState(recordId); 
      if (!recordAsBytes || recordAsBytes.length === 0) {
          throw new Error(`${recordId} does not exist`);
      }
      const record = JSON.parse(recordAsBytes.toString());
      record.investigations.push(investigation);
      await ctx.stub.putState(recordId, Buffer.from(JSON.stringify(record)));
  
      console.info('============= END : Add Investigation ===========');
  }
  
}

module.exports = CriminalRecordContract;
