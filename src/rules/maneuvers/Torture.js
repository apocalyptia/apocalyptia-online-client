import Maneuver from '/src/classes/Maneuver.js'

const Torture = new Maneuver({
	name: `Torture`,
	description: [
		`Torture sessions can last as long as the torturer wants them to.`,
		`Roll [Medicine vs the captive's Constitution] and select one or more Body Parts on the captive.`,
		`Success means the captive takes 1d6 Trauma and 1 Damage for each selected Body Part.`,
		`Failure means the captive takes 1d6 Trauma and 1d6 Damage for each selected Body Part.`,
		`Roll [Demeanor vs Demeanor] at the end of each torture session.`,
		`Success means you take 1 Trauma and the captive's spirit is broken, meaning that they will do or say whatever they think will stop further torture until they are freed.`,
		`Failure means you take 1d6 Trauma from inflicting torture on another human being and the captive continues to resist.`,
	],
	mode: `Social`,
})

export default Torture
