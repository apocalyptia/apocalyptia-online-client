import Rule from '/src/classes/Rule.js'

export default class Disease extends Rule {
	constructor({
		description,
		diagnose,
		duration,
		effects = [],
		id,
		name,
		onset,
		subrules,
		symptoms = [],
		transmission,
		treatment = [],
		type = `Disease`,
		url = ``,
		virulence
	}) {
		url = `/diseases/${name}`
		super({
			description,
			id,
			name,
			subrules,
			type,
			url
		})
		this.transmission = transmission
		this.virulence = virulence
		this.diagnose = diagnose
		this.onset = onset
		this.duration = duration
		this.symptoms = symptoms
		this.effects = effects
		this.treatment = treatment
	}
	static text = [
		`Transmission is the method by which the disease spreads. Roll Constitution vs Virulence to avoid infection when exposed.`,
		`An attendant caring for a patient must roll Medicine vs the disease’s Diagnose to figure out if there is an effective Treatment and how to apply it. Attendants must roll Luck vs Contagion to avoid exposing themselves to some Diseases while Treating their patients. If their Luck roll Fails, they have been exposed and must roll Constitution vs Virulence to avoid infection. Diseases are considered “toxins” for the purposes of GEAR bonuses.`
	]
}
