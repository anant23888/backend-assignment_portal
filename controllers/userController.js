const User = require('../models/User');
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.registerUser = (req, res) => {
    let {username, email, password} = req.body;
    
    User.find({username}).then( result => {
        if(result.length) {
            res.json({
                status: "Failed",
                message: "User with this email Already exits!"
            })
        }
        else {
            const salt = 10;
            bcrypt.hash(password, salt).then(hashedPassword => {
                const newUser = new User({
                    username,
                    email,
                    password: hashedPassword,
                    role: 'User'});

                newUser.save().then(result => {
                    res.status(400).json({
                        status: "Success",
                        message: "SignUp Successful!",
                        data: result,
                    });
                })
                .catch(err => {
                    res.json({
                        status: "Failed",
                        message: "An error occured while saving user!"
                    });
                })    

            })
            .catch(err => {
                res.json({
                    status: "Failed",
                    message: "An error occured while hashing password!"
                });
            })
        }
    }).catch( err => {
        console.log(err);
        res.json({
            status: "Failed",
            message: "An error occured while checking user!"
        }); 
    })
};

exports.loginUser = async(req, res) => {
    const {username, password} = req.body;
    try {
    const user = await User.findOne({username});
    console.log(user)
    if(!user || !(await user.comparePassword(password))) {
        return res.status(400).json({
            status: "Failed",
            error: 'Invalid credentials' 
        });
    }
    const token = jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    // localStorage.setItem('token', token);
    res.status(200).json({
        status: "Success",
        message: "Login successful!",
        token: token
    })
    } catch(err) {
       console.error("Error during login:", err);
       res.status(500).json({
          status: "Failed",
          message: "Login Failed",
       });
    }
};

exports.uploadAssignment = async(req, res) => {
    const { task, admin } = req.body;
    const userId = req.user.id;
    try {
        const adminUser = await User.findOne({ username: admin, role: 'Admin' });
        console.log(adminUser);
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const assignment = new Assignment({ userId, task, admin: admin});
        console.log(assignment)
        await assignment.save();
        res.status(201).json({ 
            message: 'Assignment uploaded successfully',
            assignment: assignment
         });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload assignment' });
    }
}

exports.getAllAdmins = async(req,res) => {
    try {
        const admins = await User.find({role: 'Admin'}, {username: 1, _id: 1});
        console.log(admins)
        res.status(200).json({
            status: "Success",
            admins
        })
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }

}

