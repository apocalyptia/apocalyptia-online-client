import Rule from '../../rule.js'

export const Bleeding = new Rule(
    `Bleeding`, 
    `When you take Wounds = [Health / 2] or more, you begin taking an additional 1DMG per minute. Roll Medicine(First-Aid) vs Wounds to stop Bleeding with a bandage.`
)