export const jsonResponse = (statusCode: number, body: {}) => {
    return {
        statusCode,
        body,
    }
}