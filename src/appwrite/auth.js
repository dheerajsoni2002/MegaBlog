import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name,
            });

            if (userAccount) {
                return this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            throw new Error(error.message || 'Account creation failed');
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({
                email,
                password,
            });
        } catch (error) {
            throw new Error(error.message || 'Login failed');
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch {
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.log('Appwrite service :: logout :: error', error);
        }
    }
}

const authService = new AuthService();
export default authService;



