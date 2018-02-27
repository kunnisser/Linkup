import Configer from '../config/Configer';
import ShareUi from '../Gui/ShareUi';

class Share extends Phaser.State {
    constructor () {
        super();
    }

    init (obj) {
        this.overlay = obj.overlay;
        this.addMainBg();
        this.resize();
        this.hideOverlay();
    }

    create () {
        this.shareModel = new ShareUi(this.game, this.world);
    }

    addMainBg () {
        this.mainBg = this.game.add.image(0, 0, 'background', this.world);
    }

    resizeBg () {
        this.mainBg.width = Configer.GAME_WIDTH + 1;
        this.mainBg.height = Configer.GAME_HEIGHT + 1;
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

export default Share;