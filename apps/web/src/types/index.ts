export interface User {
   id: number;
   name: string;
   password: string;
   email: string;
   role: string;
   tenant: {};
   customer: {};
   accountProvider: string;
}
