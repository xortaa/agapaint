import { Schema, model, models } from "mongoose";

const ExcludedDatesSchema = new Schema({
  dates: {
    type: [Date],
    required: true,
  },
});

const ExcludedDates = models.ExcludedDates || model("ExcludedDates", ExcludedDatesSchema);
export default ExcludedDates;
