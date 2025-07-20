
import AvatarUploader from "./AvatarUploader";
import ChangeAliasModal from "@/components/settings/ChangeAliasModal";
import DeleteAccountModal from "@/components/settings/DeleteAccountModal";
import LogoutModal from "@/components/settings/LogoutModal";
import { useNavigate } from "react-router-dom";

const PersonalInfo = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <form> */}
        {/* <AvatarUploader />
        End AvatarUploader */}

        <div className="border-top-light mt-30 mb-30" />

        {/* <div className="col-xl-9">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-12">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">
                  Business Name
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">User Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">First Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">Last Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">Email</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">
                  Phone Number
                </label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">Birthday</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-input ">
                <textarea required rows={5} defaultValue={""} />
                <label className="lh-1 text-16 text-light-1">
                  About Yourself
                </label>
              </div>
            </div>
          </div>
        </div> */}

        <div className="d-flex flex-wrap gap-3 pt-30">
          <button type="button" className="btn btn-outline-primary" onClick={() => window.dispatchEvent(new Event("openAliasModal"))}>
            Change Alias
          </button>
          <button type="button" className="btn btn-outline-danger" onClick={() => window.dispatchEvent(new Event("openDeleteModal"))}>
            Delete Account
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => window.dispatchEvent(new Event("openLogoutModal"))}>
            Logout
          </button>
          <button type="button" className="btn btn-outline-success" onClick={() => navigate("/PhoneVerification")}> 
            Add Phone
          </button>
        </div>

      {/* </form> */}
      {/* Modals rendered globally so they can be triggered by events */}
      <ChangeAliasModal />
      <DeleteAccountModal />
      <LogoutModal />
    </>
  );
};

export default PersonalInfo;
