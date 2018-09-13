/**
 * @file rect
 * @author xueliqiang
 */

import Polygon from 'zrender/lib/graphic/shape/Polygon';
import Shape from './Shape';

export default Shape.extend({
    type: 'Polygon',
    props: {
        normal: {
            shape: {},
            style: {}
        },
        hover: {
            shape: {},
            style: {}
        }
    },
    render() {
        const r = new Polygon(this.getRenderProps());
        return r;
    }
});