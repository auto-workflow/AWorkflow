import AWrokflow from '../../src/index';

const blankImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDI1Q0YyN0EyQTU2MTFFODgzQTdGRTMyREI0RTNDRTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI1Q0YyNzkyQTU2MTFFODgzQTdGRTMyREI0RTNDRTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjVlZmFlNGMxLTcyYmYtMTE3Yi04MjEwLWViZGJjNTkzNjgwMCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjVlZmFlNGMxLTcyYmYtMTE3Yi04MjEwLWViZGJjNTkzNjgwMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ptf5E1oAAAAhSURBVHjaYvz//z8DNQATA5XAqEGjBo0aNGrQYDEIIMAAswcDIb1Gaj0AAAAASUVORK5CYII=';
const loadingImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAABIJJREFUWAntV11oXEUUnnP3bhJNNilWxcQXyT4Jgg++G2sQwRZ9crXaZOuiyTa2FbRtwG10NZuqSbHQKm6aWrOhWI1a/AMlLYLimw+lfZPS0Jd2qYrmZ4NJd3fG72z2hrtz791k94KgdCC5M3e+891vzpk5c5aEz7ZzV+JlWRRvC1LLROZzmfSbX/ihNPwYs61S4l4lVFApCkklH/DLZ/olgJClVQ4FJwnll8+3h/wK0O0dHkomk8blbOEjQ6hLmfGRlG7gd6zg0mj/a4cEydZMOrWbCH61NYcgFoON0SuVuNHbd/C+zg7zGYiUNpu6u7zYaP/Br6FgKwc32j90BWRjdkJHyAwlfgeAN0QDtsS22WuFj5nIblRPf3p6OnD5av4rIaib6dEW0b9N53J8aHJ8eD+RmAF4GYbN64pSakmQKJTwRGH9AzxmMd+cvfAlcFuUkE3A8kGY6ewIJHS8QxDHtLM9+BgW8YMonaDqoppEaBRYhJ5+bmsw+/QP2MXwAstivg93BCNuW4F0AmsMsLnqYtGF8DVD6IIQxikkPsdGtGz0J4d6Nlv8HF55EPty83pi2N7hIYsUZIXw3cEnMP5RQAxOR6tSciC2963bLcx6zyu/iTuFktvKYhju6RmLy9NDFqDkqWz+LMLyEHb62KnjqQPW3EaePfFXE0JSCof78NTEyP6N2KyLYdfv2zeG+NfXBgaSLfVZ3rT6D3gA90pie1HS/W5aDUOEzbZQ7OToILKq/xY78E6osLD4CuonJMfKhmTcYhBdNHFyThDJWyunyyNFy/m5hTMYPeI6X+NLcCGXiQJyr+MORY5CdlDzBv7dwgO3P9w4Qcx01fjdKnA6j0nkPrfvsRlJkwQNIvHdI6XA3VXZyJA5s631cOXb+kctgebunMxllDQu6SxExUYyjJ/09zfH/w8P8NXR++Ih3Nb1tZ0Dybu4dN2ItedtbxlzPYOq8TOVX/ojGk/UdLEyx454YqJYyGdRrr7PC7N4vZ5VVbOYb89dPIN6aAtWGOLj2tAc3PzhkeSfXoT297HdyY78jfzVUkUsaBGn+bvOdnM7hHnW6J6K18QI1c1ikB4WkU1Pn3j39b/sH63WP/le8hopmuaFoBQOCam2zmYLp6t5yiVjrtbAJc+wmHLZiSQ5E24P7tB/tuzZc7RxbuV6KYdtagy2HTuW5Gy81qYmUk/1vJBA+UFdiitPKUqisMindS42cvWQLgY410oPKzXnV65/gPkiYp+fWynG2LNMbG9rlSdqdBaFO+LxaHzoEzvG6jsE9fYNPQ+jR9kzuOf+BtBVDBNAUIHLW3QDwOOakXdEIpEiz9kb4ypECdUED0V6+ofidhz3HYKwgR9GwBvh4pUAqU+nxlNPgtBzE+qEXmO7KNzq8+DP4Tdgg453CMqkh59F2TEYMIz4ZHok5hZnnWSj4zVRRG+QQS9ljg8f1W0dm7osYJSBk+lhHe97zKJAcsSLyOEhL+C/9d63oFUC/q3OuUa4F3o1rMYRshpsS1BFxi84xjmoMbDvfq3VXsf/A0C84hCwwGHOAAAAAElFTkSuQmCC';

// 渲染参数
let node1 = {
    // id
    templateName: 'iconTemplate',
    id: '123',
    defineData: {
        nodeName: '123',
        imgSrc: blankImg
    },
    // 画布中位置
    position: [100, 100],
    // 输入
    input: [
    ],
    // 输出
    output: [
    ]
};
let node2 = {
    // id
    id: '124',
    defineData: {
        nodeName: '124',
        imgSrc: loadingImg
    },
    // 画布中位置
    position: [300, 300],
    // 输入
    input: [
    ],
    // 输出
    output: [
    ]
};

let nodes = [
    node1,
    node2
];
let edges = [
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
    autoSort: false
}
let workflow = new AWrokflow(document.getElementById('aw'), {nodes, edges}, globalConfig);
console.log('instance object:');
console.log(workflow.workflowObj);
let loadingAni = null;
document.getElementById('loading').addEventListener('click', function () {
    workflow.updateNode('123', 'icon', {
        style: {
            image: loadingImg
        }
    });
    let curNode = workflow.getNodeInsById('123');
    loadingAni = curNode.dom.icon.animate('', true)
                .when(0, {
                    rotation: 0
                })
                .when(400, {
                    rotation: (Math.PI / 2) * -1
                })
                .when(800, {
                    rotation: Math.PI * -1
                })
                .when(1200, {
                    rotation: Math.PI * 1.5 * -1
                })
                .when(1600, {
                    rotation: Math.PI * 2 * -1
                })
                .start();
});

document.getElementById('stop').addEventListener('click', function () {
    loadingAni && loadingAni.stop();
    loadingAni = null;
    workflow.updateNode('123', 'icon', {
        style: {
            image: ' '
        }
    });
});







