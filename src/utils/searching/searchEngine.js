import Rules from '/src/rules/Rules.js'
import alphabetize from '/src/utils/sorting/alphabetize.js'
import capitalize from '/src/utils/text/capitalize.js'
import swapOrder from '/src/utils/text/swapOrder.js'
import urlFormat from '/src/utils/text/urlFormat.js'

function searchEngine(searchTerm='') {
	let displayList = []

	if (searchTerm.length) {

		const chapterList = Object.entries(Rules).map(chapter => {
			return {
				name: capitalize(chapter[0]),
				content: chapter[1],
				url: urlFormat(`/manual/${chapter[0]}`)
			}
		})

		const resultsList = alphabetize(
			chapterList.flatMap(chapter => {
				return Object.entries(chapter.content).flatMap(section => {
					if (section[1].hasOwnProperty('name')) {
						section[1].url = urlFormat(`/manual/${chapter.name}/${section[1].name}`)
						return section[1]
					}
					else {
						return Object.values(section[1]).flatMap(item => {
							item.url = urlFormat(`/manual/${chapter.name}/${section[0]}/${section[0] === 'ammo' ? swapOrder(item.name) : item.name}`)
							console.log(item.url)
							return item
						})
					}
				})
			}).concat(chapterList)
		)

		displayList = resultsList.filter(r => {
			return r.name.toLowerCase()
						.startsWith(searchTerm.toLowerCase())
		})
	
		if (!displayList.length) {
			displayList = resultsList.filter(r => {
				return r.name.toLowerCase()
							.includes(searchTerm.toLowerCase())
			})
		}

	}

	return displayList
}

export default searchEngine