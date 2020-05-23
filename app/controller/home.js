'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // await this.app.mysql.insert('users', { username: 'zhangjiayu', password: '123', nickname: '张家裕' });
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
