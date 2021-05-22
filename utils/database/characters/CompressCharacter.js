export default (char) => {

	const compressionMapping = (category) => {
		return category.map(item => {
			return {
				'i': item.id,
				'q': item.qty
			}
		})
	}

	let c = {}

	c.Mi = char.meta.id
	c.Mu = char.meta.user
	c.Mc = char.meta.created
	c.Mm = char.meta.modified
	c.Mn = char.meta.notes
	c.Sa = char.meta.status
	c.Se = char.meta.step
	c.Cm = char.meta.coordinates.m
	c.Cf = char.meta.coordinates.f
	c.Cx = char.meta.coordinates.x
	c.Cy = char.meta.coordinates.y
	c.Cz = char.meta.coordinates.z
	c.Da = char.description.age.value
	c.Dn = char.description.name.value
	c.Dh = char.description.hair.value
	c.De = char.description.height.value
	c.Ds = char.description.sex.value
	c.Dk = char.description.skin.value
	c.Dw = char.description.weight.value
	c.Ta = char.traits.agility.score
	c.Tb = char.traits.brains.score
	c.Tc = char.traits.constitution.score
	c.Td = char.traits.demeanor.score
	c.ac = char.skills.acrobatics.score
	c.la = char.skills.larceny.score
	c.ra = char.skills.projectile.score
	c.st = char.skills.stealth.score
	c.md = char.skills.medicine.score
	c.pe = char.skills.perception.score
	c.sc = char.skills.science.score
	c.su = char.skills.survival.score
	c.at = char.skills.athletics.score
	c.bu = char.skills.build.score
	c.dr = char.skills.drive.score
	c.me = char.skills.melee.score
	c.le = char.skills.leadership.score
	c.pr = char.skills.perform.score
	c.so = char.skills.socialize.score
	c.ta = char.skills.tame.score
	c.hD = char.properties.health.locations.head.current
	c.lA = char.properties.health.locations.leftArm.current
	c.lL = char.properties.health.locations.leftLeg.current
	c.rA = char.properties.health.locations.rightArm.current
	c.rL = char.properties.health.locations.rightLeg.current
	c.tO = char.properties.health.locations.torso.current
	c.Pl = char.properties.luck.current
	c.Pp = char.properties.psyche.current
	c.Ab = compressionMapping(char.abilities)
	c.Ga = compressionMapping(char.gear.armor.inventory)
	c.Gm = compressionMapping(char.gear.melee.inventory)
	c.Gr = compressionMapping(char.gear.projectile.inventory)
	c.Go = compressionMapping(char.gear.ammo.inventory)
	c.Ge = compressionMapping(char.gear.equipment.inventory)

	return JSON.stringify(c)
}