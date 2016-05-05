module.exports = {
    test: function () {
        console.log("util.test")
    },
    is:function(a, b, c){
        return a ? b : c
    },
    flat(str, param){
        for(var key in param){
            str += key+"="+param[key]+"&"
        }
        return str.slice(0,-1);
    },
    pad: function (string, length, pad) {
        var len = length - String(string).length
        if (len < 0) {
            return string;
        }
        var arr = new Array(length - String(string).length || 0)
        arr.push(string);
        return arr.join(pad || '0');
    },
    getSID: function () {

        if (this.isLogin()) {
            var cookie = document.cookie;
            var sids = cookie.match(/sid=(\w+)/);
            if (sids && sids[1]) {
                return sids[1];
            }
        }

        return null;
    },

    getUID: function () {

        if (this.isLogin()) {
            var cookie = document.cookie;
            var sids = cookie.match(/[^u]uid=(\d+)/);
            if (sids && sids[1]) {
                return sids[1];
            }
        }

        return null;
    },
    getTID: function () {

        if (this.isLogin()) {
            var cookie = document.cookie;
            var sids = cookie.match(/tid=([\-\w]+)/);
            if (sids && sids[1]) {
                return sids[1];
            }
        }
        return null;
    },
    dateFormat: function (source, pattern) {
        // Jun.com.format(new Date(),"yyyy-MM-dd hh:mm:ss");
        //Jun.com.format(new Date(),"yyyy年MM月dd日 hh时:mm分:ss秒");
        if (!source) {
            return "";
        }

        source = new Date(source);
        var pad = this.pad,
            date = {
                yy: String(source.getFullYear()).slice(-2),
                yyyy: source.getFullYear(),
                M: source.getMonth() + 1,
                MM: pad(source.getMonth() + 1, 2, '0'),
                d: source.getDate(),
                dd: pad(source.getDate(), 2, '0'),
                h: source.getHours(),
                hh: pad(source.getHours(), 2, '0'),
                m: source.getMinutes(),
                mm: pad(source.getMinutes(), 2, '0'),
                s: source.getSeconds(),
                ss: pad(source.getSeconds(), 2, '0')
            };
        return (pattern || "yyyy-MM-dd hh:mm:ss").replace(/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s/g, function (v) {
            return date[v];
        });

    },
    //将金额*100的整数转换成 千分位金额 1,234.00
    moneyFormat: function (money) {
        if (!money || money == '0') {
            return '0.00'
        }

        var mStr = money.toString();
        var len = mStr.length;

        if (len <= 5) {
            return (money / 100).toFixed(2)
        }

        var decimal = mStr.slice(-2);
        var num = [];
        for (var i = -5; i > -len - 3; i = i - 3) {
            var part = [];
            part[0] = mStr.slice(i, i + 3);
            num = part.concat(num);
        }
        var round = num.join(",");
        return (round + '.' + decimal);
    },
    //获取标准时差
    getTimezoneOffset: function () {
        var now = new Date();
        return now.getTimezoneOffset() * 60 * 1000;
    },
    isLogin: function () {
        return /sid\=\w+/.test(document.cookie);
    },
    goLogin:function(){

        window.location.hash = "/login?redirecturl="+encodeURIComponent(window.location.hash.replace("#",""));
    },

    waitAlert: function (text, delay) {
        /**
         700 毫秒以上才弹出加载动画
         */
        var self = this;
        this.waitHide();
        timeout = setTimeout(function () {
            self.alertDialog({
                text: text,
                time: 120000,
                isWait: true
            });
        }, delay === undefined ? 700 : delay);
    },
    waitHide: function () {
        timeout && clearTimeout(timeout);
        if (alerts) {
            alerts.remove();
        }
    },
    alert: function (text, callback) {
        this.alertDialog({
            text: text,
            time: Math.max(String(text).length * 250, 2000)
        }, callback);
    },
    /**
     * text
     * param {
				text:"",
				time:"", //显示时间
				isWait:true //是否显示等待
			}
     */
    alertDialog: function (param, callback) {

        timeout && clearTimeout(timeout);

        var text = param.text;
        var time = param.time;
        var isWait = param.isWait;
        // console.log( param )
        if (alerts) {
            alerts.remove();
            alerts = null;
        }

        alerts = $('<div class="ui-alert"><div  class="text">' + (isWait ? '<div class="loading-icon"></div>' : '' ) + text + '</div></div>');

        alerts.appendTo(document.body);

        setTimeout(function () {
            callback && callback();
            alerts && (alerts.remove());
        }, time || text.length * 200);

        return alerts;
    },
    dialog: function (content, callback) {

        var tmpl = '<div class="ui-dialog show">' +
            '<div class="ui-dialog-cnt">' +
            '<div class="ui-dialog-bd">' +
            '<div style="text-align:center;">' + content + '</div>' +
            '</div>' +
            '<div class="ui-dialog-ft">' +
            '<button type="button" class="J_Btn" data-role="0">取消</button>' +
            '<button type="button" class="J_Btn" data-role="1">确定</button>' +
            '</div>' +
            '</div>' +
            '</div>';

        var dialog = $(tmpl);
        dialog.appendTo(document.body).find(".J_Btn").click(function () {
            var role = $(this).attr("data-role");
            dialog.remove();
            callback && callback(role == "1");
        });

    },
    getPlatform: function () {
        var ua = navigator.userAgent
        if (ua.indexOf("iPhone") != -1 || ua.indexOf("iPad") != -1) {
            return "ios";
        }

        if (ua.indexOf("Android") != -1) {
            return "android";
        }
        return null;
    },
    getDayOfWeek: function (dateStr) {
        var date = new Date(dateStr);
        var obj = {"date": date};
        var dayOfWeekList = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        obj.dayOfWeek = dayOfWeekList[date.getDay()];
        return obj;
    },
    toDate: function (dateStr) {
        // IE浏览器不支持Date("yyyy-MM-dd") , 如果在IE浏览器且传入参数为字符串,做特殊处理
        if (navigator.userAgent.indexOf("MSIE") > 0 && typeof(dateStr) == 'string'){
            var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
                date = new Date(NaN),
                month,
                parts = isoExp.exec(dateStr);

            if (parts) {
                month = +parts[2];
                date.setFullYear(parts[1], month - 1, parts[3]);
                if (month != date.getMonth() + 1) {
                    date.setTime(NaN);
                }
            }
            return date;
        } else {
            return new Date(dateStr);
        }
    },
    findKeyword() {
        var arr1 = location.href.split('?')[1];
        var keyword = ''
        if(!arr1) return keyword
        var arr2 = arr1.split('&');
        for(var i = 0;i < arr2.length;i++){
            if(arr2[i].indexOf('keyword') != -1){
                keyword = arr2[i].split('=')[1]
            }
        }
        return keyword;
    },
     intval(v){
        v = parseInt(v);
        return isNaN(v) ? 0 : v;
    },
 
    // 获取元素信息
    getPos(e){
        let l = 0;
        let t  = 0;
        let w = this.intval(e.style.width);
        let h = this.intval(e.style.height);
        let wb = e.offsetWidth;
        let hb = e.offsetHeight;
        while (e.offsetParent){
            l += e.offsetLeft + (e.currentStyle?this.intval(e.currentStyle.borderLeftWidth):0);
            t += e.offsetTop  + (e.currentStyle?this.intval(e.currentStyle.borderTopWidth):0);
            e = e.offsetParent;
        }
        l += e.offsetLeft + (e.currentStyle?this.intval(e.currentStyle.borderLeftWidth):0);
        t  += e.offsetTop  + (e.currentStyle?this.intval(e.currentStyle.borderTopWidth):0);
        return {x:l, y:t, w:w, h:h, wb:wb, hb:hb};
    },
 
    // 获取滚动条信息
    getScroll() {
        let t, l, w, h;
        
        if (document.documentElement && document.documentElement.scrollTop) {
            t = document.documentElement.scrollTop;
            l = document.documentElement.scrollLeft;
            w = document.documentElement.scrollWidth;
            h = document.documentElement.scrollHeight;
        } else if (document.body) {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight;
        }
        return { t: t, l: l, w: w, h: h };
    },
 
    // 锚点(Anchor)间平滑跳转
    scroller(el, duration){
        if(typeof el != 'object') { el = document.getElementById(el); }
        if(!el) return;
        let z = {};
        z.el = el;
        z.p = this.getPos(el);
        z.s = this.getScroll();
        z.clear = function(){window.clearInterval(z.timer);z.timer=null};
        z.t=(new Date).getTime();
    
        z.step = function(){
            let t = (new Date).getTime();
            let p = (t - z.t) / duration;
            if (t >= duration + z.t) {
                z.clear();
                window.setTimeout(function(){z.scroll(z.p.y, z.p.x)},13);
            } else {
                let st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t;
                let sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l;
                z.scroll(st, sl);
            }
        };
        z.scroll = function (t, l){window.scrollTo(l, t)};
        z.timer = window.setInterval(function(){z.step();},13);
    },
    jump(hash) {
        location.hash = hash
    }
    
    
}