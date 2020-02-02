const Capitalize = (string) => {
	return string
		.toLowerCase()
		.split(' ')
		.map(word => {
			return word.charAt(0).toUpperCase() + word.substring(1)
		})
		.join(' ')
}

export default Capitalize