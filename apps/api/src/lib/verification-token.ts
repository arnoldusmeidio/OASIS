import prisma from "@/prisma";

export async function getVerificationTokenByToken(token: string) {
   try {
      const verficationToken = await prisma.verificationToken.findUnique({
         where: { token },
      });

      return verficationToken;
   } catch (error) {
      return null;
   }
}

export async function getVerificationTokenByEmail(email: string) {
   try {
      const verficationToken = await prisma.verificationToken.findFirst({
         where: { email },
      });

      return verficationToken;
   } catch (error) {
      return null;
   }
}
