export const COLUMN_MAP = {
    age: { type: 'number' },
    latitude: { type: 'number' },
    longitude: { type: 'number' },
    'monthly income': { type: 'number' },
    experienced: { type: 'boolean' },
    name: { type: 'string' }
}
export const COLUMNS = Object.keys(COLUMN_MAP);

export const computeQueryScore = (request) => {
    /**
     * This function is used to assign a weight to our query parameters. We might also send multiple
     * incorrect query parameters which should not be used while counting our weight. Each query parameter
     * should ideally have a value and weight associated to itself. The process for computing this value is by
     * computing the percentage or fraction of the present query when compared against all other queries. For example:
     * if request is {age: 10, incorrect: 123, latitude: 100} then the returned value would be {age: {value: 10, weight: 50}, latitude: {value: 100, weight: 50}}
     */
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

export const calculateStringDifference = (queryVal, personVal) => {
    /**
     * Calculate the matching difference between 2 string.
     * This can be accomplished by computing the set difference of the 2 values and the length difference
     * and then by using the two values to compute the percentage difference.
     */
    let lengthA = queryVal.length,
        lengthB = personVal.length,
        computeString = 100 * Math.min(lengthA, lengthB) / Math.max(lengthA, lengthB);
    let personSet = new Set(personVal);
    let intersection = new Set(queryVal.split('').filter(x => personSet.has(x)));
    computeString = computeString * [...intersection].length / queryVal.length;
    return computeString / 100;
}

export const calculateNumberDifference = (queryVal, personVal) => {
    /**
     * Calculate the matching difference between 2 numbers.
     * This can be accomplished by computing the percentage difference value between the data points and by later multiplying the
     * confidence score with the query parameter weight.
     */
    let compute = Math.abs(queryVal - personVal) * 100/ queryVal;
    compute = 100 - compute;
    return compute / 100;
}

export const typeBasedCalculation = (type, queryVal, personVal, weight) => {
    switch(type) {
        case 'string':
            return calculateStringDifference(queryVal.toLowerCase(), personVal.toLowerCase()) * weight;

        case 'boolean':
            return String(queryVal).toLowerCase() === String(personVal).toLowerCase() ? weight : 0;
        case 'number':
        default:
            return calculateNumberDifference(queryVal, personVal) * weight;
    }
}

export const calculateScore = (data, queryParam) => {
    /**
     * This function is used to compute each element's absolute score/match percentage with the query parameter.
     */
    return data.map(person => {
        person.score = 0;
        Object.keys(queryParam).forEach(key => {
            const val = queryParam[key].value;
            if (person.hasOwnProperty(key)) {
                person.score += typeBasedCalculation(COLUMN_MAP[key].type, val, person[key], queryParam[key].weight);
            }
        });
        person.score /= 100;
        return person;
    });
}