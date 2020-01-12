import Rule from './Rule'


export class Gear extends Rule {
	constructor(
		name,
		description,
		sz
	) {
		super(
			name,
			description
		)
		this.sz = sz
	}
}

export class Weapon extends Gear {
	constructor(
		name,
		description,
		sz,
		dmg,
		rng,
		attributes
	) {
		super(
			name,
			description,
			sz
		)
		this.dmg = dmg
		this.rng = rng
		this.attributes = attributes
	}
}

export class Attribute extends Rule {
	constructor(
		name,
		description
	) {
		super(
			name,
			description
		)
	}
}