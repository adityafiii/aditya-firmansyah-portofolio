import { redirect } from "next/navigation";

export default function AdminRoot() {
  // Redirect langsung ke halaman login admin
  redirect("/admin/login");
  return null;
}