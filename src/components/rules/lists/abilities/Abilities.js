import Ability from 'abilities/Ability.js'
import AppendToGUUID from 'utils/AppendToGUUID.js'
import PropSort from 'utils/PropSort.js'
import RandomRoll from 'random/RandomRoll.js'
import XP12AbilitiesList from 'lists/abilities/XP12AbilitiesList.js'
import XP15AbilitiesList from 'lists/abilities/XP15AbilitiesList.js'
import XP18AbilitiesList from 'lists/abilities/XP18AbilitiesList.js'
import XP24AbilitiesList from 'lists/abilities/XP24AbilitiesList.js'
import XP30AbilitiesList from 'lists/abilities/XP30AbilitiesList.js'
import XP3AbilitiesList from 'lists/abilities/XP3AbilitiesList.js'
import XP6AbilitiesList from 'lists/abilities/XP6AbilitiesList.js'
import XP9AbilitiesList from 'lists/abilities/XP9AbilitiesList.js'

const abilityArray = [
	...XP3AbilitiesList,
	...XP6AbilitiesList,
	...XP9AbilitiesList,
	...XP12AbilitiesList,
	...XP15AbilitiesList,
	...XP18AbilitiesList,
	...XP24AbilitiesList,
	...XP30AbilitiesList
]

const completeAbilityListBuilder = (list) => {
	const newList = []
	for (let i = 0; i < list.length; ++i) {
		if (list[i].opts[0]) {
			for (let o = 0; o < list[i].opts.length; ++o) {
				let newGUUID = AppendToGUUID(list[i].id, list[i].opts[o].name)
				const newAbility = new Ability({
					id: newGUUID,
					name: list[i].name,
					desc: list[i].desc,
					max: list[i].max,
					xp: list[i].xp,
					taken: list[i].taken,
					opts: [
						list[i].opts[o],
					],
					selection: o
				})
				newList.push(newAbility)
			}
		} else {
			const newAbility = new Ability({
				id: list[i].id,
				name: list[i].name,
				desc: list[i].desc,
				max: list[i].max,
				xp: list[i].xp,
				taken: list[i].taken
			})
			newList.push(newAbility)
		}
	}
	return newList
}

export const Abilities = {
	name: `Abilities`,
	explanation: [
		`Abilities are Character upgrades purchased with XP.`
	],
	groups: [
		{
			name: 3,
			visible: false,
			list: XP3AbilitiesList
		},
		{
			name: 6,
			visible: false,
			list: XP6AbilitiesList
		},
		{
			name: 9,
			visible: false,
			list: XP9AbilitiesList
		},
		{
			name: 12,
			visible: false,
			list: XP12AbilitiesList
		},
		{
			name: 15,
			visible: false,
			list: XP15AbilitiesList
		},
		{
			name: 18,
			visible: false,
			list: XP18AbilitiesList
		},
		{
			name: 24,
			visible: false,
			list: XP24AbilitiesList
		},
		{
			name: 30,
			visible: false,
			list: XP30AbilitiesList
		},
	],
	list: abilityArray.sort((a, b) => PropSort(a, b, 'name')),
	masterList: completeAbilityListBuilder(abilityArray).sort((a, b) => PropSort(a, b, 'name')),
	remainingXP: (c) => {
		if (c.abilities.length) {
			c.props.experience.spent = c.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)
		}
		c.props.experience.remaining = c.props.experience.score - c.props.experience.spent
		return c
	},
	random: function(c) {
		c = this.reset(c)
		while(c.props.experience.remaining > 0) {
			const remainingAbilities = this.masterList.filter(m => {
				return m.xp <= c.props.experience.remaining &&
					!c.abilities.includes(m)
			})
			if (remainingAbilities.length) {
				const a = RandomRoll(remainingAbilities)
				a.taken++
				c.abilities.push(a)
				c.props.experience.remaining -= a.xp
			}
			else break
		}
		return c
	},
	reset: function(c) {
		for (let a = 0; a < c.abilities.length; ++a) {
			c.abilities[a].taken = 0
		}
		c.abilities = []
		return c
	}
}

export const AbilitiesList = completeAbilityListBuilder(Abilities)

export default Abilities