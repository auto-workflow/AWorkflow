/**
 * @file shape view
 * @author yangpei
 */

import * as utils from 'zrender/lib/core/util';

export default class Shape {
    constructor() {
        this.props = {
            normal: {}
        };
        this.options = {};
        this.status = 'normal';
        this.dom = null;
    }

    /**
     * 使用zrender渲染对应的形状，返回的是zrender.Displayable的实例对象
     */
    render() {}

    /**
     * 一般调用此方法，便于在实例中添加zrender.Displayable实例
     */
    init() {
        this.dom = this.render();
        if (!this.dom) {
            throw new Error('render() function needs return a zrender.Displayable instance');
        }
        const oldStatus = this.status;
        this.dom.on('mouseover', () => {
            this.setStatus('hover');
        });
        this.dom.on('mouseout', () => {
            this.setStatus(oldStatus);
        });
    }

    /**
     * 设置当前图形的状态
     *
     * @param {string} status 图形的状态,normal|hover|selected...
     */
    setStatus(status) {
        if (this.props[status]) {
            this.status = status;
        }
        this.setRenderProps();
    }

    /**
     * 设置渲染需要的属性
     */
    setRenderProps() {
        if (this.dom) {
            this.dom.attr(this.getRenderProps());
        }
    }

    /**
     * 根据状态获取渲染需要的属性
     *
     * @return {Object} 渲染属性
     */
    getRenderProps() {
        let props = this.props.normal;
        if (this.props[this.status]) {
            props = this.props[this.status];
        }
        return utils.merge({}, props);
    }

    static registerShape(name, Clazz) {
        if (this.clazz[name]) {
            throw new Error(`Do not repeat extends Shape with same type: ${name}`);
        }
        this.clazz[name] = Clazz;
    }

    static getClazzByName(name) {
        return this.clazz[name];
    }

    static extend(proto) {
        class ExtendedClass extends Shape {
            constructor(opts) {
                super(opts);
                this.props = utils.mergeAll([{}, proto.props, opts && opts.props ? opts.props : {}], true);
                this.options = utils.mergeAll([{}, proto.options, opts && opts.options ? opts.options : {}], true);
                this.status = this.options.status || 'normal';
                this.type = proto.type;
            }

            static extend(args) {
                Shape.extend.call(this, args);
            }
        }
        utils.extend(ExtendedClass.prototype, proto);
        this.registerShape(proto.type, ExtendedClass);
        return ExtendedClass;
    }
}

Shape.clazz = {};
