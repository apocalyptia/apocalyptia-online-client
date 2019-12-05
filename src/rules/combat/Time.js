import Rule from '../Rule'

export const Time = new Rule(
    `Time`, 
    `Combat time occurs in 3-second “rounds” (rnds). Each Player gets a turn each rnd. Either the GN decides or rolls [A vs A] to determine who goes first. At the end of each turn, the Player chooses who will go next among those who have not had a turn yet this rnd. At the end of the rnd the last Player to act decides who will start the next round.`
)