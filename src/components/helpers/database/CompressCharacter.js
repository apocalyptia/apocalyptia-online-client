export default (c) => {
	let compressedCharacter = {
		id: c.meta.id,
		u: c.meta.user,
		s: c.meta.step,
		c: c.meta.completed,
		d: c.meta.created,
		m: c.meta.modified,
		n: c.meta.notes,
		p: c.meta.coordinates.map,
		x: c.meta.coordinates.x,
		y: c.meta.coordinates.y,
		Da: c.desc.age.value,
		Di: c.desc.identity.value,
		Dh: c.desc.hair.value,
		De: c.desc.height.value,
		Ds: c.desc.sex.value,
		Dk: c.desc.skin.value,
		Dw: c.desc.weight.value,
		A: c.traits.agility.score,
		B: c.traits.brains.score,
		C: c.traits.constitution.score,
		D: c.traits.demeanor.score,
		acr: c.skills.acrobatics.score,
		lar: c.skills.larceny.score,
		ran: c.skills.ranged.score,
		ste: c.skills.stealth.score,
		med: c.skills.medicine.score,
		per: c.skills.perception.score,
		sci: c.skills.science.score,
		sur: c.skills.survival.score,
		ath: c.skills.athletics.score,
		bui: c.skills.build.score,
		dri: c.skills.drive.score,
		mel: c.skills.melee.score,
		lea: c.skills.leadership.score,
		prf: c.skills.perform.score,
		soc: c.skills.socialize.score,
		tam: c.skills.tame.score,
		L: c.props.luck.current,
		P: c.props.psyche.current,
		hD: c.health.head.current,
		rA: c.health.rightArm.current,
		lA: c.health.leftArm.current,
		tO: c.health.torso.current,
		lL: c.health.leftLeg.current,
		rL: c.health.rightLeg.current,
		Ab: [],
		Gr: {
			a: [],
			m: [],
			r: [],
			o: [],
			e: []
		}
	}
	c.abilities.forEach(ability => {
		compressedCharacter.Ab.push({
			i: ability.id,
			t: ability.taken
		})
	})
	const gearTypes = [
		{ 'armor':		'a' },
		{ 'melee':		'm' },
		{ 'ranged':		'r' },
		{ 'ammo':		'o' },
		{ 'equipment':	'e' }
	]
	for (const [key, value] of Object.entries(gearTypes)) {
		c.gear[key].inventory.forEach(item => {
			compressedCharacter.Gr[value].push({
				i: item.id,
				q: item.qty
			})
		})
	}
	return compressedCharacter
}