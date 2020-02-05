import { router } from '../routes'

const Navigator = (event, screen) => {
	screen.step = event.detail.number
	if (screen.step == screen.options.length || screen.step < 0) { router.Home() }
	else { screen.selected = screen.options[screen.step] }
	return screen
}

export default Navigator