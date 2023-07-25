import { Express } from "express";
import { getAllImages, getImageByFilename, uploadAvatar } from "../controllers/imageController";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const url = process.env.MONGO_URI!

const storage = new GridFsStorage({
  url: "mongodb+srv://shashankrana316:1234@ticketdb.6ejh54s.mongodb.net/?retryWrites=true&w=majority",
  file: (req, file) => {
    //If it is an image, save to photos bucket
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "photos",
        filename: `${Date.now()}_${file.originalname}`,
      }
    } else {
      //Otherwise save to default bucket
      return `${Date.now()}_${file.originalname}`
    }
  },
})

const upload = multer({ storage })

export default function imageRoutes(app: Express) {
  app.post("/api/image/uploadavatar", upload.single("avatar"),uploadAvatar);
  app.get("/api/image/getallimages", getAllImages);
  app.get("/api/image/getbyfilename/:filename", getImageByFilename)
}
