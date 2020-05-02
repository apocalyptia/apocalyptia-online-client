import Difficulty from './core/Difficulty'
import Success from './core/Success'
import Fail from './core/Fail'
import Explode from './core/Explode'
import Botch from './core/Botch'


export default {
	name: `Core`,
	explanation: [
		`When you want to attempt a difficult action, roll one six-sided die (“d6”) to decide a fair outcome.`,
		`Added to the d6 roll is the Character’s score in a Trait or Skill, depending on the action.`,
		`Finally, add or subtract from the roll any modifiers relevant to the circumstances, as determined by the Narrator.`,
		`The formula for a roll is always shown in [brackets].`,
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