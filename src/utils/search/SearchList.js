import SearchEngine from '$utils/search/SearchEngine.js'

export default (event, list) => {
	return SearchEngine(event.detail, list)
}