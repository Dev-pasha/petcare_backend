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
    getAllAppointmentsOfAdmin,
    createAdmin,
    doctorApproval,
    reviewApproval,
    getAllPayments,
    getAllPaymentsOfClientById,
    createDoctor,
    getSingleAppointment,
    getSingleAppointmentById,
    deleteDoctor
} = require("./handler");

// router.use();

// GET
// Routes operation for doctors 
router.get('/get-all-doctors', authenticateAndAuthorize('ADMIN'), getAllDoctors);
router.get('/delete-doctor', authenticateAndAuthorize('ADMIN'), deleteDoctor);
router.get('/get-single-doctor', authenticateAndAuthorize('ADMIN'), getSingleDoctor);

// Routes operation for clients
router.get('/get-all-clients', authenticateAndAuthorize('ADMIN'), getAllclients);
router.get('/get-single-client', authenticateAndAuthorize('ADMIN'), getSingleClient);

// Routes operation   for appointments

// get-all-appointment route to get all appointments of the doctor
router.get('/get-all-appointments-of-doc', authenticateAndAuthorize('ADMIN'), getAllAppointments);
// get-single-appointment route to get single appointment of the doctor
router.get('/get-single-appointment', authenticateAndAuthorize('ADMIN'), getSingleAppointment)


// router.get('/get-all-appointments-of-doctor',authenticateAndAuthorize('ADMIN'), getAllAppointmentsOfDoctorById);
router.get('/get-all-appointments-of-client', authenticateAndAuthorize('ADMIN'), getAllAppointmentsOfClientById);
router.get('/get-single-appointment-client', authenticateAndAuthorize('ADMIN'), getSingleAppointmentById)


// Routes to get all appointments 
router.get('/get-all-appointments', authenticateAndAuthorize('ADMIN'), getAllAppointmentsOfAdmin);


// Routes operation for pets
router.get('/get-all-pets', authenticateAndAuthorize('ADMIN'), getAllPets);
router.get('/get-all-pets-of-client', authenticateAndAuthorize('ADMIN'), getAllPetsOfClientById);
router.get('/get-single-pet', authenticateAndAuthorize('ADMIN'), getSinglePet);

// Routes operation for reviews
router.get('/get-all-reviews-of-doctor', authenticateAndAuthorize('ADMIN'), getAllReviewsOfDoctor);

// Routes operation for payments

router.get('/get-all-payments', authenticateAndAuthorize('ADMIN'), getAllPayments);
router.get('/get-all-payments-of-client', authenticateAndAuthorize('ADMIN'), getAllPaymentsOfClientById);


// POST 

router.post('/create-admin', createAdmin);
// Routes operation for doctors
router.post('/doctor-approval', authenticateAndAuthorize('ADMIN'), doctorApproval);

// Routes operation for reviews
router.post('/review-approval', authenticateAndAuthorize('ADMIN'), reviewApproval);

// Routes to create Doctor

router.post('/create-doctor', authenticateAndAuthorize('ADMIN'), createDoctor);










module.exports = router;
