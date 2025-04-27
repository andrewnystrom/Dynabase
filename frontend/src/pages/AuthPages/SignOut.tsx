import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignOutForm from "../../components/auth/SignOutForm";

export default function SignOut() {
  return (
    <>
      <PageMeta
        title="React.js SignOut Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignOutForm />
      </AuthLayout>
    </>
  );
}
