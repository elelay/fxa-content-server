/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// a very light wrapper around the real FxaClient to reduce boilerplate code
// and to allow us to develop to features that are not yet present in the real
// client.

'use strict';

define([
  'fxaClient',
  'processed/constants'
],
function (FxaClient, Constants) {
  function FxaClientWrapper() {
    this.client = new FxaClient(Constants.FXA_ACCOUNT_SERVER);
  }

  FxaClientWrapper.prototype = {
    signIn: function (email, password) {
      return this.client.signIn(email, password);
    },

    signUp: function (email, password) {
      return this.client
                 .signUp(email, password)
                 .then(function () {
                    // when a user signs up, sign them in immediately
                    return this.signIn(email, password);
                  }.bind(this));
    }
  };

  return FxaClientWrapper;
});
