'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    const whiteUrls = [
      '/api/user/login',
      '/api/user/register',
      '/api/auth/isLogin',
    ];

    // 如果ctx.url在白名单中
    const isWhiteUrl = whiteUrls.some(whiteUrl => ctx.url.startsWith(whiteUrl));

    if (!isWhiteUrl) {
      console.log('authLogin', ctx.session.user);
      if (!ctx.session.user) {
        ctx.error({
          success: false,
          status: 0,
        }); // 让用户去登录
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