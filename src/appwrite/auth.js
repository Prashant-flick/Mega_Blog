/* eslint-disable no-useless-catch */
import conf from "../conf/conf"
import {Client, Account, ID} from 'appwrite'

class Authservice {
    client = new Client();
    account
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }
    
    async createAccount ({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            
            if(userAccount){
                // we will come here again - call another method direct login
                return this.login({email, password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login ({email, password}){
        try {
            const Login = await this.account.createEmailSession(email, password)
            console.log(Login);
            return Login
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }
        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }
}

const authservice = new Authservice()
export default authservice


