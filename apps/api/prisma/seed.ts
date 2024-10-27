import prisma from "./client";
import { genSalt, hash } from "bcrypt";
import crypto from "crypto";

async function inputData() {
   console.log("Start seeding...\n");
   const salt = await genSalt(10);
   const hashedPassword = await hash("password", salt);

   const budi = await prisma.user.create({
      data: {
         name: "Budi",
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

   await prisma.property.create({
      data: {
         name: "Super Villa",
         address: "Bali",
         description: "Cozy place",
         category: "Vila",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
         },
         tenantId: budi.id,
         room: {
            createMany: {
               data: [
                  {
                     type: "Luxury",
                     description: "Luxury",
                     pictureUrl:
                        "https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                     price: 500000,
                     roomCapacity: 3,
                  },
                  {
                     type: "Standard",
                     description: "Standard",
                     pictureUrl:
                        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                     price: 300000,
                     roomCapacity: 2,
                  },
               ],
            },
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Villa Aja",
         address: "Bali",
         description: "Standard place",
         category: "Vila",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
         },
         tenantId: budi.id,
         room: {
            createMany: {
               data: [
                  {
                     type: "Luxury",
                     description: "Luxury",
                     pictureUrl:
                        "https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                     price: 500000,
                     roomCapacity: 3,
                  },
                  {
                     type: "Standard",
                     description: "Standard",
                     pictureUrl:
                        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                     price: 300000,
                     roomCapacity: 2,
                  },
               ],
            },
         },
      },
   });
   await prisma.property.create({
      data: {
         name: "hotel bali 1",
         address: "Bali",
         description: "Standard place",
         category: "Hotel",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
         },
         tenantId: budi.id,
         room: {
            createMany: {
               data: [
                  {
                     type: "Luxury",
                     description: "Luxury",
                     pictureUrl:
                        "https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                     price: 500000,
                     roomCapacity: 3,
                  },
                  {
                     type: "Standard",
                     description: "Standard",
                     pictureUrl:
                        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                     price: 300000,
                     roomCapacity: 2,
                  },
               ],
            },
         },
      },
   });
   await prisma.property.create({
      data: {
         name: "motel jakarta",
         address: "ini motel",
         description: "Standard place",
         category: "Motel",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
         },
         tenantId: budi.id,
         room: {
            createMany: {
               data: [
                  {
                     type: "Luxury",
                     description: "Luxury",
                     pictureUrl:
                        "https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                     price: 500000,
                     roomCapacity: 3,
                  },
                  {
                     type: "Standard",
                     description: "Standard",
                     pictureUrl:
                        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                     price: 300000,
                     roomCapacity: 2,
                  },
               ],
            },
         },
      },
   });
   await prisma.property.create({
      data: {
         name: "Bali Villa",
         address: "Jl. Sunset Road No.5, Bali",
         description: "Luxurious villa with a private pool.",
         category: "Vila",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Deluxe",
                  description: "Elegant villa with ocean view.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1590650046499-e1aef6b62a9b?q=80&w=2070&auto=format&fit=crop",
                  price: 1500000,
                  roomCapacity: 6,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Jakarta Hotel",
         address: "Jl. Thamrin No.10, Jakarta",
         description: "Comfortable hotel in the city center.",
         category: "Hotel",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1589927986089-3581237898c8?q=80&w=2070&auto=format&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Standard",
                  description: "Cozy room with essential amenities.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1574169208502-8c6f2e4d6b4d?q=80&w=2070&auto=format&fit=crop",
                  price: 700000,
                  roomCapacity: 2,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Surabaya Apartment",
         address: "Jl. Basuki Rahmat No.20, Surabaya",
         description: "A modern apartment in Surabaya.",
         category: "Apartment",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Luxury",
                  description: "Spacious apartment with city view.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1590650046499-e1aef6b62a9b?q=80&w=2070&auto=format&fit=crop",
                  price: 800000,
                  roomCapacity: 5,
               },
               {
                  type: "Standard",
                  description: "Comfortable apartment with essential facilities.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1590650046499-e1aef6b62a9b?q=80&w=2070&auto=format&fit=crop",
                  price: 600000,
                  roomCapacity: 3,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Bandung Cottage",
         address: "Jl. Cihampelas No.15, Bandung",
         description: "Charming cottage surrounded by nature.",
         category: "Cottage",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1589927986089-3581237898c8?q=80&w=2070&auto=format&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Family Room",
                  description: "Spacious family room with garden view.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1589927986089-3581237898c8?q=80&w=2070&auto=format&fit=crop",
                  price: 900000,
                  roomCapacity: 4,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Lombok Resort",
         address: "Jl. Pantai Kuta No.12, Lombok",
         description: "Relaxing resort by the beach.",
         category: "Resort",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d5?q=80&w=2070&auto=format&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Ocean View Suite",
                  description: "Luxurious suite with ocean view.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
                  price: 2500000,
                  roomCapacity: 2,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Yogyakarta Hostel",
         address: "Jl. Prawirotaman No.8, Yogyakarta",
         description: "Affordable hostel with a friendly atmosphere.",
         category: "Hostel",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d5?q=80&w=2070&auto=format&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Dormitory Bed",
                  description: "Shared dormitory bed in a vibrant environment.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1574169208502-8c6f2e4d6b4d?q=80&w=2070&auto=format&fit=crop",
                  price: 150000,
                  roomCapacity: 1,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Bali Motel",
         address: "Jl. Legian No.15, Bali",
         description: "Budget-friendly motel near the beach.",
         category: "Motel",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d5?q=80&w=2070&auto=format&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Standard Room",
                  description: "Basic amenities for a comfortable stay.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1589927986089-3581237898c8?q=80&w=2070&auto=format&fit=crop",
                  price: 400000,
                  roomCapacity: 2,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Jakarta House",
         address: "Jl. Kebon Sirih No.20, Jakarta",
         description: "Cozy house in a quiet neighborhood.",
         category: "House",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d5?q=80&w=2070&auto=format&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Master Bedroom",
                  description: "Spacious bedroom with attached bathroom.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1589927986089-3581237898c8?q=80&w=2070&auto=format&fit=crop",
                  price: 1200000,
                  roomCapacity: 2,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Bali Resort",
         address: "Jl. Ubud No.1, Bali",
         description: "Luxury resort with spa services.",
         category: "Resort",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d5?q=80&w=2070&auto=format&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Spa Suite",
                  description: "Relaxing suite with spa access.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1589927986089-3581237898c8?q=80&w=2070&auto=format&fit=crop",
                  price: 3000000,
                  roomCapacity: 2,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Semarang Villa",
         address: "Jl. Diponegoro No.25, Semarang",
         description: "Charming villa with traditional architecture.",
         category: "Vila",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format=&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Deluxe Room",
                  description: "Luxurious room with garden view.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1590650046499-e1aef6b62a9b?q=80&w=2070&auto=format=&fit=crop",
                  price: 1800000,
                  roomCapacity: 3,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Medan Motel",
         address: "Jl. Sisingamangaraja No.30, Medan",
         description: "Simple motel for budget travelers.",
         category: "Motel",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d5?q=80&w=2070&auto=format=&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Single Room",
                  description: "Basic single occupancy with shared facilities.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1589927986089-3581237898c8?q=80&w=2070&auto=format=&fit=crop",
                  price: 300000,
                  roomCapacity: 1,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Canggu House",
         address: "Jl. Batu Bolong No.15, Canggu",
         description: "Modern house close to the beach.",
         category: "House",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d5?q=80&w=2070&auto=format=&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Family Suite",
                  description: "Spacious suite for families.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1589927986089-3581237898c8?q=80&w=2070&auto=format=&fit=crop",
                  price: 2000000,
                  roomCapacity: 5,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Nusa Dua Resort",
         address: "Jl. Nusa Dua No.10, Bali",
         description: "Exclusive resort with private beach access.",
         category: "Resort",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d5?q=80&w=2070&auto=format=&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Beachfront Villa",
                  description: "Luxury villa right on the beach.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1589927986089-3581237898c8?q=80&w=2070&auto=format=&fit=crop",
                  price: 5000000,
                  roomCapacity: 2,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Bali Cottage",
         address: "Jl. Ubud No.18, Bali",
         description: "Cozy cottage surrounded by rice fields.",
         category: "Cottage",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format=&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Garden Room",
                  description: "Charming room with garden access.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1590650046499-e1aef6b62a9b?q=80&w=2070&auto=format=&fit=crop",
                  price: 900000,
                  roomCapacity: 2,
               },
            ],
         },
      },
   });

   await prisma.property.create({
      data: {
         name: "Bogor Hotel",
         address: "Jl. Raya Puncak No.22, Bogor",
         description: "Comfortable hotel in the hills.",
         category: "Hotel",
         pictureUrl: {
            create: {
               name: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format=&fit=crop",
            },
         },
         tenantId: budi.id,
         room: {
            create: [
               {
                  type: "Executive Room",
                  description: "Luxurious room with mountain view.",
                  pictureUrl:
                     "https://images.unsplash.com/photo-1590650046499-e1aef6b62a9b?q=80&w=2070&auto=format=&fit=crop",
                  price: 1200000,
                  roomCapacity: 3,
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
