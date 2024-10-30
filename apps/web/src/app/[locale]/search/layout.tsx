import Footer from "@/components/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <main className="bg-background h-full min-h-screen">{children}</main>
         <Footer />
      </>
   );
}
