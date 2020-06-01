'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async delete() {
    for (let i = 1; i < 100; i++) {
      await this.app.mysql.delete('article', { id: i });
    }
  }
  async getDetailById(id) {
    const news = await this.app.mysql.get('article', { id });
    return news;
  }

  async list(limit, offset, where) {
    const news = await this.app.mysql.select('article', {
      where,
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
