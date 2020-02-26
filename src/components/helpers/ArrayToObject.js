export default (array, key) => {
	const initialValue = {}
	const newObject = array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		}
	}, initialValue)
	return newObject
}