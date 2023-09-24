const express = require("express");
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authenticate")
const {
    getAllDoctors,
    getSingleDoctor,
    getAllclients,
    getSingleClient,
    getAllAppointments,
    getAllAppointmentsOfDoctorById,
    getAllAppointmentsOfClientById,
    getAllPets,
    getAllPetsOfClientById,
    getSinglePet,
    getAllReviewsOfDoctor,
    createAdmin,
    doctorApproval,
    reviewApproval,
    getAllPayments,
    getAllPaymentsOfClientById
} = require("./handler");

router.use(authenticateAndAuthorize('ADMIN'));

// GET
// Routes operation for doctors 
router.get('/get-all-doctors', getAllDoctors);
router.get('/get-single-doctor/:id', getSingleDoctor);

// Routes operation for clients
router.get('/get-all-clients', getAllclients);
router.get('/get-single-client/:id', getSingleClient);

// Routes operation for appointments
router.get('/get-all-appointments', getAllAppointments);
router.get('/get-all-appointments-of-doctor/:id', getAllAppointmentsOfDoctorById);
router.get('/get-all-appointments-of-client/:id', getAllAppointmentsOfClientById);

// Routes operation for pets
router.get('/get-all-pets', getAllPets);
router.get('/get-all-pets-of-client/:id', getAllPetsOfClientById);
router.get('/get-single-pet/:id', getSinglePet);

// Routes operation for reviews
router.get('/get-all-reviews-of-doctor', getAllReviewsOfDoctor);

// Routes operation for payments

router.get('/get-all-payments', getAllPayments);
router.get('/get-all-payments-of-client/:id', getAllPaymentsOfClientById);


// POST 

router.post('/create-admin', createAdmin);
// Routes operation for doctors
router.post('/doctor-approval', doctorApproval);

// Routes operation for reviews
router.post('/review-approval', reviewApproval);











module.exports = router;
