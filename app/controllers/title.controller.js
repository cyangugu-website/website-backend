const Title = require('../models/title')

exports.createTitle = async (req, res) => {
    try {
        const { name } = req.body;

        if (name === "") {
            return res.status(400).json({ message: 'Title name can not be empty' });
        }

        var title = await Title.findOne({ name })

        if (title) {
            return res.status(400).json({ message: 'Title already exists' })
        }

        await title.save();
        
        return res.status(201).json({message: 'Title created successfully'})
    }
    catch (err) {
        consolor.error(err.message)
        res.status(500).send('Server error')
    }
}

exports.getAllTitles = async(req,res) => {
    try {
        const titles = await Title.find();
        res.status(200).json(titles);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
}

exports.getTitleById = async(req,res) => {
    try {
        const title = await Title.findById(req.params.id);
        if(!title) {
            return res.status(404).json({message: 'Title not found'})
        }

        res.status(200).json(title);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.updateTitle = async(req,res) => {
    try {
        const { name } = req.body;
        const title = await Title.findOneAndUpdate(req.params.id, { name}, {new: true});
        if(!title) {
            return res.status(404).json({message:'Title not found'})
        }

        res.status(200).json({message: 'Title updated successfully', title});
    }
    catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

exports.deleteTitle = async(req,res) => {
    try {
        const title = await Title.findByIdAndDelete(req.params.id);

        if(!title) {
            return res.status(404).json({message: 'Title not found'})
        }

        res.status(200).json({message: 'Title deleted successfully', title})
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}