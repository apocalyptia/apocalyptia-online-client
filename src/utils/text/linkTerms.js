import urlLookup from '/src/utils/searching/urlLookup.js'

export default function(description) {
	return description.map(line => {
		return line.split(' ').map(word => {

			let returnedWord = null

			const startsWithParen = word.startsWith('(')
			if (startsWithParen) word = word.replace('(', '')

			const endsWithParen = word.endsWith(')')
			if (endsWithParen) word = word.replace(')', '')

			const endsWithComma = word.endsWith(',')
			if (endsWithComma) word = word.replace(',', '')

			const endsWithPeriod = word.endsWith('.')
			if (endsWithPeriod) word = word.replace('.', '')

			const endsWithColon = word.endsWith(':')
			if (endsWithColon) word = word.replace(':', '')

			if (word === 'Attacks') word = 'Attack'

			if (word.length >= 2 && (word[0] === word[0].toUpperCase() || word === 'd6')) {
				const searchResult = urlLookup(word)
				if (searchResult !== null) {
					returnedWord = `<a href=${searchResult} class="manual-article-link" sveltekit:prefetch>${word}</a>`
				} else {
					returnedWord = word
				}
			} else {
				returnedWord = word
			}

			if (startsWithParen)	returnedWord = '(' + returnedWord
			if (endsWithParen)		returnedWord += ')'
			if (endsWithComma)		returnedWord += ','
			if (endsWithPeriod)		returnedWord += '.'
			if (endsWithColon)		returnedWord += ':'
			
			return returnedWord.trim()
		}).join(' ')
	})
}