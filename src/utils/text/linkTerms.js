import rulesSearch from '/src/utils/searching/rulesSearch.js'

export default function(description) {
	return description.map(line => {
		return line.split(' ').map(word => {
			let returnedWord = null
			if (word[0] === word[0].toUpperCase()) {
				const endsWithComma = word.endsWith(',')
				if (endsWithComma) {
					word = word.replace(',', '')
				}
				const endsWithPeriod = word.endsWith('.')
				if (endsWithPeriod) {
					word = word.replace('.', '')
				}
				const endsWithColon = word.endsWith(':')
				if (endsWithColon) {
					word = word.replace(':', '')
				}
				const startsWithParen = word.startsWith('(')
				if (startsWithParen) {
					word = word.replace('(', '')
				}
				const endsWithParen = word.endsWith(')')
				if (endsWithParen) {
					word = word.replace(')', '')
				}
				if (/^[a-zA-Z]+$/.test(word)) {
					const searchResult = rulesSearch(word.toLowerCase())
					if (searchResult === null || searchResult === undefined) {
						returnedWord = word
					} else {
						returnedWord = `
							<a href=${searchResult.url}
								style="
									animation: none;
									background-color: rgba(0,0,0,0);
									background-size: none;
									box-shadow: none;
									color: var(--pri-color);
									font-weight: bold;
									text-decoration: none;
								"
							>${word}</a>`
					}
				} else {
					returnedWord = word
				}
				if (endsWithComma) {
					returnedWord += ','
				}
				if (endsWithPeriod) {
					returnedWord += '.'
				}
				if (endsWithColon) {
					returnedWord += ':'
				}
				if (startsWithParen) {
					returnedWord = '(' + returnedWord
				}
				if (endsWithParen) {
					returnedWord += ')'
				}
			}
			else {
				returnedWord = word
			}
			return returnedWord.trim()
		}).join(' ')
	})
}