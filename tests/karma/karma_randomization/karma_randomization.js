//import * as util from '../../../dist/util-2021.1.2.js';
import * as util from '/util.js';
import {TrialHandler} from '/data.js';
import { PsychoJS } from '/core.js';

// *** GLOBALS
// Polyfill for Array.flat. From: https://github.com/jonathantneal/array-flat-polyfill
Array.prototype.flat||Object.defineProperty(Array.prototype,"flat",{configurable:!0,value:function r(){var t=isNaN(arguments[0])?1:Number(arguments[0]);return t?Array.prototype.reduce.call(this,function(a,e){return Array.isArray(e)?a.push.apply(a,r.call(e,t-1)):a.push(e),a},[]):Array.prototype.slice.call(this)},writable:!0}),Array.prototype.flatMap||Object.defineProperty(Array.prototype,"flatMap",{configurable:!0,value:function(r){return Array.prototype.map.apply(this,arguments).flat()},writable:!0})

// trialHandler shim
let trialHandler = new TrialHandler({
  psychoJS: new PsychoJS()
});
trialHandler.seed = 42;
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

  // Sequential; each next element should alternate; no repetitions of 2 or longer
  it('sequential_is_1_2_3_4', () => {
    trialHandler.nReps = 1;
    trialHandler.nStim = 4;
    trialHandler.trialList.keys = function() {
      return [1, 2, 3, 4];
    };
    trialHandler.method = TrialHandler.Method.SEQUENTIAL;
    shuffleResult = trialHandler._prepareSequence().flat();
    expect(shuffleResult).toEqual([1, 2, 3, 4]);
  });  

  it('random_is_4_2_3_1', () => {
    trialHandler.nReps = 1;
    trialHandler.nStim = 4;
    trialHandler.trialList.keys = function() {
      return [1, 2, 3, 4];
    };
    trialHandler.method = TrialHandler.Method.RANDOM;
    shuffleResult = trialHandler._prepareSequence().flat();
    expect(shuffleResult).toEqual([4, 2, 3, 1]);
  });  

  it('random_is_b_a_a_b', () => {
    trialHandler.nReps = 2;
    trialHandler.nStim = 2;
    trialHandler.trialList.keys = function() {
      return ['a', 'b'];
    };
    trialHandler.method = TrialHandler.Method.RANDOM;
    shuffleResult = trialHandler._prepareSequence().flat();
    expect(shuffleResult).toEqual(['b', 'a', 'a', 'b']);
  });  

  it('full_random_is_2_2_2_1_1_1', () => {
    trialHandler.nReps = 3;
    trialHandler.nStim = 2;
    trialHandler.trialList.keys = function() {
      return [1, 2];
    };
    trialHandler.method = TrialHandler.Method.FULL_RANDOM;
    shuffleResult = trialHandler._prepareSequence().flat();
    expect(shuffleResult).toEqual([2, 2, 2, 1, 1, 1]);
  });
});


/*
// *** Some tests with long sequences
// 




// Random
trialHandler.method = TrialHandler.Method.RANDOM;
shuffleResult = trialHandler._prepareSequence().flat();
//console.log('RANDOM. shuffleResult: ' + shuffleResult);
console.log('RANDOM. All repetitions shorter than 3? ' + !repetitions(shuffleResult, 3));

// Full random
trialHandler.method = TrialHandler.Method.FULL_RANDOM;
shuffleResult = trialHandler._prepareSequence().flat();
//console.log('FULL_RANDOM. shuffleResult: ' + shuffleResult);
console.log('RANDOM. Any repetitions longer than 2? ' + repetitions(shuffleResult, 3));


// *** Tests with same settings as wdio_conditions

// wdio_conditions: random_csv
trialHandler.nReps = 1;
trialHandler.nStim = 4;
trialHandler.trialList.keys = function() {
  return [1, 2, 3, 4];
};
trialHandler.method = TrialHandler.Method.RANDOM;
shuffleResult = trialHandler._prepareSequence().flat();
console.log('random_csv. shuffleResult == 4,2,3,1? ' + (shuffleResult.toString() === '4,2,3,1'));

// wdio_conditions: random_xlsx
trialHandler.nReps = 2;
trialHandler.nStim = 2;
trialHandler.trialList.keys = function() {
  return ['a', 'b'];
};
trialHandler.method = TrialHandler.Method.RANDOM;
shuffleResult = trialHandler._prepareSequence().flat();
console.log('random_xlsx. shuffleResult == b,a,a,b? ' + (shuffleResult.toString() === 'b,a,a,b'));

// wdio_conditions: random_funky
trialHandler.nReps = 3;
trialHandler.nStim = 2;
trialHandler.trialList.keys = function() {
  return [1, 2];
};
trialHandler.method = TrialHandler.Method.FULL_RANDOM;
shuffleResult = trialHandler._prepareSequence().flat();
console.log('random_funky. shuffleResult == 2,1,1,2,1,2? ' + (shuffleResult.toString() === '2,1,1,2,1,2'));
console.log('random_funky. shuffleResult is ' + shuffleResult.toString());
*/
