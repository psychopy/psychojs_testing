export const center = [0, 0];
export const top = [0, 0.5];
export const bottomCenter = [0, -0.25];
export const bottom = [0, -0.5];
export const left = [-0.5, 0];
export const right = [0.5, 0];
export const midLeft = [-0.35, 0];
export const midRight = [0.35, 0];
export function init(psychoJS, stimuli) {
  // Setup layout
  var lastCanvas = [null, null];
  //for (var i = 0; i < stimuli.length; i++) {
  //    stimuli[i].pos = stimuli[i].stim.getPos();
  //}
  // Return function for updating layout
  return function(forceRescale) {
    // Check for change in window size
    var canvas = psychoJS.window.size;
    var updateScaling = lastCanvas[0] !== canvas[0] || lastCanvas[1] !== canvas[1];
    if (updateScaling || forceRescale) {
      // Adjust scaling
      console.log('Adjust scaling');
      var scaling = [
        canvas[0] <= canvas[1]? 1: canvas[0] / canvas[1],
        canvas[1] <= canvas[0]? 1: canvas[1] / canvas[0]
      ];
      var stimulus, anchor, pos, width, height, newPos, size;
      for (var i = 0; i < stimuli.length; i++) {
        stimulus = stimuli[i].stim;
        anchor = stimuli[i].anchor;
        pos = stimuli[i].pos;          
        width = stimuli[i].width;
        height = stimuli[i].height;
        newPos = [
          scaling[0] * anchor[0] + pos[0],
          scaling[1] * anchor[1] + pos[1],
        ];
        if (width !== undefined) {
          size = stimulus.size;
          size[0] = scaling[0] * width
          stimulus.size = size;
        }
        if (height !== undefined) {
          size = stimulus.size;
          size[1] = scaling[1] * height
          stimulus.size = size;
        }
        stimulus.setPos(newPos);
        if (i == 0) {
          console.log(newPos);
        }
        stimulus.refresh();
      }
      lastCanvas = [canvas[0], canvas[1]];
    }
  }
};