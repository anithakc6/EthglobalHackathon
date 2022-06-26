import { gql } from "@apollo/client";
import {
    GENERATE_CHALLENGE,
    AUTHENTICATE, GET_PROFILES, 
    CREATE_PROFILE, 
    GET_FOLLOWERS, 
    GET_FOLLOWING, 
    GET_USERS_NFTS, 
    CREATE_FOLLOW_TYPED_DATA,
    CREATE_UNFOLLOW_TYPED_DATA, 
    DOES_FOLLOW, 
} from './Query';
import { authenticatedApolloClient, apolloClient } from "./ApolloClient";

export const getProfilesRequest =  async (request) => {
    return authenticatedApolloClient.query({
        query : gql(GET_PROFILES),
        variables : {
            request,
        }
    })
}

export const generateChallenge = async (address) => {
    return apolloClient.query({
        query : gql(GENERATE_CHALLENGE),
        variables : {
            request: {address}
        }
    })
}

export const authenticate = async (address, signature) => {
    return apolloClient.mutate({
        mutation : gql(AUTHENTICATE),
        variables : {
            request : {
                address, 
                signature
            }
        } 
    })
}

/// @dev the get Followers Query needs to be based the unique profile ID
export const getFollowerRequest = (profileId) => {
    return apolloClient.query({
      query : gql(GET_FOLLOWERS),
      variables : {
        request : {
        profileId,
        limit : 100
        }
      }
    })
  }

  
  export const createFollowTypedData = async (followRequestInfo) => {
    return authenticatedApolloClient.mutate(
     {
       mutation : gql(CREATE_FOLLOW_TYPED_DATA),
       variables : {request: {follow : followRequestInfo,}}
     }
    )
 }
 
 export const createUnfollowTypedData = async (profileId) => 
 {
     return authenticatedApolloClient.query({
         query : gql(CREATE_UNFOLLOW_TYPED_DATA),
         variables : {
             request : {
                 profile : profileId
             }
         }
     })
 }

 export const createProfile = async (createProfileRequest) => {
     return authenticatedApolloClient.mutate({
         mutation : gql(CREATE_PROFILE),
         variables : {request : {createProfileRequest}}
     });
 }
   