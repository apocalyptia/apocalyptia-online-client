import Rules from '/src/rules/Rules.js'
import alphabetize from '/src/utils/sorting/alphabetize.js'
import capitalize from '/src/utils/text/capitalize.js'
import swapOrder from '/src/utils/text/swapOrder.js'
import urlFormat from '/src/utils/text/urlFormat.js'

function searchEngine({
	term = '',
	list = Rules
}) {
	let resultsList = []

	if (term.length) {
		const candidateList = Object.entries(list).flatMap((rule) => {
			return {
				name: rule[1].name || capitalize(rule[0]),
				url: rule[1].url || urlFormat(`/manual/${rule[0]}`)
			}
		})

		resultsList = candidateList.filter((r) => {
			return r.name.toLowerCase().startsWith(term.toLowerCase()) || 
					r.name.toLowerCase().includes(term.toLowerCase())
		})

		resultsList.sort((a, b) => a.name - b.name)
	}

	return resultsList
}

export default searchEngine
