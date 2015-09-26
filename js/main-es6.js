// React code
class Header extends React.Component {
	componentDidMount() {
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
	}

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

class ChatMessage extends React.Component {
	render(){
		let chatMessage = {
			business: (message) =>{
				return(
					<li className="recepient">
						<img src="/images/avatars/female-avatar-1.png" className="avatar" alt="recepient avatar"/>
						<span className="message">{message}</span>
					</li>
				)
			},
			customer: (message) =>{
				return(
					<li className="sender">
	            <span className="message offset-right">{message}</span>
	        </li>
				)
			}
		}
		return chatMessage[this.props.messageType](this.props.messageText);
	}
}

class ChatMessageList extends React.Component {
	constructor(){
		super();
		this.state = {
			chatMessages: [{
				text: 'Hi. I\'m Alice and we\'re here to help you use the site better',
				type: 'business'				
			}]
		}
	}

	render(){
		console.log('ChatMessageList >>> I was called');
		return(
		  	<ul className="no-style messages" id="messages-container">
					{this.state.chatMessages.map(function(message, id){
						console.log(message);
						return <ChatMessage key={id} messageText={message.text} messageType={message.type}/>;
					})}
				</ul>
		);
	}
}

class ChatForm extends React.Component {
	// when a user presses enter the message gets appended to the chat message list
	updateChatMessageList(event){
		// 13 is the Enter keycode
		if (event.keyCode === 13) {
			let message = [{
				text: event.target.value,
				type: 'customer' 
			}];
			console.log('ChatMessageList');

			event.target.value = "";
			event.preventDefault();
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

class ChatBox extends React.Component {
	render(){
		return(
			<aside id="chat-box">
				<Header/>
				<section className="body">
					<ChatMessageList/>
					<ChatForm/>
				</section>
			</aside>
		);
	}
}

React.render(<ChatBox/>, document.body);