export const COLUMNS = ['age', 'latitude', 'longitude', 'monthly income'];

export const computeQueryScore = (request) => {
    let { query } = request;
    query = Object.keys(query)
        .filter(key => COLUMNS.includes(key))
        .reduce((obj, key) => {
            obj[key] = { value: query[key] };
            return obj;
        }, {});
    Object.keys(query).forEach((key, index, queryList) => {
        query[key].weight = 100/queryList.length;
    });    
    return query;
}

export const calculateScore = (data, queryParam) => {
    return data.map(person => {
        let score = 0;
        Object.keys(queryParam).forEach(key => {
            const val = queryParam[key].value;
            if (person.hasOwnProperty(key)) {
                let compute = Math.abs(val - person[key]) * 100/ val;
                compute = 100 - compute;
                score = (compute / 100) * queryParam[key].weight;
            }
        });
        person.score = score/100;
        return person;
    });
}