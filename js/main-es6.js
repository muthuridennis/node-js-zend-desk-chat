// React code
class Header extends React.Component {
	setChatBoxWindowControlsEvents(){
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
		(function($) {
			let messagesContainer = $("#messages-container");
			let marginBottom = 10;
			// get the scroll top of the messages container
			let originalScrollTop = messagesContainer.scrollTop(); 
			// get the height of the new list item
			let newListItemHeight = $("#messages-container li:last-child").outerHeight();
			// set the new scroll top
			messagesContainer.scrollTop(originalScrollTop + newListItemHeight + marginBottom);
		})(jQuery);		
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
			this.props.newMessage(message)
			event.target.value = "";
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
		$.get('http://127.0.0.1:8081/')
		 .done(function(data, status){
		 		this.addMessageToList(data);
		 }.bind(this))
		 .fail(function(data, status){
		 		console.log(`Error and here is the status: ${status}`);
		 });
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