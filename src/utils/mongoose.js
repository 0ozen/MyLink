import { connect } from "mongoose";

const conStatus = {};

export default async function dbConnect() {
	if (conStatus.isConnected) {
		console.log("connect");
		return;
	}
	const db = await connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	conStatus.isConnected = db.connections[0].readyState;
}
