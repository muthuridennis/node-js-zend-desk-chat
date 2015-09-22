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
class ChatMessage extends React.Component {
	constructor(){
		super();
		this.state = {
			message: {
				type: 'recepient',
				text: 'Hi there. My name is Jane and I\'m here to help with any questions you might have regarding our service.'
			}
		}
	}

	render() {
		if (this.state.message.type == 'recepient') {
			return(
				<li className="recepient">
					<img src="/images/avatars/female-avatar-1.png" className="avatar" alt="recepient avatar"/>
					<span className="message">{this.state.message.text}</span>
				</li>
			);
		} else{
			return(
				<li className="sender">
                    <span className="message offset-right">{'Hi Paul. I don\'t understand your FAQ'}</span>
                </li>
			);
		}
	}
}

React.render(<ChatMessage/>, document.getElementById('messages-container'));