/*
* @ Author: kunnisser
* @ Date: 2017-09-14
* */

import ConfigCreator from '../config/ConfigCreator';
import Boot from '../state/Boot';
import Preloader from '../state/Preloader';
import Menu from '../state/MainMenu';
import Level from '../state/Level';
import Share from '../state/Share';

class Game extends Phaser.Game {
    constructor () {
        let conf = ConfigCreator.createConfig();
        super(conf);
        this.isTopFrame() && (
            this.state.add('boot', Boot, !0),
            this.state.add('preloader', Preloader, !1),
            this.state.add('menu', Menu, !1),
            this.state.add('level', Level, !1),
            this.state.add('share', Share, !1)
        );
    }

    isAllowDomain () {
        let netHandle = new Phaser.Net();
        let allowDomainArr = Game.development ? ['192.168.0.187', 'localhost'] : ['kuni.applinzi.com'];
        return allowDomainArr.some((domain) => {
            return netHandle.checkDomainName(domain);
        });
    }

    isTopFrame () {
        try {
            return window.self === window.top;
        }
        catch (e) {
            return !1;
        }
    }

    changeState (nextLev, obj) {
        this.plugins.plugins[0].changeState(nextLev, obj);
    }

    static development = !0;

    static isDesktop = !1;

    static isWeakDevice = !1;

    static canPlay = !0;

    static fullVolume = .25;

    static api = Game.development ? '' : 'http://www.me2u.com.cn';
}

export default Game;