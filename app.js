const fastify = require('fastify')();
require('dotenv').config();
const { jwtCheck } = require( './middleware/jwtCheck');

const routes = require('./routes/routing');
routes.forEach((route, index) => {
  fastify.route(route)
})
fastify.addHook('preHandler', (req, res, next) => {
  jwtCheck(req,res,next);
});
fastify.register(require("fastify-cors"), {
  origin: '*',
  methods: ["POST", 'GET', 'PUT', 'DELETE']
});

// Run the server!
fastify.listen(4000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})