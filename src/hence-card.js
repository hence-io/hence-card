'use strict';
/**
 * @module hence-card
 */

import Hence from 'hence-component-framework';
import _defaults from 'lodash/object/defaultsDeep';

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
    actions: Array,
    actionsCentered: Boolean,
    displayIntroTitle: Boolean,
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
    '_actionsCentered(actionsCentered)',
    '_displayDescription(description)',
    '_displayCallToAction(callToAction)',
    '_displayIntroTitle(displayCenteredAvatar, displayTopImage)',
    '_displayTopAvatar(avatar, avatarPosition)',
    '_displayCenteredAvatar(avatar, avatarPosition)',
    '_displayTopImage(image, imagePosition)',
    '_displayBackgroundImage(image, imagePosition)',
    '_prepareActions(actions.*)'
  ],

  _padded(padded) {
    // If flagged as padded, as the style class for it
    this.toggleClass('padded', padded);
  },

  _actionsCentered(actionsCentered) {
    // If flagged as padded, as the style class for it
    this.toggleClass('centered', actionsCentered, this.$.actions);
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

  _displayIntroTitle(displayCenteredAvatar, displayTopImage) {
    this.set('displayIntroTitle', displayCenteredAvatar || !displayTopImage);
  },

  _displayTopAvatar(avatar, avatarPosition) {
    let [pos, alignment] = avatarPosition.split(/-/);
    this.set('displayTopAvatar', !!avatar && pos === 'top');
    if (alignment === 'right') {
      this.$$('#avatarTopColumn').classList.add('float-right');
    }
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

  _prepareActions(actions) {
    if (actions && actions.value) {
      actions.value.forEach(action=> {
        if (action.icon) {
          action.iconClass = `fa-${action.icon}`;
        }
      });
    }
  },

  /*********************************************************************************************************************
   * Event Listeners & Hooks
   ********************************************************************************************************************/

  'hook.action': Hence.hook('action'),

  /*********************************************************************************************************************
   * Element DOM Hooks
   ********************************************************************************************************************/

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  behaviors: []
});

export default HenceCard;
