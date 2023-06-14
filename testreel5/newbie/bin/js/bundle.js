(function () {
	'use strict';

	var Scene = Laya.Scene;
	var REG = Laya.ClassUtils.regClass;
	var ui;
	(function (ui) {
	    class SecondUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("Second");
	        }
	    }
	    ui.SecondUI = SecondUI;
	    REG("ui.SecondUI", SecondUI);
	    class ThirdUI extends Scene {
	        constructor() { super(); }
	        createChildren() {
	            super.createChildren();
	            this.loadScene("Third");
	        }
	    }
	    ui.ThirdUI = ThirdUI;
	    REG("ui.ThirdUI", ThirdUI);
	})(ui || (ui = {}));

	class GameSymbol extends Laya.Script {
	    init() {
	        this.img = this.owner.getChildAt(0);
	    }
	    onEnable() {
	        console.log(this.owner.name);
	    }
	    set image(url) {
	        if (this.img) {
	            this.img.skin = url;
	        }
	    }
	    set y(value) {
	        this.img.y = value;
	    }
	    set height(value) {
	        this.img.height = value;
	    }
	    get image() {
	        return this.img.skin;
	    }
	    get height() {
	        return this.img.height;
	    }
	    get width() {
	        return this.img.width;
	    }
	    get x() {
	        return this.img.x;
	    }
	    get y() {
	        return this.img.y;
	    }
	}

	class randomImg {
	    constructor() {
	        this.source = "res/";
	    }
	    static init() {
	        this.instance = new randomImg();
	    }
	    shuffle() {
	        let new_list = [];
	        for (let i = 0; i < 5; i++) {
	            new_list.push(Math.floor(Math.random() * 15));
	        }
	        return new_list;
	    }
	    get url_source() {
	        return this.source;
	    }
	    get shuffled_list() {
	        let returned_new_list = this.shuffle();
	        return returned_new_list;
	    }
	}

	class TDM {
	    constructor() {
	        this.image_list = ["icArthas", "icAzmodan", "icHstone", "icDeathwing", "icHydralisk", "icKiriko", "icLurker", "icMurky", "icOverlord", "icOwl", "icSylvanas", "icTracer", "icTyrael", "icZen", "icZergling"];
	        randomImg.init();
	    }
	    static init() {
	        this.instance = new TDM();
	    }
	    get source() {
	        return randomImg.instance.url_source + this.image_list[Math.floor(Math.random() * 14)] + ".png";
	    }
	    get shuffled_list() {
	        let shuffled_list_img;
	        for (let i of randomImg.instance.shuffled_list) {
	            shuffled_list_img = randomImg.instance.url_source + this.image_list[i] + ".png";
	        }
	        return shuffled_list_img;
	    }
	}

	var controlstatus;
	(function (controlstatus) {
	    controlstatus[controlstatus["N"] = 0] = "N";
	    controlstatus[controlstatus["R"] = 1] = "R";
	    controlstatus[controlstatus["S"] = 2] = "S";
	})(controlstatus || (controlstatus = {}));
	class SlotBar extends Laya.Script {
	    constructor() {
	        super();
	        this.acceleration = 1;
	        this.maxSpeed = 30;
	        this.minSpeed = 10;
	        this.prestart = false;
	        this.prestartSpeed = -10;
	        this.slowDown = true;
	        this.symbolGap = 0;
	        this.currentSymbol = [];
	        console.log("新的數字", TDM.instance.shuffled_list);
	    }
	    init(panelnum) {
	        this.barpanel = this.owner.getChildByName(`BarPanel0${panelnum + 1}`);
	        for (let i = 0; i < this.barpanel.numChildren; i++) {
	            let symbol = this.barpanel.getChildAt(i);
	            let item = symbol.getComponent(GameSymbol);
	            item.init();
	            if (i == 0) {
	                this.nextSymbol = item;
	            }
	            else if (i == this.barpanel.numChildren - 1) {
	                this.lastSymbol = item;
	            }
	            else {
	                this.currentSymbol.push(item);
	            }
	            item.image = TDM.instance.source;
	        }
	        this.symbolHeight = this.currentSymbol[0].height;
	    }
	    switch() {
	        this.lastSymbol.image = TDM.instance.shuffled_list;
	        let temp = this.lastSymbol;
	        this.lastSymbol = this.currentSymbol.pop();
	        this.currentSymbol.unshift(this.nextSymbol);
	        this.nextSymbol = temp;
	        this.nextSymbol.img.y = 0;
	    }
	    startRun() {
	        this.status = controlstatus.R;
	        console.log("slotbarstatus", this.status);
	    }
	    barRun() {
	        if (this.status == controlstatus.S)
	            return;
	        const halfSymbolHeight = (this.symbolHeight + this.symbolGap) / 2;
	        const targetSwitchPosition = this.barpanel.height + halfSymbolHeight;
	        this.nextSymbol.img.y += 30;
	        this.lastSymbol.img.y += 30;
	        this.currentSymbol.forEach(symbol => {
	            symbol.img.y += 30;
	        });
	        if (this.lastSymbol.img.y >= 870) {
	            this.switch();
	        }
	        this.status = controlstatus.R;
	    }
	    stop() {
	        this.status = controlstatus.S;
	        console.log("slotbarstatus", this.status);
	    }
	    stopRun() {
	        console.log("----------------------------");
	        console.log(this.nextSymbol.img.y);
	        console.log(this.currentSymbol[0].img.y);
	        console.log(this.currentSymbol[1].img.y);
	        console.log(this.currentSymbol[2].img.y);
	        console.log(this.lastSymbol.img.y);
	        console.log("----------------------------");
	        this.nextSymbol.img.y = 15.5;
	        this.currentSymbol[0].img.y = 190;
	        this.currentSymbol[1].img.y = 364;
	        this.currentSymbol[2].img.y = 547;
	        this.lastSymbol.img.y = 725;
	    }
	    onEnable() {
	        this.status = controlstatus.N;
	    }
	    onUpdate() {
	        console.log(this.status);
	        switch (this.status) {
	            case controlstatus.R:
	                {
	                    console.log("Rolling...");
	                    this.barRun();
	                }
	                break;
	            case controlstatus.S:
	                {
	                    this.stopRun();
	                    this.speed = 50;
	                    console.log("Stopped.");
	                }
	                break;
	        }
	    }
	    onDisable() {
	    }
	}

	class ReelController extends Laya.Script {
	    constructor() {
	        super(...arguments);
	        this.arySlotBar = [];
	        this.play = () => {
	            let speedvalue = 4;
	            this.arySlotBar.forEach((slotBar, index) => {
	                Laya.timer.frameOnce(index * speedvalue, slotBar, slotBar.startRun);
	            });
	        };
	        this.roll = () => {
	            console.log("roll pressed");
	            this.play();
	        };
	        this.stop_roll = () => {
	            console.log("STOP");
	            this.arySlotBar.forEach((slotBar, index) => {
	                Laya.timer.clear(slotBar, slotBar.startRun);
	                Laya.timer.frameOnce(0, slotBar, slotBar.stop);
	            });
	        };
	    }
	    onEnable() {
	        this.speed = 50;
	        this.machinebox = this.owner.getChildByName("MachineBox");
	        for (let i = 0; i < this.machinebox.numChildren; i++) {
	            this.bar = this.machinebox.getChildAt(i);
	            let slotBar = this.bar.getComponent(SlotBar);
	            slotBar.init(i);
	            this.arySlotBar.push(slotBar);
	        }
	    }
	}

	class ReelPageControl extends ui.SecondUI {
	    constructor() {
	        super();
	        this.controller = null;
	        this.iconList = ["icTracer", "icLurker", "icAzmodan", "icPiggy"];
	    }
	    onEnable() {
	        this.controller = this.getComponent(ReelController);
	        this.btnOn = this.On;
	        this.btnOff = this.Off;
	        this.btnOn.on(Laya.Event.CLICK, this, this.controller.roll);
	        this.btnOff.on(Laya.Event.CLICK, this, this.controller.stop_roll);
	    }
	}

	class GameConfig {
	    constructor() { }
	    static init() {
	        var reg = Laya.ClassUtils.regClass;
	        reg("form/R.ts", ReelPageControl);
	        reg("controller/RC.ts", ReelController);
	        reg("component/GameSymbol.ts", GameSymbol);
	        reg("component/SlotBar.ts", SlotBar);
	    }
	}
	GameConfig.width = 1000;
	GameConfig.height = 900;
	GameConfig.scaleMode = "showall";
	GameConfig.screenMode = "horizontal";
	GameConfig.alignV = "middle";
	GameConfig.alignH = "center";
	GameConfig.startScene = "Second.scene";
	GameConfig.sceneRoot = "";
	GameConfig.debug = false;
	GameConfig.stat = false;
	GameConfig.physicsDebug = false;
	GameConfig.exportSceneToJson = true;
	GameConfig.init();

	class Main {
	    constructor() {
	        TDM.init();
	        if (window["Laya3D"])
	            Laya3D.init(GameConfig.width, GameConfig.height);
	        else
	            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
	        Laya["Physics"] && Laya["Physics"].enable();
	        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
	        Laya.stage.scaleMode = GameConfig.scaleMode;
	        Laya.stage.screenMode = GameConfig.screenMode;
	        Laya.stage.alignV = GameConfig.alignV;
	        Laya.stage.alignH = GameConfig.alignH;
	        Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
	        if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
	            Laya.enableDebugPanel();
	        if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
	            Laya["PhysicsDebugDraw"].enable();
	        if (GameConfig.stat)
	            Laya.Stat.show();
	        Laya.alertGlobalError(true);
	        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	    }
	    onVersionLoaded() {
	        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	    }
	    onConfigLoaded() {
	        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
	    }
	}
	new Main();

}());
