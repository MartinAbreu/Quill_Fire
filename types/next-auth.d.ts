import { User } from './index'

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: string;
        };
    }
}