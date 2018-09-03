/**
 * @file Image
 * @author yangpei
 */

import Image from 'zrender/lib/graphic/Image';
import Shape from './Shape';

export default Shape.extend({
    type: 'Image',
    props: {
        normal: {
            shape: {},
            style: {}
        }
    },
    render() {
        const i = new Image(this.getRenderProps());
        return i;
    }
});
