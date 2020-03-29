import PropSort from '../helpers/PropSort'
import RandomRoll from '../helpers/Random'
import Skill from '../classes/Skill'
import Specialty from '../classes/Specialty'
import { skillPoints } from './Properties'

export const SkillExplanation = [
	`You get ${skillPoints.description[0]} to assign.`,
	`Skills range from 0 to 6.`,
	`Skill rolls are [d6 + Skill].`,
	`Trait scores set the limit for their Skills.`,
]

export const acrobatics = new Skill({
	name: `Acrobatics`,
	description: [
		`Gymnastic prowess.`,
	],
	parent: `Agility`,
	difficulty: 6,
	specialties: {
		dodge: new Specialty({
			name: `Dodge`,
			description: [
				`Roll vs [Melee or Ranged].`,
				`Reflexive Dodge is your Dodge score with no roll.`,
			]
		}),
		jump: new Specialty({
			name: `Jump`,
			description: [
				`Running Jump distance is yards = [Agility].`,
				`Vertical Jump distance is [Agility x 6] inches.`,
			]
		})
	}
})

export const larceny = new Skill({
	name: `Larceny`,
	description: [
		`Delicate manual operations.`,
	],
	parent: `agility`,
	difficulty: `varies`,
	specialties: {
		mechanical: new Specialty({
			name: `Mechanical`,
			description: [
				`(d6 rounds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms`,
				`# by item.`,
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

export const ranged = new Skill({
	name: `Ranged`,
	description: [
		`Projectile combat.`,
	],
	parent: `Agility`,
	difficulty: `Defense`,
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
				`Roll vs [Dodge or Block]`,
				`Range is [Constitution x 3yds]`,
			]
		})
	}
})

export const stealth = new Skill({
	name: `Stealth`,
	description: [
		`Conceal your presence.`,
	],
	parent: `Agility`,
	difficulty: `Perception`,
	specialties: {
		hide: new Specialty({
			name: `Hide`,
			description: [`Stay motionless and Concealed`,
				`+3 if Prone.`,]
		}),
		sneak: new Specialty({
			name: `Sneak`,
			description: [
				`Move Walk Speed while Concealed.`,
			]
		})
	}
})

export const AgilitySkills = [
	acrobatics,
	larceny,
	ranged,
	stealth,
]

export const medicine = new Skill({
	name: `Medicine`,
	description: [
		`Diagnosing and treating wounds.`,
	],
	parent: `Brains`,
	difficulty: `Wounds`,
	specialties: {
		firstaid: new Specialty({
			name: `First-Aid`,
			description: [
				`Stop Bleeding`,
				`Takes 1d6 rounds.`,
			]
		}),
		surgery: new Specialty({
			name: `Surgery`,
			description: [
				`Heal 1 Wound.`,
				`Cannot be performed again on the same patient until they are fully healed.`,
				`d6 Damage on a Botch.`,
			]
		})
	}
})

export const perception = new Skill({
	name: `Perception`,
	description: [
		`Processing sensory input.`,
	],
	parent: `Brains`,
	difficulty: `varies`,
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

export const science = new Skill({
	name: `Science`,
	description: [
		`Knowledge of physical laws.`,
	],
	parent: `Brains`,
	difficulty: `varies`,
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

export const survival = new Skill({
	name: `Survival`,
	description: [
		`Primitive practices for living outdoors.`,
	],
	parent: `Brains`,
	difficulty: `Biome`,
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
				`(1min) Plot course`,
				`Roll vs [Perception] if tracked.`,
			]
		})
	}
})

export const BrainsSkills = [
	medicine,
	perception,
	science,
	survival,
]

export const athletics = new Skill({
	name: `Athletics`,
	description: [
		`Physically difficult forms of motion.`,
	],
	parent: `Constitution`,
	difficulty: `varies`,
	specialties: {
		climb: new Specialty({
			name: `Climb`,
			description: [
				`Move along vertical surfaces at [Walk Speed / 2].`,
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

export const build = new Skill({
	name: `Build`,
	description: [
		`Make an item from [d6 + #] Parts.`,
	],
	parent: `Constitution`,
	difficulty: `varies`,
	specialties: {
		customize: new Specialty({
			name: `Customize`,
			description: [
				`(#hrs) 3 per item`,
				`Each must be unique`,
				`Weapons: +1 Ranged Attack, +1 Melee Damage, or a new Attribute`,
				`Armor: +1 Damage Resistance or a new Attribute.`,
			]
		}),
		repair: new Specialty({
			name: `Repair`,
			description: [
				`(#hrs) Fix broken item`,
				`+1 with same Parts.`,
			]
		})
	}
})

export const drive = new Skill({
	name: `Drive`,
	description: [
		`Operate vehicles.`,
	],
	parent: `Constitution`,
	difficulty: `varies`,
	specialties: {
		ram: new Specialty({
			name: `Ram`,
			description: [
				`Roll vs [Drive(Stunt)] to Attack with a vehicle.`,
			]
		}),
		stunt: new Specialty({
			name: `Stunt`,
			description: [
				`Roll vs [Drive(Ram)] for Defense with a vehicle.`,
			]
		})
	}
})

export const melee = new Skill({
	name: `Melee`,
	description: [
		`Hand-to-hand combat.`,
	],
	parent: `Constitution`,
	difficulty: `Attack or Defense`,
	specialties: {
		block: new Specialty({
			name: `Block`,
			description: [
				`Roll vs [Melee or Ranged (if you have a Shield)].`,
				`Reflexive Block is your Block score with no roll.`,
			]
		}),
		strike: new Specialty({
			name: `Strike`,
			description: [
				`Roll vs [Defense].`,
				`Damage = [weapon Damage + Success].`,
			]
		})
	}
})

export const ConstitutionSkills = [
	athletics,
	build,
	drive,
	melee,
]

export const leadership = new Skill({
	name: `Leadership`,
	description: [
		`Directing the efforts of others`,
		`Modifiers from multiple uses of the same Leadership Specialty do not stack.`,
	],
	parent: `Demeanor`,
	difficulty: `Demeanor`,
	specialties: {
		encourage: new Specialty({
			name: `Encourage`,
			description: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) get a bonus = [your Demeanor] to one roll you choose.`,
			]
		}),
		intimidate: new Specialty({
			name: `Intimidate`,
			description: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`
			]
		})
	}
})

export const perform = new Skill({
	name: `Perform`,
	description: [
		`Captivating an audience.`,
	],
	parent: `Demeanor`,
	difficulty: `Perception`,
	specialties: {
		distract: new Specialty({
			name: `Distract`,
			description: [
				`Target is Defenseless for 1 round.`,
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

export const socialize = new Skill({
	name: `Socialize`,
	description: [
		`Alter a person’s Attitude by one step.`,
	],
	parent: `Demeanor`,
	difficulty: `Demeanor`,
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
				`Heal 1 Trauma`,
				`Cannot be performed again on the same day.`,
				`d6 Trauma on a Botch.`,
			]
		})
	}
})

export const tame = new Skill({
	name: `Tame`,
	description: [
		`Alter an animal’s Attitude by one step.`,
	],
	parent: `Demeanor`,
	difficulty: `Demeanor`,
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
	leadership,
	perform,
	socialize,
	tame,
]

export const SkillList = [
	...AgilitySkills,
	...BrainsSkills,
	...ConstitutionSkills,
	...DemeanorSkills,
]

export const SpecialtyExplanation = `Specialties (listed below their Skills) equal their parent Skill by default. Specialties can exceed the parent Skill by taking the Specialize Ability. Unless otherwise noted, a Skill takes one Action.`

export const SkillFlowExplanation = `Skill Flow: Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.`

const SpecialtyList = Object.values(SkillList)
						.map((s) => Object.values(s.specialties))
						.reduce((a, b) =>  a.concat(b), [])
						.sort((a, b) => PropSort(a, b, `name`))


export default {
	name: `Skills`,
	explanation: SkillExplanation,
	list: SkillList,
	groups: [
		{
			name: `Agility`,
			list: AgilitySkills
		},
		{
			name: `Brains`,
			list: BrainsSkills
		},
		{
			name: `Constitution`,
			list: ConstitutionSkills
		},
		{
			name: `Demeanor`,
			list: DemeanorSkills
		},
	],
	specialties: SpecialtyList,
	startingPoints: (c) => c.traits.brains.base * 6,
	assign: function(c, target) {
		c.skills[target.name].base = parseInt(target.value)
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		const max = c.traits[c.skills[targetName].parent.toLowerCase()].base
		while(this.remaining(c) < 0 || c.skills[targetName].base > max) {
			c.skills[targetName].base--
		}
		return this.setScores(c)
	},
	random: function(c) {
		c = this.reset(c)
		while(this.remaining(c) > 0) {
			const t = RandomRoll(Object.keys(c.skills))
			const parentScore = c.traits[c.skills[t].parent.toLowerCase()].base
			if (c.skills[t].base < parentScore) c.skills[t].base++
		}
		return this.setScores(c)
	},
	remaining: function(c) {
		const spent = Object.values(c.skills).reduce((t, { base }) => t += base, 0)
		return this.startingPoints(c) - spent
	},
	reset: function(c) {
		Object.keys(c.skills).forEach(t => c.skills[t].base = 0)
		return c
	},
	setScores: function(c) {
		Object.keys(c.skills).forEach(t => {
			c.skills[t].score = c.skills[t].base + c.skills[t].mods
		})
		return c
	}
}