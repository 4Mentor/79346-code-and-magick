/**
 * Created by Julia on 24.12.2015.
 */
'use strict';
/* global define: true */

define([
  'photos'
], function(gallery) {
  var onHashChange = function() {
    var REG_EXP = /#photo\/(\S+)/;
    if (location.hash.match(REG_EXP)) {
      gallery.show();
      var srcString = location.hash.substr(7);
      gallery.setCurrentPicture(srcString);
    } else {
      gallery.hide();
    }
  };

  return onHashChange();
})();
