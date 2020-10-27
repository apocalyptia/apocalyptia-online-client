import Description from 'lists/Description.js'
import Traits from 'lists/Traits.js'
import Skills from 'lists/skills/Skills.js'
import Properties from 'lists/Properties.js'
import Abilities from 'lists/abilities/Abilities.js'
import RandomStartingGear from 'random/RandomStartingGear.js'

const RandomCharacter = (c) => {
    c = Description.random(c)
    c = Traits.random(c)
    c = Skills.random(c)
    c = Properties.setScores(c)
    c = Abilities.random(c)
    c = RandomStartingGear(c, c.props.luck.score)
    c.meta.status.step = 7
    return c
}

export default RandomCharacter