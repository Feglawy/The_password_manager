import path = require("path");
import fs = require("fs");
import { dialog } from "electron";
import { userDataPath } from "./db/config";
// import request from "request-promise-native";

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

// export const fetchWebsiteIcon = (callback: Buffer, hostname: string) => {
// 	const options = {
// 		method: "GET",
// 		url: `https://logo.clearbit.com/${hostname}?format=png&size=200`,
// 		encoding: null, // Important to handle binary data (PNG)
// 	};

// 	request(options, function (error, response, body) {
// 		if (error) {
// 			throw new Error(error);
// 		}
// 		// Call the callback with the body (image buffer) once the request is complete
// 		callback(body);
// 	});
// };

// // Function to convert Buffer to Base64
// export const previewImageBase64 = (imageBuffer: Buffer): string => {
// 	return `data:image/png;base64,${imageBuffer.toString("base64")}`;
// };

// // Function to save the image to a file
// export const saveImageToFile = (
// 	imageBuffer: Buffer,
// 	filePath: string
// ): Promise<void> => {
// 	return new Promise((resolve, reject) => {
// 		fs.writeFile(filePath, imageBuffer, (err) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve();
// 			}
// 		});
// 	});
// };
