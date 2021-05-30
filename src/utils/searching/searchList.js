import searchEngine from '/src/utils/searching/searchEngine.js'

function searchList(event, list) {
	return searchEngine(event.detail, list)
}

export default searchList
