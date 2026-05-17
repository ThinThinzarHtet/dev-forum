import { ResetPasswordEmailTemplate } from "@/features/auth/components/ResetPasswordEmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Options {
  to: string;
  subject: string;
  resetPasswordLink: string;
  userFirstname: string;
}

export const sendEmail = async ({
  to,
  subject,
  userFirstname,
  resetPasswordLink,
}: Options) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "DevForum <onboarding@resend.dev>",
      to,
      subject,
      react: ResetPasswordEmailTemplate({
        userFirstname,
        resetPasswordLink,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
