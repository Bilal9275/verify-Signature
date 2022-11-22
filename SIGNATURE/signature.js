var ethers = require('ethers')

async function getSignatureTest(contract, user) {
    contract = '0xa8c12578A6A509e58BeaF5265097Ae90b9a7BDCC' //  NFT contract Address
    user = '0xAD4f1d02ad3e819AD86D3eD27dfd13F31A19a09a'     //  User Address   

    const RPC = "https://api.baobab.klaytn.net:8651";
    const provider = new ethers.providers.JsonRpcProvider(RPC)
    const blockNumber = await provider.getBlockNumber(); 

    const nonce = (await provider.getBlock(blockNumber)).timestamp;
    console.log("nonce-timestamp:", nonce)

    let hash = ethers.utils.solidityKeccak256(["string", "string", "uint256"], [contract.toLowerCase(), user.toLowerCase(), nonce]);
    console.log("hash:", hash)

    let privateKey = "0x4b8da936e0fd9b76d7d12f60eedd12930e07087a69af7c0aefc6635d64820661"   //  SignerPrivateKey
    // 0x64f092A447626d6CF213d3498E9F3E30562fBD10   //  SignerPublicKey

    const signingKey = new ethers.utils.SigningKey(privateKey);
    let deployTx = signingKey.signDigest(hash);

    const signature = ethers.utils.joinSignature(deployTx);
    console.log("Signature:", signature);

}
getSignatureTest()
