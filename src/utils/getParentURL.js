export function getParentURL() {

	const currentURL = window.location.href

	const currentURLArray = currentURL.split('/')

	currentURLArray.pop()

	const parentURL = currentURLArray.join('/')

	return parentURL

}

export default getParentURL