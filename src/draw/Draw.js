/**
 * @file draw view
 * @author yangpei
 */

import * as utils from 'zrender/lib/core/util';

/**
 * Draw基类
 */
export default class Draw {

    /**
     * 渲染方法
     *
     * @param {Zrender=} zrender Zrender对象
     * @param {Object=} options 渲染参数
     * render(zrender, options)
     * render(options)
     */
    render() {}

    /**
     * 注册画法
     *
     * @param {string} name 画法名称
     * @param {Class} draw 类
     */
    static registerDraw(name, drawClass) {
        if (this.draw[name]) {
            throw new Error(`Do not repeat extends Draw with same drawName: ${name}`);
        }
        this.draw[name] = drawClass;
    }

    /**
     * 根据画法名称获取对应的类
     *
     * @param {string} name 画法名称
     * @return {Class} 类
     */
    static getClazzByName(name) {
        return this.draw[name];
    }

    /**
     * 扩展Draw，并且注册画法，才可以通过名字实例化对应的基础绘制对象
     *
     * @param {Object} proto 默认属性
     * @return {Class} 画法类
     */
    static extend(proto) {
        class SubClass extends Draw {
            constructor(opts) {
                super(opts);
                // deep copy
                this.props = utils.mergeAll([{}, proto.props, opts && opts.props ? opts.props : {}], true);
                this.drawName = proto.drawName;
                if (proto.$constructor) {
                    proto.$constructor.call(this, opts);
                }
            }
            static extend(args) {
                Draw.extend.call(this, args);
            }
        }
        utils.extend(SubClass.prototype, proto);
        this.registerDraw(proto.drawName, SubClass);
        return SubClass;
    }
}
Draw.draw = {};
