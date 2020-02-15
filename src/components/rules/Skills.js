import Skill from '../classes/Skill'
import Specialty from '../classes/Specialty'
import DynamicSort from '../helpers/DynamicSort'


export const startingSkillPoints = (character) => {
	return character.traits.brains.base * 6
}


export const Acrobatics = new Skill({
	name: `acrobatics`,
	description: [
		`Gymnastic prowess.`,
	],
	parent: `agility`,
	difficulty: 6,
	specialties: {
		dodge: new Specialty({
			name: `Dodge`,
			description: [
				`Roll vs [Melee or Ranged].`,
			]
		}),
		jump: new Specialty({
			name: `Jump`,
			description: [
				`Running Jump [Speed]. Vertical [Speed x 3"].`,
			]
		})
	}
})

export const Larceny = new Skill({
	name: `larceny`,
	description: [
		`Delicate manual operations.`,
	],
	parent: `agility`,
	difficulty: 'varies',
	specialties: {
		mechanical: new Specialty({
			name: `Mechanical`,
			description: [
				`(d6rnds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms. # by item.`,
			]
		}),
		trick: new Specialty({
			name: `Trick`,
			description: [
				`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`,
			]
		})
	}
})

export const Ranged = new Skill({
	name: `ranged`,
	description: [
		`Projectile combat.`,
	],
	parent: `agility`,
	difficulty: 'DEF',
	specialties: {
		shoot: new Specialty({
			name: `Shoot`,
			description: [
				`Roll vs [Dodge or Block (with a Shield)].`,
			]
		}),
		throw: new Specialty({
			name: `Throw`,
			description: [
				`Roll vs [Dodge or Block]. Range is [Constitution x 2yds]`,
			]
		})
	}
})

export const Stealth = new Skill({
	name: `stealth`,
	description: [
		`Conceal your presence.`,
	],
	parent: `agility`,
	difficulty: 'Perception',
	specialties: {
		hide: new Specialty({
			name: `Hide`,
			description: [
				`Stay motionless and Concealed. +3 if Prone.`,
			]
		}),
		sneak: new Specialty({
			name: `Sneak`,
			description: [
				`Move [Speed / 2] while Concealed.`,
			]
		})
	}
})

export const AgilitySkills = [
	{ ...Acrobatics },
	{ ...Larceny },
	{ ...Ranged },
	{ ...Stealth }
]


export const Medicine = new Skill({
	name: `medicine`,
	description: [
		`Diagnosing and treating wounds.`,
	],
	parent: `brains`,
	difficulty: 'Wounds',
	specialties: {
		firstaid: new Specialty({
			name: `First-Aid`,
			description: [
				`Stop Bleeding. Takes 1d6rnds.`,
			]
		}),
		surgery: new Specialty({
			name: `Surgery`,
			description: [
				`Heal 1 Wound. Cannot be performed again on the same patient until they are fully healed. d6 Damage on a Botch.`,
			]
		})
	}
})

export const Perception = new Skill({
	name: `perception`,
	description: [
		`Processing sensory input.`,
	],
	parent: `brains`,
	difficulty: 'varies',
	specialties: {
		search: new Specialty({
			name: `Search`,
			description: [
				`Roll vs [Stealth (or Survival if tracking)].`,
			]
		}),
		intuition: new Specialty({
			name: `Intuition`,
			description: [
				`Roll vs [Socialize or Perform].`,
			]
		})
	}
})

export const Science = new Skill({
	name: `science`,
	description: [
		`Knowledge of physical laws.`,
	],
	parent: `brains`,
	difficulty: 'varies',
	specialties: {
		chemistry: new Specialty({
			name: `Chemistry`,
			description: [
				`(# x 10mins) Use [d6 + # Chemicals].`,
			]
		}),
		technology: new Specialty({
			name: `Technology`,
			description: [
				`(varies) Make or use electronic devices.`,
			]
		})
	}
})

export const Survival = new Skill({
	name: `survival`,
	description: [
		`Primitive practices for living outdoors.`,
	],
	parent: `brains`,
	difficulty: 'Biome',
	specialties: {
		forage: new Specialty({
			name: `Forage`,
			description: [
				`(1hr) Provide 1 Need for 1 person.`,
			]
		}),
		navigate: new Specialty({
			name: `Navigate`,
			description: [
				`(1min) Plot course. Roll vs [Perception] if tracked.`,
			]
		})
	}
})

export const BrainsSkills = [
	{ ...Medicine },
	{ ...Perception },
	{ ...Science },
	{ ...Survival }
]


export const Athletics = new Skill({
	name: `athletics`,
	description: [
		`Physically difficult forms of motion.`,
	],
	parent: `constitution`,
	difficulty: 'varies',
	specialties: {
		climb: new Specialty({
			name: `Climb`,
			description: [
				`Move along vertical surfaces at [Speed / 2].`,
			]
		}),
		swim: new Specialty({
			name: `Swim`,
			description: [
				`Move in water at [Speed / 4].`,
			]
		})
	}
})

export const Build = new Skill({
	name: `build`,
	description: [
		`Make an item from [d6 + #] Parts.`,
	],
	parent: `constitution`,
	difficulty: 'varies',
	specialties: {
		customize: new Specialty({
			name: `Customize`,
			description: [
				`(#hrs) 3 per item. Each must be unique. Weapons: +1 Ranged Attack, +1 Melee Damage, or a new Attribute. Armor: +1 DR or a new Attribute.`,
			]
		}),
		repair: new Specialty({
			name: `Repair`,
			description: [
				`(#hrs) Fix broken item. +1 with same Parts.`,
			]
		})
	}
})

export const Drive = new Skill({
	name: `drive`,
	description: [
		`Operate vehicles.`,
	],
	parent: `constitution`,
	difficulty: 'varies',
	specialties: {
		ram: new Specialty({
			name: `Ram`,
			description: [
				`Roll vs [Drive(Stunt)] to ATK with a vehicle.`,
			]
		}),
		stunt: new Specialty({
			name: `Stunt`,
			description: [
				`Roll vs [Drive(Ram)] for DEF with a vehicle.`,
			]
		})
	}
})

export const Melee = new Skill({
	name: `melee`,
	description: [
		`Hand-to-hand combat.`,
	],
	parent: `constitution`,
	difficulty: 'ATK or DEF',
	specialties: {
		block: new Specialty({
			name: `Block`,
			description: [
				`Roll vs [Melee or Ranged (if you have a Shield)].`,
			]
		}),
		strike: new Specialty({
			name: `Strike`,
			description: [
				`Roll vs [DEF]. Damage = [weapon Damage + Success].`,
			]
		})
	}
})

export const ConstitutionSkills = [
	{ ...Athletics },
	{ ...Build },
	{ ...Drive },
	{ ...Melee }
]


export const Leadership = new Skill({
	name: `leadership`,
	description: [
		`Directing the efforts of others. Modifiers from multiple uses of the same Leadership Specialty do not stack.`,
	],
	parent: `demeanor`,
	difficulty: 'Demeanor',
	specialties: {
		encourage: new Specialty({
			name: `Encourage`,
			description: [
				`Roll vs [total target(s) Demeanor]. Target(s) get a bonus = [your Demeanor] to one roll you choose.`,
			]
		}),
		intimidate: new Specialty({
			name: `Intimidate`,
			description: [
				`Roll vs [total target(s) Demeanor]. Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`,
			]
		})
	}
})

export const Perform = new Skill({
	name: `perform`,
	description: [
		`Captivating an audience.`,
	],
	parent: `demeanor`,
	difficulty: 'Perception',
	specialties: {
		distract: new Specialty({
			name: `Distract`,
			description: [
				`Target is Defenseless for 1rnd.`,
			]
		}),
		deceive: new Specialty({
			name: `Deceive`,
			description: [
				`Target believes your plausible falsehood.`,
			]
		})
	}
})

export const Socialize = new Skill({
	name: `socialize`,
	description: [
		`Alter a person’s Attitude by one step.`,
	],
	parent: `demeanor`,
	difficulty: 'Demeanor',
	specialties: {
		persuade: new Specialty({
			name: `Persuade`,
			description: [
				`(d6mins) Target seriously considers your opinion.`,
			]
		}),
		therapy: new Specialty({
			name: `Therapy`,
			description: [
				`Heal 1 Trauma. Cannot be performed again on the same day. d6 Damage on a Botch.`,
			]
		})
	}
})

export const Tame = new Skill({
	name: `tame`,
	description: [
		`Alter an animal’s Attitude by one step.`,
	],
	parent: `demeanor`,
	difficulty: 'Demeanor',
	specialties: {
		command: new Specialty({
			name: `Command`,
			description: [
				`Animal obeys your command.`,
			]
		}),
		train: new Specialty({
			name: `Train`,
			description: [
				`(1wk) Animals learn commands = [its Brains x 2].`,
			]
		})
	}
})

export const DemeanorSkills = [
	{ ...Leadership },
	{ ...Perform },
	{ ...Socialize },
	{ ...Tame }
]


const Skills = [
	...AgilitySkills,
	...BrainsSkills,
	...ConstitutionSkills,
	...DemeanorSkills
]


let specList = []
Skills.forEach((skill) => {
	Object.keys(skill.specialties).forEach((specialty) => {
		specList.push(skill.specialties[specialty])
	})
})
specList.sort(DynamicSort('name'))
export const SpecialtyList = specList


export const SkillExplanation = `The ${Skills.length} Skills range from 0 to 6. You get [Brains x 6] points for Skills. Skill rolls are [d6 + Skill]. Trait scores set the upper limit for their Skills. Specialties (listed below their Skills) equal their parent Skill by default. Specialties can exceed the parent Skill by taking the Specialize Ability. Unless otherwise noted, a Skill takes one Action.`

export const SkillFlowExplanation = `Skill Flow: Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.`


export default Skills