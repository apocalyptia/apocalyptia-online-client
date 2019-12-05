import Rule from '../Rule'

export const FriendlyFire = new Rule(
    `Friendly Fire`, 
    `-3 RATK against targets within 1yd of your ally. If the RATK Fails, re-roll the RATK vs the ally’s Reflex.`
)