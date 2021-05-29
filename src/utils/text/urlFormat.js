function urlFormat(word) {
	return word.replace(/\.\s+/g, '').toLowerCase()
}

export default urlFormat(word)