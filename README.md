# Description
A node js based zend desk chat client. 

# Technology stack
- React.js
- Babeljs to compile ES6 syntax to ES5. 
- Scss.
- Socket.io
- Nodejs 

# How to run
Clone repository `git clone git@github.com:muthuridennis/node-js-zend-desk-chat.git`

Start [harpjs server](http://harpjs.com) at the directory you cloned the app `harp server .`

Start Babeljs compiler `babel -w js/main-es6.js -o js/main.js`

Start the Nodejs server `node index.js`

# Project Roadmap
- Create a better admin section: e.g.
	- Enable multiple domain support by the admin.
	- Chat title customization.
	- Persist chat messages.
	- Show chat history.
- Add time stamps to chat messages.
- Display unread messages notification.
- Alert users of new messages with some audio. 
- Compress the client chat feature into a script tag that can be embeded into a page.