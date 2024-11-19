module.exports = {
   apps: [
      // {
      //    namespace: "Oasis Project",
      //    name: "web",
      //    script: "turbo serve",
      //    cwd: "./apps/web",
      //    watch: ".",
      // },
      {
         namespace: "Oasis Project",
         name: "api",
         script: "turbo serve",
         cwd: "./apps/api",
         watch: ".",
      },
      // {
      //    namespace: "Oasis Project",
      //    name: "database",
      //    script: "npx prisma studio",
      //    cwd: "./apps/api",
      //    watch: ".",
      // },
   ],
};
