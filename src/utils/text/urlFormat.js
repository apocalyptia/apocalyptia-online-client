function urlFormat(word) {
	return word.toLowerCase().split(' ').join('').replace('.', '').replace("'", "").trim()
}

export default urlFormat
