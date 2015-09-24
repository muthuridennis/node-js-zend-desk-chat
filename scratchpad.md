```
                <li class="recepient">
                    <img src="/images/avatars/female-avatar-1.png" class="avatar" alt="recepient avatar">
                    <span class="message">Hi there. My name is Jane and I'm here to help with any questions you might have regarding our service.</span>
                </li>
                <!-- <li class="sender">
                    <span class="message offset-right">Hi Paul. I don't understand your FAQ</span>
                </li>
                <li class="recepient">
                    <img src="/images/avatars/male-avatar-1.png" class="avatar" alt="recepient avatar">
                    <span class="message">What don't you understand?</span>
                </li>
                <li class="sender">
                    <span class="message offset-right">What do you mean by 'free egg break'?</span>
                </li>
                <li class="recepient">
                    <img src="/images/avatars/male-avatar-1.png" class="avatar" alt="recepient avatar">
                    <span class="message">Sorry. That shouldn't be there.</span>
                </li>
                <li class="sender">
                    <span class="message offset-right">I don't get?</span>
                </li> -->
```

Tasks
- Figure out how forms work in React.
- Submit from input in React.
- Display input in the chatbox.
- Echo the input the user entered. 

Page loads --> Intial state of the Messages container box is set.

TextArea receives message from sender===>
                                        \
                                         \
                                          --> Message is passed to the Recepient component 
                                          --> Message passed to the Sender component

Chatbox components:
- Message container
    - Chat Message
- Form with a textarea