export const failureResponse = (err) => {
	return {
		statusCode: 400,
		body: JSON.stringify(err)
	}
}