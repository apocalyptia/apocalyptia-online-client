import Rule from '../../rules/Rule'
import Table from '../Table'


const Cover = new Rule({
	name: `Cover`, 
	desc: [
		`All Damage is negated against targets that are behind Cover unless the weapon's base Damage exceeds the Material Damage Resistance.`,
		`If the weapon's base Damage is greater than the Material's Damage Resistance, then the Material Damage Resistance acts as Damage Reduction.`,
		`All standard types of Cover except Glass make you Concealed while behind Cover.`,
		`You can lean in and out of Cover to Attack as part of an Action.`,
		`Doing so opens you up to a Called Shot against an exposed Body Part if an opponent is waiting for you to lean out of Cover.`,
	]
})

class CoverType {
	constructor({
		material,
		dr
	}) {
		this.material = material
		this.dr = dr
	}
}

Cover.table = new Table({
	name: `Cover Table`,
	headers: [`Material`, `Damage Resistance`],
	contents: [
		new CoverType({ material: 'Drywall', dr: 1 }),
		new CoverType({ material: 'Glass', dr: 1 }),
		new CoverType({ material: 'Plywood', dr: 1 }),
		new CoverType({ material: 'Hardwood', dr: 2 }),
		new CoverType({ material: 'Sheet Metal', dr: 2 }),
		new CoverType({ material: 'Brick', dr: 3 }),
		new CoverType({ material: 'Concrete', dr: 4 }),
		new CoverType({ material: 'Steel', dr: 5 }),
	]
})

export default Cover