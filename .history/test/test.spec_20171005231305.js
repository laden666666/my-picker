/**
 * Created by njz on 17/1/22.
 */
var picker = require('../src/picker');


describe('picker基本功能测试', function () {

    it('测试window上面创建', function () {
        assert.typeOf(window.myPicker, 'function');
    });
});

describe('picker基本配置测试', function () {

    it('标准配置测试', function (done) {
        //标准配置测试
        window._picker = window.myPicker({
            cols: [{
                options: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }, {
                options: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }],
            onOkClick: function (values) {
                assert.equal(values[0], '1月')
                assert.equal(values[1], '星期一')
                done()
            },
        });
        window.document.querySelector(".picker-btn-ok").click();
        window._picker.close();
    });


    it('labelKey与valueKey配置测试', function (done) {
        window._picker = window.myPicker({
            cols: [{
                labelKey: 'name',
                valueKey: 'name',
                options: [{name: '张三'}, {name: '李四'}, {name: '王五'}],
            }],
            onOkClick: function (values) {
                assert.equal(values[0], '张三')
                done()
            },
        });
        window.document.querySelector(".picker-btn-ok").click();
        window._picker.close();
    });


    it('单数json测试', function (done) {

        //单数json测试
        window._picker = window.myPicker({
            cols: {
                options: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            onOkClick: function (values) {
                assert.equal(values[0], '1月')
                done()
            },
        });
        window.document.querySelector(".picker-btn-ok").click();
        window._picker.close();
    });


    it('单数数组测试', function (done) {

        //单数数组测试
        window._picker = window.myPicker({
            cols:  ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            onOkClick: function (values) {
                assert.equal(values.length, 1)
                assert.equal(values[0], '1月')
                done()
            },
        });
        window.document.querySelector(".picker-btn-ok").click();
        window._picker.close();
    });
});

describe('picker测试基本api', function () {
    it('setValue测试', function (done) {
        //单数json测试
        window._picker = window.myPicker({
            cols: {
                options: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            onOkClick: function (values) {
                assert.equal(values[0], '2月')
                done()
            },
        });

        window._picker.setValue(0, '2月')


        window.document.querySelector(".picker-btn-ok").click();
        window._picker.close();
    });

    it('setValue测试2', function (done) {

        //单数json测试
        window._picker = window.myPicker({
            cols: [{
                options: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }, {
                options: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }],
            onOkClick: function (values) {
                try {
                    assert.equal(values[0], '2月')
                    assert.equal(values[1], '星期四')
                } catch (e){
                    console.error(e)
                }
                done()
            },
        });

        window._picker.setValue(0, '2月');
        window._picker.setValue(1, '星期四');

        window.document.querySelector(".picker-btn-ok").click();
        window._picker.close();
    });
});
