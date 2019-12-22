import Rule from './Rule.js'

export class Skill extends Rule {
	constructor(name, description, parent, difficulty, specialties=[]) {
		super(name, description)
		this.parent = parent
		this.difficulty = difficulty
		this.specialties = specialties
	}
}

export class Specialty extends Rule {
	constructor(name, description) {
		super(name, description)
	}
}


export const SkillExplanation = 'The 12 Skills range from 1 to 6. You get [B x 3] points for Skills. Skill rolls are [d6 + Skill]. Trait scores set the upper limit for their Skills. Specialties (listed below their Skills) equal their parent Skill by default. Specialties can exceed the parent Skill by taking the Specialize Ability. Unless otherwise noted, a Skill takes one Action.'

export const SkillFlowExplanation = 'Skill Flow: Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.'


export const Acrobatics = new Skill(
	`Acrobatics`,
	`Gymnastic prowess.`,
	`Agility`,
	6,
	[
		new Specialty(`Dodge`, `Roll vs [MATK or Ranged(Throw)].`),
		new Specialty(`Jump`, `Running Jump [Speed]. Vertical [Speed x 3"].`)
	]
)

export const Larceny = new Skill(
	`Larceny`,
	`Delicate manual operations.`,
	`Agility`,
	'varies',
	[
		new Specialty(`Mechanical`, `(d6rnds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms. # by item.`),
		new Specialty(`Trick`, `Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`)
	]
)

export const Ranged = new Skill(
	`Ranged`,
	`Projectile combat.`,
	`Agility`,
	'DEF',
	[
		new Specialty(`Shoot`, `Roll vs [Reflex or Block (with a Shield)].`),
		new Specialty(`Throw`, `Roll vs [Dodge or Block (with a Shield)].`)
	]
)

export const Stealth = new Skill(
	`Stealth`,
	`Conceal your presence.`,
	`Agility`,
	'Perception',
	[
		new Specialty(`Hide`, `Stay motionless and Concealed. +3 if Prone.`),
		new Specialty(`Sneak`, `Move [Speed / 2] while Concealed.`)
	]
)

export const AgilitySkills = [Acrobatics, Larceny, Ranged, Stealth]


export const Medicine = new Skill(
	`Medicine`,
	`Diagnosing and treating wounds.`,
	`Brains`,
	'Wounds',
	[
		new Specialty(`First-Aid`, `Stop Bleeding. Takes 1d6rnds.`),
		new Specialty(`Surgery`, `Heal 1 Wound. Cannot be performed again on the same patient until they are fully healed. d6DMG on a Botch.`)
	]
)

export const Perception = new Skill(
	`Perception`,
	`Processing sensory input.`,
	`Brains`,
	'varies',
	[
		new Specialty(`Search`, `Roll vs [Stealth (or Survival if tracking)].`),
		new Specialty(`Intuition`, `Roll vs [Socialize or Perform].`)
	]
)

export const Science = new Skill(
	`Science`,
	`Knowledge of physical laws.`,
	`Brains`,
	'varies',
	[
		new Specialty(`Chemistry`, `(# x 10mins) Use [d6 + # Chemicals].`),
		new Specialty(`Technology`, `(varies) Make or use electronic devices.`)
	]
)

export const Survival = new Skill(
	`Survival`,
	`Primitive practices for living outdoors.`,
	`Brains`,
	'Biome',
	[
		new Specialty(`Forage`, `(1hr) Provide 1 Need for 1 person.`),
		new Specialty(`Navigate`, `(1min) Plot course. Roll vs [Perception] if tracked.`)
	]
)

export const BrainsSkills = [Medicine, Perception, Science, Survival]


export const Athletics = new Skill(
	`Athletics`,
	`Physically difficult forms of motion.`,
	`Constitution`,
	'varies',
	[
		new Specialty(`Climb`, `Move along vertical surfaces at [Speed / 2].`),
		new Specialty(`Swim`, `Move in water at [Speed / 4].`)
	]
)

export const Build = new Skill(
	`Build`,
	`Make an item from [d6 + #] Parts.	`,
	`Constitution`,
	'varies',
	[
		new Specialty(`Customize`, `(#hrs) 3 per item. Each must be unique. Weapons: +1 RATK, +1 Melee DMG, or a new Attribute. Armor: +1 DR or a new Attribute.`),
		new Specialty(`Repair`, `(#hrs) Fix broken item. +1 with same Parts.`)
	]
)

export const Drive = new Skill(
	`Drive`,
	`Operate vehicles.`,
	`Constitution`,
	'varies',
	[
		new Specialty(`Ram`, `Roll vs [Drive(Stunt)] to ATK with a vehicle.`),
		new Specialty(`Stunt`, `Roll vs [Drive(Ram)] for DEF with a vehicle.`)
	]
)

export const Melee = new Skill(
	`Melee`,
	`Hand-to-hand combat.`,
	`Constitution`,
	'ATK or DEF',
	[
		new Specialty(`Block`, `Roll vs [MATK or RATK (if you have a Shield)].`),
		new Specialty(`Strike`, `Roll vs [DEF]. DMG = [weapon DMG + Success].`)
	]
)

export const ConstitutionSkills = [Athletics, Build, Drive, Melee]


export const Leadership = new Skill(
	`Leadership`,
	`Directing the efforts of others. Modifiers from multiple uses of the same Leadership Specialty do not stack.`,
	`Demeanor`,
	'Demeanor',
	[
		new Specialty(`Encourage`, `Roll vs [total target(s) Demeanor]. Target(s) get a bonus = [your Demeanor] to one roll you choose.`),
		new Specialty(`Intimidate`, `Roll vs [total target(s) Demeanor]. Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`)
	]
)

export const Perform = new Skill(
	`Perform`,
	`Captivating an audience.`,
	`Demeanor`,
	'Perception',
	[
		new Specialty(`Distract`, `Target is Defenseless for 1rnd.`),
		new Specialty(`Deceive`, `Target believes your plausible falsehood.`)
	]
)

export const Socialize = new Skill(
	`Socialize`,
	`Alter a person’s Attitude by one step.`,
	`Demeanor`,
	'Demeanor',
	[
		new Specialty(`Gossip`, `(d6hrs) Gather or spread rumors.`),
		new Specialty(`Persuade`, `(d6mins) Target seriously considers your opinion.`)
	]
)

export const Tame = new Skill(
	`Tame`,
	`Alter an animal’s Attitude by one step.`,
	`Demeanor`,
	'Demeanor',
	[
		new Specialty(`Command`, `Animal obeys your command.`),
		new Specialty(`Train`, `(1wk) Animals learn commands = [its Brains x 2].`)
	]
)

export const DemeanorSkills = [Leadership, Perform, Socialize, Tame]


export const SkillList = [
	...AgilitySkills,
	...BrainsSkills,
	...ConstitutionSkills,
	...DemeanorSkills
]