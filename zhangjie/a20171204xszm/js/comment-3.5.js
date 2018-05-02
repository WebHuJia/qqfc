(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
        typeof define === 'function' && define.amd ? define(['vue'], factory) :
            (global.Comment = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

    function __$styleInject(css, returnValue) {
        if (typeof document === 'undefined') {
            return returnValue;
        }
        css = css || '';
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        head.appendChild(style);

        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        return returnValue;
    }

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

    __$styleInject("p,ul{margin:0;padding:0}ul{list-style:none}a{text-decoration:none}", undefined);

    __$styleInject(".comment-animate--fade-enter-to,.comment-animate--fade-leave-to{transition:opacity .32s cubic-bezier(.33,0,.33,1)}.comment-animate--fade-enter,.comment-animate--fade-leave-to{opacity:0}.comment-animate--slide-enter-to,.comment-animate--slide-leave-to{transition:transform .5s}.comment-animate--slide-enter,.comment-animate--slide-leave-to{transform:translate3d(0,100%,0)}", undefined);

    __$styleInject(".comment-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.allComments{overflow:hidden}.none_tips,.report-title{text-align:center}@font-face{font-family:igfont;src:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/iconfont/v1/iconfont.eot);src:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/iconfont/v1/iconfont.eot#iefix) format(\"embedded-opentype\"),url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/iconfont/v1/iconfont.svg#iconfont) format(\"svg\"),url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/iconfont/v1/iconfont.woff) format(\"woff\"),url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/iconfont/v1/iconfont.ttf) format(\"truetype\")}.none_tips{font-size:12px;margin-top:20px}.report-title{height:40px;line-height:40px;position:relative;font-size:15px;color:#e0e0e0;background:#213046}.report-title-back{position:absolute;top:0;left:15px;color:#e0e0e0;font-size:18px;line-height:40px}.report-bd h6{background:#273547;height:30px;line-height:30px;text-indent:15px;color:#e0e0e0;margin:0;font-size:11px}.np-comment-report-bd{background:#18202f;position:relative;z-index:1}.report-options li{height:40px;line-height:40px;border-bottom:1px solid #1e2532;font-size:13px;position:relative}.report-options li span{padding-left:15px;color:#e0e0e0}.report-options li .report-options-item{width:20px;height:20px;position:absolute;top:10px;right:10px;background:#2c3548;border-radius:20px;overflow:hidden}.report-options li .report-options-item:after{font-family:igfont!important;font-size:25px;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale;content:\"\\e61c\";position:absolute;top:2px;left:-3px;line-height:20px;color:#fff;opacity:0;text-align:center}.report-sumbit{text-align:center;font-size:13px}.report-options li.selected .report-options-item:after{opacity:1}.report-options li.selected .report-options-item{background:#2c3548}.report-action{padding:10px 15px}.report-sumbit{display:block;width:100%;height:30px;line-height:30px;background:#3c629f;color:#e0e0e0;border-radius:3px}.ig-flex{display:-webkit-box;display:box;display:-webkit-flexbox;display:flexbox;display:flex}.ig-flex-fls{-webkit-box-pack:justify;box-pack:justify;-webkit-flex-pack:justify;flex-pack:justify;justify-content:space-between}.comment_replay_wrap{line-height:22px;background:#fdecd0;padding:10px;height:auto;overflow:hidden;border-radius:5px}.comment_icon-share_outer{height:12px;width:12px;overflow:hidden;display:inline-block;margin-left:10px}.comment_icon-share{background:url(//ossweb-img.qq.com/images/js/bsCommonFiles/images/comment/comment-sprite.png) -40px -40px no-repeat;background-size:134px 60px}.comment_color_01{color:#ec6400}.comment_color_02{color:#603f2e}.comment_block_wrap{padding-bottom:15px;margin-top:10px;font-size:12px}.comment_block_left{width:35px}.comment_block_right{width:100%}.comment_user_avatar{width:25px;height:25px;border-radius:25px}.comment_user_name{padding-bottom:8px}.comment_user_name em{vertical-align:-2px}.comment_detail{line-height:18px}.my_comment_list_wrap{background:#fff6e4;height:100%;overflow:hidden}.comment_block_wrap_bg{background:#fff1d9;padding:10px;border-top:1px solid #f7dcb1;border-bottom:1px solid #f7dcb1}.comment_from{width:100%;background:#fae1b8;color:#694937;height:30px;border:1px solid #f2d6a7;line-height:30px;padding-left:10px;overflow:hidden;margin-top:10px}.comment_from span{width:60px;float:left}.comment_from a{color:#ee5f00;width:65%;float:left}.my_comment_list_date{font-size:10px;color:#ce9f78}.none{display:none!important}.comment-hidden{height:100%!important;overflow:hidden!important}", undefined);

    /**
     * @file 工具类函数
     * @author hardylin <hardylin@tencent.com>
     */

// 浏览器判断
    var browser = {
        qq: / QQ\//i.test(navigator.userAgent),
        qqBrowser: / MQQBrowser\//i.test(navigator.userAgent) && !/ QQ\/| MicroMessenger\//i.test(navigator.userAgent),
        wechat: / MicroMessenger\//i.test(navigator.userAgent)

        /**
         * 模拟点击事件
         * @param {String | HTMLElement} el - 要模拟点击事件元素的 css 选择器或者 dom 节点
         */
    };function click(el) {
        var event = document.createEvent('MouseEvent') || document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0);
        if (typeof el == 'string') {
            el = document.querySelector(el);
        }
        el.dispatchEvent(event);
    }

    /**
     * 计算字符串的字节长度
     * @param {String} str 要计算的字符串
     * @returns {Number} 字节长度
     */
    function computeByteLength(str) {
        var len = 0;
        for (var i = 0, l = str.length; i < l; i++) {
            var c = str.charCodeAt(i);
            if (c >= 0x0001 && c <= 0x007e || 0xff60 <= c && c <= 0xff9f) {
                len++; // 单字节加 1
            } else {
                len += 2;
            }
        }
        return len;
    }

    /**
     * 格式化时间
     * @param {Number} time - 需要格式化的时间
     * @param {String} str - 时间格式（例如：YYYY-MM-DD hh:mm:ss）
     * @returns {String} - 格式化后的时间字符串
     */
    function formatTime(time, str) {
        var date = new Date(time);
        var patterns = {
            'M+': date.getMonth() + 1,
            'D+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        if (/Y+/.test(str)) {
            str = str.replace(RegExp.lastMatch, (date.getFullYear() + '').slice(4 - RegExp.lastMatch.length));
        }
        for (var p in patterns) {
            if (new RegExp('(' + p + ')').test(str)) {
                str = str.replace(RegExp.lastMatch, RegExp.lastMatch.length == 1 ? patterns[p] : ('00' + patterns[p]).slice(-2));
            }
        }
        return str;
    }

    /**
     * 全角转半角
     * @param {String} str - 需要转换的字符串
     * @returns {String} - 转换后的字符串
     */
    function fullToHalf(str) {
        var tmp = '';
        for (var i = 0, len = str.length; i < len; i++) {
            var charCode = str.charCodeAt(i);
            tmp += charCode > 65248 && charCode < 65375 ? String.fromCharCode(charCode - 65248) : str[i];
        }
        return tmp;
    }

    /**
     * 获取指定名称的 url 参数
     * @param {String} name - 参数名称
     * @param {String} url - 指定 url，不指定默认为当前页面 url
     * @returns {String} - 参数的值，未找到则返回 null
     */
    function getUrlParam(name, url) {
        var reg = new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)');
        var values = reg.exec(url ? url : location.search);
        return values != null ? decodeURIComponent(values[2]) : null;
    }

    /**
     * 动态加载 script 脚本
     * @param {String} url - 要加载脚本的 url
     * @returns {Object} - Promise 对象
     */
    function loadScript(url) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.onload = resolve;
            script.onerror = reject;
            script.src = url;
            document.body.appendChild(script);
        });
    }

    /**
     * @file 评论组件依赖
     * @author hardylin <hardylin@tencent.com>
     */

// 判断是否 QQ 浏览器，动态加载额外 JS，可以做到微信授权成功以后，继续回到QQ浏览器
    if (browser.qqBrowser) {
        loadScript('//jsapi.qq.com/get?api=login.*');
    }

// 判断是否有 tcss 上报，动态加载
    if (!window.pgvSendClick) {
        loadScript('//pingjs.qq.com/ping_tcss_ied.js');
    }

    var version = "3.5.5";

    /**
     * @file 工具类 - 警告
     * @author hardylin <hardylin@tencent.com>
     */

    /**
     * 错误断言
     * @param {Boolean} condition - 条件表达式
     * @param {String} msg - 当 condition 结果为 false 时提示的错误信息
     */
    function assert(condition, msg) {
        if (!condition) {
            throw new Error("[Comment] " + msg);
        }
    }

    /**
     * 错误警告
     * @param {Boolean} condition - 条件表达式
     * @param {String} msg - 当 condition 结果为 false 时提示的警告信息
     */

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

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " [class|=\"comment-toast-\"] { display: flex; justify-content: center; align-items: center; z-index: 999; position: fixed; bottom: 18.75%; left: 50%; height: 34px; border-radius: 4px; padding: 0 40px; font-size: 14px; font-weight: 500; white-space: nowrap; color: #fff; background: rgba(0, 0, 0, 0.85); transform: translate3d(-50%, 0, 0); } .comment-toast--center { bottom: 50%; height: 80px; transform: translate3d(-50%, 50%, 0); } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var Toast = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": "comment-animate--fade" } }, [_vm.show ? _c('div', { class: ['comment-toast--' + _vm.type] }, [_vm._v(_vm._s(_vm.content))]) : _vm._e()]);
    }, staticRenderFns: [],
        data: function data() {
            return {
                show: false,
                content: '',
                type: ''
            };
        }
    };

    /**
     * @file toast 提示
     * @author hardylin <hardylin@tencent.com>
     */

    var ToastConstructor = Vue.extend(Toast);

    var toastStack = []; // toast 实例栈

    function getAnInstance() {
        if (toastStack.length > 0) {
            return toastStack.pop();
        }
        return new ToastConstructor().$mount();
    }

    function ToastInstance(content, type) {
        var instance = getAnInstance();
        clearTimeout(instance.timer);

        instance.content = content.toString();
        instance.type = typeof type == 'string' ? type : '';
        instance.show = true;

        document.body.appendChild(instance.$el);

        instance.timer = setTimeout(function () {
            instance.show = false;
            toastStack.push(instance);
        }, 3000);
    }

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .comment-barrage { z-index: 980; position: fixed; bottom: 50px; left: 10px; box-sizing: border-box; max-width: 60vw; overflow: hidden; font-size: 12px; color: #fff; } .comment-barrage--hidden { visibility: hidden; } .comment-barrage ul { transition: transform 0.5s; } .comment-barrage li { display: flex; height: 20px; margin: 4px 0; } .comment-barrage--item { display: flex; align-items: center; overflow: hidden; border-radius: 10px; padding-right: 12px; } .comment-barrage--avatar { flex: none; width: 20px; height: 20px; border-radius: 50%; margin-right: 6px; background: rgba(0, 0, 0, 0.1) no-repeat center / cover; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var Barrage = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "comment-barrage", style: _vm.rootStyle }, [_c('ul', { class: { 'comment-barrage--hidden': _vm.part1.hide }, style: _vm.part1Style }, _vm._l(_vm.part1.barrages, function (barrage, index) {
            return _c('li', { key: index }, [_c('div', { staticClass: "comment-barrage--item", style: _vm.barrageStyle }, [_c('div', { staticClass: "comment-barrage--avatar", style: { 'background-image': 'url(' + _vm.formatAvatar(barrage[_vm.avatar]) + ')' } }), _c('div', { staticClass: "comment-ellipsis", domProps: { "innerHTML": _vm._s(_vm.formatContent(barrage[_vm.content])) } })])]);
        })), _c('ul', { class: { 'comment-barrage--hidden': _vm.part2.hide }, style: _vm.part2Style }, _vm._l(_vm.part2.barrages, function (barrage, index) {
            return _c('li', { key: index }, [_c('div', { staticClass: "comment-barrage--item", style: _vm.barrageStyle }, [_c('div', { staticClass: "comment-barrage--avatar", style: { 'background-image': 'url(' + _vm.formatAvatar(barrage[_vm.avatar]) + ')' } }), _c('div', { staticClass: "comment-ellipsis", domProps: { "innerHTML": _vm._s(_vm.formatContent(barrage[_vm.content])) } })])]);
        }))]);
    }, staticRenderFns: [],
        name: 'comment-barrage',

        props: {
            barrages: { // 全部弹幕数据
                type: Array,
                required: true
            },
            avatar: { // 弹幕头像字段
                type: String,
                required: true
            },
            content: { // 弹幕内容字段
                type: String,
                required: true
            },
            line: { // 同时展示条数
                type: Number,
                default: 5
            },
            rate: { // 滚动速率
                type: Number,
                default: 2000
            },
            background: { // 弹幕背景颜色
                type: String,
                default: '#235a90'
            }
        },

        data: function data() {
            var height = 20; // 每条弹幕高度
            var margin = 4; // 每条弹幕垂直外边距
            return {
                part1: {
                    barrages: [], // 活跃弹幕数据
                    y: 0, // translate 的 y 坐标
                    hide: false // 是否隐藏元素
                },
                part2: {
                    barrages: [],
                    y: 0,
                    hide: false
                },
                index: 0, // 弹幕索引
                offset: height + margin, // 一条弹幕的偏移量
                height: height,
                margin: margin
            };
        },


        computed: {
            partHeight: function partHeight() {
                // 可视部分高度
                return this.line * this.offset;
            },
            rootStyle: function rootStyle() {
                return {
                    height: this.partHeight + 'px',
                    paddingTop: this.partHeight - this.margin / 2 + 'px' // 减去一半外边距
                };
            },
            part1Style: function part1Style() {
                return {
                    transform: 'translate3d(0, ' + this.part1.y + 'px, 0)'
                };
            },
            part2Style: function part2Style() {
                return {
                    transform: 'translate3d(0, ' + this.part2.y + 'px, 0)'
                };
            },
            barrageStyle: function barrageStyle() {
                // 每条弹幕样式
                return {
                    background: this.background
                };
            }
        },

        watch: {
            'barrages': function barrages(newVal, oldVal) {
                if (oldVal.length === 0 && newVal.length > 0) {
                    this.part1.barrages = this.nextBarrages();
                    this.part2.barrages = this.nextBarrages();
                }

                // 弹幕变少之后索引重置
                if (this.index >= newVal.length) {
                    this.index = 0;
                }
            }
        },

        mounted: function mounted() {
            var _this = this;

            if (this.barrages.length > 0) {
                this.part1.barrages = this.nextBarrages();
                this.part2.barrages = this.nextBarrages();
            }
            this.timer = setInterval(function () {
                _this.part1.hide = false;
                _this.part2.hide = false;
                _this.part1.y -= _this.offset;
                _this.part2.y -= _this.offset;

                // 超出显示区域时，在动画执行完成后复位并更新弹幕数据，复位时隐藏动画
                if (_this.part1.y <= -2 * _this.partHeight) {
                    setTimeout(function () {
                        _this.part1.hide = true;
                        _this.part1.y = 0;
                        _this.part1.barrages = _this.nextBarrages();
                    }, 500);
                }
                if (_this.part2.y <= -3 * _this.partHeight) {
                    setTimeout(function () {
                        _this.part2.hide = true;
                        _this.part2.y = -_this.partHeight;
                        _this.part2.barrages = _this.nextBarrages();
                    }, 500);
                }
            }, this.rate);
        },
        beforeDestroy: function beforeDestroy() {
            clearInterval(this.timer);
        },


        methods: {

            /**
             * 获取下一组弹幕
             * @returns {Array} - 最新弹幕数据数组
             */
            nextBarrages: function nextBarrages() {
                if (this.barrages.length == 0) {
                    return [];
                }

                var index = this.index + this.line;
                var arr = this.barrages.slice(this.index, index);

                // 末尾弹幕条数不足则从头取
                while (arr.length < this.line) {
                    index = this.line - arr.length;
                    arr = arr.concat(this.barrages.slice(0, index));
                }

                this.index = index;
                return arr;
            },


            /**
             * 格式化弹幕内容
             * @param {String} content - 弹幕内容
             * @returns {String} - 格式化后的弹幕内容
             */
            formatContent: function formatContent(content) {
                return content.replace(/\[e:(\d+)\]/g, function ($1, $2) {
                    return '<img src="//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqemotion/' + $2 + '.png" style="display:inline-block;width:16px;margin-top:2px">';
                });
            },


            /**
             * 格式化头像
             * @param {String} str - 需要格式化的头像 URL
             * @returns {String} - 格式化后的头像 URL
             */
            formatAvatar: function formatAvatar(str) {
                return fullToHalf(str.replace(/^https?:/, ''));
            }
        }
    };

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .comment-add-bar { display: flex; z-index: 980; position: fixed; right: 0; bottom: 0; left: 0; padding: 5px 10px; background: #fff linear-gradient(180deg, #e4e4e4, #e4e4e4 66.6%, transparent 66.6%) no-repeat top / 100% 1px; } .comment-add-bar--input { flex: auto; display: flex; align-items: center; height: 28px; border: 1px solid #e4e4e4; border-radius: 4px; font-size: 14px; color: #d1d1d1; } .comment-add-bar--input::before { content: \"\"; height: 12px; width: 12px; margin: 0 6px; background: url(//ossweb-img.qq.com/images/js/bsCommonFiles/images/comment/comment-sprite.png) -52px -40px no-repeat / 134px 60px; } .comment-add-bar--all { flex: none; display: flex; justify-content: center; align-items: center; width: 120px; height: 30px; margin-left: 10px; border-radius: 4px; font-size: 12px; color: #fff; background: #5193ff; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var commentAddBar = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "comment-add-bar" }, [_c('div', { staticClass: "comment-add-bar--input", on: { "click": _vm.addComment } }, [_vm._v("发表评论")]), _vm.$comment._config.allCommentUrl ? _c('a', { staticClass: "comment-add-bar--all", attrs: { "href": _vm.$comment._config.allCommentUrl } }, [_vm._v("所有评论（" + _vm._s(_vm.total) + "条）")]) : _vm._e()]);
    }, staticRenderFns: [],
        name: 'comment-add-bar',

        data: function data() {
            return {
                show: true,
                originY: 0 // touch 事件初始 y 坐标
            };
        },


        computed: {
            total: function total() {
                return this.$comment.comments.total;
            }
        },

        mounted: function mounted() {
            document.addEventListener('touchstart', this.touchStart.bind(this));
            document.addEventListener('touchmove', this.touchMove.bind(this));
        },
        beforeDestroy: function beforeDestroy() {
            document.removeEventListener('touchstart', this.touchStart);
            document.removeEventListener('touchmove', this.touchMove);
        },


        methods: {
            addComment: function addComment() {
                window.pgvSendClick({ hottag: 'ingame.comment.btn.announce' });
                this.$comment._vm.$emit('input', this.$parent);
            },
            touchStart: function touchStart(event) {
                this.originY = event.touches[0].clientY;
            },
            touchMove: function touchMove(event) {
                this.show = event.touches[0].clientY > this.originY ? true : false;
            }
        }
    };

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .comment-add-button { flex: none; display: flex; justify-content: center; align-items: center; width: 108px; height: 26px; font-size: 10px; font-weight: 700; color: #ececec; background: #5193ff; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var commentAddButton = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "comment-add-button", on: { "click": _vm.addComment } }, [_vm._t("default", [_vm._v("发表评论")])], 2);
    }, staticRenderFns: [],
        name: 'comment-add-button',

        methods: {
            addComment: function addComment() {
                window.pgvSendClick({ hottag: 'ingame.comment.btn.announce' });
                this.$comment._vm.$emit('input', this.$parent);
            }
        }
    };

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .sl-slide { overflow: hidden; } .sl-slide-list { display: flex; } .sl-slide-list > * { width: 100%; } /* 指示器 ------------------------------ */ .sl-slide-indicator { display: flex; justify-content: center; margin: 6px 0; } .sl-slide-indicator li { box-sizing: border-box; width: 10px; height: 10px; margin: 0 5px; border: 1px solid #d6d6d6; border-radius: 50%; } .sl-slide-current { background: #d6d6d6; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var slSlide = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "sl-slide" }, [_c('div', { staticClass: "sl-slide-list", on: { "touchstart": function touchstart($event) {
            $event.stopPropagation();_vm.touchStart($event);
        }, "touchmove": function touchmove($event) {
            $event.stopPropagation();_vm.touchMove($event);
        }, "touchend": function touchend($event) {
            $event.stopPropagation();_vm.touchEnd($event);
        } } }, [_vm._t("default")], 2), _c('ul', { staticClass: "sl-slide-indicator" }, _vm._l(_vm.childElementCount, function (n) {
            return _c('li', { class: { 'sl-slide-current': n - 1 == _vm.page } });
        }))]);
    }, staticRenderFns: [],
        data: function data() {
            return {
                page: 0,
                childElementCount: 0,
                d_list: null,
                transform: '',
                originX: 0, // touch 事件初始 x 坐标
                minX: 0, // touch 事件最小可偏移 x 坐标
                childWidth: 0 // 每页宽度
            };
        },
        mounted: function mounted() {
            this.d_list = this.$el.querySelector('.sl-slide-list');
            this.d_list.style.width = this.d_list.childElementCount * 100 + '%';
            this.childElementCount = this.d_list.childElementCount;
        },

        methods: {
            touchStart: function touchStart(event) {
                this.childWidth = this.d_list.offsetWidth / this.d_list.childElementCount;
                this.minX = this.childWidth - this.d_list.offsetWidth;
                this.d_list.style.transition = '';
                this.originX = event.targetTouches[0].clientX;
                this.transform = this.d_list.style.transform ? this.d_list.style.transform : 'translate3d(0px, 0px, 0px)';
            },
            touchMove: function touchMove(event) {
                var _this = this;

                this.d_list.style.transform = this.transform.replace(/(.+\()(-?\d+\.?\d*)(.+)/, function (str, s1, s2, s3) {
                    s2 = parseInt(s2) + event.targetTouches[0].clientX - _this.originX;
                    s2 = s2 > _this.minX ? s2 : _this.minX;
                    return '' + s1 + (s2 < 0 ? s2 : 0) + s3;
                });
            },
            touchEnd: function touchEnd(event) {
                var _this2 = this;

                this.d_list.style.transition = 'transform 0.3s';
                this.d_list.style.transform = this.d_list.style.transform.replace(/(.+\()(-?\d+\.?\d*)(.+)/, function (str, s1, s2, s3) {
                    var remainder = parseInt(s2) % _this2.childWidth;
                    s2 = event.changedTouches[0].clientX < _this2.originX ? parseInt(s2) - remainder - _this2.childWidth : parseInt(s2) - remainder;
                    s2 = s2 > _this2.minX ? s2 : _this2.minX;
                    _this2.page = Math.abs(parseInt(s2 / _this2.childWidth));
                    return '' + s1 + s2 + s3;
                });
            }
        }
    };

    /**
     * @file 轮播图
     * @author hardylin <hardylin@tencent.com>
     */

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .sl-sticker { margin-top: 12px; font-size: 0; } .sl-sticker-page { display: flex; flex-wrap: wrap; } .sl-sticker-page li { box-sizing: border-box; width: 9vw; padding: 3px; } @media screen and (orientation: landscape) { .sl-sticker-page li { width: 6vw; } } .sl-sticker-page img { width: 100%; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var slSticker = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('sl-slide', { staticClass: "sl-sticker", nativeOn: { "click": function click($event) {
            _vm.selectSticker($event);
        } } }, [_c('ul', { staticClass: "sl-sticker-page" }, _vm._l(27, function (n) {
            return _c('li', [_c('img', { attrs: { "src": '//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqemotion/' + n + '.png' } })]);
        })), _c('ul', { staticClass: "sl-sticker-page" }, _vm._l(_vm.numArr(28, 54), function (n) {
            return _c('li', [_c('img', { attrs: { "src": '//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqemotion/' + n + '.png' } })]);
        })), _c('ul', { staticClass: "sl-sticker-page" }, _vm._l(_vm.numArr(55, 81), function (n) {
            return _c('li', [_c('img', { attrs: { "src": '//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqemotion/' + n + '.png' } })]);
        })), _c('ul', { staticClass: "sl-sticker-page" }, _vm._l(_vm.numArr(82, 105), function (n) {
            return _c('li', [_c('img', { attrs: { "src": '//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqemotion/' + n + '.png' } })]);
        }))]);
    }, staticRenderFns: [],
        components: {
            slSlide: slSlide
        },
        methods: {

            /**
             * 生成连续数字的数组
             * @param {Number} 开始数字
             * @param {Number} 结束数字
             * @returns {Array} 生成的连续数字的数组
             */
            numArr: function numArr(start, end) {
                var arr = [];
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                }
                return arr;
            },
            selectSticker: function selectSticker(event) {
                var target = event.target.nodeName.toLowerCase() == 'img' ? event.target : event.target.firstElementChild;
                if (target.nodeName.toLowerCase() == 'img') {
                    this.$emit('select', target);
                }
            }
        }
    };

    /**
     * @file 表情面板
     * @author hardylin <hardylin@tencent.com>
     */

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .sl-reply { padding: 6px 12px; background: #f7f7f7; } .sl-reply-btn { display: flex; justify-content: flex-end; align-items: center; padding: 6px 0; } .sl-reply-emotion { width: 24px; height: 24px; margin: 0 12px; background: url(//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqemotion/emotion.png) no-repeat center / contain; } .sl-reply-submit { display: flex; justify-content: center; align-items: center; width: 54px; height: 30px; border-radius: 4px; font-size: 10px; font-weight: 700; color: #fff; background: #5193ff; } .sl-reply-textarea { height: 78px; overflow: auto; margin: 6px 0; border-bottom: 1px solid #ddd; border-radius: 2px; line-height: 20px; font-size: 15px; color: #919191; outline: none; -webkit-user-select: auto; user-select: auto; } .sl-reply-textarea img { display: inline-block; width: 24px; vertical-align: middle; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var slReply = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "sl-reply" }, [_vm.textPosition == 'top' ? _c('div', { staticClass: "sl-reply-textarea", attrs: { "contenteditable": "true", "onclick": "pgvSendClick({hottag:'ingame.comment.btn.huifu_kuang'});" }, on: { "focus": function focus($event) {
            _vm.showSticker = false;
        }, "blur": _vm.saveSelection, "input": _vm.input } }) : _vm._e(), _c('div', { staticClass: "sl-reply-btn" }, [_vm._t("default"), _c('div', { staticClass: "sl-reply-emotion", on: { "click": _vm.toggleSticker } }), _c('div', { staticClass: "sl-reply-submit", on: { "click": _vm.submit } }, [_vm._v("发布")])], 2), _vm.textPosition == 'bottom' ? _c('div', { staticClass: "sl-reply-textarea", attrs: { "contenteditable": "true", "onclick": "pgvSendClick({hottag:'ingame.comment.btn.huifu_kuang'});" }, on: { "focus": function focus($event) {
            _vm.showSticker = false;
        }, "blur": _vm.saveSelection, "input": _vm.input } }) : _vm._e(), _c('sl-sticker', { directives: [{ name: "show", rawName: "v-show", value: _vm.showSticker, expression: "showSticker" }], on: { "select": _vm.selectSticker } })], 1);
    }, staticRenderFns: [],
        components: {
            slSticker: slSticker
        },
        props: {
            value: [String],
            textPosition: {
                type: String,
                default: 'top'
            }
        },
        data: function data() {
            return {
                showSticker: false,
                cursorPosition: null, // 光标位置
                d_textarea: null // 輸入框 dom
            };
        },

        watch: {
            'value': function value(newVal, oldVal) {

                // 清空编辑框内容或者回复时触发
                if (!newVal || !oldVal && !this.d_textarea.innerHTML) {
                    this.d_textarea.innerHTML = newVal;
                }
            }
        },
        mounted: function mounted() {
            this.d_textarea = this.$el.querySelector('.sl-reply-textarea');
        },

        methods: {
            input: function input() {
                this.$emit('input', this.d_textarea.innerHTML);
            },
            saveSelection: function saveSelection() {
                var range = window.getSelection().getRangeAt(0);
                if (range.startContainer == this.d_textarea || range.startContainer.parentNode == this.d_textarea) {
                    this.cursorPosition = range;
                }
            },
            toggleSticker: function toggleSticker() {
                var _this = this;

                window.pgvSendClick({ hottag: 'ingame.comment.btn.biaoqing' });
                this.showSticker = !this.showSticker;
                this.$nextTick(function () {
                    if (_this.showSticker) {

                        // 未选中编辑框，直接输入表情
                        if (!_this.cursorPosition) {
                            var range = document.createRange();
                            range.setStart(_this.d_textarea, 0);
                            _this.cursorPosition = range;
                        }
                    } else {
                        var selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(_this.cursorPosition);
                        _this.d_textarea.focus();
                    }
                });
            },
            selectSticker: function selectSticker(target) {
                var newNode = target.cloneNode();
                this.cursorPosition.insertNode(newNode);
                this.cursorPosition.setStartAfter(newNode);
                this.$emit('input', this.d_textarea.innerHTML);
            },
            submit: function submit() {
                this.showSticker = false;
                this.$emit('submit');
            }
        }
    };

    /**
     * @file 回复面板
     * @author hardylin <hardylin@tencent.com>
     */

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .vc-item { padding-top: 12px; font-size: 12px; background: linear-gradient(180deg, #28354d, #28354d 66.6%, transparent 66.6%) no-repeat top / 100% 1px; } .vc-item--text { margin: 0 6px; color: #5193ff; } .vc-item--text-btn { display: flex; justify-content: flex-end; margin: 12px 0; } .vc-item--header { display: flex; color: #687382; } .vc-item--avatar { flex: none; width: 30px; height: 30px; border-radius: 50%; margin-right: 6px; background: no-repeat center / contain; } .vc-item--user { flex: auto; overflow: hidden; } .vc-item--name { display: flex; align-items: center; } .vc-item--office { flex: none; width: 20px; height: 20px; background: url(//ossweb-img.qq.com/images/js/bsCommonFiles/images/official.png) no-repeat center / 120% 120%; } .vc-item--time { margin-left: 6px; } .vc-item--like, .vc-item--reply { flex: none; display: flex; align-items: center; padding: 0 6px; } .vc-item--like [class|=\"icon-heart\"] { width: 12px; height: 11px; margin-left: 4px; background: url(//ossweb-img.qq.com/images/yxzj/ingame/res/icon_xin_Kong.png) no-repeat center / 100% 100%; } .vc-item--like .icon-heart-full { background-image: url(//ossweb-img.qq.com/images/yxzj/ingame/res/icon_xin.png); } .vc-item--reply { position: relative; } .vc-item--reply .icon-reply { width: 15px; height: 9px; background: url(//ossweb-img.qq.com/images/js/bsCommonFiles/images/comment/comment-sprite.png) no-repeat -64px -40px / 134px 60px; } .vc-item--pop { position: absolute; top: -5px; right: 24px; width: 134px; height: 40px; font-size: 0; background: url(//ossweb-img.qq.com/images/js/bsCommonFiles/images/comment/comment-sprite.png) no-repeat 0 0 / 134px 60px; } .vc-item--pop .pop-btn { display: inline-block; width: 42px; height: 100%; } .vc-item--body { margin: 6px 0 12px 42px; } .vc-item--content { word-break: break-all; } .vc-item .vc-item { margin-left: 42px; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var commentItem = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "vc-item" }, [_c('div', { staticClass: "vc-item--header" }, [_c('div', { staticClass: "vc-item--avatar", style: { 'background-image': 'url(' + (_vm.avatar ? _vm.avatar : '//ossweb-img.qq.com/images/ingame/noimg.png') + ')' } }), _c('div', { staticClass: "vc-item--user" }, [_c('div', { staticClass: "vc-item--name" }, [_c('div', { staticClass: "vc-item--text comment-ellipsis" }, [_vm._v(_vm._s(_vm.comment.name || _vm.comment.repname))]), _vm.officialAccount[_vm.$comment._options.gameid] && _vm.officialAccount[_vm.$comment._options.gameid].indexOf(_vm.comment.commid) >= 0 ? _c('div', { staticClass: "vc-item--office" }) : _vm._e(), _vm.comment.passrepname ? [_c('div', { staticStyle: { "flex": "none" } }, [_vm._v("回复")]), _c('div', { staticClass: "vc-item--text comment-ellipsis" }, [_vm._v(_vm._s(_vm.comment.passrepname))])] : _vm._e()], 2), _c('div', { staticClass: "vc-item--time comment-ellipsis" }, [_vm._v(_vm._s(_vm._f("formatTime")(_vm.comment.ctime || _vm.comment.rtime)))])]), _vm.comment.ctime ? [_c('div', { staticClass: "vc-item--like", on: { "click": _vm.like } }, [_c('div', [_vm._v(_vm._s(_vm.comment.likenum))]), _c('div', { class: { 'icon-heart': !_vm.comment.oper_status, 'icon-heart-full': _vm.comment.oper_status } })]), _c('div', { staticClass: "vc-item--reply", on: { "click": function click$$1($event) {
            _vm.showPop = !_vm.showPop;
        } } }, [_c('div', { staticClass: "icon-reply" }), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showPop, expression: "showPop" }], staticClass: "vc-item--pop" }, [_c('div', { staticClass: "pop-btn", on: { "click": _vm.report } }), _c('div', { staticClass: "pop-btn", on: { "click": _vm.like } }), _c('div', { staticClass: "pop-btn", on: { "click": function click$$1($event) {
            _vm.reply(undefined);
        } } })])])] : _vm._e()], 2), _c('div', { staticClass: "vc-item--body" }, [_c('div', { staticClass: "vc-item--content", domProps: { "innerHTML": _vm._s(_vm.content) }, on: { "click": function click$$1($event) {
            _vm.reply(undefined);
        } } })]), _vm.comment.commid == _vm.openid || _vm.comment.repid == _vm.openid ? _c('div', { staticClass: "vc-item--text-btn" }, [_c('div', { staticClass: "vc-item--text", on: { "click": _vm.delComment } }, [_vm._v("删除")])]) : _vm._e(), _vm._l(_vm.comment.replys, function (item, index) {
            return _c('comment-item', { key: index, attrs: { "comment": item, "openid": _vm.openid, "officialAccount": _vm.officialAccount }, on: { "reply": _vm.reply, "delComment": function delComment($event) {
                _vm.delReply(item, index);
            } } });
        }), _vm.comment.rnum > 2 && _vm.more ? _c('div', { staticClass: "vc-item--text-btn" }, [_c('div', { staticClass: "vc-item--text", on: { "click": _vm.moreReply } }, [_vm._v("查看更多回复")])]) : _vm._e()], 2);
    }, staticRenderFns: [],
        name: 'comment-item',

        props: {
            comment: {
                type: Object,
                required: true
            },
            officialAccount: [Object]
        },

        data: function data() {
            return {
                showPop: false,
                more: true
            };
        },


        computed: {
            openid: function openid() {
                return this.$comment.userInfo.openid;
            },
            avatar: function avatar() {
                var str = this.comment.imgurl || this.comment.repimgurl;
                return str && str != '/96' && str != '／96' ? fullToHalf(str.replace(/^https?:/, '')) : '';
            },
            content: function content() {
                var str = this.comment.content.replace(/\[e:(\d+)\]/g, function ($1, $2) {
                    return '<img src="//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqemotion/' + $2 + '.png" style="width:20px;display:inline;">';
                });
                str = str.replace(/＜br＞/g, '<br>').replace(/＜br＞/g, '<br>').replace(/＆nbsp；/g, '');
                return fullToHalf(str);
            }
        },

        filters: {
            formatTime: function formatTime$$1(str) {
                str = parseInt(str);
                var today = new Date();
                var length = parseInt(today.getTime() / 1000) - str,
                    result = void 0;
                if (length < 60) {
                    result = '刚刚';
                } else if (length < 3600) {
                    result = parseInt(length / 60) + '分钟前';
                } else if (length < 18000) {
                    result = parseInt(length / 3600) + '小时前';
                } else if (length < 86400) {
                    result = today.getDate() === new Date(str * 1000).getDate() ? '今天' : '昨天';
                } else if (length < 172800) {
                    result = '昨天';
                } else {
                    result = formatTime(str * 1000, 'YYYY-M-D h:mm');
                }
                return result;
            }
        },

        methods: {
            like: function like() {
                var _this = this;

                window.pgvSendClick({ hottag: 'ingame.comment.btn.zan' });
                if (this.$comment._login.login_type) {
                    this.$comment.ajax({
                        url: 'LIKE',
                        data: {
                            ctime: this.comment.ctime,
                            commid: this.comment.commid,
                            action: this.comment.oper_status ? 'cancel' : 'digg'
                        },
                        success: function success() {
                            _this.$toast(_this.comment.oper_status ? '取消点赞成功' : '点赞成功', 'center');
                            _this.comment.likenum += _this.comment.oper_status ? -1 : 1;
                            _this.comment.oper_status = _this.comment.oper_status ? 0 : 1;
                        }
                    });
                } else {
                    this.$emit('login');
                }
            },
            report: function report() {
                if (this.$comment._login.login_type) {
                    if (this.comment.report_status == 1) {
                        this.$toast('您的举报已收到', 'center');
                        return;
                    }
                    this.$emit('report', this.comment);
                } else {
                    this.$emit('login');
                }
            },
            reply: function reply(_reply) {
                this.$emit('reply', this.comment, _reply);
            },
            delComment: function delComment() {
                this.$emit('delComment');
            },
            delReply: function delReply(reply, index) {
                var _this2 = this;

                this.$comment.ajax({
                    url: 'DELETE_REPLY',
                    data: {
                        ctime: this.comment.ctime,
                        commid: this.comment.commid,
                        repid: reply.repid,
                        rtime: reply.rtime
                    },
                    success: function success() {
                        _this2.comment.replys.splice(index, 1);
                        _this2.$toast('删除回复成功', 'center');
                    }
                });
            },
            moreReply: function moreReply() {
                var _this3 = this;

                if (this.more) {
                    this.$comment.ajax({
                        url: 'REPLY_LIST',
                        data: {
                            ctime: this.comment.ctime,
                            commid: this.comment.commid,
                            ltime: this.comment.replys[this.comment.replys.length - 1].rtime
                        },
                        success: function success(data) {
                            if (data.replys.length < _this3.$comment._options.num) {
                                _this3.more = false;
                            }
                            _this3.comment.replys = _this3.comment.replys.concat(data.replys);
                        }
                    });
                }
            }
        }
    };

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .comment-list--title { display: flex; align-items: center; height: 30px; font-size: 13px; color: #5193ff; background: linear-gradient(0deg, #5193ff, #5193ff 66.6%, transparent 66.6%) no-repeat bottom / 100% 1px; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var commentList = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "comment-list" }, [_c('div', { staticClass: "comment-list--title" }, [_vm._v(_vm._s(_vm.title))]), _c('div', { staticClass: "allComments" }, [_vm._l(_vm.comments, function (comment, index) {
            return _c('comment-item', { key: index, attrs: { "comment": comment, "officialAccount": _vm.officialAccount }, on: { "reply": _vm.reply, "report": _vm.report, "delComment": function delComment($event) {
                _vm.delComment(comment, index);
            }, "login": function login($event) {
                _vm.$emit('login');
            } } });
        }), !_vm.$comment.comments.more && _vm.comments.length == 0 ? _c('p', { staticClass: "none_tips" }, [_vm._v("暂时还没有人评论喔~")]) : _vm._e()], 2)]);
    }, staticRenderFns: [],
        components: {
            commentItem: commentItem
        },

        name: 'comment-list',

        props: {
            title: {
                type: String,
                default: '最新评论'
            },
            comments: {
                type: Array,
                required: true
            },
            officialAccount: [Object]
        },

        methods: {
            reply: function reply(floor, layer) {
                this.$emit('reply', floor, layer);
            },
            report: function report(comment) {
                this.$emit('report', comment);
            },


            /**
             * 删除评论
             * @param {Object} comment - 要删除的评论数据
             * @param {Number} index - 要删除的评论索引
             */
            delComment: function delComment(comment, index) {
                var _this = this;

                this.$comment.ajax({
                    url: 'DELETE_COMMENT',
                    data: {
                        ctime: comment.ctime,
                        commid: comment.commid
                    },
                    success: function success() {
                        _this.comments.splice(index, 1);
                        _this.$comment.comments.total -= 1;
                        _this.$toast('删除评论成功', 'center');
                    }
                });
            }
        }
    };

    /**
     * @file 工具类 - 滚动
     * @author hardylin <hardylin@tencent.com>
     */

    var scrollTop = 0;

// 允许页面滚动
    function allowScroll() {
        document.documentElement.classList.remove('comment-hidden');
        document.body.classList.remove('comment-hidden');
        document.body.scrollTop = scrollTop;
    }

// 阻止页面滚动
    function preventScroll() {
        scrollTop = document.body.scrollTop;
        document.body.classList.add('comment-hidden');
        document.documentElement.classList.add('comment-hidden');
    }

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .pop_reply { z-index: 980; position: fixed; top: 0; right: 0; bottom: 0; left: 0; font-size: 10px; color: #5c5c5c; background: #f7f7f7; } .pop_reply .sl-reply-textarea { padding: 6px; background: #fff; } .close_pop { flex: auto; padding: 0 12px; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var commentInput = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": "comment-animate--slide" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "pop_reply" }, [_c('sl-reply', { attrs: { "text-position": "bottom" }, on: { "submit": _vm.submit }, model: { value: _vm.content, callback: function callback($$v) {
            _vm.content = $$v;
        }, expression: "content" } }, [_c('strong', { staticClass: "close_pop", on: { "click": _vm.closePannel } }, [_vm._v("取消")])])], 1)]);
    }, staticRenderFns: [],
        components: {
            slReply: slReply
        },

        props: {
            show: {
                type: Boolean,
                required: true
            },
            // total: {
            //     type: Number,
            //     required: true
            // },
            floor: { // 所回复的评论的信息
                type: Object,
                default: {}
            },
            layer: { // 所回复的评论下的楼层的信息
                type: Object,
                default: {}
            }
        },

        data: function data() {
            return {
                content: '',
                maxLength: 200
            };
        },


        watch: {
            'show': function show(newVal) {
                var _this = this;

                if (newVal) {
                    if (this.layer.repname) {
                        this.content = '\u56DE\u590D ' + this.layer.repname + '\uFF1A';
                    } else if (this.floor.name) {
                        this.content = '\u56DE\u590D ' + this.floor.name + '\uFF1A';
                    }
                    this.$nextTick(function () {

                        // 动画执行完毕再聚焦（防止键盘提前弹出）
                        setTimeout(function () {
                            preventScroll();
                            var d_textarea = _this.$el.querySelector('.sl-reply-textarea');
                            var range = document.createRange();
                            range.setStart(d_textarea, _this.content ? 1 : 0);
                            var selection = window.getSelection();
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }, 500);
                    });
                } else {
                    allowScroll();
                    this.content = '';
                }
            }
        },

        // mounted() {

        //     // 防止 fixed 在 transform 下无效的问题 @todo
        //     document.body.appendChild(this.$el)
        // },

        methods: {
            closePannel: function closePannel() {
                window.pgvSendClick({ hottag: 'ingame.comment.btn.quxiao' });
                this.$emit('update:show', false);
            },
            submit: function submit() {
                var content = this.content.replace(/<img src="\/\/ossweb-img.qq.com\/images\/js\/bsCommonFiles\/images\/qqemotion\/(\d+)\.png".*?>/g, function ($1, $2) {
                    return '[e:' + $2 + ']';
                });
                content = content.trim();
                if (!content) {
                    return;
                }
                if (computeByteLength(content) > this.maxLength) {
                    this.$toast('\u56DE\u590D\u5185\u5BB9\u4E0D\u80FD\u8D85\u8FC7' + this.maxLength + '\u5B57\u7B26');
                    return;
                }
                if (this.floor.commid) {
                    content = content.replace(/回复 .+：/, '');
                    this.submitReply(content);
                } else {
                    this.submitComment(content);
                }
            },
            submitReply: function submitReply(content) {
                var _this2 = this;

                var userInfo = this.$comment.userInfo;

                this.$comment.ajax({
                    url: 'SUBMIT_REPLY',
                    data: {
                        ctime: this.floor.ctime,
                        commid: this.floor.commid,
                        remark: this.layer.repid,
                        repid: userInfo.openid,
                        content: content
                    },
                    success: function success(data) {
                        _this2.$toast('回复成功', 'center');
                        _this2.content = '';
                        _this2.floor.replys.push({
                            rtime: data.rtime,
                            content: data.content,
                            repid: userInfo.openid,
                            repimgurl: userInfo.avatar,
                            repname: userInfo.nickname,
                            passrepname: _this2.layer.repname
                        });
                        _this2.$emit('update:show', false);
                    }
                });
            },
            submitComment: function submitComment(content) {
                var _this3 = this;

                var userInfo = this.$comment.userInfo;

                this.$comment.ajax({
                    url: 'SUBMIT_COMMENT',
                    data: {
                        commid: userInfo.openid,
                        content: content
                    },
                    success: function success(data) {
                        _this3.$toast('发表成功', 'center');
                        _this3.content = '';
                        _this3.$comment._vm.comments.latest.unshift({
                            ctime: data.ctime,
                            content: data.content,
                            commid: userInfo.openid,
                            imgurl: userInfo.avatar,
                            name: userInfo.nickname,
                            rnum: 0,
                            likenum: 0,
                            oper_status: 0,
                            report_status: 0,
                            replys: []
                        });
                        _this3.$comment._vm.comments.total += 1;
                        _this3.$emit('update:show', false);
                    }
                });
            }
        }
    };

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .np-comment-report-pop { z-index: 980; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,.6); overflow: auto; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var commentReport = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": "comment-animate--slide" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "np-comment-report-pop" }, [_c('div', { staticClass: "np-comment-report-bd" }, [_c('div', { staticClass: "report-title" }, [_c('a', { staticClass: "report-title-back", attrs: { "href": "javascript:;", "title": "返回" }, on: { "click": _vm.closeReport } }, [_vm._v("<")]), _vm._v("举报 ")]), _c('div', { staticClass: "report-bd" }, [_c('h6', [_vm._v("请选择举报内容：")]), _vm._l(_vm.reportObj, function (item, index) {
            return _c('ul', { key: index, staticClass: "report-options", attrs: { "onclick": "pgvSendClick({hottag:'ingame.comment.btn.jvbao_xuanze'});" } }, [_c('li', { class: { selected: _vm.reportOption == index }, on: { "click": function click($event) {
                _vm.reportOption = index;
            } } }, [_c('span', [_vm._v(_vm._s(item))]), _c('div', { staticClass: "report-options-item" })])]);
        }), _c('div', { staticClass: "report-action" }, [_c('a', { staticClass: "report-sumbit", attrs: { "href": "javascript:;", "title": "提交" }, on: { "click": _vm.submit } }, [_vm._v("提交")])])], 2)])])]);
    }, staticRenderFns: [],
        name: 'comment-report',

        props: {
            show: {
                type: Boolean,
                required: true
            },
            floor: { // 所举报的评论的信息
                type: Object,
                default: {}
            }
        },

        data: function data() {
            return {
                reportObj: ['反动', '欺诈', '广告', '恶意营销', '色情低俗', '常识性谣言', '其他'],
                reportOption: -1
            };
        },


        watch: {
            'show': function show(newVal) {
                if (newVal) {
                    preventScroll();
                    this.reportOption = -1;
                } else {
                    allowScroll();
                }
            }
        },

        // mounted() {

        //     // 防止 fixed 在 transform 下无效的问题 @todo
        //     document.body.appendChild(this.$el)
        // },

        methods: {
            closeReport: function closeReport() {
                window.pgvSendClick({ hottag: 'ingame.comment.btn.jvbao_fanhui' });
                this.$emit('update:show', false);
            },
            submit: function submit() {
                var _this = this;

                window.pgvSendClick({ hottag: 'ingame.comment.btn.jvbao_tijiao' });
                if (this.reportOption < 0) {
                    this.$toast('请选择举报内容');
                    return;
                }
                this.$comment.ajax({
                    url: 'REPORT',
                    data: {
                        ctime: this.floor.ctime,
                        commid: this.floor.commid,
                        remark: encodeURIComponent(this.reportObj[this.reportOption])
                    },
                    success: function success() {
                        _this.$toast('举报成功', 'center');
                        _this.floor.report_status = 1;
                        _this.$emit('update:show', false);
                    }
                });
            }
        }
    };

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .comment-login { display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 990; position: fixed; top: 0; right: 0; bottom: 0; left: 0; font-size: 14px; color: #fff; background: rgba(0, 0, 0, 0.6); } .comment-login--close { position: absolute; top: 0; right: 0; padding: 10px; } .comment-login--btn { display: block; width: 150px; height: 36px; margin: 5px 0; background: no-repeat center / contain; } .comment-login--btn#ptLoginBtn { background-image: url(//ossweb-img.qq.com/images/js/bsCommonFiles/images/qqlogin.png); } .comment-login--btn#wxloginBtn { background-image: url(//ossweb-img.qq.com/images/js/bsCommonFiles/images/wxlogin.png); } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var _window = window;
    var milo = _window.milo;
    var need = _window.need;


    var commentLogin = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.show, expression: "show" }], staticClass: "comment-login" }, [_c('div', { staticClass: "comment-login--close", on: { "click": function click$$1($event) {
            _vm.$emit('update:show', false);
        } } }, [_vm._v("关闭")]), _c('a', { staticClass: "comment-login--btn", attrs: { "id": "ptLoginBtn", "href": "javascript:;" } }), _c('a', { staticClass: "comment-login--btn", attrs: { "id": "wxloginBtn", "href": "javascript:;" } })]);
    }, staticRenderFns: [],
        name: 'comment-login',

        props: {
            show: {
                type: Boolean,
                default: false
            }
        },

        mounted: function mounted() {
            this.initLogin();

            // 防止 fixed 在 transform 下无效的问题
            document.body.appendChild(this.$el);
        },


        methods: {
            initLogin: function initLogin() {
                var _this = this;

                var login = this.$comment._config.login;


                {
                    var silent = Vue.config.silent;

                    Vue.config.silent = true; // 防止 Vue 捕获自定义错误，重复显示错误信息
                    assert(milo && need, '缺少 milo，请引入：//ossweb-img.qq.com/images/js/mobile_bundle/milo.js');
                    assert(login && (login.wxappid || login.qqappid), '未检测到 MSDK 登录态，若需使用 微信 / QQ 登陆授权，构造函数参数需要包含 `login.wxappid` 与 `login.qqappid`');
                    Vue.config.silent = silent;
                }

                need('biz.login', function (LoginManager) {
                    _this.$comment.LoginManager = LoginManager;
                    LoginManager.init({
                        appConfig: {
                            QQBrowserAppId: 106, // 在 QQ 浏览器端申请的 appid，保持不变
                            WxAppId: login.wxappid, // 需要申请微信 openLink 权限，联系人：johnnyliu(刘南江)
                            AppName: login.appName || '',
                            scope: login.scope || 'snsapi_userinfo', // milo 默认是 snsapi_base 静默授权
                            LogoUrl: login.logoUrl || ''
                        }
                    });

                    LoginManager.checkLogin(function (user) {
                        if (milo.cookie.get('acctype') == 'wx' || milo.cookie.get('access_token') || milo.cookie.get('accessToken')) {
                            _this.loginByWechat(LoginManager);
                        } else {
                            _this.loginByQQ(LoginManager, user);
                        }
                    }, function () {
                        _this.autoLogin();

                        // QQ 浏览器特殊处理：登陆授权之后留在 QQ 浏览器内部浏览
                        if (browser.qqBrowser) {
                            var loginCallbackByQQBrowser = LoginManager.loginCallbackByQQBrowser;

                            LoginManager.loginCallbackByQQBrowser = function (data) {
                                loginCallbackByQQBrowser(data);
                                setTimeout(function () {
                                    location.reload();
                                }, 200);
                            };
                        }
                    });
                });
            },


            /**
             * 微信登录授权
             * @param {Object} LoginManager - milo 登录管理对象
             */
            loginByWechat: function loginByWechat(LoginManager) {
                var _this2 = this;

                var openid = milo.cookie.get('appOpenId') || milo.cookie.get('openid');
                var access_token = navigator.userAgent.indexOf('GameHelper') >= 0 ? milo.cookie.get('accessToken') : milo.cookie.get('access_token');
                this.$comment._vm.userInfo.openid = openid;
                this.$comment._login = {
                    access_token: access_token,
                    appid: this.$comment._config.login.wxappid,
                    login_type: 'wxm'
                };
                this.$comment.requestCommentList();

                // 获取用户头像昵称
                LoginManager.getUserInfoByWxOpenId({
                    openid: openid,
                    access_token: access_token
                }, function (wxuser) {
                    _this2.$comment._vm.userInfo.avatar = wxuser.headimgurl ? wxuser.headimgurl + '/96' : '';
                    _this2.$comment._vm.userInfo.nickname = wxuser.nickname && wxuser.nickname.replace(/<span class="emoji emoji(.)*?"><\/span>/g, '*');
                });
            },


            /**
             * QQ 登录授权
             * @param {Object} LoginManager - milo 登录管理对象
             * @param {Object} user - milo 登录成功的用户信息对象
             */
            loginByQQ: function loginByQQ(LoginManager, user) {
                var _this3 = this;

                this.$comment._login = {
                    uin: milo.cookie.get('uin'),
                    skey: milo.cookie.get('skey'),
                    appid: this.$comment._config.login.qqappid,
                    login_type: 'qqm'
                };

                this.$comment.ajax({
                    url: 'USER_INFO',
                    success: function success(data) {
                        _this3.$comment._vm.userInfo.openid = data.openid;
                        _this3.$comment.requestCommentList();
                    }
                });

                // 获取用户头像昵称
                if (user.nickName) {
                    user.nickName = decodeURIComponent(user.nickName).replace(/<span class="emoji emoji(.)*?"><\/span>/g, '*');
                }
                this.$comment._vm.userInfo.nickname = user.nickName || getUrlParam('nickname') || getUrlParam('roleName') || '路人甲';
                LoginManager.getUserFace(function (data) {
                    _this3.$comment._vm.userInfo.avatar = data.userFace;
                });
            },
            autoLogin: function autoLogin() {
                if (browser.wechat) {
                    click(this.$el.querySelector('#wxloginBtn'));
                } else if (browser.qq) {
                    click(this.$el.querySelector('#ptLoginBtn'));
                } else {
                    this.$comment.requestCommentList();
                }
            }
        }
    };

    (function () {
        if (typeof document !== 'undefined') {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = " .comment-main { padding: 15px; } .comment-header { display: flex; justify-content: space-between; align-items: center; } .comment-header--text { margin-right: 12px; } .comment-header--num { font-size: 13px; color: #687382; } .comment-header--num span { font-size: 12px; } .comment-header--tip { margin: 6px 0; font-size: 9px; color: #505050; } .comment-main--tips { display: flex; justify-content: center; align-items: center; height: 30px; font-size: 14px; } .comment-main .sl-reply { margin: 12px 0; } .allComments > .vc-item:first-child { background: none; } ";style.type = 'text/css';if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }head.appendChild(style);
        }
    })();

    var Main = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "comment-main np-frame" }, [_c('header', { staticClass: "comment-header" }, [_c('div', { staticClass: "comment-header--text" }, [_c('p', { staticClass: "comment-header--num" }, [_vm._v("网友评论"), _c('span', [_vm._v("（" + _vm._s(_vm.total) + "条评论）")])]), _c('p', { staticClass: "comment-header--tip" }, [_vm._v("*请不要轻信评论中出现的充值，代练等虚假信息")])]), this.$comment._config.replyMode == 'button' ? _c('comment-add-button') : _vm._e()], 1), _vm.$comment._config.replyMode == 'inline' ? _c('comment-reply', { on: { "submit": _vm.submitComment }, model: { value: _vm.reply.content, callback: function callback($$v) {
            _vm.$set(_vm.reply, "content", $$v);
        }, expression: "reply.content" } }) : _vm._e(), _vm.hot.length > 0 ? _c('comment-list', { attrs: { "comments": _vm.hot, "officialAccount": _vm.officialAccount, "title": "热门评论" }, on: { "login": function login($event) {
            _vm.login.show = true;
        }, "reply": _vm.openReply, "report": _vm.openReport } }) : _vm._e(), _c('comment-list', { attrs: { "comments": _vm.latest, "officialAccount": _vm.officialAccount }, on: { "login": function login($event) {
            _vm.login.show = true;
        }, "reply": _vm.openReply, "report": _vm.openReport } }), _c('div', { staticClass: "comment-main--tips" }, [_c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.$comment.comments.more && !_vm.$comment.comments.busy, expression: "$comment.comments.more && !$comment.comments.busy" }], on: { "click": _vm.requestComments } }, [_vm._v(_vm._s(_vm.$comment._config.infinite == 'click' ? '点击' : '上拉') + "显示更多")]), _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.$comment.comments.busy, expression: "$comment.comments.busy" }] }, [_vm._v("正在加载...")]), !_vm.$comment.comments.more && _vm.$comment.comments.latest.length > 0 ? _c('span', [_vm._v("已显示全部评论")]) : _vm._e()]), this.$comment._config.replyMode == 'bar' ? _c('comment-add-bar') : _vm._e(), _c('comment-input', { attrs: { "show": _vm.input.show, "floor": _vm.input.floor, "layer": _vm.input.layer }, on: { "update:show": function updateShow($event) {
            _vm.$set(_vm.input, "show", $event);
        } } }), _c('comment-report', { attrs: { "show": _vm.report.show, "floor": _vm.report.floor }, on: { "update:show": function updateShow($event) {
            _vm.$set(_vm.report, "show", $event);
        } } }), _vm.$comment._login.login_type != 'msdk' ? _c('comment-login', { attrs: { "show": _vm.login.show }, on: { "update:show": function updateShow($event) {
            _vm.$set(_vm.login, "show", $event);
        } } }) : _vm._e()], 1);
    }, staticRenderFns: [],
        components: {
            commentReply: slReply,
            commentAddBar: commentAddBar,
            commentAddButton: commentAddButton,
            commentList: commentList,
            commentInput: commentInput,
            commentReport: commentReport,
            commentLogin: commentLogin
        },

        name: 'comment-main',

        data: function data() {
            return {
                login: {
                    show: false
                },
                input: {
                    show: false,
                    floor: {},
                    layer: {}
                },
                report: {
                    show: false,
                    floor: {}
                },
                reply: {
                    content: '',
                    maxLength: 200
                },
                officialAccount: {}
            };
        },


        computed: {
            total: function total() {
                return this.$comment.comments.total;
            },
            hot: function hot() {
                return this.$comment.comments.hot;
            },
            latest: function latest() {
                return this.$comment.comments.latest;
            }
        },

        mounted: function mounted() {
            this.infinite();
            this.eventListener();
        },
        beforeDestroy: function beforeDestroy() {
            var _$comment$_config$inf = this.$comment._config.infinite,
                infinite = _$comment$_config$inf === undefined ? 'scroll' : _$comment$_config$inf;

            if (infinite == 'scroll') {
                window.removeEventListener('scroll', this.scrollEvent);
            }
        },


        methods: {
            infinite: function infinite() {
                var _$comment$_config$inf2 = this.$comment._config.infinite,
                    infinite = _$comment$_config$inf2 === undefined ? 'scroll' : _$comment$_config$inf2;

                if (infinite == 'scroll') {
                    window.addEventListener('scroll', this.scrollEvent.bind(this));
                }
            },
            scrollEvent: function scrollEvent() {
                if (Math.max(document.body.scrollTop, document.documentElement.scrollTop) > document.body.offsetHeight - window.innerHeight * 1.5) {
                    this.$comment.requestCommentList();
                }
            },
            eventListener: function eventListener() {
                var _this = this;

                // 弹出输入框
                this.$comment._vm.$on('input', function (parent) {
                    if (parent != _this) {
                        return; // 防止 keep-alive 时同时响应事件
                    }
                    window.pgvSendClick({ hottag: 'ingame.comment.btn.announce' });
                    if (_this.$comment._login.login_type) {
                        _this.input.floor = {};
                        _this.input.show = true;
                    } else {
                        _this.login.show = true;
                    }
                });

                // 弹出登录界面
                this.$comment._vm.$on('login', function () {
                    _this.login.show = true;
                });
            },
            requestComments: function requestComments() {
                if (this.$comment._config.infinite == 'click') {
                    this.$comment.requestCommentList();
                }
            },
            submitComment: function submitComment() {
                var _this2 = this;

                if (this.$comment._login.login_type) {
                    var content = this.reply.content.replace(/<img src="\/\/ossweb-img.qq.com\/images\/js\/bsCommonFiles\/images\/qqemotion\/(\d+)\.png".*?>/g, function ($1, $2) {
                        return '[e:' + $2 + ']';
                    });
                    content = content.trim();
                    if (!content) {
                        return;
                    }
                    if (computeByteLength(content) > this.reply.maxLength) {
                        this.$toast('\u56DE\u590D\u5185\u5BB9\u4E0D\u80FD\u8D85\u8FC7' + this.reply.maxLength + '\u5B57\u7B26');
                        return;
                    }
                    var userInfo = this.$comment.userInfo;

                    this.$comment.ajax({
                        url: 'SUBMIT_COMMENT',
                        data: {
                            commid: userInfo.openid,
                            content: content
                        },
                        success: function success(data) {
                            _this2.$toast('发表成功', 'center');
                            _this2.reply.content = '';
                            _this2.$comment._vm.comments.latest.unshift({
                                ctime: data.ctime,
                                content: data.content,
                                commid: userInfo.openid,
                                imgurl: userInfo.avatar,
                                name: userInfo.nickname,
                                rnum: 0,
                                likenum: 0,
                                oper_status: 0,
                                report_status: 0,
                                replys: []
                            });
                            _this2.$comment._vm.comments.total += 1;
                        }
                    });
                } else {
                    this.login.show = true;
                }
            },
            openReply: function openReply(floor, layer) {
                if (this.$comment._login.login_type) {
                    this.input.floor = floor;
                    this.input.layer = layer ? layer : {};
                    this.input.show = true;
                } else {
                    this.login.show = true;
                }
            },
            openReport: function openReport(floor) {
                this.report.floor = floor;
                this.report.show = true;
            }
        }
    };

    /**
     * @file 评论组件安装模块
     * @author hardylin <hardylin@tencent.com>
     */

    var _Vue = null;

    function install(Vue$$1) {
        if (_Vue) return;

        {
            assert(Vue$$1.version >= '2.3', 'vue 版本必须大于 2.3.0');
        }

        _Vue = Vue$$1;

        Vue$$1.mixin({
            beforeCreate: function beforeCreate() {
                var options = this.$options;
                if (options.comment) {
                    this.$comment = options.comment;
                } else if (options.parent && options.parent.$comment) {
                    this.$comment = options.parent.$comment;
                }
            }
        });

        // 防止与其他插件提供的 $toast 方法冲突
        if (!Vue$$1.prototype.$toast) {
            Vue$$1.prototype.$toast = ToastInstance;
        }

        Vue$$1.component('comment-barrage', Barrage);
        Vue$$1.component('comment-add-bar', commentAddBar);
        Vue$$1.component('comment-add-button', commentAddButton);
        Vue$$1.component('comment-main', Main);
    }

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * @file 评论组件入口
     * @author hardylin <hardylin@tencent.com>
     */

    var $ = window.$;

    {
        assert($, '缺少 zepto，请引入：//ossweb-img.qq.com/images/js/bsCommonFiles/library/zepto/zepto-1.2.0.min.js');
    }

    var Comment = function () {
        _createClass(Comment, null, [{
            key: 'install',
            value: function install$$1() {}
            // 静态方法，用于 Vue 插件安装


            /**
             * @constructs Comment
             * @param {Object} config - 参数配置项
             */

        }]);

        function Comment(config) {
            _classCallCheck(this, Comment);

            this._config = config;
            this._config.replyMode = config.replyMode || 'bar';
            this._options = config.options || {};
            this._options.num = this._options.num || 8;
            this._login = {};
            this._vm = new Vue({
                data: {
                    comments: {
                        hot: [],
                        latest: [],
                        total: 0,
                        busy: false, // 是否正在请求
                        more: true // 是否还有更多
                    },
                    userInfo: {
                        openid: '',
                        avatar: '',
                        nickname: ''
                    }
                }
            });

            // 有登录态与资源 id 则自动请求首页评论
            if (this._isMSDK() && this._options.hasOwnProperty('objid')) {
                this.requestCommentList();
            }

            if (config.el) {
                new Vue({
                    el: config.el,
                    comment: this,
                    render: function render(h) {
                        return h('comment-main');
                    }
                });
            }
        }

        /**
         * ajax 请求封装
         * @param {Object} options - ajax 请求参数，选项与 jquery / zepto 一致
         */


        _createClass(Comment, [{
            key: 'ajax',
            value: function ajax() {
                var _this = this;

                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


                // 清除无用的 appid（王者助手 app 特殊逻辑）
                var _window = window,
                    milo = _window.milo;

                if (milo && milo.cookie.get('appid') === '') {
                    milo.cookie.clear('appid', 'qq.com', '/');
                }

                var url = options.url,
                    _options$data = options.data,
                    data = _options$data === undefined ? {} : _options$data,
                    success = options.success,
                    error = options.error;

                options.dataType = 'jsonp';
                options.url = API[url] + (this._login.login_type == 'msdk' ? sessionStorage.tokenParams : '');

                // 处理 ajax 请求参数
                options.data = $.extend({
                    title: document.title,
                    busikey: 'all_mobile',
                    channel: 1,
                    hotlevel: 10,
                    hotnum: 3,
                    sandbox: 1
                }, this._options, data, this._login);
                if (this._login.login_type && this._login.login_type != 'msdk') {
                    options.data.openid = this.userInfo.openid;
                }
                if (url != 'COMMENT_LIST' && url != 'REPLY_LIST') {
                    delete options.data.num;
                    delete options.data.hotlevel;
                    delete options.data.hotnum;
                } else {
                    assert(options.data.num >= 5 && options.data.num <= 10, '配置参数项 `options.num` 可选值范围为 5 - 10');
                }
                if (url == 'SUBMIT_COMMENT' || url == 'SUBMIT_REPLY') {
                    options.data.avatar = this.userInfo.avatar;
                    options.data.nickname = this.userInfo.nickname;
                }

                // 拼接 `objid` 与 `moduleId`
                options.data.objid += '_' + options.data.moduleId;
                delete options.data.moduleId;

                options.success = function (result) {
                    if (result.status == 'SUCCESS') {
                        typeof success == 'function' && success(result.data);
                    } else {
                        if (typeof error == 'function') {
                            error(result);
                        } else {
                            var _data = result.data;

                            if (_data && _data.code == -1024) {
                                _this._vm.$toast('登录态已失效');
                                _this.LoginManager && _this.LoginManager.logout(); // 解决跳转 QQ 登录页面白屏又跳回来的问题
                                _this._vm.$emit('login');
                            } else if (_data && _data.code == 3000) {
                                _this._vm.$toast('您的账号存在违规操作，暂时无法使用评论功能！', 'center');
                            } else {
                                _this._vm.$toast(result.msg, 'center');
                            }
                        }
                    }
                };

                $.ajax(options);
            }

            // 判断是否为 MSDK 登录

        }, {
            key: '_isMSDK',
            value: function _isMSDK() {
                var _this2 = this;

                var search = '';
                if (sessionStorage.tokenParams && sessionStorage.tokenParams.indexOf('msdkEncodeParam=') >= 0) {
                    search = sessionStorage.tokenParams;
                } else if (sessionStorage.dataSearch && sessionStorage.dataSearch.indexOf('msdkEncodeParam=') >= 0) {
                    search = sessionStorage.dataSearch;
                } else if (location.search.indexOf('msdkEncodeParam=') >= 0) {
                    search = location.search;
                }
                if (search) {
                    sessionStorage.tokenParams = search;
                    sessionStorage.dataSearch = search;

                    // 登录类型（msdk：默认值，wxapp：微信小程序，wxpc：pc 官网微信，wxm：移动官网微信，qqpc：pc 官网 QQ，qqm：移动官网 QQ）
                    this._login.login_type = 'msdk';

                    this.ajax({
                        url: 'USER_INFO',
                        success: function success(data) {
                            _this2._vm.userInfo = {
                                openid: getUrlParam('openid', search),
                                avatar: data.avatar,
                                nickname: data.nickname
                            };
                        }
                    });
                    return true;
                } else {
                    return false;
                }
            }

            // 请求评论列表

        }, {
            key: 'requestCommentList',
            value: function requestCommentList() {
                var _this3 = this;

                {
                    assert(typeof this._options.gameid == 'string', '配置参数项 `options.gameid` 错误');
                    assert(/^\d{6}$/.test(this._options.stime), '配置参数项 `options.stime` 错误');
                    assert(/^\d{1,20}$/.test(this._options.objid), '配置参数项 `options.objid` 错误');
                    assert(typeof this._options.moduleId == 'string', '配置参数项 `options.moduleId` 错误');
                }

                var comments = this._vm.comments;

                if (comments.busy || !comments.more) {
                    return;
                }
                comments.busy = true;

                var data = {
                    ltime: comments.total ? comments.latest[comments.latest.length - 1].ctime : 0

                    // 判断是否为加载第一页
                };if (comments.total) {
                    data.action = 'list';
                } else {
                    data.action = 'init';
                }

                this.ajax({
                    url: 'COMMENT_LIST',
                    data: data,
                    success: function success(data) {
                        comments.latest = comments.latest.concat(data.latest);
                        if (comments.total) {
                            if (data.latest.length < _this3._options.num) {
                                comments.more = false;
                            }
                        } else {
                            comments.hot = data.hot;
                            comments.total = data.total_comment_num;
                            if (data.latest.length + data.hot.length < _this3._options.num) {
                                comments.more = false;
                            }
                        }
                        comments.busy = false;
                    }
                });
            }

            /**
             *
             * @param {Object} [config = {}] - 参数配置项，与构造函数一致
             */

        }, {
            key: 'refresh',
            value: function refresh() {
                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var _config$options = config.options,
                    options = _config$options === undefined ? {} : _config$options;

                $.extend(this._options, options);

                // 初始化
                this._vm.comments = {
                    hot: [],
                    latest: [],
                    total: 0,
                    busy: false,
                    more: true
                };
                this.requestCommentList();
            }
        }, {
            key: 'comments',
            get: function get() {
                return this._vm.comments;
            }
        }, {
            key: 'userInfo',
            get: function get() {
                return this._vm.userInfo;
            }
        }]);

        return Comment;
    }();

    Comment.install = install;
    Comment.version = version;

    if (window.Vue) {
        window.Vue.use(Comment);
    }

    return Comment;

})));
