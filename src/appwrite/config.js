/* eslint-disable no-useless-catch */
import conf from "../conf/conf"
import {Client, ID, Databases, Storage, Query} from 'appwrite'

class Service{
    client = new Client();
    databases
    bucket

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createDatabase({title, slug, content, featuredImage, status, userid}){
        // console.log({title, slug, content, featuredImage, status, userid});
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug ,{title, userid, content, featuredImage, status})
        } catch (error) {
            console.log("Appwrite service :: createDatabase :: error", error);
        }
    }

    async updateDatabase(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug , 
                {
                    title, 
                    content, 
                    featuredImage, 
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deleteDatabse(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async getPosts(){
        // queries = [Query.equal("status", "active")]
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }

    async uploadFile(file){
        try {
            // console.log(file);
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service:: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
            1200,               //width
            0,                  //height
            'center',           // crop center  
            '30',               // slight compression
            5,                  // border width    
            'CDCA30',           // border color
            15,                 // border radius
            1,                  // full opacity
            0,                  // no rotation
            'FFFFFF',           // background color
            'jpg' 
        )
    }
}

const service = new Service()
export default service  