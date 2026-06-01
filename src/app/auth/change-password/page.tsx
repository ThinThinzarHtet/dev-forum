import { Suspense } from "react";
import ChangePasswordForm from "@/features/auth/components/ChangePasswordForm";

function ChangePassword() {
  return (
    <Suspense fallback={<p className="text-black dark:text-white">Loading...</p>}>
      <ChangePasswordForm />
    </Suspense>
  );
}

export default ChangePassword;
