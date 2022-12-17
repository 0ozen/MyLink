import dbConnect from "../../utils/mongoose";
import Url from "../../models/link";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
	if (!req.body.link) return res.status(400).json("Please provide url");

	try {
		await dbConnect();

		const data = await Url.findOne({ urlOriginal: req.body.link });

		if (data) {
			data.shortUrl = nanoid(7);
			await data.save();
			return res.status(201).send(data.shortUrl);
		}

		const newUrl = await new Url({ urlOriginal: req.body.link });
		await newUrl.save();
		return res.status(201).send(newUrl.shortUrl);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send(error);
	}
}