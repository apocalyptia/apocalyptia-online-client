import Ability from '$classes/Ability.js'
import Melee from '../gear/Melee.js'
import Projectile from '../gear/Projectile.js'

const WeaponTraining = new Ability({
	name: `Weapon Training`,
	description: [`+1 Attack with a specified weapon type.`],
	max: 1,
	experience: 3,
	options: [...Object.values(Melee).map((melee) => melee.name), ...Object.values(Projectile).map((projectile) => projectile.name) ],
})

export default WeaponTraining
