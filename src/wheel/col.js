/**
 * Created by njz on 17/1/21.
 */
function Cal(option) {
    //默认的显示key
    var defaultLabelKey = "label";
    //默认的值key
    var defaultValueKey = "value";



    //如果option是一个数组,视为仅存在options的情况
    if(Array.isArray(option)){
        this.options = option;
        this.prefix = "";
        this.suffix = "";
        this.labelKey = defaultLabelKey;
        this.valueKey = defaultValueKey;
    } else {
        this.options = option.options || [];
        this.prefix = option.prefix || "";
        this.suffix = option.suffix || "";
        this.labelKey = option.labelKey || defaultLabelKey;
        this.valueKey = option.valueKey || defaultValueKey;
    }


}

module.exports = Cal;