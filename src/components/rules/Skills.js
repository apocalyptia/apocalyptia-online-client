import PropSort from '../helpers/PropSort'
import RandomRoll from '../helpers/Random'
import Skill from '../classes/Skill'
import Specialty from '../classes/Specialty'


export const SkillExplanation = [
	`You get Brains x 6 Skill points to assign.`,
	`Skills range from 0 to 6.`,
	`Skill rolls are [d6 + Skill].`,
	`Trait scores set the limit for their Skills.`,
]

export const acrobatics = new Skill({
	name: `Acrobatics`,
	desc: [
		`Gymnastic prowess.`,
	],
	parent: `Agility`,
	diff: 6,
	specs: {
		dodge: new Specialty({
			name: `Dodge`,
			desc: [
				`Roll Acrobatics(Dodge) vs [Melee or Ranged].`,
				`As part of a Dodge, you may drop Prone for free if you wish.`,
				`Reflexive Dodge is your Dodge score with no roll.`,
			]
		}),
		jump: new Specialty({
			name: `Jump`,
			desc: [
				`Running Jump distance is yards = [Agility].`,
				`Vertical Jump distance is [Agility x 6] inches.`,
			]
		})
	}
})

export const larceny = new Skill({
	name: `Larceny`,
	desc: [
		`Delicate manual operations.`,
	],
	parent: `agility`,
	diff: `varies`,
	specs: {
		mechanical: new Specialty({
			name: `Mechanical`,
			desc: [
				`(d6 rounds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms`,
				`# by item.`,
			]
		}),
		trick: new Specialty({
			name: `Trick`,
			desc: [
				`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`,
			]
		})
	}
})

export const ranged = new Skill({
	name: `Ranged`,
	desc: [
		`Projectile combat.`,
	],
	parent: `Agility`,
	diff: `Defense`,
	specs: {
		shoot: new Specialty({
			name: `Shoot`,
			desc: [
				`Roll vs [Dodge or Block (with a Shield)].`,
			]
		}),
		throw: new Specialty({
			name: `Throw`,
			desc: [
				`Roll vs [Dodge or Block]`,
				`Range is [Constitution x 3yds]`,
			]
		})
	}
})

export const stealth = new Skill({
	name: `Stealth`,
	desc: [
		`Conceal your presence.`,
	],
	parent: `Agility`,
	diff: `Perception`,
	specs: {
		hide: new Specialty({
			name: `Hide`,
			desc: [`Stay motionless and Concealed`,
				`+3 if Prone.`,]
		}),
		sneak: new Specialty({
			name: `Sneak`,
			desc: [
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
	desc: [
		`Diagnosing and treating Wounds and Diseases.`,
	],
	parent: `Brains`,
	diff: `Damage`,
	specs: {
		firstaid: new Specialty({
			name: `First-Aid`,
			desc: [
				`Stop a Wound from Bleeding.`,
				`Takes 1d6 minutes.`,
			]
		}),
		surgery: new Specialty({
			name: `Surgery`,
			desc: [
				`Heal 1 Damage on a Wound.`,
				`Cannot be performed again on the same Wound until it is fully healed.`,
				`Inflict an additional d6 Damage on a Botch.`,
			]
		})
	}
})

export const perception = new Skill({
	name: `Perception`,
	desc: [
		`Processing sensory input.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		search: new Specialty({
			name: `Search`,
			desc: [
				`Roll vs [Stealth (or Survival if tracking)].`,
			]
		}),
		intuition: new Specialty({
			name: `Intuition`,
			desc: [
				`Roll vs [Socialize or Perform].`,
			]
		})
	}
})

export const science = new Skill({
	name: `Science`,
	desc: [
		`Knowledge of physical laws.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		chemistry: new Specialty({
			name: `Chemistry`,
			desc: [
				`(# x 10mins) Use [d6 + # Chemicals].`,
			]
		}),
		technology: new Specialty({
			name: `Technology`,
			desc: [
				`(varies) Make or use electronic devices.`,
			]
		})
	}
})

export const survival = new Skill({
	name: `Survival`,
	desc: [
		`Primitive practices for living outdoors.`,
	],
	parent: `Brains`,
	diff: `Biome`,
	specs: {
		forage: new Specialty({
			name: `Forage`,
			desc: [
				`(1hr) Provide 1 Need for 1 person.`,
			]
		}),
		navigate: new Specialty({
			name: `Navigate`,
			desc: [
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
	desc: [
		`Physically difficult forms of motion.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		climb: new Specialty({
			name: `Climb`,
			desc: [
				`Move along vertical surfaces at [Walk Speed / 2].`,
			]
		}),
		swim: new Specialty({
			name: `Swim`,
			desc: [
				`Move in water at [Speed / 4].`,
			]
		})
	}
})

export const build = new Skill({
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

export const drive = new Skill({
	name: `Drive`,
	desc: [
		`Operate vehicles.`,
	],
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		ram: new Specialty({
			name: `Ram`,
			desc: [
				`Roll vs [Drive(Stunt)] to Attack with a vehicle.`,
			]
		}),
		stunt: new Specialty({
			name: `Stunt`,
			desc: [
				`Roll vs [Drive(Ram)] for Defense with a vehicle.`,
			]
		})
	}
})

export const melee = new Skill({
	name: `Melee`,
	desc: [
		`Hand-to-hand combat.`,
	],
	parent: `Constitution`,
	diff: `Attack or Defense`,
	specs: {
		block: new Specialty({
			name: `Block`,
			desc: [
				`Roll vs [Melee or Ranged (if you have a Shield)].`,
				`Reflexive Block is your Block score with no roll.`,
			]
		}),
		strike: new Specialty({
			name: `Strike`,
			desc: [
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
	desc: [
		`Directing the efforts of others`,
		`Modifiers from multiple uses of the same Leadership Specialty do not stack.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		encourage: new Specialty({
			name: `Encourage`,
			desc: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) get a bonus = [your Demeanor] to one roll you choose.`,
			]
		}),
		intimidate: new Specialty({
			name: `Intimidate`,
			desc: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`
			]
		})
	}
})

export const perform = new Skill({
	name: `Perform`,
	desc: [
		`Captivating an audience.`,
	],
	parent: `Demeanor`,
	diff: `Perception`,
	specs: {
		distract: new Specialty({
			name: `Distract`,
			desc: [
				`Target is Defenseless for 1 round.`,
			]
		}),
		deceive: new Specialty({
			name: `Deceive`,
			desc: [
				`Target believes your plausible falsehood.`,
			]
		})
	}
})

export const socialize = new Skill({
	name: `Socialize`,
	desc: [
		`Alter a person’s Attitude by one step.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		persuade: new Specialty({
			name: `Persuade`,
			desc: [
				`(d6mins) Target seriously considers your opinion.`,
			]
		}),
		therapy: new Specialty({
			name: `Therapy`,
			desc: [
				`Heal 1 Trauma`,
				`Cannot be performed again on the same day.`,
				`d6 Trauma on a Botch.`,
			]
		})
	}
})

export const tame = new Skill({
	name: `Tame`,
	desc: [
		`Alter an animal’s Attitude by one step.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		command: new Specialty({
			name: `Command`,
			desc: [
				`Animal obeys your command.`,
			]
		}),
		train: new Specialty({
			name: `Train`,
			desc: [
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
	.map((s) => Object.values(s.specs))
	.reduce((a, b) => a.concat(b), [])
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
	specs: SpecialtyList,
	startingPoints: (c) => c.traits.brains.score * 6,
	assign: function(c, target) {
		c.skills[target.name].score = parseInt(target.value)
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		const max = c.traits[c.skills[targetName].parent.toLowerCase()].score
		while(this.remaining(c) < 0 || c.skills[targetName].score > max) {
			c.skills[targetName].score--
		}
		return c
	},
	random: function(c) {
		c = this.reset(c)
		while(this.remaining(c) > 0) {
			const t = RandomRoll(Object.keys(c.skills))
			const parentScore = c.traits[c.skills[t].parent.toLowerCase()].score
			if (c.skills[t].score < parentScore) c.skills[t].score++
		}
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.skills).reduce((t, { score }) => t += score, 0)
		return this.startingPoints(c) - spent
	},
	reset: function(c) {
		Object.keys(c.skills).forEach(t => c.skills[t].score = 0)
		return c
	},
}