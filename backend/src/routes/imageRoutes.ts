import { Express } from "express";
import {
  getAllImages,
  getImageByFilename,
  getImageById,
  getImageByUserEmail,
  getImagesByTicketContent,
  uploadAvatar,
} from "../controllers/imageController";

export default function imageRoutes(app: Express) {
  app.post("/api/image/uploadavatar", uploadAvatar);
  app.get("/api/image/getallimages", getAllImages);
  app.get("/api/image/getbyfilename/:filename", getImageByFilename);
  app.get("/api/image/getbyid/:_id", getImageById);
  app.get("/api/image/getbyuseremail/:email", getImageByUserEmail);
  app.post("/api/image/getbyticketcontent/", getImagesByTicketContent);
}
