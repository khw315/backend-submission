const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes); // Use server.route() instead of server.routes()

  await server.start();
  console.log(`Layanan API berjalan pada ${server.info.uri}`);
};

init();
