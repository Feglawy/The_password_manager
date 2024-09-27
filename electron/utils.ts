import path = require("path");
import fs = require("fs");
import { dialog } from "electron";
import { userDataPath } from "./db/config";

export const openImageFileDialog = async () => {
	const result = await dialog.showOpenDialog({
		filters: [
			{ name: "Images", extensions: ["jpg", "jpeg", "png", "gif", "bmp"] },
		],
		properties: ["openFile"],
	});

	return result.filePaths.length > 0 ? result.filePaths[0] : null;
};

export const openCsvFileDialog = async () => {
	const result = await dialog.showOpenDialog({
		filters: [{ name: "Csv", extensions: ["csv"] }],
		properties: ["openFile"],
	});
	return result.filePaths.length > 0 ? result.filePaths[0] : null;
};

export const openDirPathDialog = async () => {
	const result = await dialog.showOpenDialog({
		properties: ["openDirectory"],
	});
	return result.filePaths.length > 0 ? result.filePaths[0] : null;
};

export const saveImage = (filePath: string) => {
	try {
		// Construct the destination folder relative to the current working directory
		const destinationFolder = path.join(userDataPath, "website_icons");

		// Extract the file name from the file path
		const fileName = path.basename(filePath);
		// Create the destination path
		const destPath = path.join(destinationFolder, fileName);

		// Ensure the destination folder exists, or create it
		if (!fs.existsSync(destinationFolder)) {
			fs.mkdirSync(destinationFolder, { recursive: true });
		}

		// Copy the image file to the destination folder
		fs.copyFileSync(filePath, destPath);

		console.log(`Image saved successfully to ${destPath}`);

		// Return the destination path
		return destPath;
	} catch (error) {
		console.error("Error saving image:", error);
		return null;
	}
};

export const fetchWebsiteIcon = (
	hostname: string,
	savePath: string
): Promise<void> => {
	return new Promise((resolve, reject) => {
		const request = require("request");
		const options = {
			method: "GET",
			url: `https://logo.clearbit.com/${hostname}?format=png&size=200`,
			headers: {},
		};

		request(options)
			.on(
				"response",
				(response: {
					statusCode: number;
					pipe: (arg0: fs.WriteStream) => void;
				}) => {
					if (response.statusCode === 200) {
						// Create a writable stream to save the image
						const fileStream = fs.createWriteStream(savePath);
						response.pipe(fileStream);

						// Resolve the promise when the file is finished writing
						fileStream.on("finish", () => {
							fileStream.close();
							resolve();
						});
					} else {
						reject(new Error(`Error fetching icon: ${response.statusCode}`));
					}
				}
			)
			.on("error", (err: any) => {
				reject(err);
			});
	});
};
