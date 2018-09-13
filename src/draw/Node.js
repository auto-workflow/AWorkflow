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
     * 将点在给出矩形形状的某一边上等距排列，计算出每个点的坐标
     *
     * @param {Array} points 点集合
     * @param {string} placement 位置top, right, bottom, left
     * @param {zrender.Rect=} box 图形
     * @return {Array<Array<number>>} 坐标
     */
    getRecPointsPosition(points, placement, box) {
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
     * 将点在给出多边形形状的某一边上等距排列，计算出每个点的坐标
     *
     * @param {Array} points 点集合
     * @param {string} placement 位置top, right, bottom, left
     * @param {zrender.Polygon=} box 图形
     * @return {Array<Array<number>>} 坐标
     */
    getPolygonPointsPosition(circles, box) {
        const b = box || this.dom.box;
        if (b && Array.isArray(circles)) {
            let {points, width, height} = b.shape;
            width = width || points[1][0] - points[3][0];
            height = height || points[2][1] - points[0][1];
            let start = [];
            let space = 0;
            return circles.map((circle, index) => {
                let placement = circle.align || 'bottom';
                switch (placement) {
                    case 'top':
                        start = points[0];
                        space = width / (circles.length + 1);
                        break;
                    case 'right':
                        start = points[1];
                        space = height / (circles.length + 1);
                        break;
                    case 'bottom':
                        start = points[2];
                        space = width / (circles.length + 1);
                        break;
                    case 'left':
                        start = points[3];
                        space = width / (circles.length + 1);
                        break;
                    default:
                       start = points[0];
                       space = width / (circles.length + 1);
                       break;
                }
                return [start[0], start[1]];
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
