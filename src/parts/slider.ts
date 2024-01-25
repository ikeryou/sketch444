import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";

// -----------------------------------------
//
// -----------------------------------------
export class Slider extends MyDisplay {

  private _item: HTMLInputElement
  private _value: number = 0
  private _tgValue: number = 0

  constructor(opt:any) {
    super(opt)

    this._item = document.createElement('input') as HTMLInputElement
    this._item.type = 'range'
    this.el.appendChild(this._item)

    if(opt.itemId == 2) {
      Tween.set(this._item, {
        rotationZ: 180,
      })
    }

    this._resize()
  }

  public setValue(v :number):void {
    this._tgValue = v
  }

  public setSize(w:number, h:number):void {
    Tween.set(this._item, {
      width: w,
      height: h,
      y: -h * 0.5,
    })
  }

  protected _update():void {
    super._update()

    this._value += (this._tgValue - this._value) * 0.2
    this._item.value = (this._value * 100).toString()
  }

  protected  _resize(): void {
    super._resize()
  }
}







