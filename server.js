var Hapi = require('hapi')
  , Inert = require('inert')
  , Good = require('good')
  , GoodConsole = require('good-console')
  , server
;

server = new Hapi.Server();

server.connection({ port: 3000 });

server.register(Inert, function (error) {

  if (error) {
    throw error;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./public/index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: 'public/images'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/data.json',
    handler: function (request, reply) {
      reply.file('./data.json');
    }
  });

  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: 'public/assets'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public/'
      }
    }
  });

});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: GoodConsole,
      events: {response: '*', log: '*'}
    }]
  }
}, function (error) {
  if (error) throw error;
  server.start(function () {
    server.log('info', 'Server running at:', server.info.uri);
  });
});