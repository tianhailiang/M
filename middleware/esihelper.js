/**
 * Created by Winson on 2017/12/5.
 */
var _globle_esi_id_ = 0;

var chars = ['0','1','2','3','4','5','6','7','8','9',
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function genrandom(n) {
  var res = "";
  for(var i = 0; i < n ; i ++) {
    var id = Math.ceil(Math.random()*35);
    res += chars[id];
  }
  return res;
}
function esikey() {
  var tmstamp = new Date().valueOf() ;
  ++ _globle_esi_id_ ;
  var key = 'ESK-' + _globle_esi_id_ + genrandom(13) + '-' + tmstamp + '!';
  return key;
}

module.exports = {
  esikey: esikey
};