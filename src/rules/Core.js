import Botch from './core/Botch.js'
import Dice from './core/Dice.js'
import Difficulty from './core/Difficulty.js'
import Explode from './core/Explode.js'
import Fail from './core/Fail.js'
import Success from './core/Success.js'

const Core = {
	dice: Dice,
	difficulty: Difficulty,
	success: Success,
	fail: Fail,
	explode: Explode,
	botch: Botch
}

export default Core
