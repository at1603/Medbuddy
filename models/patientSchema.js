var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
    handler: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: String,
    },
    // prescription: {
        //     type: [{
        //         relDoc: { type: String, default: null },
        //         presc: {
        //             docName: String,
        //             patName: String,
        //             disease: [String],
        //             medicines: [{
        //                 medicineName: String,
        //                 power: String,
        //                 dosage: String,
        //             }, ],
        //             test: [String],
        //             comment: String,
        //         },
        //     }, ],
        //     default: () => {
        //         return null;
        //     },
        // },
    //  curDoc: [String], //Currently appointed doctors.
    disease: [{
        relDoc: { type: String, default: null },
        diseaseName: { type: String, default: null },
    }, ]
});

module.exports = mongoose.model("Patient", patientSchema);