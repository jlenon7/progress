const server = require('http').createServer((request, response) => {
    response.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    })

    response.end('Hey there!')
})

const socketIo = require('socket.io')
const io = socketIo(server, {
    cors: {
        origin: '*',
        credentials: false
    }
})

io.on('connection', socket => {
    console.log('Connection', socket.id)

    socket.on('join-room', (roomId, userId) => {
        // Adiciona os usuários na mesma sala
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
        socket.on('disconnect', () => {
            console.log('Disconected', roomId, userId)
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})

const startServer = () => {
    const { address, port } = server.address()
    console.info(`App running at ${address}:${port}`)
}

server.listen(process.env.PORT || 3000, startServer)
