import Configer from '../config/Configer';
import SimpleButton from "./SimpleButton";
import StartGame from "../init/InitGame";

class ShareUi extends Phaser.Group {
    constructor (game, world) {
        super(game, world);
        this.titleStyle = {
            font : '36px GrilledCheeseBTNToasted',
            fill : '#ffffff',
            align : 'center',
            fontWeight: 'bold'
        };

        this.fontStyle = {
            font : '50px GrilledCheeseBTNToasted',
            fill : '#eccb57',
            align : 'center',
            fontWeight: 'bold'
        };

        this.largeStyle = {
            font : '50px GrilledCheeseBTNToasted',
            fill : '#ffffff',
            align : 'center',
            fontWeight: 'bold'
        };
        return this.createModel(),
            this.createModelUI(),
            this.createBootBtn(),
            this;
    }

    createModel () {
        this.model = this.game.add.image(0, 0, 'model_a');
        this.model.anchor.set(.5);
        this.add(this.model);
        this.model.position.set(Configer.HALF_GAME_WIDTH, Configer.HALF_GAME_HEIGHT - this.model.height * .1);
    }

    createModelUI () {
        this.title = this.game.add.text(0, 0, '恭喜您', this.fontStyle);
        this.title.position.set(this.model.x, this.model.y - 150);
        this.title.anchor.set(.5);
        this.info = this.game.add.text(0, 0, '分享活动到朋友圈', this.titleStyle);
        this.info.position.set(this.model.x, this.model.y);
        this.info.anchor.set(.5);
        this.info = this.game.add.text(0, 0, '开启', this.largeStyle);
        this.info.position.set(this.model.x, this.model.y + 80);
        this.info.anchor.set(.5);
        this.info = this.game.add.text(0, 0, '无限游玩模式', this.largeStyle);
        this.info.position.set(this.model.x, this.model.y + 160);
        this.info.anchor.set(.5);
    }

    createBootBtn () {
        this.bootBtn = new SimpleButton(this.game, 0, 0, 'menu', 'unlock.png');
        this.bootBtn.anchor.set(.5);
        this.bootBtn.position.set(this.model.x, this.model.y + this.model.height * .5 + 200);
        this.add(this.bootBtn);
        this.bootBtn.setCallbackDelay(100);
        this.bootBtn.callback.add(() => {
           if (StartGame.canPlay) {
               this.game.device.webAudio && this.game.sound.play('boot');
               this.game.changeState('level', !1);
           } else {
               this.game.device.webAudio && this.game.sound.play('tap');
           }
        });
    }
}

export default ShareUi;