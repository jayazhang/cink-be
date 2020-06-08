'use strict';

const Service = require('egg').Service;
const { v1 } = require('uuid');

class MsgsService extends Service {
  async addComment({ article_id, user_id, content, article_title, user_name }) {
    console.log(v1());
    await this.app.mysql.insert('comment', {
      id: v1(),
      article_id,
      article_title,
      user_id,
      content,
      user_name,
      create_time: new Date(),
    });
  }

  async listOfUserId(id) {
    const list = await this.app.mysql.select('comment', {
      user_id: id,
    });
    return list;
  }

  async listOfArticleId(id) {
    const list = await this.app.mysql.select('comment', {
      article_id: id,
    });
    return list;
  }
}

module.exports = MsgsService;
