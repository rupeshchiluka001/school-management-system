const router = require('express').Router();
const hostelMethods = require('../controllers/hostel');

router.get('/book-hostel-room', hostelMethods.bookRoom);

router.get('/leave-hostel-room', hostelMethods.leaveRoom);

router.get('/get-all-hostel-room-requests', hostelMethods.getHostelRequests);

router.post('/accept-room-request', hostelMethods.acceptRoomRequest);

router.get('/get-room-details', hostelMethods.getRoomDetails);

router.get('/check-room-request', hostelMethods.checkRoomRequest);

module.exports = router;