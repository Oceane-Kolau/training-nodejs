import os from "os";

// This script will print the current operating system's uptime in days, hours, and minutes
// It uses the os module to get the uptime of the computer
const computerUpTime = os.uptime();
// Calculate the uptime in days, hours, and minutes
// The uptime is in seconds, so we need to convert it to days, hours, and minutes
const days = Math.floor(computerUpTime / (24 * 60 * 60));
const hours = Math.floor((computerUpTime % (24 * 60 * 60)) / (60 * 60));
const minutes = Math.floor((computerUpTime % (60 * 60)) / 60);
console.log(
  `The computer has been running for ${days} days, ${hours} hours, and ${minutes} minutes.`
);


// This script will read the contents of a JSON file and print it to the console
// It uses the readFileSync method from the fs module to read the file async after 5 seconds delay
const logFile = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const filePath = new URL("./data/pokedex.json", import.meta.url);
      const contents = await readFile(filePath, { encoding: "utf8" });

      // Add a 5-second delay
      setTimeout(() => {
        console.log("Contents of pokedex.json:", contents);
        resolve(contents);
      }, 5000);
    } catch (err) {
      console.error("Error reading pokedex.json:", err.message);
      reject(err);
    }
  });
};

// Call the function
logFile()
  .then((data) => {
    console.log("Pokemon", data);
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });