import Dice from '/src/rules/core/Dice.js'
import Difficulty from '/src/rules/core/Difficulty.js'
import Success from '/src/rules/core/Success.js'
import Fail from '/src/rules/core/Fail.js'
import Explode from '/src/rules/core/Explode.js'
import Botch from '/src/rules/core/Botch.js'

export default {
	name: `Core`,
	list: [
		Dice,
		Difficulty,
		Success,
		Fail,
		Explode,
		Botch,
	]
}