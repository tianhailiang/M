/**
 * Created by Winson on 2017/11/30.
 */

var cache = require('memory-cache');

module.exports = function(nunjucks) {

  return function esincExtension(_env) {
    this.tags = ['esi'];

    this.parse = function(parser, nodes, lexer) {
      var tok = parser.nextToken();
      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);

      // return new nodes.CallExtensionAsync(this, 'run', args);
      return new nodes.CallExtension(this, 'run', args);
    };

    this.run = function(context, url) {
      var params = url.split('!!');
      var resstr = '<!-- esi-placeholder-error -->';
      // console.log('esi-tag-parser-:',url);
      if(params.length == 2) {
        var key = params[0];
        var value = cache.get(key) || [];
        resstr = '<!-- esi-placeholder-' + value.length + ' -->';
        value.push({'holder': resstr, 'url': params[1]});
        cache.put(key, value);
      }
      return new nunjucks.runtime.SafeString(resstr) ;
    };
  };
};
