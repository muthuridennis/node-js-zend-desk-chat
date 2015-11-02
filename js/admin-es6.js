let chatServerUrl = 'http://localhost:8081/'
let socket = io.connect(chatServerUrl);

class Header extends React.Component {
	setChatBoxWindowControlsEvents(){
			let minimizeBtn = $('.window-controls .minimize');
			let maximizeBtn = $('.window-controls .expand');
			let chatBoxBody =  $('#chat-box .body');

			minimizeBtn.click(()=>{
				chatBoxBody.slideUp();
			});

			maximizeBtn.click(()=>{
				chatBoxBody.slideDown();
			})
	}

	componentDidMount() {
		this.setChatBoxWindowControlsEvents()
	}

	render(){
		let title = 'Chicken House Admin';
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
			sender: (message) =>{
				return(
					<li className="recepient">
						<img src="/images/avatars/female-avatar-1.png" className="avatar" alt="recepient avatar"/>
						<span className="message">{message}</span>
					</li>
				)
			},
			recepient: (message) =>{
				return(
					<li className="sender">
	            <span className="message offset-right">
	            	{message}
	            	<br/>
	            	<time>{'1 min ago'}</time>
            	</span>
	        </li>
				)
			}
		}
		return chatMessage[this.props.messageType](this.props.messageText);
	}
}

class ChatMessageList extends React.Component {
	setScrollTop(){
			let messagesContainer = $("#messages-container");
			// initialize the scroll top of the messages container
			messagesContainer.scrollTop(0); 
			// get the top offset of the latest message
			let verticalOffset = $("#messages-container li:last").offset().top
			// set the new scroll top
			messagesContainer.scrollTop(verticalOffset);
	}

	componentDidUpdate(){
		this.setScrollTop();
	}

	render(){
		return(
		  	<ul className="no-style messages" id="messages-container">
					{this.props.messages.map(function(message, id){
						return <ChatMessage key={id} messageText={message.text} messageType={message.type}/>;
					})}
				</ul>
		);
	}
}

class ChatForm extends React.Component {
	// when a user presses enter the message gets appended to the chat message list
	updateChatMessageList(event){
		socket.emit('typing', 'admin typing...');
		// 13 is the Enter keycode
		if (event.keyCode === 13) {
			let message = {
				text: event.target.value,
				type: 'sender' 
			};
			this.props.newMessage(message);
			socket.emit('chat message', message);
			event.target.value = "";
			event.preventDefault();
		};
	}

	render(){
		return(
			<div className="footer">
				<span className="typing">{this.props.typing}</span>
				<form action="" method="post" id="chat-message-form">
					<textarea onKeyDown={this.updateChatMessageList.bind(this)} name="message"></textarea>
				</form>
			</div>
		);
	}
}

class ChatBox extends React.Component {
	constructor(){
		super();
		this.state = {
			chatMessages: [],
			typing: ''
		}
	}

	isTyping(typing){
		if (typing){
			this.setState({
				typing: typing
			}); 
		}else{
			this.setState({
				typing: ''
			});
		};
	}	
	// update message que
	addMessageToList(message){
		this.state.chatMessages.push(message)
		this.setState({
			chatMessages: this.state.chatMessages 
		});
	}

	componentDidMount() {
		socket.on('connect_error', function(error){
			console.error('Problem contacting the server...');
		});

 		socket.on('typing', function(typing){
	 		this.isTyping(typing);
		}.bind(this));
 		
 		socket.on('chat message', function(chatMessage){
	 		this.addMessageToList(chatMessage);
		}.bind(this));
	}

	render(){
		return(
			<aside id="chat-box">
				<Header/>
				<section className="body">
					<ChatMessageList messages={this.state.chatMessages}/>
					<ChatForm typing={this.state.typing} newMessage={this.addMessageToList.bind(this)}/>
				</section>
			</aside>
		);
	}
}

React.render(<ChatBox/>, document.body);