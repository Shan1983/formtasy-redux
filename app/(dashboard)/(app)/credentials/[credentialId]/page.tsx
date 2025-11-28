import { requireAuth } from "@/lib/auth/auth-utils";
import React from "react";

interface PageProps {
  params: Promise<{ credentialId: string }>;
}

const CredentialsPage = async ({ params }: PageProps) => {
  await requireAuth();
  const { credentialId } = await params;
  return <div>Credentials Id: {credentialId}</div>;
};

export default CredentialsPage;
