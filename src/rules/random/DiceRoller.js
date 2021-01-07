import d6Roll from 'rules/random/d6Roll.js'

export default (factors) => {
	let rollCount = Math.ceil(Math.random() * 37) + 2

	let setIntervalId = setInterval(_ => {
		factors.roll = d6Roll()
		if (factors.roll[0] == 1 && factors.roll[1] == 1) {
			factors.total = 'Botched!'
		}
		else {
			factors.total = factors.roll.reduce((acc, num) => {
				return acc + num, 0
			}) + factors.mod
		}
		if (factors.roll[0] == 6) {
			factors.total = `Exploded! ${factors.total}`
		}
		if (rollCount-- == 0) {
			clearInterval(setIntervalId)
		}
	}, 50)
}