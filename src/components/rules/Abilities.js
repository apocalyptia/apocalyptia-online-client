import Ability from '../classes/Ability'
import Traits from './Traits'
import Skills, { SpecialtyList } from './Skills'
import MeleeWeaponList from './gear/weapons/MeleeWeaponList'
import { WeaponList } from './Gear'
import Capitalize from '../helpers/Capitalize'
import Languages from '../helpers/Languages'


let id = 0


// 3 XP Abilities

export const FavoriteWeapon = new Ability({
	name: `Favorite Weapon`,
	description: [
		`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`
	],
	max: 1,
	xp: 3,
	options: WeaponList
})

export const HyperImmunity = new Ability({
	name: `Hyper Immunity`,
	description: [
		`+1 to resist Diseases.`
	],
	max: 3,
	xp: 3
})

export const PackMentality = new Ability({
	name: `Pack Mentality`,
	description: [
		`+1 ATK at a target a Comrade ATKs this rnd.`
	],
	max: 1,
	xp: 3
})

export const QuickReload = new Ability({
	name: `Quick Reload`,
	description: [
		`Free Reload once per rnd.`
	],
	max: 1,
	xp: 3
})

export const Specialize = new Ability({
	name: `Specialize`,
	description: [
		`+1 to a Skill Specialty.`
	],
	max: 1,
	xp: 3,
	options: SpecialtyList
})

export const WeaponTraining = new Ability({
	name: `Weapon Training`,
	description: [
		`+1 ATK with a specified weapon type.`
	],
	max: 1,
	xp: 3,
	options: WeaponList
})

export const XP3Abilities = [
	FavoriteWeapon,
	HyperImmunity,
	PackMentality,
	QuickReload,
	Specialize,
	WeaponTraining
]

// 6 XP Abilities ---> TODO: Add 1 more

export const EfficientWork = new Ability({
	name: `Efficient Work`,
	description: [
		`[Time / 2] for a Skill (minimum 1 action).`
	],
	max: 1,
	xp: 6,
	options: Skills
})

export const FastDraw = new Ability({
	name: `Fast Draw`,
	description: [
		`Free item draw once per rnd.`
	],
	max: 1,
	xp: 6
})

export const FleetFooted = new Ability({
	name: `Fleet Footed`,
	description: [
		`+1 Speed.`
	],
	max: 3,
	xp: 6
})

export const Multilingual = new Ability({
	name: `Multilingual`,
	description: [
		`Learn a different form of communication.`
	],
	max: 1,
	xp: 6,
	options: Languages
})

export const Practice = new Ability({
	name: `Practice`,
	description: [
		`+1 to a Skill (up to the parent Trait).`
	],
	max: 1,
	xp: 6,
	options: Skills
})

// OPEN SLOT FOR NEW 6XP ABILITY

export const XP6Abilities = [
	EfficientWork,
	FastDraw,
	FleetFooted,
	Multilingual,
	Practice
]

// 9 XP Abilities ---> TODO: Add 1 more

export const DangerSense = new Ability({
	name: `Danger Sense`,
	description: [
		`+1 to Reflexive Defenses.`
	],
	max: 1,
	xp: 9
})

export const Discipline = new Ability({
	name: `Discipline`,
	description: [
		`Ignore 1 Pain penalty.`
	],
	max: 3,
	xp: 9
})

export const Fortunate = new Ability({
	name: `Fortunate`,
	description: [
		`+1 Luck.`
	],
	max: 1,
	xp: 9
})

export const FreeRunning = new Ability({
	name: `Free Running`,
	description: [
		`Acrobatics 9# to Climb as a Run action.`
	],
	max: 1,
	xp: 9
})

export const Unorthodox = new Ability({
	name: `Unorthodox`,
	description: [
		`Pick a new parent Trait for a Skill.`
	],
	max: 1,
	xp: 9,
	options: (function() {
		let uList = []
		Traits.forEach((trait) => {
			Skills.forEach((skill) => {
				let tname = trait.name
				let sname = skill.name
				if (skill.parent != trait.name) {
					uList.push(
						{
							name: `${Capitalize(tname)} - ${Capitalize(sname)}`
						}
					)
				}
			})
		})
		return [...uList]
	})()
})

// OPEN SLOT FOR NEW 9XP ABILITY

export const XP9Abilities = [
	DangerSense,
	Discipline,
	Fortunate,
	FreeRunning,
	Unorthodox
]

// 12 XP Abilities

export const Fencing = new Ability({
	name: `Fencing`,
	description: [
		`Free Block roll once per rnd.`
	],
	max: 1,
	xp: 12
})

export const Sidestep = new Ability({
	name: `Side-step`,
	description: [
		`Free Dodge roll once per rnd.`
	],
	max: 1,
	xp: 12
})

export const Wrestling = new Ability({
	name: `Wrestling`,
	description: [
		`Free Grab roll once per rnd.`
	],
	max: 1,
	xp: 12
})

export const XP12Abilities = [
	Fencing,
	Sidestep,
	Wrestling
]

// 15 XP Abilities

export const FirmGrip = new Ability({
	name: `Firm Grip`,
	description: [
		`Use 2h weapons in 1h, up to Size 3.`
	],
	max: 1,
	xp: 15
})

export const HardHeaded = new Ability({
	name: `Hard Headed`,
	description: [
		`Ignore Stun from Head DMG.`
	],
	max: 1,
	xp: 15
})

export const PowerfulStrike = new Ability({
	name: `Powerful Strike`,
	description: [
		`+1 DMG with a specified Melee weapon type.`
	],
	max: 1,
	xp: 15,
	options: MeleeWeaponList
})

export const XP15Abilities = [
	FirmGrip,
	HardHeaded,
	PowerfulStrike
]

// 18 XP Abilities

export const Assassin = new Ability({
	name: `Assassin`,
	description: [
		`+3 DMG to ATKs from Concealment.`
	],
	max: 1,
	xp: 18
})

export const VehicleOperation = new Ability({
	name: `Vehicle Operation`,
	description: [
		`Proficiently operate a class of vehicle.`
	],
	max: 1,
	xp: 18
}) // TODO: Need to add VehicleList when it is made

export const XP18Abilities = [
	Assassin,
	VehicleOperation
]

// 24 XP Abilities

export const Ambidextrous = new Ability({
	name: `Ambidextrous`,
	description: [
		`Off-hand penalty is -1 instead of -3.`
	],
	max: 1,
	xp: 24
})

export const Tough = new Ability({
	name: `Tough`,
	description: [
		`+1 Health.`
	],
	max: 3,
	xp: 24
})

export const XP24Abilities = [
	Ambidextrous,
	Tough
]

// 30 XP Abilities

export const SelfImprovement = new Ability({
	name: `Self Improvement`,
	description: [
		`+1 to a Trait (max 6).`
	],
	max: 1,
	xp: 30,
	options: Traits
})

export const CloseCall = new Ability({
	name: `Close Call`,
	description: [
		`Spend this Ability to survive an otherwise lethal encounter.`
	],
	max: 1,
	xp: 30,
})

export const XP30Abilities = [
	SelfImprovement,
	CloseCall
]


export const AbilityGroups = [
	{
		name: 3,
		visible: false,
		list: XP3Abilities
	},
	{
		name: 6,
		visible: false,
		list: XP6Abilities
	},
	{
		name: 9,
		visible: false,
		list: XP9Abilities
	},
	{
		name: 12,
		visible: false,
		list: XP12Abilities
	},
	{
		name: 15,
		visible: false,
		list: XP15Abilities
	},
	{
		name: 18,
		visible: false,
		list: XP18Abilities
	},
	{
		name: 24,
		visible: false,
		list: XP24Abilities
	},
	{
		name: 30,
		visible: false,
		list: XP30Abilities
	},
]


export const AbilitiesList = [
	...XP3Abilities,
	...XP6Abilities,
	...XP9Abilities,
	...XP12Abilities,
	...XP15Abilities,
	...XP18Abilities,
	...XP24Abilities,
	...XP30Abilities
]



const IdTag = (list) => {
	let newList = []
	for (let i = 0; i < list.length; ++i) {
		if (list[i].options[0]) {
			for (let o = 0; o < list[i].options.length; ++o) {
				let newAbility = new Ability({
					name: list[i].name,
					description: list[i].description,
					max: list[i].max,
					xp: list[i].xp,
					taken: list[i].taken,
					options: [list[i].options[o]],
					selection: o
				})
				newList.push(newAbility)
			}
		} else {
			let newAbility = new Ability({
				name: list[i].name,
				description: list[i].description,
				max: list[i].max,
				xp: list[i].xp,
				taken: list[i].taken
			})
			newList.push(newAbility)
		}
	}
	for (let a = 0; a < newList.length; ++a) {
		newList[a].id = id
		id++
	}
	return newList
}


export const Abilities = IdTag(AbilitiesList)


export const AbilitiesExplanation = `Abilities are Character upgrades purchased with XP.`


export default Abilities