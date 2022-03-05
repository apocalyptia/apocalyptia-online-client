import Status from '$classes/Status.js'

const Unstable = new Status({
	name: `Unstable`,
	description: [`-3 penalty to Agility or Constitution Skill rolls.`, `Projectile Attacks targeting you take a -3 penalty.`],
	type: `Status`,
})

export default Unstable
