// load env
const dotenv = require('dotenv')
dotenv.config()

// init express
const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})

// init http server
const server = require('http').Server(app)
const PORT = process.env.PORT || 5000

// init socket io
const io = require('socket.io')(server)
io.on('connection', () => {
    io.emit('pushu', 'start')
})

server.listen(PORT, () => {
    console.log(`listening... PORT: ${PORT}`)
})

// init twitter
const Twitter = require('twitter')

const client = new Twitter({
    consumer_key:        process.env.CONSUMER_KEY,
    consumer_secret:     process.env.CONSUMER_SECRET,
    access_token_key:    process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const main = async () => {
    console.log('tweet tracking')
    const target = {'track': 'ﾌﾟｼｭ🍺'}
    const stream = await client.stream('statuses/filter', target)
    stream.on('data', async data => {
        try {
            io.emit('pushu')
            console.log('ﾌﾟｼｭ detected:', data)
        } catch (err) {
            console.log(err)
        }
    })
}

main()
