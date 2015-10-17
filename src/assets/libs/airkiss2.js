// 测试服务器
// var tokenId = "90a82c842a14494fa06e3c732a59b4fb";
// var pid = "e91d9e34215e4b15b7eec9a0a7835558";

// 一些全局变量
var nonceStr = "Wm3WZYTPz0wzccnW";
var timestamp = "1414587457";

// WX与xlink交互必须的tokenid，由XLINK提供，和WX账号相关
var tokenId = "6cc6e51fecda45dea7486f6a184ffddf";   // 云智易
var wxAppId = "wxafb00026fca3cc60";

// API交互路径
var api_root = "http://wx3.xlink.cn/";

// WX js交互签名
var signature;
// WX openid
var openid;

// XLINK 专属属性
// APPID
var appid;
// Device列表
var devices;

// 页面加载时自动运行的函数
$(function () {
    /*
    appid = parseInt((Math.random() * 10000000) + 70000000);
    write('XLINK appid : ' + appid);
    wxAppId = GetQueryString('state');
    write('wxAppId in url param : ' + wxAppId);
    var t = GetQueryString('tokenId');
    write('tokenId in url param : ' + t);
    if (t != null) {
        tokenId = t;
    }
    */
    getSignature();
});

/**
 * 获取JS代码签名
 */
function getSignature() {

    write('getSignature tokenId : ' + tokenId);

    var api_url = api_root + "wxgateway/urlSignature";
    var sign_url = window.location.href;

    var params = ({
        "nonceStr": nonceStr,
        "tokenId": tokenId,
        "timestamp": timestamp,
        "url": sign_url
    });

    $.ajax({
        type: 'get',
        url: api_url,
        data: params,
        async: false,
        dataType: 'jsonp', // 因为跨域了，必须指定这个
        jsonp: "signatureCallback", // 这个也是跨域必须指定的，不要改，和服务器统一
        jsonpCallback: "callbackFunc", // 这个也是为了跨域，不要改
        success: function (data) {
            if (data.status == 200) {
                signature = data.signature;
                write('signature : ' + signature);
                configXW();
            } else {
                write("获取签名失败！" + data.status);
            }
        },
        error: function () {
            write("获取签名失败！");
        }
    });
}
;


/**
 * 初始化WX需要使用的JS接口
 */
function configXW() {

    write("调用wx.config...");
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxAppId, // 必填，公众号的唯一标识
        timestamp: 1414587457, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: ['scanQRCode', 'configWXDeviceWiFi']
    });

    wx.ready(function () {
        write('wx.ready ! ');
        // startAirkiss();
    });

    wx.error(function (res) {
        write('wx.error : ' + JSON.stringify(res));
    });

}

/**
 * 调用Airkiss界面
 */
function startAirkiss() {

    WeixinJSBridge.invoke('configWXDeviceWiFi', {}, function (res) {
        write(JSON.stringify(res));
    });
}

/**
 * 获取页面参数
 * @param name
 * @returns {null}
 * @constructor
 */
function GetQueryString(name) {
    // write(window.location.search);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 写日志
var writeAlert = false;
function write(msg) {
    var date = new Date();
    var log = date.getHours() + ":" + date.getMinutes() + ":"
        + date.getSeconds() + ": " + msg;
    console.log('', log);
    if (writeAlert) {
        alert(log);
    }
    // alert(msg);
    // var div = document.getElementById('console'), divDom = document
    // .createElement('p');
    // divDom.innerHTML = msg;
    // div.appendChild(divDom);
}