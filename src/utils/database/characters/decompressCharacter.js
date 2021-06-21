import Character from '/src/classes/Character.js'
import Abilities from '/src/rules/Abilities.js'
import Melee from '/src/rules/gear/Melee.js'
import Projectile from '/src/rules/gear/Projectile.js'
import Ammo from '/src/rules/gear/Ammo.js'
import Armor from '/src/rules/gear/Armor.js'
import Equipment from '/src/rules/gear/Equipment.js'

function decompressionMapping(category, type) {
	let ruleList = []
	switch (type) {
		case 'ability':
			ruleList = Object.values(Abilities)
			break
		case 'melee':
			ruleList = Object.values(Melee)
			break
		case 'projectile':
			ruleList = Object.values(Projectile)
			break
		case 'ammo':
			ruleList = Object.values(Ammo)
			break
		case 'armor':
			ruleList = Object.values(Armor)
			break
		case 'equipment':
			ruleList = Object.values(Equipment).flat()
			break
	}
	const decompList = category.map((item) => {
		const decompressedItem = {
			name: item.n,
			quantity: item.q 
		}
		if ('m' in item && item.m.length) {
			decompressedItem.mods = [...item.m]
		}
		if ('s' in item && item.s !== null) {
			decompressedItem.selected = item.s
		}
		return decompressedItem
	})
	return decompList.map((item) => {
		const ruleItem = ruleList.find((rule) => rule.name === item.name)
		if (ruleItem !== undefined) {
			ruleItem.quantity = item.quantity
			if ('mods' in ruleItem && item.m.length) {
				ruleItem.mods = [...item.m]
			}
			if ('selectedOption' in ruleItem) {
				ruleItem.selected = item.s
			}
		}
		return ruleItem
	})
}

function decompressCharacter(c) {
	c = JSON.parse(c)

	let char = new Character()

	char.meta.id = c.Mi
	char.meta.user = c.Mu
	char.meta.created = c.Mc
	char.meta.modified = c.Mm
	char.meta.notes = c.Mn
	char.meta.status = c.Sa
	char.meta.step = c.Se
	char.meta.coordinates.m = c.Cm
	char.meta.coordinates.f = c.Cf
	char.meta.coordinates.x = c.Cx
	char.meta.coordinates.y = c.Cy
	char.meta.coordinates.z = c.Cz
	char.description.age.value = c.Da
	char.description.name.value = c.Dn
	char.description.hair.value = c.Dh
	char.description.height.value = c.De
	char.description.sex.value = c.Ds
	char.description.skin.value = c.Dk
	char.description.weight.value = c.Dw
	char.description.player.value = c.Dp
	char.traits.agility.score = c.Ta
	char.traits.brains.score = c.Tb
	char.traits.constitution.score = c.Tc
	char.traits.demeanor.score = c.Td
	char.skills.acrobatics.score = c.ac
	char.skills.larceny.score = c.la
	char.skills.projectile.score = c.ra
	char.skills.stealth.score = c.st
	char.skills.medicine.score = c.md
	char.skills.perception.score = c.pe
	char.skills.science.score = c.sc
	char.skills.survival.score = c.su
	char.skills.athletics.score = c.at
	char.skills.build.score = c.bu
	char.skills.drive.score = c.dr
	char.skills.melee.score = c.me
	char.skills.leadership.score = c.le
	char.skills.perform.score = c.pr
	char.skills.socialize.score = c.so
	char.skills.tame.score = c.ta
	char.abilities = decompressionMapping(c.Ab, 'ability')
	char.gear.armor.inventory = decompressionMapping(c.Ga, 'armor')
	char.gear.melee.inventory = decompressionMapping(c.Gm, 'melee')
	char.gear.projectile.inventory = decompressionMapping(c.Gr, 'projectile')
	char.gear.ammo.inventory = decompressionMapping(c.Go, 'ammo')
	char.gear.equipment.inventory = decompressionMapping(c.Ge, 'equipment')

	char.updateProperties()

	char.properties.health.locations.head.current = c.hD
	char.properties.health.locations.leftArm.current = c.lA
	char.properties.health.locations.leftLeg.current = c.lL
	char.properties.health.locations.rightArm.current = c.rA
	char.properties.health.locations.rightLeg.current = c.rL
	char.properties.health.locations.torso.current = c.tO
	char.properties.endurance.current = c.Pe
	char.properties.luck.current = c.Pl
	char.properties.psyche.current = c.Pp

	return char
}

export default decompressCharacter
