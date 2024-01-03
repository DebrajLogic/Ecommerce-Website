/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  constructor() {
    this.client = new Client()
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
        // If user account is created login directly
        return this.login(email, password);
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      const session = await this.account.createEmailSession(email, password);
      if (session) {
        return session;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();

      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service:: logout:: error", error);
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
