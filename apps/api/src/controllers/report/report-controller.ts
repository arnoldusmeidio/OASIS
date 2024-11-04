import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";

// GET /sales-report
export const getSalesReport = async (req: Request, res: Response) => {
   const id = (req as RequestWithUserId).user?.id;

   const { startDate, endDate, sortBy = "date", order = "asc" } = req.query;

   const user = await prisma.user.findUnique({
      where: { id },
      include: { tenant: true },
   });

   const tenantId = user?.tenant?.id;

   if (!tenantId) {
      return res.status(400).json({ message: "Tenant ID not found" });
   }

   try {
      // Query to fetch bookings with filters and sorting
      const report = await prisma.booking.findMany({
         where: {
            room: {
               property: { tenantId }, // Filter by tenant's properties
            },
            startDate: { gte: startDate ? new Date(startDate as string) : undefined },
            endDate: { lte: endDate ? new Date(endDate as string) : undefined },
            paymentStatus: "PAID", // Only consider paid bookings
         },
         select: {
            id: true,
            startDate: true,
            endDate: true,
            amountToPay: true,
            room: {
               select: {
                  property: { select: { name: true, address: true } },
               },
            },
         },
         orderBy: [
            sortBy === "totalSales"
               ? { amountToPay: order === "asc" ? "asc" : "desc" }
               : { startDate: order === "asc" ? "asc" : "desc" },
         ],
      });

      // Summing up total sales per property
      const salesReport = report.reduce(
         (acc, booking) => {
            const property = booking.room.property.name;
            acc[property] = (acc[property] || 0) + booking.amountToPay;
            return acc;
         },
         {} as Record<string, number>,
      );

      res.json({ report, salesReport });
   } catch (error) {
      res.status(500).json({ error: "Failed to generate sales report." });
   }
};

// GET /monthly-sales-report
export const getMonthlySalesReport = async (req: Request, res: Response) => {
   const id = (req as RequestWithUserId).user?.id;
   const { startDate, endDate } = req.query;

   const user = await prisma.user.findUnique({
      where: { id },
      include: { tenant: true },
   });

   const tenantId = user?.tenant?.id;

   if (!tenantId) {
      return res.status(400).json({ message: "Tenant ID not found" });
   }

   try {
      const bookings = await prisma.booking.findMany({
         where: {
            room: {
               property: { tenantId },
            },
            paymentStatus: "PAID", // Only consider paid bookings
            startDate: { gte: new Date(startDate as string), lte: new Date(endDate as string) },
         },
         select: {
            id: true,
            startDate: true,
            amountToPay: true,
            room: {
               select: {
                  property: { select: { name: true, address: true } },
               },
            },
         },
         orderBy: { startDate: "asc" },
      });

      // Process bookings to group by month and calculate monthly totals
      const monthlySales: Record<string, Record<string, number>> = {};

      bookings.forEach((booking) => {
         const month = booking.startDate.toISOString().slice(0, 7); // Format as YYYY-MM
         const propertyName = booking.room.property.name;

         // Initialize month and property in the monthlySales object
         if (!monthlySales[month]) {
            monthlySales[month] = {};
         }
         if (!monthlySales[month][propertyName]) {
            monthlySales[month][propertyName] = 0;
         }

         // Accumulate total sales for the property within the month
         monthlySales[month][propertyName] += booking.amountToPay;
      });

      res.json({ monthlySales });
   } catch (error) {
      res.status(500).json({ error: "Failed to generate monthly sales report." });
   }
};
