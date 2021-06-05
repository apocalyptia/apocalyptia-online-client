function urlFormat(word) {
	return word.toLowerCase()
				.replace("-", "")
				.replace(".", "")
				.replace("'", "")
				.replace("&", "")
				.trim()
				.split(" ")
				.join("")
}

export default urlFormat
