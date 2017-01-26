/**
 * 滚轮滚动时候发声的函数,是一个单例模式
 */
var tick = require('./tick.wav');

function AudioImpl() {
    if(Audio) {
        this.audio = new Audio(tick);
        this.audio.volume=0.2;
    }
}

AudioImpl.prototype.play = function () {
    try {
        if(this.audio){
            this.audio.currentTime = 0;
            this.audio.play();
        }
    } catch (e){
        console.error(e);
    }
}

var audioImpl;

module.exports = function () {
    if(audioImpl){
        return audioImpl;
    } else {
        audioImpl = new AudioImpl();
        return audioImpl;
    }
}
