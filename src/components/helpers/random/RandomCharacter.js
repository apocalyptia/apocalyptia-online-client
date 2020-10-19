import Description from 'rules/description/Description.js'
import Traits from 'rules/traits/Traits.js'
import Skills from 'rules/skills/Skills.js'
import Properties from 'rules/properties/Properties.js'
import Abilities from 'rules/abilities/Abilities.js'
import RandomStartingGear from 'random/RandomStartingGear.js'

const RandomCharacter = (c) => {
    c = Description.random(c)
    c = Traits.random(c)
    c = Skills.random(c)
    c = Properties.setScores(c)
    c = Abilities.random(c)
    c = RandomStartingGear(c, c.props.luck.score)
    return c
}

export default RandomCharacter