import Navbar from "@/components/Navbar";

export default function page({ params }: { params: { slug: string } }) {
   return (
      <>
         <Navbar />
         <div className="mx-auto max-w-7xl p-6 lg:px-8">{params.slug}</div>;
      </>
   );
}
