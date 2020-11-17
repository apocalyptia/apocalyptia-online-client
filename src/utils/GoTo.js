import { goto } from '@sapper/app'

export default (string) => {
	goto(string)
	// window.location.href = string
}