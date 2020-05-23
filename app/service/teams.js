'use strict';

const Service = require('egg').Service;

class TeamsService extends Service {
  async list() {
    const teams = await this.app.mysql.select('teams');
    return teams;
  }

  async set(userId, teamsIds) {
    await this.app.mysql.update('users', { id: userId, teams: teamsIds });
  }
}

module.exports = TeamsService;
