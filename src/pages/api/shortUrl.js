import dbConnect from '../../utils/mongoose';
import Url from '../../models/link';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  let link = req.body.link;

  if (link.search(/^http[s]?\:\/\//) == -1) {
    link = 'https://' + link;
  }

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  if (!isValidUrl(link)) return res.status(400).json('Ingrese una url valida');

  try {
    await dbConnect();

    const data = await Url.findOne({ urlOriginal: link });

    if (data) {
      data.shortUrl = nanoid(7);
      await data.save();
      return res.status(201).send(data.shortUrl);
    }

    const newUrl = await new Url({ urlOriginal: link });
    await newUrl.save();
    return res.status(201).send(newUrl.shortUrl);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
}
