import AmmoAttribute from '../../../classes/gear/AmmoAttribute'


export const Broadhead = new AmmoAttribute({
	name: `Broadhead`,
	description: [
		`+1 Damage.`,
	],
	calibers: [
		`Arrow`,
	]
})

export const HollowPoint = new AmmoAttribute({
	name: `Hollow Point`,
	description: [
		`+1 Damage.`,
	],
	calibers: [
		`.22`,
		`9mm`,
		`.357`,
		`5.56`,
		`.308`,
	]
})

export const Match = new AmmoAttribute({
	name: `Match`,
	description: [
		`+1 Ranged Attack.`,
	],
	calibers: [
		`.22`,
		`9mm`,
		`.357`,
		`5.56`,
		`.308`,
	]
})

export const Slug = new AmmoAttribute({
	name: `Slug`,
	description: [
		`Range x2.`,
	],
	calibers: [
		`12g`,
	]
})


export default [
	Broadhead,
	HollowPoint,
	Match,
	Slug,
]