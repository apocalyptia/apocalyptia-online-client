import Property from '../../classes/Property.js'

const locations = {
	head: {
		name: `Head`,
		formula: `Constitution`,
	},
	rightArm: {
		name: `Right Arm`,
		formula: `Constitution`,
	},
	leftArm: {
		name: `Left Arm`,
		formula: `Constitution`,
	},
	torso: {
		name: `Torso`,
		formula: `Constitution x 2`,
	},
	leftLeg: {
		name: `Left Leg`,
		formula: `Constitution`,
	},
	rightLeg: {
		name: `Right Leg`,
		formula: `Constitution`,
	},
}

const Health = new Property({
	name: `Health`,
	description: [
		`Head, Arms, and Legs = ${locations.head.formula}`,
		`Torso = ${locations.torso.formula}`,
		`Health is a measure of how much Damage your body can withstand.`,
		`Each point of Health lost causes a -1 Pain penalty until healed.`,
		`When Head or Torso Health drops to 0, you fall unconscious.`,
		`When an Arm or a Leg's Health drops to 0, you lose the use of that limb.`,
		`Consciousness and limb functionality are at least partially restored once you have healed back to at least 1 Health on that Body Part.`,
		`You die when Head or Torso Health drops to the negative of their scores.`,
		`You lose the limb permanently when Arm or Leg Health drops to the negative of their scores.`,
	],
	type: `Property`,
})
Health.locations = locations

export default Health
