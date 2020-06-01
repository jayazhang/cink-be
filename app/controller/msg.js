'use strict';

const BaseController = require('./BaseController');

class MsgsController extends BaseController {
  async list() {
    const { service, ctx } = this;
    const { teams } = ctx.session.user;
    const { id = 0 } = ctx.request.query;
    const team = teams ? teams.split(',').map(t => +t) : [];
    if (team.length === 0) {
      this.success([]);
      return;
    }
    const msgs = await service.msg.list(team, id);
    this.success(msgs || []);
  }

  async insert() {
    const { service, ctx } = this;
    const { roomId, msg, sendFrom } = ctx.request.body;
    await service.msg.insert({
      room_id: roomId,
      msg,
      send_from: sendFrom,
    });
    this.success();
  }
}

module.exports = MsgsController;
