
import path from 'path'

import Hapi from 'hapi'
import Inert from 'inert'

import SocketIO from 'socket.io'

const [ ,, port ] = process.argv

const server = Hapi.server({
	port: port || process.env.PORT || 8000,
	routes: {
		files: {
			relativeTo: path.resolve(__dirname, '../public')
		}
	}
})

const io = SocketIO.listen(server.listener)

const api = {}

server.register(Inert).then(() => {

	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: '.',
				redirectToSlash: true,
				index: true,
			}
		}
	})

	server.route({
		method: 'GET',
		path: '/api/{route*}',
		handler: ({ params: { route }, query }, h) => {
			if (route) {
				const p = route.replace(/\//g, '.')
				const m = get(p)(api)
				if (m) {
					return m({ query }).then(res => h.response(res))
				}
				else {
					console.log('ROUTE NOT FOUND!\n', m, p, api)
				}
			}
			else {
				console.log('ROUTE NOT FOUND 2!\n', route)
			}
			return h.response().code(404)
		}
	})

	return server.start()

}).then(() => console.log('server up at:', server.info.uri))
