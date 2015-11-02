let chatServerUrl = 'http://localhost:8081/';
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
			recepient: (message) =>{
				return(
					<li className="recepient">
						<img src="/images/avatars/female-avatar-1.png" className="avatar" alt="recepient avatar"/>
						<span className="message">
							{message}
							<br/>
							<time title={this.props.messageMachineTime}>{this.props.messageHumanTime}</time>
						</span>
					</li>
				)
			},
			sender: (message) =>{
				return(
					<li className="sender">
	            <span className="message offset-right">
	            	{message}
		            <br/>
								<time title={this.props.messageMachineTime}>{this.props.messageHumanTime}</time>
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
						return (<ChatMessage key={id} 
																 messageText={message.text} 
																 messageType={message.type} 
																 messageHumanTime={message.humanized_time}
																 messageMachineTime={message.machine_time}/>);
					})}
				</ul>
		);
	}
}

class ChatForm extends React.Component {
	// when a user presses enter the message gets appended to the chat message list
	updateChatMessageList(event){
		socket.emit('typing', 'customer typing...');
		// 13 is the Enter keycode
		if (event.keyCode === 13) {
			let message = {
				text: event.target.value,
				type: 'sender',
				humanized_time: moment().fromNow(),
				machine_time: moment().format('MMMM Do YYYY, hh:mm:ss') 

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
					<textarea placeholder="Hi. I would like to receive help on ..." onKeyDown={this.updateChatMessageList.bind(this)} name="message"></textarea>
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
		$.get(chatServerUrl)
		 .done(function(data){
		 		this.addMessageToList(data);
		 }.bind(this))
		 .fail(function(data, status){
				let message = {
					text: 'Problem contacting the server.',
					type: 'sender',
					humanized_time: moment().startOf('hour').fromNow(),
					machine_time: moment().format('MMMM Do YYYY, hh:mm:ss') 
				};
				this.addMessageToList(message);
		 }.bind(this));

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