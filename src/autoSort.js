/**
 * @file autosort
 * @author zhousheng
 */

/**
 * 智能排列
 *
 * @param {Object} option 参数描述
 * @param {Array} option.nodes 节点信息
 * @param {Array} option.edges 关系数组
 * @param {boolean=} option.horizontal true:水平排列,false:垂直排列
 * @param {align=} option.align middle:中间对齐 start:左对齐或上对齐 end:右对齐或下对齐
 * @param {number=} option.cWidth 画布宽度
 * @param {number=} option.cHeight 画布高度
 * @param {number=} option.beginX 起点X坐标，默认10
 * @param {number=} option.beginY 起点Y坐标，默认10
 * @param {number=} option.spaceX 横向间距，默认200
 * @param {number=} option.spaceY 纵向间距，默认100
 * @return {Object} 返回带position属性的nodes
 */
export default function (option) {
    option.nodes.forEach((node, index) => {
        node.level = 1;
    });
    let srcId = '';
    let toId = '';
    let srcIndex = 0;
    let toIndex = 0;
    let srcNode = null;
    let toNode = null;
    // 深度
    let depth = 1;
    // 排序
    for (let index = 0, len = option.edges.length; index < len - 1; index++) {
        for (let jIndex = 0; jIndex < len - 1 - index; jIndex++) {
            if (option.edges[jIndex].src.split(':')[0] === option.edges[jIndex + 1].to.split(':')[0]) {
                let temp = option.edges[jIndex];
                option.edges[jIndex] = option.edges[jIndex + 1];
                option.edges[jIndex + 1] = temp;
            }
        }
    }
    option.edges.forEach((edge, index) => {
        srcId = edge.src.split(':')[0];
        srcIndex = edge.src.split(':')[1] * 1;
        toId = edge.to.split(':')[0];
        toIndex = edge.to.split(':')[1] * 1;
        option.nodes.forEach(cNode => {
            if (cNode.id === srcId) {
                srcNode = cNode;
            }
            else if (cNode.id === toId) {
                toNode = cNode;
            }
        });
        toNode.level = Math.max(toNode.level, srcNode.level + 1);
        depth = Math.max(depth, toNode.level);
        if (!srcNode.children) {
            srcNode.children = [toNode.id];
        }
        else {
            srcNode.children.push(toNode.id);
        }
        if (!toNode.parents) {
            toNode.parents = [srcNode.id];
        }
        else {
            toNode.parents.push(srcNode.id);
        }
    });
    option.nodes.forEach(node => {
        if (node.children === undefined) {
            node.children = [];
        }
        if (node.parents === undefined) {
            node.parents = [];
        }
    });
    // 宽度数组
    let widthArr = new Array(depth);
    let lineCount = 0;

    let tempNode;
    let outIndex = 0;
    let inIndex = 0;
    let outLength = option.nodes.length;
    // 按order排序
    for (outIndex = 0; outIndex < outLength - 1; outIndex++) {
        for (inIndex = 0; inIndex < outLength - 1 - outIndex; inIndex++) {
            if (option.nodes[inIndex].level > option.nodes[inIndex + 1].level) {
                tempNode = option.nodes[inIndex];
                option.nodes[inIndex] = option.nodes[inIndex + 1];
                option.nodes[inIndex + 1] = tempNode;
            }
        }
    }
    // 没有子节点的node放置在最后
    for (outIndex = 0; outIndex < outLength - 1; outIndex++) {
        for (inIndex = 0; inIndex < outLength - 1 - outIndex; inIndex++) {
            if (option.nodes[inIndex].level === 1 && option.nodes[inIndex + 1].level === 1) {
                if (option.nodes[inIndex].children.length < option.nodes[inIndex + 1].children.length) {
                    tempNode = option.nodes[inIndex];
                    option.nodes[inIndex] = option.nodes[inIndex + 1];
                    option.nodes[inIndex + 1] = tempNode;
                }
            }
        }
    }
    function arrayMix(arr1, arr2) {
        return arr1.some((item, index) => {
            if (arr2.includes(item)) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    console.log(option.nodes);
    option.nodes.forEach(node => {
        let level = node.level;
        widthArr[level - 1] = widthArr[level - 1] === undefined ? 1 : widthArr[level - 1] + 1;
        node.order = widthArr[level - 1];
        lineCount = Math.max(lineCount, node.order);
        if (node.children === undefined) {
            node.children = [];
        }
        if (node.parents === undefined) {
            node.parents = [];
        }
    });
    // 更新position
    let {horizontal = true, align = 'middle', beginX = 10, beginY = 10, spaceX = 200, spaceY = 100} = option;
    let coordX = 0;
    let coordY = 0;
    let newNodes = [];

    function updateOrder(node, delta1, delta2) {
        let {level, order, children} = node;
        let childrenLen = children.length;
        option.nodes.forEach((node, index) => {
            if (node.level <= level) {
                if (node.order === order) {
                    node.order += delta1;
                }
                else if (node.order > order) {
                    node.order += delta2;
                }
            }
        });
        let childrenNodes = option.nodes.filter(node => {
            return children.includes(node.id);
        });
        childrenNodes.forEach((node, index) => {
            node.order = order + index;
        });
    }
    function updateCurrentOrder(node) {
        let parents = node.parents;
        let parentNode = option.nodes.find(item => {
            return item.id === parents[0];
        });
        if (parentNode.children.length === 1) {
            node.order = parentNode.order;
        }
    }
    let delta1 = 0;
    let delta2 = 0;
    let childIndex = 0;
    option.nodes.forEach((node, index) => {
        if (align === 'middle') {
            if (node.children && node.children.length > 1) {
                delta1 = (node.children.length - 1) / 2;
                delta2 = node.children.length - 1;
                updateOrder(node, delta1, delta2);
            }
            else if (node.parents && node.parents.length === 1) {
                updateCurrentOrder(node);
            }
        }
        else if (align === 'end') {
            if (node.children && node.children.length > 1) {
                delta1 = node.children.length - 1;
                updateOrder(node, delta1, delta1);
            }
            else if (node.parents && node.parents.length > 1) {
                /*delta1 = node.parents.length - 1;
                updateOrder(node, delta1, delta1);*/
            }
            else if (node.parents && node.parents.length === 1) {
                updateCurrentOrder(node);
            }
        }
    });

    console.log('最新：');
    console.log(option.nodes);
    console.log(option.edges);

    // 横排
    if (horizontal) {
        option.nodes.forEach((node, index) => {
            coordX = beginX + (node.level - 1) * spaceX;
            coordY = beginY + (node.order - 1) * spaceY;
            node.position = [coordX, coordY];
            let newNodeTemp = {};
            Object.assign(newNodeTemp, node);
            let nodeInputCircle = node.config.inputCircle;
            let nodeOutputCircle = node.config.outputCircle;
            let newNodeInputCircle = newNodeTemp.config.inputCircle;
            let newNodeOutputCircle = newNodeTemp.config.outputCircle;
            newNodeInputCircle.circlePosition = nodeInputCircle.horizontalCirclePosition || nodeInputCircle.circlePosition || 'left';
            newNodeOutputCircle.circlePosition = nodeOutputCircle.horizontalCirclePosition || nodeOutputCircle.circlePosition || 'right';
            newNodes.push(newNodeTemp);
        });
    }
    // 竖排
    else {
        option.nodes.forEach((node, index) => {
            coordX = beginX + (node.order - 1) * spaceX;
            coordY = beginY + (node.level - 1) * spaceY;
            node.position = [coordX, coordY];
            delete node.order;
            delete node.level;
            let newNodeTemp = {};
            Object.assign(newNodeTemp, node);
            let nodeInputCircle = node.config.inputCircle;
            let nodeOutputCircle = node.config.outputCircle;
            let newNodeInputCircle = newNodeTemp.config.inputCircle;
            let newNodeOutputCircle = newNodeTemp.config.outputCircle;

            newNodeInputCircle.circlePosition = nodeInputCircle.verticalCirclePosition || nodeInputCircle.circlePosition || 'top';
            newNodeOutputCircle.circlePosition = nodeOutputCircle.verticalCirclePosition || nodeOutputCircle.circlePosition || 'bottom';
            newNodes.push(newNodeTemp);
        });
    }
    console.log(newNodes);
    return newNodes;
}






