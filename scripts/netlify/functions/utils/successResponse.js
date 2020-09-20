export const successResponse = (res) => {
	return {
		statusCode: res.status,
		body: JSON.stringify(res)
	}
}