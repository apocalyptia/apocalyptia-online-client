import Skill from './Skill'
import Specialty from './Specialty'


const Build = new Skill({
	name: `Build`,
	desc: [
		`Make an item from [d6 + #] Parts.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		customize: new Specialty({
			name: `Customize`,
			desc: [
				`(#hrs) 3 per item`,
				`Each must be unique`,
				`Weapons: +1 Ranged Attack, +1 Melee Damage, or a new Attribute`,
				`Armor: +1 Damage Resistance or a new Attribute.`,
			]
		}),
		repair: new Specialty({
			name: `Repair`,
			desc: [
				`(#hrs) Fix broken item`,
				`+1 with same Parts.`,
			]
		})
	}
})

export default Build