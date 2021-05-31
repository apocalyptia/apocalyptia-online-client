function urlFormat(word) {
	return word.toLowerCase()
				.replace('.', '')
				.replace("'", "")
				.trim()
				.split(' ')
				.join('')
}

export default urlFormat
