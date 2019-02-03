import {Picker} from './Picker'
import {IOptions,  IPicker} from './API'

import './style/style.scss';
import './style/wheel.scss';
import './style/wheel3D.scss';

export = function(option: IOptions): IPicker{
    return new Picker(option);
}