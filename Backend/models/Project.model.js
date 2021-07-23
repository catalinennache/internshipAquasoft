const mongoose = require('mongoose')


const plainSchema = {
    Project_name:{
        type:String,
        required: true
    },
    Start_date:{
        type:String,
        required: true
    },
    Planned_end_date:{
        type:String
    },
    Description:{
        type:String
    },
    Project_code:{
        type:String,
        required: true
    }
}
const ProjectSchema =  new mongoose.Schema(plainSchema)
const Project = mongoose.model('project', ProjectSchema)


module.exports = Project;