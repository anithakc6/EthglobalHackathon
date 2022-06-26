import { ethers } from "ethers";
import omitDeep from "omit-deep";
import lensHubArtifact from "../../assets/abi/LensHub.json";
import followNFTArtifact from "../../assets/abi/followNFT.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const signText = async (data) =>{
  const signer = await provider.getSigner();
  return await signer.signMessage(data);
}

export const getAddress = async() => {
  var add = await provider.listAccounts();
  console.log(add[0]);
  return add[0]; 
}

// @dev Helper function to sign the typed data generated through Lens API query
export const signTypedData = (domain, types, values) => {
  const signer = provider.getSigner();
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename'),
    omitDeep(values, '__typename'),
  );
}

export const splitSignatures = (signature) =>{
  return ethers.utils.splitSignature(signature);
}

export const getLensHub = async () => {
  const lensHubAddress = "0x4BF0c7AD32Fd2d32089790a54485e23f5C7736C0"
  const signer = provider.getSigner();
  return await new ethers.Contract(lensHubAddress , lensHubArtifact, signer);      
}

export const getFollowNftContract = async (typedData) =>
{
  const signer = provider.getSigner();
  return await new ethers.Contract(typedData.domain.verifyingContract, followNFTArtifact, signer);
} 