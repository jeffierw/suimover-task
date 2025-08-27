import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { fromBase64 } from "@mysten/sui/utils";

// ============= Constants Configuration =============
// Hint: You need to specify the network, contract package, module, function, and arguments
const CONFIG = {
  // Network configuration
  NETWORK: "testnet",
  CONTRACT: {
    // This is a dice rolling contract on testnet
    // You can use this contract to test your implementation
    PACKAGE:
      "0xc0e57ef52ab1397e204ad10830c140e0a0852e8b560f9f6f960c9e32ccb90940",
    MODULE: "dice",
    FUNCTION: "roll",
    ARGUMENTS: {
      // The dice contract takes two objects as input:
      // 1. A dice object
      // 2. A random object
      DICE_OBJECT:
        "0x1860e9758c38555dde4eec45abec6e269ab43ffcd392611abb5d399835b5364f",
      RANDOM: "0x8",
    },
  },
} as const;

// Note: This contract is a dice rolling contract
// The function signature is: entry fun roll(dice: &mut Dice, random: &mut Random, ctx: &mut TxContext)
// You can find the contract on Sui Explorer: https://testnet.suivision.xyz/package/0xc0e57ef52ab1397e204ad10830c140e0a0852e8b560f9f6f960c9e32ccb90940

// ============= Type Definitions =============
interface TransactionOutput {
  txBytes: string;
  signature: string;
}

// ============= Client and Keypair Initialization =============
// Hint: Use getFullnodeUrl with the network from CONFIG
const client = new SuiClient({
  url: getFullnodeUrl(CONFIG.NETWORK),
});

// TODO: Initialize keypairs for sender and sponsor
// Hint: Use Ed25519Keypair.fromSecretKey with environment variables
const sender: Ed25519Keypair = Ed25519Keypair.fromSecretKey(
  process.env.SENDER_PRIVATE_KEY!
);
const sponsor: Ed25519Keypair = Ed25519Keypair.fromSecretKey(
  process.env.SPONSOR_PRIVATE_KEY!
);

// ============= Transaction Building =============
const createSponsorTx = async (): Promise<string> => {
  // TODO: Create a new transaction
  const tx = new Transaction();

  // TODO: Add move call to your contract
  // Hint: Use tx.moveCall with your contract configuration
  tx.moveCall({
    target: `${CONFIG.CONTRACT.PACKAGE}::${CONFIG.CONTRACT.MODULE}::${CONFIG.CONTRACT.FUNCTION}`,
    typeArguments: [],
    arguments: [
      tx.object(CONFIG.CONTRACT.ARGUMENTS.DICE_OBJECT),
      tx.object(CONFIG.CONTRACT.ARGUMENTS.RANDOM),
    ],
  });

  // TODO: Build and return the transaction
  // Hint: Use tx.build with client and onlyTransactionKind option
  const bytes = await tx.build({ client, onlyTransactionKind: true });
  return Buffer.from(bytes).toString("base64"); // TODO: Replace with actual transaction bytes
};

// ============= Signature Handling =============
const sponsorSignTx = async (
  txBytesB64: string
): Promise<TransactionOutput> => {
  // TODO: Create transaction from bytes and set sender
  const txBytes = new Uint8Array(Buffer.from(txBytesB64, "base64"));
  const tx = Transaction.fromKind(txBytes);
  tx.setSender(sender.getPublicKey().toSuiAddress());

  // TODO: Get sponsor's coins for gas payment
  // Hint: You can either:
  // 1. Use client.getCoins to get all coins and select the first one (index 0)
  // 2. Use client.getObject to get a specific coin by its ID
  const sponsorAddress = sponsor.getPublicKey().toSuiAddress();
  const coins = await client.getCoins({ owner: sponsorAddress });

  // TODO: Check if sponsor has enough coins
  // Hint: Add error handling for insufficient gas
  if (coins.data.length === 0) {
    throw new Error("Sponsor has no coins");
  }
  const coin = coins.data[0];
  // TODO: Set gas owner and gas payment
  // Hint: Use tx.setGasOwner and tx.setGasPayment
  tx.setGasOwner(sponsorAddress);
  tx.setGasPayment([
    {
      objectId: coin.coinObjectId,
      version: coin.version,
      digest: coin.digest,
    },
  ]);
  // TODO: Sign the transaction
  // Hint: Use tx.sign with sponsor keypair
  const fullBytes = await tx.build({ client });
  const signature = await tx.sign({ signer: sponsor, client });

  // TODO: Return signature and transaction bytes
  return {
    txBytes: Buffer.from(fullBytes).toString("base64"),
    signature: signature.signature,
  };
};

const senderSignTx = async (fullTxB64: string): Promise<TransactionOutput> => {
  // TODO: Sign the transaction with sender's keypair
  // Hint: Use sender.signTransaction
  const uint8TxBytes = new Uint8Array(Buffer.from(fullTxB64, "base64"));
  const signature = await sender.signTransaction(uint8TxBytes);
  return {
    txBytes: fullTxB64,
    signature: signature.signature,
  };
};

// ============= Transaction Execution =============
const executeTransaction = async (
  txBytes: string,
  sponsorSignature: string,
  senderSignature: string
): Promise<void> => {
  // TODO: Execute the transaction
  // Hint: Use client.executeTransactionBlock
  await client.executeTransactionBlock({
    transactionBlock: txBytes,
    signature: [sponsorSignature, senderSignature],
  });
};

// ============= Main Function =============
const main = async (): Promise<void> => {
  try {
    // TODO: Implement the main transaction flow
    // 1. Create transaction
    const txBytes = await createSponsorTx();
    // 2. Get sponsor signature
    const sponsorSignature = await sponsorSignTx(txBytes);
    // 3. Get sender signature
    const senderSignature = await senderSignTx(sponsorSignature.txBytes);
    // 4. Execute transaction
    const result = await executeTransaction(
      sponsorSignature.txBytes,
      sponsorSignature.signature,
      senderSignature.signature
    );
    console.log("Transaction result:", result);
    // Hint: Follow the sequence of steps and handle errors appropriately
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};

// Execute main function
main().catch(console.error);
