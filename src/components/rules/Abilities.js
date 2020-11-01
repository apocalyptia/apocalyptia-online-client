import PropSort from 'utils/PropSort.js'

export default {
	name: `Abilities`,
	text: [
		`Abilities are Character upgrades purchased with XP.`
	],
	masterList: completeAbilityListBuilder(abilityArray).sort((a, b) => PropSort(a, b, 'name')),
	remainingXP: (c) => {
		if (c.abilities.length) c.props.experience.spent = c.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)
		c.props.experience.remaining = c.props.experience.score - c.props.experience.spent
		return c
	}
}