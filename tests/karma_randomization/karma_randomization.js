//import * as util from '../../../dist/util-2021.1.2.js';
import { core, data, util } from '/psychojs.js';
const { PsychoJS } = core;
const { TrialHandler } = data;
// const { Scheduler } = util;

// import * as util from '/util.js';
// import {TrialHandler} from '/data.js';
// import { PsychoJS } from '/core.js';

// *** GLOBALS
// Polyfill for Array.flat. From: https://github.com/jonathantneal/array-flat-polyfill
Array.prototype.flat||Object.defineProperty(Array.prototype,"flat",{configurable:!0,value:function r(){var t=isNaN(arguments[0])?1:Number(arguments[0]);return t?Array.prototype.reduce.call(this,function(a,e){return Array.isArray(e)?a.push.apply(a,r.call(e,t-1)):a.push(e),a},[]):Array.prototype.slice.call(this)},writable:!0}),Array.prototype.flatMap||Object.defineProperty(Array.prototype,"flatMap",{configurable:!0,value:function(r){return Array.prototype.map.apply(this,arguments).flat()},writable:!0})

// trialHandler shim
let trialHandler = new TrialHandler({
  psychoJS: new PsychoJS()
});
trialHandler.trialList = {};
// Results per shuffle
let shuffleResult;

// *** RUN TESTS
describe('randomization', () => {
  it('shuffle_uniformly_distributed', () => {
    // *** Test the fisherYates shuffle; generate sequences
    let frequencies = {}; // Counts frequencies of each order
    let shuffleResult;    // Result of current shuffle
    for (let i = 0; i < 600000; i++) {
      shuffleResult = util.shuffle([1,2,3]).toString();
      if (shuffleResult in frequencies) {
        frequencies[shuffleResult]++;
      } else {
        frequencies[shuffleResult] = 0;
      }
    }
    // Check if each value is in the 99.9% confidence range
    // Obtained lower and upper critical values via this R-script:
    // qbinom(0.001, 600000, 1/6) # 99109
    // qbinom(0.05, 600000, 1/6, lower.tail = FALSE) # 100893
    let frequency;
    for (let frequency_i of Object.keys(frequencies)) {
      frequency = frequencies[frequency_i];
      expect(frequency).toBeGreaterThanOrEqual(99109);
      expect(frequency).toBeLessThanOrEqual(100893);
    }
  });

  // SEQUENTIAL; should present the keys 1, 2, 3, 4 in sequence
  it('sequential_is_1_2_3_4', () => {
		trialHandler.seed = 42;
    trialHandler.nReps = 1;
    trialHandler.nStim = 4;
    trialHandler.trialList.keys = function() {
      return [1, 2, 3, 4];
    };
    trialHandler.method = TrialHandler.Method.SEQUENTIAL;
    shuffleResult = trialHandler._prepareSequence().flat();
    expect(shuffleResult).toEqual([1, 2, 3, 4]);
  });  

	// RANDOM should present the keys in a (seeded) random order
	it('random_is_4_2_3_1', () => {
		trialHandler.seed = 42;
    trialHandler.nReps = 1;
    trialHandler.nStim = 4;
    trialHandler.trialList.keys = function() {
      return [1, 2, 3, 4];
    };
    trialHandler.method = TrialHandler.Method.RANDOM;
    shuffleResult = trialHandler._prepareSequence().flat();
    expect(shuffleResult).toEqual([4, 2, 3, 1]);
  });  

	// RANDOM should present the keys in a (seeded) random order, no reps longer than two
  it('random_reps_at_most_2', () => {
		trialHandler.seed = 42;
    trialHandler.nReps = 4;
    trialHandler.nStim = 2;
    trialHandler.trialList.keys = function() {
      return ['a', 'b'];
    };
    trialHandler.method = TrialHandler.Method.RANDOM;
    shuffleResult = trialHandler._prepareSequence().flat();
		expect(shuffleResult).toEqual(['b', 'a', 'a', 'b', 'a', 'b', 'b', 'a']);
  });  

	// RANDOM should present the keys in a (seeded) random order, with reps longer than two
  it('full_random_reps_longer_than_2', () => {
		trialHandler.seed = 42;
    trialHandler.nReps = 5;
    trialHandler.nStim = 2;
    trialHandler.trialList.keys = function() {
      return [1, 2];
    };
    trialHandler.method = TrialHandler.Method.FULL_RANDOM;
    shuffleResult = trialHandler._prepareSequence().flat();
    expect(shuffleResult).toEqual([1, 1, 2, 2, 2, 1, 2, 2, 1, 1]);
  });

	// Generating two sequences using RANDOM without seed should yield unique sequences
	it('unseeded_random_is_unique', () => {
		trialHandler.seed = undefined;
    trialHandler.nReps = 1;
    trialHandler.nStim = 8;
    trialHandler.trialList.keys = function() {
      return [1, 2, 3, 4, 5, 6, 7, 8];
    };
    trialHandler.method = TrialHandler.Method.RANDOM;
		let firstResult = trialHandler._prepareSequence().flat();
		let secondResult = trialHandler._prepareSequence().flat();
    expect(firstResult).not.toEqual(secondResult);
  });  	
});
