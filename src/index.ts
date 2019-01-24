import {Picker} from './Picker'
import {IOptions,  IPicker} from './API'

export = function(option: IOptions): IPicker{
    return new Picker(option);
}