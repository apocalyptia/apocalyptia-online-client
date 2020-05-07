import WeaponAttr from './WeaponAttr'


const TwoHanded = new WeaponAttr({
	name: `2h`,
	desc: [
		`Must be used two-handed.`,
		`Can be used one-handed at a penalty = Size.`,
	]
})

export default TwoHanded