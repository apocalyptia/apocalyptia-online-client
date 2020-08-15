export const successResponse = (res) => {
	return {
		statusCode: 200,
		body: JSON.stringify(res)
	}
}