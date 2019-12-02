import Rule from '../../rule.js'

export const Starvation = new Rule(
    `Starvation`, 
    `People need 1 Food per day. 1 Pain per week without Food. This penalty is reduced by 1 per day with Food. Going without Food for a number of weeks = C is lethal.`
)