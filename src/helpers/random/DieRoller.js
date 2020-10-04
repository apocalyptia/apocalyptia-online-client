import d6Roll from './d6Roll'


const DieRoller = () => {
	let result = 6
	const rolls = 60000
	const waitTime = 50
	for (let i = 0; i < rolls; i++) {
		setTimeout(_ => { result = d6Roll() }, waitTime)
	}
	return result
}

export default DieRoller