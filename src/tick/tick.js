/**
 * 滚轮滚动时候发声的函数,是一个单例模式
 */
var tick = require('./tick.mp3');
import $ from '../util/domUtil'

function AudioImpl() {
    this.audio = $('<audio></audio>')[0];
    this.audio.src = tick
    $(this.audio).on('loadedmetadata', ()=> {
        this.audio.volume = 0.2;
    })
    window.aa = this.audio
}

AudioImpl.prototype.play = function () {
    try {
        if(this.audio){
            // #6 参考https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
            var isPlaying = this.audio.currentTime > 0 && !this.audio.paused
                && !this.audio.ended && this.audio.readyState > 2;

            if (!isPlaying) {
                this.audio.play();
            }
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
