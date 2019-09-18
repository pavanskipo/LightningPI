
const settings = {
    user: '',
    password: '',
    hostname: '127.0.0.1',
    port: '27017',
    db: 'lightningpi'
}

const url = 'mongodb://'+ ((settings['user'] !== '')?
            settings['user'] + ':' + settings['password'] + '@':'') +
            settings['hostname'] +
            ':' + settings['port'] +
            '/' + settings['db'] + 
            '?authSource=admin';

module.exports = url;