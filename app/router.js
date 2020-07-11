'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = async app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/hooks/fe', controller.hooks.fe);
  router.post('/api/hooks/fe', controller.hooks.fe);

  router.get('/api/tags', controller.tags.list);
  router.post('/api/tags/set', controller.tags.setTag);

  router.get('/api/teams', controller.teams.list);
  router.post('/api/teams/set', controller.teams.setTeam);
  router.post('/api/teams/add', controller.teams.createTeam);
  router.post('/api/teams/join', controller.teams.joinTeam);

  router.post('/api/news/inset', controller.news.insetNews);
  router.get('/api/news/list', controller.news.list);
  router.get('/api/news/detail', controller.news.detail);
  router.get('/api/news/delete', controller.news.delete);

  router.post('/api/msg/insert', controller.msg.insert);
  router.get('/api/msg/list', controller.msg.list);

  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/isLogin', controller.user.isLogin);

  router.get('/api/comment/list/article', controller.comment.getListByArticleId);
  router.get('/api/comment/list/user', controller.comment.getListByUserId);
  router.post('/api/comment/add', controller.comment.addComment);

};
