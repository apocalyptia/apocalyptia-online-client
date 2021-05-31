import Ability from '/src/classes/Ability.js'

const FirmGrip = new Ability({
	name: `Firm Grip`,
	desc: [`Ignore penalty to use 2h weapons in 1h, up to Size = Constitution.`, `Ignore Drop effect from Arm Damage.`],
	max: 1,
	experience: 15
})

export default FirmGrip
