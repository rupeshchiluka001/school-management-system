const Room = require('../models/room');
const User = require('../models/user');
const Hostel = require('../models/hostel');
const HostelRequest = require('../models/hostelRequest');

const BOYS_HOSTEL = ['A', 'B'];
const GIRLS_HOSTEL = ['C', 'D'];
const NO_OF_ROOMS = 25;
const NO_OF_FLOORS = 3;
const PER_PAGE = 10;

exports.bookRoom = async (req, res, next) => {
    const user = req.user;
    if (user == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    if ( user.hosteller ) {
        res.status(206);
        res.send({"msg": "A room is already allotted to this Student!"});
        return;
    }

    const userId = user._id;
    let hostelUpdated = false, lastRoomFilled = 1, lastFloorFilled = 0;

    for(let hostelName of ((user.gender === 'male') ? BOYS_HOSTEL : GIRLS_HOSTEL)) {

        let hostel = await Hostel.findOne({'hostelName': hostelName}).exec();

        try {
            // if hostel record is not there
            if (hostel == undefined) {
                //create hostel record
                hostel = new Hostel({
                    hostelName: hostelName,
                    noOfRoomsInEachFloor: NO_OF_ROOMS,
                    noOfFloors: NO_OF_FLOORS,
                    lastRoomFilled: 001,
                    lastFloorFilled: 0
                });

                //save hostel record
                hostel = await hostel.save();

                //create hostelRequest record
                let hostelRequest = await new HostelRequest({
                    roomNo: 001,
                    hostelName: hostelName,
                    userName: user.name,
                    userEmail: user.email,
                    userId: userId
                }).save();

                res.status(200);
                res.send({"msg": "Request successfully stored!"});
                return;
            }
        }
        catch (err) {
            Hostel.findOneAndDelete({'hostelName': hostelName})
                    .then(() => { });
            console.log("Err: ", err);
            res.status(501);
            res.send("Internal Error! Try again later!");
            return;
        }

        //if hostel is not 'undefined'

        //find the next roomNo and floorNo to fill
        let roomNo = hostel.lastRoomFilled, floorNo = hostel.lastFloorFilled;
        lastRoomFilled = roomNo, lastFloorFilled = floorNo;

        if (floorNo < hostel.noOfFloors) {
            if (roomNo < hostel.noOfRoomsInEachFloor) {
                roomNo += 1;
            }
            else {
                floorNo += 1;
                roomNo = floorNo*Math.pow(10, (hostel.noOfRoomsInEachFloor+"").toString().length)+1;
            }
        }
        else if (roomNo < hostel.noOfRoomsInEachFloor) {
            roomNo += 1;
        }
        else {
            //if no rooms are available in this hostel
            continue;
        }

        //update the hostel record
        try {
            hostel = await Hostel.findOneAndUpdate({'hostelName': hostelName},
                        {'lastRoomFilled': roomNo, 'lastFloorFilled': floorNo});
            
            hostelUpdated = true;

            //create new hosteRequest record
            let hostelRequest = await new HostelRequest({
                roomNo: roomNo,
                hostelName: hostelName,
                userName: user.name,
                userEmail: user.email,
                userId: userId
            }).save();
            
            res.status(200);
            res.send({"msg": "Request successfully stored!"});
            return;
        }
        catch (err) {
            if ( hostelUpdated ) {
                hostel = await Hostel.findOneAndUpdate({'hostelName': hostelName},
                        {'lastRoomFilled': lastRoomFilled, 'lastFloorFilled': lastFloorFilled});
            }
            console.log("Err: ", err);
            res.status(501);
            res.send({"msg": "Internal Error! Try again later!"});
            return;
        }
    }
    // if rooms not available at all
    res.status(204);
    res.send({"msg": "Rooms not available! Try again later!"});
};

exports.getHostelRequests = async (req, res, next) => {
    const page = req.query.page || 1;

    try {
        const hostelRequests = await HostelRequest.find({})
                        .skip(PER_PAGE*(page-1))
                        .limit(PER_PAGE);

        const count = await HostelRequest.find({}).countDocuments();

        res.status(200);
        res.send({
            hostelRequests: hostelRequests,
            current: page,
            pages: Math.ceil(count/PER_PAGE)
        });
    } catch (err) {
        console.log("Err: ",err);
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
};

exports.acceptRoomRequest = async (req, res, next) => {
    const user = req.user;
    if (user == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    const userId = req.body.userId;
    const hostelRequestId = req.body.hostelRequestId;
    let hostelRequestDeleted = false, hostelRequest = {};

    try {
        //delete hostelRequest
        hostelRequest = await HostelRequest.findByIdAndDelete(hostelRequestId);
        hostelRequestDeleted = true;

        //create record in rooms
        let room = await new Room({
            roomNo: hostelRequest.roomNo,
            hostelName: hostelRequest.hostelName,
            allottedTo: userId
        }).save();

        await User.findByIdAndUpdate(userId, {'hosteller': room._id});

        res.status(200);
        res.send({"msg": "Room Successfully Allotted!"});
    } catch (err) {
        console.log("Err: ", err);
        if ( hostelRequestDeleted ) {
            await HostelRequest.insertMany(hostelRequest);
        }
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
};

exports.getRoomDetails = async (req, res, next) => {
    const user = req.user;
    if (user == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    try {
        const room = await Room.findById(user.hosteller);
        if (room) {
            res.status(200);
            res.send(room);
        }
        else {
            res.status(204);
            res.send({'msg': "Room Not Allocated"});
        }
    }
    catch (err) {
        console.log("Err: ",err);
        res.status(500);
        res.send({'msg': "Internal Error! Try again later!"});
    }
};

exports.checkRoomRequest = async (req, res, next) => {
    const user = req.user;
    if (user == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    try {
        const request = await HostelRequest.findOne({userId: user._id}).exec();
        if (request) {
            res.status(200);
            res.send(request);
        }
        else {
            res.status(204);
            res.send({'msg': "204"});
        }
    }
    catch (err) {
        console.log("Err: ", err);
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
};

exports.leaveRoom = async (req, res, next) => {
    let user = req.user;
    if (user == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    const userId = user._id;
    let room, roomUpdated = false, userUpdated = false;

    try {
        //delete room record
        room = await Room.findByIdAndDelete(user.hosteller);
        roomUpdated = true;

        //update user record
        user = await User.findByIdAndUpdate(userId, {$unset: {'hosteller': ""}});
        userUpdated = true;

        //decrease lastRoomFilled and lastFloorFlled in hostel
        let hostelName = room.hostelName;
        let hostel = await Hostel.findOne({'hostelName': hostelName}).exec();

        let roomNo = hostel.lastRoomFilled, floorNo = hostel.lastFloorFilled;

        if (floorNo > 0) {
            if (roomNo > 1) {
                roomNo -= 1;
            }
            else {
                floorNo -= 1;
                roomNo = floorNo*Math.pow(10, (hostel.noOfRoomsInEachFloor+"").toString().length)+hostel.noOfRoomsInEachFloor;
            }
        }
        else if (roomNo > 1) {
            roomNo -= 1;
        }

        hostel = await Hostel.findOneAndUpdate({'hostelName': hostelName},
                        {'lastRoomFilled': roomNo, 'lastFloorFilled': floorNo});

        res.status(200);
        res.send({"msg": "Database Successfully updated!"});
    }
    catch (err) {
        if (userUpdated) {
            if (roomUpdated) {
                room = await Room.insertMany(room);
            }
            await User.findByIdAndUpdate(userId, {'hosteller': room._id});
        }

        console.log("Err: ", err);
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
};