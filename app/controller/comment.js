'use strict';

const BaseController = require('./BaseController');

class CommentController extends BaseController {
  async addComment() {
    const { service, ctx } = this;
    const data = ctx.request.body;
    await service.comment.addComment({
      ...data,
      user_id: ctx.session.user.id,
      user_name: ctx.session.user.username,
    });
    this.success();
  }

  async getListByUserId() {
    const list = await this.service.comment.listOfUserId(
      this.ctx.session.user.id
    );
    this.success(list);
  }

  async getListByArticleId() {
    const list = await this.service.comment.listOfArticleId(
      this.ctx.request.query.id
    );
    this.success(list);
  }
}

module.exports = CommentController;
