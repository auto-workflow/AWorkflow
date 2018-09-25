import zrender from 'zrender';
import defaultTemplate from '../../src/template/defaultTemplate';

let diamondTemplate = {
};
zrender.util.merge(diamondTemplate, defaultTemplate, {
    templateName: 'diamondTemplate'
});
diamondTemplate.node.box.name = 'Polygon';
diamondTemplate.node.box.normal.shape = {
    // [top, right, bottom, left]
    points: [[85, 0], [170, 50], [85, 100], [0, 50]]
    // height: 100,
    // width: 170
};
diamondTemplate.node.text.position = [45, 40];

export default diamondTemplate;

