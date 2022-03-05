import Combat from '$classes/Combat.js'

const Fire = new Combat({
	name: `Fire`,
	description: [
		`Each Round you take Damage from Fire, 1 point is permanent and never heals.`,
		`Only Fire-Resistant Armor reduces Damage from Fire.`
	]
})

export default Fire
