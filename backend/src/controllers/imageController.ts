import { Request, Response } from "express";
import { MongoClient, GridFSBucket } from "mongodb";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: "mongodb+srv://shashankrana316:1234@ticketdb.6ejh54s.mongodb.net/?retryWrites=true&w=majority",
  file: (req, file) => {
    //If it is an image, save to photos bucket
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "photos",
        filename: `${Date.now()}_${file.originalname}`,
      };
    } else {
      //Otherwise save to default bucket
      return `${Date.now()}_${file.originalname}`;
    }
  },
});

const upload = multer({ storage }).single("file");

export const uploadAvatar = async (req: Request, res: Response) => {
  upload(req, res, (err) => {
    const file = req.file;

    res.send({
      message: "Uploaded",
      //@ts-ignore
      id: file?.id,
      name: file?.filename,
      //@ts-ignore
      contentType: file?.contentType,
    });
  });
};
const mongoClient = new MongoClient(
  "mongodb+srv://shashankrana316:1234@ticketdb.6ejh54s.mongodb.net/?retryWrites=true&w=majority",
);

export const getAllImages = async (req: Request, res: Response) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db("test");
    const images = database.collection("photos.files");
    const cursor = images.find({});
    const count = await cursor.count();
    if (count === 0) {
      return res.status(404).send({
        message: "Error: No Images found",
      });
    }

    const allImages: any = [];

    await cursor.forEach((item) => {
      allImages.push(item);
    });

    res.send({ files: allImages });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Something went wrong",
      error,
    });
  }
};

export const getImageByFilename = async (req: Request, res: Response) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db("test");

    const imageBucket = new GridFSBucket(database, {
      bucketName: "photos",
    });

    let downloadStream = imageBucket.openDownloadStreamByName(
      req.params.filename,
    );

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (data) {
      return res.status(404).send({ error: "Image not found" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Something went wrong",
      error,
    });
  }
};
