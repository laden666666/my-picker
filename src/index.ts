import {Picker} from './Picker'
import {IOptions} from './IOptions'

export = function(option: IOptions): Picker{
    return new Picker(option);
}