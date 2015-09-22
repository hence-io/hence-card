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
    // Avatar
    avatar: String,
    avatarPosition: {
      type: String,
      value: 'top'
    },
    avatarShape: {
      type: String,
      value: 'circle'
    },
    displayAvatarTop: Boolean,
    displayAvatarCentered: Boolean,
    // Image
    image: String,
    imagePosition: {
      type: String,
      value: 'top'
    },
    displayImageTop: Boolean,
    displayImageCentered: Boolean,
    displayImageBackground: Boolean,
    // Content
    title: String,
    subtitle: String,
    description: String,
    displayIntroTitle: {
      type: Boolean,
      computed: '_displayIntroTitle(displayAvatarCentered, displayImageTop)'
    },
    // Actions
    actions: Array,
    actionsCentered: Boolean,
    actionsBordered: Boolean
  },

  /*********************************************************************************************************************
   * Computed
   ********************************************************************************************************************/
    _displayIntroTitle(displayAvatarCentered, displayImageTop) {
    return displayAvatarCentered || !displayImageTop;
  },


  /*********************************************************************************************************************
   * Observers
   ********************************************************************************************************************/
  observers: [
    '_padded(padded)',
    '_avatarShape(avatarShape)',
    '_actionsCentered(actionsCentered)',
    '_actionsBordered(actionsBordered)',
    '_displayDescription(description)',
    '_displayAvatar(avatar, avatarPosition)',
    '_displayImage(image, imagePosition)',
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

  _avatarShape(avatarShape) {
    let selectors = ['avatarTop', 'avatarCentered'];

    selectors.forEach(selector => {
      this.toggleClass('circle', avatarShape === 'circle', this.$[selector]);
    });
  },

  _actionsBordered(actionsBordered) {
    // If flagged as padded, as the style class for it
    this.toggleClass('bordered', actionsBordered, this.$.actions);
  },

  _displayDescription(description) {
    let {$} = this;

    if (description instanceof HTMLElement) {
      $.description.appendChild(description);
    } else {
      $.description.innerHTML = description || '';
    }
  },

  _displayAvatar(img, position) {
    if (img) {
      let [pos, alignment] = String(position || '').split(/-/);

      this.displayAvatarTop = pos === 'top';
      this.displayAvatarCentered = pos === 'center';

      if (alignment === 'right') {
        this.$$('#avatarTopColumn').classList.add('float-right');
      }
    }
  },

  _displayImage(img, position) {
    if (img) {
      let [pos, alignment] = String(position || '').split(/-/);

      this.displayImageTop = pos === 'top';
      this.displayImageCentered = pos === 'center';
      this.displayImageBackground = pos === 'background';

      if (this.displayImageBackground) {
        this.toggleClass('background-tile', true);
        this.style.backgroundImage = `url('${img}')`;
        this.updateStyles();
      }
    }
  },

  _prepareActions(actions) {
    if (actions && actions.value) {
      actions.value.forEach(action=> {
        if (action.icon) {
          action.iconClass += ` fa-${action.icon} `;
        }
        if (action.float) {
          action.class += ` float-${action.float} `;
        }
      });

      this.$.actions.classList.add('padded');
    }
  },

  /*********************************************************************************************************************
   * Event Listeners & Hooks
   ********************************************************************************************************************/

  'hook.action': Hence.hook('action'),

  /*********************************************************************************************************************
   * Element DOM Hooks
   ********************************************************************************************************************/

    attached() {
    //console.log('this.$', this.$);
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  behaviors: []
});

export default HenceCard;
