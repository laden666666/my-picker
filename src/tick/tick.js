/**
 * 滚轮滚动时候发声的函数,是一个单例模式
 */
var tick = require('./tick.mp3');
import $ from '../util/domUtil'
import browserUtil from '../util/browserUtil'
import {dataURLtoU8arr} from './dataURLtoU8arr'

function AudioImpl() {
    //#4，如果支持mse优先使用mse，这样解决base64禁止发音的问题
    this.audio = $('<audio></audio>')[0];

    const MediaSource = window.MediaSource || window.WebkitMediaSource;
    if(MediaSource && MediaSource.isTypeSupported('audio/mpeg')){
        var mediaSource = new MediaSource();
        this.audio.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener('sourceopen', function (e) {
            var sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
            sourceBuffer.addEventListener('updateend',function(){
                mediaSource.endOfStream();
            })
            sourceBuffer.appendBuffer(dataURLtoU8arr(tick));
        });
    } else {
        this.audio.src = tick
    }
    $(this.audio).on('loadedmetadata', ()=> {
        this.audio.volume = 0.2;
    })
}

AudioImpl.prototype.play = function () {
    try {
        if(this.audio){
            // #5 参考https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
            var isPlaying = this.audio.currentTime > 0 && !this.audio.paused
                && !this.audio.ended && this.audio.readyState > 2;

            if (!isPlaying) {
                this.audio.play();
                if(browserUtil.isAndroid() && browserUtil.androidVersion() < 5){
                    this.audio = $('<audio></audio>')[0];
                    this.audio.src = tick
                }
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
