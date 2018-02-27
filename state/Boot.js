import StartGame from '../init/InitGame';
import Configer from '../config/Configer';
import StateTransition from '../plugins/StateTransition';

class Boot extends Phaser.State {
    constructor () {
        super();
    }

    init () {
        // 设置设备信息
        StartGame.isDesktop = this.game.device.desktop;
        let bootFont = {
                font: '20px GrilledCheeseBTNToasted',
                fill: 'white'
            },
            bootText = this.game.add.text(0, 0, 'preload font', bootFont);
        bootText.destroy();
    }

    preload () {
        this.load.atlasJSONHash('preloader', '/Linkup/assets/graphics/preloader.png', '/Linkup/assets/jsonHash/preloader.json');
    }

    create () {
        this.detectWeakDevice();
        this.game.add.plugin(new StateTransition(this.game));
        this.setupScale();
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = !1;
        this.game.renderer.clearBeforeRender = !1;
        this.state.start('preloader', !0, !1);
    }

    // 判断陈旧的HostBrower
    detectWeakDevice () {
        if (Phaser.Device.isAndroidStockBrowser()) {
            StartGame.isWeakDevice = !0;
            this.game.renderType = Phaser.CANVAS;
        }
    }

    // 缩放设置
    setupScale () {
        StartGame.isDesktop ?
            this.scaleForDesktop() :
            (this.scaleForMobile(),
            this.isLandscape() && this.onEnterLandscape());
    }

    scaleForDesktop () {
        let gamescale = this.game.scale;
        gamescale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // 保持比例缩放
        gamescale.aspectRatio = Configer.GAME_WIDTH / Configer.GAME_HEIGHT; // 设置对应的宽高比
        // canvas居中
        gamescale.pageAlignHorizontally = !0;
        gamescale.pageAlignVertically = !0;
    }

    scaleForMobile () {
        let gamescale = this.game.scale;
        gamescale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        gamescale.forceOrientation(!1, !0); // 默认竖屏
        // 添加屏幕尺寸变化的callback
        gamescale.onSizeChange.add(this.onSizeChange, this);
    }

    onSizeChange () {
        this.isPortrait() ? (
                this.onEnterPortrait()
        ) : this.onEnterLandscape();
    }

    dprScale () {
        let ClientWidth = window.innerWidth,
            ClientHeight = window.innerHeight,
            dprWidth = this.game.device.pixelRatio * ClientWidth,
            canvasWidth = 0,
            canvasHeight = 0;
        dprWidth <= Configer.SOURCE_GAME_WIDTH ? (canvasWidth = ClientWidth * 2,
            canvasHeight = ClientHeight * 2) : (canvasWidth = ClientWidth, canvasHeight = ClientHeight);
        let sourceWidth = Configer.SOURCE_GAME_WIDTH,
            scaling = canvasWidth / sourceWidth;
        this.scale.setGameSize(canvasWidth, canvasHeight); // 改变canvas的尺寸
        Configer.WORLD_SCALE = scaling;
        Configer.GAME_WIDTH = this.game.canvas.width / scaling; // 缩放游戏画布的尺寸
        Configer.GAME_HEIGHT = this.game.canvas.height / scaling;
        Configer.HALF_GAME_WIDTH = Configer.GAME_WIDTH * .5;
        Configer.HALF_GAME_HEIGHT = Configer.GAME_HEIGHT * .5;
        this.game.world.setBounds(0, 0, Configer.GAME_WIDTH, Configer.GAME_HEIGHT); // 不设置bounds范围会导致刷新位置错位
        this.game.world.scale.set(scaling);
        this.game.state.resize(Configer.GAME_WIDTH, Configer.GAME_HEIGHT);
    }

    isLandscape () {
        return window.innerWidth > window.innerHeight;
    }

    isPortrait () {
        return window.innerWidth < window.innerHeight;
    }

    onEnterLandscape () {
        document.getElementById('rotate').style.display = 'block';
    }

    onEnterPortrait () {
        document.getElementById('rotate').style.display = 'none';
    }

    onChangeSize () {
        this.isPortrait() ? (
            this.onEnterPortrait()
        ) : this.onEnterLandscape();
    }

}

export default Boot;