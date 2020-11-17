import ResetUIColor from 'utils/ResetUIColor.js'
import { characterList } from 'stores/characterListStore.js'
import { user } from 'stores/userStore.js'

export default (name) => {
	window.localStorage.removeItem(name)
	user.update(u => u.currentCharacter = '')
	characterList.update(charList => {
		charList = charList.filter(c => c.description.name.value != name)
		if (charList.length == 0) ResetUIColor()
	})
}