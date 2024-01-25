import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";

// -----------------------------------------
//
// -----------------------------------------
export class Mark extends MyDisplay {

  private _item: HTMLInputElement

  constructor(opt:any) {
    super(opt)

    this._item = document.createElement('input') as HTMLInputElement
    this._item.type = 'radio'
    this.el.appendChild(this._item)

    this._resize()
  }

  public setValue(b :boolean):void {
    this._item.checked = b
    if(Func.isXS()) {
      Tween.set(this._item, {
        opacity: b ? 1 : 0,
      })
    }

  }

  protected _update():void {
    super._update()
  }

  protected  _resize(): void {
    super._resize()

    const size = 10
    Tween.set(this._item, {
      width: size,
      height: size,
      x: -size * 0.5,
      y: -size * 0.5,
    })
  }
}







