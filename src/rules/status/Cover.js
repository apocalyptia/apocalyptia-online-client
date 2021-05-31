import Status from '/src/classes/Status.js'
import Table from '../../classes/Table.js'

const Cover = new Status({
	name: `Cover`,
	desc: [
		`All Damage is negated against targets that are behind Cover unless the weapon's base Damage exceeds the Material Absorption.`,
		`If the weapon's base Damage is greater than the Material's Absorption, then the Material Absorption acts as Damage Reduction.`,
		`All standard types of Cover except Glass make you Concealed while behind Cover.`,
		`You can lean in and out of Cover to Attack as part of an Action.`,
		`Doing so opens you up to a Called Shot against an exposed Body Part if an opponent is waiting for you to lean out of Cover.`
	],
	type: `Status`
})

class CoverType {
	constructor({ material, dr }) {
		this.material = material
		this.dr = dr
	}
}

Cover.table = new Table({
	name: `Cover Table`,
	headers: [`Material`, `Absorption`],
	contents: [
		new CoverType({ material: 'Drywall', dr: 1 }),
		new CoverType({ material: 'Glass', dr: 1 }),
		new CoverType({ material: 'Plywood', dr: 1 }),
		new CoverType({ material: 'Hardwood', dr: 2 }),
		new CoverType({ material: 'Sheet Metal', dr: 2 }),
		new CoverType({ material: 'Brick', dr: 3 }),
		new CoverType({ material: 'Concrete', dr: 4 }),
		new CoverType({ material: 'Steel', dr: 5 })
	],
	widths: [50, 50]
})

export default Cover
