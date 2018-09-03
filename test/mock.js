/**
 * @file node 模拟数据
 * @author yangpei
 */

module.exports = {
    nodes: [
        {
            config: {
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
                    position: [
                        31,
                        8
                    ],
                    normal: {
                        style: {
                            text: '数据拆分',
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: 15,
                            textFill: '#2A2F44'
                        }
                    }
                },
                inputCircle: {
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
                    }
                },
                outputCircle: {
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
                            fill: '#fff',
                            lineWidth: 1
                        },
                        shape: {
                            r: 4
                        }
                    }
                }
            },
            id: '123',
            defineData: {
                nodeName: '数据拆分'
            },
            position: [
                100,
                100
            ],
            input: [
                { }
            ],
            output: [
                {
                    allInputs: true,
                    enbaleInputs: [
                        {
                            id: '124',
                            inputIndex: 0
                        }
                    ]
                }
            ]
        },
        {
            config: {
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
                    position: [
                        31,
                        8
                    ],
                    normal: {
                        style: {
                            text: '随机采样',
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: 15,
                            textFill: '#2A2F44'
                        }
                    }
                },
                inputCircle: {
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
                    }
                },
                outputCircle: {
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
                            fill: '#fff',
                            lineWidth: 1
                        },
                        shape: {
                            r: 4
                        }
                    }
                }
            },
            id: '124',
            defineData: {
                nodeName: '随机采样'
            },
            position: [
                200,
                100
            ],
            input: [
                { }
            ],
            output: [
                {
                    allInputs: true,
                    enbaleInputs: [
                        {
                            id: '124',
                            inputIndex: 0
                        }
                    ]
                }
            ]
        }
    ]
};

