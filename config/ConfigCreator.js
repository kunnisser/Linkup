import Config from './Configer';

class ConfigCreator {
    constructor () {};
    static createConfig () {
        let w = Config.GAME_WIDTH;
        let h = Config.GAME_HEIGHT;
        return {
            width: w,
            height: h,
            renderer: Phaser.AUTO,
            antialias: !0,
            enableDebug: !1
        };
    };
}

export default ConfigCreator;