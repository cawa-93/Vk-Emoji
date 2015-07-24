# Vk-Emoji
Replace symbols emoticons VK the corresponding HTML code

### Usage ###
```javascript
Emoji.emojiToHTML( 'Hello World 😊' ); // 'Hello World <img class="emoji" alt="😊" src="https://vk.com/images/emoji/D83DDE0A.png">'
```

#### Other images directory ####
```javascript
Emoji.pathToEmojisImages = '/path/to/img/';
Emoji.emojiToHTML( 'Hello World 😊' ); // 'Hello World <img class="emoji" alt="😊" src="/path/to/img/D83DDE0A.png">'
```