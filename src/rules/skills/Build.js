import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Build = new Skill({
	name: `Build`,
	desc: [`Make an item from [d6 + #] Parts.`],
	type: `Skill`,
	parent: `Constitution`,
	diff: `varies`,
	specs: {
		customize: new Specialty({
			name: `Customize`,
			type: `Specialty`,
			desc: [
				`Customizations take a number of hours to complete equal to the Difficulty.`,
				`Each Customization can only be applied once on per item.`,
				`Each item can have up to 3 unique Customizations.`,
				`Weapons: +1 Projectile Attack, +1 Melee Damage, or a new Weapon Attribute.`,
				`Armor: +1 Absorption or a new Armor Attribute.`
			]
		}),
		repair: new Specialty({
			name: `Repair`,
			type: `Specialty`,
			desc: [
				`Fixing a broken item takes a number of hours to complete equal to the Difficulty.`,
				`+1 to the Build(Repair) roll when using Parts from the same kind of item.`
			]
		})
	}
})

export default Build
