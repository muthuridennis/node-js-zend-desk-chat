// React code
class Header extends React.Component {
	render(){
		let title = 'Chicken House Help';
		return(
			<section className="header">
				<h3 className="title">{title}</h3>
				<div className="window-controls">
					<span className="expand">+</span>
					<span className="minimize">-</span>
				</div>
			</section>
		);
	}
}

class ChatMessageList extends React.Component {
	constructor(){
		super();
		this.state = {
			chatMessages: [],
			chatMessage: {
				recepient: (message) =>{
					<li className="recepient">
						<img src="/images/avatars/female-avatar-1.png" className="avatar" alt="recepient avatar"/>
						<span className="message">{message}</span>
					</li>
				},
				sender: (message) =>{
					<li className="sender">
	                    <span className="message offset-right">{message}</span>
	                </li>
				}
			}
		}
	}

	render(){
		let chatMessageQue = this.state.chatMessages.push(this.state.chatMessage[this.props.messageType](this.props.messageText));
		console.log(typeof(this.state.chatMessages));
		return(
		  	<ul className="no-style messages" id="messages-container">
				{chatMessageQue}
			</ul>
		);
	}
}

class ChatForm extends React.Component {
	// when a user presses enter the message gets appended to the chat message list
	updateChatMessageList(event){
		// 13 is the Enter keycode
		if (event.keyCode === 13) {
			<ChatMessageList messageText={event.target.value} messageType={'sender'} />
			event.target.value = "";
		};
	}

	render(){
		return(
			<div className="footer">
				<form action="" method="post" id="chat-message-form">
					<textarea placeholder="Hi. I would like to receive help on ..." onKeyDown={this.updateChatMessageList} name="message"></textarea>
				</form>
			</div>
		);
	}
}

class ChatBoxBody extends React.Component {
	render(){
		let message = 'Hi there. My name is Jane and I\'m here to help with any questions you might have regarding our service.',
			type = 'recepient';
		return(
			<section className="body">
				<ChatMessageList messageText={message} messageType={type} />
				<ChatForm/>
			</section>
		);
	}
}

class ChatBox extends React.Component {
	render(){
		return(
			<aside id="chat-box">
				<Header/>
				<ChatBoxBody/>
			</aside>
		);
	}
}

React.render(<ChatBox/>, document.body);

// wait for elements to load before attaching event handlers
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