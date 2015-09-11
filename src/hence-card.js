'use strict';
/**
 * @module hence-card
 */

import Hence from 'hence-component-framework';
import _defaults from 'lodash/object/defaultsDeep';
import _isString from 'lodash/lang/isString';

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
    padded: Boolean,
    avatar: String,
    avatarPosition: {
      type: String,
      value: 'top'
    },
    image: String,
    imagePosition: {
      type: String,
      value: 'top'
    },
    backgroundImage: String,
    title: String,
    subtitle: String,
    description: String,
    options: Array,
    callToAction: {
      type: Object,
      notify: true
    },
    displayOptions: Boolean,
    displayTopAvatar: Boolean,
    displayCenteredAvatar: Boolean,
    displayTopImage: Boolean,
    displayBackgroundImage: Boolean
  },

  /*********************************************************************************************************************
   * Observers
   ********************************************************************************************************************/
  observers: [
    '_padded(padded)',
    '_displayDescription(description)',
    '_displayCallToAction(callToAction)',
    '_displayTopAvatar(avatar, avatarPosition)',
    '_displayCenteredAvatar(avatar, avatarPosition)',
    '_displayTopImage(image, imagePosition)',
    '_displayBackgroundImage(image, imagePosition)',
    '_updateDisplayOptions(displayOptions)'
  ],

  _padded(padded) {
    // If flagged as padded, as the style class for it
    this.toggleClass('padded', padded);
  },

  _displayDescription(description) {
    let {$} = this;
    if (description instanceof HTMLElement) {
      $.description.appendChild(description);
    } else {
      $.description.innerHTML = description || '';
    }
  },

  _displayCallToAction(callToAction) {
    let {$} = this;

    // If call to action was provided, sanitize it's input if also provided
    if (callToAction) {
      if (callToAction.align) {
        $.callToAction.classList.add(callToAction.align);
      }

      // Ensure that the input object is properly configured
      callToAction.input = _defaults(callToAction.input || {}, {
        type: 'text',
        placeholder: '',
        label: ''
      });
    }
  },

  _displayTopAvatar(avatar, avatarPosition) {
    this.set('displayTopAvatar', !!avatar && avatarPosition === 'top');
  },

  _displayCenteredAvatar(avatar, avatarPosition) {
    this.set('displayCenteredAvatar', !!avatar && avatarPosition === 'center');
  },

  _displayTopImage(image, imagePosition) {
    this.set('displayTopImage', !!image && imagePosition === 'top');
  },

  _displayBackgroundImage(image, imagePosition) {
    this.set('displayBackgroundImage', !!image && imagePosition === 'background');
    if (this.displayBackgroundImage) {
      this.toggleClass('background-tile', true);
      this.customStyle['--image-background'] = `url('${image}')`;
      this.updateStyles();
    }
  },

  _updateDisplayOptions(displayOptions) {
    this.toggleClass('open', !!displayOptions, this.$$('#options'));
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
  },

  hooks: {
    callToAction: 'processCallToAction',
    opt: ''
  },

  processCallToAction(data, model, e) {
    // update the data before it gets sent back through the hook
    data.input.value += ' has been processed!';
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

    this.async(()=> {
      // access sibling or parent elements here
    });

    console.log(this.debugThis());
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  behaviors: []
});

export default HenceCard;
