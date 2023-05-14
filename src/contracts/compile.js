const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "test", "musicnft.sol");
const contractSource = fs.readFileSync(contractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "musicnft.sol": {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

var contracts = output.contracts['musicnft.sol'];

if (contracts === undefined) {
  console.error("Contract compilation failed. Please check your Solidity source code.");
  process.exit(1);
}

for (let contractFileName in contracts) {
  const contractName = contractFileName.replace(".sol", "");
  const contract = contracts[contractFileName];
  const contractAbi = contract.abi;
  const contractBytecode = contract.evm.bytecode.object;

  fs.writeFileSync(
    path.resolve(__dirname, `${contractName}.json`),
    JSON.stringify({
      abi: contractAbi,
      bytecode: contractBytecode,
    })
  );
}

console.log("Contract compiled successfully.");
