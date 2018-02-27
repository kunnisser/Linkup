import Configer from '../config/Configer';

class Rank extends Phaser.Group {
    constructor (game, world) {
        super(game, world);
        this.titleStyle = {
            font : '50px GrilledCheeseBTNToasted',
            fill : '#eccb57',
            align : 'center'
        };

        this.fontStyle = {
            font : '30px arialblack',
            fill : '#ffffff',
            align : 'center'
        };
        return this.createModel(),
            this.createModelUI(),
            this.tapState = !1,
            this.startDragY = 0,
            this.visible = !1,
            this;
    }

    createModel () {
        this.model = this.game.add.image(0, 0, 'model_b');
        this.model.anchor.set(.5);
        this.model.position.set(Configer.HALF_GAME_WIDTH, Configer.HALF_GAME_HEIGHT);
        this.add(this.model);
    }

    createModelUI () {
        this.title = this.game.add.text(0, 0, '剩余时间排行榜', this.titleStyle);
        this.title.position.set(this.model.x, this.model.y - 260);
        this.title.anchor.set(.5);
        this.add(this.title);
        if (this.game.state.getCurrentState().playinfo.serverData) {
           this.rankData = this.game.state.getCurrentState().playinfo.serverData.rank
        }
        this.textgrp = this.game.add.group(this, 'textgrp', !0);
        this.add(this.textgrp);
        for (let i in this.rankData) {
            let fontList = this.game.add.text(this.model.x - 260,
                this.model.y - 180 + 40 * i,
                '第 ' + this.rankData[i].rank + ' 名: ', this.fontStyle);
            fontList.anchor.set(0, .5);
            let fontList1 = this.game.add.text(this.model.x - 120,
                this.model.y - 180 + 40 * i,
                this.rankData[i].nickName.substr(0,8), this.fontStyle);
            fontList1.anchor.set(0, .5);
            let fontList2 = this.game.add.text(this.model.x + 140,
                this.model.y - 180 + 40 * i,
                this.rankData[i].score.substr(0,8), this.fontStyle);
            fontList2.anchor.set(0, .5);
            this.textgrp.addChild(fontList);
            this.textgrp.addChild(fontList1);
            this.textgrp.addChild(fontList2);
        }
        this.scrollMask = this.game.add.graphics(Configer.HALF_GAME_WIDTH - 280, this.model.y - 200, this.game.world);
        this.scrollMask.beginFill(0xff0000).drawRect(0, 0, 568, 500);
        this.add(this.scrollMask);
        this.textgrp.mask = this.scrollMask;
        this.topY = 40;
        this.bottomY = 470 - this.textgrp.height;
        this.scrollInput();
    }

    scrollInput () {
        this.scrollMask.events.onInputDown.add(this.onInputDown, this);
        this.scrollMask.events.onInputUp.add(this.onInputUp, this);
        this.scrollMask.inputEnabled = !0;
    }

    onInputDown () {
        this.tapState = !0;
        this.startDragY = this.textgrp.position.y;
    }

    onInputUp () {
        if (this.tapState) {
            this.tapState = !1;
            this.textgrp.y > 0 && this.game.add.tween(this.textgrp).to({
                y: 0
            }, 400, Phaser.Easing.Cubic.Out, !0);
            this.textgrp.y < this.bottomY && this.game.add.tween(this.textgrp).to({
                y: this.bottomY
            }, 400, Phaser.Easing.Cubic.Out, !0);
        }
    }

    update () {
        this.tapState && this.scroll();
    }

    scroll () {
        let pointer = this.game.input.activePointer;
        let distanceY = (pointer.y - pointer.positionDown.y) / Configer.WORLD_SCALE * 1.66;
        let newY = this.startDragY + distanceY;
        newY = Phaser.Math.clamp(newY, this.bottomY - 40, this.topY);
        this.textgrp.position.y = newY;
    }

}

export default Rank;