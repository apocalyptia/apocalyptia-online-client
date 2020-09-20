export const failureResponse = (err) => {
	return {
		statusCode: err.status,
		body: JSON.stringify(err)
	}
}