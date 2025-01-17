import { Injectable } from '@angular/core';
import {environement} from "../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import{Community} from "../Models/Community";
import {User} from "../Models/User";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})
  constructor(private httpClient:HttpClient ) {}
  getAllCommunities():Observable<Community[]>{
    return this.httpClient.get<Community[]>(this.PATH_OF_API+"/api/v1/com/communities")
  }
  getCommunitybyUserID(userId:any):Observable<Community[]>{
    return this.httpClient.get<Community[]>(this.PATH_OF_API+"/api/v1/com/communityByUserId/"+userId)
  }
  getCommunityBySearch(search:any){
    return this.httpClient.get<Community[]>(this.PATH_OF_API+"/api/v1/com/search/"+search)
  }
  createCommunity(community: any): Observable<any> {
    return this.httpClient.post<any>(this.PATH_OF_API + "/api/v1/com/addcom", community);
  }

  getSuggestionCommunity(id:any):Observable<Community[]>{
    return this.httpClient.get<Community[]>(this.PATH_OF_API+"/api/v1/com/NotMembre/"+id)
  }
  getBestSuggestionCommunity(id:any):Observable<Community>{
    return this.httpClient.get<Community>(this.PATH_OF_API+"/api/v1/com/bestSuggestion/"+id)
  }
  getMembersByCommunityId(id:any):Observable<User[]>{
    return this.httpClient.get<User[]>(this.PATH_OF_API+"/api/v1/com/members/"+id)
  }
  getCommunityById(id:any):Observable<Community>{
    return this.httpClient.get<Community>(this.PATH_OF_API+"/api/v1/com/community/"+id)
  }
  isMember(iduser:any,idcommunity:any):Observable<boolean>{
    return  this.httpClient.get<boolean>(this.PATH_OF_API+"/api/v1/com/isMember/"+iduser+"/"+idcommunity)
  }
  addMember(communityId:any,userId:any):Observable<any>{
    const formData=new FormData();
    formData.append('userId',userId);
    formData.append('communityId',communityId);
    console.log("here is the data"+formData) ;
    return this.httpClient.post(this.PATH_OF_API+"/api/v1/com/addMember",formData);
  }
  deleteMember(communityId: any, userId: any): Observable<any> {
    const url = `${this.PATH_OF_API}/api/v1/com/deleteMember?communityId=${communityId}&userId=${userId}`;
    return this.httpClient.delete(url);
  }


}
