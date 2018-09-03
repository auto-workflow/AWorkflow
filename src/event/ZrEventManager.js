
/**
 * @file workflow
 * @author xueliqiang, zhousheng
 */

import zrender from 'zrender';
import * as utils from '../utils';

export default class ZrEventManager {

    static addDefaultEventHandlers(workflowInstance) {

        const {data, workflowObj, dom, optionsManager} = workflowInstance;
        let isStatic = optionsManager.options.isStatic;
        let zr = workflowInstance._zr;

        let {canvasWidth, canvasHeight} = dom.style;

        let isNodeActive = false;

        let dragGroup = null;
        let moveNode = null;

        // 画线
        let tempEdgeSrc = '';
        let tempEdgedst = '';
        let createLine = null;
        let hasLine = false;
        let tempLine = null;

        // 可连接circle集合
        let inputGuideCircles = [];

        setHoverStyle();

        zr.on('mousedown', e => {
            workflowInstance.triggerCustomEvent('mousedown', e);
            mouseDownHandler(data, e);
        });

        zr.on('mouseup', e => {
            workflowInstance.triggerCustomEvent('mouseup', e);
            mouseUpHandler(data, e);
        });

        zr.on('click', e => {
            workflowInstance.triggerCustomEvent('click', e);
        });

        zr.on('mousemove', e => {
            workflowInstance.triggerCustomEvent('mousemove', e);
            mouseMoveHandler(data, e);
        });

        zr.on('contextmenu', function (e) {
            e.event.preventDefault();
            isNodeActive = false;
            workflowInstance.triggerCustomEvent('contextmenu', e);
            contextMenuHandler(e);
        });

        function contextMenuHandler(e) {
            if (!e.target) {
                return false;
            }
            workflowInstance.menuManager.showMenus(e);
        }

        function mouseDownHandler(data, e) {
            if (e.event.target.tagName === 'CANVAS') {
                workflowInstance.menuManager.hideMenus();
            }

            if (!e.target || isStatic) {
                return;
            }
            isNodeActive = true;

            let edgeSrcObj = getEdgeSrcNode(e);
            let outputCircle = edgeSrcObj.outputCircle;
            let node = edgeSrcObj.srcNode;
            inputGuideCircles = edgeSrcObj.inputGuideCircles;
            if (edgeSrcObj.srcStr !== '') {
                tempEdgeSrc = edgeSrcObj.srcStr;
                createLine = utils.prepareCreateLine(outputCircle, workflowObj, node);

                // Hilight avaliable input circle in other nodes
                inputGuideCircles.forEach((guide, index) => {
                    setElementStyle(guide, node.props.config.inputCircle.guide);
                });
            }

            // 是否选中node
            let elementType = utils.getElementType(e.target, workflowInstance);
            if (elementType === 'node') {
                dragGroup = e.target.parent;
                moveNode = utils.prepareMoveNode(dragGroup, e);
            }
        }

        function mouseUpHandler(data, e) {
            tempLine && zr.remove(tempLine);
            inputGuideCircles.forEach((guide, index) => {
                let node = utils.getNodeByCircle(guide, workflowInstance);
                setElementStyle(guide, node.props.config.inputCircle.normal);
            });
            inputGuideCircles = [];
            if (hasLine && !checkEdge(tempEdgeSrc, tempEdgedst)) {
                let edgeItem = {
                    src: tempEdgeSrc,
                    to: tempEdgedst
                };
                workflowInstance.addEdge(edgeItem);
            }

            isNodeActive = false;
            hasLine = false;
            tempEdgeSrc = '';
            tempEdgedst = '';
            createLine = null;
            tempLine = null;
        }

        function mouseMoveHandler(data, e) {
            if (isStatic) {
                return false;
            }
            let inEndCircle;
            workflowObj.nodes.forEach((node, index) => {
                let inputCircleStyle = node.props.config.inputCircle;
                node.dom.inputCircles
                && node.dom.inputCircles.forEach((inputCircle, inputIndex) => {
                    if (inputGuideCircles.includes(inputCircle)) {
                        if (inputCircle.contain(e.offsetX, e.offsetY)) {
                            setElementStyle(inputCircle, inputCircleStyle.guideHover || inputCircleStyle.guide);
                            tempEdgedst = node.props.id + ':' + inputIndex;
                            inEndCircle = true;
                        }
                        else {
                            setElementStyle(inputCircle, inputCircleStyle.guide);
                        }
                    }
                });
            });

            if (!isNodeActive) {
                return;
            }

            // 画线
            if (typeof createLine === 'function') {
                tempLine = createLine(zr, tempLine, e);
                hasLine = inEndCircle ? true : false;
                return;
            }

            // 移动node group
            if (!isStatic && dragGroup && typeof moveNode === 'function') {
                moveNode(dom, workflowInstance, e);
                freshEdges();
            }
        }

        function freshEdges() {
            let workflowObj = workflowInstance.workflowObj;
            for (let index = 0; index < workflowObj.edges.length; index++) {
                let edge = workflowObj.edges[0];
                let edgeItem = {
                    ...edge.props
                };
                // 刷新连线，需要保留原有的设置，同时删除连线的起止点信息
                delete edgeItem.start;
                delete edgeItem.end;
                delete edgeItem.config.triangle.start;
                delete edgeItem.config.triangle.end;
                workflowInstance.removeEdge(edgeItem, true);
                workflowInstance.addEdge(edgeItem, true);
            }
        }

        function getGuideCircles(outputCircle) {
            workflowObj.nodes.forEach(programNode => {
                let inputCircles = programNode.dom.inputCircles;
                let inputCircleStyle = programNode.props.config.inputCircle;
                inputCircles && inputCircles.forEach((inputCircle, index) => {
                    let inSameGroup = isSameGroup(inputCircle, outputCircle);
                    if (!inSameGroup && isInputCircleAvailable(inputCircle)) {
                        inputGuideCircles.push(inputCircle);
                        setElementStyle(inputCircle, inputCircleStyle.guide);
                    }
                });
            });
            return inputGuideCircles;
        }

        function isSameGroup(inputCircle, outputCircle) {
            return inputCircle.parent.id === outputCircle.parent.id;
        }

        function isInputCircleAvailable(inputCircle) {
            let busyInputCircles = workflowObj.edges.map(edge => {
                let edgeInfo = edge.props.to.split(':');
                let edgeNodeToId = edgeInfo[0];
                let inputIndex = edgeInfo[1];
                let busyInputCircle;
                workflowObj.nodes.forEach(node => {
                    let test = inputCircle;
                    if (node.props.id === edgeNodeToId && node.dom.inputCircles[inputIndex]) {
                        busyInputCircle = node.dom.inputCircles[inputIndex];
                    }
                });
                return busyInputCircle;
            });
            return !busyInputCircles.includes(inputCircle);
        }

        // 验证重复线，如果重复则不画线
        function checkEdge(edgeSrc, edgeDst) {
            let hasRepeat = workflowObj.edges.some((edge, index) => {
                return edge.props.src === edgeSrc && edge.props.to === edgeDst;
            });
            return hasRepeat;
        }

        // output target and src
        function getEdgeSrcNode(e) {
            let srcStr = '';
            let outputCircle = null;
            let inputGuideCircles = [];
            let contentType;
            let supportStoreType = null;
            let outputFileFormat = null;
            let currentGroup = null;
            let srcNode = null;
            workflowObj.nodes.some((node, index) => {
                let nodeId = node.props.id;
                if (node.dom.outputCircles) {
                    return node.dom.outputCircles.some((circle, outputIndex) => {
                        if (circle.contain(e.offsetX, e.offsetY)) {
                            srcStr = nodeId + ':' + outputIndex;
                            outputCircle = circle;
                            currentGroup = circle.parent;
                            inputGuideCircles = getGuideCircles(circle);
                            srcNode = node;
                            return true;
                        }
                        return false;
                    });
                }
                else {
                    return false;
                }
            });
            return {
                srcStr: srcStr,
                outputCircle: outputCircle,
                inputGuideCircles: inputGuideCircles,
                srcNode: srcNode
            };
        }

        function setHoverStyle() {
            workflowObj.nodes.forEach(node => {
                let nodeStyleConfig = node.props.config;
                // box hover style
                addHoverHandler(node.dom.box, nodeStyleConfig.box.normal, nodeStyleConfig.box.hover);
                // text hover style
                addHoverHandler(node.dom.text, nodeStyleConfig.text.normal, nodeStyleConfig.text.hover);
                // inputCircle hove style
                node.dom.inputCircles
                && node.dom.inputCircles.forEach(inputCircle => {
                    let inputCircleStyle = nodeStyleConfig.inputCircle;
                    addHoverHandler(inputCircle, inputCircleStyle.normal, inputCircleStyle.hover);
                });
                // output circle hover style
                node.dom.outputCircles
                && node.dom.outputCircles.forEach(outputCircle => {
                    let outputCircleStyle = nodeStyleConfig.outputCircle;
                    addHoverHandler(outputCircle, outputCircleStyle.normal, outputCircleStyle.hover);
                });
            });

            workflowObj.edges.forEach(edge => {
                let edgeStyleConfig = edge.props.config;
                addHoverHandler(edge.dom.line, edgeStyleConfig.line.normal, edgeStyleConfig.line.hover);
                addHoverHandler(edge.dom.backline, edgeStyleConfig.backline.normal, edgeStyleConfig.backline.hover);
                addHoverHandler(edge.dom.triangle, edgeStyleConfig.triangle.normal, edgeStyleConfig.triangle.hover);
            });
        }

        function addHoverHandler(zrElement, normalStyle, hoverStyle) {
            zrElement.on('mouseover', function () {
                setElementStyle(this, hoverStyle || normalStyle);
            });
            zrElement.on('mouseout', function () {
                setElementStyle(this, normalStyle);
            });
        }

        function setElementStyle(zrElement, eleStyle) {
            if (!zrElement) {
                return;
            }

            let style = eleStyle.style;
            let shape = eleStyle.shape;

            if (zrElement.type === 'bezier-curve') {
                zrElement.attr('style', style);
                return;
            }

            if (zrElement.type === 'text') {
                let {text, ...other} = eleStyle.style;
                style = other;
            }

            zrElement.attr({
                style: style,
                shape: shape
            });
        }
    }
}