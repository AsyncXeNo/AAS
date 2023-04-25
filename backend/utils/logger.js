require('colors')
const fs = require('fs')
const path = require('path')

const now = new Date()
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hour = String(now.getHours()).padStart(2, '0');
const minute = String(now.getMinutes()).padStart(2, '0');
const second = String(now.getSeconds()).padStart(2, '0');
const millisecond = String(now.getMilliseconds()).padStart(3, '0')
const dateTimeString = `${year}-${month}-${day}_${hour}:${minute}:${second}.${millisecond}`;
const log_file = path.resolve(`logs/${dateTimeString}.log`)

const log = (msg, level) => {
    
    let colored_msg
    
    switch (level) {
        case 'info':
            colored_msg = `${msg}`.green
            break;

        case 'debug':
            colored_msg = `${msg}`.gray
            break;

        case 'warning':
            colored_msg = `${msg}`.yellow
            break;

        case 'error':
            colored_msg = `${msg}`.red
            break;

        case 'critical':
            colored_msg = `${msg}`.red.bold
            break;

        default:
            break;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const millisecond = String(now.getMilliseconds()).padStart(3, '0')

    const dateTimeString = `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;
    
    console.log(`[${dateTimeString}]`.cyan + ' > ' + colored_msg)

    fs.appendFileSync(log_file, `[${dateTimeString}]` + ' > ' + msg + '\n', (err) => {
        if (err) throw err
    })

}

const info = (msg) => {
    log(msg, 'info')
}

const debug = (msg) => {
    log(msg, 'debug')
}

const warning = (msg) => {
    log(msg, 'warning')
}

const error = (msg) => {
    log(msg, 'error')
}

const critical = (msg) => {
    log(msg, 'critical')
}

module.exports = {
    info,
    debug,
    warning,
    error,
    critical
}