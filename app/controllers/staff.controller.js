const path = require('path')
const Staff = require(path.join(__dirname, '../models/Staff'))

exports.createStaff = async(req,res) => {
    try {
        const { role, names, email, contact } = req.body;

        if( role === "" && names === "" && contact === "") {
            return res.status(404).json({message: 'All fields must be filled'})
        }

        const staff = new Staff({
            names,
            role,
            email,
            contact
        });

        await staff.save()

        res.status(201).json(staff)

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}


exports.getAllStaffMembers = async (req,res) => {
    try {
        const members = await Staff.find();
        if(members.length === 0) {
            return res.status(400).json({message: 'No employees found'})
        }
        res.status(200).json({message: members});
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
}

// Pagination controller function
exports.getStaff = async(req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;
        const total = await Staff.countDocuments();
        const totalPages =  Math.ceil(total / limit);

        const staff = await Staff.find().skip(skip).limit(limit);

        res.json({
            total,
            totalPages,
            currentPage: page,
            staff
        });
    }
    catch(error) {
        console.error("Error: ", error)
        res.status(500).json({error: 'An error occured while fetching staff'})
    }
}

exports.uploadProfilePicture = async(req,res) => {
    try {
        upload(req,res, async function(err) {
            if(err) {
                return res.status(400).json({message: err})
            }

            if(!req.file) {
                return res.status(400).json({message: 'No file selected'})
            }

            const { staffId } = req.params;
            const profilePicture = req.file.filename;

            await Staff.findByIdAndUpdate(userId, { profilePicture });
            res.status(200).json({message: 'Profile picture updated successfully'})
        })
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}
