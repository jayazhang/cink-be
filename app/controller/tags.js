'use strict';

const BaseController = require('./BaseController');

class TagsController extends BaseController {
  async list() {
    const { service } = this;
    const tags = await service.tags.list();

    this.success(tags || []);
  }

  async setTag() {
    const { service, ctx } = this;
    await service.tags.set(ctx.session.user.id, ctx.request.body.ids);
    this.success();
  }
}

module.exports = TagsController;
