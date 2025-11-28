import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth/auth-utils";

const LoginPage = async () => {
  await requireUnAuth();

  return <LoginForm />;
};

export default LoginPage;
