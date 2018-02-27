class LevelGui extends Phaser.Group {
    constructor (game, parent) {
        super(game, parent, 'levelgui');
    }

    createNewLevel (level) {
        this.levelArray = [];
        this.constructLevel(level);
        this.addTiles();
        return this.levelArray;
    }

    constructLevel (level) {
        this.cateNum = level + 2;
        this.catePool = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10];
        this.getPool = [];
        // 随机选取cateNum种图片
        while (this.getPool.length < this.cateNum) {
            let rd = this.game.rnd.integerInRange(0, this.catePool.length - 1);
            let tmp = this.catePool.splice(rd, 1)[0];
            this.getPool.push(tmp);
        }
        this.levelPool = this.getPool.concat(this.getPool);
        // 对生成的图片池进行洗牌
        this.randomPool = this.shuffle(this.levelPool);
    }

    addTiles () {
        let index_X = 0;
        let index_Y = 0;
        let h = Math.ceil(this.cateNum * 2 / 4);
        let n = (h % 2 === 0) ? 1 : 0;
        for (let i of this.randomPool) {
            this.tile = this.game.add.image(0, 0, 'jiongdog', i + '.png');
            this.tile.anchor.set(.5);
            this.add(this.tile);
            this.levelArray.push(this.tile);
            if (this.cateNum === 3) {
                index_X > 2 && (index_X = 0, index_Y++);
                this.tile.x = this.tile.width * (index_X - 1);
                this.tile.y = -this.tile.height * .5 + index_Y * this.tile.height;
            } else {
                index_X > 3 && (index_X = 0, index_Y++);
                this.tile.x = this.tile.width * (index_X - 1) - this.tile.width / 2;
                this.tile.y = - (Math.floor(h / 2) - .5 * n) * this.tile.height + this.tile.height * index_Y;
            }
            index_X++;
            this.game.add.tween(this.tile).from({
                x: 0,
                y: 0
            }, 200 + index_Y * 100, Phaser.Easing.Bounce.Out, !0);
            this.tile.tween = this.game.add.tween(this.tile.scale);
            this.tile.tween.to({
                x: 1.05,
                y: 0.95
            }, 200, Phaser.Easing.Cubic.Out, !0, 0, 1e3, !0).pause();
        }
    }

    shuffle (array) {
        let l = array.length;
        for (let i = l - 1; i >= 0; i--) {
            let randomIndex = this.game.rnd.integerInRange(0, l - 1);
            let swapItem = array[randomIndex];
            array[randomIndex] = array[i];
            array[i] = swapItem;
        }
        return array;
    }
}

export default LevelGui;