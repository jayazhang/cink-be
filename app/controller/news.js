'use strict';
const moment = require('moment');
const BaseController = require('./BaseController');

class NewsController extends BaseController {
  async delete() {
    const { service } = this;
    await service.news.delete(1000);
  }
  async detail() {
    const { service, ctx } = this;
    const tags = await service.tags.list();
    const news = await service.news.getDetailById(+ctx.request.query.id);
    news.createTime = moment(news.create_time).format('yyyy-MM-DD');
    tags.forEach(tag => {
      if (tag.id === +news.tag_id) {
        news.tagName = tag.name;
      }
    });
    this.success(news);
  }

  async list() {
    const { service, ctx } = this;
    const { limit = 10, offset = 0 } = ctx.request.query;
    const tags = ctx.session.user.tags.split(',');
    let news = await service.news.list(+limit, +offset, {
      tag_id: tags,
    });
    news = news.map(item => {
      tags.forEach(tag => {
        if (+tag.id === +item.tag_id) {
          item.tagName = tag.name;
        }
      });
      item.createTime = moment(item.create_time).format('yyyy-MM-DD');
      return item;
    });
    this.success(news || []);
  }

  async insetNews() {
    const {
      ctx,
      service,
    } = this;
    const {
      auth,
      title,
      tagId,
      content,
      poster,
      intro,
    } = ctx.request.body;
    await service.news.inset({
      title,
      auth,
      tag_id: tagId,
      content,
      poster,
      intro,
      create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    this.success();
  }
}

module.exports = NewsController;
