import fs from "fs";

const readTemplate = (templateName, fileName) => {
  try {
    const data = fs.readFileSync(templateName, "utf8");
    return data.split(">Name<").join(fileName);
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
};

const makeFiles = () => {
  // Retrieve the command-line arguments
  const args = process.argv.slice(2);

  // Check if a string argument is provided
  if (args.length > 0) {
    const fileName = args[0];

    // Create a new file with the provided name
    fs.writeFile(
      "../" + "routes/" + fileName + ".Route.js",
      readTemplate("routeTemplate.txt", fileName),
      (err) => {
        if (err) {
          console.error("Error creating file:", err);
        } else {
          console.log("File created:", fileName);
        }
      }
    );
    fs.writeFile(
      "../" + "controllers/" + fileName + ".Controller.js",
      readTemplate("controllerTemplate.txt", fileName),
      (err) => {
        if (err) {
          console.error("Error creating file:", err);
        } else {
          console.log("File created:", fileName);
        }
      }
    );
    fs.writeFile(
      "../" + "models/" + fileName + ".Model.js",
      readTemplate("modelTemplate.txt", fileName),
      (err) => {
        if (err) {
          console.error("Error creating file:", err);
        } else {
          console.log("File created:", fileName);
        }
      }
    );
  } else {
    console.log("No input string provided.");
  }
};

makeFiles();
