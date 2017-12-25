import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
    {
        Name: String,
        Age: Number
    },
    { collection: 'Users', versionKey: false },
)