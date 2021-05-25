import Ability from '../../classes/Ability.js' 
import Melee from '../gear/Melee.js' 
import Projectile from '../gear/Projectile.js' 

const FavoriteWeapon = new Ability({
	name: `Favorite Weapon`,
	desc: [
		`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`,
	],
	max: 1,
	experience: 3,
	options: [
		...Object.values(Melee).map(m => m.name),
		...Object.values(Projectile).map(p => p.name)
	]
})

export default FavoriteWeapon