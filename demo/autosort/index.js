import AWrokflow from '../../src/index';

const statusOk = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA9BJREFUWAnNWE1IVUEU/uZaviIJWxQm1j4hWgnxSqiFBBmBGzdGWK3DKGgTuBDcBEXiuh8iN26EqDYvMLAkiiAKDFpapNQiDa20fNN3zp157z716b12672BeTP3zvn53pkzZ865BgmbHcIOLKCdbG3se2HRyFG6tE8w7MAkew4ZPDRd+CoLcZuJS2hvooO059lbLbApDh+F/ybdGPugOYeRmDxrk9k7OIQ8rlqLrFAag0UOo7TEfY4TCGiRrWoV4ActlVdrNdNyJ7l+lHy1HIVvnLSXTTeeyXO5VtZCdhg1mMM1CuwRZgqc5tBH8UPmFL6VExh9b+9hO+F38V0v5TTIGuUMoA6XTCeWorR+viogexv1/IfDFNJGggUS92MzrpvTmPeMSUZ7F9vwCxfJc4XbnSGoHC3cac5gZrmcFYAUTB7jZNynVjHoIOPz5Ywbeabsg/yjI2ItKn7HLcwuBxVEBes2iWUEDPCG29OSFhjRo7JEpsFb0aG7IK4RaSWAnM+0qWUyaKevfIzQpjJVmbU4LjrEJURnVHBhy+Q02SU85YsFmvJImpaJKvRz3b48nqhP1eCwP31FC/FoO+L+JGC4zXX2Fl5o59wrXG90OvqVrqibtmCToEfzZXWreJrWE1ay/h3HyNsiHZyXrK33ICc33LqsC7whIPJJBJbWl/ho58PAp9zRub5Y+8fp6nNUiiHQu4nXAZEuStBbW8Q/WJVAG0b/VsESEMYJOpbcTaNxI3CasJzOUcVALAHvHrm1GST0bkpTV3xZXjexBASyx3FOxJeQOmWom1gCRstGFS+3dqWa100scuxDQD6FqASoom4FRH9iy3DzKtWKuq1YaEpxzGB3pfAwCfG6p8SpQ98JM73KYPK6iUUsNOlQNG8ITYD3Bb7ovPAy1sTrnhQLPVaWMAeOxR0lMt14ZQKmKtI5j67Fnhd154xeHT/xmcDkJtr5v6O1y7u/MPwE2IJdgaubxnhb17qEPPYf84S8qQ9I98+JRhYBqpvlkmARH5I2GA6sDiQhT9CYaO1n3HitnfMErHC6eh2PYlBAUsTxxh0n0gZXHcSXW4NZ8s4ziM0xO56Nz0hKViKiU3T7QrIQDP8mhVU/oPwk/lcuhS0Akn/GNPQGEfcQ8TQ9qoUKUk/yVc89NNFfXzrrDJizuCDvpXkfCp+komQRp1u3iEf8503hQnq/KlNkh1uVkyo2Kr3EQrJAU9YzAFSsUFwBqACqWkppb76q+tjgQam1quVzTBSUAquWD1YrgMknPVYHWhxIPr7aJz2LDzy/OYaOB0k/6f0BBTCI8+mB+YAAAAAASUVORK5CYII=';

// 渲染参数
let node1 = {
    // id
    id: '123',
    defineData: {
        nodeName: '123',
        imgSrc: statusOk
    },
    // 画布中位置
    position: [100, 100],
    // 输入
    input: [
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
        nodeName: '124',
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
        {}
    ]
};
let node3 = {
    // id
    id: '125',
    defineData: {
        nodeName: '125'
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
        }
    ]
};
let node4 = {
    // id
    id: '126',
    defineData: {
        nodeName: '126'
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
        }
    ]
};
let node5 = {
    // id
    id: '1241',
    defineData: {
        nodeName: '1241'
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
    ]
};
let node6 = {
    // id
    id: '1242',
    defineData: {
        nodeName: '1242'
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
    ]
};
let node7 = {
    // id
    id: '1243',
    defineData: {
        nodeName: '1243'
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
    ]
};
let node8 = {
    // id
    id: '1251',
    defineData: {
        nodeName: '1251'
    },
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: [
        {}
    ]
};
let node9 = {
    // id
    id: '13',
    defineData: {
        nodeName: '13'
    },
    // 输入
    input: [
    ],
    // 输出
    output: [
        {}
    ]
};
let node10 = {
    // id
    id: '1261',
    defineData: {
        nodeName: '1261'
    },
    // 输入
    input: [
        {}
    ],
    // 输出
    output: [
    ]
};
let node11 = {
    // id
    id: '1262',
    defineData: {
        nodeName: '1262'
    },
    // 输入
    input: [
        {}
    ],
    // 输出
    output: [
    ]
};
let node12 = {
    // id
    id: '12511',
    defineData: {
        nodeName: '12511'
    },
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: [
    ]
};
let node14 = {
    // id
    id: '12514',
    defineData: {
        nodeName: '12514'
    },
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: [
    ]
};
let node13 = {
    // id
    id: '12512',
    defineData: {
        nodeName: '12512'
    },
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: [
    ]
};
let node15 = {
    // id
    id: '12513',
    defineData: {
        nodeName: '12513'
    },
    // 输入
    input: [
        {
        }
    ],
    // 输出
    output: [
    ]
};

let nodes = [
    node12,
    node13,
    node14,
    node15,
    node9,
    node1,
    node2,
    node3,
    node4,
    node5,
    node6,
    node7,
    node8,
    node10,
    node11
];
let edges = [
    {
        src: '123:0',
        to: '124:0'
    },
    {
        src: '123:0',
        to: '125:0'
    },
    {
        src: '123:0',
        to: '126:0'
    },
    {
        src: '124:0',
        to: '1241:0'
    },
    {
        src: '125:0',
        to: '1251:0'
    },
    {
        src: '124:0',
        to: '1242:0'
    },
    {
        src: '124:0',
        to: '1243:0'
    },
    {
        src: '126:0',
        to: '1261:0'
    },
    {
        src: '1251:0',
        to: '12514:0'
    },
    {
        src: '1251:0',
        to: '12513:0'
    },
    {
        src: '1251:0',
        to: '12512:0'
    },
    {
        src: '1251:0',
        to: '12511:0'
    },
    {
        src: '126:0',
        to: '1262:0'
    },
    {
        src: '13:0',
        to: '126:0'
    }
];
// 实例化
// 模版配置，主要用于样式
let globalConfig = {
    // 是否静态图片
    isStatic: true,
    // 整个图默认模版
    templateName: 'defaultTemplate',
    // templateName: 'iconTemplate',
    // 是否需要自动排序，true: 程序智能计算每个node的位置，false: 根据node position来定位
    autoSort: true,
    // 自动排序时，true: 水平排序，false: 垂直排序
    horizontal: true,
    // node对齐方式，start: 水平排列时表示上对齐，垂直排列时表示左对齐 middle: 中间对齐 end: 水平排列时表示下对齐，垂直排列时表示右对齐
    align: 'middle',
    // beginX 起点X坐标，默认10
    beginX: 30,
    // beginY 起点Y坐标，默认10
    beginY: 30,
    // spaceX 横向间距，默认200
    spaceX: 200,
    // spaceY 纵向间距，默认100
    spaceY: 60
}
let workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);
console.log(workflow.workflowObj);
document.getElementById('horizontalTop').addEventListener('click', function () {
    globalConfig.horizontal = true;
    globalConfig.align = 'start';
    workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);
});
document.getElementById('verticalLeft').addEventListener('click', function () {
    globalConfig.horizontal = false;
    globalConfig.align = 'start';
    workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);
});
document.getElementById('horizontalMiddle').addEventListener('click', function () {
    globalConfig.horizontal = true;
    globalConfig.align = 'middle';
    workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);
});
document.getElementById('verticalMiddle').addEventListener('click', function () {
    globalConfig.horizontal = false;
    globalConfig.align = 'middle';
    workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);
});
document.getElementById('horizontalBottom').addEventListener('click', function () {
    globalConfig.horizontal = true;
    globalConfig.align = 'end';
    workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);
});
document.getElementById('verticalRight').addEventListener('click', function () {
    globalConfig.horizontal = false;
    globalConfig.align = 'end';
    workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);
});
