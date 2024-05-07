const ClassModel = require('../models/class');

exports.getModuleList = async (req, res) => {
    try {
        const classes = await ClassModel.find();
        res.status(200).json(classes);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch classes' });
      }
}
exports.getSelectedModuleList = async (req, res) => {
    const classId =req.query.classId
    try {
        const classes = await ClassModel.findById(classId);
        res.status(200).json({moduleName:classes.name});
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch classes' });
      }
}

exports.createModule = async (req, res) => {
    try{
        const { name, description, teacherId } = req.body 

        if( !name || !description || !teacherId ){
            return res.status(400).send({
                message: "name, description, owner, teacherId is required"
            })
        }

        const cls = await ClassModel.create(
            {
                name,
                description,
                owner: teacherId,
                classCode : generateModuleCode()
            }
        )

        res.status(201).send({
            class: cls,
            message: "Class created successfully!"
        })
    }catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tutorial."
        })
    }
}

const generateModuleCode = () => {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  