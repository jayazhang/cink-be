'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findUser(params) {
    const user = await this.app.mysql.get('users', params);
    return user;
  }
}

module.exports = UserService;
