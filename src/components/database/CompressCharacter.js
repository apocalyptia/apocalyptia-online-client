const compressAbilities = (char, c) => {
	char.Ab = c.abilities.map(m => {
		return {
			i: m.id,
			t: m.taken
		}
	})
	return char
}

const compressGear = (char, c, abv, type) => {
	for (const item in c.gear[type].inventory) {
		char[abv].push({
			i: c.gear[type].inventory[item].id,
			q: c.gear[type].inventory[item].qty
		})
	}
	return char
}

export default (c) => {
	let char = {
		Mi: c.meta.id,
		Mu: c.meta.user,
		Mc: c.meta.created,
		Mm: c.meta.modified,
		Mn: c.meta.notes,
		Cm: c.meta.coordinates.map,
		Cx: c.meta.coordinates.x,
		Cy: c.meta.coordinates.y,
		Sc: c.meta.status.completed,
		So: c.meta.status.open,
		Ss: c.meta.status.step,
		Da: c.description.age.value,
		Dn: c.description.name.value,
		Dh: c.description.hair.value,
		De: c.description.height.value,
		Ds: c.description.sex.value,
		Dk: c.description.skin.value,
		Dw: c.description.weight.value,
		Ta: c.traits.agility.score,
		Tb: c.traits.brains.score,
		Tc: c.traits.constitution.score,
		Td: c.traits.demeanor.score,
		ac: c.skills.acrobatics.score,
		la: c.skills.larceny.score,
		ra: c.skills.ranged.score,
		st: c.skills.stealth.score,
		md: c.skills.medicine.score,
		pe: c.skills.perception.score,
		sc: c.skills.science.score,
		su: c.skills.survival.score,
		at: c.skills.athletics.score,
		bu: c.skills.build.score,
		dr: c.skills.drive.score,
		me: c.skills.melee.score,
		le: c.skills.leadership.score,
		pr: c.skills.perform.score,
		so: c.skills.socialize.score,
		ta: c.skills.tame.score,
		Pl: c.props.luck.current,
		Pp: c.props.psyche.current,
		hD: c.health.head.current,
		rA: c.health.rightArm.current,
		lA: c.health.leftArm.current,
		tO: c.health.torso.current,
		lL: c.health.leftLeg.current,
		rL: c.health.rightLeg.current,
		Ab: [],
		Ga: [],
		Gm: [],
		Gr: [],
		Go: [],
		Ge: []
	}

	char = compressAbilities(char, c)

	char = compressGear(char, c, 'Ga', 'armor')
	char = compressGear(char, c, 'Gm', 'melee')
	char = compressGear(char, c, 'Gr', 'ranged')
	char = compressGear(char, c, 'Go', 'ammo')
	char = compressGear(char, c, 'Ge', 'equipment')

	return char
}