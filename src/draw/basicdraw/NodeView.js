/**
 * @file basic node 画法
 * @author yangpei
 */

import Group from 'zrender/lib/container/Group';
import Node from '../Node';
import Shape from '../../shape/Shape';
import '../../shape/RectView';
import '../../shape/TextView';
import '../../shape/ImageView';
import '../../shape/CircleView';

/**
 * 节点
 */
export default Node.extend({
    drawName: 'basicNode',
    props: {
        id: '',
        nodeName: '',
        position: [0, 0],
        input: [],
        output: [],
        config: {}
    },
    $constructor() {
        this.dom = {};
        this.dom.group = new Group();
        this.children = {};
    },

    /**
     * 渲染输入点
     */
    renderInputCircle() {
        if (Array.isArray(this.props.input)) {
            const g = this.dom.group;
            const placement = this.props.config.inputCircle.circlePosition || 'top';
            const inputPoints = this.getPointsPosition(this.props.input, placement);
            this.props.input.forEach((input, index) => {
                const ShapeClazz = Shape.getClazzByName('Circle');
                const position = inputPoints[index];
                const props = {
                    position,
                    ...this.props.config.inputCircle || {}
                };
                const s = new ShapeClazz({
                    props
                });
                if (input.status === 'connected') {
                    s.setStatus('connected');
                }
                s.init();
                g.add(s.dom);
                if (Array.isArray(this.dom.inputCircles)) {
                    this.dom.inputCircles.push(s.dom);
                    this.children.inputCircles.push(s);
                }
                else {
                    this.dom.inputCircles = [s.dom];
                    this.children.inputCircles = [s];
                }
            });
        }
    },

    /**
     * 渲染输出点
     */
    renderOutputCircle() {
        if (Array.isArray(this.props.output)) {
            const g = this.dom.group;
            const placement = this.props.config.outputCircle.circlePosition || 'bottom';
            const outputPoints = this.getPointsPosition(this.props.output, placement);
            this.props.output.forEach((output, index) => {
                const ShapeClazz = Shape.getClazzByName('Circle');
                const position = outputPoints[index];
                const props = {
                    position,
                    ...this.props.config.outputCircle || {}
                };
                const s = new ShapeClazz({
                    props
                });
                s.init();
                g.add(s.dom);
                if (Array.isArray(this.dom.outputCircles)) {
                    this.dom.outputCircles.push(s.dom);
                    this.children.outputCircles.push(s);
                }
                else {
                    this.dom.outputCircles = [s.dom];
                    this.children.outputCircles = [s];
                }
            });
        }
    },

    /**
     * 渲染整个节点图形
     *
     * @param {Object} options 渲染参数，主要是Aworkflow的全局配置
     * @return {zrender.Group} zrender.Group实例
     */
    render(options) {
        const g = this.dom.group;
        if (g) {
            g.removeAll();
        }
        g.position[0] = this.props.position[0];
        g.position[1] = this.props.position[1];
        if (this.props.config) {
            // input，output需要根据box的坐标进行位置修正，所以单独渲染
            for (let key in this.props.config) {
                if (this.props.config.hasOwnProperty(key)) {
                    if (key !== 'inputCircle' && key !== 'outputCircle') {
                        const shape = this.props.config[key];
                        const ShapeClazz = Shape.getClazzByName(shape.name);
                        const s = new ShapeClazz({
                            props: shape,
                            options: options
                        });
                        s.init();
                        this.dom[key] = s.dom;
                        this.children[key] = s;
                        g.add(s.dom);
                    }
                }
            }
            this.renderInputCircle();
            this.renderOutputCircle();
        }
        return g;
    }
});
