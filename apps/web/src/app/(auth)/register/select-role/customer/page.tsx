import CredentialForm from "@/components/auth/CredentialForm";

export default function CustomerRegisterPage() {
   return (
      <div className="h-full w-[375px] content-center self-center">
         <div className="h-fit w-full py-4">
            <CredentialForm role="customer" />
         </div>
      </div>
   );
}
