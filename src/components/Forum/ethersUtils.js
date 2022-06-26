import { ethers } from "ethers";
import forumArtifact from "../../assets/abi/Forum.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const forumAddr = "0x493C5ADf0D36c7335C23dFbEd21622e444Af6eE9"

export const submitPost = async (cid) => {
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(forumAddr , forumArtifact, signer);
    let postTx = await contract.addPost(cid)
    await postTx.wait()
    console.log("postTx",postTx);
    const receipt = await provider.getTransactionReceipt(postTx.hash);
    console.log("receipt",receipt);
    let abiIntegration = [ "event NewItem(uint256 indexed id, uint256 indexed parentId, address indexed author)"];
    //let abiIntegration = [ "event IntegrationCalledForVault(address indexed comptrollerProxy,address indexed adapter,bytes4 indexed selector,address[] incomingAsset,uint256[] incomingAssetBalance,address[] outgoingAsset,uint256[] outgoingAssetBalance);" ];
    let ifaceIntegration = new ethers.utils.Interface(abiIntegration);
    let log = ifaceIntegration.parseLog(receipt.logs[0]); // here you can add your own logic to find the correct log
    console.log(log);
    //user.set(log.account,log.tokenallocated)
    const {id, parentId, author} = log.args;
    return {id, parentId, author};
}

export const upVote = async (tokenId, votes) => {
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(forumAddr , forumArtifact, signer);
    let voteTx = await contract.voteForItem(tokenId, votes)
    await voteTx.wait()
    console.log("voteTx",voteTx);
}

export const getVoteCount = async (tokenId) => {
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(forumAddr , forumArtifact, signer);
    let totalVotes = await contract.getItemScore(tokenId)
    return totalVotes;
}
