export default class Character {
	constructor() {
		this.completed = false,
		this.description = {
			age: {
				name: `Age`,
				value: ``
			},
			identity: {
				name: `Identity`,
				value: ``
			},
			hair: {
				name: `Hair`,
				value: ``
			},
			height: {
				name: `Height`,
				value: ``
			},
			sex: {
				name: `Sex`,
				value: ``
			},
			skin: {
				name: `Skin`,
				value: ``
			},
			weight: {
				name: `Weight`,
				value: ``
			}
		},
		this.traits = {
			agility: {
				name: `Agility`,
				base: 1,
				mods: 0,
				score: 1
			},
			brains: {
				name: `Brains`,
				base: 1,
				mods: 0,
				score: 1
			},
			constitution: {
				name: `Constitution`,
				base: 1,
				mods: 0,
				score: 1
			},
			demeanor: {
				name: `Demeanor`,
				base: 1,
				mods: 0,
				score: 1
			}
		},
		this.skills = {
			acrobatics: {
				name: `Acrobatics`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Agility'
			},
			larceny: {
				name: `Larceny`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Agility'
			},
			ranged: {
				name: `Ranged`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Agility'
			},
			stealth: {
				name: `Stealth`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Agility'
			},
			medicine: {
				name: `Medicine`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Brains'
			},
			perception: {
				name: `Perception`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Brains'
			},
			science: {
				name: `Science`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Brains'
			},
			survival: {
				name: `Survival`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Brains'
			},
			athletics: {
				name: `Athletics`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Constitution'
			},
			build: {
				name: `Build`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Constitution'
			},
			drive: {
				name: `Drive`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Constitution'
			},
			melee: {
				name: `Melee`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Constitution'
			},
			leadership: {
				name: `Leadership`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Demeanor'
			},
			perform: {
				name: `Perform`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Demeanor'
			},
			socialize: {
				name: `Socialize`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Demeanor'
			},
			tame: {
				name: `Tame`,
				base: 0,
				mods: 0,
				score: 0,
				parent: 'Demeanor'
			}
		},
		this.properties = {
			block: {
				name: `Block`,
				base: 0,
				mods: 0,
				score: 0
			},
			dodge: {
				name: `Dodge`,
				base: 0,
				mods: 0,
				score: 0
			},
			experience: {
				name: `Experience`,
				base: 3,
				mods: 0,
				score: 3,
				current: 3
			},
			health: {
				name: `Health`,
				head: {
					name: `Head`,
					base: 3,
					mods: 0,
					score: 3,
					current: 3,
				},
				rightArm: {
					name: `Right Arm`,
					base: 3,
					mods: 0,
					score: 3,
					current: 3,
				},
				leftArm: {
					name: `Left Arm`,
					base: 3,
					mods: 0,
					score: 3,
					current: 3,
				},
				torso: {
					name: `Torso`,
					base: 6,
					mods: 0,
					score: 6,
					current: 6,
				},
				leftLeg: {
					name: `Left Leg`,
					base: 3,
					mods: 0,
					score: 3,
					current: 3,
				},
				rightLeg: {
					name: `Right Leg`,
					base: 3,
					mods: 0,
					score: 3,
					current: 3,
				},
			},
			intellect: {
				name: `Intellect`,
				base: 1,
				mods: 0,
				score: 1
			},
			luck: {
				name: `Luck`,
				base: 1,
				mods: 0,
				score: 1,
				current: 1
			},
			psyche: {
				name: `Psyche`,
				base: 1,
				mods: 0,
				score: 3,
				current: 3
			},
			speed: {
				name: `Speed`,
				base: 1,
				mods: 0,
				score: 3,
				current: 0
			}
		},
		this.abilities = [],
		this.gear = {
			armor: {
				name: `Armor`,
				inventory: []
			},
			meleeWeapons: {
				name: `Melee Weapons`,
				inventory: []
			},
			rangedWeapons: {
				name: `Ranged Weapons`,
				inventory: []
			},
			ammo: {
				name: `Ammo`,
				inventory: []
			},
		}
	}
}