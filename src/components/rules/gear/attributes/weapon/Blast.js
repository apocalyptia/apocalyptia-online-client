import WeaponAttr from './WeaponAttr'


const Blast = new WeaponAttr({
	name: `Blast`,
	desc: [
		`Roll [d6 vs Reflexive Dodge] against everyone in the Blast radius.`,
		`[Damage / 2] on a miss (minimum 1).`,
	]
})

export default Blast