'use strict';
const exec = require('child_process').exec;
const BaseController = require('./BaseController');

class GetController extends BaseController {
  async fe() {
    exec('sh ./shell/test.sh', (a, b) => {
      console.log(a, b);
    });
    this.success({});
  }
}

module.exports = GetController;
