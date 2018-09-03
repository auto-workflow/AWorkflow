import AWrokflow from '../src/index';

const statusOk = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA9BJREFUWAnNWE1IVUEU/uZaviIJWxQm1j4hWgnxSqiFBBmBGzdGWK3DKGgTuBDcBEXiuh8iN26EqDYvMLAkiiAKDFpapNQiDa20fNN3zp157z716b12672BeTP3zvn53pkzZ865BgmbHcIOLKCdbG3se2HRyFG6tE8w7MAkew4ZPDRd+CoLcZuJS2hvooO059lbLbApDh+F/ybdGPugOYeRmDxrk9k7OIQ8rlqLrFAag0UOo7TEfY4TCGiRrWoV4ActlVdrNdNyJ7l+lHy1HIVvnLSXTTeeyXO5VtZCdhg1mMM1CuwRZgqc5tBH8UPmFL6VExh9b+9hO+F38V0v5TTIGuUMoA6XTCeWorR+viogexv1/IfDFNJGggUS92MzrpvTmPeMSUZ7F9vwCxfJc4XbnSGoHC3cac5gZrmcFYAUTB7jZNynVjHoIOPz5Ywbeabsg/yjI2ItKn7HLcwuBxVEBes2iWUEDPCG29OSFhjRo7JEpsFb0aG7IK4RaSWAnM+0qWUyaKevfIzQpjJVmbU4LjrEJURnVHBhy+Q02SU85YsFmvJImpaJKvRz3b48nqhP1eCwP31FC/FoO+L+JGC4zXX2Fl5o59wrXG90OvqVrqibtmCToEfzZXWreJrWE1ay/h3HyNsiHZyXrK33ICc33LqsC7whIPJJBJbWl/ho58PAp9zRub5Y+8fp6nNUiiHQu4nXAZEuStBbW8Q/WJVAG0b/VsESEMYJOpbcTaNxI3CasJzOUcVALAHvHrm1GST0bkpTV3xZXjexBASyx3FOxJeQOmWom1gCRstGFS+3dqWa100scuxDQD6FqASoom4FRH9iy3DzKtWKuq1YaEpxzGB3pfAwCfG6p8SpQ98JM73KYPK6iUUsNOlQNG8ITYD3Bb7ovPAy1sTrnhQLPVaWMAeOxR0lMt14ZQKmKtI5j67Fnhd154xeHT/xmcDkJtr5v6O1y7u/MPwE2IJdgaubxnhb17qEPPYf84S8qQ9I98+JRhYBqpvlkmARH5I2GA6sDiQhT9CYaO1n3HitnfMErHC6eh2PYlBAUsTxxh0n0gZXHcSXW4NZ8s4ziM0xO56Nz0hKViKiU3T7QrIQDP8mhVU/oPwk/lcuhS0Akn/GNPQGEfcQ8TQ9qoUKUk/yVc89NNFfXzrrDJizuCDvpXkfCp+komQRp1u3iEf8503hQnq/KlNkh1uVkyo2Kr3EQrJAU9YzAFSsUFwBqACqWkppb76q+tjgQam1quVzTBSUAquWD1YrgMknPVYHWhxIPr7aJz2LDzy/OYaOB0k/6f0BBTCI8+mB+YAAAAAASUVORK5CYII=';

// 渲染参数
let node1 = {
    // id
    id: '123',
    defineData: {
        nodeName: '数据拆分',
        imgSrc: statusOk
    },
    // 画布中位置
    position: [100, 100],
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: [
        {
            allInputs: true,
            enbaleInputs: [{
                id: '124',
                inputIndex: 0
            }]
        }
    ]
};
let node2 = {
    // id
    templateName: 'iconTemplate',
    id: '124',
    defineData: {
        nodeName: '随机采样',
        imgSrc: statusOk
    },
    // 画布中位置
    position: [300, 100],
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: [
        {
            allInputs: true,
            enbaleInputs: [{
                id: '124',
                inputIndex: 0
            }]
        }
    ]
};
let node3 = {
    // id
    id: '1245',
    defineData: {
        nodeName: 'asdfsdf'
    },
    // 画布中位置
    position: [100, 300],
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: [
        {
            allInputs: true,
            enbaleInputs: [{
                id: '124',
                inputIndex: 0
            }]
        }
    ]
};
let nodes = [
    node1,
    node2,
    node3
];
let edges = [
    {
        src: '123:0',
        to: '124:0'
    },
    {
        src: '124:0',
        to: '1245:0'
    }
];
// 实例化
// 模版配置，主要用于样式
let globalConfig = {
    // 是否静态图片
    isStatic: false,
    // 整个图默认模版
    templateName: 'defaultTemplate',
    // templateName: 'iconTemplate',
    // 是否需要自动排序，true: 程序智能计算每个node的位置，false: 根据node position来定位
    autoSort: false,
    // 自动排序时，true: 水平排序，false: 垂直排序
    horizontal: false
};
let workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);
workflow.on('mousedown', function (name, data, event) {
    console.log('custom mousedown triggered!');
    workflow.off('mousedown');
});
workflow.on('click', function (name, data, event) {
    console.log('custom click triggered!');
    workflow.off('click');
});
workflow.on('addNode', function (node) {
    console.log('custom addNode triggered!');
});
workflow.on('removeNode', function (node) {
    console.log('custom removeNode triggered!');
});
workflow.on('dragNode', function (node) {
    console.log(`node[${node.dom.group.id}] position: [${node.dom.group.position[0]}, ${node.dom.group.position[1]}]`);
});

// 获取所有nodes图形对象集
workflow.getNodesIns();
// 获取指定id的node图形对象
workflow.getNodeInsById('123');
// 获取所有edges图形对象集
workflow.getEdgesIns();
// 获取指定edge图形对象
workflow.getEdgeInsById('123:0', '124:0');

workflow.edgeMenus([
    {
        name: '删除连线',
        isEnabled: function (edge, wf) {
            return true;
        },
        click: function (edge, wf) {
            console.log('try to remove edge');
            wf.removeEdge(edge);
        }
    },
    {
        name: '运行',
        isEnabled: function (edge, wf) {
            return false;
        },
        click: function (edge, wf) {
            console.log('try to run');
            // wf.removeEdge(edge);
        }
    }

]);

workflow.nodeMenus([
    {
        name: '删除元素',
        isEnabled: function (node, wf) {
            return true;
        },
        click: function (node, wf) {
            console.log('try to remove node');
            wf.removeNode(node);
        }
    }
]);

document.getElementById('zoomout').addEventListener('click', function () {
    workflow.setScale(1.2, [0, 0]);
});
document.getElementById('reset').addEventListener('click', function () {
    workflow.setScale(1, [0, 0]);
});
document.getElementById('add-node').addEventListener('click', function () {
    workflow.addNode({
        id: '1325',
        defineData: {
            nodeName: '有一个'
        }
    });
});
document.getElementById('remove-node').addEventListener('click', function () {
    workflow.removeNode({
        id: '1325',
        defineData: {
            nodeName: '有一个'
        }
    });
});
document.getElementById('add-edge').addEventListener('click', function () {
    workflow.addEdge({
        src: '123:0',
        to: '1245:0'
    });
});
document.getElementById('remove-edge').addEventListener('click', function () {
    workflow.removeEdge({
        src: '123:0',
        to: '1245:0'
    });
});
document.getElementById('t').addEventListener('click', function () {
    workflow.updateNode('123', 'box', {
        shape: {
            width: 300,
            height: 100
        }
    });
});

document.getElementById('tt').addEventListener('click', function () {
    workflow.updateEdge({src: '123:0', to: '124:0'}, 'triangle', {
        shape: {
            width: 300,
            height: 100
        },
        style: {
            fill: 'red'
        }
    });
});
