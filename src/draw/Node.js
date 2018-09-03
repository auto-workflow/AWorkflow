/**
 * @file Node view
 * @author yangpei
 */

import * as utils from 'zrender/lib/core/util';

/**
 * Node基类
 */
export default class Node {

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
     * 将点在给出形状的某一边上等距排列，计算出每个点的坐标
     *
     * @param {Array} points 点集合
     * @param {string} placement 位置top, right, bottom, left
     * @param {zrender.Rect=} box 图形
     * @return {Array<Array<number>>} 坐标
     */
    getPointsPosition(points, placement, box) {
        const b = box || this.dom.box;
        if (b && Array.isArray(points)) {
            const {x, y, width, height} = b.shape;
            let start = [];
            let space = 0;
            switch (placement) {
                case 'top':
                    start = [x, y];
                    space = width / (points.length + 1);
                    break;
                case 'right':
                    start = [x + width, y];
                    space = height / (points.length + 1);
                    break;
                case 'bottom':
                    start = [x, y + height];
                    space = width / (points.length + 1);
                    break;
                case 'left':
                    start = [x, y];
                    space = height / (points.length + 1);
                    break;
                default:
                    start = [x, y];
                    space = width / (points.length + 1);
                    break;
            }
            return points.map((p, index) => {
                if (placement === 'right' || placement === 'left') {
                    return [start[0], start[1] + space * (index + 1)];
                }
                else if (placement === 'top' || placement === 'bottom') {
                    return [start[0] + space * (index + 1), start[1]];
                }
            });
        }
        return [];
    }

    /**
     * 注册画法
     *
     * @param {string} name 画法名称
     * @param {Class} nodeClass 画法类
     */
    static registerNode(name, nodeClass) {
        if (this.nodeClazz[name]) {
            throw new Error(`Do not repeat extends Node with same templateName: ${name}`);
        }
        this.nodeClazz[name] = nodeClass;
    }

    /**
     * 根据名称获取对应的实例
     *
     * @param {string} name 画法名称
     * @return {Class} 画法类
     */
    static getClazzByName(name) {
        return this.nodeClazz[name];
    }

    /**
     * 扩展Node，并且注册画法，才可以通过名字实例化对应的类
     *
     * @param {Object} proto 默认属性
     * @return {Class} 模板的类
     */
    static extend(proto) {
        class SubClass extends Node {
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
                Node.extend.call(this, args);
            }
        }
        utils.extend(SubClass.prototype, proto);
        this.registerNode(proto.drawName, SubClass);
        return SubClass;
    }
}
Node.nodeClazz = {};
