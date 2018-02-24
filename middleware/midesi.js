/**
 * Created by Winson on 2017/12/4.
 */
'use strict';

const esiex = require('./esiex');

function midesi(config) {
  const esi = esiex(config);
  return (req, res, next) => {
    const orgrender = res.render.bind(res);

    res.render = (view, options, callback) => {
      if(typeof options === 'function') {
        callback = options;
        options = {};
      }
      if(typeof callback !== 'function') {
        callback = (err, str) => {
          if(err) return req.next(err);
          res.send(str);
        };
      }

      //after render,before send ->do process.
      orgrender(view, options, (err, html) => {
        if(err) return callback(err);
        //if no esi,go on
        if(!esi.check_enable(options)) return callback(null, html);

        esi.process(options, html)
          .then(result => callback(null, result))
          .catch(callback);
      });
    };

    next();
  };
};

module.exports = midesi;