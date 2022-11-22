import mongoose from "mongoose";
import { ResponseSchema } from "./Response.Schema";

const FormResponse = mongoose.model("Response", ResponseSchema);

export default FormResponse;
