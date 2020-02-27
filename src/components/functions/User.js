export const userFromNetlify = (serverUser) => {
	return getUser(serverUser)
}

const getUser = (user) => {
	return {
		email: user.email,
		displayName: user.displayName
	}
}
