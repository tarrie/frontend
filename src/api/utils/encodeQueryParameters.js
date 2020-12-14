const encodeQueryParameters = ({key, listOfQueries}) => {
    let query = "";
    let n = listOfQueries.length();

    for (let i = 0; i < n; i++) {
        query += `${key}=${encodeURIComponent(listOfQueries[i])}`;
        if (i !== n - 1) {
            query += "&";
        }
    }
    return query
}

export default encodeQueryParameters;
