import Rule from './rule'
import { SpecialtyList } from './Skills'

class Ability extends Rule {
	constructor(name, description, max, xp, taken, notes, options=[]) {
		super(name, description)
		this.max = max
		this.xp = xp
		this.taken = taken
		this.notes = notes
		this.options = options
	}
}

// 3 XP Abilities

export const FavoriteWeapon = new Ability(`Favorite Weapon`, `Botch is only a Fail with this one weapon.`, 1, 3, 0, ``)

export const HyperImmunity = new Ability(`Hyper Immunity`, `+1 to resist Diseases.`, 3, 3, 0, ``)

export const PackMentality = new Ability(`Pack Mentality`, `+1 ATK at a target a Comrade ATKs this rnd.`, 1, 3, 0, ``)

export const QuickReload = new Ability(`Quick Reload`, `Free Reload once per rnd.`, 1, 3, 0, ``)

export const Specialize = new Ability(`Specialize*`, `+1 to a Skill Specialty.`, 1, 3, 0, ``, SpecialtyList)

export const WeaponTraining = new Ability(`Weapon Training*`, `+1 ATK for a specific weapon.`, 1, 3, 0, ``)

export const XP3Abilities = [
	FavoriteWeapon,
	HyperImmunity,
	PackMentality,
	QuickReload,
	Specialize,
	WeaponTraining
]

// 6 XP Abilities

export const EfficientWork = new Ability(`Efficient Work*`, `[Time / 2] for a Skill (minimum 1 action).`, 1, 6, 0, ``)

export const FastDraw = new Ability(`Fast Draw`, `Free item draw once per rnd.`, 1, 6, 0, ``)

export const FleetFooted = new Ability(`Fleet Footed`, `+1 Speed.`, 3, 6, 0, ``)

export const Multilingual = new Ability(`Multilingual*`, `Learn a different form of communication.`, 9, 6, 0, ``)

export const Practice = new Ability(`Practice*`, `+1 to a Skill (up to the parent Trait).`, 1, 6, 0, ``)

// OPEN SLOT FOR NEW 6XP ABILITY

export const XP6Abilities = [
	EfficientWork,
	FastDraw,
	FleetFooted,
	Multilingual,
	Practice
]

// 9 XP Abilities

export const DangerSense = new Ability(`Danger Sense`, `+1 Reflex.`, 1, 9, 0, ``)

export const Discipline = new Ability(`Discipline`, `Ignore 1 Pain penalty.`, 3, 9, 0, ``)

export const Fortunate = new Ability(`Fortunate`, `+1 Luck.`, 1, 9, 0, ``)

export const FreeRunning = new Ability(`Free Running`, `Acrobatics 9# to Climb as a Run action.`, 1, 9, 0, ``)

export const Unorthodox = new Ability(`Unorthodox*`, `Pick a new parent Trait for a Skill.`, 1, 9, 0, ``)

// OPEN SLOT FOR NEW 9XP ABILITY

export const XP9Abilities = [
	DangerSense,
	Discipline,
	Fortunate,
	FreeRunning,
	Unorthodox
]

// 12 XP Abilities

export const Fencing = new Ability(`Fencing`, `Free Block roll once per rnd.`, 1, 12, 0, ``)

export const Sidestep = new Ability(`Side-step`, `Free Dodge roll once per rnd.`, 1, 12, 0, ``)

export const Wrestling = new Ability(`Wrestling`, `Free Grab roll once per rnd.`, 1, 12, 0, ``)

export const XP12Abilities = [
	Fencing,
	Sidestep,
	Wrestling
]

// 15 XP Abilities

export const FirmGrip = new Ability(`Firm Grip`, `Use 2h weapons in 1h, up to Size 3.`, 1, 15, 0, ``)

export const HardHeaded = new Ability(`Hard Headed`, `Ignore Stun from Head DMG.`, 1, 15, 0, ``)

export const PowerfulStrike = new Ability(`Powerful Strike*`, `+1 DMG for a specific Melee weapon.`, 1, 15, 0, ``)

export const XP15Abilities = [
	FirmGrip,
	HardHeaded,
	PowerfulStrike
]

// 18 XP Abilities

export const Assassin = new Ability(`Assassin`, `+3 DMG to ATKs from Concealment.`, 1, 18, 0, ``)

export const VehicleOperation = new Ability(`Vehicle Operation*`, `Proficiently operate a class of vehicle.`, 1, 18, 0, ``)

export const XP18Abilities = [
	Assassin,
	VehicleOperation
]

// 24 XP Abilities

export const Ambidextrous = new Ability(`Ambidextrous`, `Off-hand penalty is -1 instead of -3.`, 1, 24, 0, ``)

export const Tough = new Ability(`Tough`, `+1 Health.`, 3, 24, 0, ``)

export const XP24Abilities = [
	Ambidextrous,
	Tough
]

// 30 XP Abilities

export const SelfImprovement = new Ability(`Self Improvement*`, `+1 to a Trait (max 6).`, 3, 30, 0, ``)

export const SecondChance = new Ability(`Second Chance`, `Spend this Ability to avoid Death once.`, 9, 30, 0, ``)

export const XP30Abilities = [
	SelfImprovement,
	SecondChance
]

export const AbilityList = [
	...XP3Abilities,
	...XP6Abilities,
	...XP9Abilities,
	...XP12Abilities,
	...XP15Abilities,
	...XP18Abilities,
	...XP24Abilities,
	...XP30Abilities
]