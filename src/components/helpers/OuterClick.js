export default (target, child, excludeArray) => {
	let parent = target
	while (parent) {
		if (excludeArray.indexOf(parent) >= 0 || parent === child) {
			return false
		}
		parent = parent.parentNode
	}
	return true
}