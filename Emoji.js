var Emoji = (function () {
	"use strict";
	return {
		/**
		 * @type {RegExp}
		 */
		emojiCharSeq: /[0-9\uD83D\uD83C]/,
		/**
		 * @type {RegExp}
		 */
		emojiRegEx: /((?:[\uE000-\uF8FF\u270A-\u2764\u2122\u231B\u25C0\u25FB-\u25FE\u2615\u263a\u2648-\u2653\u2660-\u2668\u267B\u267F\u2693\u261d\u26A0-\u26FA\u2708\u2702\u2601\u260E]|[\u2600\u26C4\u26BE\u23F3\u2705\u2764]|[\uD83D\uD83C][\uDC00-\uDFFF]|\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]|[0-9]\u20e3|[\u200C\u200D])+)/g,
		/**
		 * Path до директории с изображениями смайликов
		 * @type {String}
		 */
		pathToEmojisImages: 'https://vk.com/images/emoji/',

		/**
		 * @param  {String} code   Код символа
		 * @param  {String} symbol Сам символ
		 * @return {String}        HTML код картинки
		 */
		getEmojiHTML: function (code, symbol) {
			return '<img class="emoji" ' + (symbol ? 'alt="' + symbol + '"' : '') + ' src="' + this.pathToEmojisImages + code+'.png" />';
		},

		/**
		 * Преобразует символы смайликов в строке в соотведствующие изображения
		 * @param  {String} str Строка для преобразования
		 * @return {String}     Изменённая строка
		 */
		emojiToHTML: function (str) {
			str = str.replace(/&nbsp;/g, ' ').replace(/<br>/g, "\n");
			let regs = {
				'D83DDE07': /(\s|^)([0OО]:\))([\s\.,]|$)/g,
				'D83DDE09': /(\s|^)(;-\)+)([\s\.,]|$)/g,
				'D83DDE06': /(\s|^)([XХxх]-?D)([\s\.,]|$)/g,
				'D83DDE0E': /(\s|^)(B-\))([\s\.,]|$)/g,
				'D83DDE0C': /(\s|^)(3-\))([\s\.,]|$)/g,
				'D83DDE20': /(\s|^)(&gt;\()([\s\.,]|$)/g,
				'D83DDE30': /(\s|^)(;[oоOО])([\s\.,]|$)/g,
				'D83DDE33': /(\s|^)(8\|)([\s\.,]|$)/g,
				'D83DDE32': /(\s|^)(8-?[oоOО])([\s\.,]|$)/g,
				'D83DDE0D': /(\s|^)(8-\))([\s\.,]|$)/g,
				'D83DDE37': /(\s|^)(:[XХ])([\s\.,]|$)/g,
				'D83DDE28': /(\s|^)(:[oоOО])([\s\.,]|$)/g,
				'2764': /(\s|^)(&lt;3)([\s\.,]|$)/g
			};
			for (let code in regs) {
				str = str.replace(regs[code], function (match, pre, smile, space) {
					return (pre || '') + Emoji.getEmojiHTML(code)+(space || '');
				});
			}
			regs = {
				'D83DDE0A': /(:-\))([\s\.,]|$)/g,
				'D83DDE03': /(:-D)([\s\.,]|$)/g,
				'D83DDE1C': /(;-[PР])([\s\.,]|$)/g,
				'D83DDE0B': /(:-[pр])([\s\.,]|$)/g,
				'D83DDE12': /(:-\()([\s\.,]|$)/g,
				'263A': /(:-?\])([\s\.,]|$)/g,
				'D83DDE0F': /(;-\])([\s\.,]|$)/g,
				'D83DDE14': /(3-?\()([\s\.,]|$)/g,
				'D83DDE22': /(:&#039;\()([\s\.,]|$)/g,
				'D83DDE2D': /(:_\()([\s\.,]|$)/g,
				'D83DDE29': /(:\(\()([\s\.,]|$)/g,
				//'D83DDE15': /(:\\)([\s\.,]|$)/g,
				'D83DDE10': /(:\|)([\s\.,]|$)/g,
				'D83DDE21': /(&gt;\(\()([\s\.,]|$)/g,
				'D83DDE1A': /(:-\*)([\s\.,]|$)/g,
				'D83DDE08': /(\}:\))([\s\.,]|$)/g,
				'D83DDC4D': /(:like:)([\s\.,]|$)/g,
				'D83DDC4E': /(:dislike:)([\s\.,]|$)/g,
				'261D': /(:up:)([\s\.,]|$)/g,
				'270C': /(:v:)([\s\.,]|$)/g,
				'D83DDC4C': /(:ok:|:ок:)([\s\.,]|$)/g
			};
			for (let code in regs) {
				str = str.replace(regs[code], function (match, smile, space) {
					return Emoji.getEmojiHTML(code)+(space || '');
				});
			}

			str = str.replace(/\n/g, '<br>');
			str = str.replace(Emoji.emojiRegEx, Emoji.emojiReplace).replace(/\uFE0F/g, '');
			return str;
		},

		/**
		 * Подбирает коды к найденным символам
		 * @param  {String} symbolstr Символ для замены
		 */
		emojiReplace: function (symbolstr) {
			const symbols = [];
			const codes = [];
			let out = '';
			let buffer = '';
			let altBuffer = '';

			for (let i = 0; i < symbolstr.length; i++) {
				const num = symbolstr.charCodeAt(i)
				const code = num.toString(16).toUpperCase();
				const symbol = symbolstr.charAt(i);

				if (i === 1 && num === 8419) {
					codes.push('003'+symbolstr.charAt(0)+'20E3');
					symbols.push(symbolstr.charAt(0));
					buffer = '';
					altBuffer = '';
					continue;
				}

				buffer += code;
				altBuffer += symbol;
				if (!symbol.match(Emoji.emojiCharSeq)) {
					codes.push(buffer);
					symbols.push(altBuffer);
					buffer = '';
					altBuffer = '';
				}
			};

			if (buffer) {
				codes.push(buffer);
				symbols.push(altBuffer);
			}

			buffer = '';
			altBuffer = '';

			let joiner = false;
			let isFlag = false;
			for (let i = 0; i < codes.length; i++) {
				const code = codes[i];
				const symbol = symbols[i];
				if (symbol.match(/\uD83C[\uDFFB-\uDFFF]/)) { // colors
					buffer += code;
					altBuffer += symbol;
					continue;
				}
				if (joiner) {
					buffer += code;
					altBuffer += symbol;
					joiner = false;
					continue;
				}
				if (code === '200C' || code === '200D') { // joiners
					if (buffer) {
						joiner = true;
						continue;
					} else {
						out += symbol;
					}
				}
				if (symbol.match(/\uD83C[\uDDE6-\uDDFF]/)) { // flags
					if (isFlag) {
						buffer += code;
						altBuffer += symbol;
						isFlag = false;
						continue;
					}
					isFlag = true;
				} else if (isFlag) {
					isFlag = false;
				}

				if (buffer) {
					out += Emoji.getEmojiHTML(buffer, altBuffer, true);
				}
				buffer = code;
				altBuffer = symbol;
			};

			if (buffer) {
				out += Emoji.getEmojiHTML(buffer, altBuffer, true);
			}
			return out;
		},
	};
})();
