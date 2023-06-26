'use strict';

const { Contract } = require('fabric-contract-api');

class Prisoner {
    constructor(obj) {
        Object.assign(this, obj);
    }
}

class PrisonContract extends Contract {

    async createPrisoner(ctx, prisonerId, prisoner) {
        console.info('============= START : Create Prisoner ===========');
        const data = new Prisoner(JSON.parse(prisoner));
        await ctx.stub.putState(prisonerId, Buffer.from(JSON.stringify(data)));
        console.info('============= END : Create Prisoner ===========');
    }

    async getPrisoner(ctx, prisonerId) {
        console.info('============= START : Get Prisoner ===========');
        const prisonerAsBytes = await ctx.stub.getState(prisonerId); 
        if (!prisonerAsBytes || prisonerAsBytes.length === 0) {
            throw new Error(`${prisonerId} does not exist`);
        }
        console.info('============= END : Get Prisoner ===========');
        return prisonerAsBytes.toString();
    }

    async updatePrisoner(ctx, prisonerId, newPrisoner) {
        console.info('============= START : Update Prisoner ===========');
        const prisoner = new Prisoner(JSON.parse(newPrisoner));
        await ctx.stub.putState(prisonerId, Buffer.from(JSON.stringify(prisoner)));
        console.info('============= END : Update Prisoner ===========');
    }

    async deletePrisoner(ctx, prisonerId) {
        console.info('============= START : Delete Prisoner ===========');
        await ctx.stub.deleteState(prisonerId);
        console.info('============= END : Delete Prisoner ===========');
    }

    async addSentence(ctx, prisonerId, sentence) {
      console.info('============= START : Add Sentence ===========');
      const prisonerAsBytes = await ctx.stub.getState(prisonerId); 
      if (!prisonerAsBytes || prisonerAsBytes.length === 0) {
          throw new Error(`${prisonerId} does not exist`);
      }
      const prisoner = JSON.parse(prisonerAsBytes.toString());
      prisoner.sentences.push(sentence);
      await ctx.stub.putState(prisonerId, Buffer.from(JSON.stringify(prisoner)));
      console.info('============= END : Add Sentence ===========');
  }

  async releasePrisoner(ctx, prisonerId) {
      console.info('============= START : Release Prisoner ===========');
      const prisonerAsBytes = await ctx.stub.getState(prisonerId); 
      if (!prisonerAsBytes || prisonerAsBytes.length === 0) {
          throw new Error(`${prisonerId} does not exist`);
      }
      const prisoner = JSON.parse(prisonerAsBytes.toString());
      prisoner.status = 'Released';
      await ctx.stub.putState(prisonerId, Buffer.from(JSON.stringify(prisoner)));
      console.info('============= END : Release Prisoner ===========');
  }

}

module.exports = PrisonContract;
