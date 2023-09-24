const express = require("express");
const router = express.Router();
const {authenticateAndAuthorize} = require("../../middlewares/auth");
const {
    getAllPets,
    getPet,
    createPet,
    updatePet,
    deletePet,
    getMyAppoinments,
    getAppoinment,
    createAppoinment,
    createReview,
    createClient,
    updateClient

 } = require("./handlers");


 router.use(authenticateAndAuthorize('CLIENT'))


router.get('/get-all-pets/:id', getAllPets)
router.get('/get-pet/:id', getPet)
router.post('/create-pet', createPet)
router.post('/update-pet', updatePet)
router.get('/delete-pet', deletePet)

router.get('/get-my-appoinments/:id', getMyAppoinments)
router.get('/get-appoinment/:id', getAppoinment)
router.post('/create-appoinment', createAppoinment)

router.post('/create-review', createReview)
router.post('/create-client', createClient)
router.post('/update-client', updateClient)






module.exports = router;
