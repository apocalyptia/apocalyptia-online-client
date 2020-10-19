import AmmoArrow from './arrow/AmmoArrow'
import Ammo22 from './22/Ammo22'
import Ammo9mm from './9mm/Ammo9mm'
import Ammo357 from './357/Ammo357'
import Ammo556 from './556/Ammo556'
import Ammo308 from './308/Ammo308'
import Ammo12g from './12g/Ammo12g'


const AmmoList = [
	...AmmoArrow,
	...Ammo22,
	...Ammo9mm,
	...Ammo357,
	...Ammo556,
	...Ammo308,
	...Ammo12g,
]

export default AmmoList


// OLD AMMO
// new Ammo(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
// new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Ammo(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
// new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),