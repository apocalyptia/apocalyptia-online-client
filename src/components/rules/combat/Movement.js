import Rule from '../../classes/Rule'
import Chase from './Chase'


const Movement = new Rule({
	name: `Movement`, 
	desc: [
		`You may make one Movement Action per turn.`,
		`This Movement always costs 1 Action, no matter what type of Movement it is.`,
		`Your Movement Action may be any one of the following:`,
		` 1) Walk Speed = [Agility x 3] yards`,
		` 2) Run Speed = [Agility x 6] yards`,
		` 3) Climb Speed = [Agility] yards`,
		` 4) Swim Speed = [Agility / 2] yards`,
		` 5) Stand up from Prone = 1 yard`,
		`When you take a Movement Action, you may go Prone at any time for free.`,
		`Running imposes the Unstable Status effect until your next turn.`,
		`You may divide up your Movement around other Actions on your turn however you wish.`,
	]
})
Movement.subrules = [
	Chase,
]

export default Movement