import capitalize from '$utils/text/capitalize.js'

export function getPageTitle() {

	const currentURL = window.location.href || ''

	const currentURLArray = currentURL.split('/')

	const pageTitle = capitalize(currentURLArray[currentURLArray.length - 1]) || ''

	return pageTitle

}

export default getPageTitle