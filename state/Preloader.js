import Configer from '../config/Configer';
import StartGame from '../init/InitGame';

class Preloader extends Phaser.State {
    constructor () {
        super();
    }

    init () {
        this.addBackground();
        this.addBgItem();
        this.addPreloadBar();
        this.addLoadingInfo();
        this.addCompanyInfo();
        this.resize();
    }

    preload () {
        this.loadFontAssets();
        this.loadAudio();
        this.loadGraphics();
        this.load.setPreloadSprite(this.innerPreloaderSprite);
    }

    create () {
       this.initMainMusicLoop();
       this.game.changeState('menu', !0);
    }

    loadFontAssets () {
        this.load.bitmapFont('digits', '/Linkup/assets/fonts/font.png', '/Linkup/assets/fonts/font.fnt', null);
    }

    loadAudio () {
        this.load.audio('main_loop', ['/Linkup/assets/audio/MainLoop.ogg', '/Linkup/assets/audio/MainLoop.m4a'], !0);
        this.load.audio('tap', ['/Linkup/assets/audio/tap.wav'], !0);
        this.load.audio('game_over', ['/Linkup/assets/audio/gameOver.ogg', '/Linkup/assets/audio/gameOver.m4a'], !0);
        this.load.audio('bomb', ['/Linkup/assets/audio/bomb.wav'], !0);
        this.load.audio('bingo', ['/Linkup/assets/audio/bingo.mp3'], !0);
        this.load.audio('toggle', ['/Linkup/assets/audio/toggle.ogg', '/Linkup/assets/audio/toggle.m4a'], !0);
        this.load.audio('goal', ['/Linkup/assets/audio/goal.wav'], !0);
        this.load.audio('boot', ['/Linkup/assets/audio/boot.ogg', '/Linkup/assets/audio/boot.m4a'], !0);
    }

    loadGraphics () {
        this.load.image('background', '/Linkup/assets/graphics/gamebg.jpg');
        this.load.image('tutorial', '/Linkup/assets/graphics/tutorial.jpg');
        this.load.image('model_a', '/Linkup/assets/graphics/model_a.png');
        this.load.image('model_b', '/Linkup/assets/graphics/model_b.png');
        this.load.image('close', '/Linkup/assets/graphics/close.png');
        this.load.image('title', '/Linkup/assets/graphics/title.png');
        this.load.image('menuDog', '/Linkup/assets/graphics/menu_jiongdog.png');
        this.load.image('particle', '/Linkup/assets/graphics/particle.png');
        this.load.image('topbar', '/Linkup/assets/graphics/topbar.png');
        this.load.image('timeline', '/Linkup/assets/graphics/timeline.png');;
        this.load.atlasJSONHash('menu', '/Linkup/assets/graphics/menu.png', "/Linkup/assets/jsonHash/menu.json");
        this.load.atlasJSONHash('common', '/Linkup/assets/graphics/common.png', "/Linkup/assets/jsonHash/common.json");
        this.load.atlasJSONHash('jiongdog', '/Linkup/assets/graphics/jiongdog.png', "/Linkup/assets/jsonHash/jiongdog.json");
    }

    initMainMusicLoop () {
        StartGame.mainMusicLoop = this.sound.add('main_loop', StartGame.fullVolume, !0, !0);
        StartGame.mainMusicLoop.touchLocked = !0;
    }

    addBackground () {
        this.bg = this.game.add.image(0, 0, 'preloader', 'BG0000');
    }

    addBgItem () {
        this.item = this.game.add.image(0, 0, 'preloader', 'BG_Items0000');
        this.item.anchor.set(.5);
        this.item.scale.set(1.33);
    }

    addPreloadBar () {
        this.outerPreloaderSprite = this.game.add.image(0, 0, 'preloader', 'Preloader_Back0000');
        this.outerPreloaderSprite.position.set(Configer.HALF_GAME_WIDTH, Configer.HALF_GAME_HEIGHT);
        this.outerPreloaderSprite.anchor.set(.5);
        this.innerPreloaderSprite = this.game.add.image(0, 0, 'preloader', 'Preloader_Front0000');
        this.innerPreloaderSprite.position.set(Configer.HALF_GAME_WIDTH - this.innerPreloaderSprite.width * .5 - 1,
            Configer.HALF_GAME_HEIGHT - this.innerPreloaderSprite.height * .5 - 1);
    }

    addLoadingInfo () {
        let loadingStyle = {
            font: '40px GrilledCheeseBTNToasted',
            fill: '#FFFFFF',
            align: 'center'
        };
        this.loadingText = this.game.add.text(0, 0, '', loadingStyle);
        this.loadingText.anchor.set(.5);
        this.loadingText.setShadow(4, 4, '#999');
        this.loadingText.position.set(Configer.HALF_GAME_WIDTH, Configer.HALF_GAME_HEIGHT + this.outerPreloaderSprite.height + 10);
        this.game.time.events.add(100, () => {
            this.loadingText.setText('loading...');
        });
    }

    loadUpdate () {
        this.loadingText.setText(this.load.progress + '%');
    }

    addCompanyInfo () {
        let info = '技术支持：江苏XXX网络科技有限公司\nwww.3yu.com , 2017';
        let style = {
            font: '26px Verdana',
            fill: '#FFFFFF',
            align: 'center'
        };
        this.copyright = this.game.add.text(0, 0, info, style);
        this.copyright.lineSpacing = 10;
        this.copyright.anchor.set(.5);
        this.copyright.position.set(Configer.HALF_GAME_WIDTH, Configer.GAME_HEIGHT - this.copyright.height);
        this.copyright.setShadow(2, 2, '#333');
    }

    resizeBackground () {
        this.bg.width = Configer.GAME_WIDTH + 1;
        this.bg.height = Configer.GAME_HEIGHT + 1;
    }

    resizeBgItem () {
        this.item.position.set(Configer.HALF_GAME_WIDTH, Configer.HALF_GAME_HEIGHT);
    }

    resize () {
        this.resizeBackground();
        this.resizeBgItem();
    }

    shutdown () {
        this.cache.removeImage('preloader', !0);
    }
}

export default Preloader;