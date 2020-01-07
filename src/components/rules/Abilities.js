import Rule from './Rule'
import { TraitList } from './Traits'
import { SkillList, SpecialtyList } from './Skills'
import { MeleeList, WeaponList } from './Gear'
import { Languages } from '../../helpers/lists/languages'

export class Ability extends Rule {
	constructor(
		name,
		description,
		max,
		xp,
		taken=0,
		options=[``],
		selection=0,
		notes=``,
		visible=false
	) {
		super(name, description)
		this.max = max
		this.xp = xp
		this.taken = taken
		this.options = options
		this.selection = selection,
		this.notes = notes,
		this.visible = visible
	}
}

// 3 XP Abilities

export const FavoriteWeapon = new Ability(
	`Favorite Weapon`,
	[`Botch is only a Fail with this weapon type.`],
	1, 3, 0,
	WeaponList
)
export const HyperImmunity = new Ability(
	`Hyper Immunity`,
	[`+1 to resist Diseases.`],
	3, 3, 0,
)
export const PackMentality = new Ability(
	`Pack Mentality`,
	[`+1 ATK at a target a Comrade ATKs this rnd.`],
	1, 3, 0
)
export const QuickReload = new Ability(
	`Quick Reload`,
	[`Free Reload once per rnd.`],
	1, 3, 0
)
export const Specialize = new Ability(
	`Specialize`,
	[`+1 to a Skill Specialty.`],
	1, 3, 0,
	SpecialtyList
)
export const WeaponTraining = new Ability(
	`Weapon Training`,
	[`+1 ATK with this weapon type.`],
	1, 3, 0,
	WeaponList
)

export const XP3Abilities = [
	FavoriteWeapon,
	HyperImmunity,
	PackMentality,
	QuickReload,
	Specialize,
	WeaponTraining
]

// 6 XP Abilities ---> TODO: Add 1 more

export const EfficientWork = new Ability(
	`Efficient Work`,
	[`[Time / 2] for a Skill (minimum 1 action).`],
	1, 6, 0,
	SkillList
)
export const FastDraw = new Ability(
	`Fast Draw`,
	[`Free item draw once per rnd.`],
	1, 6, 0
)
export const FleetFooted = new Ability(
	`Fleet Footed`,
	[`+1 Speed.`],
	3, 6, 0
)
let languageList = []
Languages.forEach((language) => {
	languageList.push(
		{
			name: language
		}
	)
})
export const Multilingual = new Ability(
	`Multilingual`,
	[`Learn a different form of communication.`],
	1, 6, 0,
	languageList
)
export const Practice = new Ability(
	`Practice`,
	[`+1 to a Skill (up to the parent Trait).`],
	1, 6, 0,
	SkillList
)

// OPEN SLOT FOR NEW 6XP ABILITY

export const XP6Abilities = [
	EfficientWork,
	FastDraw,
	FleetFooted,
	Multilingual,
	Practice
]

// 9 XP Abilities ---> TODO: Add 1 more

export const DangerSense = new Ability(
	`Danger Sense`,
	[`+1 Reflex.`],
	1, 9, 0
)
export const Discipline = new Ability(
	`Discipline`,
	[`Ignore 1 Pain penalty.`],
	3, 9, 0
)
export const Fortunate = new Ability(
	`Fortunate`,
	[`+1 Luck.`],
	1, 9, 0
)
export const FreeRunning = new Ability(
	`Free Running`,
	[`Acrobatics 9# to Climb as a Run action.`],
	1, 9, 0
)
let unorthodoxList = []
TraitList.forEach((trait) => {
	SkillList.forEach((skill) => {
		let tname = trait.name
		let sname = skill.name
		if (skill.parent != trait.name) {
			unorthodoxList.push(
				{
					name: `${tname} - ${sname}`
				}
			)
		}
	})
})
export const Unorthodox = new Ability(
	`Unorthodox`,
	[`Pick a new parent Trait for a Skill.`],
	1, 9, 0,
	unorthodoxList
)

// OPEN SLOT FOR NEW 9XP ABILITY

export const XP9Abilities = [
	DangerSense,
	Discipline,
	Fortunate,
	FreeRunning,
	Unorthodox
]

// 12 XP Abilities

export const Fencing = new Ability(
	`Fencing`,
	[`Free Block roll once per rnd.`],
	1, 12, 0
)
export const Sidestep = new Ability(
	`Side-step`,
	[`Free Dodge roll once per rnd.`],
	1, 12, 0
)
export const Wrestling = new Ability(
	`Wrestling`,
	[`Free Grab roll once per rnd.`],
	1, 12, 0
)

export const XP12Abilities = [
	Fencing,
	Sidestep,
	Wrestling
]

// 15 XP Abilities

export const FirmGrip = new Ability(
	`Firm Grip`,
	[`Use 2h weapons in 1h, up to Size 3.`],
	1, 15, 0
)
export const HardHeaded = new Ability(
	`Hard Headed`,
	[`Ignore Stun from Head DMG.`],
	1, 15, 0
)
export const PowerfulStrike = new Ability(
	`Powerful Strike`,
	[`+1 DMG with this Melee weapon type.`],
	1, 15, 0,
	MeleeList
)

export const XP15Abilities = [
	FirmGrip,
	HardHeaded,
	PowerfulStrike
]

// 18 XP Abilities

export const Assassin = new Ability(
	`Assassin`,
	[`+3 DMG to ATKs from Concealment.`],
	1, 18, 0
)
export const VehicleOperation = new Ability(
	`Vehicle Operation`,
	[`Proficiently operate a class of vehicle.`],
	1, 18, 0
) // TODO: Need to add VehicleList when it is made

export const XP18Abilities = [
	Assassin,
	VehicleOperation
]

// 24 XP Abilities

export const Ambidextrous = new Ability(
	`Ambidextrous`,
	[`Off-hand penalty is -1 instead of -3.`],
	1, 24, 0
)
export const Tough = new Ability(
	`Tough`,
	[`+1 Health.`],
	3, 24, 0
)

export const XP24Abilities = [
	Ambidextrous,
	Tough
]

// 30 XP Abilities

export const SelfImprovement = new Ability(
	`Self Improvement`,
	[`+1 to a Trait (max 6).`],
	1, 30, 0,
	TraitList
)
export const CloseCall = new Ability(
	`Close Call`,
	[`Spend this Ability to avoid Death once.`],
	1, 30, 0
)

export const XP30Abilities = [
	SelfImprovement,
	CloseCall
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


const TempAbilityList = new Set([])
for (let a = 0; a < AbilityList.length; ++a) {
	if (AbilityList[a].options.length > 1) {
		for (let o = 0; o < AbilityList[a].options.length; ++o) {
			let newAbility = new Ability(
				AbilityList[a].name,
				AbilityList[a].description,
				AbilityList[a].max,
				AbilityList[a].xp,
				AbilityList[a].taken,
				[AbilityList[a].options[o]],
				o
			)
			TempAbilityList.add(newAbility)
		}

	}
	else {
		let newAbility = new Ability(
			AbilityList[a].name,
			AbilityList[a].description,
			AbilityList[a].max,
			AbilityList[a].xp,
			AbilityList[a].taken
		)
		TempAbilityList.add(newAbility)
	}
}
export const MasterAbilityList = [...TempAbilityList]