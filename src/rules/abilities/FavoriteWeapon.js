import Ability from '/src/classes/Ability.js'
import Melee from '../gear/Melee.js'
import Projectile from '../gear/Projectile.js'

const FavoriteWeapon = new Ability({
	name: `Favorite Weapon`,
	description: [`Any Botch with a specified weapon type is reduced in severity to a normal Fail.`],
	max: 1,
	experience: 3,
	options: [
		...Object.values(Melee).map((melee) => melee.name),
		...Object.values(Projectile).map((projectile) => projectile.name)
	]
})

export default FavoriteWeapon
