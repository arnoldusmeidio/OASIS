"use client";

import { useRouter } from "next/navigation";

interface LogoutButtonProps {
   children: React.ReactNode;
   mode?: "modal" | "redirect";
   asChild?: boolean;
}

export default function LogoutButton({ children, mode = "redirect", asChild }: LogoutButtonProps) {
   const router = useRouter();

   const onClick = async () => {
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/logout`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
         });
         // const data = await response.json();
         // if (!response.ok) {
         //   if (data.message) {
         //     toast.error(data.message);
         //   } else {
         //     toast.error(data.errors[0].message);
         //   }
         // } else {
         //   toast.success(data.message);
         router.push("/login");
         router.refresh();
         // }
      } catch (error) {
         console.error(error);
      }
   };

   if (mode === "modal") {
      return <span>TODO: Implement modal!</span>;
   }

   return (
      <span onClick={onClick} className="cursor-pointer">
         {children}
      </span>
   );
}
