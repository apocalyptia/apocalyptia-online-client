import randomAge from '/src/utils/random/description/randomAge.js'
import randomHair from '/src/utils/random/description/randomHair.js'
import randomHeight from '/src/utils/random/description/randomHeight.js'
import randomName from '/src/utils/random/description/randomName.js'
import randomSex from '/src/utils/random/description/randomSex.js'
import randomSkin from '/src/utils/random/description/randomSkin.js'
import randomWeight from '/src/utils/random/description/randomWeight.js'

export default function(category = 'All') {
	switch (category) {
		case 'Age':
			this.description.age.value = randomAge()
			break
		case 'Hair':
			this.description.hair.value = randomHair(
				this.description.age.value,
				this.description.sex.value,
				this.description.skin.value
			)
			break
		case 'Height':
			this.description.height.value = randomHeight(this.description.sex.value)
			break
		case 'Name':
			this.description.name.value = randomName(this.description.sex.value)
			break
		case 'Sex':
			this.description.sex.value = randomSex()
			break
		case 'Skin':
			this.description.skin.value = randomSkin()
			break
		case 'Weight':
			this.description.weight.value = randomWeight(this.description.height.value, this.description.sex.value)
			break
		case 'All':
			this.description.age.value = randomAge()
			this.description.sex.value = randomSex()
			this.description.skin.value = randomSkin()
			this.description.name.value = randomName(this.description.sex.value)
			this.description.height.value = randomHeight(this.description.sex.value)
			this.description.weight.value = randomWeight(this.description.height.value, this.description.sex.value)
			this.description.hair.value = randomHair(
				this.description.age.value,
				this.description.sex.value,
				this.description.skin.value
			)
	}
}