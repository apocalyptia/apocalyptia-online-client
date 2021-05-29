function urlFormat(word) {
	return word.toLowerCase().split(' ').join('').replace('.', '')
}

export default urlFormat