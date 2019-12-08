import Rule from '../Rule'

export const Pain = new Rule(
	`Pain`, 
	`Wounds (and a few other effects) cause Pain which is a -1 penalty to all rolls and Speed. Pain fades as Wounds heal. You fall Prone if your Speed drops to 0 from Pain. You go unconscious if Pain = [C + D].`
)