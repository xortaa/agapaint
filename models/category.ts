import { Schema, model, models } from "mongoose";
//Imports the Schema and model components from the Mongoose library

const CategorySchema = new Schema({
  name: {
    //attributes of category
    type: String, //propeties of the attributes, string
    unique: true, //unique -> no repeat allowed
    required: true, // required
  },
});

const Category = models.Category || model("Category", CategorySchema);
//Uses the model function to create a Mongoose model
// for the MongoDB collection named "Category." The model is named
// Category, and it is based on the CategorySchema that was defined earlier.
export default Category;
//Exports the Category model as the default export from the module, making it accessible for use in other parts of the application.
