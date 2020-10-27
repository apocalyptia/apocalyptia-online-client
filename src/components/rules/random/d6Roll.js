import d6 from 'random/d6.js'

const d6Roll = (mod=0) => {
	let roll = d6()
	let total = roll
	if (roll == 1) { // Botch
		roll = d6()
		if (roll == 1) {
			return -666
		}
	}
	if (roll == 6) { // Explode
		while (roll == 6) {
			roll = d6()
			total += roll
		}
	}
	const result = total + mod
	return result
}

export default d6Roll