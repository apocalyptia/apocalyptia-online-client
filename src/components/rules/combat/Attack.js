import Rule from '../../rules/Rule'


const Attack = new Rule({
	id: `d253e0e1-36bf-4434-a78b-032196be0e73`,
	name: `Attack`, 
	desc: [
		`There are two types of Attacks: Melee and Ranged.`,
		`Spend an Action on your turn to roll [d6 + Melee or Ranged] vs Defense.`,
		`Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the Attack total.`,
		`On a Successful Attack, in addition to the Weapon Damage, you do bonus Damage = [Attack - Defense] up to your attacking Skill score.`,
	]
})

export default Attack