// 默认模版
const defaultTemplate = {
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

export default defaultTemplate;