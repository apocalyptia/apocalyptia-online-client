import Rule from '../Rule'

export const Bleeding = new Rule(
	`Bleeding`, 
	`When you take Wounds = [Health / 2] or more, you begin taking an additional 1 Wound per minute. Roll Medicine(First-Aid) vs Wounds to stop Bleeding.`
)