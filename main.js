import StartGame from './init/InitGame';
import XHR from './utils/XHR';

window.onload = () => {
    if (StartGame.development) {
        new StartGame();
    } else {
        let xhrHttp = new XHR();
        let xhrPro = xhrHttp.request(StartGame.api + '/yzdtp/score/canplay');
        xhrPro.then((serverData) => {
            if (StartGame.development) {
                StartGame.canPlay = !0;
            } else {
                serverData.loginStatus == 0 && (window.location.href = 'http://www.me2u.com.cn/yzdtp/score/login?activeid=2');
                serverData.registStatus == 0 && (window.location.href = 'http://www.me2u.com.cn/yzdtp/score/login?activeid=2');
                StartGame.key = serverData.key.length == 0 ? [] : serverData.key;
                StartGame.canPlay = serverData.playStatus === '1';
            }
            if (serverData.playStatus === '2') {
                alert('检测到作弊行为，请进行公平游戏！');
            } else {
                new StartGame();
                shareWx();
            }
        });

        function unlocked () {
            let xhrHttp = new XHR();
            xhrHttp.request(StartGame.api + '/yzdtp/score/shareTimeline');
            StartGame.canPlay = !0;
        }

        function shareWx () {
            var req = createXMLHTTPRequest();
            var url= location.href.split('#')[0];
            if(req){
                req.open("GET", "http://www.me2u.com.cn/weixinApi/weixinUtil/getJssdk?appid=wxb808b6da79707b18&url="+url, true);
                req.onreadystatechange = function(){
                    if(req.readyState == 4){
                        if(req.status == 200){
                            var data=req.responseText;
                            data=JSON.parse(data);
                            wx.config({
                                debug: false,
                                appId: data.appId,
                                timestamp: data.timestamp,
                                nonceStr: data.nonceStr,
                                signature: data.signature,
                                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','hideMenuItems']
                            });
                            wx.ready(function(){
                                wx.hideMenuItems({
                                    menuList: ['menuItem:copyUrl',
                                        'menuItem:share:qq',
                                        'menuItem:share:weiboApp',
                                        'menuItem:share:facebook',
                                        'menuItem:share:QZone',
                                        'menuItem:originPage',
                                        'menuItem:openWithQQBrowser',
                                        'menuItem:openWithSafari',
                                        'menuItem:share:email'
                                    ]
                                });
                                wx.error(function(res){
                                    console.log("验证失败"+res);
                                });
                                wx.onMenuShareTimeline({
                                    title: '挑战你的记忆力，赢精美月饼！',
                                    link: 'http://www.me2u.com.cn/yzdtp/score/login?activeid=2',
                                    imgUrl: "http://www.me2u.com.cn/yzdtp//resources/active/fenxiang.jpg",
                                    success: function () {
                                        alert('分享成功！');
                                        unlocked();
                                    },
                                    cancel: function () {
                                    }
                                });

                                wx.onMenuShareAppMessage({
                                    title: '挑战你的记忆力，赢精美月饼！', // 分享标题
                                    desc: '记忆大师', // 分享描述
                                    link: 'http://www.me2u.com.cn/yzdtp/score/login?activeid=2',
                                    imgUrl: "http://www.me2u.com.cn/yzdtp//resources/active/fenxiang.jpg", // 分享图标
                                    type: '', // 分享类型,music、video或link，不填默认为link
                                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                    success: function () {
                                    },
                                    cancel: function () {
                                        // 用户取消分享后执行的回调函数
                                    }
                                });
                            });

                        }
                    }
                }
                req.send(null);
            }

            function createXMLHTTPRequest() {
                //1.创建XMLHttpRequest对象
                //这是XMLHttpReuquest对象无部使用中最复杂的一步
                //需要针对IE和其他类型的浏览器建立这个对象的不同方式写不同的代码
                var xmlHttpRequest;
                if (window.XMLHttpRequest) {
                    //针对FireFox，Mozillar，Opera，Safari，IE7，IE8
                    xmlHttpRequest = new XMLHttpRequest();
                    //针对某些特定版本的mozillar浏览器的BUG进行修正
                    if (xmlHttpRequest.overrideMimeType) {
                        xmlHttpRequest.overrideMimeType("text/xml");
                    }
                } else if (window.ActiveXObject) {
                    //针对IE6，IE5.5，IE5
                    //两个可以用于创建XMLHTTPRequest对象的控件名称，保存在一个js的数组中
                    //排在前面的版本较新
                    var activexName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
                    for ( var i = 0; i < activexName.length; i++) {
                        try {
                            //取出一个控件名进行创建，如果创建成功就终止循环
                            //如果创建失败，回抛出异常，然后可以继续循环，继续尝试创建
                            xmlHttpRequest = new ActiveXObject(activexName[i]);
                            if(xmlHttpRequest){
                                break;
                            }
                        } catch (e) {
                        }
                    }
                }
                return xmlHttpRequest;
            }
        }
    }
}