import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
  isCreate: boolean;
}
const SubmitButton = ({ label, isCreate }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className={pending ? "opacity-50" : "opacity-100"}
    >
      {pending ? (
        <div className="flex gap-2 items-center">
          <LoaderCircle className="animate-spin" size={16} />{" "}
          <span>{isCreate ? "Creating..." : "Updating..."}</span>
        </div>
      ) : (
        <p>{label}</p>
      )}
    </Button>
  );
};

export default SubmitButton;
