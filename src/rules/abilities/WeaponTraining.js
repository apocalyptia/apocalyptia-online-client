import Ability from '/src/classes/Ability.js'
import Melee from '../gear/Melee.js'
import Projectile from '../gear/Projectile.js'

const WeaponTraining = new Ability({
	name: `Weapon Training`,
	desc: [`+1 Attack with a specified weapon type.`],
	max: 1,
	experience: 3,
	options: [...Object.values(Melee).map((m) => m.name), ...Object.values(Projectile).map((p) => p.name)]
})

export default WeaponTraining
