/**
 * @file Edge view
 * @author yangpei
 */

import * as utils from 'zrender/lib/core/util';

/**
 * Edge基类
 */
export default class Edge {

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
     * 注册
     *
     * @param {string} name 连线画法名称
     * @param {Class} edgeClass  连线类
     */
    static registerEdge(name, edgeClass) {
        if (this.edgeClazz[name]) {
            throw new Error(`Do not repeat extends edge with same name: ${name}`);
        }
        this.edgeClazz[name] = edgeClass;
    }

    /**
     * 根据画法名字获取对应的实例
     *
     * @param {string} name 连线画法名字
     * @return {Class} 连线画法类
     */
    static getClazzByName(name) {
        return this.edgeClazz[name];
    }

    /**
     * 扩展edge，并且注册画法类，才可以通过名字实例化对应的画法对象
     *
     * @param {Object} proto 默认属性
     * @return {Class} 连线画法类
     */
    static extend(proto) {
        class SubClass extends Edge {
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
                Edge.extend.call(this, args);
            }
        }
        utils.extend(SubClass.prototype, proto);
        this.registerEdge(proto.drawName, SubClass);
        return SubClass;
    }
}
Edge.edgeClazz = {};
