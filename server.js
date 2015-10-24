var Hapi = require('hapi')
  , Inert = require('inert')
  , Good = require('good')
  , GoodConsole = require('good-console')
  , server
;

server = new Hapi.Server();

server.connection({ port: 3030 });

server.route({
  method: 'GET',
  path: '/images/{image}',
  handler: function (request, reply) {

  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.file('./public/index.html');
  }
});

server.register({ register: Inert });

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