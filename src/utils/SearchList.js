import SearchEngine from 'utils/SearchEngine.js'

export default (event, list) => {
	return SearchEngine(event.detail, list)
}