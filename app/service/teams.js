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

  async add(data) {
    const team = await this.app.mysql.insert('teams', data);
    return team;
  }

  async find(name) {
    const team = await this.app.mysql.get('teams', { name });
    return team;
  }
}

module.exports = TeamsService;
