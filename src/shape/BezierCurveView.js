/**
 * @file BezierCurveView
 * @author yangpei
 */

import BezierCurve from 'zrender/lib/graphic/shape/BezierCurve';
import Shape from './Shape';
import {calcuBezizerControlPoints} from '../utils';

export default Shape.extend({
    type: 'BezierCurve',
    props: {
        normal: {
            shape: {},
            style: {}
        }
    },
    render() {
        const props = this.getRenderProps();
        props.shape.x1 = this.props.start[0];
        props.shape.y1 = this.props.start[1];
        props.shape.x2 = this.props.end[0];
        props.shape.y2 = this.props.end[1];
        // 添加贝塞尔曲线控制点
        const cp = calcuBezizerControlPoints(this.props.start, this.props.end, this.props.pointTo);
        cp.forEach((p, i) => {
            props.shape['cpx' + (i + 1)] = p[0];
            props.shape['cpy' + (i + 1)] = p[1];
        });
        const b = new BezierCurve(props);
        return b;
    }
});
