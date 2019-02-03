/**
 * 滚轮滚动时候发声的函数,是一个单例模式
 */
var tick = require('./tick.mp3');
import $ from '../util/domUtil'
import browserUtil from '../util/browserUtil'
import {dataURLtoU8arr} from './dataURLtoU8arr'

// 合成音
class Sound {
    constructor(context = new AudioContext) {
        this.context = context;
        this.init()
    }
    
    init() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();
    
        this.oscillator.frequency.value = 150
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
    }
  
    play() {
        this.init();
        this.gainNode.gain.setValueAtTime(3, this.context.currentTime);
                
        this.oscillator.start();
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
        this.oscillator.stop(this.context.currentTime + 1);
    }
    
    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
        this.oscillator.stop(this.context.currentTime + .25);
    }
   
}  

function AudioImpl() {
    //#4，如果支持mse优先使用mse，如果支持合成声音则使用，这样解决base64禁止发音的问题
    this.audio = $('<audio></audio>')[0];

    const MediaSource = window.MediaSource || window.WebkitMediaSource;
    const AudioContext = window.AudioContext || window.WebkitAudioContext;
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
    } else if(AudioContext) {
        this.audio = new Sound
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
            if(this.audio instanceof Sound){
                // 播放合成音
                this.audio.play();
            } else {
                // h5音频文件
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
