/**
 * @authors H君
 * @date    2017-03-16 14:35:09
 * @version 0.0.1
 */

(function(global, factory) {

	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Action = factory());

}(this, function() {

	"use strict";

	// 版本号
	var Version = '0.0.1';

	// 操作列表层级
	var modalIndex = 1050;

	var Action = function(options) {

		// 默认配置
		var defaults = {
			id: 'modal' + new Date().getTime(),
			actions:[],
			backdrop: true, // 是否出现遮罩
			cancelButton: true, // 取消按钮
			cancelText: '取消', // 取消按钮文本
			complete: function() {}, // 完成打开操作列表后
			cancel: function() {} // 取消按钮回调
		}

		var options = extend(defaults, options);

		this.options = options;
		this.cancel = options.cancel;
		this.complete = options.complete;
		this.element = document.querySelectorAll('#' + options.id);
		this.init(this.options, this.element);

	}

	// 初始化
	Action.prototype.init = function(options, element) {

		var _self = this;

		//判断id是否存在
		if (element.length <= 0) {
			modalIndex++;
			_self.show(options, element);
		}

	}

	// 显示操作列表
	Action.prototype.show = function() {

		var _self = this,
			options = _self.options;

		// 创建操作列表盒子
		var _html = '',
			actionHtml = document.createElement("div");

		actionHtml.id = options.id;
		actionHtml.className = 'action ';
		actionHtml.style.zIndex = modalIndex - 1;

		// 操作列表内容区域
		_html += '<div class="action-menu">';

		options.summary ? _html += '<div class="action-summary">' + options.summary + '</div>' : '';
		if (options.actions instanceof Array) {
			_html += '<ul class="action-list">';
			options.actions.forEach(function(val,index){
				_html+='<li class="action-btn">'+val.name+'</li>';
			})
			_html += '</ul>';
		}

		// 操作列表取消按钮
		if (options.cancelButton) {
			_html += '<ul>' +'<li  class="action-cancel-' + options.id + '">'+options.cancelText+'</li></ul>';
		}
		_html += '</div>';

		actionHtml.innerHTML = _html;
		document.body.appendChild(actionHtml);

		setTimeout(function() {
			addClass(actionHtml, 'in');
		}, 10);

		if (typeof _self.complete == 'function') {
			_self.complete();
		}

		// 判断是否出现遮罩
		options.backdrop ? _self.backdrop(options) : '';

		//事件绑定
		_self.bindEvent(options);

	}

	// 隐藏弹出框
	Action.prototype.hide = function(id) {
		var _self = this,
			elememtId = id || this.options.id,
			modalElement = document.querySelector('#' + elememtId);

		removeClass(modalElement, 'in');
		setTimeout(function() {
			document.body.removeChild(modalElement);
			document.querySelectorAll('.action-backdrop-' + elememtId).length > 0 ? _self.hideBackDrop(elememtId) : '';
		}, 200)

	}

	// 显示遮罩
	Action.prototype.backdrop = function(options) {

		var elememtId = options.id;
		if (document.querySelectorAll('.action-backdrop-' + elememtId).length <= 0) {

			// 创建遮罩盒子
			var modalBackdrop = document.createElement("div");
			modalBackdrop.className = 'action-backdrop action-backdrop-' + elememtId;
			modalBackdrop.style.zIndex = modalIndex - 2;

			// 追加到body底部
			document.body.appendChild(modalBackdrop);
			addClass(document.body, 'action-open');

			setTimeout(function() {
				addClass(modalBackdrop, 'in');
			}, 0)


		}

	}

	// 隐藏遮罩
	Action.prototype.hideBackDrop = function(elememtId) {

		var _self = this,
			backdropElement = document.querySelector('.action-backdrop-' + elememtId);

		document.body.removeChild(backdropElement);
		if (document.querySelectorAll('.action-backdrop').length < 1) {
			removeClass(document.body, 'action-open');
		}

	}


	// 绑定事件
	Action.prototype.bindEvent = function(options) {

		var _self = this,
			elememtId = options.id;

		// 操作按钮
		var actionElement = document.querySelectorAll('.action-btn');
		if (actionElement.length > 0) {
			actionElement.forEach(function(val,index){
				actionElement[index].onclick = function() {
					if (typeof _self.cancel == 'function') {
						options.actions[index].callback();
						_self.hide(elememtId);
					}
				}
			})
			
		}

		// 点击取消按钮
		var cancelElement = document.querySelectorAll('.action-cancel-' + elememtId);
		if (cancelElement.length > 0) {
			cancelElement[0].onclick = function() {
				if (typeof _self.cancel == 'function') {
					_self.cancel();
					_self.hide(elememtId);
				}
			}
		}

		// 关闭操作
		var closeElement = document.querySelectorAll('.action-close-' + elememtId),
			backdropElement = document.querySelectorAll('.action-backdrop-' + elememtId);
		if (closeElement.length > 0) {
			closeElement[0].onclick = function() {
				_self.hide(elememtId);
			}
		}
		if (backdropElement.length > 0) {
			backdropElement[0].onclick = function() {
				_self.hide(elememtId);
			}

			backdropElement[0].ontouchmove = function(e) {
				e.preventDefault(); //阻止默认事件
			}
		}

	}

	// 防止冒泡
	function stopEvent(e) {
		if (!e) var e = window.event;
		if (e.stopPropagation) {
			// 兼容火狐
			e.stopPropagation();
		} else if (e) {
			// 兼容IE
			window.event.cancelBubble = true;
		}
	}

	// 合并对象
	function extend(to, from) {
		for (var key in from) {
			to[key] = from[key];
		}
		return to;
	}

	// 判断是否存在class
	function hasClass(obj, cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}

	// 添加class
	function addClass(obj, cls) {
		if (!hasClass(obj, cls)) obj.className += " " + cls;
	}

	// 移除class
	function removeClass(obj, cls) {
		if (hasClass(obj, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			obj.className = obj.className.replace(reg, ' ');
		}
	}

	return function(option) {
		new Action(option);
	};

}));