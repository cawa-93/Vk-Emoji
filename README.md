# Vk-Emoji
Replace symbols emoticons VK the corresponding HTML code

### Usage ###
```javascript
Emoji.emojiToHTML( 'Hello World &#128522;' ); // 'Hello World <img class="emoji" alt="&#128522;" src="https://vk.com/images/emoji/D83DDE0A.png">'
```

#### Other images directory ####
```javascript
	Emoji.pathToEmojisImages = '/path/to/img/';
	Emoji.emojiToHTML( 'Hello World &#128522;' ); // 'Hello World <img class="emoji" alt="&#128522;" src="/path/to/img/D83DDE0A.png">'
```