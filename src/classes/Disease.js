import Rule from '$classes/Rule.js'

export default class Disease extends Rule {
	constructor({
		desc,
		id,
		name,
		type=`Disease`,
		transmission,
		virulence,
		diagnose,
		onset,
		duration,
		symptoms=[],
		effects=[],
		treatment=[]
	}) {
		super({
			desc,
			id,
			name,
			type
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
}