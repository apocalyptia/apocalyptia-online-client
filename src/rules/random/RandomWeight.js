export default (c) => {
    let feet = parseInt(c.description.height.value.slice(
        0,
        c.description.height.value.indexOf('ft')
    ))

    let inches = parseInt(c.description.height.value.slice(
        c.description.height.value.indexOf(' '),
        c.description.height.value.indexOf('in')
    ))

    let totalInches = (feet * 12) + inches

    let totalPounds

	if (c.description.sex.value == `Male`) {
		totalPounds = Math.ceil((Math.random() * 30) + (totalInches * 2.25))
	}
	else if (c.description.sex.value == `Female`) {
		totalPounds = Math.ceil((Math.random() * 20) + (totalInches * 2))
	}
	else {
		totalPounds = Math.ceil((Math.random() * 25) + (totalInches * 2.125))
    }

	return `${totalPounds}lbs`
}