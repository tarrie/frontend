//https://reactnative.dev/docs/network
class RestApi {
    get = async ({endPoint, payload}) => {
        // Default options are marked with *
        const response = await fetch(endPoint, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }



}

export default RestApi;