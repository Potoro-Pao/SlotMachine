export default class GameSymbol extends Laya.Script{
    // private gamesymbolbox:Laya.Box//他好像不用這麼做了，因為他本身就是owner

    public img:Laya.Image
    public init() {
        // this.gamesymbolbox=this.owner as Laya.Box
        this.img=this.owner.getChildAt(0) as Laya.Image
    }
    onEnable(): void {
        console.log(this.owner.name)
        // console.log(this.gamesymbolbox.name)
    }


set image(url:string){
    if (this.img){
        this.img.skin=url;
    }
}
set y(value:number){
    this.img.y=value
}

set height(value:number){
    this.img.height=value
}
get image():string{
    return this.img.skin;
}

//他之所以裡面還有一個main是因為他是要取他box本身的高度，但是我覺得我box很難控制
//我之後先直接拿ｉｍａｇｅ試試看讓他轉，因為image的高寬比較在正常的位置


get height():number{
    return this.img.height
}
get width():number{
    return this.img.width
}
get x():number{
    return this.img.x
}

get y():number{
    return this.img.y
}
}