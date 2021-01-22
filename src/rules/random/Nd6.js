import d6 from '$rules/random/d6.js'

export default (n) => {
	let total = 0
	for (let i = 0; i < n; i++) total += d6()
	return total
}