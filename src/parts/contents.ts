import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Val } from "../libs/val";
import { Mark } from "./mark";
import { Slider } from "./slider";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _slider: Array<Slider> = []
  private _mark: Array<Mark> = []

  private _offsetAngle: Array<Val> = []
  // private _actionCnt: number = 0

  constructor(opt:any) {
    super(opt)

    for(let i = 0; i < 3; i++) {
      const sl = document.createElement('div')
      sl.classList.add('js-slider')
      this.el.appendChild(sl)

      const slider = new Slider({
        el: sl,
        itemId: i,
      })
      this._slider.push(slider)

      this._offsetAngle.push(new Val())
    }

    for(let i = 0; i < 60; i++) {
      const mk = document.createElement('div')
      mk.classList.add('js-slider')
      this.el.appendChild(mk)

      const mark = new Mark({
        el: mk,
        itemId: i,
      })
      this._mark.push(mark)
    }

    this._resize()
  }


  // private _action():void {
  //   this._actionCnt++

  //   this._offsetAngle.forEach((v,i) => {
  //     Tween.a(v, {
  //       val: [0, 1]
  //     }, 1, i * 0.1, Tween.ExpoEaseInOut)
  //   })

  // }


  protected _update():void {
    super._update()

    // if(this._c % (60 * 5) === 0) {
    //   this._action()
    // }

    const sw = Func.sw()
    const sh = Func.sh()

    // 現在時刻を角度に変換
    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes()
    const s = now.getSeconds()
    const ms = now.getMilliseconds()
    const hDeg = (h % 12) * 30 + m * 0.5
    const mDeg = m * 6 + s * 0.1
    const sDeg = (s * 6 + ms * 0.006)

    // console.log(sDeg)

    this._slider.forEach((val,i) => {
      // const ang = this._offsetAngle[i]
      Tween.set(val.el, {
        x: sw * 0.5,
        y: sh * 0.5,
        rotationZ: ([hDeg, mDeg, sDeg][i] - 90),
      })

      let rangeVal = [0.5, 0.9, 0.1][i]
      // if(this._actionCnt % 2 === 0) {
      //   rangeVal = 1 - rangeVal
      // }
      val.setValue(rangeVal)
    })
  }

  protected  _resize(): void {
    const radius = Math.min(Func.sw(), Func.sh()) * 0.4
    const sliderW = radius * 0.85
    const sliderH = 20

    this._slider.forEach((val) => {
      val.setSize(sliderW, sliderH)
    })

    this._mark.forEach((val, i) => {
      const deg = i * (360 / this._mark.length)
      const rad = Util.radian(deg)
      const x = Func.sw() * 0.5 + Math.cos(rad) * radius
      const y = Func.sh() * 0.5 + Math.sin(rad) * radius

      val.setValue(deg % 30 === 0)

      Tween.set(val.el, {
        x: x,
        y: y,
      })
    })
  }
}