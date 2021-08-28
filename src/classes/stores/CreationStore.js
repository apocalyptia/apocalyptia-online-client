export default class {
	constructor() {
		this.numberOfSteps = 6
		this.step = 0
		this.checkMax = function () {
			if (this.step === this.numberOfSteps) {
				return true
			}
			return false
		}
		this.checkMin = function () {
			if (this.step < 0) {
				return true
			}
			return false
		}
	}
}