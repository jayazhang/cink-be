/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589787038656_7733';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    allowHeaders: '*',
    credentials: true,
  };

  const mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '104.224.185.153',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '1991zhaNG!',
      // 数据库名
      database: 'cink',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
    mysql,
    middleware: [ 'auth' ],
    security: {
      xframe: {
        enable: false,
      },
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      domainWhiteList: [
        'http://localhost:8080',
        'http://192.168.3.6:8080',
        'http://www.cink.club:8088',
        'http://cink.club:8088',
      ],
    },
  };
};
