import SearchEngine from 'utils/searching/SearchEngine.js'

export default (event, list) => {
	return SearchEngine(event.detail, list)
}