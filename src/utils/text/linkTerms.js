import urlLookup from '/src/utils/searching/urlLookup.js'

export default function(description) {
	return description.map(line => {
		return line.split(' ').map(word => {			
			let returnedWord = null
			const startsWithParen = word.startsWith('(')
			if (startsWithParen) {
				word = word.replace('(', '')
			}
			const endsWithParen = word.endsWith(')')
			if (endsWithParen) {
				word = word.replace(')', '')
			}
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
			if (word.length >= 2 && (word[0] === word[0].toUpperCase() || word === 'd6')) {
				const searchResult = urlLookup(word)
				if (searchResult !== null) {
					returnedWord = `
						<a href=${searchResult} sveltekit:prefetch
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
				} else {
					returnedWord = word
				}
			} else {
				returnedWord = word
			}

			if (startsWithParen) {
				returnedWord = '(' + returnedWord
			}
			if (endsWithParen) {
				returnedWord += ')'
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
			
			return returnedWord.trim()
		}).join(' ')
	})
}