export default (c) => {
	let totalInches
	if (c.description.sex.value == `Male`) {
		totalInches = Math.ceil((Math.random() * 12) + 64)
		// 5'4" to 6'4"
	}
	else if (c.description.sex.value == `Female`) {
		totalInches = Math.ceil((Math.random() * 12) + 59)
		// 4'11" to 5'11"
	}
	else {
		totalInches = Math.ceil((Math.random() * 12) + 61)
		// 5'1" to 6'1"
	}
	return `${Math.floor(totalInches / 12)}ft ${totalInches % 12}in`
}