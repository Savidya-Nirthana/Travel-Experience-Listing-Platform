import mongoose from "mongoose"

const experienceSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
        }
    }, 
    {
        timestamps: true,
    }
)

const experience = mongoose.model("Experience", experienceSchema)
export default experience