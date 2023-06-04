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
	})(ui || (ui = {}));

	var controlstatus;
	(function (controlstatus) {
	    controlstatus[controlstatus["N"] = 0] = "N";
	    controlstatus[controlstatus["R"] = 1] = "R";
	    controlstatus[controlstatus["S"] = 2] = "S";
	})(controlstatus || (controlstatus = {}));
	class ReelController extends Laya.Script {
	    constructor() {
	        super(...arguments);
	        this.roll = () => {
	            this.status = controlstatus.R;
	            console.log("Roll status:", this.status);
	            return this.status;
	        };
	        this.stop_roll = () => {
	            this.status = controlstatus.S;
	            console.log("Stop status:", this.status);
	        };
	    }
	    onEnable() {
	        this.speed = 50;
	        this.status = controlstatus.N;
	        this.img_list = [];
	        this.btnOn = this.owner.getChildByName("On");
	        this.btnOff = this.owner.getChildByName("Off");
	        this.first = this.owner.getChildByName("GameSlotBarA");
	        this.panel = this.first.getChildByName("panelSymbol");
	        console.log(this.panel.numChildren);
	        for (let i = 0; i < this.panel.numChildren; i++) {
	            this.boxSymbol = this.panel.getChildAt(i);
	            console.log(this.boxSymbol.name);
	            this.img_list.push(this.boxSymbol.getChildAt(0));
	            console.log(this.img_list);
	        }
	        this.img1 = this.img_list[0];
	        this.img2 = this.img_list[1];
	        this.img3 = this.img_list[2];
	        this.img4 = this.img_list[3];
	        this.img5 = this.img_list[4];
	    }
	    switch_img() {
	        let temp = this.img5.skin;
	        this.img5.skin = this.img4.skin;
	        this.img4.skin = this.img3.skin;
	        this.img3.skin = this.img2.skin;
	        this.img2.skin = this.img1.skin;
	        this.img1.skin = temp;
	        this.img_list[4] = this.img5;
	        this.img_list[3] = this.img4;
	        this.img_list[2] = this.img3;
	        this.img_list[1] = this.img2;
	        this.img_list[0] = this.img1;
	    }
	    onUpdate() {
	        console.log("狀態", this.status);
	        const oy1 = 100;
	        const oy2 = 270;
	        const oy3 = 340;
	        const oy4 = 460;
	        const oy5 = 580;
	        switch (this.status) {
	            case controlstatus.R:
	                {
	                    console.log("Rolling...");
	                    this.img1.y += this.speed;
	                    this.img2.y += this.speed;
	                    this.img3.y += this.speed;
	                    this.img4.y += this.speed;
	                    this.img5.y += this.speed;
	                    if (this.img5.y >= oy5 + 120) {
	                        this.img1.y = oy1;
	                        this.img2.y = oy2;
	                        this.img3.y = oy3;
	                        this.img4.y = oy4;
	                        this.img5.y = oy5;
	                        this.switch_img();
	                    }
	                    Laya.timer.frameOnce(100, this, function () {
	                        this.speed -= 1;
	                        if (this.speed <= 0) {
	                            this.img1.y = oy1;
	                            this.speed = 0;
	                            this.status = controlstatus.S;
	                        }
	                    });
	                }
	                break;
	            case controlstatus.S:
	                {
	                    this.speed = 50;
	                    console.log("Stopped.");
	                    this.img1.y = oy1;
	                    this.img2.y = oy2;
	                    this.img3.y = oy3;
	                    this.img4.y = oy4;
	                    this.img5.y = oy5;
	                }
	                break;
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
	        this.reel = this.panelSymbol;
	        for (let i = 0; i < this.reel.numChildren; i++) {
	            this.box = this.reel.getChildAt(i);
	            this.img = this.box.getChildAt(0);
	            console.log(this.img.name);
	            const random = Math.floor(Math.random() * this.iconList.length);
	            console.log(random, this.iconList[random]);
	        }
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
	    }
	}
	GameConfig.width = 1000;
	GameConfig.height = 900;
	GameConfig.scaleMode = "noscale";
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
