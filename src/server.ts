import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  const app = express();

  const port = process.env.PORT || 8082;

  app.use(bodyParser.json());

  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get("/filteredimage", async ( req, res ) => {
    const image_url:string = req.query.image_url;

    if (!image_url) {
      res.send("not image url provided")
    }

    const filteredImageLocalUrl:string = await filterImageFromURL(image_url);
      res.sendFile(filteredImageLocalUrl, () => {
        fs.unlinkSync(filteredImageLocalUrl)
      });
  });

  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
