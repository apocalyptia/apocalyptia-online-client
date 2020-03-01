import Rule from '../classes/Rule'


export const CoreExplanation = `When you want to attempt a difficult action, roll one six-sided die (“d6”) to decide a fair outcome. Added to the d6 roll is the Character’s score in a Trait or Skill, depending on the action. Finally, add or subtract from the roll any modifiers relevant to the circumstances, as determined by the Narrator. The formula for a roll is always shown in [brackets]. Calculate the Result of a d6 roll as follows:`

export const ResultFormula = `[d6 Roll + Score ± Modifiers] = Result`


export const Difficulty = new Rule({
	name: `Difficulty`,
	description: [
		`The Result of your roll must be greater than or equal to the Difficulty number to be a Success. Difficulties are indicated by the # symbol. The Narrator or an opposing roll sets the # for your rolls.`,
		`3# = Trivial`,
		`6# = Routine`,
		`9# = Challenging`,
		`12# = Really Hard`,
		`15# = Very Unlikely`,
		`18# = Nearly Impossible`
	]
})

export const RoteActions = new Rule({
	name: `Rote Actions`,
	description: [
		`If your [(Score + Modifiers) >= #] before the roll and you can take your time, you Succeed automatically.`,
	]
})

export const Cooperation = new Rule({
	name: `Cooperation`,
	description: [
		`If Characters want to help each other perform a task, one of them makes the roll and the rest add their Scores together as a Modifier to the main Character’s Result. The Narrator should use their judgement to determine the time to completion.`,
	]
})

export const Success = new Rule({
	name: `Success`,
	description: [
		`Your roll is a Success when if the Result is greater than or equal to the Difficulty. Re-roll ties on opposed rolls. The degree of Success (the amount by which the Result exceeded the Difficulty) is important for some rolls, such as Attacks.`,
	],
	subrules: [
		RoteActions,
		Cooperation
	]
})

export const Fail = new Rule({
	name: `Fail`,
	description: [
		`Your roll is a Fail when the Result is less than the Difficulty.`,
	]
})

export const Explode = new Rule({
	name: `Explode`,
	description: [
		`An Exploding die offers the possibility of doing extraordinarily well at a Trait, Skill, or Property roll. If a 6 is rolled, roll it again and keep rolling as long as the die continues to roll a 6. When the die finally stops Exploding, add all of these rolls together, then add scores and modifiers as usual to get your Result.`,
	]
})

export const Botch = new Rule({
	name: `Botch`,
	description: [
		`A Botch is when you have failed very very badly at a Trait, Skill, or Property roll. If you roll 1 on a die and that die is not Exploding, re-roll to check for a Botch. If a 1 is rolled again, you Botch. If any other number is rolled, your d6 roll is counted as a normal 1.`,
		`The Narrator has a great deal of latitude to be creative when determining the effects of Botching under various circumstances, but they should always be fair.`,
		`Whenever a Character Botches, they get +1 XP because we learn the most from our greatest failures.`,
	]
})


export default {
	explanation: CoreExplanation,
	list: [
		Difficulty,
		Success,
		Fail,
		Explode,
		Botch
	]
}