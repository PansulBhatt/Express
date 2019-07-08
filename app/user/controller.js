import { computeQueryScore, calculateScore } from '../utils/calculate';

export class UserController {
    constructor(data) {
        this.data = data;
    }

    fetchUsers(req) {
        const data = calculateScore(this.data, computeQueryScore(req));
        return {
            peopleLikeYou: data.sort((a, b) => { return b.score - a.score; }).slice(0, 10)
        };
    }
}
