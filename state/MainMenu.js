import Game from '../init/InitGame';
import Configer from '../config/Configer';
import SimpleButton from '../Gui/SimpleButton';

class MainMenu extends Phaser.State {
    constructor () {
        super();
    }

    init (obj) {
        this.fromPreload = obj.param;
        this.overlay = obj.overlay;
    }

    create () {
        this.addMainBg();
        this.addLogo();
        this.addTitle();
        this.addTutorialBtn();
        this.addJiongDog();
        this.addStartBtn();
        this.addTutorial();
        this.resize();
        this.hideOverlay();
        this.fromPreload && this.handleMusicOnStart();
    }

    handleMusicOnStart () {
        this.startMusic();
    }

    startMusic () {
        Game.mainMusicLoop && Game.mainMusicLoop.play();
    }

    addMainBg () {
       this.mainBg = this.game.add.image(0, 0, 'background', this.world);
    }

    addLogo () {
        this.decorate = this.game.add.image(0, 0, 'menu', 'decorate.png', this.world);
        this.decorate.anchor.set(.5);
        this.decorate.alpha = .5;
        this.game.add.tween(this.decorate).to({
            alpha: 0.2
        }, 800, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e3, !0);
        this.logo = this.game.add.image(0, 0, 'menu', 'logo.png', this.world);
        this.logo.position.set(Configer.HALF_GAME_WIDTH, this.logo.height * .5);
        this.decorate.position.set(this.logo.x, this.logo.y);
        this.logo.anchor.set(.5);
    }

    addTitle () {
        this.title = this.game.add.image(0, 0, 'title', this.world);
        this.title.anchor.set(.5);
        this.title.position.set(Configer.HALF_GAME_WIDTH, Configer.HALF_GAME_HEIGHT - this.title.height * .5);
    }

    addTutorialBtn () {
        this.tutorialBtn = new SimpleButton(this.game, 0, 0, 'menu', 'tutorialBtn.png');
        this.tutorialBtn.setCallbackDelay(100);
        this.tutorialBtn.position.set(this.title.x + (this.tutorialBtn.width - this.title.width) * .5 + 50,
            this.title.y + (this.title.height - this.tutorialBtn.height) * .5);
        this.time.events.repeat(1800, Number.MAX_VALUE, () => {
            this.game.add.tween(this.tutorialBtn.scale).to({
                x: 1.05,
                y: .95
            }, 150, Phaser.Easing.Cubic.InOut, !0, 0, 2, !0);
        });
        this.tutorialBtn.callback.add(() => {
            this.game.device.webAudio && this.sound.play('tap');
            this.tutorialGroup.visible = !0;
        });
        this.world.add(this.tutorialBtn);
    }

    addStartBtn () {
        this.startBtn = new SimpleButton(this.game, 0, 0, 'menu', 'start.png');
        this.startBtn.setCallbackDelay(100);
        this.startBtn.callback.addOnce(() => {
            this.game.device.webAudio && this.sound.play('tap');
            Game.canPlay ? this.game.changeState('level', !0) : this.game.changeState('share', !0);
        });
        this.world.add(this.startBtn);
        this.startBtn.position.set(Configer.HALF_GAME_WIDTH, this.title.y + this.title.height * .5 + 100);
    }

    addJiongDog () {
        this.emitter = this.game.add.emitter(0, 0, 100, 100);
        this.jiongdog = this.game.add.image(0, 0, 'menuDog', this.world);
        this.jiongdog.anchor.set(.5);
        this.jiongdog.position.set(Configer.HALF_GAME_WIDTH, - this.jiongdog.height * .5);
        this.game.add.tween(this.jiongdog).to({
           y: Configer.GAME_HEIGHT - 86 - this.jiongdog.height * .5
        }, 800, Phaser.Easing.Bounce.Out, !0, 500).onComplete.addOnce(() => {
            this.addSuspend();
            this.emitter.position.set(this.jiongdog.x, this.jiongdog.y);
            this.emitter.makeParticles('particle');
            this.emitter.gravity = -100;
            this.emitter.start(false, 3500, 20);
        });
    }

    addSuspend () {
        this.suspend = this.game.add.image(0, 0, 'menu', 'suspend.png', this.world);
        this.suspend.anchor.set(.5);
        this.suspend.position.set(this.jiongdog.x, this.jiongdog.y);
        this.game.add.tween(this.suspend).to({
            x: this.jiongdog.x - this.jiongdog.width * .4
        }, 400, Phaser.Easing.Bounce.Out, !0);
    }

    addTutorial () {
        this.tutorialGroup = this.game.add.group(this.world, 'tutorialModel');
        this.tutorialGroup.position.set(Configer.HALF_GAME_WIDTH, Configer.HALF_GAME_HEIGHT);
        this.tutorial = this.game.add.image(0, 0, 'tutorial');
        this.tutorial.inputEnabled = !0;
        this.tutorialGroup.add(this.tutorial);
        this.tutorial.anchor.set(.5);
        this.closeBtn = this.game.add.image(0, 0, 'close');
        this.tutorialGroup.add(this.closeBtn);
        this.closeBtn.inputEnabled = !0;
        this.closeBtn.position.set(this.tutorial.width * .5 - this.closeBtn.width, - this.tutorial.height * .5 - this.closeBtn.height);
        this.tutorialGroup.visible = !1;
        this.closeBtn.events.onInputDown.add(() => {
            this.tutorialGroup.visible = !1;
        }, this);
    }

    resizeBg () {
        this.mainBg.width = Configer.GAME_WIDTH + 1;
        this.mainBg.height = Configer.GAME_HEIGHT + 1;
    }

    resizeTitle () {
        this.title.position.set(Configer.HALF_GAME_WIDTH, Configer.HALF_GAME_HEIGHT - this.title.height / 2);
    }

    resize () {
        this.resizeBg();
    }

    hideOverlay () {
        this.hideLayTween = this.game.add.tween(this.overlay).to({
            alpha: 0
        }, 400, Phaser.Easing.Cubic.Out, !0);
        this.hideLayTween.onComplete.addOnce(() => {
            this.overlay.visible = !1;
        });
    }
}

export default MainMenu;