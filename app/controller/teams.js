'use strict';

const BaseController = require('./BaseController');

class TeamsController extends BaseController {
  async list() {
    const { service } = this;
    const teams = await service.teams.list();

    this.success(teams || []);
  }

  async setTeam() {
    const { service, ctx } = this;
    await service.teams.set(ctx.session.user.id, ctx.request.body.ids);
    this.success();
  }
}

module.exports = TeamsController;