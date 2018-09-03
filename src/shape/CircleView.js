/**
 * @file Circle
 * @author yangpei
 */

import Circle from 'zrender/lib/graphic/shape/Circle';
import Shape from './Shape';

export default Shape.extend({
    type: 'Circle',
    props: {
        position: [0, 0],
        normal: {
            shape: {},
            style: {}
        }
    },
    render(ctx) {
        const c = new Circle(this.getRenderProps());
        c.position = this.props.position;
        return c;
    }
});
