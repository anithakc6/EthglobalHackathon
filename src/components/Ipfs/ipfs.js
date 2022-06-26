import { Web3Storage } from 'web3.storage'
import { File } from 'web3.storage'
import {Buffer} from 'buffer';
//import axios from 'axios';

 function makeFileObjects (values) {
     console.log(JSON.stringify(values))
    //const buffer = Buffer.from(JSON.stringify(values))  
    //console.log(buffer)
    const f = new File([JSON.stringify(values)], 'file.json')
    /*const files = [
      new File([buffer], 'Data.json'),
    ]
    console.log(files)*/
    return f
  }

  function getAccessToken () {
    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    //return process.env.WEB3STORAGE_TOKEN
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2OEJBQTIyRTk0QjJENjAzOTMwMjQxMTAzNmUxQzQyMzFkNURFY2MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDkzNDk0Mjk0NTcsIm5hbWUiOiJUZXN0In0.4FwYdVSQauy64v3HPLeQLhpHDCTdP5-ky2tYXrmb954'
  }
  
  function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
  }
  /// @dev function to store the data into IPFS
  // @param values : JSON file
  export const storeIntoIpfs = async (values) => {
    const client = makeStorageClient()
    const files = makeFileObjects(values)
    console.log(files)
    
    const cid = await client.put([files], { wrapWithDirectory: false })
    console.log('stored files with cid:', cid)
    return cid
  }

  /// @dev function to retrive the data from IPFS
  // @param values : cid
  export const retriveDataIpfs = async (cid) => {
    const client = makeStorageClient()
    const res = await client.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
    }
    // unpack File objects from the response
    const files = await res.files()
    for (const file of files) {
        console.log(file);
      console.log(`${file.cid} -- ${file.name} -- ${file.size}`)
      //let jsonData = getIPFSData(file.cid)
      return files;
    }
    return;
  }
  /*async function getIPFSData(cid){
    var config = {
      method: 'get',
      url: 'https://ipfs.io/ipfs/'+cid,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      const obj = JSON.parse(JSON.stringify(response.data));
      console.log(obj)
      return obj;
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }*/

  /// @dev function to check the upvote functionality
  // @param values : cid
  // @param values : upvote count
  export const updateUpvote = async (cid) => {
    //useraddress,answertext,upvotecount,type-(A/Q)
    console.log("Old CID",cid)
    let jsonData = retriveDataIpfs(cid)
    jsonData.Question+="newData";
    let cidipfs = storeIntoIpfs(jsonData)
    console.log("New CID",cidipfs)
    return cidipfs;
  }