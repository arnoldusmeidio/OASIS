import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Navbar />
         <main className="flex h-full min-h-screen flex-1 items-center justify-center overflow-y-auto px-4">
            {children}
         </main>
         <Footer />
      </>
   );
}
