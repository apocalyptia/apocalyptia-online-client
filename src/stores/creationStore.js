import { writable } from 'svelte/store'

const creationStore = {
	numberOfSteps: 7,
	step: 0,
	checkMax: function () {
		if (this.step === this.numberOfSteps) {
			return true
		}
		return false
	},
	checkMin: function () {
		if (this.step < 0) {
			return true
		}
		return false
	}
}

export default writable(creationStore)
