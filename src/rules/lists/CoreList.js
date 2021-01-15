import Dice from 'rules/core/Dice.js'
import Difficulty from 'rules/core/Difficulty.js'
import Success from 'rules/core/Success.js'
import Fail from 'rules/core/Fail.js'
import Explode from 'rules/core/Explode.js'
import Botch from 'rules/core/Botch.js'

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