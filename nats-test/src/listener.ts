import nats from 'node-nats-streaming'; 
import { TicketCreatedListener } from './events/ticket-created-listener'

console.clear()

let randomId = getRandomAlphaNumeric(5)

const stan = nats.connect('ticketing', randomId, {
    url: 'http://localhost:4222'
})

stan.on('connect', () => {
    console.log('Listener connected to NATS')

    stan.on('close', () =>{
        console.log('NATS connection closed!')
        process.exit()
    })

    new TicketCreatedListener(stan).listen()
})

process.on('SIGINT', ()=> stan.close())
process.on('SIGTERM', ()=> stan.close())

function getRandomAlphaNumeric(length: number) {
    let alpha = 'abcdefghijklmnopqrstuvwxyz'
    let alphaArr: String[] = alpha.split('')
    let numeric = '0123456789'
    let numericArr: String[] = numeric.split('')
    let alphaNum = ''

    for (let i = 0; i < length; i++) {
        let choose = Math.floor(Math.random() * 3);
        if (choose == 1) {
            //alpha
            choose = Math.floor(Math.random() * alpha.length + 1)
            alphaNum += alphaArr[i]
        } else {
            //numeric
            choose = Math.floor(Math.random() * numeric.length + 1)
            alphaNum += numericArr[i]
        }
    }
    return alphaNum
}