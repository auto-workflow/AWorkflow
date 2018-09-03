/**
 * @file MenuManager
 * @author xueliqiang
 */

import * as utils from '../utils';
import './menu.less';

let ELE_TYPE = {
    NODE: 'node',
    EDGE: 'edge'
};

export default class MenuManager {

    constructor(workflow) {
        this.edgeMenuContainer = this.createMenuContainer();
        this.nodeMenuContainer = this.createMenuContainer();
        this.ctx = workflow;
        this.menuMap = new WeakMap();
        // selected node or edge
        this.target = null;
    }

    /**
     * 构建连线的上下文菜单
     *
     * @param {Array<Menu>} edgeMenus 菜单项集合
     */
    buildEdgeMenus(edgeMenus) {
        edgeMenus.forEach(edgeMenu => {
            let menuDom = this.createMenuDom(edgeMenu, ELE_TYPE.EDGE);
            this.edgeMenuContainer.appendChild(menuDom);
        });
    }

    /**
     * 构建元素的上下文菜单
     *
     * @param {Array<Menu>} nodeMenus 菜单项集合
     */
    buildNodeMenus(nodeMenus) {
        nodeMenus.forEach(nodeMenu => {
            let menuDom = this.createMenuDom(nodeMenu, ELE_TYPE.NODE);
            this.nodeMenuContainer.appendChild(menuDom);
        });
    }

    createMenuContainer() {
        let menuDivDom = document.createElement('div');
        menuDivDom.className = 'menu-container';
        return menuDivDom;
    }

    /**
     * 根据配置构建菜单项的Dom，事件绑定等
     *
     * @param {Object} menu 菜单项 {name: '删除元素', isEnabled: true, click: () => {...}}
     * @param {string} type 菜单项类型 ['node', 'edge']
     * @return {HTMLNode} 菜单dom
     */
    createMenuDom(menu, type) {
        let menuDom = document.createElement('div');
        menuDom.innerHTML = menu.name;
        // menuDom.style.cssText = 'border-bottom: 1px solid red;';
        menuDom.className = 'item';

        menuDom.addEventListener('click', e => {
            if (menuDom.className.indexOf('disabled') > -1 || !this.target) {
                return;
            }
            let data = utils.getDataByZrDom(this.target, type, this.ctx);
            menu.click(data, this.ctx);
            this.hideMenus();
        });
        this.menuMap.set(menuDom, menu);
        return menuDom;
    }

    /**
     * 隐藏菜单
     */
    hideMenus() {
        this.target = null;
        let container = this.getContainerDom();

        container.contains(this.nodeMenuContainer) && container.removeChild(this.nodeMenuContainer);
        container.contains(this.edgeMenuContainer) && container.removeChild(this.edgeMenuContainer);
    }

    /**
     * 显示菜单
     *
     * @param {Object} e 作用元素event对象[e.target, e.event.ZrX, e.event.zrY]
     */
    showMenus(e) {
        this.hideMenus();
        this.target = e.target;
        let container = null;
        let elType = utils.getElementType(this.target, this.ctx);

        elType === ELE_TYPE.NODE
        ? container = this.nodeMenuContainer
        : (elType === ELE_TYPE.EDGE ? container = this.edgeMenuContainer : container = null);

        if (container && container.children.length > 0) {
            let containerStyle = container.style;
            containerStyle.cssText = `
                left:${e.event.zrX};
                top:${e.event.zrY};
            `;
            this.checkMenuStatus(container, elType);
            this.getContainerDom().appendChild(container);
        }
    }

    /**
     * 检查菜单项是否可用
     *
     * @param {HtmlDom} container 菜单项父节点
     * @param {string} type 菜单项类型 ['node', 'edge']
     */
    checkMenuStatus(container, type) {
        for (let i = 0; i < container.children.length; i++) {
            let menuDom = container.children[i];
            let menu = this.menuMap.get(menuDom);
            let isEnabled = true;
            if (typeof menu.isEnabled === 'function') {
                let data = utils.getDataByZrDom(this.target, type, this.ctx);
                isEnabled = menu.isEnabled(data, this.ctx);
                if (!isEnabled) {
                    menuDom.className = 'item disabled';
                }
            }
        }
    }

    getContainerDom() {
        return this.ctx.dom.querySelector(':scope>div');
    }
}
