import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const superFluid = await Framework.create({
    networkName : "mumbai",
    chainId : 80001,
    provider : provider
});
const config = {
    hostAddress: "0x3E14dC1b13c488a8d5D310918780c983bD5982E7",
    cfaV1Address: "0x6EeE6060f715257b970700bc2656De21dEdF074C",
    idaV1Address: "0xB0aABBA4B2783A72C52956CDEF62d438ecA2d7a1"
  };

const getAddress = async () => {
    const accounts = await  provider.listAccounts()
    return accounts[0];
}

/// @dev function to return all availalbe superfluid tokens
export const getSuperTokens = async () => {
    return await superFluid.query.listAllSuperTokens({isListed : true});
}   

/// @dev function to create a new flow between the connected wallet and any arbitary address
/// Use this function to create a flow between the end-user hiring a DAO and the DAO
// @param superTokenAddress : Address for the token to be used
// @param receiver : receiver of the flow
// @param amount : total amount to approve for can be MAX_UINT
// @param flowRate : The rate of flow per block
export const createFlow = async (superTokenAddress,receiver ,amount, flowRate) =>
{
    const signer = await superFluid.createSigner({web3Provider : provider});
    const token = await superFluid.loadSuperToken(superTokenAddress); 
    const approveOperation = await token.approve({receiver : receiver, amount : ethers.utils.parseEther(amount).toString()});
    const createFlowOperation = await superFluid.cfaV1.createFlow({
        sender : getAddress(),
        receiver : receiver,
        superToken : superTokenAddress,
        flowRate : flowRate,
    });
    const tx = superFluid.batchCall([approveOperation, createFlowOperation]).exec(signer);
    const receit = await tx.wait()    
}

/// @dev function to create a new flow between the connected wallet and any arbitary address
/// Use this function to create a flow between the end-user hiring a DAO and the DAO
// @param superTokenAddress : Address for the token to be used
// @param receiver : receiver of the flow
// @param amount : total amount to approve for can be MAX_UINT
export const deleteFlow = async (superTokenAddress,receiver ,amount) =>
{
    const signer = await superFluid.createSigner({web3Provider : provider});
    const token = await superFluid.loadSuperToken(superTokenAddress); 
    const approveOperation = await token.approve({receiver : receiver, amount : ethers.utils.parseEther(amount).toString()});
    const deleteFlowOperation = await superFluid.cfaV1.deleteFlow({
        sender : getAddress(),
        receiver : receiver,
        superToken : superTokenAddress,
        by : getAddress(),
    });
    const tx = superFluid.batchCall([approveOperation, deleteFlowOperation]).exec(signer);
    const receit = await tx.wait()    
}
export const updateFlow = async (superTokenAddress, receiver, amount ,flowRate )