import * as util from './../../dist/util-2020.2.js';
describe('demo_test', () => {
  it('isInt', () => {
    expect(util.isInt(5)).toEqual(true);
    expect(util.isInt('xx')).toEqual(true);
    expect(util.isInt(1.1)).toEqual(false);
    expect(util.isInt(0)).toEqual(true);
    expect(util.isInt('aa')).toEqual(true);
  });
});
