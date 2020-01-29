import Rule from './Rule'


export class Skill extends Rule {
	constructor({
		name,
		description,
		parent,
		difficulty,
		specialties=[]
	}) {
		super({
			name,
			description
		})
		this.parent = parent
		this.difficulty = difficulty
		this.specialties = specialties
	}
}

export class Specialty extends Rule {
	constructor({
		name,
		description
	}) {
		super({
			name,
			description
		})
	}
}


export const startingSkillPoints = (character) => {
	return character.traits.brains.base * 6
}


export const Acrobatics = new Skill({
	name: `Acrobatics`,
	description: [
		`Gymnastic prowess.`
	],
	parent: `Agility`,
	difficulty: 6,
	specialties: [
		new Specialty({
			name: `Dodge`,
			description: [
				`Roll vs [MATK or RATK].`
			]
		}),
		new Specialty({
			name: `Jump`,
			description: [
				`Running Jump [Speed]. Vertical [Speed x 3"].`
			]
		})
	]
})

export const Larceny = new Skill({
	name: `Larceny`,
	description: [
		`Delicate manual operations.`
	],
	parent: `Agility`,
	difficulty: 'varies',
	specialties: [
		new Specialty({
			name: `Mechanical`,
			description: [
				`(d6rnds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms. # by item.`
			]
		}),
		new Specialty({
			name: `Trick`,
			description: [
				`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`
			]
		})
	]
})

export const Ranged = new Skill({
	name: `Ranged`,
	description: [
		`Projectile combat.`
	],
	parent: `Agility`,
	difficulty: 'DEF',
	specialties: [
		new Specialty({
			name: `Shoot`,
			description: [
				`Roll vs [Dodge or Block (with a Shield)].`
			]
		}),
		new Specialty({
			name: `Throw`,
			description: [
				`Roll vs [Dodge or Block]. Range is [C x 2yds]`
			]
		})
	]
})

export const Stealth = new Skill({
	name: `Stealth`,
	description: [
		`Conceal your presence.`
	],
	parent: `Agility`,
	difficulty: 'Perception',
	specialties: [
		new Specialty({
			name: `Hide`,
			description: [
				`Stay motionless and Concealed. +3 if Prone.`
			]
		}),
		new Specialty({
			name: `Sneak`,
			description: [
				`Move [Speed / 2] while Concealed.`
			]
		})
	]
})

export const AgilitySkills = [
	Acrobatics,
	Larceny,
	Ranged,
	Stealth
]


export const Medicine = new Skill({
	name: `Medicine`,
	description: [
		`Diagnosing and treating wounds.`
	],
	parent: `Brains`,
	difficulty: 'Wounds',
	specialties: [
		new Specialty({
			name: `First-Aid`,
			description: [
				`Stop Bleeding. Takes 1d6rnds.`
			]
		}),
		new Specialty({
			name: `Surgery`,
			description: [
				`Heal 1 Wound. Cannot be performed again on the same patient until they are fully healed. d6DMG on a Botch.`
			]
		})
	]
})

export const Perception = new Skill({
	name: `Perception`,
	description: [
		`Processing sensory input.`
	],
	parent: `Brains`,
	difficulty: 'varies',
	specialties: [
		new Specialty({
			name: `Search`,
			description: [
				`Roll vs [Stealth (or Survival if tracking)].`
			]
		}),
		new Specialty({
			name: `Intuition`,
			description: [
				`Roll vs [Socialize or Perform].`
			]
		})
	]
})

export const Science = new Skill({
	name: `Science`,
	description: [
		`Knowledge of physical laws.`
	],
	parent: `Brains`,
	difficulty: 'varies',
	specialties: [
		new Specialty({
			name: `Chemistry`,
			description: [
				`(# x 10mins) Use [d6 + # Chemicals].`
			]
		}),
		new Specialty({
			name: `Technology`,
			description: [
				`(varies) Make or use electronic devices.`
			]
		})
	]
})

export const Survival = new Skill({
	name: `Survival`,
	description: [
		`Primitive practices for living outdoors.`
	],
	parent: `Brains`,
	difficulty: 'Biome',
	specialties: [
		new Specialty({
			name: `Forage`,
			description: [
				`(1hr) Provide 1 Need for 1 person.`
			]
		}),
		new Specialty({
			name: `Navigate`,
			description: [
				`(1min) Plot course. Roll vs [Perception] if tracked.`
			]
		})
	]
})

export const BrainsSkills = [
	Medicine,
	Perception,
	Science,
	Survival
]


export const Athletics = new Skill({
	name: `Athletics`,
	description: [
		`Physically difficult forms of motion.`
	],
	parent: `Constitution`,
	difficulty: 'varies',
	specialties: [
		new Specialty({
			name: `Climb`,
			description: [
				`Move along vertical surfaces at [Speed / 2].`
			]
		}),
		new Specialty({
			name: `Swim`,
			description: [
				`Move in water at [Speed / 4].`
			]
		})
	]
})

export const Build = new Skill({
	name: `Build`,
	description: [
		`Make an item from [d6 + #] Parts.`
	],
	parent: `Constitution`,
	difficulty: 'varies',
	specialties: [
		new Specialty({
			name: `Customize`,
			description: [
				`(#hrs) 3 per item. Each must be unique. Weapons: +1 RATK, +1 Melee DMG, or a new Attribute. Armor: +1 DR or a new Attribute.`
			]
		}),
		new Specialty({
			name: `Repair`,
			description: [
				`(#hrs) Fix broken item. +1 with same Parts.`
			]
		})
	]
})

export const Drive = new Skill({
	name: `Drive`,
	description: [
		`Operate vehicles.`
	],
	parent: `Constitution`,
	difficulty: 'varies',
	specialties: [
		new Specialty({
			name: `Ram`,
			description: [
				`Roll vs [Drive(Stunt)] to ATK with a vehicle.`
			]
		}),
		new Specialty({
			name: `Stunt`,
			description: [
				`Roll vs [Drive(Ram)] for DEF with a vehicle.`
			]
		})
	]
})

export const Melee = new Skill({
	name: `Melee`,
	description: [
		`Hand-to-hand combat.`
	],
	parent: `Constitution`,
	difficulty: 'ATK or DEF',
	specialties: [
		new Specialty({
			name: `Block`,
			description: [
				`Roll vs [MATK or RATK (if you have a Shield)].`
			]
		}),
		new Specialty({
			name: `Strike`,
			description: [
				`Roll vs [DEF]. DMG = [weapon DMG + Success].`
			]
		})
	]
})

export const ConstitutionSkills = [
	Athletics,
	Build,
	Drive,
	Melee
]


export const Leadership = new Skill({
	name: `Leadership`,
	description: [
		`Directing the efforts of others. Modifiers from multiple uses of the same Leadership Specialty do not stack.`
	],
	parent: `Demeanor`,
	difficulty: 'Demeanor',
	specialties: [
		new Specialty({
			name: `Encourage`,
			description: [
				`Roll vs [total target(s) Demeanor]. Target(s) get a bonus = [your Demeanor] to one roll you choose.`
			]
		}),
		new Specialty({
			name: `Intimidate`,
			description: [
				`Roll vs [total target(s) Demeanor]. Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`
			]
		})
	]
})

export const Perform = new Skill({
	name: `Perform`,
	description: [
		`Captivating an audience.`
	],
	parent: `Demeanor`,
	difficulty: 'Perception',
	specialties: [
		new Specialty({
			name: `Distract`,
			description: [
				`Target is Defenseless for 1rnd.`
			]
		}),
		new Specialty({
			name: `Deceive`,
			description: [
				`Target believes your plausible falsehood.`
			]
		})
	]
})

export const Socialize = new Skill({
	name: `Socialize`,
	description: [
		`Alter a person’s Attitude by one step.`
	],
	parent: `Demeanor`,
	difficulty: 'Demeanor',
	specialties: [
		new Specialty({
			name: `Persuade`,
			description: [
				`(d6mins) Target seriously considers your opinion.`
			]
		}),
		new Specialty({
			name: `Therapy`,
			description: [
				`Heal 1 Trauma. Cannot be performed again on the same day. d6DMG on a Botch.`
			]
		})
	]
})

export const Tame = new Skill({
	name: `Tame`,
	description: [
		`Alter an animal’s Attitude by one step.`
	],
	parent: `Demeanor`,
	difficulty: 'Demeanor',
	specialties: [
		new Specialty({
			name: `Command`,
			description: [
				`Animal obeys your command.`
			]
		}),
		new Specialty({
			name: `Train`,
			description: [
				`(1wk) Animals learn commands = [its Brains x 2].`
			]
		})
	]
})

export const DemeanorSkills = [
	Leadership,
	Perform,
	Socialize,
	Tame
]


const SkillList = [
	...AgilitySkills,
	...BrainsSkills,
	...ConstitutionSkills,
	...DemeanorSkills
]


let sList = []
SkillList.forEach((skill) => {
	skill.specialties.forEach((specialty) => {
		sList.push(specialty)
	})
})
export const SpecialtyList = [...sList]


export const SkillExplanation = `The ${SkillList.length} Skills range from 0 to 6. You get [B x 6] points for Skills. Skill rolls are [d6 + Skill]. Trait scores set the upper limit for their Skills. Specialties (listed below their Skills) equal their parent Skill by default. Specialties can exceed the parent Skill by taking the Specialize Ability. Unless otherwise noted, a Skill takes one Action.`

export const SkillFlowExplanation = `Skill Flow: Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.`


const Skills = SkillList

export default Skills