import AmmoAttr from '../../../classes/gear/attributes/AmmoAttr'


export const Broadhead = new AmmoAttr({
	name: `Broadhead`,
	desc: [
		`+1 Damage.`,
	],
	cal: [
		`Arrow`,
	]
})

export const HollowPoint = new AmmoAttr({
	name: `Hollow Point`,
	desc: [
		`+1 Damage.`,
	],
	cal: [
		`.22`,
		`9mm`,
		`.357`,
		`5.56`,
		`.308`,
	]
})

export const Match = new AmmoAttr({
	name: `Match`,
	desc: [
		`+1 Ranged Attack.`,
	],
	cal: [
		`.22`,
		`9mm`,
		`.357`,
		`5.56`,
		`.308`,
	]
})

export const Slug = new AmmoAttr({
	name: `Slug`,
	desc: [
		`Range x2.`,
	],
	cal: [
		`12g`,
	]
})


export default [
	Broadhead,
	HollowPoint,
	Match,
	Slug,
]