const Twitter = require('twitter')

const dotenv = require('dotenv')
dotenv.config()

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
