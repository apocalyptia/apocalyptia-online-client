import Ability from 'classes/Ability.js'

const FirmGrip = new Ability({
	id: ``,
	name: `Firm Grip`,
	desc: [
		`Ignore penalty to use 2h weapons in 1h, up to Size = Constitution.`,
		`Ignore Drop effect from Arm Damage.`,
	],
	max: 1,
	xp: 15
})

export default FirmGrip