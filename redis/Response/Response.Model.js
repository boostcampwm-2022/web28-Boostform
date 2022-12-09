import mongoose from "mongoose";
import { ResponseSchema } from "./Response.Schema.js";

const FormResponse = mongoose.model("Response", ResponseSchema);

export default FormResponse;
