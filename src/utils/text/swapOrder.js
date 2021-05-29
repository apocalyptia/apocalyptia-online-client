function swapOrder(words) {
	const wordsArray = words.split(' ')
	for (let i = 0; i < Math.floor(wordsArray.length / 2); i++) {
		const temp = wordsArray[i]
		wordsArray.shift()
		wordsArray.push(temp)
	}
	const recombinedWords = wordsArray.join(' ')
	return recombinedWords
}

export default swapOrder