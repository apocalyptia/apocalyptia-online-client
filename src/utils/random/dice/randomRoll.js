import randomNumber from './randomNumber.js'

function randomRoll(array) {
	return array[randomNumber(array.length - 1)]
}

export default randomRoll