let chatServerUrl = 'http://localhost:8081/'
let socket = io.connect(chatServerUrl);
// React code
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
		// 13 is the Enter keycode
		if (event.keyCode === 13) {
			let message = {
				text: event.target.value,
				type: 'customer' 
			};
			this.props.newMessage(message);
			event.target.value = "";
			socket.emit('chat message', message);
			event.preventDefault();
		};
	}

	render(){
		return(
			<div className="footer">
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
			chatMessages: []
		}
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
					type: 'business' 
				};
				this.addMessageToList(message);
		 }.bind(this));

		socket.on('connect_error', function(error){
			console.error('Problem contacting the server...');
		});
		
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
					<ChatForm newMessage={this.addMessageToList.bind(this)}/>
				</section>
			</aside>
		);
	}
}

React.render(<ChatBox/>, document.body);