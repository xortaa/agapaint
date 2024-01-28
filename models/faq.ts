import { Schema, model, models } from "mongoose";

const faqSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const Faq = models.Faq || model("Faq", faqSchema);

export default Faq;
