import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface SubmitButtonProps {
  label: string;
  isPending: boolean;
  isCreate: boolean;
}
const SubmitButton = ({ label, isPending, isCreate }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={` ${isPending ? "opacity-50" : "opacity-100"} w-full`}
    >
      {isPending ? (
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
