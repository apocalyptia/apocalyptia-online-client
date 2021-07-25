import Status from '/src/classes/Status.js'
import Table from '../../classes/Table.js'

const Cover = new Status({
	name: `Cover`,
	description: [
		`All Damage is negated against targets that are behind Cover unless the weapon's base Damage exceeds the Material Absorption.`,
		`If the weapon's base Damage is greater than the Material's Absorption, then the Material Absorption acts as Damage Reduction.`,
		`Cover also Conceals the target unless the Cover Material is transparent.`,
		`If you lean out of Cover to Attack, Material Absorption will only protect your Torso and Legs for that Round.`,
	],
	type: `Status`,
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
		new CoverType({ material: 'Steel', dr: 5 }),
	],
	widths: [50, 50],
})

export default Cover
