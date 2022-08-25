import capitalize from '$utils/text/capitalize.js'
import urlFormat from '$utils/text/urlFormat.js'

const getName = (rule) => {
	if (rule[1].name !== undefined) {
		return rule[1].name
	} else {
		return capitalize(rule[0])
	}
}

const getURL = (rule) => {
	if (rule[1].url !== undefined) {
		return rule[1].url
	} else if (Object.values(rule[1])[0].url !== undefined) {
		return Object.values(rule[1])[0].url.slice(0, Object.values(rule[1])[0].url.lastIndexOf('/'))
	} else {
		return urlFormat(`/manual/${rule[0]}`)
	}
}

export default function() {
	return Object.entries(this.list).map((rule) => {
		return {
			name: getName(rule),
			url: getURL(rule)
		}
	})
}