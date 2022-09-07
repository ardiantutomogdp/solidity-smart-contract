import { ethers } from "ethers";
import { getEnv } from "../hardhat.config";

const contract = require("../artifacts/contracts/HutangV2.sol/HutangV2.json");
const proxyAddress = "0x850f209BFcd313ce7CC5bB8835007886ac0981D3";
const alchemyProvider = new ethers.providers.AlchemyProvider(
  "goerli",
  getEnv("PROVIDER_API_KEY")
);

async function main() {
  const creditorSigner = new ethers.Wallet(
    getEnv("PRIVATE_KEY"),
    alchemyProvider
  );
  const creditor = new ethers.Contract(
    proxyAddress,
    contract.abi,
    creditorSigner
  );

  const debtorSigner = new ethers.Wallet(
    getEnv("DEBTOR_PRIVATE_KEY"),
    alchemyProvider
  );
  const debtor = new ethers.Contract(proxyAddress, contract.abi, debtorSigner);

  let id = ethers.BigNumber.from(await creditor.totalLoans()).toNumber();
  console.log(
    "id: " + ethers.BigNumber.from(await creditor.totalLoans()).toNumber()
  );
  console.log("------------------------------");
  console.log("Creditor: " + (await creditorSigner.getAddress()));
  console.log("Debtor: " + (await debtorSigner.getAddress()));
  console.log("------------------------------");
  console.log("Creditor memberi hutang");
  const create = await creditor.createLoan(
    "0x1d4a228efE6DB704Aff0Ec997F5E7912D74ce5af"
  );
  await create.wait();
  let loanData = await creditor.getLoan(id);
  console.log(loanData);
  console.log("------------------------------");

  console.log("------------------------------");
  console.log("Debtor approve");
  const approveLoan = await debtor.approveLoan(id);
  await approveLoan.wait();
  loanData = await debtor.getLoan(id);
  console.log(loanData);
  console.log("------------------------------");

  console.log("------------------------------");
  console.log("Creditor cancel utang");
  const cancelLoan = await creditor.cancelLoan(id);
  await cancelLoan.wait();
  loanData = await creditor.getLoan(id);
  console.log(loanData);
  console.log("------------------------------");

  console.log("------------------------------");
  console.log("Debtor upload bukti bayar (will break because of cancelation)");
  const updateURI = await debtor.updateAttachmentURI(id, "google.com");
  await updateURI.wait();
  loanData = await debtor.getLoan(id);
  console.log(loanData);
  console.log("------------------------------");

  console.log("------------------------------");
  console.log("Creditor finalize utang");
  const finalizeLoan = await creditor.finalizeLoan(id);
  await finalizeLoan.wait();
  loanData = await creditor.getLoan(id);
  console.log(loanData);
  console.log("------------------------------");
}
main();
