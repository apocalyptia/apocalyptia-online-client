const ArrayToObject = (array, key) => {
	const initialValue = {}
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		}
	}, initialValue)
}

export default ArrayToObject