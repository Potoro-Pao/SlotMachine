import randomImg from "../fakeserver/randomImage";
export class TDM{
    public static instance:TDM;
    public static init(){
        this.instance=new TDM();
    }
    public image_list:string[]=["icArthas","icAzmodan","icHstone","icDeathwing","icHydralisk","icKiriko","icLurker","icMurky","icOverlord","icOwl","icSylvanas","icTracer","icTyrael","icZen","icZergling"]

    constructor(){
        randomImg.init()
        // console.log(this.image_list[Math.floor(Math.random()*15)]);

        
    }
     
    get source(){
        return randomImg.instance.url_source+this.image_list[Math.floor(Math.random()*14)]+".png"
    }
    get shuffled_list(){
        let shuffled_list_img:string;
        for (let i of randomImg.instance.shuffled_list){
            shuffled_list_img=randomImg.instance.url_source+this.image_list[i]+".png"
        }

        return shuffled_list_img
    }
}