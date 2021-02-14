import Rule from 'classes/Rule.js'

const Dice = new Rule({
	name: `Dice`,
	desc: [
		`When you want your character to do something difficult, tell your Narrator what you would like to try.`,
		`They will tell you which Trait or Skill is most important for the situation.`,
		`You then roll one six-sided die ("1d6") and add the appropriate Trait or Skill score to the die result.`,
		`Many factors may further modify the final Result, such as special equipment that grants a bonus or unfavorable circumstances which impose a penalty.`,
		`It is the Narrator's job to decide which modifiers will affect your roll and what their magnitude will be.`,
		`If you feel that your Narrator is not taking some relevant modifiers into consideration, you should make your case briefly before rolling and then defer to their judgment (at least until the session is over).`,
		`[d6 Roll + Trait or Skill Score ± Modifiers] = Result`,
	]
})

export default Dice