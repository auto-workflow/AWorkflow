/**
 * @file workflow
 * @author zhousheng
 */

import zrender from 'zrender';

// 默认模版
let defaultTemplate = {
    templateName: 'defaultTemplate',
    node: {
        box: {
            name: 'Rect',
            normal: {
                style: {
                    stroke: '#2A2F44',
                    fill: '#fff'
                },
                shape: {
                    x: 0,
                    y: 0,
                    r: 15,
                    width: 170,
                    height: 30
                }
            },
            hover: {
                style: {
                    stroke: '#2A2F44',
                    fill: 'rgba(0,29,255,0.10)'
                },
                shape: {
                    x: 0,
                    y: 0,
                    r: 15,
                    width: 170,
                    height: 30
                }
            },
            selected: {
                style: {
                    stroke: '#2A2F44',
                    fill: 'rgba(0,29,255,0.10)'
                },
                shape: {
                    x: 0,
                    y: 0,
                    r: 15,
                    width: 170,
                    height: 30
                }
            }
        },
        text: {
            name: 'Text',
            position: [31, 8],
            normal: {
                style: {
                    text: '<@nodeName>',
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: 15,
                    textFill: '#2A2F44'
                }
            },
            hover: {
                style: {
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: 15,
                    textFill: 'green'
                }
            }
        },
        inputCircle: {
            name: 'Circle',
            normal: {
                style: {
                    stroke: '#79818F',
                    fill: '#fff',
                    lineWidth: 1
                },
                shape: {
                    r: 4
                }
            },
            hover: {
                style: {
                    stroke: '#394259',
                    fill: '#394259',
                    lineWidth: 1
                },
                shape: {
                    r: 4
                }
            },
            guide: {
                style: {
                    stroke: 'rgba(60,118,255,0.5)',
                    fill: '#fff',
                    lineWidth: 4
                },
                shape: {
                    r: 4
                }
            },
            guideHover: {
                style: {
                    stroke: 'rgba(60,118,255,0.5)',
                    fill: '#fff',
                    lineWidth: 6
                },
                shape: {
                    r: 6
                }
            },
            // 自定义位置时，使用
            circlePosition: 'top',
            // 自动排序，水平排序时位置
            horizontalCirclePosition: 'left',
            // 自动排序，垂直排序位置
            verticalCirclePosition: 'top'
        },
        outputCircle: {
            name: 'Circle',
            normal: {
                style: {
                    stroke: '#79818F',
                    fill: '#fff',
                    lineWidth: 1
                },
                shape: {
                    r: 4
                }
            },
            hover: {
                style: {
                    stroke: '#79818F',
                    fill: 'grey',
                    lineWidth: 1
                },
                shape: {
                    r: 4
                }
            },
            circlePosition: 'bottom',
            // 自动排序，水平排序时位置
            horizontalCirclePosition: 'right',
            // 自动排序，垂直排序位置
            verticalCirclePosition: 'bottom'
        }
    },
    edge: {
        line: {
            name: 'BezierCurve',
            normal: {
                style: {
                    stroke: '#79818F',
                    lineWidth: 1
                }
            },
            hover: {
                style: {
                    stroke: '#79818F',
                    lineWidth: 4
                }
            },
            selected: {
                style: {
                    stroke: '#79818F',
                    lineWidth: 4
                }
            }
        },
        backline: {
            name: 'BezierCurve',
            normal: {
                style: {
                    stroke: '#000000',
                    lineWidth: 1
                }
            },
            hover: {
                style: {
                    stroke: '#000000',
                    lineWidth: 2
                }
            }
        },
        triangle: {
            name: 'Triangle',
            normal: {
                shape: {
                    width: 10,
                    height: 6
                },
                style: {
                    fill: '#404D5C'
                }
            },
            hover: {
                shape: {
                    width: 150,
                    height: 90
                },
                style: {
                    fill: '#404D5C'
                }
            },
            selected: {
                shape: {
                    width: 10,
                    height: 6
                },
                style: {
                    fill: '#404D5C'
                }
            }
        }
    }
};
let iconTemplate = {
};
zrender.util.merge(iconTemplate, defaultTemplate, {
    templateName: 'iconTemplate'
});
iconTemplate.node.icon = {
    name: 'Image',
    normal: {
        style: {
            image: '<@imgSrc>',
            x: 10,
            y: 6,
            width: 18,
            height: 18
        },
        origin: [19, 15]
    }
};

// 自定义变量
let defineDataReg = /<@(\w+)>/g;

export default class ComPlate {
    constructor() {
        this.templateObj = {
            defaultTemplate: defaultTemplate,
            iconTemplate: iconTemplate
        };
    }

    /**
     * 注册模版
     *
     * @param {string} templateName 模版名称
     * @param {Object} templateObj 模版对象
     * @return {undefined}
     */
    registerTemplate(templateName, templateObj) {
        templateObj.templateName = templateName;
        this.templateObj[templateName] = templateObj;
        console.log(this.templateObj);
    }

    /**
     * 编译模版
     *
     * @param {Array} nodes 节点数组
     * @param {Array} edges 连线数组
     * @param {Object=} globalConfig 全局配置
     * @return {Object} compileObj 编译后的对象
     */
    compileTemplate(nodes, edges, globalConfig) {
        let globalTemplateName = globalConfig.templateName;
        let compileObj = {
            nodes: [],
            edges: []
        };
        nodes.forEach((node, index) => {
            let nodeTemplateName = node.templateName ? node.templateName : globalTemplateName;
            let currentTemplate = null;
            if (this.templateObj[nodeTemplateName] && this.templateObj[nodeTemplateName]['node']) {
                currentTemplate = this.templateObj[nodeTemplateName]['node'];
                node.templateName = nodeTemplateName;
            }
            else {
                currentTemplate = this.templateObj['defaultTemplate']['node'];
                node.templateName = 'defaultTemplate';
            }
            let currentTemplateStr = JSON.stringify(currentTemplate);
            let defineData = node.defineData;
            currentTemplateStr = currentTemplateStr.replace(defineDataReg, (s, reg1, index, str) => {
                if (defineData[reg1]) {
                    return defineData[reg1];
                }
                else {
                    return '';
                }
            });
            let tempNode = {
                config: JSON.parse(currentTemplateStr)
            };
            Object.assign(tempNode, node);
            compileObj.nodes.push(tempNode);
        });
        edges.forEach((edge, index) => {
            let edgeTemplateName = edge.templateName ? edge.templateName : globalTemplateName;
            let currentTemplate = null;
            if (this.templateObj[edgeTemplateName] && this.templateObj[edgeTemplateName]['edge']) {
                currentTemplate = this.templateObj[edgeTemplateName]['edge'];
            }
            else {
                currentTemplate = this.templateObj['defaultTemplate']['edge'];
            }
            let tempEdge = {
                config: currentTemplate
            };
            Object.assign(tempEdge, edge);
            compileObj.edges.push(tempEdge);
            this.updateConnected(compileObj.nodes, edge);
        });
        console.log('compileObj');
        console.log(compileObj);
        return compileObj;
    }

    updateConnected(nodes, edge) {
        let {src, to} = edge;
        let srcId = src.split(':')[0];
        let srcIndex = Number(src.split(':')[1]);
        let toId = to.split(':')[0];
        let toIndex = Number(to.split(':')[1]);
        nodes.some(node => {
            if (node.id === srcId) {
                node.output[srcIndex].status = 'connected';
            }
            else if (node.id === toId) {
                node.input[toIndex].status = 'connected';
            }
        });
    }

    /**
     * 获取指定名称的模版对象
     *
     * @param {string} templateName 模版名称
     * @return {Object} compileObj 编译后的对象
     */
    getTemplate(templateName) {
        if (this.templateObj[templateName]) {
            return this.templateObj[templateName];
        }
        return null;
    }

    /**
     * 更新指定名称的模版对象
     *
     * @param {string} templateName 模版名称
     * @param {Object} templateUpdateObj 模版对象
     * @return {undefined}
     */
    updateTemplate(templateName, templateUpdateObj) {
        zrender.util.merge(this.templateObj[templateName], templateUpdateObj);
    }
}