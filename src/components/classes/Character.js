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
				score: 1
			},
			brains: {
				name: `Brains`,
				score: 1
			},
			constitution: {
				name: `Constitution`,
				score: 1
			},
			demeanor: {
				name: `Demeanor`,
				score: 1
			}
		},
		this.skills = {
			acrobatics: {
				name: `Acrobatics`,
				score: 0,
				parent: 'Agility'
			},
			larceny: {
				name: `Larceny`,
				score: 0,
				parent: 'Agility'
			},
			ranged: {
				name: `Ranged`,
				score: 0,
				parent: 'Agility'
			},
			stealth: {
				name: `Stealth`,
				score: 0,
				parent: 'Agility'
			},
			medicine: {
				name: `Medicine`,
				score: 0,
				parent: 'Brains'
			},
			perception: {
				name: `Perception`,
				score: 0,
				parent: 'Brains'
			},
			science: {
				name: `Science`,
				score: 0,
				parent: 'Brains'
			},
			survival: {
				name: `Survival`,
				score: 0,
				parent: 'Brains'
			},
			athletics: {
				name: `Athletics`,
				score: 0,
				parent: 'Constitution'
			},
			build: {
				name: `Build`,
				score: 0,
				parent: 'Constitution'
			},
			drive: {
				name: `Drive`,
				score: 0,
				parent: 'Constitution'
			},
			melee: {
				name: `Melee`,
				score: 0,
				parent: 'Constitution'
			},
			leadership: {
				name: `Leadership`,
				score: 0,
				parent: 'Demeanor'
			},
			perform: {
				name: `Perform`,
				score: 0,
				parent: 'Demeanor'
			},
			socialize: {
				name: `Socialize`,
				score: 0,
				parent: 'Demeanor'
			},
			tame: {
				name: `Tame`,
				score: 0,
				parent: 'Demeanor'
			}
		},
		this.properties = {
			block: {
				name: `Block`,
				score: 0
			},
			carry: {
				name: `Carry`,
				score: 6,
				current: 0
			},
			dodge: {
				name: `Dodge`,
				score: 0
			},
			experience: {
				name: `Experience`,
				score: 3,
				spent: 0,
				remaining: 3
			},
			intellect: {
				name: `Intellect`,
				score: 1
			},
			luck: {
				name: `Luck`,
				score: 1,
				current: 1
			},
			psyche: {
				name: `Psyche`,
				score: 3,
				current: 3
			},
			speed: {
				name: `Speed`,
				score: 3
			}
		},
		this.health = {
			head: {
				name: `Head`,
				score: 3,
				current: 3
			},
			rightArm: {
				name: `Right Arm`,
				score: 3,
				current: 3
			},
			leftArm: {
				name: `Left Arm`,
				score: 3,
				current: 3
			},
			torso: {
				name: `Torso`,
				score: 6,
				current: 6
			},
			leftLeg: {
				name: `Left Leg`,
				score: 3,
				current: 3
			},
			rightLeg: {
				name: `Right Leg`,
				score: 3,
				current: 3
			},
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