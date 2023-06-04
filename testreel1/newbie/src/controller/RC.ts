enum controlstatus {
    N = 0,
    R = 1,
    S = 2,
}

export default class ReelController extends Laya.Script {
    private status: controlstatus;
    public btnOn: Laya.Button;
    public btnOff: Laya.Button;
    public img_list: Laya.Image[];
    public img1: Laya.Image;
    public img2: Laya.Image;
    public img3: Laya.Image;
    public img4: Laya.Image;
    public img5: Laya.Image;
    public panel: Laya.Panel;
    public first: Laya.Box;
    public boxSymbol: Laya.Box;
    public speed:number;

    onEnable() {
        this.speed=50
        this.status = controlstatus.N;
        this.img_list = [];
        this.btnOn = this.owner.getChildByName("On") as Laya.Button;
        this.btnOff = this.owner.getChildByName("Off") as Laya.Button;
        this.first = this.owner.getChildByName("GameSlotBarA") as Laya.Box;
        this.panel = this.first.getChildByName("panelSymbol") as Laya.Panel;
        console.log(this.panel.numChildren)

        for (let i = 0; i < this.panel.numChildren; i++) {
            this.boxSymbol = this.panel.getChildAt(i) as Laya.Box;
            console.log(this.boxSymbol.name);
            this.img_list.push(this.boxSymbol.getChildAt(0) as Laya.Image);
            console.log(this.img_list);
        }
        this.img1 = this.img_list[0];
        this.img2 = this.img_list[1];
        this.img3 = this.img_list[2];
        this.img4 = this.img_list[3];
        this.img5 = this.img_list[4];

        // console.log(this.img1.y, this.img2.y, this.img3.y, this.img4.y,this.img5.y);
        
    }

    roll = () => {
        this.status = controlstatus.R;
        console.log("Roll status:", this.status);
        return this.status;
    }

    stop_roll = () => {
        this.status = controlstatus.S;
        console.log("Stop status:", this.status);
    }

    public switch_img(): void {
        let temp = this.img5.skin;
        this.img5.skin = this.img4.skin;
        this.img4.skin = this.img3.skin;
        this.img3.skin = this.img2.skin;
        this.img2.skin = this.img1.skin;
        this.img1.skin = temp;

        // 更新img_list中每个图像的引用
        this.img_list[4] = this.img5;
        this.img_list[3] = this.img4;
        this.img_list[2] = this.img3;
        this.img_list[1] = this.img2;
        this.img_list[0] = this.img1;

    }

    onUpdate(): void {
        console.log("狀態", this.status);
        const oy1 = 100;
        const oy2 = 270;
        const oy3 = 340;
        const oy4 = 460;
        const oy5 = 580;
        switch (this.status) {
            case controlstatus.R: {
                console.log("Rolling...");
                this.img1.y += this.speed;
                this.img2.y += this.speed;
                this.img3.y += this.speed;
                this.img4.y += this.speed;
                this.img5.y += this.speed;
                if (this.img5.y >= oy5 +120) {
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
            case controlstatus.S: {
                this.speed=50
                console.log("Stopped.");
                this.img1.y = oy1;
                this.img2.y = oy2;
                this.img3.y = oy3;
                this.img4.y = oy4;
                this.img5.y = oy5;
                // Add any additional code you want to execute when the status is "S"
            }
                break;
        }
        
    }    
}
