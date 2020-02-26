export function userFromNetlify(serverUser) {
	return getUser(serverUser)
}

function getUser(user) {
	return {
		email: user.email,
		displayName: user.displayName
	}
}
