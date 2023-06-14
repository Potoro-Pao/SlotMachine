export default class randomImg{
    public static instance:randomImg
    public source:string="res/"
    public static init(){
        this.instance=new randomImg()
    }

    shuffle(){
        let new_list:number[]=[]
        for (let i =0; i<5;i++){
            new_list.push(Math.floor(Math.random()*15))
        }
        return new_list
    }    

    get url_source(){
        return this.source
    }
    get shuffled_list(){
        let returned_new_list=this.shuffle()
        return returned_new_list
    }

    
}