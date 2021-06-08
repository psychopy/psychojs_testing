//import * as util from '../../../dist/util-2021.1.2.js';
import { util } from '/psychojs.js';

// *** RUN TESTS
describe('pythonisms', () => {
	it('util.sum', () => {
		// Some basic checks of whether summing numbers works as expected
		expect(util.sum([1,2,3])).toEqual(6);
		expect(util.sum([1,2,3], 2)).toEqual(8);
		// Check if invalid input throws something
		expect(() => { return util.sum('hello'); }).toThrow();
		expect(() => { return util.sum([1,2,'a']); }).toThrow();
		expect(() => { return util.sum({a:3}); }).toThrow();
		expect(() => { return util.sum('hello'); }).toThrow();
		expect(() => { util.sum([1,2,3], 2, 2); }).toThrow();
	});

	it('util.sort', () => {
		// Sort a couple of numbers
		expect(util.sort([4.3, 1, 2])).toEqual([1, 2, 4.3]);
		// Sort a couple of strings
		expect(util.sort(['a', 'b', 'ab'])).toEqual(['a', 'ab', 'b']);
		// Check if invalid input throws something
		expect(() => { return util.sort('not_an_array'); }).toThrow();
 		expect(() => { return util.sort([1, 2, 'a']); }).toThrow();
		expect(() => { return util.sort(1, 2, 3); }).toThrow();
	});

	it('util.count and util.index', () => {
		// A haystack with an assortment of different types of values
		let haystack = [1, 1, 2, 3, 'word', null, undefined, NaN, true, [1, 2, 3], {a:2}, function() {}];

		// *** util.count
		// Some basic checks of whether count works as expected
		expect(util.count(haystack, 1)).toEqual(2);
		expect(util.count(haystack, 'word')).toEqual(1);
		expect(util.count(haystack, null)).toEqual(1);
		expect(util.count(haystack, undefined)).toEqual(1);
		expect(util.count(haystack, NaN)).toEqual(1);
		expect(util.count(haystack, true)).toEqual(1);
		expect(util.count(haystack, [1,2,3])).toEqual(1);
		expect(util.count(haystack, {a:2})).toEqual(1);
		// Check if invalid input throws something
		expect(() => { return util.count(function() {}); }).toThrow();
 		expect(() => { return util.count(Symbol('a')); }).toThrow();

		// *** util.index
		expect(util.index(haystack, {a:2})).toEqual(10);
		expect(() => { return util.index(haystack, Symbol('a')); }).toThrow();
		expect(() => { return util.index(haystack, 'missing'); }).toThrow();
	});

	it('util.randint', () => {
		// Generate and check a bunch of random integers
		let checkMe, low = 4, high = 8;
		for (let i = 0; i < 1000; i++) {
			checkMe = util.randint(low, high);
			expect(Number.isInteger(checkMe)).toBeTrue();
			expect(checkMe).toBeGreaterThanOrEqual(low);
			expect(checkMe).toBeLessThan(high);
		}
		
		// Check if invalid input throws something
		expect(() => { return util.randint('a', 8); }).toThrow(); 
		expect(() => { return util.randint(8, 'a'); }).toThrow();
		expect(() => { return util.randint(8, 8.1); }).toThrow();
		expect(() => { return util.randint(1, 2, 3); }).toThrow();
	});

	it('util.range', () => {
		// Generate and check a bunch of ranges
		expect(util.range(5)).toEqual([0, 1, 2, 3, 4]);
		expect(util.range(1, 1)).toEqual([]);
		expect(util.range(1, 5)).toEqual([1, 2, 3, 4]);
		expect(util.range(1, 5, 2)).toEqual([1, 3]);

		// Check if invalid input throws something
		expect(() => { return util.range(1.1); }).toThrow(); 
		expect(() => { return util.range(1, 1.1); }).toThrow(); 
		expect(() => { return util.range(1, 1, 1.1); }).toThrow(); 
		expect(() => { return util.range(1, 2, 0); }).toThrow(); 
		expect(() => { return util.range(1, 2, 3, 4); }).toThrow(); 
	});

	it('util.average', () => {
		// Check an average
		expect(util.average([1, 2, 3])).toEqual(2);

		// Check if invalid input throws something
		expect(() => { return util.average('hello'); }).toThrow(); 
		expect(() => { return util.average([1,2,'a']); }).toThrow(); 
		expect(() => { return util.average([1,2,3], 2); }).toThrow(); 
	});
});
