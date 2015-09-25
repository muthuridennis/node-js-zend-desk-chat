// React code
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = (function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header() {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Header, [{
		key: "render",
		value: function render() {
			var title = 'Chicken House Help';
			return React.createElement(
				"section",
				{ className: "header" },
				React.createElement(
					"h3",
					{ className: "title" },
					title
				),
				React.createElement(
					"div",
					{ className: "window-controls" },
					React.createElement(
						"span",
						{ className: "expand" },
						"+"
					),
					React.createElement(
						"span",
						{ className: "minimize" },
						"-"
					)
				)
			);
		}
	}]);

	return Header;
})(React.Component);

var ChatMessageList = (function (_React$Component2) {
	_inherits(ChatMessageList, _React$Component2);

	function ChatMessageList() {
		_classCallCheck(this, ChatMessageList);

		_get(Object.getPrototypeOf(ChatMessageList.prototype), "constructor", this).call(this);
		this.state = {
			chatMessages: [],
			chatMessage: {
				recepient: function recepient(message) {
					React.createElement(
						"li",
						{ className: "recepient" },
						React.createElement("img", { src: "/images/avatars/female-avatar-1.png", className: "avatar", alt: "recepient avatar" }),
						React.createElement(
							"span",
							{ className: "message" },
							message
						)
					);
				},
				sender: function sender(message) {
					React.createElement(
						"li",
						{ className: "sender" },
						React.createElement(
							"span",
							{ className: "message offset-right" },
							message
						)
					);
				}
			}
		};
	}

	_createClass(ChatMessageList, [{
		key: "render",
		value: function render() {
			var chatMessageQue = this.state.chatMessages.push(this.state.chatMessage[this.props.messageType](this.props.messageText));
			console.log(typeof this.state.chatMessages);
			return React.createElement(
				"ul",
				{ className: "no-style messages", id: "messages-container" },
				chatMessageQue
			);
		}
	}]);

	return ChatMessageList;
})(React.Component);

var ChatForm = (function (_React$Component3) {
	_inherits(ChatForm, _React$Component3);

	function ChatForm() {
		_classCallCheck(this, ChatForm);

		_get(Object.getPrototypeOf(ChatForm.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(ChatForm, [{
		key: "updateChatMessageList",

		// when a user presses enter the message gets appended to the chat message list
		value: function updateChatMessageList(event) {
			// 13 is the Enter keycode
			if (event.keyCode === 13) {
				React.createElement(ChatMessageList, { messageText: event.target.value, messageType: 'sender' });
				event.target.value = "";
			};
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "footer" },
				React.createElement(
					"form",
					{ action: "", method: "post", id: "chat-message-form" },
					React.createElement("textarea", { placeholder: "Hi. I would like to receive help on ...", onKeyDown: this.updateChatMessageList, name: "message" })
				)
			);
		}
	}]);

	return ChatForm;
})(React.Component);

var ChatBoxBody = (function (_React$Component4) {
	_inherits(ChatBoxBody, _React$Component4);

	function ChatBoxBody() {
		_classCallCheck(this, ChatBoxBody);

		_get(Object.getPrototypeOf(ChatBoxBody.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(ChatBoxBody, [{
		key: "render",
		value: function render() {
			var message = 'Hi there. My name is Jane and I\'m here to help with any questions you might have regarding our service.',
			    type = 'recepient';
			return React.createElement(
				"section",
				{ className: "body" },
				React.createElement(ChatMessageList, { messageText: message, messageType: type }),
				React.createElement(ChatForm, null)
			);
		}
	}]);

	return ChatBoxBody;
})(React.Component);

var ChatBox = (function (_React$Component5) {
	_inherits(ChatBox, _React$Component5);

	function ChatBox() {
		_classCallCheck(this, ChatBox);

		_get(Object.getPrototypeOf(ChatBox.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(ChatBox, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"aside",
				{ id: "chat-box" },
				React.createElement(Header, null),
				React.createElement(ChatBoxBody, null)
			);
		}
	}]);

	return ChatBox;
})(React.Component);

React.render(React.createElement(ChatBox, null), document.body);

// wait for elements to load before attaching event handlers
(function ($) {
	var minimizeBtn = $('.window-controls .minimize');
	var maximizeBtn = $('.window-controls .expand');
	var chatBoxBody = $('#chat-box .body');

	minimizeBtn.click(function () {
		chatBoxBody.slideUp();
	});

	maximizeBtn.click(function () {
		chatBoxBody.slideDown();
	});
})(jQuery);
