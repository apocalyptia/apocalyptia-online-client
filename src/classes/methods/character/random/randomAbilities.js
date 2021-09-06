import randomNumber from '/src/utils/random/dice/randomNumber.js'
import randomRoll from '/src/utils/random/dice/randomRoll.js'

export default function() {
	this.resetAbilities()
	while (this.properties.experience.current > 0) {
		const remainingAbilitiesList = this.remainingAbilities()
		if (remainingAbilitiesList.length) {
			const randomAbility = randomRoll(remainingAbilitiesList)
			randomAbility.quantity = 1
			if (randomAbility.options.length) {
				randomAbility.selectedOption = randomNumber(randomAbility.options.length) - 1
			}
			this.addAbility(randomAbility)
		}
		else {
			break
		}
	}
	return this
}