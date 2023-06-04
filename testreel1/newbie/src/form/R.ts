import { ui } from "../ui/layaMaxUI";

import ReelController from "../controller/RC";

export default class ReelPageControl extends ui.SecondUI{

    public reel:Laya.Panel
    public img:Laya.Image
    public box:Laya.Box
    public iconList:string[]
    public btnOn:Laya.Button
    public btnOff:Laya.Button
    public controller:ReelController=null;
    constructor(){
        super()
        this.iconList=["icTracer","icLurker","icAzmodan","icPiggy"]
    }
    onEnable(): void {
        this.controller=this.getComponent(ReelController)
 
        this.btnOn=this.On as Laya.Button
        this.btnOff=this.Off as Laya.Button
        this.reel=this.panelSymbol as Laya.Panel
        
        for (let i =0; i<this.reel.numChildren;i++ ){
            this.box=this.reel.getChildAt(i) as Laya.Box
            this.img=this.box.getChildAt(0) as Laya.Image
            console.log(this.img.name)
            const random = Math.floor(Math.random() * this.iconList.length);
            console.log(random, this.iconList[random]);
            
        }
        this.btnOn.on(Laya.Event.CLICK,this,this.controller.roll)
        this.btnOff.on(Laya.Event.CLICK,this,this.controller.stop_roll)
        

    }


    
    
} 