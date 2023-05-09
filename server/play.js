import pict from "pict-pairwise-testing";

// model for a fictitious mortgage calculator application
const model = {
  parameters: [
    {
      property: "Cyber",
      values: [
        null,
        "Spam attack",
        "Virus",
        "Blackmail",
        "DoS",
        "Phishing",
        "Authorization",
      ],
    },
    {
      property: "Water pollution",
      values: [null, "Opacity", "Chlorination", "Acidity", "Conductivity"],
    },
  ],
};

let result = pict.pict(model);
let permutations = result.testCases;

permutations = permutations.filter(
  (perm) => perm.cyber != "" || perm.water_pollution != ""
);

const IT = permutations.filter((perm) => perm.water_pollution == "");
const maintain = permutations.filter((perm) => perm.cyber == "");
const redAlert = permutations.filter((perm) => {
  return perm.water_pollution != "" && perm.cyber != "";
});

console.log(IT);
console.log(maintain);
console.log(redAlert);
