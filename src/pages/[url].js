import Url from "../models/link";
import dbConnect from "../utils/mongoose";

export async function getServerSideProps(req, res) {
	try {
		const { url } = req.query;

		await dbConnect();
		const data = await Url.findOne({
			$or: [{ shortUrl: url }, { customUrl: url }],
		});

		if (data) {
			data.clicks ? (data.clicks += 1) : (data.clicks = 1);
			await data.save();
			return {
				redirect: {
					destination: data.urlOriginal,
					permanent: false,
				},
			};
		} else {
			return {
				props: { find: false  , message : "Url not Found" },
			};
		}
	} catch (error) {
		console.log(error.message);
		return {
			props: { find: false , message : "Server Error" },
		};
	}
}

export default function ShortIdPage({ find,message }) {
	return find ? <div>Redirect</div> : <div>{message}</div>;
}
