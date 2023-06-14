import SlotBar from "../component/SlotBar";

export default class ReelController extends Laya.Script {
    
    public btnOn: Laya.Button;
    public btnOff: Laya.Button;
    public speed:number;
    public machinebox:Laya.Box
    public bar:Laya.Box
    public arySlotBar:SlotBar[]=[]

    onEnable() {
        this.speed=50
        
        this.machinebox=this.owner.getChildByName("MachineBox") as Laya.Box
        for (let i =0; i<this.machinebox.numChildren;i++){
            this.bar=this.machinebox.getChildAt(i) as Laya.Box
            let slotBar:SlotBar=this.bar.getComponent(SlotBar)
            slotBar.init(i)
            this.arySlotBar.push(slotBar)
            
        }

        // this.b=this.owner.getChildByName("MachineBox") as Laya.Box
        // for (let i =0; i<this.b.numChildren;i++){
        //     this.b2=this.b.getChildAt(i) as Laya.Box
        //     this.p=this.b2.getChildAt(0) as Laya.Panel
        //     for (let i =0; i<this.p.numChildren;i++){
        //         this.b3=this.p.getChildAt(i) as Laya.Box
        //         this.img=this.b3.getChildAt(0) as Laya.Image
        // }
        
    }      
        
        // Laya.timer.frameOnce(30, this, function () {
        //     console.log("30")
        // });
        // Laya.timer.frameOnce(60, this, function () {
        //     console.log("60")
        // });
        // Laya.timer.frameOnce(90, this, function () {
        //     console.log("90")
        // });
        // Laya.timer.frameOnce(120, this, function () {
        //     console.log("120")
        // });

        // Laya.timer.frameOnce(150, this, function () {
        //     console.log("150")
        // });
        // Laya.timer.frameOnce(210, this, function () {
        //     console.log("210")
        // });
        
   

        
        


        // console.log(this.img1.y, this.img2.y, this.img3.y, this.img4.y,this.img5.y);
        

    play=()=>{
        let speedvalue=4
        // console.log("Ready Player One")
        // console.log(this.arySlotBar)
        this.arySlotBar.forEach((slotBar,index)=>{
            Laya.timer.frameOnce(index*speedvalue,slotBar,slotBar.startRun)
        })
        
    }
    roll = () => {
        console.log("roll pressed")
        this.play()
        // this.status = controlstatus.R;
        // console.log("Roll status:", this.status);
        
    }

    stop_roll = () => {
        console.log("STOP")
        this.arySlotBar.forEach((slotBar,index)=>{
            Laya.timer.clear(slotBar,slotBar.startRun)
            Laya.timer.frameOnce(0,slotBar,slotBar.stop)
        })
        // this.status ;
        // console.log("Stop status:", this.status);
    }

    
}
