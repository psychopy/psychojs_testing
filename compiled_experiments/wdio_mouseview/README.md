# MouseView
This experiment demonstrates how to conduct mousetracking via the [MouseView](https://www.mouseview.org/) library. Try it out at [https://run.pavlovia.org/tpronk/demo_mouseview/](https://run.pavlovia.org/tpronk/demo_mouseview/)

The experiment consists of the following routines:
- `loading_trial`, which downloads the required library (MouseView) and waits until it is ready
- `intro_mouseview_trial`, which informs your participant about what is going to happen
- `init_mouseview_trial`, which configures and initializes MouseView, then waits a second for everything to be ready
- `mouseview_trial`, which performs the actual mouse-tracking
- `finished_trial`, which announces conclusion of the experiment and thanks the participant

# Configuration
The best place to configure MouseView is in the routine `init_mouseview_trial`, component `init_mouseview_code`, above `mouseview.init()`

# How good is it?
- This library has "alpha" status, that means it's still very young and untested.
- I've taken a rather primitive approach for storing MouseView output into PsychoJS

# More information
- MouseView is developed by [Alex Anwyl-Irvine](https://osf.io/yu4az/), [Thomas Armstrong](https://osf.io/ykz69/), and [Edwin Dalmaijer](https://osf.io/egpnh/)
- There is a [paper preprint](https://psyarxiv.com/rsdwg/) detailing the methods.
- The project has a [website](https://www.mouseview.org/docs/Configuration) and a [GitHub repo](https://github.com/u01ai11/MouseView.js)
- This [Tweet](https://twitter.com/esdalmaijer/status/1368858970912358405) announced MouseView

# What can do with your experiment?
Whatever you'd like! I delivered a bare-bones version to show that it's possible to use MouseView with PsychoJS, but as listed above, a lot of improvements could be made. Feel free to clone this experiment, improve it, and adapt it to your needs. Please share your improvements to the experiment with our community and any improvements to MouseView with its developers. 