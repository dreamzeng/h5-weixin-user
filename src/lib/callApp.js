(function(window) {
 	window.lz ={
 		util:{
            browser:{
                isIfr:false,
                iframe:"plugIn_downloadAppPlugIn_loadIframe",
                navigator:navigator.userAgent,
                bind:function (dom, event, fun) {
                    if (dom.addEventListener) {
                        dom.addEventListener(event, fun, !1);
                    }else if (dom.attachEvent){
                        dom.attachEvent(event, fun);
                    }else{
                        throw new Error('不存在的方法');
                    }
                }
            },
            ios:function () {
                return this.browser.navigator.match(/iPhone|iPad|iPd/i) ? true : false;
            },
            iosVersion:function () {
                var iosVersion = this.browser.navigator.match(/OS\s*(\d+)/)
                iosVersion = iosVersion ? (iosVersion[1] || 0) : 0;
                return iosVersion;
            },
            iosSafari:function () {
                var ifIos = this.ios();
                return ifIos && this.browser.navigator.match(/Safari/);
            },
            android:function () {
                return (this.browser.navigator.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
            },
            androidVersion:function () {
                var androidVersion = this.browser.navigator.match(/Android\s*(\d+)/);
                androidVersion = androidVersion ? (androidVersion[1] || 0) : 0;
                return androidVersion;
            },
            ipad:function () {
                return (this.browser.navigator.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
            },
            ipadIos:function () {
                var ifiPad = this.ipad();
                return (!ifiPad && this.browser.navigator.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
            },
            weixin:function () {
                return this.browser.navigator.indexOf("MicroMessenger") >= 0;
            },
            formatUrl:function (url, params) {
                var arr = [];
                for (var p in params) {
                    if (p && params[p]) {
                        arr.push(p + '=' + encodeURIComponent(params[p]));
                    }
                }
                arr = arr.join('&');
                var u = url.split("?");
                var newUrl = null;
                if (u.length == 2) {
                    newUrl = u[0] + "?" + u[1] + "&" + arr;
                } else {
                    newUrl = u[0] + "?" + arr;
                }
                return newUrl;
            },
            openApp:function (option,isAutoLaunchApp) {
                var openLink = null,
                    downloadUrl = null;
                if (this.ios()){
                    openLink = option.iosLink || null;
                    // 开启应用宝跳转
                    downloadUrl = (option.iosYyb || false) ? (option.yybDownloadUrl || null) : (option.iosDownloadUrl || null);
                }else if (this.android()){
                    openLink = option.androidLink || null;
                    // 开启应用宝跳转
                    downloadUrl = (option.androidYyb || false) ? (option.yybDownloadUrl || null) : (option.androidDownloadUrl || null);
                }
                var params = option.params || [];
                openLink = this.formatUrl(openLink,params); //格式化url 加参数
                // android5 及以上的高版本
                if (this.android() && this.androidVersion() >= 5) {
                    // 延后50毫秒
                    setTimeout(function() {
                        // 如果为自动跳转直接用应用宝链接
                        if (isAutoLaunchApp) {
                            openLink = (option.yybDownloadUrl || null);
                        }
                        location.href = openLink;
                    }, 50);
                }
                // 设备是ios9 及以上的版本
                if (this.ios() && this.iosVersion() >= 9){
                    // 如果是自动跳转或者未开启Universal Link 用之前的链接 否则用 Universal Link
                    var iosUniversalLinkEnabled = (option.iosUniversalLinkEnabled || false) ? false : true;
                    openLink = isAutoLaunchApp || iosUniversalLinkEnabled ? openLink : (option.ios9Link || null);
                    document.location.href = openLink;
                    if (isAutoLaunchApp) return;
                }
                var checkOpen = function (cb){
                    var _clickTime = +(new Date());
                    function check(elsTime) {
                        if ( elsTime > 1500 || document.hidden || document.webkitHidden) {
                            cb(1);
                        } else {
                            cb(0);
                        }
                    }
                    //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
                    var _count = 0, intHandle;
                    intHandle = setInterval(function(){
                        _count++;
                        var elsTime = +(new Date()) - _clickTime;
                        if (_count>=50 || elsTime > 1500 ) {
                            clearInterval(intHandle);
                            check(elsTime);
                        }
                    }, 20);
                };
                var that=this;
                checkOpen(function(opened){
                    // APP没有打开成功  并且开启自动跳转到下载页
                    if(opened === 0 && option.autoRedirectToDownloadUrl&&that.android()){
                        location.href = downloadUrl;
                    }
                });
            },
            link:function (option) {
                var that = lz.util;
                function init(option) {
                    if (option.button){
                        option.button.setAttribute('href','javascript:void(0)');
                        that.browser.bind(option.button, 'click', function () {
                            if (!that.browser.isIfr){
                                var ifr = document.createElement("iframe");
                                ifr.id = that.browser.iframe;
                                document.body.appendChild(ifr);
                                document.getElementById(that.browser.iframe).style.display = "none";
                                document.getElementById(that.browser.iframe).style.width = "0px";
                                document.getElementById(that.browser.iframe).style.height = "0px";
                                that.browser.isIfr = true;
                            }
                            // 打开APP
                            that.openApp(option,false);
                        })
                    }
                    // 如果开启自动打开
                    if (option.autoLaunchApp){
                        // 打开APP
                        that.openApp(option,true);
                    }
                }
                init(option);
            }
        }
 }
})(window);