import { Schema, model, models } from "mongoose";
const logSchema = new Schema({
    material: { 
        type: Schema.Types.ObjectId, 
        ref: 'Material' 
    },
    transactionType: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    notes: { 
        type: String 
    },
    updateDate: { 
        type: Date, 
        default: Date.now,
        required: true
    },
    updatedBy: { 
        type: String,
        required: true
    },
    isArchived: { 
        type: Boolean, 
        default: false 
    }
});

const Log = models.Log || model('Log', logSchema);
export default Log;