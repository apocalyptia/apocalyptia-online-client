import Rule from '../../rules/Rule'
import CoverTable from '../../views/tables/CoverTable.svelte'


const Cover = new Rule({
	name: `Cover`, 
	desc: [
		`All Damage is negated against targets that are behind Cover unless the weapon's base Damage exceeds the Material Damage Resistance.`,
		`If the weapon's base Damage is greater than the Material's Damage Resistance, then the Material Damage Resistance acts as Damage Reduction.`,
		`All standard types of Cover except Glass make you Concealed while behind Cover.`,
		`You can lean in and out of Cover to Attack as part of an Action.`,
		`Doing so opens you up to a Called Shot against an exposed Location if an opponent is waiting for you to lean out of Cover.`,
	]
})
Cover.table = CoverTable

export default Cover