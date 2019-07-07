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

module.exports = router;