import express from 'express';
import { UserController } from './user/controller';
let router = new express.Router();

function peopleLikeYou(req, res) {
    const controller = new UserController(global.data);
    const peopleLikeYou = controller.fetchUsers(req);
    res.status(200).send({
            success: 'true',
            message: 'peopleLikeYou Response',
            peopleLikeYou
        });
}

router.get('/people-like-you', peopleLikeYou);
router.get('', (req, res) => { res.status(200).send('Kindly visit : https://sleepy-dawn-97586.herokuapp.com/people-like-you?age=95&p=12&experienced=true&name=thor') });

module.exports = router;