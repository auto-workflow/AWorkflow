import zrender from 'zrender';
import AWrokflow from '../../src/index';
import defaultTemplate from  '../../src/template/defaultTemplate';


const diamondTemplate = {
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

AWrokflow.registerTemplate('diamondTemplate', diamondTemplate);

// 渲染参数
let node1 = {
    id: '123',
    defineData: {
        nodeName: '用户登陆'
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

        }
    ]
};

let node2 = {
    templateName: 'diamondTemplate',
    id: '124',
    defineData: {
        nodeName: '是否有cookie'
    },
    // 画布中位置
    position: [100, 200],
    // 输入
    input: [
        {
            align: 'top'
        }
    ],
    // 输出
    output: [
        {
            align: 'bottom'
        },
        {
            align: 'left'
        }
    ]
};

let node3 = {
    id: '125',
    defineData: {
        nodeName: '登陆成功'
    },
    // 画布中位置
    position: [100, 400],
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: [
        {

        }
    ]
};

let node4 = {
    id: '126',
    defineData: {
        nodeName: '评论及回复'
    },
    // 画布中位置
    position: [100, 500],
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: []
};

let nodes = [
    node1,
    node2,
    node3,
    node4
];
let edges = [
    {
        src: '123:0',
        to: '124:0'
    },
    {
        src: '124:1',
        to: '123:0',
        text: 'N',
        textPosition: [20, 150],
        passPos: [[50, 252], [50, 50], [186, 50]]
    },
    {
        src: '124:0',
        to: '125:0',
        text: 'Y',
        textPosition: [150, 340]
    },
    {
        src: '125:0',
        to: '126:0'
    }
];

// 模版配置，主要用于样式
let globalConfig = {
    // 是否静态图片
    isStatic: true,
    // 整个图默认模版
    templateName: 'defaultTemplate',
    // templateName: 'iconTemplate',
    // 是否需要自动排序，true: 程序智能计算每个node的位置，false: 根据node position来定位
    autoSort: false,
    // 自动排序时，true: 水平排序，false: 垂直排序
    horizontal: false
};

let workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);