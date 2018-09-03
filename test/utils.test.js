/**
 * @file utils test
 * @author yangpei
 */
const assert = require('power-assert');
const utils = require('../src/utils');
const NodeView = require('../src/template/defaultTemplate/NodeView').default;
const nodeProps = require('./mock').nodes;
const CompilePlate = require('../src/comPlate').default;

describe('src/utils.js', () => {
    describe('mergeArrays()', () => {
        it('should throw errors', () => {
            assert.throws(() => {
                utils.mergeArrays();
            }, Error);
        });
        it('should merge [1, 2] with [3, 4] and return [3, 6]', () => {
            const arr = [1, 2];
            const arr2 = [3, 4];
            assert.deepStrictEqual(utils.mergeArrays(arr, arr2), [4, 6]);
        });
        it('should merge [1, 2] with [3] and return [4, 2]', () => {
            const arr = [1, 2];
            const arr2 = [3];
            assert.deepStrictEqual(utils.mergeArrays(arr, arr2), [4, 2]);
        });
        it('should merge [1] with [2, 3] and return [3, 3]', () => {
            const arr = [1];
            const arr2 = [2, 3];
            assert.deepStrictEqual(utils.mergeArrays(arr, arr2), [3, 3]);
        });
        it('should merge [] with [] and return []', () => {
            const arr = [];
            const arr2 = [];
            assert.deepStrictEqual(utils.mergeArrays(arr, arr2), []);
        });
        it('should merge [\'1\', 2] with [3, 3] and return [4, 5]', () => {
            const arr = ['1', 2];
            const arr2 = [4, 5];
            assert.deepStrictEqual(utils.mergeArrays(arr, arr2), [5, 7]);
        });
        it('should concat string and number', () => {
            const arr = ['s', 2];
            const arr2 = [3, 5];
            assert.deepStrictEqual(utils.mergeArrays(arr, arr2), ['s3', 7]);
        });
        it('should concat string and number', () => {
            const arr = ['s', 2];
            const arr2 = [3, 'f'];
            assert.deepStrictEqual(utils.mergeArrays(arr, arr2), ['s3', '2f']);
        });
    });
    describe('calcuBezizerControlPoints()', () => {
        it('should return two control points when direction is top', () => {
            const start = [100, 100];
            const end = [100, 10];
            assert.deepStrictEqual(utils.calcuBezizerControlPoints(start, end, 'top'), [[100, 80], [100, 30]]);
        });
        it('should return two control points when direction is right', () => {
            const start = [100, 100];
            const end = [200, 100];
            assert.deepStrictEqual(
                utils.calcuBezizerControlPoints(start, end, 'right'),
                [[120, 100], [180, 100]]
            );
        });
        it('should return two control points when direction is bottom', () => {
            const start = [100, 10];
            const end = [100, 100];
            assert.deepStrictEqual(
                utils.calcuBezizerControlPoints(start, end, 'bottom'),
                [[100, 30], [100, 80]]
            );
        });
        it('should return two control points when direction is left', () => {
            const start = [100, 100];
            const end = [10, 100];
            assert.deepStrictEqual(
                utils.calcuBezizerControlPoints(start, end, 'left'),
                [[80, 100], [30, 100]]
            );
        });
        it('should set direction to bottom when direction is not given', () => {
            const start = [100, 10];
            const end = [100, 100];
            assert.deepStrictEqual(
                utils.calcuBezizerControlPoints(start, end),
                [[100, 30], [100, 80]]
            );
        });
    });
    describe('calcuLinePoints()', () => {
        it('should clculate the line\'s right coordinate', () => {
            const edge = {src: '123:0', to: '124:0'};
            const nodes = nodeProps.map(n => {
                const node = new NodeView({props: n});
                node.render();
                return node;
            });
            assert.deepStrictEqual(utils.calcuLinePoints(edge, nodes), {
                start: [185, 130],
                end: [285, 100],
                pointTo: 'top'
            });
        });
        it('should return null when the edge is not found', () => {
            const edge = {src: '123:0', to: '1254:0'};
            const nodes = nodeProps.map(n => {
                const node = new NodeView({props: n});
                node.render();
                return node;
            });
            assert.strictEqual(utils.calcuLinePoints(edge, nodes), null);
        });
    })
})
