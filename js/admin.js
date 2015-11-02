'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chatServerUrl = 'http://localhost:8081/';
var socket = io.connect(chatServerUrl);

var Header = (function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header() {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Header, [{
		key: 'setChatBoxWindowControlsEvents',
		value: function setChatBoxWindowControlsEvents() {
			var minimizeBtn = $('.window-controls .minimize');
			var maximizeBtn = $('.window-controls .expand');
			var chatBoxBody = $('#chat-box .body');

			minimizeBtn.click(function () {
				chatBoxBody.slideUp();
			});

			maximizeBtn.click(function () {
				chatBoxBody.slideDown();
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setChatBoxWindowControlsEvents();
		}
	}, {
		key: 'render',
		value: function render() {
			var title = 'Chicken House Admin';
			return React.createElement(
				'section',
				{ className: 'header' },
				React.createElement(
					'h3',
					{ className: 'title' },
					title
				),
				React.createElement(
					'div',
					{ className: 'window-controls' },
					React.createElement(
						'span',
						{ className: 'expand' },
						'+'
					),
					React.createElement(
						'span',
						{ className: 'minimize' },
						'-'
					)
				)
			);
		}
	}]);

	return Header;
})(React.Component);

var ChatMessage = (function (_React$Component2) {
	_inherits(ChatMessage, _React$Component2);

	function ChatMessage() {
		_classCallCheck(this, ChatMessage);

		_get(Object.getPrototypeOf(ChatMessage.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ChatMessage, [{
		key: 'render',
		value: function render() {
			var chatMessage = {
				sender: function sender(message) {
					return React.createElement(
						'li',
						{ className: 'recepient' },
						React.createElement('img', { src: '/images/avatars/female-avatar-1.png', className: 'avatar', alt: 'recepient avatar' }),
						React.createElement(
							'span',
							{ className: 'message' },
							message
						)
					);
				},
				recepient: function recepient(message) {
					return React.createElement(
						'li',
						{ className: 'sender' },
						React.createElement(
							'span',
							{ className: 'message offset-right' },
							message,
							React.createElement('br', null),
							React.createElement(
								'time',
								null,
								'1 min ago'
							)
						)
					);
				}
			};
			return chatMessage[this.props.messageType](this.props.messageText);
		}
	}]);

	return ChatMessage;
})(React.Component);

var ChatMessageList = (function (_React$Component3) {
	_inherits(ChatMessageList, _React$Component3);

	function ChatMessageList() {
		_classCallCheck(this, ChatMessageList);

		_get(Object.getPrototypeOf(ChatMessageList.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ChatMessageList, [{
		key: 'setScrollTop',
		value: function setScrollTop() {
			var messagesContainer = $("#messages-container");
			// initialize the scroll top of the messages container
			messagesContainer.scrollTop(0);
			// get the top offset of the latest message
			var verticalOffset = $("#messages-container li:last").offset().top;
			// set the new scroll top
			messagesContainer.scrollTop(verticalOffset);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.setScrollTop();
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'ul',
				{ className: 'no-style messages', id: 'messages-container' },
				this.props.messages.map(function (message, id) {
					return React.createElement(ChatMessage, { key: id, messageText: message.text, messageType: message.type });
				})
			);
		}
	}]);

	return ChatMessageList;
})(React.Component);

var ChatForm = (function (_React$Component4) {
	_inherits(ChatForm, _React$Component4);

	function ChatForm() {
		_classCallCheck(this, ChatForm);

		_get(Object.getPrototypeOf(ChatForm.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ChatForm, [{
		key: 'updateChatMessageList',

		// when a user presses enter the message gets appended to the chat message list
		value: function updateChatMessageList(event) {
			socket.emit('typing', 'admin typing...');
			// 13 is the Enter keycode
			if (event.keyCode === 13) {
				var message = {
					text: event.target.value,
					type: 'sender'
				};
				this.props.newMessage(message);
				socket.emit('chat message', message);
				event.target.value = "";
				event.preventDefault();
			};
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'footer' },
				React.createElement(
					'span',
					{ className: 'typing' },
					this.props.typing
				),
				React.createElement(
					'form',
					{ action: '', method: 'post', id: 'chat-message-form' },
					React.createElement('textarea', { onKeyDown: this.updateChatMessageList.bind(this), name: 'message' })
				)
			);
		}
	}]);

	return ChatForm;
})(React.Component);

var ChatBox = (function (_React$Component5) {
	_inherits(ChatBox, _React$Component5);

	function ChatBox() {
		_classCallCheck(this, ChatBox);

		_get(Object.getPrototypeOf(ChatBox.prototype), 'constructor', this).call(this);
		this.state = {
			chatMessages: [],
			typing: ''
		};
	}

	_createClass(ChatBox, [{
		key: 'isTyping',
		value: function isTyping(typing) {
			if (typing) {
				this.setState({
					typing: typing
				});
			} else {
				this.setState({
					typing: ''
				});
			};
		}

		// update message que
	}, {
		key: 'addMessageToList',
		value: function addMessageToList(message) {
			this.state.chatMessages.push(message);
			this.setState({
				chatMessages: this.state.chatMessages
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			socket.on('connect_error', function (error) {
				console.error('Problem contacting the server...');
			});

			socket.on('typing', (function (typing) {
				this.isTyping(typing);
			}).bind(this));

			socket.on('chat message', (function (chatMessage) {
				this.addMessageToList(chatMessage);
			}).bind(this));
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'aside',
				{ id: 'chat-box' },
				React.createElement(Header, null),
				React.createElement(
					'section',
					{ className: 'body' },
					React.createElement(ChatMessageList, { messages: this.state.chatMessages }),
					React.createElement(ChatForm, { typing: this.state.typing, newMessage: this.addMessageToList.bind(this) })
				)
			);
		}
	}]);

	return ChatBox;
})(React.Component);

React.render(React.createElement(ChatBox, null), document.body);
