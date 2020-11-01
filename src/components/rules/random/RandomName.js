import FemaleNamesList from 'lists/names/FemaleNamesList.js'
import MaleNamesList from 'lists/names/MaleNamesList.js'
import NamesList from 'lists/names/NamesList.js'
import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
	if (c.desc.sex.value == `Male`) return RandomRoll(MaleNamesList)
	if (c.desc.sex.value == `Female`) return RandomRoll(FemaleNamesList)
	c.desc.name.value = RandomRoll(NamesList)
	return c
}