'use strict';

const Service = require('egg').Service;

class TagsService extends Service {
  async list() {
    const tags = await this.app.mysql.select('tags');
    return tags;
  }

  async set(userId, tagIds) {
    await this.app.mysql.update('users', { id: userId, tags: tagIds });
  }
}

module.exports = TagsService;
