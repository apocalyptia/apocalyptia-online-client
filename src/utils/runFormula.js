function runFormula(character, type, formula) {
	const f = formula.split(' ').map((i) => i.toLowerCase())
	let result = 0
	if (f.length === 1) {
		result = character[type][f[0]].score
	} else if (f.length === 3) {
		if (f.includes('+')) {
			result = character[type][f[0]].score + parseInt(f[2])
		} else if (f.includes('-')) {
			result = character[type][f[0]].score - parseInt(f[2])
		} else if (f.includes('x')) {
			result = character[type][f[0]].score * parseInt(f[2])
		} else if (f.includes('/')) {
			result = character[type][f[0]].score / parseInt(f[2])
		}
	} else if (f.length === 7) {
		result = (character[type][f[1]].score + character[type][f[3]].score) / parseInt(f[6])
	}
	return Math.floor(result)
}

/*
Examples:
f.length 1 = `Agility`
f.length 3 = `Agility * 3`
f.length 7 = `(Agility + Brains) / 2`
*/

export default runFormula
