'use strict'

const main = () => {
    const socket = io()
    socket.on('pushu', () => {
        const beer = document.querySelector('img')
        beer.classList.toggle('pushu')
    })
}

main()
