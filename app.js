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
    playPushu()
    io.emit('pushu', 'start')
})

server.listen(PORT, () => {
    console.log(`listening... PORT: ${PORT}`)
})

// init audio
const player = require('play-sound')()
const playPushu = () => {
    const se = path.join(__dirname, 'public/se/pushu.mp3')
    player.play(se, err => {
        if (err) {
            console.log('ERROR:', err)
        }
    })
}

// init twitter
const Twitter = require('twitter')

const client = new Twitter({
    consumer_key:        process.env.CONSUMER_KEY,
    consumer_secret:     process.env.CONSUMER_SECRET,
    access_token_key:    process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const tracking = async () => {
    console.log('start tweet tracking...')

    const target = {'track': 'ﾌﾟｼｭ🍺'}
    const stream = await client.stream('statuses/filter', target)
    stream.on('data', async () => {
        try {
            io.emit('pushu')

            playPushu()
            if (win !== null) {
                win.focus()
            }
        } catch (err) {
            console.log(err)
        }
    })
}


// init electron
const electron = require('electron')
const gadget = electron.app

let win = null
gadget.on('ready', () => {
    win = new electron.BrowserWindow({
        width: 500,
        height: 500,
        transparent: true,
        frame: false,
        toolbar: false
    })
    win.loadURL('http://localhost:5000')
    win.on('closed', () => win = null)

    tracking()
})
gadget.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        gadget.quit()
    }
})

