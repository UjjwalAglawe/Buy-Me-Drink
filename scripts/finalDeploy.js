const hre = require("hardhat");

//now this is only deploy script
async function main() {
    
    const chai= await hre.ethers.getContractFactory("chai");
    const contract=await chai.deploy(); //instance of contracts
  
    await contract.deployed(); //instance ko deploy kiya
  
    console.log("Address of contracts ",contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  