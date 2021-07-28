export function init (slides, stimulus, button_previous) {
  // Current slide
  var slide_i = 0;
  // Show slide callback
  var draw = function() {
    // Hide "previous" button on first slide
    if (slide_i === 0) {
      button_previous.setOpacity(0);
    } else {
      button_previous.setOpacity(1);
    }
    stimulus.setImage(slides[slide_i]);
    stimulus.draw()
    //stimulus.refresh();
  }
  var first = true;
  // Frame callback
  return {
    // Draw the slideshow for the first time
    draw: draw,
    // Go to the next or previous slide
    update: function(action) {
      // Should we change the slide presented? Assume no
      var change = false;
      if (action === 'slideshow_next') {
        // Fo to next slide
        slide_i++;
        // Slide exists? Change slide presented
        if (slide_i < slides.length) {
          change = true;
        }
      }
      if (action === 'slideshow_previous') {
        // Previous
        if (slide_i > 0) {
          // Still slides left; go to previous slide
          slide_i--;
          change = true;
        } 
      }
      // Slide changed; draw slideshow
      if (change) {
        draw();
      }
    },
    // Current slide index
    currentSlide: function() {
      return slide_i;
    },
    // Done with the slideshow?
    done: function() {
      return slide_i >= slides.length;
    }    
  }
};
