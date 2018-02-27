import ConfettiParticle from './ConfettiParticle';
import config from '../config/Configer';

class Confetti extends Phaser.SpriteBatch {
    constructor (game) {
        super(game, null, 'Confetti');
        return this.running = !1,
            this.exists = !1,
            this.visible = !1,
            this;
    }

    setTextureKey (texturekey) {
        this.textureKey = texturekey;
    }

    addParticles (num) {
        void 0 === num && (num = 90);
        this.particles = [];

        for (let i = 0, l = Math.round(num / 7); i < l; i++) {
            let index = this.game.rnd.integerInRange(5, 6);
            this.addParticle(index);
        }

        for (let j = 0; j < num - Math.round(num / 7); j++) {
            let index = this.game.rnd.integerInRange(1, 4);
            this.addParticle(index);
        }

        this.particlesNum = this.particles.length;
    }

    addParticle (n) {
        let key = 'Confetti_' + n + '0000';
        let particle = new ConfettiParticle(this.game, this.textureKey, key);
        this.add(particle);
        this.particles.push(particle);
    }

    distributeParticles () {
        this.particles.forEach((pc) => {
            pc.x = this.game.rnd.realInRange(0, config.GAME_WIDTH);
            pc.y = this.game.rnd.realInRange(0, -config.GAME_HEIGHT);
        });
    }

    show () {
        this.exists = !0;
        this.visible = !0;
        this.running = !0;
        this.distributeParticles();
    }

    update () {
        if (this.running) {
            for (let i = 0; i < this.particlesNum; i++) {
                this.particles[i].update();
            }
        }
    }

    destroy () {
        this.particles = null;
    }
}

export default Confetti;