import path = require("path");
import fs = require("fs");
import { dialog } from "electron";

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
		const destinationFolder = path.join(
			__dirname,
			"..",
			"public",
			"website_icons"
		);

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
