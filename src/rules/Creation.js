import Skills from '/src/rules/Skills.js'
import Traits from '/src/rules/Traits.js'

export default {
	name: `Creation`,
	startingGearExplanation: [
		`You start with some random Gear:`,
		`One piece of Armor`,
		`One Melee weapon`,
		`One Ranged weapon`,
		`1d6 rounds of Ammo`,
		`Random items = Luck`,
	],
	proceedCheck(c) {
		return (
			(c.meta.step == 0 && Object.values(c.description).every(d => d.value)) ||
			(c.meta.step == 1 && Traits.remaining(c) == 0) ||
			(c.meta.step == 2 && Skills.remaining(c) == 0) ||
			(c.meta.step == 3) ||
			(c.meta.step == 4 && c.properties.experience.current >= 0) ||
			(c.meta.step == 5 && Object.values(c.gear).every(g => g.inventory.length)) ||
			(c.meta.step == 6)
		)
	},
}