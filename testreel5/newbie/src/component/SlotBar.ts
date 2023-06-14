import GameSymbol from "./GameSymbol";
import { TDM } from "../model/TDM";
enum controlstatus {
    N = 0,
    R = 1,
    S = 2,
}

export default class SlotBar extends Laya.Script {
    private status: controlstatus;
    private speed:number
    /** @prop {name:acceleration, tips:"加速度", type:Number, default:1}*/
    private acceleration: number = 1;
    /** @prop {name:maxSpeed, tips:"滾輪最大速度", type:Number, default:30}*/
    private maxSpeed: number = 30;
    /** @prop {name:minSpeed, tips:"滾輪最小速度", type:Number, default:10}*/
    private minSpeed: number = 10;
    /** @prop {name:prestart, tips:"滾輪開始時是否需回卷", type:Bool, default:false}*/
    private prestart: boolean = false;
    
    /** @prop {name:prestartSpeed, tips:"滾輪開始時回捲速度", type:Bool, default:true}*/
    private prestartSpeed:number=-10
    /** @prop {name:slowDown, tips:"滾輪停止前是否需漸慢", type:Bool, default:true}*/
    /** @prop {name:symbolGap, tips:"symbol間距", type:Number, default:0}*/
    private slowDown:boolean=true
    private symbolGap: number = 0;
    private barpanel:Laya.Panel;
    private nextSymbol:GameSymbol
    private currentSymbol:GameSymbol[]=[]
    private lastSymbol:GameSymbol
    private symbolHeight:number
    public init(panelnum:number) {
        this.barpanel=this.owner.getChildByName(`BarPanel0${panelnum+1}`) as Laya.Panel
        
        for (let i =0; i<this.barpanel.numChildren;i++){
            
            let symbol=this.barpanel.getChildAt(i) as Laya.Box
            let item:GameSymbol=symbol.getComponent(GameSymbol)
            
            item.init()
            if (i==0){this.nextSymbol=item;}
            else if (i==this.barpanel.numChildren-1){
                this.lastSymbol=item
            }
            else{
                this.currentSymbol.push(item)
            }
            // item.image="res/icTracer.png"//目前的image是代表每張都會抓
            // let prefix=-1
            // Laya.Tween.to(item, {y: item.y + 50}, 100, Laya.Ease.linearNone, Laya.Handler.create(this, function() {
            //     Laya.Tween.to(item, {y: (item.height+35) * (prefix + i)}, 100, Laya.Ease.linearNone);
            // }));
            // item.image='res/icHstone.png'
            item.image=TDM.instance.source
        }
        this.symbolHeight=this.currentSymbol[0].height
        
    }

    private switch(){
        this.lastSymbol.image=TDM.instance.shuffled_list
        let temp=this.lastSymbol;
        this.lastSymbol=this.currentSymbol.pop()
        this.currentSymbol.unshift(this.nextSymbol)
        this.nextSymbol=temp
        this.nextSymbol.img.y=0

    }




    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    
    constructor() { super(); 
        console.log("新的數字",TDM.instance.shuffled_list)
       
    }
    
    startRun(){
        this.status=controlstatus.R
        console.log("slotbarstatus",this.status)
        }
    
    barRun(){
        if (this.status==controlstatus.S)return;
        const halfSymbolHeight=(this.symbolHeight+this.symbolGap)/2
        const targetSwitchPosition=this.barpanel.height+halfSymbolHeight
        this.nextSymbol.img.y+=30
        this.lastSymbol.img.y+=30
        this.currentSymbol.forEach(symbol=>{
            symbol.img.y+=30
    })
        
        
        if (this.lastSymbol.img.y>=870){
            this.switch()
            // this.nextSymbol.img.y=oyn
            // this.lastSymbol.img.y=oyl
            // this.currentSymbol[0].img.y=oyc1
            // this.currentSymbol[1].img.y=ocy2
            // this.currentSymbol[2].img.y=ocy3
        }   
        this.status=controlstatus.R
        
        
    }
    stop(){
        this.status=controlstatus.S
        console.log("slotbarstatus",this.status)
    }
    stopRun(){
        console.log("----------------------------");
        
        console.log(this.nextSymbol.img.y);
        console.log(this.currentSymbol[0].img.y);
        console.log(this.currentSymbol[1].img.y);
        console.log(this.currentSymbol[2].img.y);
        console.log(this.lastSymbol.img.y);
        console.log("----------------------------");

        
        this.nextSymbol.img.y=15.5
        this.currentSymbol[0].img.y=190
        this.currentSymbol[1].img.y=364
        this.currentSymbol[2].img.y=547
        this.lastSymbol.img.y=725
    }
    onEnable(): void {
        this.status = controlstatus.N;
    }
    onUpdate(): void {
        console.log(this.status);
        // console.log("狀態", this.status);
        // this.barpanel.y+=1
        // const oy1 = 100;
        // const oy2 = 270;
        // const oy3 = 340;
        // const oy4 = 460;
        // const oy5 = 580;
        switch (this.status) {
            case controlstatus.R: {
                console.log("Rolling...");
                this.barRun()
                // if (this.speed<=this.maxSpeed){
                //     this.speed+=this.acceleration
                // }
                // else{
                //     this.speed<=this.maxSpeed


                // }
                
            }
                break;
            case controlstatus.S: {
                this.stopRun()
                this.speed=50
                console.log("Stopped.");
            }
                break;
        }
        
        
    }    
    

    // set y(value:number){
    //     this.y=value
    // }為了試tween才寫的

    onDisable(): void {
    }
}