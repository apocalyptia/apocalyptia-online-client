import Age from './description/Age.js' 
import Hair from './description/Hair.js' 
import Height from './description/Height.js' 
import Name from './description/Name.js' 
import Player from './description/Player.js' 
import Sex from './description/Sex.js' 
import Skin from './description/Skin.js' 
import Weight from './description/Weight.js' 

const Creation = {
	traits: {
		name: `Traits`,
		desc: [
			`You get 14 Trait points.`,
			`Traits can range from 1 to 6.`,
			`Trait rolls are [d6 + Trait].`,
			`Trait scores set the upper limit for their Skills.`,
		],
		max: 6,
		starting: 14,
		step: 0
	},
	skills: {
		name: `Skills`,
		desc: [
			`You get Brains x 6 Skill points.`,
			`Skills can range from 0 to 6.`,
			`Skill rolls are [d6 + Skill].`,
			`Trait scores set the upper limit for their Skills.`,
		],
		skillFlow: [
			`Once per month (in-game), transfer 1 point from a Skill you have not used to one that you have used.`
		],
		specialties: [
			`Specialties (listed below their Skills) equal their parent Skill by default.`,
			`Specialties can exceed the parent Skill by taking the Specialize Ability.`,
			`Unless otherwise noted, a Skill takes one Action.`,
		],
		startingMultiplier: 6,
		step: 1
	},
	properties: {
		name: `Properties`,
		desc: [
			`Properties represent a variety of attributes that are derived from a Character's Trait scores.`
		],
		step: 2
	},
	abilities: {
		name: `Abilities`,
		desc: [
			`Abilities are special bonuses, knowledge, or techniques that can be purchased with Experience.`
		],
		step: 3
	},
	gear: {
		name: `Gear`,
		desc: [
			`You start with some random Gear:`,
			`One piece of Armor`,
			`One Melee weapon`,
			`One Projectile weapon`,
			`1d6 rounds of Ammo`,
			`Random items = Luck`,
			`1 Food and 1 Water`,
		],
		step: 4
	},
	description: {
		name: `Description`,
		list: [
			Player,
			Name,
			Age,
			Sex,
			Height,
			Weight,
			Skin,
			Hair,
		],
		step: 5
	}
}

export default Creation