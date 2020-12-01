const fs = require('fs');
const SharedBehaviors = require('../shared/SharedBehaviors');

describe('ae2e_text', () => {
  let calibration;  

  it('sessionId and platformName', () => {
    console.log(browser.sessionId + ' | ' + browser.getPlatformName());
  });

  it('navigate to experiment URL', () =>  {
    browser.url('https://run.pavlovia.org/tpronk/e2e_map_click/');
  });

  it('perform pavlovia prelude', () => {
    SharedBehaviors.performPavloviaPrelude();
  });

  it('perform calibration', () => {
    calibration = SharedBehaviors.performCalibration();
  })

  it('move slider', () => {
    transformX = (x) => {
      return Math.round(calibration.interceptX + calibration.coefX * x);
    };
    transformY = (y) => {
      return Math.round(calibration.interceptY + calibration.coefY * y);
    };    
    // Tap past verification_feedback
    SharedBehaviors.tapAtCoordinate(
      transformX(0),
      transformY(0)
    );       
    // Wait for slider procedure
    browser.waitUntil(() => {
      return $('<body>').getAttribute('data-report') === 'slider';
    }, {timeoutMsg: 'routine not slider'});    

    // Move slider
    browser.performActions([{
      "type": "pointer",
      "id": "my_pointer",
      "parameters": {"pointerType": browser.getPointerType()},
      "actions": [
        // Pointer down at [0,0] for 1000 ms
        {"type": "pointerMove", "duration": 0, "x": transformX(0), "y":  transformY(0), origin: 'viewport'},
        {"type": "pointerDown", "duration": 0, "button": 0},
        {"type": "pause", "duration": 1000},
        // Move to [-0.5, 0] over 1000 ms
        {"type": "pointerMove", "duration": 1000, "x": transformX(-0.5), "y":  transformY(0), origin: 'viewport'},
        // Move to [0.5, 0] over 2000 ms        
        {"type": "pointerMove", "duration": 2000, "x": transformX(0.5), "y":  transformY(0), origin: 'viewport'},
        // Release
        {"type": "pointerUp", "duration": 0, "button": 0}
      ]
    }]);    
  }

  afterAll(() => {
    fs.writeFileSync(
      '.tmp/custom_logs/' + browser.sessionId + '.json',
      JSON.stringify({
        platform: browser.getPlatformName(),
        'resolution': browser.getResolution(),
        'window.innerWidth': calibration.viewportResolutions['window.innerWidth'],
        'window.innerHeight': calibration.viewportResolutions['window.innerHeight'],
        'window.devicePixelRatio': calibration.viewportResolutions['window.devicePixelRatio'],
        'screen.width': calibration.viewportResolutions['screen.width'],
        'screen.height': calibration.viewportResolutions['screen.height'],
        'deviationX': calibration.deviationX,
        'deviationY': calibration.deviationY
      })
    );  
  });
});
