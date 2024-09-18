import path from "node:path";
import fs from "fs";
import { dialog } from "electron";

export const openImageFileDialog = async () => {
	const result = await dialog.showOpenDialog({
		filters: [
			{ name: "Images", extensions: ["jpg", "jpeg", "png", "gif", "bmp"] },
		],
		properties: ["openFile"],
	});

	if (result.canceled) {
		return null;
	}
	return result.filePaths[0];
};

export const saveImage = (filePath: string, destinationFolder: string) => {
	const fileName = path.basename(filePath);
	const destPath = path.join(destinationFolder, fileName);

	// Copy the file to the assets/website-icons folder
	fs.copyFileSync(filePath, destPath);

	return destPath;
};
