/**
 * Created by Winson on 17/7/4.
 */

var fragment = require('./fragment.js');

exports = module.exports = function (app) {// routes

  //fragments
  app.get('/fragment/list_public', fragment.list_public);

};

