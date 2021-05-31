import Hazard from '/src/classes/Hazard.js'

const Falling = new Hazard({
	name: `Falling`,
	desc: [
		`1 Blunt Damage per 2yds.`,
		`Each point of Falling Damage is inflicted on a random Body Part.`,
		`Excess Damage left over after that Body Part is destroyed must be applied to another random Body Part until either no Damage remains or all Body Parts are destroyed.`,
		`Roll [Acrobatics # = yds] to halve Falling Damage.`,
		`On a Botch, you go Prone and get Stunned for d6 rounds.`,
		`Falling objects deal BDMG equal to their Size.`
	],
	type: `Hazard`
})

export default Falling
