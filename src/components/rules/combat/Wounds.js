import Rule from '../../rules/Rule'


const Wounds = new Rule({
	name: `Wounds`,
	desc: [
		`A Wound is an injury to particular Location constituting 1 or more Damage.`,
		`Every time you take Damage, you get a new Wound.`,
		`A Location may have multiple Wounds.`,
		`The severity of the Wound depends on how much Damage was taken.`,
		`Treat each Wound separately for purposes of Recovery or the application of the Medicine Skill.`
	]
})

export default Wounds