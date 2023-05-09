import Cyber from "../Model/Cyber.Model.js";

// CyberProblem/addNew to create new Cyber
const createCyber = async (req, res) => {
    try {
        //const { P, T, v } = req.body;
        // const allowedValues = [
        //     "Spam attack",
        //     "Virus",
        //     "Blackmail",
        //     "DoS",
        //     "Phishing",
        //     "Authorization",
        // ];
        // const isValidValue = allowedValues.includes(req.body.v);

        // // Set S based on the validity of v
        // const S = isValidValue;
        // req.body.S = S;

        const cyber = new Cyber({
            ...req.body
        });
        switch (req.body.S) {
            case 0:
                cyber.m = "todo";
                break;
            case 1:
                cyber.m = "in progress";
                break;
            case 2:
                cyber.m = "done";
                break;

            default:
                cyber.m = "Error";
                break;
        }
        await cyber.save();

        res.status(201).json(cyber);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


//CyberProblem/getAllFiltering
const getAllCyberFiltering = async (req, res) => {
    try {
      const { status } = req.body;
      const query = status ? { S: parseInt(status) } : {};
  
      const cyber = (await Cyber.find(query)).filter(c=>c.S);
  
      res.status(200).json(cyber);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  


export { createCyber,getAllCyberFiltering };