import Difficulty from 'rules/core/Difficulty.js'
import Success from 'rules/core/Success.js'
import Fail from 'rules/core/Fail.js'
import Explode from 'rules/core/Explode.js'
import Botch from 'rules/core/Botch.js'

export default {
	name: `Core`,
	text: [
		`To attempt a difficult action, roll one six-sided die (“d6”) to see how well your efforts worked out for you.`,
		`Your Character’s score in a relevant Trait or Skill is added to the d6 roll to improve your chances of succeeding.`,
		`There are many other modifiers that may add or subtract from your result.`,
		`Modifiers are applied by the Narrator.`,
		`The formula for a roll is shown in [brackets].`,
		`Calculate the Result of a d6 roll as follows:`,
		`[d6 Roll + Score ± Modifiers] = Result`,
	],
	list: [
		Difficulty,
		Success,
		Fail,
		Explode,
		Botch,
	]
}