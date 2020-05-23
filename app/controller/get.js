'use strict';

const BaseController = require('./BaseController');

class GetController extends BaseController {
  async list() {
    console.log(this.ctx.request.header.token);
    console.log(this.ctx.session, 'session');
    this.success(this.ctx.session);
  }

  async tags() {
    const { service } = this;
    const tags = await service.tags.list();

    this.success(tags || []);
  }
}

module.exports = GetController;
