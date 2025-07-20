import ResetPasswordForm from "@/components/common/ResetPasswordForm";
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";

const ResetPassword = () => {
  return (
    <>
      <Header1 />
      <div className="container py-40" style={{ marginTop: "100px" }}>
        <div className="row justify-center">
          <div className="col-xl-5 col-lg-7 col-md-10">
            <div className="bg-white px-30 py-40 rounded-4 shadow-4">
              <ResetPasswordForm />
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
};

export default ResetPassword;
