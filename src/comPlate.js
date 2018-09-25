/**
 * @file workflow
 * @author zhousheng
 */

import zrender from 'zrender';
import defaultTemplate from './template/defaultTemplate';
import iconTemplate from './template/iconTemplate';
import diamondTemplate from './template/diamondTemplate';

// 自定义变量
let defineDataReg = /<@(\w+)>/g;

export default class ComPlate {
    constructor() {
        this.templateObj = {
            defaultTemplate,
            iconTemplate,
            diamondTemplate
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