export default (c) => {
	let compChar = {
		Mi: c.meta.id,
		Mu: c.meta.user,
		Ms: c.meta.step,
		Mc: c.meta.completed,
		Mr: c.meta.created,
		Ml: c.meta.modified,
		Mn: c.meta.notes,
		Mm: c.meta.coordinates.map,
		Mx: c.meta.coordinates.x,
		My: c.meta.coordinates.y,
		Da: c.desc.age.value,
		Di: c.desc.identity.value,
		Dh: c.desc.hair.value,
		De: c.desc.height.value,
		Ds: c.desc.sex.value,
		Dk: c.desc.skin.value,
		Dw: c.desc.weight.value,
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

	const compressAbilities = () => {
		compChar.Ab = c.abilities.map(m => {
			return {
				i: m.id,
				t: m.taken
			}
		})
	}

	compressAbilities()

	const compressGear = (abv, type) => {
		compChar[abv] = c.gear[type].map(m => {
			return {
				i: m.id,
				q: m.qty
			}
		})
	}

	compressGear('Ga', 'armor')
	compressGear('Gm', 'melee')
	compressGear('Gr', 'ranged')
	compressGear('Go', 'ammo')
	compressGear('Ge', 'equipment')

	return compChar
}