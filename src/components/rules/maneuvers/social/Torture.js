import Rule from 'classes/Rule.js'

const Torture = new Rule({
	id: `9da029d0-9c58-4407-812c-396fb59c764b`,
	name: `Torture`,
	desc: [
		`Roll [Medicine vs prisoner’s Constitution] once per hour to cause a captive d6 Pain to soften their resolve without killing them.`,
		`Failure does d6 Damage to the captive.`,
		`Roll [Demeanor vs Demeanor] at the end of each hour (Pain penalty applies).`,
		`Failure causes -1 Psyche loss.`,
		`At 0 Psyche, either the torturer cannot do it anymore and gives up, or the captive is broken and can be controlled with Demeanor Skills automatically until freed.`,
	]
})

export default Torture