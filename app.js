// load env
const dotenv = require('dotenv')
dotenv.config()

// init express
const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
    res.render('index')
})

const server = require('http').Server(app)
const PORT = process.env.PORT || 5000
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
    const target = {'track': 'ﾌﾟｼｭ🍺'}
    const stream = await client.stream('statuses/filter', target)
    stream.on('data', async data => {
        try {
            console.log('ﾌﾟｼｭ detected:', data)
        } catch (err) {
            console.log(err)
        }
    })
}

main()
