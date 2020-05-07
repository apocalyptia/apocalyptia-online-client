import Rule from '../../rules/Rule'


const Attack = new Rule({
	name: `Attack`, 
	desc: [
		`There are two types of Attacks: Melee and Ranged.`,
		`Spend an Action on your turn to roll [d6 + Melee or Ranged] vs Defense.`,
		`Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the Attack total.`,
		`On a Successful Attack, you do bonus Damage = [Attack - Defense] up to your Melee or Ranged score.`,
	]
})

export default Attack