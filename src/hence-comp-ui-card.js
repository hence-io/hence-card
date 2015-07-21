'use strict';
/**
 * @module hence-comp-ui-card
 */
import console from 'consoler';
import HenceComp from 'hence-comp';

/*import _extend from 'lodash/object/extend';*/
import _defaults from 'lodash/object/defaults';

let is = 'hence-comp-ui-card';

/**
 * HenceCompUiCard Component
 * @constructor
 */
let HenceCompUiCard = HenceComp({
  is, // auto set as is : is, es6 laziness joy!
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  properties: {
    padded: {
      type: Boolean,
      value: false
    },
    image: {
      type: String,
      value: 'http://placehold.it/350x150'
    },
    title: {
      type: String,
      value: 'Lorem ipsum dolor sit amet'
    },
    description: {
      type: String,
      value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam consequatur ex id iste modi natus ' +
      'nostrum numquam odio porro praesentium quisquam quos, rem reprehenderit sequi unde vero vitae voluptatem?'
    },
    options: {
      type: Array,
      notify: true,
      value: null
    },
    displayOptions: {
      type: Boolean,
      value: false
    },
    callToAction: {
      type: Object,
      notify: true,
      value: null
    }
  },

  /*********************************************************************************************************************
   * Event Listeners
   ********************************************************************************************************************/

  /**
   * When working with listeners, if their target element doesn’t exist on the DOM you get a very basic nonspecific
   * error 'Uncaught TypeError: Invalid value used as weak map key’!  Make sure to review the listeners you set up
   * against you DOM elements. By default listeners look for IDs on elements so ‘myButton.tap’ will watch click/touches
   * on a #myButton element in the component
   */


  /**
   * @param {Event} e The event executing this function
   */
  eventToggleOptions(e) {
    // Update the property, using this.set to fire any expecting listeners
    this.set('displayOptions', !this.displayOptions);
    console.log('this.displayOptions is now', e, this.displayOptions);
  },

  /**
   * @param {Event} e The event executing this function
   */
  eventCallToAction(e) {
    console.log('eventCallToAction', e, this.callToAction.input);
    this.callToAction.action(e, this.callToAction.input);
  },

  eventOptionAction(e) {
    let opt = e.model.opt;
    console.log(e, opt, opt.action);
    opt.action();
  },

  /*********************************************************************************************************************
   * Element DOM Hooks
   ********************************************************************************************************************/

  /**
   * This is called after all elements have been configured, but propagates bottom-up. This element's children are
   * ready, but parents are not. This is the point where you should make modifications to the DOM (when  necessary),
   * or kick off any processes the element wants to perform.
   */
  ready() {
    // WARNING, updating DOM elements HERE may override variable revisions in the factoryImpl function if created
    // with the createElement function,leveraging the components defaults instead. If the element is embedded, no issue.

  },

  /**
   * `attached` fires once the element and its parents have been inserted  into a document. This is a good place to
   * perform any work related to your element's visual state or active behavior (measuring sizes, beginning animations,
   * loading resources, etc).
   */
  attached() {
    let self = this;
    let $ = self.$;
    let options = self.options;
    let callToAction = self.callToAction;

    // WARNING, updating DOM elements HERE may override variable revisions in the factoryImpl function if created
    // with the createElement function,leveraging the components defaults instead. If the element is embedded, no issue.

    // If flagged as padded, as the style class for it
    if (self.padded) {
      $.wrapper.classList.add('padded');
    }

    // If options were added, fill in their event bindings
    if (options.length) {
      options.forEach((opt)=> {
        self.set(`event_${opt.action.name}`, opt.action);
      });
    }

    // If call to action was provided, sanitize it's input if also provided
    if (callToAction) {
      $.callToAction.classList.add(callToAction.align || '');

      if (callToAction.input) {
        _defaults(callToAction.input, {
          type: 'text',
          placeholder: '',
          label: ''
        });
      }
    }

    this.async(()=> {
      // access sibling or parent elements here
    });
  }


  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

});

export {is};
export default HenceCompUiCard;
