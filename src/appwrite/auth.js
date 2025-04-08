import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    // we will do this so the client get created as the object create
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // if created successfully login directly
        // call another method
        return this.login({ email, password });
        // this will call directly do the login
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //   to check if user exist
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      //   throw error;
      console.log("Appwrite Service :: getCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

// when you want to use the class you have to make a object every time so now we create a object in advance and export it so when you when to use the class methods directly call the object.
const authService = new AuthService();

export default authService;
