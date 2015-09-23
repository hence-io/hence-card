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
    actionsPosition: {
      type: String,
      value: 'left'
    },
    displayActionsCentered: Boolean,
    displayActionsSeparator: Boolean,
    source: String
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
    '_displayActionsCentered(displayActionsCentered)',
    '_displayActionsSeparator(displayActionsSeparator)',
    '_displayDescription(description)',
    '_displayAvatar(avatar, avatarPosition)',
    '_displayImage(image, imagePosition)',
    '_displayActions(actions, actionsPosition)',
    '_prepareActions(actions.*)',
    '_displaySource(source)'
  ],

  _padded(padded) {
    // If flagged as padded, as the style class for it
    this.toggleClass('padded', padded);
  },

  _displayActionsCentered(displayActionsCentered) {
    // If flagged as padded, as the style class for it
    this.toggleClass('centered', displayActionsCentered, this.$.actions);
  },

  _avatarShape(avatarShape) {
    let selectors = ['avatarTop', 'avatarCentered'];

    selectors.forEach(selector => {
      this.toggleClass('circle', avatarShape === 'circle', this.$[selector]);
    });
  },

  _displayActionsSeparator(displayActionsSeparator) {
    // If flagged as padded, as the style class for it
    this.toggleClass('bordered', displayActionsSeparator, this.$.actions);
  },

  _displayDescription(description) {
    let {$} = this;

    if (description instanceof HTMLElement) {
      $.description.appendChild(description);
    } else {
      $.description.innerHTML = description || '';
    }
  },

  _displaySource(source) {
    let {$} = this;

    if (source instanceof HTMLElement) {
      $.source.appendChild(source);
    } else {
      $.source.innerHTML = source || '';
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


  _displayActions(actions, position) {
    if (actions && position) {
      let [pos, separator] = String(position || '').split(/-/);

      this.set('displayActionsCentered', pos === 'center');
      this.set('displayActionsSeparator', separator === 'separator');
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
    let {$,$$} = this;

    //console.log('dist content',Polymer.dom($$('content')).getDistributedNodes());
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  behaviors: []
});

export default HenceCard;
