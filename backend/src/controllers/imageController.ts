import { Request, Response } from "express";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import User from "../models/User";
import * as dotenv from 'dotenv';
dotenv.config();


const mongoClient = new MongoClient(
  process.env.MONGO_URI!,
);
mongoClient.connect()
const storage = new GridFsStorage({
  url: process.env.MONGO_URI!,
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
  
  upload(req, res, async(err) => {
    const clientId = req.body.clientId;
    const file = req.file;

    const user = await User.findOne({_id: clientId});
    await mongoClient.connect();

    if(user && user.avatarId){
      const database = mongoClient.db("test");
      const imageBucket = new GridFSBucket(database, {
      bucketName: "photos",
    });
      await imageBucket.delete(new ObjectId(user.avatarId));

    }
    if(user && file) {
      await User.findOneAndUpdate({_id: user._id}, 
      // @ts-ignore
      {avatarId: file.id})

    }

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

export const getImageById = async(req: Request, res: Response) => {

  try {
    // await mongoClient.connect()
    const database = mongoClient.db("test");
    const imageBucket = new GridFSBucket(database, {
      bucketName: "photos",
    });

    let downloadStream = imageBucket.openDownloadStream(
        new ObjectId(req.params._id)
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
  
}