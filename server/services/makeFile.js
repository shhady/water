import fs from "fs";

const makeFiles = () => {
  // Retrieve the command-line arguments
  const args = process.argv.slice(2);

  // Check if a string argument is provided
  if (args.length > 0) {
    const fileName = args[0];

    // Create a new file with the provided name
    fs.writeFile("../" + "routes/" + fileName + ".Route.js", "", (err) => {
      if (err) {
        console.error("Error creating file:", err);
      } else {
        console.log("File created:", fileName);
      }
    });
    fs.writeFile(
      "../" + "controllers/" + fileName + ".Controller.js",
      "",
      (err) => {
        if (err) {
          console.error("Error creating file:", err);
        } else {
          console.log("File created:", fileName);
        }
      }
    );
    fs.writeFile("../" + "models/" + fileName + ".Model.js", "", (err) => {
      if (err) {
        console.error("Error creating file:", err);
      } else {
        console.log("File created:", fileName);
      }
    });
  } else {
    console.log("No input string provided.");
  }
};





