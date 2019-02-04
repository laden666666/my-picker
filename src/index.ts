import {Picker} from './Picker'
import {IOptions,  IPicker, IMyPicker} from './API'

import './style/style.scss';
import './style/wheel.scss';
import './style/wheel3D.scss';

let myPicker: IMyPicker = function(option: IOptions): IPicker{
    return new Picker(option);
} as any

//通过DefinePlugin对去package.json的版本
declare const PLUGIN_VERSION: string;
myPicker.version = PLUGIN_VERSION

export = myPicker