/**
 * @file 获取0.01em的实际像素值
 */

export function em():number {
    // 如果height大于等于width，说明是pc或者手机的横屏模式，弹框显示在屏幕正中间
    // 否则表示是手机竖屏，弹框显示在屏幕下面
    if(window.innerWidth <= window.innerHeight){
        return window.innerWidth / 100;
    } else {
        return Math.min(window.innerHeight, 400) / 100;
    }
}
