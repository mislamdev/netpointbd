import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./LoginForm";
import "../admin.css";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <h1 className="admin-login__title">Net Point BD Admin</h1>
        <p className="admin-login__sub">Sign in to manage site content.</p>
        <LoginForm />
      </div>
    </div>
  );
}
