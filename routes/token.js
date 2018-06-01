var crypto=require("crypto");
var token_str = "apitokenjjl.cn2018";
var token={
  createToken:function(code){
    //console.log("111   ", code);
    var c=String.fromCharCode(code.charCodeAt(0)+code.length);
    for(var i=1;i<code.length;i++){
      c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
    }
    //console.log("222   ", escape(c));
    return escape(c);
  },
  checkToken:function(code){
    //console.log("333   ", code);
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0)-code.length);
    for(var i=1;i<code.length;i++){
      c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
    }
    if(token_str == c){
      return true;
    }else{
      return false;
    }
  }
}
module.exports=exports=token;
