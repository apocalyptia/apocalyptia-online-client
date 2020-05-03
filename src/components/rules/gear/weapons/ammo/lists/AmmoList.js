import ListArrow from './ListArrow'
import List22 from './List22'
import List9mm from './List9mm'
import List357 from './List357'
import List556 from './List556'
import List308 from './List308'
import List12g from './List12g'


const AmmoList = [
	...ListArrow,
	...List22,
	...List9mm,
	...List357,
	...List556,
	...List308,
	...List12g,
]

export default AmmoList


// OLD AMMO
// new Ammo(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
// new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Ammo(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
// new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),