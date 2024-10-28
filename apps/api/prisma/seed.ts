import prisma from "./client";
import { genSalt, hash } from "bcrypt";
import crypto from "crypto";

async function inputData() {
   console.log("Start seeding...\n");

   await prisma.booking.deleteMany();
   await prisma.passwordResetToken.deleteMany();
   await prisma.propertyPictures.deleteMany();
   await prisma.review.deleteMany();
   await prisma.roomPrice.deleteMany();
   await prisma.roomPictures.deleteMany();
   await prisma.verificationToken.deleteMany();
   await prisma.wallet.deleteMany();
   await prisma.room.deleteMany();
   await prisma.property.deleteMany();
   await prisma.tenant.deleteMany();
   await prisma.customer.deleteMany();
   await prisma.user.deleteMany();

   const salt = await genSalt(10);
   const hashedPassword = await hash("password", salt);

   const budi = await prisma.user.create({
      data: {
         name: "Budi Woodpecker",
         email: "budi123@mail.com",
         password: hashedPassword,
         tenant: { create: {} },
         accountProvider: "CREDENTIALS",
      },
   });

   const joko = await prisma.user.create({
      data: {
         name: "Joko",
         email: "joko123@mail.com",
         password: hashedPassword,
         tenant: { create: {} },
         accountProvider: "CREDENTIALS",
      },
   });

   const alex = await prisma.user.create({
      data: {
         name: "Alex",
         email: "alex123@mail.com",
         password: hashedPassword,
         customer: {
            create: {
               refCode: crypto.randomBytes(6).toString("hex").toUpperCase(),
            },
         },
         accountProvider: "CREDENTIALS",
         wallet: { create: {} },
      },
   });

   const jeta = await prisma.user.create({
      data: {
         name: "Jessica Tanaka",
         email: "jeta123@mail.com",
         password: hashedPassword,
         customer: {
            create: {
               refCode: crypto.randomBytes(6).toString("hex").toUpperCase(),
            },
         },
         accountProvider: "CREDENTIALS",
         wallet: { create: {} },
      },
   });

   const property1 = await prisma.property.create({
      data: {
         name: "Oceanview Hotel",
         tenantId: budi.id,
         description: "A beautiful Hotel with ocean views.",
         address: "Jl. Rawa Buaya No.2, Jakarta",
         lat: -70.631467,
         lng: 210.201955,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format=&fit=crop",
               },
            ],
         },
         room: {
            create: [
               {
                  type: "Deluxe Room",
                  description: "Spacious room with a king-sized bed and ocean view.",
                  defaultPrice: 2500000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://images.unsplash.com/photo-1590650046499-e1aef6b62a9b?q=80&w=2070&auto=format=&fit=crop",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 3500000,
                           startDate: new Date("2024-11-11"),
                           endDate: new Date("2024-11-31"),
                        },
                        {
                           price: 3000000,
                           startDate: new Date("2024-11-01"),
                           endDate: new Date("2024-11-08"),
                        },
                     ],
                  },
               },
               {
                  type: "Family Suite",
                  description: "A large suite suitable for families with a beautiful view.",
                  roomPictures: {
                     create: [
                        {
                           url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format=&fit=crop",
                        },
                     ],
                  },
                  defaultPrice: 4000000,
                  roomCapacity: 4,
                  roomPrice: {
                     create: [
                        {
                           price: 5000000,
                           startDate: new Date("2024-11-21"),
                           endDate: new Date("2024-11-31"),
                        },
                        {
                           price: 4500000,
                           startDate: new Date("2024-11-11"),
                           endDate: new Date("2024-11-18"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property2 = await prisma.property.create({
      data: {
         name: "Mountainview Hotel",
         tenantId: budi.id,
         description: "A cozy Hotel nestled in the mountains.",
         address: "Jl. Gunung No.5, Bandung",
         lat: -7.631467,
         lng: 110.201955,
         category: "Hotel",
         room: {
            create: [
               {
                  type: "Standard Room",
                  description: "Comfortable room with basic amenities and mountain views.",
                  roomPictures: {
                     create: [
                        {
                           url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format=&fit=crop",
                        },
                     ],
                  },
                  defaultPrice: 1500000,
                  roomCapacity: 2,
                  roomPrice: {
                     create: [
                        {
                           price: 2000000,
                           startDate: new Date("2024-11-12"),
                           endDate: new Date("2024-11-15"),
                        },
                        {
                           price: 1800000,
                           startDate: new Date("2024-11-16"),
                           endDate: new Date("2024-11-19"),
                        },
                     ],
                  },
               },
               {
                  type: "Executive Suite",
                  description: "Luxurious suite with a king-sized bed and a balcony.",
                  roomPictures: {
                     create: [
                        {
                           url: "https://images.unsplash.com/photo-1525977165730-f129bca7b095?q=80&w=2070&auto=format=&fit=crop",
                        },
                     ],
                  },
                  defaultPrice: 6000000,
                  roomCapacity: 4,
                  roomPrice: {
                     create: [
                        {
                           price: 7500000,
                           startDate: new Date("2024-11-13"),
                           endDate: new Date("2024-11-14"),
                        },
                        {
                           price: 7000000,
                           startDate: new Date("2024-11-17"),
                           endDate: new Date("2024-11-18"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   console.log("Seeding complete\n");
}

inputData()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
