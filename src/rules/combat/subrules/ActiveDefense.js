import Combat from '/src/classes/Combat.js'

const ActiveDefense = new Combat({
	name: `Active Defense`,
	description: [
		`There are two types of Active Defenses: Block and Dodge.`,
		`When you are targeted by an Attack, you may use an unallocated Action to attempt to Block or Dodge the Attack.`,
		`A Block roll [d6 + Melee(Block)] can be made vs a Melee Attack, or a Projectile Attack if you are holding a Shield.`,
		`A Dodge roll [d6 + Acrobatics(Dodge)] can be made vs either a Melee Attack or a Projectile(Traditional) Attack.`,
		`Using an Action to make an Active Defense roll costs 1 Endurance.`,
		`Botching an Active Defense roll means you fall Prone.`,
	]
})

export default ActiveDefense