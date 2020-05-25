import Ability from './Ability'


const FirmGrip = new Ability({
	id: `c55b0940-8e72-4c5a-a7bc-0b9b27353ae7`,
	name: `Firm Grip`,
	desc: [
		`Ignore penalty to use 2h weapons in 1h, up to Size = Constitution.`,
		`Ignore Drop effect from Arm Damage.`,
	],
	max: 1,
	xp: 15
})

export default FirmGrip