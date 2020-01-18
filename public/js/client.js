'use strict'

const main = () => {
    const socket = io()
    socket.on('pushu', msg => {
        console.log('ﾌﾟｼｭ received')
    })
}

main()
