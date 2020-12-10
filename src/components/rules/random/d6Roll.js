import d6 from 'random/d6.js'

export default () => {
	const rolls = [d6()]
	if (rolls[0] == 1 && d6() == 1) rolls.push(1) // Botch
	else if (rolls[0] == 6) { // Explode
		while (rolls[rolls.length - 1] == 6) rolls.push(d6())
	}
	return rolls
}