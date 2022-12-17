import dbConnect from "../../utils/mongoose";
import Url from "../../models/link";

export default async function handler(req, res) {
	try {
		await dbConnect();

		const data = await Url.findOne({ urlOriginal: req.body.link });

		if (data) {
			data.customUrl = req.body.edit;
			await data.save();
			return res.status(201).send(data.customUrl);
		}

		const newUrl = await new Url({ urlOriginal: req.body.link });
		newUrl.customUrl = req.body.edit;

		await newUrl.save();

		return res.status(201).send(newUrl.customUrl);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send(error);
	}
}
