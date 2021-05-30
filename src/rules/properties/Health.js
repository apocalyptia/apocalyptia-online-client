import Property from '../../classes/Property.js'

const locations = {
	head: {
		name: `Head`,
		formula: `Constitution`
	},
	rightArm: {
		name: `Right Arm`,
		formula: `Constitution`
	},
	leftArm: {
		name: `Left Arm`,
		formula: `Constitution`
	},
	torso: {
		name: `Torso`,
		formula: `Constitution x 2`
	},
	leftLeg: {
		name: `Left Leg`,
		formula: `Constitution`
	},
	rightLeg: {
		name: `Right Leg`,
		formula: `Constitution`
	}
}

const Health = new Property({
	name: `Health`,
	desc: [
		`Head, Arms, and Legs = ${locations.head.formula}`,
		`Torso = ${locations.torso.formula}`,
		`Health is a measure of how much Damage your body can withstand.`
	],
	type: `Property`
})
Health.locations = locations

export default Health
