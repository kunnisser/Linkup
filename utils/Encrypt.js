import h from 'crypto-js/hmac-sha1';

class Encrypt {
    constructor () {};

    init (val) {
        return h(val.toString(), 'phaser.tween').toString();
    }
}

export default Encrypt;