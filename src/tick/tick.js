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
            this.audio.play();
            this.audio.currentTime = 0;
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
