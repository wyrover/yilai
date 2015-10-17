//去除换行
function ClearBr(key) {
  key = key.replace(/<\/?.+?>/g,'');
  key = key.replace(/[\r\n]/g, '');
  key = key.replace(/[\n]/g, '');
  return key;
}

function decodeBase64(strIn) {
  strIn = ClearBr(strIn);
  if (!strIn.length || strIn.length % 4)
    return null;
  if (!strIn.length)
    return null;
  var str64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var index64 = [];
  for (var i = 0; i < str64.length; i++)
    index64[str64.charAt(i)] = i;
  var c0, c1, c2, c3, b0, b1, b2;
  var len = strIn.length;
  var len1 = len;
  if (strIn.charAt(len - 1) == '=')
    len1 -= 4;
  var result = [];
  for (var i = 0, j = 0; i < len1; i += 4) {
    c0 = index64[strIn.charAt(i)];
    c1 = index64[strIn.charAt(i + 1)];
    c2 = index64[strIn.charAt(i + 2)];
    c3 = index64[strIn.charAt(i + 3)];
    b0 = (c0 << 2) | (c1 >> 4);
    b1 = (c1 << 4) | (c2 >> 2);
    b2 = (c2 << 6) | c3;
    result.push(b0 & 0xff);
    result.push(b1 & 0xff);
    result.push(b2 & 0xff);
  }
  if (len1 != len) {
    c0 = index64[strIn.charAt(i)];
    c1 = index64[strIn.charAt(i + 1)];
    c2 = strIn.charAt(i + 2);
    b0 = (c0 << 2) | (c1 >> 4);
    result.push(b0 & 0xff);
    if (c2 != '=') {
      c2 = index64[c2];
      b1 = (c1 << 4) | (c2 >> 2);
      result.push(b1 & 0xff);
    }
  }
  return result;
}

/**
 *
 * Base64 encode / decode http://www.webtoolkit.info/
 *
 */
var Base64 = {

  // private property
  _keyStr : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  // public method for encoding
  encode : function(input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output + this._keyStr.charAt(enc1)
          + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3)
          + this._keyStr.charAt(enc4);

    }

    return output;
  },

  // public method for decoding
  decode : function(input) {
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    while (i < input.length) {

      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

    }

    output = Base64._utf8_decode(output);

    return output;

  },

  // private method for UTF-8 encoding
  _utf8_encode : function(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }

    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode : function(utftext) {
    var string = '';
    var i = 0;
    var c = c1 = c2 = 0;

    while (i < utftext.length) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12)
            | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }

    }

    return string;
  }

}