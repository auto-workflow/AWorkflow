/**
 * @file Text
 * @author yangpei
 */

import Text from 'zrender/lib/graphic/Text';
import Shape from './Shape';

export default Shape.extend({
    type: 'Text',
    props: {
        normal: {
            shape: {},
            style: {}
        }
    },
    render() {
        const t = new Text(this.getRenderProps());
        t.position = this.props.position;
        return t;
    }
});
