import fastify from 'fastify'
import dotenv from 'dotenv';
import { appRoutes } from './routes';
import { prismaPlugin } from './plugins';

dotenv.config();

const PORT = process.env.PORT || '8080';

const server = fastify({
    logger: true
})

server.register(prismaPlugin)
server.register(appRoutes, { prefix: '/web' })

server.listen(PORT, function (err, address) {
    if (err) {
        server.log.error(err)
        process.exit(1)
    } else {
        console.log(`[SERVER INFO] Server is listening on ${address}`);
    }
})
