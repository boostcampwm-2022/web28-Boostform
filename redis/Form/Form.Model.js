import mongoose from "mongoose";
import { FormSchema } from "./Form.Schema";

const Form = mongoose.model("Form", FormSchema);

export default Form;
