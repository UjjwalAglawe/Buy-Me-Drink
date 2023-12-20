// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

//to check if contract working or not
async function main() {
  const [owner,from1,from2,from3]=await hre.ethers.getSigner();
  const chai= await hre.ethers.getContractFactory("chai");
  const contract=await chai.deploy(); //instance of contracts

  await contract.deployed(); //instance ko deploy kiya

  console.log("Address of contracts ",contract.address);

  const addresses=[owner.address,from1.address];
  console.log("Before buying chai");
  await consoleBalence(addresses);

  const amount={value:hre.ethers.utils.parseEther("1")}
  await contract.connect(from1).buyChai("From1","Very nice chai",amount); //from1 ke address se buy chai ko call karre hai
  await contract.connect(from2).buyChai("From2","Very nice c",amount);
  await contract.connect(from3).buyChai("From3","Very nice Info",amount);

  console.log("After buying chai");
  await consoleBalence(addresses);
}

async function main(){
  async function getBalances(address){
    const balenceBigInt=await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balenceBigInt);
  }

  async function consoleBalence(addresses){
    let counter=0;
    for(const address of addresses)
    {
      console.log(`Address ${counter} balence:`,await getBalances(address))
    }
  }

  async function consoleMemos(memos){
  for(const memo of memos)
  {
    const timestamp=memo.timestamp;
    const name=memo.name;
    const from=memo.address;
    const message=memo.message;
    console.log(`At ${timestamp}, name ${name}, address ${from}, message ${message}`);
  }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
