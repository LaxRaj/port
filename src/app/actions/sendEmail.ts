"use server";

export interface SendEmailPayload {
  toName: string;
  fromEmail: string;
  subject: string;
  message: string;
}

export async function sendEmail(payload: SendEmailPayload) {
  if (!payload.fromEmail || !payload.subject || !payload.message) {
    return { ok: false, error: "Missing required fields." };
  }

  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true };
}
