export const failureResponse = (res) => {
	return {
		statusCode: 400,
		body: JSON.stringify(err)
	}
}