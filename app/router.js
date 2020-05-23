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

  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/auth/isLogin', controller.user.isLogin);
};
