'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = async app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/tags', controller.tags.list);
  router.post('/api/tags/set', controller.tags.setTag);

  router.get('/api/teams', controller.teams.list);
  router.post('/api/teams/set', controller.teams.setTeam);

  router.post('/api/news/inset', controller.news.insetNews);
  router.get('/api/news/list', controller.news.list);
  router.get('/api/news/detail', controller.news.detail);

  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/isLogin', controller.user.isLogin);
};
