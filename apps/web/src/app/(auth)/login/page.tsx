import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
   return (
      <div className="h-full w-[375px] content-center self-center">
         <div className="h-fit w-full py-4">
            <LoginForm />
         </div>
      </div>
   );
}
