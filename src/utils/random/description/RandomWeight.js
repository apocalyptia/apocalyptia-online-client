export default (height, sex) => {
	if (height) {
		let feet = parseInt(height.slice(
			0,
			height.indexOf('ft')
		))

		let inches = parseInt(height.slice(
			height.indexOf(' '),
			height.indexOf('in')
		))

		let totalInches = (feet * 12) + inches

		let totalPounds = 0

		if (sex === `Male`) {
			totalPounds = Math.ceil((Math.random() * 30) + (totalInches * 2.25))
		}
		else if (sex === `Female`) {
			totalPounds = Math.ceil((Math.random() * 20) + (totalInches * 2))
		}
		else {
			totalPounds = Math.ceil((Math.random() * 25) + (totalInches * 2.125))
		}

		return `${totalPounds}lbs`
	}
	else {
		return `${Math.ceil((Math.random() * 25) + (65 * 2.125))}lbs`
	}
}