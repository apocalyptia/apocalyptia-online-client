const Capitalize = (string) => {
	return string
		.split(' ')
		.map(word => {
			return word.charAt(0).toUpperCase() + word.substring(1)
		})
		.join(' ')
}

export default Capitalize