const fastify = require('fastify')();
require('dotenv').config();
const { jwtCheck } = require('./middleware/jwtCheck');
const routes = require('./routes/routing');
routes.forEach((route, index) => {
  try {
    fastify.route(route)
  } catch (err) {
    console.log('[route registration failure]', err, index)
  }
})
fastify.addHook('preHandler', (req, res, next) => {
  jwtCheck(req, res, next);
});
fastify.register(require("fastify-cors"), {
  origin: '*',
  methods: ["POST", 'GET', 'PUT', 'DELETE']
});
// Run the server!
fastify.listen(4000,"0.0.0.0", function (err, address) {
  console.log({err,address})
  if (err) {
    console.log('somme error pa in server', err)
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${address}`)
})