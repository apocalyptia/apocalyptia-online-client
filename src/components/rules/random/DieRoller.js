import d6Roll from 'random/d6Roll.js'

export default () => {
	let result = 6
	const rolls = 60000
	const waitTime = 50
	for (let i = 0; i < rolls; i++) {
		setTimeout(_ => { result = d6Roll() }, waitTime)
	}
	return result
}