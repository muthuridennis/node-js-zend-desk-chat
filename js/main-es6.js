(function($) {
	let minimizeBtn = $('.window-controls .minimize');
	let maximizeBtn = $('.window-controls .expand');
	let chatBoxBody =  $('#chat-box .body');

	minimizeBtn.click(()=>{
		chatBoxBody.slideUp();
	});

	maximizeBtn.click(()=>{
		chatBoxBody.slideDown();
	})
})(jQuery);

// React code
class Recipient extends React.Component {
	render() {
		return(
			<li className="recepient">
				<img src="/images/avatars/female-avatar-1.png" className="avatar" alt="recepient avatar"/>
				<span className="message">{this.props.greetingText}</span>
			</li>
		);     
	}
}

let message = 'Hi there. My name is Jane and I\'m here to help with any questions you might have regarding our service.';

React.render(<Recipient	greetingText={message} />, document.getElementById('messages-container'));