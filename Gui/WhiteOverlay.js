import Config from '../config/Configer';

class WhiteOverlay extends Phaser.Image {
    constructor (game, key) {
        super(game, 0, 0, key, 'WhiteOverlay0000');
        this.anchor.set(.5);
        this.game.time.events.add(100, () => {
           this.exists = !1;
           this.visible = !1;
        });
    }

    showWhiteOverlay () {
        this.resize();
        this.exists = !0;
        this.visible = !0;
        this.alpha = 1;
        this.game.world.add(this);
        this.game.world.bringToTop(this);
        let v_scale = this.scale.clone().multiply(1.66, 1.66);
        this.game.add.tween(this.scale).to({
            x: v_scale.x,
            y: v_scale.y
        }, 800, Phaser.Easing.Back.Out, !0);
        this.game.add.tween(this).to({
            alpha: .66
        }, 800, Phaser.Easing.Cubic.In, !0).onComplete.addOnce(() => {
            this.game.add.tween(this).to({
                alpha: 0
            }, 500, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(() => {
                this.visible = !1;
                this.exists = !1;
            });
        });
    }

    resize () {
        this.width = 1.3 * Config.GAME_WIDTH;
        this.height = 1.3 * Config.GAME_HEIGHT;
        this.x = Config.HALF_GAME_WIDTH;
        this.y = Config.HALF_GAME_HEIGHT;
    }
}

export default WhiteOverlay;