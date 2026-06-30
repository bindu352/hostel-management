const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Room = require("./models/Room");
const Allocation = require("./models/Allocation");
const Fee = require("./models/Fee");
const Mess = require("./models/Mess");
const Complaint = require("./models/Complaint");
const Event = require("./models/Event");
const app = express();

console.log("MY SERVER FILE IS RUNNING");

// JSON data ni read cheyadaniki
app.use(express.json());

// Public folder serve cheyadaniki
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Atlas Connect
mongoose.connect(
    "mongodb://himabindu:himabindu07@ac-qukh6fr-shard-00-00.tzcyijq.mongodb.net:27017,ac-qukh6fr-shard-00-01.tzcyijq.mongodb.net:27017,ac-qukh6fr-shard-00-02.tzcyijq.mongodb.net:27017/studentdb?ssl=true&replicaSet=atlas-hbefn0-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));
// =====================
// Student Model
// =====================

const Student = mongoose.model("Student", {
    name: String,
    roomNo: String,
    email: String
});


// =====================
// User Model
// =====================

const User = mongoose.model("User", {
    name: String,
    email: String,
    phone: String,
    password: String,
    role: String
});


// =====================
// ADD STUDENT API
// =====================

app.post("/students", async (req, res) => {
    try {
        console.log("Student Data:", req.body);

        const student = new Student({
            name: req.body.name,
            roomNo: req.body.roomNo,
            email: req.body.email
        });

        await student.save();

        res.json({
            message: "Student Added Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error adding student"
        });
    }
});


// =====================
// VIEW STUDENTS API
// =====================

app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error loading students"
        });
    }
});
// =====================
// SIGNUP API
// =====================

app.post("/signup", async (req, res) => {
    try {

        console.log("Signup Data:", req.body);

        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            role: req.body.role
        });

        await user.save();

        res.status(201).json({
            message: "Registration Successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Registration Failed"
        });
    }
});


// =====================
// TEST API
// =====================

app.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT");
    res.send("TEST WORKING");
});
// =====================
// ADD ROOM API
// =====================

app.post("/rooms", async (req, res) => {
    try {

        console.log("Room Data:", req.body);

        const room = new Room({
            roomNumber: req.body.roomNumber,
            floorNumber: req.body.floorNumber,
            roomType: req.body.roomType,
            capacity: req.body.capacity,
            status: req.body.status
        });

        await room.save();

        res.status(201).json({
            message: "Room Added Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Adding Room"
        });
    }
});
// =====================
// VIEW ROOMS API
// =====================

app.get("/rooms", async (req, res) => {
    try {

        const rooms = await Room.find();

        res.json(rooms);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Loading Rooms"
        });
    }
});
// =====================
// DELETE ROOM API
// =====================

app.delete("/rooms/:id", async (req, res) => {
    try {

        await Room.findByIdAndDelete(req.params.id);

        res.json({
            message: "Room Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Deleting Room"
        });
    }
});
// =====================
// UPDATE ROOM API
// =====================

app.put("/rooms/:id", async (req, res) => {
    try {

        const room = await Room.findByIdAndUpdate(
            req.params.id,
            {
                roomNumber: req.body.roomNumber,
                floorNumber: req.body.floorNumber,
                roomType: req.body.roomType,
                capacity: req.body.capacity,
                status: req.body.status
            },
            { new: true }
        );

        res.json({
            message: "Room Updated Successfully",
            room
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Updating Room"
        });
    }
});
// =====================
// Home Page
// =====================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
// =====================
// ALLOCATE ROOM API
// =====================

app.post("/allocate-room", async (req, res) => {

    try {

        const allocation = new Allocation({

            studentName: req.body.studentName,

            roomNumber: req.body.roomNumber,

            remarks: req.body.remarks

        });

        await allocation.save();

        res.status(201).json({

            message: "Room Allocated Successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Allocation Failed"

        });

    }

});
// =====================
// VIEW ALLOCATIONS API
// =====================

app.get("/allocations", async (req, res) => {

    try {

        const allocations = await Allocation.find();

        res.json(allocations);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Error Loading Allocations"

        });

    }

});
// =====================
// CHANGE ROOM API
// =====================

app.put("/change-room/:id", async (req, res) => {

    try {

        await Allocation.findByIdAndUpdate(
            req.params.id,
            {
                roomNumber: req.body.roomNumber
            }
        );

        res.json({
            message: "Room Changed Successfully"
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            message: "Room Change Failed"
        });

    }

});
// =====================
// VACATE ROOM API
// =====================

app.put("/vacate-room/:id", async (req, res) => {

    try {

        await Allocation.findByIdAndUpdate(
            req.params.id,
            {
                status: "Vacated"
            }
        );

        res.json({
            message: "Room Vacated Successfully"
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            message: "Vacate Failed"
        });

    }

});
app.delete("/delete-allocation/:id", async (req, res) => {
    try {
        await Allocation.findByIdAndDelete(req.params.id);

        res.json({ message: "Deleted Successfully" });

    } catch (err) {
        console.log(err);

        res.status(500).json({ message: "Delete Failed" });
    }
});
// =====================
// ADD FEE API
// =====================

app.post("/fees", async (req, res) => {

    try {

        const fee = new Fee({

            studentName: req.body.studentName,
            roomNo: req.body.roomNo,
            feeType: req.body.feeType,
            amount: req.body.amount,
            dueDate: req.body.dueDate,
            status: req.body.status || "Pending"

        });

        await fee.save();

        res.status(201).json({
            message: "Fee Added Successfully"
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({
            message: "Error Adding Fee"
        });

    }

});
// =====================
// VIEW FEES API
// =====================

app.get("/fees", async (req, res) => {
    try {

        const fees = await Fee.find();

        res.json(fees);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Loading Fees"
        });

    }
});
// =====================
// RECORD PAYMENT API
// =====================

app.put("/fees/pay/:id", async (req, res) => {
    try {

        const receiptNo = "REC" + Date.now();

        const fee = await Fee.findByIdAndUpdate(
            req.params.id,
            {
                status: "Paid",
                paymentDate: new Date().toISOString().split("T")[0],
                receiptNumber: receiptNo
            },
            { new: true }
        );

        res.json({
            message: "Payment Recorded Successfully",
            fee
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Recording Payment"
        });

    }
});
// =====================
// DELETE FEE API
// =====================

app.delete("/fees/:id", async (req, res) => {
    try {

        await Fee.findByIdAndDelete(req.params.id);

        res.json({
            message: "Fee Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Deleting Fee"
        });

    }
});
app.get("/room-details/:studentName", async (req, res) => {
    try {
        const studentName = req.params.studentName;

        const allocation = await Allocation.findOne({
            studentName: studentName
        });

        if (!allocation) {
            return res.status(404).json({
                message: "No Room Allocated"
            });
        }

        const room = await Room.findOne({
            roomNumber: allocation.roomNumber
        });

        if (!room) {
            return res.status(404).json({
                message: "Room Not Found"
            });
        }

        res.json({
            studentName: allocation.studentName,
            roomNumber: room.roomNumber,
            floorNumber: room.floorNumber,
            roomType: room.roomType,
            status: allocation.status || "Allocated"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error Loading Room Details"
        });
    }
});
// =====================
// ADD MESS MENU API
// =====================

app.post("/mess", async (req, res) => {
    try {
        const mess = new Mess({
            day: req.body.day,
            breakfast: req.body.breakfast,
            lunch: req.body.lunch,
            dinner: req.body.dinner
        });

        await mess.save();

        res.status(201).json({
            message: "Mess Menu Added Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error Adding Menu"
        });
    }
});
// =====================
// VIEW MESS MENU API
// =====================

app.get("/mess", async (req, res) => {
    try {
        const menus = await Mess.find();

        res.json(menus);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error Loading Menu"
        });
    }
});
app.delete("/mess/:id", async (req, res) => {
    try {
        await Mess.findByIdAndDelete(req.params.id);

        res.json({
            message: "Menu Deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Delete Failed"
        });
    }
});
app.delete("/mess/:id", async (req, res) => {
    try {
        await Mess.findByIdAndDelete(req.params.id);

        res.json({
            message: "Menu Deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Delete Failed"
        });
    }
});
app.put("/mess/:id", async (req, res) => {
    try {
        await Mess.findByIdAndUpdate(
            req.params.id,
            {
                day: req.body.day,
                breakfast: req.body.breakfast,
                lunch: req.body.lunch,
                dinner: req.body.dinner
            }
        );

        res.json({
            message: "Menu Updated Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Update Failed"
        });
    }
});
// =====================
// Complaint Routes
// =====================

app.post("/complaints", async (req, res) => {
    console.log("POST complaint route HIT");

    try {
        const complaint = new Complaint({
            complaintTitle: req.body.complaintTitle,
            category: req.body.category,
            description: req.body.description,
            priority: req.body.priority
        });

        await complaint.save();

        res.status(201).json({
            message: "Complaint Created Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error Creating Complaint"
        });
    }
});

app.get("/complaints", async (req, res) => {
    console.log("GET complaint route HIT");

    try {
        const complaints = await Complaint.find();
        res.json(complaints);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error Loading Complaints"
        });
    }
});

app.put("/complaints/assign/:id", async (req, res) => {
    try {
        await Complaint.findByIdAndUpdate(req.params.id, {
            assignedTo: req.body.assignedTo,
            status: "Assigned"
        });

        res.json({ message: "Complaint Assigned Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Assignment Failed" });
    }
});

app.put("/complaints/status/:id", async (req, res) => {
    try {
        await Complaint.findByIdAndUpdate(req.params.id, {
            status: req.body.status
        });

        res.json({ message: "Status Updated Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Status Update Failed" });
    }
});

app.put("/complaints/close/:id", async (req, res) => {
    try {
        await Complaint.findByIdAndUpdate(req.params.id, {
            status: "Closed"
        });

        res.json({ message: "Complaint Closed Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Close Failed" });
    }
});
app.put("/complaints/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        await Complaint.findByIdAndUpdate(req.params.id, { status });

        res.json({ message: "Status updated successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/events", async (req, res) => {
    try {
        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            venue: req.body.venue
        });

        await event.save();

        res.status(201).json({
            message: "Event Created Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error Creating Event"
        });
    }
});
app.get("/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error Loading Events"
        });
    }
});
app.delete("/events/:id", async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);

        res.json({
            message: "Event Deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Delete Failed"
        });
    }
});

// Server Start// 
// =====================

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});