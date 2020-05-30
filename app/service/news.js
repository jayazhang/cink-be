'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async getDetailById(id) {
    const news = await this.app.mysql.get('article', { id });
    return news;
  }

  async list(limit, offset) {
    const news = await this.app.mysql.select('article', {
      orders: [ 'create_time' ],
      limit,
      offset,
    });
    return news.map(item => {
      delete item.content;
      return item;
    });
  }

  async inset(data) {
    await this.app.mysql.insert('article', data);
  }
}

module.exports = NewsService;
