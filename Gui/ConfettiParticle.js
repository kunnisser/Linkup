import config from '../config/Configer';

class ConfettiParticle extends Phaser.Image {
    constructor (game, texture, key) {
        super(game, 0, 0, texture, key);
        this.sinAngle = 0;
        this.sinAngleDelta = 0;
        this.magnitude = 1; // 级数
        this.anchor.set(.5);
        this.velocity = new Phaser.Point;
        this.velocity.x = 0;
        this.velocity.y = this.game.rnd.realInRange(3.33, 4.33);
        this.angularVelocity = this.game.rnd.realInRange(1, 2);
        this.angle = this.game.rnd.realInRange(0, 180);
        this.magnitude = this.game.rnd.realInRange(.75, 1.5);
        this.sinAngle = this.game.rnd.realInRange(0, Math.PI);
        this.sinAngleDelta = this.game.rnd.realInRange(.01, .017);
        key.indexOf('_5') > 0 || key.indexOf('_6') > 0 ? (
          this.confettiType = 'Spiral',
          this.angle = this.game.rnd.realInRange(-20, 20)
        ) : this.confettiType = 'Normal';
        return this;
    }

    simpleUpdate () {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.x = Math.sin(this.sinAngle) * this.magnitude;
        this.sinAngle += this.sinAngleDelta;
        this.angle += this.angularVelocity;
    }

    complexUpdate () {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.x = Math.sin(this.sinAngle) * this.magnitude;
        this.sinAngle += this.sinAngleDelta;
        this.angle += this.angularVelocity;
        this.scale.x = Math.sin(this.rotation);
        this.scale.y = Math.cos(this.rotation);
    }

    update () {
        this.confettiType === 'Spiral' ? this.simpleUpdate() : this.complexUpdate();
        this.visible = this.y > -10;
        if (this.visible) {
            this.visible = this.x > -10 && this.x < config.GAME_WIDTH + 10;
            this.y > config.GAME_HEIGHT + 10 && (
                this.exists = !1,
                this.visible = !1
            );
        }
    }

    destroy () {
        Phaser.Image.prototype.destroy.call(this, !0);
    }
}

export default ConfettiParticle;