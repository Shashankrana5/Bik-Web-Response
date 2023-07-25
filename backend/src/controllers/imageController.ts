import { Request, Response } from "express";
import { MongoClient, GridFSBucket } from "mongodb";

const mongoClient = new MongoClient("mongodb+srv://shashankrana316:1234@ticketdb.6ejh54s.mongodb.net/?retryWrites=true&w=majority");


export const uploadAvatar = async(req: Request, res: Response) => {
    const file = req.file;
    
    res.send({
        message: "Uploaded",
        //@ts-ignore
        id: file?.id,
        name: file?.filename,
        //@ts-ignore
        contentType: file?.contentType,
      })
}

export const getAllImages = async(req: Request, res: Response) => {
    try {
        await mongoClient.connect()
    
        const database = mongoClient.db("test")
        const images = database.collection("photos.files")
        const cursor = images.find({})
        const count = await cursor.count()
        if (count === 0) {
          return res.status(404).send({
            message: "Error: No Images found",
          })
        }
    
        const allImages:any = []
    
        await cursor.forEach(item => {
          allImages.push(item)
        })
    
        res.send({ files: allImages })
      } catch (error) {
        console.log(error)
        res.status(500).send({
          message: "Error Something went wrong",
          error,
        })
      }
}

export const getImageByFilename = async(req: Request, res: Response) => {
    try {
        await mongoClient.connect()
    
        const database = mongoClient.db("test")
    
        const imageBucket = new GridFSBucket(database, {
          bucketName: "photos",
        })
    
        let downloadStream = imageBucket.openDownloadStreamByName(
          req.params.filename
        )
    
        downloadStream.on("data", function (data) {
          return res.status(200).write(data)
        })
    
        downloadStream.on("error", function (data) {
          return res.status(404).send({ error: "Image not found" })
        })
    
        downloadStream.on("end", () => {
          return res.end()
        })
      } catch (error) {
        console.log(error)
        res.status(500).send({
          message: "Error Something went wrong",
          error,
        })
      }
}