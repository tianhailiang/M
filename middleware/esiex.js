/**
 * Created by Winson on 2017/12/4.
 */
'use strict';

var cache = require('memory-cache');
var requestp = require('request-promise');

function esiex(config) {

  //esikey for esi-unique
  var config = config || {host:'127.0.0.1',port:'3000'};

  function esitask(option) {
    option.uri = config.fragserver + ':' + config.port + option.uri;
    return requestp(option)
  }

  function check_enable(data) {
    //not enabled
    if (data == null || data.esikey == null || data.esikey == undefined) {
      return false;
    }
    let key = data.esikey.split('!')[0];
    if(key == '' || key == null || key == undefined) {
      return false;
    }

    let esinfo = cache.get(key) || [];
    if(esinfo.length <= 0){
      //no esi tag found
      cache.del(key);
      // console.log('esi open,bug not esi tag found ~');
      return false;
    }
    return true;
  }

  function process(data, html) {
    let key = data.esikey.split('!')[0];
    let esinfo = cache.get(key) || [];
    cache.del(key);
    var taskinfos = [];
    var option ;
    let i = 0;

    esinfo.forEach(item => {
      option = {
        method: 'GET',
        uri : item.url
      };

      taskinfos[i++] = esitask(option)
        .then(result =>
          html = html.replace(item.holder, result))
        .catch(error=>error);
    });
    return Promise.all(taskinfos)
        .then(() => {
        return html;
      })
  }

  return {process, check_enable}
}
module.exports = esiex;