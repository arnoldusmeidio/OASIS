import prisma from "./client";
import { genSalt, hash } from "bcrypt";
import crypto from "crypto";

async function inputData() {
   console.log("Start seeding...\n");

   await prisma.booking.deleteMany();
   await prisma.customer.deleteMany();
   await prisma.passwordResetToken.deleteMany();
   await prisma.roomPictures.deleteMany();
   await prisma.room.deleteMany();
   await prisma.roomPrice.deleteMany();
   await prisma.propertyPictures.deleteMany();
   await prisma.review.deleteMany();
   await prisma.property.deleteMany();
   await prisma.tenant.deleteMany();
   await prisma.user.deleteMany();
   await prisma.verificationToken.deleteMany();
   await prisma.wallet.deleteMany();
   await prisma.transferToken.deleteMany();

   const salt = await genSalt(10);
   const hashedPassword = await hash("password", salt);

   const uniqueIdRoom1 = `room-${Date.now().toString().slice(-9)}`;
   const uniqueIdRoom2 = `room-${(Date.now() + 1).toString().slice(-9)}`;
   const uniqueIdRoom3 = `room-${(Date.now() + 2).toString().slice(-9)}`;
   const uniqueIdRoom4 = `room-${(Date.now() + 3).toString().slice(-9)}`;
   const uniqueIdRoom5 = `room-${(Date.now() + 4).toString().slice(-9)}`;
   const uniqueIdRoom6 = `room-${(Date.now() + 5).toString().slice(-9)}`;
   const uniqueIdRoom7 = `room-${(Date.now() + 6).toString().slice(-9)}`;
   const uniqueIdRoom8 = `room-${(Date.now() + 7).toString().slice(-9)}`;
   const uniqueIdRoom9 = `room-${(Date.now() + 8).toString().slice(-9)}`;
   const uniqueIdRoom10 = `room-${(Date.now() + 9).toString().slice(-9)}`;
   const uniqueIdRoom11 = `room-${(Date.now() + 10).toString().slice(-9)}`;
   const uniqueIdRoom12 = `room-${(Date.now() + 11).toString().slice(-9)}`;
   const uniqueIdRoom13 = `room-${(Date.now() + 12).toString().slice(-9)}`;
   const uniqueIdRoom14 = `room-${(Date.now() + 13).toString().slice(-9)}`;
   const uniqueIdRoom15 = `room-${(Date.now() + 14).toString().slice(-9)}`;
   const uniqueIdRoom16 = `room-${(Date.now() + 15).toString().slice(-9)}`;
   const uniqueIdRoom17 = `room-${(Date.now() + 16).toString().slice(-9)}`;
   const uniqueIdRoom18 = `room-${(Date.now() + 17).toString().slice(-9)}`;
   const uniqueIdRoom19 = `room-${(Date.now() + 18).toString().slice(-9)}`;
   const uniqueIdRoom20 = `room-${(Date.now() + 19).toString().slice(-9)}`;
   const uniqueIdRoom21 = `room-${(Date.now() + 20).toString().slice(-9)}`;
   const uniqueIdRoom22 = `room-${(Date.now() + 21).toString().slice(-9)}`;
   const uniqueIdRoom23 = `room-${(Date.now() + 22).toString().slice(-9)}`;
   const uniqueIdRoom24 = `room-${(Date.now() + 23).toString().slice(-9)}`;
   const uniqueIdRoom25 = `room-${(Date.now() + 24).toString().slice(-9)}`;
   const uniqueIdRoom26 = `room-${(Date.now() + 25).toString().slice(-9)}`;
   const uniqueIdRoom27 = `room-${(Date.now() + 26).toString().slice(-9)}`;
   const uniqueIdRoom28 = `room-${(Date.now() + 27).toString().slice(-9)}`;
   const uniqueIdRoom29 = `room-${(Date.now() + 28).toString().slice(-9)}`;

   const uniqueIdBooking1 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking2 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking3 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking4 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking5 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking6 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking7 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking8 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking9 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking10 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking11 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking12 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking13 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking14 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking15 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking16 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking17 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking18 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking19 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking20 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking21 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking22 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking23 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking24 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking25 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking26 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking27 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking28 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking29 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking30 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking31 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking32 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking33 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking34 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking35 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking36 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking37 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking38 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking39 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking40 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking41 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking42 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking43 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking44 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking45 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking46 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking47 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking48 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking49 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking50 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking51 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking52 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking53 = crypto.randomBytes(3).toString("hex").toUpperCase();
   const uniqueIdBooking54 = crypto.randomBytes(3).toString("hex").toUpperCase();

   const yamada = await prisma.user.create({
      data: {
         name: "Yamada Darkness",
         email: "yamada123@mail.com",
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

   const budi = await prisma.user.create({
      data: {
         name: "Budi Woodpecker",
         email: "budi123@mail.com",
         password: hashedPassword,
         tenant: { create: {} },
         accountProvider: "CREDENTIALS",
      },
   });

   const david = await prisma.user.create({
      data: {
         name: "David Bekam",
         email: "david123@mail.com",
         password: hashedPassword,
         tenant: { create: {} },
         accountProvider: "CREDENTIALS",
      },
   });

   const woody = await prisma.user.create({
      data: {
         name: "Woody Max",
         email: "woody123@mail.com",
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

   const property1 = await prisma.property.create({
      data: {
         name: "Oceanview Hotel",
         tenantId: budi.id,
         description: "A beautiful Hotel with ocean views.",
         address: "Jl. Rawa Buaya No.2, Jakarta",
         city: "Jakarta",
         lat: -6.158117400000001,
         lng: 106.7307957,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format=&fit=crop",
               },
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207517/oak-motion-K7aApdbJZcQ-unsplash_q2ojtt.jpg",
               },
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207514/oak-motion-jjmHXkeU-yo-unsplash_naaii9.jpg",
               },
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181082/villa-6_hk0xti.jpg",
               },
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181082/villa-6_hk0xti.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom1,
                  type: "Deluxe Room",
                  description: "Spacious room with a king-sized bed and ocean view.",
                  defaultPrice: 2500000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207450/steven-ungermann-ydudT6TqqmI-unsplash_m6e66j.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/aislinn-spaman-H2A4OAS4SCc-unsplash_zbzkfd.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/marvin-meyer-fBdlytm6Hp8-unsplash_smo0hq.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/james-mccreddie-UVSUPupTYNM-unsplash_xhuvqc.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207428/steven-ungermann-CVTmLMv5oG4-unsplash_gzxxno.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/marvin-meyer-fBdlytm6Hp8-unsplash_smo0hq.jpg",
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
                  id: uniqueIdRoom2,
                  type: "Family Suite",
                  description: "A large suite suitable for families with a beautiful view.",
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181749/aislinn-spaman-a7Cf-p-ShfA-unsplash_hq7j1t.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181749/naomi-hebert-MP0bgaS_d1c-unsplash_cz9wwt.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207428/sanju-pandita-5_dqZ2GtqhE-unsplash_roghdk.jpg",
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
         city: "Bandung",
         lat: -7.631467,
         lng: 110.201955,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730180976/gus-ruballo-h5QNclJUiA8-unsplash_ksvp2k.jpg",
               },
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730180972/oleksii-piekhov-AN0BAzp8qi8-unsplash_cxuuyn.jpg",
               },
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730180976/bernard-hermant-KqOLr8OiQLU-unsplash_j3oebw.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom3,
                  type: "Standard Room",
                  description: "Comfortable room with basic amenities and mountain views.",
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/robbie-duncan-BxleF4zbbT8-unsplash_g4wygd.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/robbie-duncan-BxleF4zbbT8-unsplash_g4wygd.jpg",
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
                  id: uniqueIdRoom4,
                  type: "Executive Suite",
                  description: "Luxurious suite with a king-sized bed and a balcony.",
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207428/sanju-pandita--o8hIWs8Rts-unsplash_ntkn5l.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730185006/rebecca-chandler-fE3kcMhB1oc-unsplash_urso92.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/robbie-duncan-BxleF4zbbT8-unsplash_g4wygd.jpg",
                        },
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/james-mccreddie-UVSUPupTYNM-unsplash_xhuvqc.jpg",
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

   const property3 = await prisma.property.create({
      data: {
         name: "Serene Seaside Villa",
         tenantId: budi.id,
         description: "A peaceful villa near the beach, perfect for a quiet getaway.",
         address: "Jl. Pantai Indah No.3, Bali",
         city: "Bali",
         lat: -8.723,
         lng: 115.171,
         category: "Villa",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207514/james-smith-ycR84RNfVrs-unsplash_wnarek.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom5,
                  type: "Deluxe Suite",
                  description: "Spacious suite with private pool and garden view.",
                  defaultPrice: 4200000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207428/sanju-pandita--o8hIWs8Rts-unsplash_ntkn5l.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 4600000, startDate: new Date("2024-11-11"), endDate: new Date("2024-11-31") },
                        { price: 4000000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-08") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property4 = await prisma.property.create({
      data: {
         name: "Modern City Hotel",
         tenantId: budi.id,
         description: "A stylish hotel located in the heart of Bali.",
         address: "Jl. Legian No.45, Bali",
         city: "Bali",
         lat: -8.715,
         lng: 115.172,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207510/josh-hild-H6bwsRvl0mM-unsplash_afw8i5.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom6,
                  type: "Standard Room",
                  description: "Modern room with all essential amenities.",
                  defaultPrice: 2200000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/robbie-duncan-BxleF4zbbT8-unsplash_g4wygd.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 2500000, startDate: new Date("2024-11-15"), endDate: new Date("2024-11-30") },
                        { price: 2300000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-10") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property5 = await prisma.property.create({
      data: {
         name: "Jakarta Luxury Apartment",
         tenantId: budi.id,
         description: "Luxury apartment with top-class facilities and city view.",
         address: "Jl. Sudirman No.10, Jakarta",
         city: "Jakarta",
         lat: -6.214,
         lng: 106.845,
         category: "Apartment",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207486/alisa-anton-O_aQjhRMVkE-unsplash_y0wtv1.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom7,
                  type: "Penthouse Suite",
                  description: "Spacious penthouse with a stunning city view.",
                  defaultPrice: 5500000,
                  roomCapacity: 4,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/aislinn-spaman-H2A4OAS4SCc-unsplash_zbzkfd.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 6000000, startDate: new Date("2024-11-11"), endDate: new Date("2024-11-31") },
                        { price: 5800000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-10") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property6 = await prisma.property.create({
      data: {
         name: "City Center Hotel",
         tenantId: budi.id,
         description: "A hotel in Bandung with a mix of modern comfort and convenience.",
         address: "Jl. Braga No.5, Bandung",
         city: "Bandung",
         lat: -6.914,
         lng: 107.609,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207486/jakub-zerdzicki-AZrkXZO9VDM-unsplash_pfbyhj.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom8,
                  type: "Standard Room",
                  description: "Comfortable room with basic amenities.",
                  defaultPrice: 1800000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207428/steven-ungermann-CVTmLMv5oG4-unsplash_gzxxno.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 2000000, startDate: new Date("2024-11-11"), endDate: new Date("2024-11-30") },
                        { price: 1900000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-10") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property7 = await prisma.property.create({
      data: {
         name: "Malang Hillside Villa",
         tenantId: david.id,
         description: "Beautiful villa overlooking the hills of Malang.",
         address: "Jl. Raya Selecta No.7, Malang",
         city: "Malang",
         lat: -7.977,
         lng: 112.628,
         category: "Villa",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207484/istrfry-marcus-g3L4uUfDQdg-unsplash_m9lpww.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom9,
                  type: "Luxury Suite",
                  description: "A cozy suite with garden and hill views.",
                  defaultPrice: 3000000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/marvin-meyer-fBdlytm6Hp8-unsplash_smo0hq.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 3500000, startDate: new Date("2024-11-11"), endDate: new Date("2024-11-31") },
                        { price: 3200000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-08") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property8 = await prisma.property.create({
      data: {
         name: "Medan City Hotel",
         tenantId: david.id,
         description: "A modern hotel in the bustling city of Medan.",
         address: "Jl. Gatot Subroto No.8, Medan",
         city: "Medan",
         lat: 3.597,
         lng: 98.678,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207483/georgia-de-lotz-g6EbzPPuDUM-unsplash_q0w3yu.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom10,
                  type: "Executive Room",
                  description: "Spacious room with city view.",
                  defaultPrice: 2700000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/aislinn-spaman-H2A4OAS4SCc-unsplash_zbzkfd.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 2900000, startDate: new Date("2024-11-15"), endDate: new Date("2024-11-30") },
                        { price: 2800000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-10") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property9 = await prisma.property.create({
      data: {
         name: "Semarang Riverside Apartment",
         tenantId: david.id,
         description: "Luxury apartment near the river in Semarang.",
         address: "Jl. Pemuda No.9, Semarang",
         city: "Semarang",
         lat: -6.966,
         lng: 110.422,
         category: "Apartment",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207480/roya-ann-miller-_w-TB-ZTBg8-unsplash_kamuvz.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom11,
                  type: "Penthouse",
                  description: "Spacious penthouse with a beautiful river view.",
                  defaultPrice: 6000000,
                  roomCapacity: 4,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/marvin-meyer-fBdlytm6Hp8-unsplash_smo0hq.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 6500000, startDate: new Date("2024-11-11"), endDate: new Date("2024-11-31") },
                        { price: 6200000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-08") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property10 = await prisma.property.create({
      data: {
         name: "Surabaya Oceanfront Hotel",
         tenantId: david.id,
         description: "Premium hotel with oceanfront views in Surabaya.",
         address: "Jl. Pemuda No.10, Surabaya",
         city: "Surabaya",
         lat: -7.257,
         lng: 112.752,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207478/yaopey-yong-t8woJfDB1Ec-unsplash_vuboi7.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom12,
                  type: "Ocean Suite",
                  description: "Suite with a private balcony overlooking the ocean.",
                  defaultPrice: 4800000,
                  roomCapacity: 3,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/james-mccreddie-UVSUPupTYNM-unsplash_xhuvqc.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 5200000, startDate: new Date("2024-11-11"), endDate: new Date("2024-11-31") },
                        { price: 5000000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-08") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property11 = await prisma.property.create({
      data: {
         name: "Surabaya Modern Villa",
         tenantId: woody.id,
         description: "Modern villa located in a serene area of Surabaya.",
         address: "Jl. Tunjungan No.11, Surabaya",
         city: "Surabaya",
         lat: -7.259,
         lng: 112.748,
         category: "Villa",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207477/brooklyn-macnally-0XbgYuIZTX8-unsplash_w3k4bi.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom13,
                  type: "Private Villa",
                  description: "Spacious villa with private garden and pool.",
                  defaultPrice: 5800000,
                  roomCapacity: 4,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730185006/rebecca-chandler-fE3kcMhB1oc-unsplash_urso92.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 6300000, startDate: new Date("2024-11-15"), endDate: new Date("2024-11-30") },
                        { price: 6000000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-10") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property12 = await prisma.property.create({
      data: {
         name: "Jogja Heritage Hotel",
         tenantId: woody.id,
         description: "A luxurious hotel near Jogja's cultural sites.",
         address: "Jl. Malioboro No.12, Jogja",
         city: "Jogja",
         lat: -7.797068,
         lng: 110.370529,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207476/paul-kapischka-NLbMgDBio4Y-unsplash_ojfe3m.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom14,
                  type: "Heritage Suite",
                  description: "Suite inspired by Jogja's rich cultural heritage.",
                  defaultPrice: 4500000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/marvin-meyer-fBdlytm6Hp8-unsplash_smo0hq.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 5000000, startDate: new Date("2024-11-15"), endDate: new Date("2024-11-30") },
                        { price: 4800000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-10") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property13 = await prisma.property.create({
      data: {
         name: "Jogja Riverside Villa",
         tenantId: woody.id,
         description: "A serene riverside villa in the heart of Jogja.",
         address: "Jl. Tirtodipuran No.13, Jogja",
         city: "Jogja",
         lat: -7.810849,
         lng: 110.362835,
         category: "Villa",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207474/jakub-zerdzicki-MtzQBXwZtU4-unsplash_ikz15p.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom15,
                  type: "Riverfront Villa",
                  description: "Villa with direct access to a tranquil riverside view.",
                  defaultPrice: 5200000,
                  roomCapacity: 4,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/james-mccreddie-UVSUPupTYNM-unsplash_xhuvqc.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 5800000, startDate: new Date("2024-11-10"), endDate: new Date("2024-11-20") },
                        { price: 5600000, startDate: new Date("2024-12-01"), endDate: new Date("2024-12-08") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property14 = await prisma.property.create({
      data: {
         name: "Tropical Bliss Resort",
         tenantId: woody.id,
         description: "A serene resort nestled in Bali's lush landscapes.",
         address: "Jl. Pantai Kuta No.3, Bali",
         city: "Bali",
         lat: -8.723,
         lng: 115.171,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207474/etienne-girardet-6MtgMO5owsU-unsplash_aivr06.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom16,
                  type: "Garden Suite",
                  description: "Suite with a private garden and luxurious amenities.",
                  defaultPrice: 4000000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/aislinn-spaman-H2A4OAS4SCc-unsplash_zbzkfd.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 4500000, startDate: new Date("2024-11-01"), endDate: new Date("2024-11-10") },
                        { price: 4200000, startDate: new Date("2024-11-11"), endDate: new Date("2024-11-20") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property15 = await prisma.property.create({
      data: {
         name: "Bandung Mountain View",
         tenantId: woody.id,
         description: "A peaceful escape in Bandung with mountain views.",
         address: "Jl. Dago Pakar No.4, Bandung",
         city: "Bandung",
         lat: -6.871,
         lng: 107.619,
         category: "Villa",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207472/milin-john-Af3-SsisXNs-unsplash_nfhhkg.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom17,
                  type: "Mountain Suite",
                  description: "Suite with panoramic views of the Bandung mountains.",
                  defaultPrice: 3500000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/marvin-meyer-fBdlytm6Hp8-unsplash_smo0hq.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 3700000, startDate: new Date("2024-11-05"), endDate: new Date("2024-11-15") },
                        { price: 3600000, startDate: new Date("2024-11-16"), endDate: new Date("2024-11-30") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property16 = await prisma.property.create({
      data: {
         name: "Jakarta Central Hotel",
         tenantId: woody.id,
         description: "Modern hotel in the heart of Jakarta's bustling city center.",
         address: "Jl. Thamrin No.5, Jakarta",
         city: "Jakarta",
         lat: -6.214,
         lng: 106.845,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181332/Hotel_assset_li0r6g.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom18,
                  type: "Executive Room",
                  description: "Spacious room with modern amenities in central Jakarta.",
                  defaultPrice: 3000000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181749/aislinn-spaman-a7Cf-p-ShfA-unsplash_hq7j1t.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        { price: 3200000, startDate: new Date("2024-11-10"), endDate: new Date("2024-11-20") },
                        { price: 3100000, startDate: new Date("2024-11-21"), endDate: new Date("2024-11-30") },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property17 = await prisma.property.create({
      data: {
         name: "Sanur Sunrise Apartment",
         tenantId: budi.id,
         description: "A modern apartment in Sanur with stunning sunrise views.",
         address: "Jl. Danau Tamblingan No,.18, Sanur, Bali",
         city: "Bali",
         lat: -8.6886,
         lng: 115.2624,
         category: "Apartment",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181084/villa-4_xxkmqg.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom19,
                  type: "Sunrise Suite",
                  description: "Apartment suite with beautiful sunrise views and modern amenities.",
                  defaultPrice: 5500000,
                  roomCapacity: 3,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/sanju-pandita-P_tpmDHGkc0-unsplash_vdets4.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 6000000,
                           startDate: new Date("2024-12-15"),
                           endDate: new Date("2024-12-31"),
                        },
                        {
                           price: 5800000,
                           startDate: new Date("2024-11-25"),
                           endDate: new Date("2024-12-10"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property18 = await prisma.property.create({
      data: {
         name: "Bali Beach Resort",
         tenantId: budi.id,
         description: "A luxurious beachfront resort offering a unique Balinese experience.",
         address: "Jl. Pantai Berawa No.8, Bali",
         city: "Bali",
         lat: -8.675277,
         lng: 115.15166,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181082/villa-6_hk0xti.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom20,
                  type: "Ocean View Suite",
                  description: "Suite with direct views of the beach and luxurious amenities.",
                  defaultPrice: 5500000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/robbie-duncan-BxleF4zbbT8-unsplash_g4wygd.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 6500000,
                           startDate: new Date("2024-11-11"),
                           endDate: new Date("2024-11-31"),
                        },
                        {
                           price: 6000000,
                           startDate: new Date("2024-12-01"),
                           endDate: new Date("2024-12-15"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property19 = await prisma.property.create({
      data: {
         name: "Ubud Jungle Retreat",
         tenantId: budi.id,
         description: "A peaceful retreat surrounded by the lush jungles of Ubud.",
         address: "Jl. Raya Ubud No.3, Bali",
         city: "Bali",
         lat: -8.51572,
         lng: 115.26243,
         category: "Villa",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181081/villa-3_ox8wn2.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom21,
                  type: "Garden Villa",
                  description: "A private villa with garden views, perfect for relaxation.",
                  defaultPrice: 4800000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/marvin-meyer-fBdlytm6Hp8-unsplash_smo0hq.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 5800000,
                           startDate: new Date("2024-12-01"),
                           endDate: new Date("2024-12-15"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property20 = await prisma.property.create({
      data: {
         name: "Legian Apartment",
         tenantId: budi.id,
         description: "Modern apartments in the heart of Legian, close to all attractions.",
         address: "Jl. Legian No.5, Bali",
         city: "Bali",
         lat: -8.70541,
         lng: 115.16829,
         category: "Apartment",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181081/villa-2_htnxaw.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom22,
                  type: "Standard Apartment",
                  description: "Modern one-bedroom apartment with city views.",
                  defaultPrice: 2000000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207450/steven-ungermann-ydudT6TqqmI-unsplash_m6e66j.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 2200000,
                           startDate: new Date("2024-11-01"),
                           endDate: new Date("2024-11-15"),
                        },
                        {
                           price: 2500000,
                           startDate: new Date("2024-12-01"),
                           endDate: new Date("2024-12-15"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property21 = await prisma.property.create({
      data: {
         name: "Seminyak Sunset Villas",
         tenantId: david.id,
         description: "Luxurious villas with a private pool in Seminyak.",
         address: "Jl. Kayu Aya No.10, Bali",
         city: "Bali",
         lat: -8.68227,
         lng: 115.16107,
         category: "Villa",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181080/villa-5_s4zy0h.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom23,
                  type: "Pool Villa",
                  description: "Private villa with a personal pool and sunset views.",
                  defaultPrice: 6800000,
                  roomCapacity: 4,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207447/aislinn-spaman-H2A4OAS4SCc-unsplash_zbzkfd.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 7200000,
                           startDate: new Date("2024-12-01"),
                           endDate: new Date("2024-12-20"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property22 = await prisma.property.create({
      data: {
         name: "Kuta Beachfront Apartments",
         tenantId: david.id,
         description: "Affordable apartments right on Kuta Beach.",
         address: "Jl. Pantai Kuta No.7, Bali",
         city: "Bali",
         lat: -8.71783,
         lng: 115.16942,
         category: "Apartment",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181078/villa-1_mjsfm0.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom24,
                  type: "Seaside Apartment",
                  description: "Comfortable apartment with direct beach access.",
                  defaultPrice: 3200000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/marvin-meyer-fBdlytm6Hp8-unsplash_smo0hq.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 3800000,
                           startDate: new Date("2024-11-15"),
                           endDate: new Date("2024-11-30"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property23 = await prisma.property.create({
      data: {
         name: "Jimbaran Bay Resort",
         tenantId: woody.id,
         description: "A luxurious resort in Jimbaran with views of the bay and sunset.",
         address: "Jl. Bukit Permai No,.9, Jimbaran Bali",
         city: "Bali ",
         lat: -8.7781,
         lng: 115.1653,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730180976/gus-ruballo-h5QNclJUiA8-unsplash_ksvp2k.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom25,
                  type: "Bay View Suite",
                  description: "Spacious suite with breathtaking views of Jimbaran Bay.",
                  defaultPrice: 7200000,
                  roomCapacity: 3,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730185006/rebecca-chandler-fE3kcMhB1oc-unsplash_urso92.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 8000000,
                           startDate: new Date("2024-12-01"),
                           endDate: new Date("2024-12-20"),
                        },
                        {
                           price: 7500000,
                           startDate: new Date("2024-11-15"),
                           endDate: new Date("2024-11-30"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property24 = await prisma.property.create({
      data: {
         name: "Canggu Surf Villas",
         tenantId: woody.id,
         description: "Modern villas with easy access to Canggus popular surf spots.",
         address: "Jl. Pantai Batu, Bolong No.5, Canggu, Bali",
         city: "Bali, ",
         lat: -8.6558,
         lng: 115.1265,
         category: "Villa",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730180975/braden-collum-Q_eVb6Pajl8-unsplash_gymzpl.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom26,
                  type: "Surf Villa",
                  description: "Stylish villa with private pool, perfect for surfers.",
                  defaultPrice: 6000000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181749/aislinn-spaman-a7Cf-p-ShfA-unsplash_hq7j1t.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 6800000,
                           startDate: new Date("2024-12-05"),
                           endDate: new Date("2024-12-15"),
                        },
                        {
                           price: 6500000,
                           startDate: new Date("2024-11-10"),
                           endDate: new Date("2024-11-25"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property25 = await prisma.property.create({
      data: {
         name: "Nusa Dua Luxury Apartments",
         tenantId: woody.id,
         description: "Exclusive apartments in Nusa Dua, close to the beach.",
         address: "Jl. Pratama No.88, Nusa Dua, Bali",
         city: "Bali",
         lat: -8.7981,
         lng: 115.2243,
         category: "Apartment",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730180974/frames-for-your-heart-2d4lAQAlbDA-unsplash_l5i8m8.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom27,
                  type: "Luxury Apartment",
                  description: "Spacious apartment with luxurious amenities and sea views.",
                  defaultPrice: 8500000,
                  roomCapacity: 4,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181749/aislinn-spaman-a7Cf-p-ShfA-unsplash_hq7j1t.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 9000000,
                           startDate: new Date("2024-12-10"),
                           endDate: new Date("2024-12-25"),
                        },
                        {
                           price: 8800000,
                           startDate: new Date("2024-11-20"),
                           endDate: new Date("2024-11-30"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property26 = await prisma.property.create({
      data: {
         name: "Seminyak Beachfront Villa",
         tenantId: budi.id,
         description: "A luxurious villa right on Seminyak Beach, with stunning ocean views.",
         address: "Jl. Petitenget No.99,seminyak, Bali",
         city: "Bali",
         lat: -8.6784,
         lng: 115.1592,
         category: "Villa",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730180972/oleksii-piekhov-AN0BAzp8qi8-unsplash_cxuuyn.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom28,
                  type: "Beachfront Villa",
                  description: "Spacious villa with private pool and beach access.",
                  defaultPrice: 9000000,
                  roomCapacity: 4,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730181749/naomi-hebert-MP0bgaS_d1c-unsplash_cz9wwt.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 9500000,
                           startDate: new Date("2024-12-01"),
                           endDate: new Date("2024-12-15"),
                        },
                        {
                           price: 9300000,
                           startDate: new Date("2024-11-20"),
                           endDate: new Date("2024-11-30"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const property27 = await prisma.property.create({
      data: {
         name: "Ubud Jungle Retreat",
         tenantId: budi.id,
         description: "Nestled in the heart of Ubud's jungle, this retreat offers tranquility.",
         address: "Jl. Monkey Forest No.10, Ubud. Bali",
         city: "Bali",
         lat: -8.5069,
         lng: 115.2625,
         category: "Hotel",
         propertyPictures: {
            create: [
               {
                  url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730180972/brian-babb-XbwHrt87mQ0-unsplash_hly5tt.jpg",
               },
            ],
         },
         room: {
            create: [
               {
                  id: uniqueIdRoom29,
                  type: "Jungle Suite",
                  description: "A cozy suite surrounded by lush jungle.",
                  defaultPrice: 6000000,
                  roomCapacity: 2,
                  roomPictures: {
                     create: [
                        {
                           url: "https://res.cloudinary.com/dbu0u9bln/image/upload/v1730207445/marvin-meyer-fBdlytm6Hp8-unsplash_smo0hq.jpg",
                        },
                     ],
                  },
                  roomPrice: {
                     create: [
                        {
                           price: 6500000,
                           startDate: new Date("2024-12-10"),
                           endDate: new Date("2024-12-25"),
                        },
                        {
                           price: 6200000,
                           startDate: new Date("2024-11-15"),
                           endDate: new Date("2024-11-30"),
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   const alex = await prisma.user.create({
      data: {
         name: "Alex Dino",
         email: "alex123@mail.com",
         password: hashedPassword,
         customer: {
            create: {
               refCode: crypto.randomBytes(6).toString("hex").toUpperCase(),
               bookings: {
                  create: [
                     {
                        id: uniqueIdBooking1,
                        startDate: new Date("2024-11-10"),
                        endDate: new Date("2024-11-15"),
                        bookingNumber: uniqueIdBooking1,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom1,
                     },
                     {
                        id: uniqueIdBooking2,
                        startDate: new Date("2024-12-01"),
                        endDate: new Date("2024-12-10"),
                        bookingNumber: uniqueIdBooking2,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom5,
                     },
                     {
                        id: uniqueIdBooking3,
                        startDate: new Date("2025-01-01"),
                        endDate: new Date("2025-01-04"),
                        bookingNumber: uniqueIdBooking3,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom6,
                     },
                     {
                        id: uniqueIdBooking4,
                        startDate: new Date("2024-12-30"),
                        endDate: new Date("2025-01-01"),
                        bookingNumber: uniqueIdBooking4,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom7,
                     },
                     {
                        id: uniqueIdBooking5,
                        startDate: new Date("2025-05-01"),
                        endDate: new Date("2025-05-03"),
                        bookingNumber: uniqueIdBooking5,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom8,
                     },
                     {
                        id: uniqueIdBooking6,
                        startDate: new Date("2024-12-01"),
                        endDate: new Date("2024-12-10"),
                        bookingNumber: uniqueIdBooking6,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom9,
                     },
                     {
                        id: uniqueIdBooking7,
                        startDate: new Date("2024-12-01"),
                        endDate: new Date("2024-12-10"),
                        bookingNumber: uniqueIdBooking7,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom10,
                     },
                     {
                        id: uniqueIdBooking39,
                        startDate: new Date("2025-12-01"),
                        endDate: new Date("2025-12-07"),
                        bookingNumber: uniqueIdBooking39,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom13,
                     },
                     {
                        id: uniqueIdBooking40,
                        startDate: new Date("2026-01-05"),
                        endDate: new Date("2026-01-10"),
                        bookingNumber: uniqueIdBooking40,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom14,
                     },
                     {
                        id: uniqueIdBooking41,
                        startDate: new Date("2026-02-15"),
                        endDate: new Date("2026-02-20"),
                        bookingNumber: uniqueIdBooking41,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom15,
                     },
                     {
                        id: uniqueIdBooking42,
                        startDate: new Date("2026-03-01"),
                        endDate: new Date("2026-03-06"),
                        bookingNumber: uniqueIdBooking42,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom16,
                     },
                     {
                        id: uniqueIdBooking43,
                        startDate: new Date("2026-04-10"),
                        endDate: new Date("2026-04-15"),
                        bookingNumber: uniqueIdBooking43,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom17,
                     },
                     {
                        id: uniqueIdBooking44,
                        startDate: new Date("2026-05-20"),
                        endDate: new Date("2026-05-25"),
                        bookingNumber: uniqueIdBooking44,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom18,
                     },
                     {
                        id: uniqueIdBooking45,
                        startDate: new Date("2026-06-01"),
                        endDate: new Date("2026-06-05"),
                        bookingNumber: uniqueIdBooking45,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom19,
                     },
                     {
                        id: uniqueIdBooking46,
                        startDate: new Date("2026-07-10"),
                        endDate: new Date("2026-07-15"),
                        bookingNumber: uniqueIdBooking46,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom20,
                     },
                  ],
               },
               reviews: {
                  create: [
                     {
                        bookingId: uniqueIdBooking1,
                        propertyId: property1.id,
                        review: "A pleasant stay in this place. Very clean and the staffes are helpful",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking2,
                        propertyId: property2.id,
                        review: "Excellent location and amazing facilities. Will definitely come back!",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking3,
                        propertyId: property3.id,
                        review: "Nice room with a great view, but the food was just okay.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking4,
                        propertyId: property4.id,
                        review: "Very cozy and clean. Perfect for a weekend getaway.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking5,
                        propertyId: property5.id,
                        review: "Spacious rooms and friendly staff, but a bit far from the city center.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking6,
                        propertyId: property6.id,
                        review: "Had an incredible experience! Great service and ambiance.",
                        star: 10,
                     },
                     {
                        bookingId: uniqueIdBooking7,
                        propertyId: property7.id,
                        review: "Affordable and clean, but the amenities are quite basic.",
                        star: 6,
                     },
                     {
                        bookingId: uniqueIdBooking39,
                        propertyId: property11.id,
                        review: "Good facilities but the staff seemed a bit overwhelmed.",
                        star: 6,
                     },
                     {
                        bookingId: uniqueIdBooking40,
                        propertyId: property12.id,
                        review: "Amazing service and luxurious decor, truly relaxing stay.",
                        star: 10,
                     },
                     {
                        bookingId: uniqueIdBooking41,
                        propertyId: property13.id,
                        review: "Comfortable and clean, though the rooms were a bit small.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking42,
                        propertyId: property14.id,
                        review: "Affordable stay with nice amenities, worth the price.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking43,
                        propertyId: property15.id,
                        review: "Had a great time, the staff went above and beyond to help.",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking44,
                        propertyId: property16.id,
                        review: "Decent experience, though the check-in was slow.",
                        star: 6,
                     },
                     {
                        bookingId: uniqueIdBooking45,
                        propertyId: property17.id,
                        review: "Wonderful hotel with lots of character and excellent service.",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking46,
                        propertyId: property18.id,
                        review: "Great hotel in a fantastic location, would stay here again.",
                        star: 8,
                     },
                  ],
               },
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
               bookings: {
                  create: [
                     {
                        id: uniqueIdBooking8,
                        startDate: new Date("2024-12-01"),
                        endDate: new Date("2024-12-10"),
                        bookingNumber: uniqueIdBooking8,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom10,
                     },
                     {
                        id: uniqueIdBooking9,
                        startDate: new Date("2024-12-11"),
                        endDate: new Date("2024-12-20"),
                        bookingNumber: uniqueIdBooking9,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom11,
                     },
                     {
                        id: uniqueIdBooking10,
                        startDate: new Date("2024-12-21"),
                        endDate: new Date("2024-12-30"),
                        bookingNumber: uniqueIdBooking10,
                        paymentStatus: "PENDING",
                        roomId: uniqueIdRoom12,
                     },
                     {
                        id: uniqueIdBooking11,
                        startDate: new Date("2025-01-01"),
                        endDate: new Date("2025-01-10"),
                        bookingNumber: uniqueIdBooking11,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom13,
                     },
                     {
                        id: uniqueIdBooking12,
                        startDate: new Date("2025-01-11"),
                        endDate: new Date("2025-01-20"),
                        bookingNumber: uniqueIdBooking12,
                        paymentStatus: "PENDING",
                        roomId: uniqueIdRoom14,
                     },
                     {
                        id: uniqueIdBooking13,
                        startDate: new Date("2025-01-21"),
                        endDate: new Date("2025-01-30"),
                        bookingNumber: uniqueIdBooking13,
                        paymentStatus: "PENDING",
                        roomId: uniqueIdRoom15,
                     },
                     {
                        id: uniqueIdBooking14,
                        startDate: new Date("2025-02-01"),
                        endDate: new Date("2025-02-10"),
                        bookingNumber: uniqueIdBooking14,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom16,
                     },
                     {
                        id: uniqueIdBooking47,
                        startDate: new Date("2026-08-01"),
                        endDate: new Date("2026-08-06"),
                        bookingNumber: uniqueIdBooking47,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom21,
                     },
                     {
                        id: uniqueIdBooking48,
                        startDate: new Date("2026-09-15"),
                        endDate: new Date("2026-09-20"),
                        bookingNumber: uniqueIdBooking48,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom22,
                     },
                     {
                        id: uniqueIdBooking49,
                        startDate: new Date("2026-10-01"),
                        endDate: new Date("2026-10-05"),
                        bookingNumber: uniqueIdBooking49,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom23,
                     },
                     {
                        id: uniqueIdBooking50,
                        startDate: new Date("2026-11-10"),
                        endDate: new Date("2026-11-15"),
                        bookingNumber: uniqueIdBooking50,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom24,
                     },
                     {
                        id: uniqueIdBooking51,
                        startDate: new Date("2026-12-01"),
                        endDate: new Date("2026-12-05"),
                        bookingNumber: uniqueIdBooking51,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom25,
                     },
                     {
                        id: uniqueIdBooking52,
                        startDate: new Date("2027-01-05"),
                        endDate: new Date("2027-01-10"),
                        bookingNumber: uniqueIdBooking52,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom26,
                     },
                     {
                        id: uniqueIdBooking53,
                        startDate: new Date("2027-02-20"),
                        endDate: new Date("2027-02-25"),
                        bookingNumber: uniqueIdBooking53,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom27,
                     },
                     {
                        id: uniqueIdBooking54,
                        startDate: new Date("2027-03-20"),
                        endDate: new Date("2027-03-21"),
                        bookingNumber: uniqueIdBooking54,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom28,
                     },
                  ],
               },
               reviews: {
                  create: [
                     {
                        bookingId: uniqueIdBooking8,
                        propertyId: property8.id,
                        review: "Highly recommend! Perfect location and wonderful staff.",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking9,
                        propertyId: property9.id,
                        review: "Great stay, but the WiFi was a bit slow.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking10,
                        propertyId: property10.id,
                        review: "Loved the decor and spacious rooms. Very relaxing atmosphere.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking11,
                        propertyId: property11.id,
                        review: "Perfect for families, clean and convenient with friendly staff.",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking12,
                        propertyId: property12.id,
                        review: "Good value for the price, but some of the facilities need updating.",
                        star: 6,
                     },
                     {
                        bookingId: uniqueIdBooking13,
                        propertyId: property13.id,
                        review: "Lovely property with beautiful views, but a bit pricey.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking14,
                        propertyId: property14.id,
                        review: "Everything was perfect, highly recommended!",
                        star: 10,
                     },
                     {
                        bookingId: uniqueIdBooking47,
                        propertyId: property19.id,
                        review: "The beach view was amazing, but the room was a bit outdated.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking48,
                        propertyId: property20.id,
                        review: "Exceptional service and the spa was very relaxing.",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking49,
                        propertyId: property21.id,
                        review: "Decent stay, though the breakfast could be improved.",
                        star: 6,
                     },
                     {
                        bookingId: uniqueIdBooking50,
                        propertyId: property22.id,
                        review: "Loved the ambiance, especially in the evening by the pool.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking51,
                        propertyId: property23.id,
                        review: "Very clean rooms, helpful staff, and great value for money.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking52,
                        propertyId: property24.id,
                        review: "Beautiful decor and comfortable beds, highly recommend!",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking53,
                        propertyId: property25.id,
                        review: "Nice hotel but a bit noisy at night due to traffic.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking54,
                        propertyId: property26.id,
                        review: "Perfect for a weekend getaway, great atmosphere and service.",
                        star: 8,
                     },
                  ],
               },
            },
         },
         accountProvider: "CREDENTIALS",
         wallet: { create: {} },
      },
   });

   const kobo = await prisma.user.create({
      data: {
         name: "Kobo Kanaeru",
         email: "kobo123@mail.com",
         password: hashedPassword,
         customer: {
            create: {
               refCode: crypto.randomBytes(6).toString("hex").toUpperCase(),
               bookings: {
                  create: [
                     {
                        id: uniqueIdBooking15,
                        startDate: new Date("2025-02-11"),
                        endDate: new Date("2025-02-20"),
                        bookingNumber: uniqueIdBooking15,
                        paymentStatus: "PENDING",
                        roomId: uniqueIdRoom17,
                     },
                     {
                        id: uniqueIdBooking16,
                        startDate: new Date("2025-02-21"),
                        endDate: new Date("2025-03-01"),
                        bookingNumber: uniqueIdBooking16,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom18,
                     },
                     {
                        id: uniqueIdBooking17,
                        startDate: new Date("2025-03-02"),
                        endDate: new Date("2025-03-11"),
                        bookingNumber: uniqueIdBooking17,
                        paymentStatus: "PENDING",
                        roomId: uniqueIdRoom19,
                     },
                     {
                        id: uniqueIdBooking18,
                        startDate: new Date("2025-03-12"),
                        endDate: new Date("2025-03-20"),
                        bookingNumber: uniqueIdBooking18,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom20,
                     },
                     {
                        id: uniqueIdBooking19,
                        startDate: new Date("2025-03-21"),
                        endDate: new Date("2025-03-30"),
                        bookingNumber: uniqueIdBooking19,
                        paymentStatus: "PENDING",
                        roomId: uniqueIdRoom21,
                     },
                     {
                        id: uniqueIdBooking34,
                        startDate: new Date("2025-08-10"),
                        endDate: new Date("2025-08-15"),
                        bookingNumber: uniqueIdBooking34,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom8,
                     },
                     {
                        id: uniqueIdBooking35,
                        startDate: new Date("2025-09-05"),
                        endDate: new Date("2025-09-10"),
                        bookingNumber: uniqueIdBooking35,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom9,
                     },
                     {
                        id: uniqueIdBooking36,
                        startDate: new Date("2025-10-15"),
                        endDate: new Date("2025-10-20"),
                        bookingNumber: uniqueIdBooking36,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom10,
                     },

                     {
                        id: uniqueIdBooking28,
                        startDate: new Date("2025-02-20"),
                        endDate: new Date("2025-02-25"),
                        bookingNumber: uniqueIdBooking28,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom2,
                     },
                     {
                        id: uniqueIdBooking29,
                        startDate: new Date("2025-03-05"),
                        endDate: new Date("2025-03-10"),
                        bookingNumber: uniqueIdBooking29,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom3,
                     },
                  ],
               },
               reviews: {
                  create: [
                     {
                        bookingId: uniqueIdBooking15,
                        propertyId: property15.id,
                        review: "Clean rooms and helpful staff, but breakfast options were limited.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking16,
                        propertyId: property16.id,
                        review: "A hidden gem! Perfect for a quiet escape.",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking17,
                        propertyId: property17.id,
                        review: "Beautiful property, though the rooms were a bit small.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking18,
                        propertyId: property18.id,
                        review: "Fantastic experience! The view and atmosphere were amazing.",
                        star: 10,
                     },
                     {
                        bookingId: uniqueIdBooking19,
                        propertyId: property19.id,
                        review: "Good for the price, but could improve on cleanliness.",
                        star: 6,
                     },
                     {
                        bookingId: uniqueIdBooking34,
                        propertyId: property6.id,
                        review: "Amazing value for money, clean rooms, and quick service.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking35,
                        propertyId: property7.id,
                        review: "The pool area was beautiful and relaxing, had a great time!",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking36,
                        propertyId: property8.id,
                        review: "Cozy and comfortable, though the Wi-Fi was a bit slow.",
                        star: 7,
                     },

                     {
                        bookingId: uniqueIdBooking28,
                        propertyId: property1.id,
                        review: "Amazing location, with cozy rooms and great amenities.",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking29,
                        propertyId: property2.id,
                        review: "The view was breathtaking, but the service could be improved.",
                        star: 7,
                     },
                  ],
               },
            },
         },
         accountProvider: "CREDENTIALS",
         wallet: { create: {} },
      },
   });

   const reine = await prisma.user.create({
      data: {
         name: "Pavolia Reine",
         email: "reine123@mail.com",
         password: hashedPassword,
         customer: {
            create: {
               refCode: crypto.randomBytes(6).toString("hex").toUpperCase(),
               bookings: {
                  create: [
                     {
                        id: uniqueIdBooking20,
                        startDate: new Date("2025-04-01"),
                        endDate: new Date("2025-04-10"),
                        bookingNumber: uniqueIdBooking20,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom22,
                     },
                     {
                        id: uniqueIdBooking21,
                        startDate: new Date("2025-04-11"),
                        endDate: new Date("2025-04-20"),
                        bookingNumber: uniqueIdBooking21,
                        paymentStatus: "PENDING",
                        roomId: uniqueIdRoom23,
                     },
                     {
                        id: uniqueIdBooking22,
                        startDate: new Date("2025-04-21"),
                        endDate: new Date("2025-04-30"),
                        bookingNumber: uniqueIdBooking22,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom24,
                     },
                     {
                        id: uniqueIdBooking23,
                        startDate: new Date("2025-05-01"),
                        endDate: new Date("2025-05-10"),
                        bookingNumber: uniqueIdBooking23,
                        paymentStatus: "PENDING",
                        roomId: uniqueIdRoom25,
                     },
                     {
                        id: uniqueIdBooking24,
                        startDate: new Date("2025-05-11"),
                        endDate: new Date("2025-05-20"),
                        bookingNumber: uniqueIdBooking24,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom26,
                     },
                     {
                        id: uniqueIdBooking25,
                        startDate: new Date("2025-05-21"),
                        endDate: new Date("2025-05-30"),
                        bookingNumber: uniqueIdBooking25,
                        paymentStatus: "PENDING",
                        roomId: uniqueIdRoom27,
                     },
                     {
                        id: uniqueIdBooking26,
                        startDate: new Date("2025-06-01"),
                        endDate: new Date("2025-06-10"),
                        bookingNumber: uniqueIdBooking26,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom28,
                     },
                     {
                        id: uniqueIdBooking27,
                        startDate: new Date("2025-01-10"),
                        endDate: new Date("2025-01-15"),
                        bookingNumber: uniqueIdBooking27,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom1,
                     },

                     {
                        id: uniqueIdBooking30,
                        startDate: new Date("2025-04-15"),
                        endDate: new Date("2025-04-20"),
                        bookingNumber: uniqueIdBooking30,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom4,
                     },
                     {
                        id: uniqueIdBooking31,
                        startDate: new Date("2025-05-01"),
                        endDate: new Date("2025-05-07"),
                        bookingNumber: uniqueIdBooking31,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom5,
                     },
                     {
                        id: uniqueIdBooking32,
                        startDate: new Date("2025-06-10"),
                        endDate: new Date("2025-06-15"),
                        bookingNumber: uniqueIdBooking32,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom6,
                     },
                     {
                        id: uniqueIdBooking33,
                        startDate: new Date("2025-07-01"),
                        endDate: new Date("2025-07-06"),
                        bookingNumber: uniqueIdBooking33,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom7,
                     },
                     {
                        id: uniqueIdBooking37,
                        startDate: new Date("2025-11-01"),
                        endDate: new Date("2025-11-05"),
                        bookingNumber: uniqueIdBooking37,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom11,
                     },
                     {
                        id: uniqueIdBooking38,
                        startDate: new Date("2025-11-10"),
                        endDate: new Date("2025-11-15"),
                        bookingNumber: uniqueIdBooking38,
                        paymentStatus: "PAID",
                        roomId: uniqueIdRoom12,
                     },
                  ],
               },
               reviews: {
                  create: [
                     {
                        bookingId: uniqueIdBooking20,
                        propertyId: property20.id,
                        review: "Great service, but the noise from outside was a bit disturbing.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking21,
                        propertyId: property21.id,
                        review: "Wonderful place with lots of amenities. Very family-friendly!",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking22,
                        propertyId: property22.id,
                        review: "Rooms were comfortable, but the location was a bit remote.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking23,
                        propertyId: property23.id,
                        review: "Exceptional service and lovely decor. Highly recommended.",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking24,
                        propertyId: property24.id,
                        review: "The property was nice, but the check-in process was slow.",
                        star: 6,
                     },
                     {
                        bookingId: uniqueIdBooking25,
                        propertyId: property25.id,
                        review: "Amazing experience! The ambiance was perfect.",
                        star: 10,
                     },
                     {
                        bookingId: uniqueIdBooking26,
                        propertyId: property26.id,
                        review: "Had a peaceful stay. Clean rooms and friendly staff.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking27,
                        propertyId: property1.id,
                        review: "A pleasant stay in this place.",
                        star: 9,
                     },

                     {
                        bookingId: uniqueIdBooking30,
                        propertyId: property2.id,
                        review: "A quiet and relaxing atmosphere, perfect for a weekend getaway.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking31,
                        propertyId: property3.id,
                        review: "Wonderful ambiance, and the view from the balcony was stunning.",
                        star: 9,
                     },
                     {
                        bookingId: uniqueIdBooking32,
                        propertyId: property4.id,
                        review: "Friendly staff, but the amenities could be better maintained.",
                        star: 7,
                     },
                     {
                        bookingId: uniqueIdBooking33,
                        propertyId: property5.id,
                        review: "Loved the quiet location, and the breakfast was delicious.",
                        star: 8,
                     },

                     {
                        bookingId: uniqueIdBooking37,
                        propertyId: property9.id,
                        review: "Excellent location, very accessible to main attractions.",
                        star: 8,
                     },
                     {
                        bookingId: uniqueIdBooking38,
                        propertyId: property10.id,
                        review: "Spacious rooms and a great restaurant, highly recommended.",
                        star: 9,
                     },
                  ],
               },
            },
         },
         accountProvider: "CREDENTIALS",
         wallet: { create: {} },
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
