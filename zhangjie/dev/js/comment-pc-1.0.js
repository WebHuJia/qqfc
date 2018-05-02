(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global.Comment = factory(global.$));
}(this, (function ($) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

var version = "1.0.1";

/**
 * @file 评论相关接口
 * @author hardylin <hardylin@tencent.com>
 */

var host = '//app.ingame.qq.com/php/ingame/comment/';

var API = {
    USER_INFO: host + 'user_info.php', // 获取用户信息
    COMMENT_LIST: host + 'comment_list.php', // 评论列表
    SUBMIT_COMMENT: host + 'submit_comment.php', // 提交评论
    DELETE_COMMENT: host + 'del_comment.php', // 删除评论
    LIKE: host + 'digg.php', // 评论点赞
    REPORT: host + 'report.php', // 举报评论
    REPLY_LIST: host + 'reply_list.php', // 回复列表
    SUBMIT_REPLY: host + 'submit_reply.php', // 提交回复
    DELETE_REPLY: host + 'del_reply.php' // 删除回复
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @file 评论入口文件
 * @author hardylin <hardylin@tencent.com>
 */

var _window = window;
var milo = _window.milo;
var need = _window.need;


var isLogin = false;
function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if (c >= 0x0001 && c <= 0x007e || 0xff60 <= c && c <= 0xff9f) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}
var modal = {
    defaults: "",
    cachArr: ["user_info"],
    dateFormat: function dateFormat(time) {
        time = time * 1000;
        var date = new Date(time);
        var min = date.getMinutes();
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (min > 9 ? min : "0" + min);
    },
    getData: function getData(key, callback, urlArgs) {
        var self = this;

        if (typeof callback != "function") {
            return;
        }
        $.ajax({
            url: API[key] + modal.defaults + (urlArgs ? urlArgs : ""),
            dataType: 'jsonp',
            success: function success(result) {
                self.loading = false;
                if (result.status == "SUCCESS") {
                    callback(result.data);
                } else if (result.status == "TIPS") {
                    tips(result.msg);
                    return;
                } else {
                    $(".tip-com-loading").css("display", "none");
                    if (result.data.code == 3000) {
                        tips("您的账号存在违规操作，暂时无法使用评论功能！");
                        return;
                    }
                    if (result.data.code == "NOT_LOGIN") {
                        $(".np-frame").hide();
                        return;
                    }
                    tips(result.msg);
                }
            },
            error: function error(err) {
                self.loading = false;
            }
        });
    }
};

var isTipsShow = false;
var tips = function tips(txt, hasBtn) {
    if (isTipsShow) {
        return;
    }
    var $handle = $("#pop2");
    if ($handle.length == 0) {
        $handle = $("<div id='pop2' style='background: #303131;border-radius: 5px;color: #DDDDDD;font-size: 15px;position: fixed; z-index: 999; transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);top: 50%;left: 50%;padding: 10px 20px;text-align:center;'></div>");
        $handle.appendTo($("body"));
    }
    if (hasBtn) {
        $handle.find(".pop_btn").show();
    } else {
        $handle.find(".pop_btn").hide();
    }
    $handle.html(txt);
    $handle.show("fast");
    isTipsShow = true;
    setTimeout(function () {
        $handle.animate({ "opacity": 0 }, "slow", function () {
            $handle.hide().css("opacity", 1);
            isTipsShow = false;
        });
    }, 2000);
};
function magicTime(str) {
    var now = new Date().getTime();
    var length = parseInt(now / 1000) - parseInt(str),
        result;
    if (length < 60) {
        result = "刚刚";
    } else if (length < 3600) {
        result = parseInt(length / 60) + "分钟前";
    } else if (length < 18000) {
        result = parseInt(length / 3600) + "小时前";
    } else if (length < 86400) {
        if (new Date(now).getDate() == new Date(parseInt(str) * 1000).getDate()) {
            result = "今天";
        } else {
            result = "昨天";
        }
    } else if (length < 172800) {
        result = "昨天";
    } else {
        result = modal.dateFormat(parseInt(str));
    }
    return result;
}
function replaceCharset(value) {
    return decodeURIComponent(value.replace(/／/g, "/").replace(/％/g, "%").replace(/＆/g, "&").replace(/＝/g, "="));
}

var Comment = function Comment(obj) {
    this.defaults = {
        el: "", //需要绑定的选择器
        options: {
            title: encodeURIComponent(document.title),
            "stime": "", //资源创建时间，年月即可
            "objid": "", //资源id，唯一标识
            "gameid": "", //游戏id，后台指定
            "busikey": "all_mobile", //业务id，feed代表评论
            "action": "init", //init：评论页的展示模式，list：全部评论展示页，linkmore无效
            channel: 4,
            num: 8, //每页加载评论的数量
            sandbox: 1
        },
        login: {
            wxappid: '', //微信对应的appid，必填
            qqappid: '' //手q对应的appid，必填
        },
        listTemplate: '<div class="common_userinfo comments_list clearfix">\
                <img src="{{imgurl}}" alt="" class="comuser_head">\
                <div class="common_maintxt">\
                    <div class="common_maintop">\
                        <div class="user_mhead">\
                              <span class="name">{{name}}</span><span class="ctime">{{ctime}}</span>\
                            {{report_status}}\
                          </div>\
                          <div class="user_word user_word_down"><p>{{content}}</p> <span class="btn_word_more" style="display:none;"></span></div>\
                          <div class="tip">\
                            <div class="left">\
                               {{oper_status}}\
                            </div>\
                            <div class="left">\
                                <span class="reback_alert"><a href="javascript:void(0)" class="c_com c_sp" onclick="PTTSendClick(\'btn\',\'a_hf1\',\'回复\');"></a>&nbsp;回复&nbsp;&nbsp;</span>\
                            </div>\
                            <div class="left" style="display:{{openidShow}};">\
                                <span class="l_del_span">\
                                    <a href="javascript:;" class="l_btn_del delete-comment" onclick="PTTSendClick(\'btn\',\'a_del1\',\'删除\');">删除</a>\
                                </span>\
                            </div>\
                            <div class="clearfix"></div>\
                        </div>\
                    </div>\
                    <div class="comon_usersender">\
                        <div class="replys-wrap">{{replys}}</div>\
                        <div class="clearfix"></div>\
                        <a href="javascript:;" style="display:{{rnum}};" class="S_loadbtn clearfix"> <img src="//ossweb-img.qq.com/images/js/bsCommonFiles/images/comment/s_loadmore.png" width="33" height="27" alt="加载更多"></a>\
                    </div>\
                </div>\
            </div>',
        replyTemplate: '<div class="common_userinfo replys_list no_border">\
            <img src="{{repimgurl}}" alt="" class="comuser_head">\
            <div class="common_maintxt">\
                <div class="user_mhead">\
                  <div class="cleft"><span class="fname">{{repname}}</span>{{replyTo}}</div><span class="ctime">{{rtime}}</span>\
                  <!--<a href="javascript:void(0)" class="report" onclick="PTTSendClick(\'btn\',\'jb2\',\'举报\');"><i class="jubao"></i>举报</a>-->\
                </div>\
                <div class="user_word"><p>{{content}}</p> <span class="btn_word_more"></span></div>\
                <div class="tip">\
                    <div class="left">\
                        <span class="reback_alert"><a href="javascript:void(0)" style="margin-left:0;" class="c_com c_sp" onclick="PTTSendClick(\'btn\',\'ab_hf1\',\'回复1\');"></a>&nbsp;回复&nbsp;&nbsp;</span>\
                    </div>\
                    <div class="left" style="display:{{openidShow}};">\
                        <span class="l_del_span">\
                            <a href="javascript:;" class="l_btn_del delete-reply" onclick="PTTSendClick(\'btn\',\'ab_del1\',\'删除1\');">删除</a>\
                        </span>\
                    </div>\
                    <div class="clearfix"></div>\
                </div>\
            </div>\
         </div>',
        maxLength: 200,
        updated: function updated() {
            // 组件更新回调
        }
    };

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == "object") {
        if (obj.options.title) {
            obj.options.title = typeof obj.options.title == 'string' ? encodeURIComponent(obj.options.title) : '';
        }
        obj.options.objid = obj.options.objid + '_' + obj.options.moduleId;
        delete obj.options.moduleId;
        $.extend(true, this.defaults, obj);
    }

    modal.defaults = '?' + $.param(this.defaults.options);

    this.hotComments = [];
    this.comments = [];
    this.pageInfo = {
        loading: false,
        num: 8,
        start: 0,
        pageEnd: false
    };
    this.userInfo = {
        acctype: "",
        nickname: "",
        avatar: "//game.gtimg.cn/images/yxzj/web201605/main/avatar1.jpg",
        login_type: "",
        openid: "",
        uin: "",
        skey: "",
        access_token: ""
    };
    this.pageInfo.num = this.defaults.options.num;

    /*表情划窗*/
    /*loadScript("//ossweb-img.qq.com/images/js/motion/slide.v2.0.min.js",function(){
     new mo.Slide({
     target: $('.pop_emotion_slider ul'),
     direction : "x",
     controller: true
     });
       });*/
    $("head").prepend($('<link rel="stylesheet" href="//ossweb-img.qq.com/images/js/bsCommonFiles/css/comment_pc.css" />'));
    this._init();
};
Comment.prototype = {
    _init: function _init() {
        this._render();
        this.checkLogin();
    },
    destroy: function destroy() {
        this.$loginPannel.remove();
        this.$list.remove();
        this.$reportPannel.remove();
        this.$loginPannel.remove();
    },
    _render: function _render() {
        var _this = this;
        this.$loginPannel = $('<div class="mod-alert" style="display:none;">\
             <div class="bg"></div>\
            <div class="alert is-type2" style="display:block;">\
                <div class="title-bar">请选择所要用的登录账号</div>\
                <div class="content">\
                    <div class="login">\
                        <a href="javascript:;" class="qq">手Q登录</a>\
                        <a href="javascript:;" class="wx">微信登录</a>\
                    </div>\
                </div>\
            </div>\
        </div>');
        this.$list = $('<div class="comment">\
            <div class="coment_A">\
                <p class="common_title"><b>玩家评论</b><span class="xieyi_txt">文明上网理性发言，请遵守粉丝站评论服务协议</span><span class="common_txt"><span></span>条评论</span></p>\
                <div class="comment_box coment_box_a clearfix">\
                    <div contenteditable="true" class="comment_input" ></div>\
                    <div class="comment_edit">\
                        <span class="login_status" style="display: none;">\
                            <span class="l_tx_name"></span>\
                            <a href="javascript:void(0)" class="icon loginout" onclick="PTTSendClick(\'btn\',\'zhanghao1\',\'注销\');">注销</a>\
                            <a href="javascript:void(0)" class="icon emjoy_a" onclick="PTTSendClick(\'btn\',\'face1\',\'表情\');"> <i class="emjoy face_sp"></i>表情</a>\
                        </span>\
                        <a href="javascript:void(0)" class="com_login_btn login_btn_ft" onclick="PTTSendClick(\'btn\',\'loginbtn\',\'登录\');" style="display: inline;">登录</a>\
                        <a href="javascript:void(0)" class="com_login_btn submit_ft" onclick="PTTSendClick(\'btn\',\'pinglun\',\'评论\');" style="display: none;">发表评论</a>\
                    </div>\
                </div>\
            </div>\
            <h2 class="common_head">最热评论</h2>\
            <div class="comon_allwrap_hot clearfix"></div>\
            <h2 class="common_head">全部评论</h2>\
            <div class="comon_allwrap clearfix"></div>\
            <p class="js-empty" style="display:none; padding: 50px 0; font-size: 15px; text-align: center; color: #78788d;">还没有人评论，还不快抢沙发！~</p>\
            <a href="javascript:;" class="F_loadbtn clearfix" style="display:none;">加载更多</a>\
        </div>');
        this.$replayPannel = $('<div class="comment_box coment_box_com clearfix">\
                <div contenteditable="true" class="comment_input" ></div>\
                <div class="comment_edit">\
                  <span class="login_status">\
                      <a href="javascript:;" class="icon emjoy_a" onClick="PTTSendClick(\'btn\',\'face2\',\'表情\');"> <i class="emjoy face_sp"></i>表情</a>\
                  </span>\
                  <a href="javascript:;" class="com_login_btn reply_btn" onClick="PTTSendClick(\'btn\',\'pinglun3\',\'评论3\');">回复</a>\
                </div>\
            </div>');
        this.$reportPannel = $('<div class="report_alertbox">\
            <div class="re_title">举报<a href="javascript:;" class="close_box"></a></div>\
            <div class="re_content">\
                <div class="qtitle"><i class="qicon">?</i>您为什么要举报此信息？</div>\
                    <div class="radio_group">\
                        <label><input name="rep" type="radio" value="反动">反动 </label>\
                        <label><input name="rep" type="radio" value="欺诈">欺诈 </label>\
                        <label><input name="rep" type="radio" value="广告">广告 </label>\
                        <label><input name="rep" type="radio" value="恶意营销">恶意营销 </label>\
                        <label><input name="rep" type="radio" value="色情低俗">色情低俗 </label>\
                        <label><input name="rep" type="radio" value="谣言">谣言 </label>\
                        <label><input name="rep" type="radio" value="其它">其它 </label>\
                    </div>\
                </div>\
                <div class="btn_border"><a href="javascript:;" class="r_cancel" onclick="PTTSendClick(\'btn\',\'cancel\',\'取消\');">取消</a><a href="javascript:;" class="r_submit" onclick="PTTSendClick(\'btn\',\'tijiao\',\'提交\');">提交</a></div>\
            </div>');

        this.$loginPannel.on("click", "a", function (e) {
            _this.login(this.className);
        });
        this.$loginPannel.find(".bg").on("click", function (e) {
            _this.$loginPannel.hide();
        });
        this.$reportPannel.on("click", "a", function (e) {
            var $target = $(e.target);
            if ($target.hasClass("close_box") || $target.hasClass("r_cancel")) {
                //关闭弹窗
                _this.$reportPannel.hide();
            }
            if ($target.hasClass("r_submit")) {
                //举报
                _this._report();
            }
        });
        this.$replayPannel.on("click", "a", function (e) {
            var $parent = $(e.target).closest(".common_userinfo");
            if ($(e.target).hasClass("reply_btn")) {
                //发表回复
                _this._submitReply($parent.index(), $(e.target));
            }
        });
        this.$list.find(".comment_input").on("blur", function () {
            var range = window.getSelection().getRangeAt(0);
            if (range.commonAncestorContainer.className == "comment_input") {
                _this.mousePosition = range;
            }
        });
        this.$replayPannel.find(".comment_input").on("blur", function () {
            var range = window.getSelection().getRangeAt(0);
            if (range.commonAncestorContainer.className == "comment_input") {
                _this.mousePosition = range;
            }
        });
        this.$list.on("click", function (e) {
            var index = $(e.target).closest(".comments_list").index(),
                isHotComment = $(e.target).closest(".comon_allwrap_hot").length > 0;
            if ($(e.target).hasClass("zan") || $(e.target).parent().hasClass("zan")) {
                //点赞
                _this._vote(index, isHotComment);
            }
            if ($(e.target).hasClass("reback_alert") || $(e.target).parent().hasClass("reback_alert")) {
                //打开回复框
                _this._openReply(index, $(e.target));
            }
            if ($(e.target).hasClass("delete-comment")) {
                //删除自己的评论
                _this._deleteComment(index, isHotComment);
            }
            if ($(e.target).hasClass("delete-reply")) {
                //删除自己的回复
                _this._deleteReply(index, $(e.target).closest(".common_userinfo").index(), isHotComment);
            }
            if ($(e.target).hasClass("submit_ft")) {
                //提交评论
                _this._submitCommnet();
            }
            if ($(e.target).hasClass("loginout")) {
                //注销
                _this.loginout();
            }
            if ($(e.target).hasClass("emjoy_a") || $(e.target).parent().hasClass("emjoy_a")) {
                //打开表情框
                _this._openEmoj($(e.target));
            }
            if ($(e.target).hasClass("login_btn_ft")) {
                //打开登录框
                _this.opendLoginPannel();
            }
            if ($(e.target).hasClass("F_loadbtn")) {
                //点击加载更多评论
                _this.loadMore();
            }
            if ($(e.target).hasClass("f_report") && e.target.tagName.toLowerCase() == "a" || $(e.target).parent().hasClass("f_report") && $(e.target).parent()[0].tagName.toLowerCase() == "a") {
                //打开举报弹窗
                _this._openReport(index, isHotComment);
            }
            if ($(e.target).hasClass("S_loadbtn") || $(e.target).parent().hasClass("S_loadbtn")) {
                //加载更多回复
                _this._moreReply(index, isHotComment);
            }
        });

        $("body").click(function (e) {
            var $target = $(e.target);
            if ($target.parents(".area_biaoq").length == 0 && !$target.hasClass("emjoy_a") && !$target.parent().hasClass("emjoy_a")) {
                _this.$emojPannel && _this.$emojPannel.hide();
            }
        });

        $(this.defaults.el).append(this.$list);
        $("body").append(this.$loginPannel).append(this.$reportPannel);
    },
    _renderList: function _renderList(data, select, direct) {
        var _this = this,
            renderedStr = "";
        for (var i = 0; i < data.length; i++) {
            renderedStr += this.defaults.listTemplate.replace(/\{\{(\w+)\}\}/g, function ($1, $2) {
                var result = data[i][$2];
                if ($2 == "imgurl") {
                    result = replaceCharset(result);
                }
                if ($2 == "name") {
                    result = decodeURIComponent(result).replace(/(<|＜).+(><\/|＞＜／)[A-z]+(>|＞)/g, ' ');
                }
                if ($2 == "ctime") {
                    result = magicTime(result);
                }
                if ($2 == "openidShow") {
                    result = _this.userInfo.openid == data[i].commid ? "block" : "none";
                }
                if ($2 == "report_status") {
                    if (result > 0) {
                        result = '<span class="report f_report">已举报</span>';
                    } else {
                        result = '<a href="javascript:void(0)" class="report f_report"><i class="jubao" onclick="PTTSendClick(\'btn\',\'jb1\',\'举报\');"></i>举报</a>';
                    }
                }
                if ($2 == 'oper_status') {
                    if (result > 0) {
                        result = ' <a href="javascript:;" class="zan"><span class="c_xin c_sp zan upvote" onclick="PTTSendClick(\'btn\',\'a_zan1\',\'赞\');"></span>(<em>' + data[i].likenum + '</em>)</a>';
                    } else {
                        result = ' <a href="javascript:;" class="zan"><span class="c_xin c_sp zan" onclick="PTTSendClick(\'btn\',\'a_zan1\',\'赞\');"></span>(<em>' + data[i].likenum + '</em>)</a>';
                    }
                }
                if ($2 == "content") {
                    result = _this.replaceEmoj(result);
                }
                if ($2 == "replys") {
                    if (data[i].replys.length > 0) {
                        result = _this._renderReply(data[i].replys);
                    }
                }
                if ($2 == "rnum") {
                    result = data[i].rnum > 2 ? 'block' : 'none';
                }
                return result;
            });
        }
        if (direct && direct > 0) {
            this.$list.find(select).prepend($(renderedStr));
        } else {
            this.$list.find(select).append($(renderedStr));
        }
        if (select == ".comon_allwrap_hot") {
            if (data.length + this.comments.length >= _this.pageInfo.num) {
                this.$list.find(".F_loadbtn").show();
            }
        } else {
            if (data.length >= _this.pageInfo.num) {
                this.$list.find(".F_loadbtn").show();
            }
        }
    },
    _renderReply: function _renderReply(data) {
        var _this = this,
            renderedStr = "";
        for (var i = 0; i < data.length; i++) {
            renderedStr += this.defaults.replyTemplate.replace(/\{\{(\w+)\}\}/g, function ($1, $2) {
                var result = data[i][$2];
                if ($2 == "repimgurl") {
                    result = replaceCharset(result);
                }
                if ($2 == "repname") {
                    result = decodeURIComponent(result);
                }
                if ($2 == "rtime") {
                    result = magicTime(result);
                }
                if ($2 == "content") {
                    result = _this.replaceEmoj(result);
                }
                if ($2 == "replyTo") {
                    if (data[i].passrepname) {
                        result = '回复<span class="bname">' + decodeURIComponent(data[i].passrepname) + '</span>';
                    } else {
                        result = '';
                    }
                }
                if ($2 == "openidShow") {
                    result = _this.userInfo.openid == data[i].repid ? "block" : "none";
                }
                return result;
            });
        }
        return renderedStr;
    },
    _addReply: function _addReply(index, data, direct, hot) {
        var _this = this,
            renderedStr = _this._renderReply(data),
            el = this.$list.find(hot ? ".comon_allwrap_hot" : ".comon_allwrap").find(".comments_list").eq(index).find(".replys-wrap");
        if (direct && direct > 0) {
            //往前追加回复
            el.prepend($(renderedStr));
        } else {
            el.append($(renderedStr));
        }
    },
    loadMore: function loadMore() {
        var _this = this;
        if (this.pageInfo.pageEnd || this.pageInfo.loading) {
            return;
        }
        this.pageInfo.loading = true;
        var time = _this.comments.length > 0 ? _this.comments[_this.comments.length - 1].ctime : 0;
        modal.getData('COMMENT_LIST', function (data) {
            _this.pageInfo.loading = false;
            _this.comments = _this.comments.concat(data.latest);
            _this.total_comment_num = data.total_comment_num;
            _this.defaults.updated(_this.total_comment_num);
            _this.hotComments = _this.hotComments.concat(data.hot);
            if (_this.pageInfo.start == 0) {
                _this.$list.find(".common_txt span").text(data.total_comment_num);
                if (data.latest.length + data.hot.length < _this.pageInfo.num) {
                    _this.pageInfo.pageEnd = true;
                    _this.$list.find(".F_loadbtn").hide();
                }
                if (data.total_comment_num == 0) {
                    $('.js-empty').show();
                }
                modal.defaults = modal.defaults.replace("action=init", "action=list");
            } else {
                if (data.latest.length < _this.pageInfo.num) {
                    _this.pageInfo.pageEnd = true;
                    _this.$list.find(".F_loadbtn").hide();
                }
            }

            _this._renderList(data.latest, ".comon_allwrap");
            if (data.hot.length > 0) {
                _this._renderList(data.hot, ".comon_allwrap_hot");
            } else {
                if (_this.pageInfo.start == 0) {
                    _this.$list.find(".comon_allwrap_hot").hide().prev().hide();
                }
            }
            _this.pageInfo.start += _this.pageInfo.num;
        }, "&ltime=" + time + "&num=" + _this.defaults.options.num);
    },
    _openReply: function _openReply(index, $el) {
        $el.closest(".tip").after(this.$replayPannel);
        this.$replayPannel.show();
    },
    _openReport: function _openReport(i, hot) {
        this.$reportPannel.show();
        this.$reportPannel.cindex = i;
        this.$reportPannel.isHot = hot;
    },
    _openEmoj: function _openEmoj($el) {
        this._renderEmoj();
        var $parent = $el.parent().parent();
        if ($parent.find(".area_biaoq").length == 0) {
            $parent.append(this.$emojPannel);
            this.mousePosition = null;
        }
        if (window.getSelection().anchorNode) {
            var range = window.getSelection().getRangeAt(0);
            if (range.commonAncestorContainer.className == "comment_input") {
                this.mousePosition = range;
            }
        }
        this.$emojPannel.show();
    },
    replaceEmoj: function replaceEmoj(str) {
        str = str.replace(/\[e\:(\d+)\]/g, function ($1, $2) {
            return '<img src="//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqemotion/' + $2 + '.png" style="width:25px;display:inline;"/>';
        });
        str = str.replace(/＜br＞/g, '<br>').replace(/＆nbsp；/g, " ");
        return str;
    },
    reload: function reload() {
        this.pageInfo.start = 0;
        this.pageInfo.pageEnd = false;
        this.comments = [];
        this.hotComments = [];
        this.total_comment_num = 0;
        this.defaults.updated(this.total_comment_num);
        modal.defaults = modal.defaults.replace("action=list", "action=init");
        this.$list.find(".comon_allwrap").empty();
        this.loadMore();
    },
    _submitReply: function _submitReply() {
        if (!isLogin) {
            this.opendLoginPannel();
            return;
        }
        var content = this.$replayPannel.find(".comment_input").html().replace(/\<img src=\"\/\/ossweb-img.qq.com\/images\/js\/bsCommonFiles\/images\/qqemotion\/(\d+)\.png\".*?\>/g, function ($1, $2) {
            return "[e:" + $2 + "]";
        }),
            _this = this;
        content = content.replace(/^(&nbsp;| )+|(&nbsp;| )+$/g, '');
        if (!content) {
            tips("请输入评论内容");
            return;
        }
        if (strlen(content) > this.defaults.maxLength) {
            tips("评论内容不能超过" + this.defaults.maxLength + "字符");
            return;
        }
        var parent = this.$replayPannel.closest(".common_userinfo"),
            rep = { repid: "", repname: "" },
            el,
            index,
            isHot;
        isHot = parent.parents(".comon_allwrap_hot").length > 0;
        if (parent.hasClass("no_border")) {
            // 回复的回复
            index = parent.parents(".comon_usersender").parents(".common_userinfo").index();
            el = isHot ? this.hotComments[index] : this.comments[index];
            rep = el.replys[parent.index()];
        } else {
            //评论的回复
            index = parent.index();
            el = isHot ? this.hotComments[index] : this.comments[index];
        }
        modal.getData('SUBMIT_REPLY', function (data) {
            tips("回复成功");
            var temp = [{
                "rtime": data.rtime,
                "repid": _this.userInfo.openid,
                "repimgurl": decodeURIComponent(_this.userInfo.avatar),
                "repname": _this.userInfo.nickname,
                "status": "0",
                "content": content,
                "rnum": 0,
                "remark": "",
                "passrepimgurl": "",
                "passrepname": rep.repname,
                "cltip": ""
            }];
            el.replys.unshift(temp);
            _this.$replayPannel.find(".comment_input").html("");
            _this._addReply(index, temp, 1, isHot);
            _this.$replayPannel.hide();
        }, "&commid=" + el.commid + "&ctime=" + el.ctime + "&content=" + encodeURIComponent(_this._filterEmoj(content)) + "&remark=" + rep.repid);
    },
    _submitCommnet: function _submitCommnet() {
        if (!isLogin) {
            this.opendLoginPannel();
            return;
        }
        var content = this.$list.find(".comment_input").html().replace(/\<img src=\"\/\/ossweb-img.qq.com\/images\/js\/bsCommonFiles\/images\/qqemotion\/(\d+)\.png\".*?\>/g, function ($1, $2) {
            return "[e:" + $2 + "]";
        }),
            _this = this;
        content = content.replace(/^(&nbsp;| )+|(&nbsp;| )+$/g, '');
        if (!content) {
            tips("请输入评论内容");
            return;
        }
        if (strlen(content) > this.defaults.maxLength) {
            tips("评论内容不能超过" + this.defaults.maxLength + "字符");
            return;
        }
        modal.getData('SUBMIT_COMMENT', function (data) {
            tips("发表成功");
            _this.$list.find(".comment_input").html("");
            var temp = [{
                cltip: "",
                commid: _this.userInfo.openid,
                content: content,
                ctime: data.ctime,
                imgurl: decodeURIComponent(_this.userInfo.avatar),
                likenum: 0,
                name: _this.userInfo.nickname,
                open: 0,
                oper_status: 0,
                remark: "",
                replys: [],
                report_content: "",
                report_num: 0,
                report_status: 0,
                rnum: 0,
                status: 0,
                type: 0
            }];
            _this.comments.unshift(temp[0]);
            _this.total_comment_num += 1;
            _this.defaults.updated(_this.total_comment_num);
            _this._renderList(temp, ".comon_allwrap", 1);
            $('.js-empty').hide();
        }, "&content=" + encodeURIComponent(this._filterEmoj(content)));
    },
    _filterEmoj: function _filterEmoj(val) {
        return val;
    },
    _renderEmoj: function _renderEmoj() {
        if (this.$emojPannel) {
            return;
        }
        this.$emojPannel = $('<div class="area_biaoq"></div>');
        var str = "<ul>",
            _this = this;
        for (var i = 1; i < 106; i++) {
            str += '<li><img src="//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqemotion/' + i + '.png"></li>';
        }
        str += "</ul>";
        this.$emojPannel.html(str).on("click", function (e) {
            if (e.target.tagName.toLowerCase() == "img") {
                _this._selectEmotion($(e.target));
            }
        });
    },
    _selectEmotion: function _selectEmotion($el) {
        var _this = this,
            range,
            $clone = $el.clone();
        if (!this.mousePosition) {
            $el.parents(".comment_box").find(".comment_input").append($clone);
        } else {
            _this.mousePosition.insertNode($clone[0]);
            _this.mousePosition.setStartAfter($clone[0]);
        }
        this.$emojPannel.hide();
    },
    _report: function _report() {
        var _this = this,
            el = _this.$reportPannel.isHot ? this.hotComments[_this.$reportPannel.cindex] : this.comments[_this.$reportPannel.cindex];
        if (!isLogin) {
            this.opendLoginPannel();
            return;
        }
        var content = _this.$reportPannel.find("input[name=rep]:checked").val();
        if (!content) {
            tips("请选择举报的类型");
            return;
        }
        modal.getData('REPORT', function (data) {
            tips("举报成功");
            _this.$reportPannel.hide();
            var $parent = _this.$list.find(_this.$reportPannel.isHot ? ".comon_allwrap_hot" : ".comon_allwrap").find(".comments_list").eq(_this.$reportPannel.cindex).find(".user_mhead").eq(0);
            $parent.find(".report").remove();
            $parent.append($('<span class="report f_report">已举报</span>'));
        }, "&ctime=" + el.ctime + "&commid=" + el.commid + "&remark=" + encodeURIComponent(content));
    },
    _vote: function _vote(index, hot) {
        if (!isLogin) {
            this.opendLoginPannel();
            return;
        }
        var action = "cancel",
            _this = this,
            el = hot ? this.hotComments[index] : this.comments[index];
        if (el.oper_status == 0) {
            action = "digg";
        }
        modal.getData('LIKE', function (data) {
            el.likenum = el.likenum + (!el.oper_status ? 1 : -1);
            _this.$list.find(hot ? ".comon_allwrap_hot" : ".comon_allwrap").find(".comments_list").eq(index).find(".zan em").html(el.likenum);
            el.oper_status = !el.oper_status ? 1 : 0;
            if (el.oper_status == 1) {
                _this.$list.find(hot ? ".comon_allwrap_hot" : ".comon_allwrap").find(".comments_list").eq(index).find(".zan .c_xin").addClass('upvote');
            } else {
                _this.$list.find(hot ? ".comon_allwrap_hot" : ".comon_allwrap").find(".comments_list").eq(index).find(".zan .c_xin").removeClass('upvote');
            }
        }, "&ctime=" + el.ctime + "&commid=" + el.commid + "&action=" + action);
    },
    _deleteComment: function _deleteComment(index, hot) {
        if (!isLogin) {
            this.opendLoginPannel();
            return;
        }
        var _this = this,
            el = hot ? _this.hotComments[index] : _this.comments[index];
        modal.getData('DELETE_COMMENT', function (data) {
            tips("删除评论成功");
            _this.hotComments.splice(index, 1);
            _this.total_comment_num -= 1;
            _this.defaults.updated(_this.total_comment_num);
            var $wrap = _this.$list.find(hot ? ".comon_allwrap_hot" : ".comon_allwrap").find(".comments_list ").eq(index);
            $wrap.animate({ opacity: 0 }, 1000, function () {
                $wrap.remove();
            });
            if (_this.total_comment_num == 0) {
                $('.js-empty').show();
            }
        }, "&ctime=" + el.ctime + "&commid=" + el.commid);
    },
    _deleteReply: function _deleteReply(pi, ci, hot) {
        if (!isLogin) {
            this.opendLoginPannel();
            return;
        }
        var _this = this,
            parent = hot ? _this.hotComments[pi] : _this.comments[pi],
            child = parent.replys[ci];
        modal.getData('DELETE_REPLY', function (data) {
            parent.replys.splice(ci, 1);
            tips("删除回复成功");
            var $wrap = _this.$list.find(hot ? ".comon_allwrap_hot" : ".comon_allwrap").children().eq(pi).find(".common_userinfo").eq(ci);
            $wrap.animate({ opacity: 0 }, 1000, function () {
                $wrap.remove();
            });
        }, "&ctime=" + parent.ctime + "&commid=" + parent.commid + "&repid=" + child.repid + "&rtime=" + child.rtime);
    },
    _moreReply: function _moreReply(index, hot) {
        //更多回复
        var _this = this,
            el = hot ? this.hotComments[index] : this.comments[index];
        if (typeof el.pageEnd == "undefined") {
            el.pageEnd = false;
            el.startNums = 1;
        }
        if (!el.pageEnd) {
            var startTime = el.replys[el.startNums].rtime;
            modal.getData('REPLY_LIST', function (data) {
                if (data.replys.length < _this.pageInfo.num) {
                    el.pageEnd = true;
                    el.rnum = 1;
                    _this.$list.find(hot ? ".comon_allwrap_hot" : ".comon_allwrap").find(".comments_list").eq(index).find(".S_loadbtn").hide();
                }
                _this._addReply(index, data.replys, null, hot);
                el.startNums += data.replys.length;
                el.replys = el.replys.concat(data.replys);
            }, "&ctime=" + el.ctime + "&commid=" + el.commid + "&num=" + _this.pageInfo.num + "&ltime=" + startTime);
        }
    },
    _updateUserInfo: function _updateUserInfo() {
        if (!isLogin) {
            this.opendLoginPannel();
            return;
        }
        this.$list.find(".login_btn_ft").hide();
        this.$list.find(".submit_ft").show();
        this.$list.find(".l_tx_name").html('<img src="' + this.userInfo.avatar + '" alt="" class="cuser_head" width="36" height="36"><span class="nn"></span>');
        this.$list.find(".l_tx_name .nn").text(this.userInfo.nickname);
        this.$list.find(".login_status").show();
    },
    checkLogin: function checkLogin() {
        var _this = this;
        check();
        function check() {

            milo.ready(function () {
                need("biz.login", function (LoginManager) {
                    LoginManager.checkLogin(function (userinfo) {
                        //已登录
                        isLogin = true;
                        //登陆之后隐藏掉登陆框
                        _this.userInfo.acctype = milo.cookie.get('acctype');
                        //微信或者QQ的昵称都可以获取
                        if (userinfo.logtype == 'wx') {
                            LoginManager.getUserInfoByWxOpenId({
                                "openid": milo.cookie.get("openid"),
                                "access_token": milo.cookie.get("access_token")
                            }, function (wxuser) {
                                _this.userInfo.avatar = wxuser.headimgurl ? wxuser.headimgurl + '/96' : "//game.gtimg.cn/images/yxzj/web201605/main/avatar1.jpg";
                                if (modal.defaults.indexOf("avatar=") == -1) {
                                    modal.defaults += "&avatar=" + encodeURIComponent(_this.userInfo.avatar);
                                }
                                _this._updateUserInfo();
                            });
                            _this.userInfo.login_type = "wxpc";
                            _this.userInfo.openid = milo.cookie.get('openid');
                            _this.userInfo.access_token = milo.cookie.get('access_token');
                            modal.defaults += "&login_type=wxpc&openid=" + milo.cookie.get('openid') + "&access_token=" + milo.cookie.get('access_token') + "&appid=" + _this.defaults.login.wxappid;
                            _this.reload();
                            //如果登陆类型是wx微信，就直接获取基本信息里的头像
                        } else {
                            LoginManager.getUserFace(function (data) {
                                if (data.userFace) {
                                    _this.userInfo.avatar = data.userFace;
                                    if (modal.defaults.indexOf("avatar=") == -1) {
                                        modal.defaults += "&avatar=" + encodeURIComponent(data.userFace);
                                    }
                                    _this._updateUserInfo();
                                }
                            });
                            _this.userInfo.login_type = "qqpc";
                            _this.userInfo.uin = milo.cookie.get('uin');
                            _this.userInfo.skey = milo.cookie.get('skey');
                            modal.defaults += "&login_type=qqpc&skey=" + milo.cookie.get('skey') + "&uin=" + milo.cookie.get('uin') + "&appid=" + _this.defaults.login.qqappid;
                            modal.getData('USER_INFO', function (data) {
                                _this.userInfo.openid = data.openid;
                                modal.defaults += "&openid=" + data.openid;
                                _this.reload();
                            });
                        }
                        if (userinfo.logtype) {
                            //用户昵称 userinfo.nickname;
                            _this.userInfo.nickname = userinfo.nickname.replace('<script>', '&lt;script&gt;').replace('</script>', '&lt;/script&gt;');
                            modal.defaults += "&nickname=" + encodeURIComponent(_this.userInfo.nickname);
                        }
                    }, function () {
                        _this.reload();
                    });
                });
            });
        }
    },
    loginout: function loginout() {
        need("biz.login", function (LoginManager) {
            LoginManager.logout();
            milo.cookie.clear("session_id", 'qq.com', '/');

            //删除Cookie
            milo.cookie.clear('p_skey', 'qq.com', '/');
            milo.cookie.clear('p_uin', 'qq.com', '/');
            milo.cookie.clear('uin', 'qq.com', '/');
            milo.cookie.clear('skey', 'qq.com', '/');
            milo.cookie.clear("IED_LOG_INFO2");
            milo.cookie.clear('IED_LOG_INFO2', 'qq.com', '/');

            milo.cookie.clear("openid", 'qq.com', '/');
            milo.cookie.clear("access_token", 'qq.com', '/');
            milo.cookie.clear("acctype", 'qq.com', '/');
            milo.cookie.clear("appid", 'qq.com', '/');
            milo.cookie.clear("lg_source", 'qq.com', '/');
            milo.cookie.clear("wxnickname", 'qq.com', '/');

            milo.cookie.clear("openid");
            milo.cookie.clear("access_token");
            milo.cookie.clear("acctype");
            milo.cookie.clear("appid");

            // dickma：再用iframe再清除了cookie一次
            // iframe清除： p_skey  p_uin uin seky IED_LOG_INFO2 openid access_token acctype appid
            //  seky 有错，需要修改

            var oWxIFrame = document.createElement("iframe");
            oWxIFrame.id = "loginWxIframe";
            oWxIFrame.name = "loginWxIframe";
            oWxIFrame.scrolling = "no";
            oWxIFrame.frameBorder = "0";
            oWxIFrame.style.display = "none";
            document.body.appendChild(oWxIFrame);
            oWxIFrame.src = location.protocol + "//apps.game.qq.com/ams/logout_wx.html";

            // dickma：又用iframe再清除了cookie一次 只清除了 p_uin  p_skey  pt4_token  domain=game.qq.com; path=/;
            var oIFrame = document.createElement("iframe");
            oIFrame.id = "loginIframe";
            oIFrame.name = "loginIframe";
            oIFrame.scrolling = "no";
            oIFrame.frameBorder = "0";
            oIFrame.style.display = "none";
            document.body.appendChild(oIFrame);
            oIFrame.src = location.protocol + "//game.qq.com/act/logout.html?t=1";

            setTimeout(function () {
                location.reload();
            }, 200);
        });
    },
    opendLoginPannel: function opendLoginPannel() {
        this.$loginPannel.show();
    },
    login: function login(type) {
        var _this = this;
        if (typeof milo == "undefined") {
            $.getScript('//ossweb-img.qq.com/images/js/milo/milo.js', function () {
                _login();
            });
        } else {
            _login();
        }
        function _login() {
            need("biz.login", function (LoginManager) {
                if (type == "qq") {
                    LoginManager.login();
                } else {
                    LoginManager.loginByWx({
                        "appId": _this.defaults.login.wxappid //游戏在微信的appid
                    });
                }
            });
        }
    }
};

Comment.version = version;

return Comment;

})));
