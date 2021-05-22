import d6 from './d6.js'

export default (n) => {
	let rolls = []
	for (let i = 0; i < n; i++) rolls.push(d6())
	return rolls
}