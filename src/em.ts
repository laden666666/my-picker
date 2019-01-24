/**
 * @file 获取0.01em的实际像素值
 */

export function em():number {
    //根据屏幕的dpr判断em大小。如果dpr不是1，说明不是pc屏幕，此时选取window.innerWidth和window.innerHeight最小值的100分之一做1em。
    //如果dpr是1，表示可能是pc屏幕，此时要求控件不能过大，所以去window.innerWidth、window.innerHeight、650当中的最小值的100分之一做1em
    if(window.devicePixelRatio && window.devicePixelRatio > 1){
        return Math.min(window.innerWidth, window.innerHeight) / 100;
    } else {
        return Math.min(window.innerWidth, window.innerHeight, 500) / 100;
    }
}
