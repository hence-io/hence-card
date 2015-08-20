'use strict';
/**
 * @module hence-card
 */
import console from 'consoler';
import Hence from 'hence-component-framework';
import _defaults from 'lodash/object/defaultsDeep.js';

/**
 * HenceCard Component
 * @constructor
 */
let HenceCard = Hence.Ui({
  is: 'hence-card',
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
      value: 'http://placehold.it/450x50'
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
    let self = this;
    // Update the property, using this.set to fire any expecting listeners
    self.set('displayOptions', !self.displayOptions);
    self.updateDisplayOptions();
  },

  hooks: {
    callToAction: 'processCallToAction',
    opt:''
  },

  processCallToAction(data, model, e) {
    // update the data before it gets sent back through the hook
    data.input.value += ' has been processed!';
    alert(`${this.callToAction.input.value} != ${data.input.value}`);
  },

  //'hook.opt': Hence.hook('opt'),

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
    this._prepareData();

    this.async(()=> {
      // access sibling or parent elements here
    });
  },

  _prepareData() {
    let self = this;
    let $ = self.$;
    let callToAction = self.callToAction;

    // WARNING, updating DOM elements HERE may override variable revisions in the factoryImpl function if created
    // with the createElement function,leveraging the components defaults instead. If the element is embedded, no issue.

    // If flagged as padded, as the style class for it
    if (self.padded) {
      $.wrapper.classList.add('padded');
    }

    // If call to action was provided, sanitize it's input if also provided
    if (callToAction) {
      if (callToAction.align) {
        $.callToAction.classList.add(callToAction.align);
      }

      if (callToAction.input) {
        _defaults(callToAction.input, {
          type: 'text',
          placeholder: '',
          label: ''
        });
      }

      self.set('callToAction', callToAction); // make sure to fire any watchers
    }

    self.updateDisplayOptions();

    //console.log('comp is ', self.properties);
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  behaviors: [],

  updateDisplayOptions() {
    let self = this;
    self.toggleClass('open', self.displayOptions, self.$$('#options'));
  }
});

export default HenceCard;
