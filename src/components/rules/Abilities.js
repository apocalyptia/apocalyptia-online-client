import Ability from '../classes/Ability'
import Languages from '../functions/Languages'
import PropSort from '../functions/PropSort'
import Skills from './Skills'
import Traits from './Traits'
import { WeaponList } from './Gear'

export const AbilitiesExplanation = [
	`Abilities are Character upgrades purchased with XP.`
]

// 3 XP Abilities

export const FavoriteWeapon = new Ability({
	name: `Favorite Weapon`,
	description: [`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`,],
	max: 1,
	xp: 3,
	options: WeaponList
})

export const HyperImmunity = new Ability({
	name: `Hyper Immunity`,
	description: [`+1 to resist Diseases.`,],
	max: 3,
	xp: 3
})

export const PackMentality = new Ability({
	name: `Pack Mentality`,
	description: [`+1 Attack at a target a Comrade Attacks this round.`,],
	max: 1,
	xp: 3
})

export const QuickReload = new Ability({
	name: `Quick Reload`,
	description: [`Free Reload once per round.`,],
	max: 1,
	xp: 3
})

export const Specialize = new Ability({
	name: `Specialize`,
	description: [`+1 to a Skill Specialty.`,],
	max: 1,
	xp: 3,
	options: Skills.specialties
})

export const WeaponTraining = new Ability({
	name: `Weapon Training`,
	description: [`+1 Attack with a specified weapon type.`,],
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
	WeaponTraining,
]

// 6 XP Abilities

export const EfficientWork = new Ability({
	name: `Efficient Work`,
	description: [`[Time / 2] for a Skill (minimum 1 action).`,],
	max: 1,
	xp: 6,
	options: Skills.list
})

export const FastDraw = new Ability({
	name: `Fast Draw`,
	description: [`Free item draw once per round.`,],
	max: 1,
	xp: 6
})

export const FleetFooted = new Ability({
	name: `Fleet Footed`,
	description: [`+1 Speed.`,],
	max: 3,
	xp: 6
})

export const Multilingual = new Ability({
	name: `Multilingual`,
	description: [`Learn a different form of communication.`,],
	max: 1,
	xp: 6,
	options: Languages
})

export const Practice = new Ability({
	name: `Practice`,
	description: [`+1 to a Skill (up to the parent Trait).`,],
	max: 1,
	xp: 6,
	options: Skills.list
})

export const VehicleOperation = new Ability({
	name: `Vehicle Operation`,
	description: [`Proficiently operate a class of vehicle.`,],
	max: 1,
	xp: 6
}) // TODO: Need to add VehicleList when it is made

export const XP6Abilities = [
	EfficientWork,
	FastDraw,
	FleetFooted,
	Multilingual,
	Practice,
	VehicleOperation,
]

export const DangerSense = new Ability({
	name: `Danger Sense`,
	description: [`+1 to Reflexive Defenses.`,],
	max: 1,
	xp: 9
})

export const Discipline = new Ability({
	name: `Discipline`,
	description: [`Ignore 1 Pain penalty.`,],
	max: 3,
	xp: 9
})

export const Fortunate = new Ability({
	name: `Fortunate`,
	description: [`+1 Luck.`,],
	max: 1,
	xp: 9
})

export const FreeRunning = new Ability({
	name: `Free Running`,
	description: [`Acrobatics 9# to Climb your Speed as a Movement action.`,],
	max: 1,
	xp: 9
})

export const Unorthodox = new Ability({
	name: `Unorthodox`,
	description: [`Pick a new parent Trait for a Skill.`,],
	max: 1,
	xp: 9,
	options: (function() {
		const uList = []
		Traits.list.forEach((trait) => {
			Skills.list.forEach((skill) => {
				const tname = trait.name
				const sname = skill.name
				if (skill.parent != trait.name) {
					uList.push({ name: `${tname} - ${sname}` })
				}
			})
		})
		return [...uList]
	})()
})

export const Resilient = new Ability({
	name: `Resilient`,
	description: [`Reduce any Trauma by 1.`],
	max: 3,
	xp: 9
})

// OPEN SLOT FOR NEW 9XP ABILITY

export const XP9Abilities = [
	DangerSense,
	Discipline,
	Fortunate,
	FreeRunning,
	Unorthodox,
]

// 12 XP Abilities

export const Parry = new Ability({
	name: `Parry`,
	description: [`Free Block Action once per round.`,],
	max: 1,
	xp: 12
})

export const Sidestep = new Ability({
	name: `Side-step`,
	description: [`Free Dodge Action once per round.`,],
	max: 1,
	xp: 12
})

export const Wrestling = new Ability({
	name: `Wrestling`,
	description: [`Free Grapple Action once per round.`,],
	max: 1,
	xp: 12
})

export const XP12Abilities = [
	Parry,
	Sidestep,
	Wrestling,
]

// 15 XP Abilities

export const Charge = new Ability({
	name: `Charge`,
	description: [`Ignore Prone effect from Leg Damage. Ignore Unstable penalty to Melee Attacks when you Run.`,],
	max: 1,
	xp: 15
})

export const FirmGrip = new Ability({
	name: `Firm Grip`,
	description: [`Use 2h weapons in 1h, up to Size 3. Ignore Drop effect from Arm Damage.`,],
	max: 1,
	xp: 15
})

export const HardHeaded = new Ability({
	name: `Hard Headed`,
	description: [`Ignore Stun effect from Head Damage.`,],
	max: 1,
	xp: 15
})

export const XP15Abilities = [
	Charge,
	FirmGrip,
	HardHeaded,
]

// 18 XP Abilities

export const Ambidextrous = new Ability({
	name: `Ambidextrous`,
	description: [`Off-hand penalty is -1 instead of -3.`,],
	max: 1,
	xp: 18
})

export const Assassin = new Ability({
	name: `Assassin`,
	description: [`+3 Damage for Attacks made while Concealed.`,],
	max: 1,
	xp: 18
})

export const XP18Abilities = [
	Ambidextrous,
	Assassin,
]

// 24 XP Abilities

export const Rational = new Ability({
	name: `Rational`,
	description: [`+1 Psyche.`,],
	max: 3,
	xp: 24
})

export const Tough = new Ability({
	name: `Tough`,
	description: [`+1 Health.`,],
	max: 3,
	xp: 24
})

export const XP24Abilities = [
	Rational,
	Tough,
]

// 30 XP Abilities

export const SelfImprovement = new Ability({
	name: `Self Improvement`,
	description: [`+1 to a Trait (max 6).`,],
	max: 1,
	xp: 30,
	options: Traits.list
})

export const CloseCall = new Ability({
	name: `Close Call`,
	description: [`Spend this Ability to survive an otherwise lethal encounter.`,],
	max: 1,
	xp: 30,
})

export const XP30Abilities = [
	SelfImprovement,
	CloseCall,
]

const IdTag = (list) => {
	let id = 0
	const newList = []
	for (let i = 0; i < list.length; ++i) {
		if (list[i].options[0]) {
			for (let o = 0; o < list[i].options.length; ++o) {
				const newAbility = new Ability({
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
			const newAbility = new Ability({
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

export const Abilities = {
	name: `Abilities`,
	explanation: AbilitiesExplanation,
	groups: [
		{
			name: 3,
			visible: false,
			list: [...XP3Abilities]
		},
		{
			name: 6,
			visible: false,
			list: [...XP6Abilities]
		},
		{
			name: 9,
			visible: false,
			list: [...XP9Abilities]
		},
		{
			name: 12,
			visible: false,
			list: [...XP12Abilities]
		},
		{
			name: 15,
			visible: false,
			list: [...XP15Abilities]
		},
		{
			name: 18,
			visible: false,
			list: [...XP18Abilities]
		},
		{
			name: 24,
			visible: false,
			list: [...XP24Abilities]
		},
		{
			name: 30,
			visible: false,
			list: [...XP30Abilities]
		},
	],
	list: [
		...XP3Abilities,
		...XP6Abilities,
		...XP9Abilities,
		...XP12Abilities,
		...XP15Abilities,
		...XP18Abilities,
		...XP24Abilities,
		...XP30Abilities
	].sort((a, b) => PropSort(a, b, 'name')),
	masterList: IdTag([
		...XP3Abilities,
		...XP6Abilities,
		...XP9Abilities,
		...XP12Abilities,
		...XP15Abilities,
		...XP18Abilities,
		...XP24Abilities,
		...XP30Abilities
	]).sort((a, b) => PropSort(a, b, 'name')),
	remainingXP: (c) => {
		let starting = c.properties.experience.score
		let spent = 0
		if (c.abilities.length) {
			spent = c.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)
		}
		let remaining = starting - spent
		c.current = remaining
		return c.current
	}
}

export const AbilitiesList = IdTag(Abilities)

export default Abilities