import prisma from "@/prisma";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import { getPasswordResetTokenByEmail } from "./password-reset-token";

export async function generateVerificationToken(email: string) {
   const token = uuidv4();
   const expires = new Date(new Date().getTime() + 3600 * 1000); // expiration time for the token (1h)

   const existingToken = await getVerificationTokenByEmail(email);

   if (existingToken) {
      await prisma.verificationToken.delete({
         where: {
            id: existingToken.id,
         },
      });
   }

   const verificationToken = await prisma.verificationToken.create({
      data: {
         email,
         token,
         expires,
      },
   });

   return verificationToken;
}

export async function generatePasswordResetToken(email: string) {
   const token = uuidv4();
   const expires = new Date(new Date().getTime() + 3600 * 1000); // expiration time for the token (1h)

   const existingToken = await getPasswordResetTokenByEmail(email);

   if (existingToken) {
      await prisma.passwordResetToken.delete({
         where: {
            id: existingToken.id,
         },
      });
   }

   const passwordResetToken = await prisma.passwordResetToken.create({
      data: {
         email,
         token,
         expires,
      },
   });

   return passwordResetToken;
}
