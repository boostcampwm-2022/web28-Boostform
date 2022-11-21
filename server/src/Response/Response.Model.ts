import mongoose from "mongoose";
import { ResponseSchema } from "./Response.Schema";

const SurveyResponse = mongoose.model("Response", ResponseSchema);

export default SurveyResponse;
