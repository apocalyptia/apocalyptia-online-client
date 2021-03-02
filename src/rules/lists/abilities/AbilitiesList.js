import Ability from 'classes/Ability.js'
import Alphabetize from 'utils/sorting/Alphabetize.js'
import XP12AbilitiesList from 'rules/lists/abilities/XP12AbilitiesList.js'
import XP15AbilitiesList from 'rules/lists/abilities/XP15AbilitiesList.js'
import XP18AbilitiesList from 'rules/lists/abilities/XP18AbilitiesList.js'
import XP24AbilitiesList from 'rules/lists/abilities/XP24AbilitiesList.js'
import XP30AbilitiesList from 'rules/lists/abilities/XP30AbilitiesList.js'
import XP3AbilitiesList from 'rules/lists/abilities/XP3AbilitiesList.js'
import XP6AbilitiesList from 'rules/lists/abilities/XP6AbilitiesList.js'
import XP9AbilitiesList from 'rules/lists/abilities/XP9AbilitiesList.js'

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

const listBuilder = (list) => {
	const newList = []
	for (let i = 0; i < list.length; ++i) {
		if (list[i].opts[0]) {
			for (let o = 0; o < list[i].opts.length; ++o) {
				const newAbility = new Ability({
					name: list[i].name,
					desc: list[i].desc,
					max: list[i].max,
					xp: list[i].XP,
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
				name: list[i].name,
				desc: list[i].desc,
				max: list[i].max,
				xp: list[i].XP,
				taken: list[i].taken
			})
			newList.push(newAbility)
		}
	}
	return Alphabetize(newList)
}

export default {
	name: `Abilities`,
	list: Alphabetize(abilityArray),
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
	masterList: listBuilder(abilityArray),
	reset() {
		for (let i = 0; i < this.masterList.length; i++) {
			this.masterList[i].taken = 0
		}
	}
}