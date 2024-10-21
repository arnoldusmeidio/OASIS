import Navbar from "@/components/Navbar";

export default function TenantLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Navbar />
         <main className="flex justify-center overflow-y-auto px-4">{children}</main>;
      </>
   );
}
