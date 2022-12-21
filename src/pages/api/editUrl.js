import dbConnect from "../../utils/mongoose";
import Url from "../../models/link";

export default async function handler(req, res) {
	if (req.body.link === "")
		return res.status(400).json("Ingrese una url valida");

	try {
		await dbConnect();
		let link = req.body.link;
		if (link.search(/^http[s]?\:\/\//) == -1) {
			link = "https://" + link;
		}
		const data = await Url.findOne({ urlOriginal: link });

		if (data) {
			data.customUrl = req.body.edit;
			await data.save();
			return res.status(201).send(data.customUrl);
		}

		const newUrl = await new Url({ urlOriginal: link });
		newUrl.customUrl = req.body.edit;

		await newUrl.save();

		return res.status(201).send(newUrl.customUrl);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send(error);
	}
}
