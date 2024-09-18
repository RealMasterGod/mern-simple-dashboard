const mongoose = require('mongoose')
const ShortUniqueId = require('short-unique-id')

const ClientSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        index: true,
        default: function () {
            
            var name = this.clientName.split(' ')[0]
            var uid;
            if(name.length < 4) {
                uid = new ShortUniqueId({dictionary:'number',length: 8-name.length})
            }
            else {
                name = name.slice(0,4)
                uid = new ShortUniqueId({dictionary:'number',length: 4})
            }
            const id = uid.rnd()
            return `${name}${id}`
        }
    },
    clientName: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true,
        unique: true
    },
    receivedDate: {
        type: Date,
        required: true
    },
    inventoryReceived: {
        type: String,
        required: true
    },
    inventoryUpload: {
        type: String,
        default: ""
    },
    reportedIssues: {
        type: String
    },
    clientNotes: {
        type: String
    },
    assignedTechnician: {
        type: String,
        required: true
    },
    estimatedAmount: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.receivedDate
            },
            message: `deadline date can't be less than received date!`
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['in-progress','pending','complete']
    }
},{timestamps: true})

module.exports = mongoose.model('Client', ClientSchema)

