'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

// React code

var Recipient = (function (_React$Component) {
	_inherits(Recipient, _React$Component);

	function Recipient() {
		_classCallCheck(this, Recipient);

		_get(Object.getPrototypeOf(Recipient.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Recipient, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'li',
				{ className: 'recepient' },
				React.createElement('img', { src: '/images/avatars/female-avatar-1.png', className: 'avatar', alt: 'recepient avatar' }),
				React.createElement(
					'span',
					{ className: 'message' },
					this.props.greetingText
				)
			);
		}
	}]);

	return Recipient;
})(React.Component);

var message = 'Hi there. My name is Jane and I\'m here to help with any questions you might have regarding our service.';

React.render(React.createElement(Recipient, { greetingText: message }), document.getElementById('messages-container'));
