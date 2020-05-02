import IdTagger from '../helpers/IdTagger'
import PropSort from '../helpers/PropSort'
import XP3Abilities from './abilities/lists/XP3Abilities'
import XP6Abilities from './abilities/lists/XP6Abilities'
import XP9Abilities from './abilities/lists/XP9Abilities'
import XP12Abilities from './abilities/lists/XP12Abilities'
import XP15Abilities from './abilities/lists/XP15Abilities'
import XP18Abilities from './abilities/lists/XP18Abilities'
import XP24Abilities from './abilities/lists/XP24Abilities'
import XP30Abilities from './abilities/lists/XP30Abilities'


const abilityArray = [
	...XP3Abilities,
	...XP6Abilities,
	...XP9Abilities,
	...XP12Abilities,
	...XP15Abilities,
	...XP18Abilities,
	...XP24Abilities,
	...XP30Abilities
]

export const Abilities = {
	name: `Abilities`,
	explanation: [
		`Abilities are Character upgrades purchased with XP.`
	],
	groups: [
		{
			name: 3,
			visible: false,
			list: XP3Abilities
		},
		{
			name: 6,
			visible: false,
			list: XP6Abilities
		},
		{
			name: 9,
			visible: false,
			list: XP9Abilities
		},
		{
			name: 12,
			visible: false,
			list: XP12Abilities
		},
		{
			name: 15,
			visible: false,
			list: XP15Abilities
		},
		{
			name: 18,
			visible: false,
			list: XP18Abilities
		},
		{
			name: 24,
			visible: false,
			list: XP24Abilities
		},
		{
			name: 30,
			visible: false,
			list: XP30Abilities
		},
	],
	list: abilityArray.sort((a, b) => PropSort(a, b, 'name')),
	masterList: IdTagger(abilityArray).sort((a, b) => PropSort(a, b, 'name')),
	remainingXP: (c) => {
		if (c.abilities.length) {
			c.props.experience.spent = c.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)
		}
		c.props.experience.remaining = c.props.experience.score - c.props.experience.spent
		return c
	}
}

export const AbilitiesList = IdTagger(Abilities)

export default Abilities