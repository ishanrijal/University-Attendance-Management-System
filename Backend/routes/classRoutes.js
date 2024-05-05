const router = require('express').Router()
const ClassModel = require('../models/class')


router.route('/')
    .post(async function (req, res) {
        try{
            const {name, description, teacherId, students, totLec, colour} = req.body 

            if(!name || !description || !teacherId || !students || !totLec || !colour){
                return res.status(400).send({
                    message: "name, description, teacherId, students, totLec, colour is required"
                })
            }

            const cls = await ClassModel.create(
                {
                    name,
                    description,
                    owner: teacherId,
                    students,
                    totLec,
                    colour
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
    })

module.exports = router