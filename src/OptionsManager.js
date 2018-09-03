/**
 * @file OptionsManager
 * @author yangpei
 */

/**
 * OptionsManager 配置管理
 *
 * @class OptionManager
 */
export default class OptionsManager {
    constructor(options) {
        const globalConfig = {
            // 是否静态图片
            isStatic: true,
            // 整个图默认模版
            templateName: 'defaultTemplate',
            // 是否需要自动排序，true: 程序智能计算每个node的位置，false: 根据node position来定位
            autoSort: false,
            // 自动排序时，true: 水平排序，false: 垂直排序
            horizontal: true,
            // 画布元素是否可拖动
            draggable: true
        };
        this.options = Object.assign({}, globalConfig, options);
    }

    /**
     * 获取zrender的配置参数
     *
     * @return {Object} zrender配置参数
     */
    getZrOptions() {
        const zrDefaltOptions = {
            renderer: 'canvas',
            devicePixelRatio: '2',
            width: 'auto',
            height: 'auto'
        };
        if (!this.zrOptions) {
            const keys = Object.keys(zrDefaltOptions);
            this.zrOptions = Object.assign({}, zrDefaltOptions);
            keys.forEach(key => {
                if (this.options[key]) {
                    this.zrOptions[key] = this.options[key];
                }
            });
        }
        return this.zrOptions;
    }
}
