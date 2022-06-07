import Fastify from "fastify";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || '3333';

const fastify = Fastify({
    logger: true
})

fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

fastify.listen(PORT, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
})