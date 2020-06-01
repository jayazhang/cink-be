'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    const whiteUrls = [
      '/api/user/login',
      '/api/user/register',
      '/api/user/isLogin',
      '/api/news/inset',
      '/api/news/list',
      '/api/news/detail',
      '/api/news/delete',
    ];

    // 如果ctx.url在白名单中
    const isWhiteUrl = whiteUrls.some(whiteUrl => ctx.url.startsWith(whiteUrl));

    if (!isWhiteUrl) {
      console.log('authLogin', ctx.session.user);
      if (!ctx.session.user) {
        ctx.redirct('/user/login'); // 让用户去登录
      } else {
        console.log('auth ok');
        await next();
      }
    } else {
      // 白名单
      console.log('white url');
      await next();
    }
  };
};
