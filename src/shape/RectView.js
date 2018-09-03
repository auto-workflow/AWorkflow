/**
 * @file rect
 * @author yangpei
 */

import Rect from 'zrender/lib/graphic/shape/Rect';
import Shape from './Shape';

export default Shape.extend({
    type: 'Rect',
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
        const r = new Rect(this.getRenderProps());
        return r;
    }
});
