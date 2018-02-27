import config from '../config/Configer';
import Game from '../init/InitGame';
import LevelGui from '../Gui/LevelGui';
import Confetti from '../Gui/Confetti';
import WhiteOverlay from '../Gui/WhiteOverlay';
import Graphics from '../utils/Graphics';
import PlayerInfo from '../Gui/PlayerInfo';
import SimpleButton from '../Gui/SimpleButton';
import en from '../utils/Encrypt';

class Level extends Phaser.State {
    constructor () {
        super();
    }

    init (obj) {
        this.overlay = obj.overlay;
        this.fromPreloader = obj.param;
        this.levelTiles = [];
        this.level = 1;
        this.level_v= 1;
        this.findedDuad = 0;
        this.gameover = !1;
        this.timer = 0;
        this._second = 0;
        this._minute = 2;
        this.setLevel = 8;
        this.plusms = 0;
        this.score = 0;
        this.sendScore = 0;
        this.c = '';
        this.totalms = this._minute * 60000 + this._second * 1000;
        this.second = Math.floor(this._second / 10) === 0 ? ('0' + this._second) : this._second;
        this.minute = Math.floor(this._minute / 10) === 0 ? ('0' + this._minute) : this._minute;
    }

    create () {
        this.addGameBg();
        this.addTopbar();
        this.addTimeLine();
        this.resizeBackground();
        this.initInputHandle();
        this.initLevel();
        this.addWhiteOverlay();
        this.addConfetti();
        this.hideOverlay();
    }

    // 添加背景
    addGameBg () {
        this.mainSpritebatch = this.world;
        this.mainBg = this.game.add.image(0, 0, 'background', this.mainSpritebatch);
    }

    addTopbar () {
        this.topbar = this.game.add.image(0, 0, 'topbar', this.mainSpritebatch);
        this.txtstyle = {
            font : '40px arial',
            fill : '#f1de0b',
            align : 'center'
        };
        this.levelText = this.game.add.text(0, 0, '0' + this.level_v, this.txtstyle);
        this.levelText.x = config.GAME_WIDTH - 80;
        this.levelText.y = 68;
        this.levelText.anchor.set(.5);
        this.levelText.setShadow(4, 4, '#333');
    }

    addTimeLine () {
        this.timeline = this.game.add.image(0, 0, 'timeline');
        this.timeline.anchor.set(.5);
        this.timeline.position.set(config.HALF_GAME_WIDTH, this.topbar.height + 40);
        this.graphics = Graphics.createRectTexture(this.game, 424 ,26, '#f1de0b', 'time');
        this.timebar = this.game.add.image(0, 0, this.graphics);
        this.timebar.x = this.timeline.x - this.timeline.width * .5 + 78;
        this.timebar.y = this.timeline.y - this.timebar.height * .5;
        this.timestyle = {
            font : '24px GrilledCheeseBTNToasted',
            fill : '#aa612a',
            align : 'center'
        };
        this.timetext = this.game.add.text(0, 0, '', this.timestyle);
        this.timetext.x = this.timeline.x - 28;
        this.timetext.y = this.timeline.y - 15;
    }

    update () {
        if (!this.gameover) {
            this.plusms += this.game.time.elapsed;
            this.score = this.totalms - this.plusms;
            this.score < 0 && (this.score = 0);
            this.timebar.scale.x = this.score / this.totalms;
            this.timer -= this.game.time.elapsed;
            this.timer < 0 && (this.timer = 0);
            this.ms =  Math.floor(this.timer / 100) === 0 ? ('0' + Math.floor(this.timer / 10)) : Math.floor(this.timer / 10),
            this.timetext.setText(this.minute + ':' + this.second + ':' + this.ms);
            this.c = this.minute + ':' + this.second + ':' + this.ms;
            this.timer <= 0 && (
                this.timer = 1000,
                this._second--,
                this._second < 0 && (this._second = 59, this._minute--),
                this._minute < 0 && (this.gameover = !0, this.game.input.onDown.remove(this.onInputDown, this),
                this.computeScore()),
            this.second = Math.floor(this._second / 10) === 0 ? ('0' + this._second) : this._second,
                this.minute = Math.floor(this._minute / 10) === 0 ? ('0' + this._minute) : this._minute
            );
        }
    }

    initInputHandle () {
        this.game.input.onDown.add(this.onInputDown, this);
        this.clickedStore = [];
    }

    onInputDown () {
        let currentPointer = this.game.input.activePointer.position;
        this.clickTile = this.getClickedImage(currentPointer.x, currentPointer.y);
        if (this.clickTile) {
            this.game.device.webAudio && this.sound.play('toggle');
            this.clickTile.active ? (
                this.clickedStore = [],
                this.clickTile.active = !1,
                this.clickTile.tween.pause(),
                this.clickTile.blendMode = PIXI.blendModes.COLOR
            ) : (this.clickTile.active = !0,
            this.clickedStore.push(this.clickTile),
            this.checkDouble()
            );
        }
    }

    checkDouble () {
        if (this.clickedStore.length >= 2) {
            if (this.clickedStore[1].frame === this.clickedStore[0].frame && this.clickedStore[1].active === this.clickedStore[0].active) {
                for (let c of this.clickedStore) {
                    c.tween = null;
                    this.game.add.tween(c.scale).to({
                        x: 0,
                        y: 0
                    }, 600, Phaser.Easing.Back.Out, !0).onComplete.addOnce(() => {
                        c.visible = !1;
                    });
                }
                this.findedDuad++;
                this.findedDuad === (this.level + 2) && (
                  this.level++,
                  this.findedDuad = 0,
                  this.game.add.tween(this.levelText.scale).to({
                      x : 1.25,
                      y : .75
                  }, 100, Phaser.Easing.Linear.None, !0).onComplete.addOnce(()=>{
                      this.game.add.tween(this.levelText.scale).to({
                          x: 1,
                          y: 1
                      }, 300, Phaser.Easing.Back.Out, !0);
                  }),
                  this.level > this.setLevel ? (
                      this.c = this.minute + ':' + this.second + ':' + this.ms,
                      this.game.device.webAudio && this.sound.play('boot'),
                      this.gameover = !0,
                      this.computeScore(),
                      this.victoryEvent()
                      ) : (this.levelText.setText('0' + ++this.level_v),
                  this.game.time.events.add(600, () => {
                      this.levelTiles = this.levelStage.createNewLevel(this.level);
                  }))
                );
            } else {
                for (let c of this.clickedStore) {
                    c.active = !1;
                    c.tween.pause();
                    c.blendMode = PIXI.blendModes.COLOR;
                }
            }
            this.clickedStore = [];
        } else {
            this.clickTile.tween.isPaused && this.clickTile.tween.resume();
            this.clickTile.blendMode = PIXI.blendModes.ADD;
        }
    }

    getClickedImage (x, y) {
        for (let t of this.levelTiles) {
            if (t.visible && t.getBounds().contains(x, y)) {
                return t;
            }
        }
    }

    initLevel () {
        this.levelStage = new LevelGui(this.game, this.mainSpritebatch);
        this.levelStage.position.set(config.HALF_GAME_WIDTH, config.HALF_GAME_HEIGHT);
        this.levelTiles = this.levelStage.createNewLevel(this.level);
    }

    addWhiteOverlay () {
        this.whiteOverlay = new WhiteOverlay(this.game, 'common');
    }

    addConfetti () {
        Game.isWeakDevice || (
            this.confetti = new Confetti(this.game),
            this.confetti.setTextureKey('common'),
            this.confetti.addParticles(),
            this.mainSpritebatch.add(this.confetti)
        );
    }

    victoryEvent () {
        this.whiteOverlay.showWhiteOverlay();
        let topindex = this.mainSpritebatch.getChildIndex(this.whiteOverlay);
        this.confetti.parent.setChildIndex(this.confetti, topindex - 1);
        this.confetti.show();
    }

    computeScore () {
        this.game.time.events.removeAll();
        let sA = this.c.split(':');
        this.o = this.c;
        this.c = parseInt(sA[0]) * 60000 + parseInt(sA[1]) * 1000 + parseInt(sA[2]) * 10;
        let e = new en();
        this.i = e.init(this.c);
        this.playinfo = new PlayerInfo(this.game, this.world);
        this.tryAgain = new SimpleButton(this.game, 0, 0, 'menu', 'tryAgain.png');
        this.RankBtn = new SimpleButton(this.game, 0, 0, 'menu', 'rank.png');
        this.scoreBtn = new SimpleButton(this.game, 0, 0, 'menu', 'personalScore.png');
        this.tryAgain.anchor.set(.5, 1);
        this.RankBtn.anchor.set(.5, 1);
        this.scoreBtn.anchor.set(.5, 1);
        this.world.add(this.tryAgain);
        this.world.add(this.RankBtn);
        this.world.add(this.scoreBtn);
        this.tryAgain.position.set(config.HALF_GAME_WIDTH - this.tryAgain.width * .5 - 50, config.GAME_HEIGHT - 100);
        this.RankBtn.position.set(config.HALF_GAME_WIDTH + this.RankBtn.width * .5 + 50, config.GAME_HEIGHT - 100);
        this.scoreBtn.position.set(config.HALF_GAME_WIDTH + this.scoreBtn.width * .5 + 50, config.GAME_HEIGHT - 100);
        this.scoreBtn.visible = !1;
            this.RankBtn.callback.add(() => {
                this.playinfo.loaded && (
                    this.game.device.webAudio && this.sound.play('tap'),
                    this.RankBtn.visible = !1,
                    this.scoreBtn.visible = !0,
                    this.playinfo.rank.visible = !0,
                    this.playinfo.visible = !1
                );
            });
            this.scoreBtn.callback.add(() => {
                this.playinfo.loaded && (
                this.game.device.webAudio && this.sound.play('tap'),
                this.RankBtn.visible = !0,
                this.scoreBtn.visible = !1,
                this.playinfo.rank.visible = !1,
                this.playinfo.visible = !0
                );
            });

        this.tryAgain.callback.add(() => {
            this.game.device.webAudio && this.sound.play('tap');
            if (this.playinfo.loaded) {
                this.playinfo.serverData.canplay.playStatus == '1' ? this.game.changeState('level', !1) : this.game.changeState('share', !1);
            }
        });
    }

    // 重置背景尺寸
    resizeBackground () {
        this.mainBg.width = config.GAME_WIDTH + 1;
        this.mainBg.height = config.GAME_HEIGHT + 1;
    }

    resize () {
        this.resizeBackground();
    }

    hideOverlay () {
        this.hideLayTween = this.game.add.tween(this.overlay).to({
            alpha: 0
        }, 400, Phaser.Easing.Cubic.Out, !0);
        this.hideLayTween.onComplete.add(() => {
            this.overlay.visible = !1;
        });
    }
}

export default Level;