import Configer from '../config/Configer';
import StartGame from '../init/InitGame';
import XHR from '../utils/XHR';
import Rank from './Rank';

class PlayerInfo extends Phaser.Group {
    constructor (game, world) {
        super(game, world);
        this.r = '0';
        this.c = this.game.state.getCurrentState().o;
        this.r = this.game.state.getCurrentState().c;
        this.titleStyle = {
            font : '50px GrilledCheeseBTNToasted',
            fill : '#eccb57',
            align : 'center'
        };

        this.fontStyle = {
            font : '36px GrilledCheeseBTNToasted',
            fill : '#ffffff',
            align : 'center'
        };

        return this.createModel(),
            this.createModelUI(),
            this.loaded = !1,
            this.currentScore = parseInt(0),
            this;
    }

    createModel () {
        this.model = this.game.add.image(0, 0, 'model_a');
        this.model.anchor.set(.5);
        this.add(this.model);
        this.model.position.set(Configer.HALF_GAME_WIDTH, Configer.HALF_GAME_HEIGHT);
    }

    createModelUI () {
        this.title = this.game.add.text(0, 0, '个人战绩', this.titleStyle);
        this.title.position.set(this.model.x, this.model.y - 150);
        this.title.anchor.set(.5);
        this.add(this.title);
        let style = {
            font : '26px GrilledCheeseBTNToasted',
            fill : '#fff',
            align : 'center'
        };
        this.loadingText = this.game.add.text(0, 0, '本轮游戏结束\n正在计算排名...', style);
        this.loadingText.anchor.set(.5);
        this.loadingText.position.set(this.title.x, this.title.y + 160);
        this.add(this.loadingText);
        this.game.time.events.repeat(1500, 1e2, () => {
            this.game.add.tween(this.loadingText.scale).to({
                x: 1.1,
                y: 0.9
            }, 100, Phaser.Easing.Cubic.Out, !0, 0, 1, !0);
        });
            this.EndingTime = (new Date()).getTime();
            let xhrHttp = new XHR();
            this.id = this.game.state.getCurrentState().i;
            let xhrPro = xhrHttp.post(StartGame.api + '/yzdtp/score/getDetail', {
                num: 18,
                currentScore: this.r,
                timestamp: this.EndingTime,
                wxopenId: this.id
            });
            xhrPro.then((serverData) => {
                this.loadingText.visible = !1;
                this.loadingText.exists = !1;
                this.loaded = !0;
                this.game.time.events.removeAll();
                this.serverData = serverData;
                StartGame.canPlay = this.serverData.canplay.playStatus == '1';
                this.serverData.canplay.playStatus == '2' && (window.location.reload(true));
                this.fontConfig = [
                    {
                        key: '游戏剩余时间: ',
                        suffix: '',
                        score: this.c
                    },
                    {
                        key: '最多剩余时间: ',
                        suffix: '',
                        score: this.serverData.highest.substr(0,8)
                    },
                    {
                        key: '当前排名: ',
                        suffix: '',
                        score: this.serverData.myRank == 0 ? '暂未上榜' : '第' + this.serverData.myRank + '名'
                    },
                    {
                        key: '距上一名还差: ',
                        suffix: '',
                        score: this.serverData.preScore.substr(0,8)
                    }
                ];

                for (let i in this.fontConfig) {
                    let fontList = this.game.add.text(this.model.x, this.model.y - 20 + 56 * i, this.fontConfig[i].key + this.fontConfig[i].score + this.fontConfig[i].suffix, this.fontStyle);
                    fontList.anchor.set(.5);
                    this.add(fontList);
                }

                this.rank = new Rank(this.game, this.game.world);
                this.game.world.add(this.rank);
            });
    }


}

export default PlayerInfo;