// var basicUrl = window.location.protocol + '//' + window.location.host;
haoMain=new Vue({
    el:".footer",
    data:{
        footdata:[
            {
                text:'首页',
                icon:'icon-home_icon',
                url:'index.html'
            },
            {
                text:'分类',
                icon:'icon-page_icon',
                url:'category.html'
            },
            {
                text:'扫码',
                icon:'icon-saoma',
                url:''
            },
            {
                text:'商家',
                icon:'icon-weibiaoti-',
                url:''
            },
            {
                text:'我的',
                icon:'icon-personal',
                url:'my.html'
            }
        ]
    },
    methods:{
        navJump: function (item, key) {
            if(item.text=='扫码'){
                console.log(111);
            }else{
                location.href=item.url
            }
        }
    }

})

var basicUrl= 'http://192.168.1.24:1807';

function getqueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
/**
 * 统计文本多占字节数
 * @param text
 * @returns {number}
 */
function textLength(text) {
    var intLength = 0
    for (var i = 0; i < text.length; i++) {
        if ((text.charCodeAt(i) < 0) || (text.charCodeAt(i) > 255))
            intLength = intLength + 2
        else
            intLength = intLength + 1
    }
    return intLength
}

/**
 * 表格加载数据报错处理
 * @param e
 */
function onerror(e) {
    if (e.errno == 1000 || e.errmsg == '非法操作或会话过期') {
        window.top.location.href = basicUrl + "/admin/login.html?errno=10000";
    } else {
        var errmsg = e.errmsg;
        if (errmsg.errorThrown) {
            errmsg = errmsg.errorThrown;
        }
        err(errmsg)
    }
}

/**
 * 深度克隆对象
 * @param obj
 * @returns {*}
 */
function clone(obj) {
    var o, obj;
    if (obj.constructor == Object) {
        o = new obj.constructor();
    } else {
        o = new obj.constructor(obj.valueOf());
    }
    for (var key in obj) {
        if (o[key] != obj[key]) {
            if (typeof(obj[key]) == 'object') {
                o[key] = clone(obj[key]);
            } else {
                o[key] = obj[key];
            }
        }
    }
    o.toString = obj.toString;
    o.valueOf = obj.valueOf;
    return o;
}

/**
 * 判断一个变量是否为数组
 * @param obj
 * @returns {boolean}
 */
function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
}

/**
 * 判断一个变量是否为object对象
 * @param obj
 * @returns {boolean}
 */
function isObj(obj) {
    return (typeof obj == 'object');
}

/**
 * 默认post工具类
 * @param url
 * @param data
 * @param callback
 */

function post(url, data, callback) {
    var result;
    $.ajax({
        url: basicUrl + url,
        dataType: 'jsonp',
        jsonp: "callback",
        data: data,
        type: 'POST',
        success: function (data) {
            if(callback) {
                callback(data);
                result = data;
            }
        }
    });
    return result;
}


/**
 * 把微信时间戳转换成YYYY-MM-DD HH:mm:ss格式
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
