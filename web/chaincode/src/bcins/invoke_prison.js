'use strict';

const { Contract } = require('fabric-contract-api');
const moment = require('moment');

// Contract represents the prison contract for managing prisoners
class PrisonContract extends Contract {
  async createContract(ctx, contractData) {
    const {
      uuid,
      contractTypeUUID,
      username,
      password,
      firstName,
      lastName,
      item,
      startDate,
      endDate,
    } = JSON.parse(contractData);

    if (!uuid || !contractTypeUUID || !username || !password || !firstName || !lastName || !item || !startDate || !endDate) {
      throw new Error('Invalid contract data');
    }

    const userKey = ctx.stub.createCompositeKey('USER', [username]);
    const userExists = await ctx.stub.getState(userKey);
    let user;

    if (!userExists) {
      user = {
        username,
        password,
        firstName,
        lastName,
      };
      await ctx.stub.putState(userKey, Buffer.from(JSON.stringify(user)));
    } else {
      user = JSON.parse(userExists.toString('utf8'));
    }

    const contract = {
      username,
      contractTypeUUID,
      item,
      startDate: moment(startDate).toISOString(),
      endDate: moment(endDate).toISOString(),
      void: false,
      claimIndex: [],
    };

    const contractKey = ctx.stub.createCompositeKey('CONTRACT', [username, uuid]);
    await ctx.stub.putState(contractKey, Buffer.from(JSON.stringify(contract)));

    if (!userExists) {
      return {
        username: user.username,
        password: user.password,
      };
    }

    return null;
  }

  async createUser(ctx, userData) {
    const user = JSON.parse(userData);
    if (!user.username || !user.password) {
      throw new Error('Invalid user data');
    }

    const userKey = ctx.stub.createCompositeKey('USER', [user.username]);
    const userExists = await ctx.stub.getState(userKey);

    if (userExists && userExists.length > 0) {
      const existingUser = JSON.parse(userExists.toString('utf8'));
      return {
        username: existingUser.username,
        password: existingUser.password,
      };
    }

    await ctx.stub.putState(userKey, Buffer.from(JSON.stringify(user)));

    return null;
  }
}

module.exports = PrisonContract;
