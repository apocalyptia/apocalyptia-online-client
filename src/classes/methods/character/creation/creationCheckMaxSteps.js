export default function () {
	if (this.meta.step > this.meta.numberOfSteps) {
		return true
	}
	return false
}