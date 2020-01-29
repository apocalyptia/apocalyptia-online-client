import Rule from './Rule'
import DifficultyTable from './tables/DifficultyTable.svelte'


export const CoreExplanation = `When you want to attempt a difficult action, roll one six-sided die (“d6”) to decide a fair outcome. Added to the d6 roll is the Character’s score in a Trait or Skill, depending on the action. Finally, add or subtract from the roll any modifiers relevant to the circumstances, as determined by the Narrator. The formula for a roll is always shown in [brackets]. Calculate the Result of a d6 roll as follows:`

export const ResultFormula = `[d6 Roll + Score ± Modifiers] = Result`


export const Difficulty = new Rule({
	name: `Difficulty`,
	description: [
		`The Result of your roll must be greater than or equal to the Difficulty number to be successful. Difficulties are indicated by the # symbol. The Narrator or an opposing roll set the # for your rolls.`
	],
	table: DifficultyTable
})

export const RoteActions = new Rule({
	name: `Rote Actions`,
	description: [
		`If your [(Score + Modifiers) >= #] before the roll and you can take your time, you Succeed automatically.`
	]
})

export const Cooperation = new Rule({
	name: `Cooperation`,
	description: [
		`If Characters want to help each other perform a task, one of them makes the roll and the rest add their Scores together as a Modifier to the main Character’s Result. The Narrator should use their judgement to determine the time to completion.`
	]
})

export const Success = new Rule({
	name: `Success`,
	description: [
		`If [Result >= #], the attempted action worked. Re-roll ties on opposed rolls. The degree of Success is important for some rolls, such as Attacks.`
	],
	subrules: [
		RoteActions,
		Cooperation
	]
})

export const Fail = new Rule({
	name: `Fail`,
	description: [
		`If [Result < #], the attempted action did not work.`
	]
})

export const Explode = new Rule({
	name: `Explode`,
	description: [
		`If a 6 is rolled, re-roll it again and again as long as 6's continue. Add all of these d6 rolls together, then calculate your Result.`
	]
})

export const Botch = new Rule({
	name: `Botch`,
	description: [
		`If you roll 1 on a die, re-roll to check for a Botch. If a 1 is rolled again, you Botch, meaning you fail very badly. For any other number, your d6 roll is just a 1. Bonus rolls from Exploding dice do not Botch.`,
		`The Narrator has a great deal of latitude to be creative when determining the effects of Botching under various circumstances, but they should always be fair.`,
		`Whenever a Character Botches, they get +1 XP because we learn the most from our greatest failures.`
	]
})


const Core = [
	Difficulty,
	Success,
	Fail,
	Explode,
	Botch
]

export default Core