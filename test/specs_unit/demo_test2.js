import * as util from './../../dist/util-2020.2.js';
describe('demo_test2', () => {
  it('isInt2', () => {
    expect(util.isInt(5)).toEqual(true);
    expect(util.isInt(1.1)).toEqual(false);
  });
});
