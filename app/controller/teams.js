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
    const user = await service.user.findUser({ id: ctx.session.user.id });
    ctx.session.user = user;
    this.success();
  }

  async joinTeam() {
    const { service, ctx } = this;
    const { name } = ctx.request.body;
    const team = await service.teams.find(name);
    if (!team) {
      this.error('this group is not exist');
      return;
    }
    const user = await service.user.findUser({ id: ctx.session.user.id });
    user.teams = user.teams
      ? user.teams.split(',').concat([ team.id ]).join(',')
      : `${team.id}`;
    await service.teams.set(
      ctx.session.user.id,
      user.teams
    );
    ctx.session.user = user;
    const teams = await service.teams.list();
    const teamArr = user.teams.split(',').map(i => +i);
    this.success(teams.filter(item => teamArr.indexOf(item.id) > -1));
  }

  async createTeam() {
    const { service, ctx } = this;
    const { name } = ctx.request.body;
    let team = await service.teams.find(name);
    if (team) {
      this.error('this group is exist');
      return;
    }
    await service.teams.add({ name });
    team = await service.teams.find(name);
    const user = await service.user.findUser({ id: ctx.session.user.id });
    user.teams = user.teams
      ? user.teams.split(',').concat([ team.id ]).join(',')
      : `${team.id}`;
    await service.teams.set(
      ctx.session.user.id,
      user.teams
    );
    ctx.session.user = user;
    const teams = await service.teams.list();
    const teamArr = user.teams.split(',').map(i => +i);
    this.success(teams.filter(item => teamArr.indexOf(item.id) > -1));
  }
}

module.exports = TeamsController;
