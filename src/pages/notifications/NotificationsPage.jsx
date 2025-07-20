import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1/index";
import Footer2 from "@/components/footer/footer-2";
import Notifications from "@/components/notifications";

const metadata = {
  title: "Notifications || SMARTALERT",
  description: "SMARTALERT Notifications - Consultez toutes les notifications importantes concernant votre compte et vos activités.",
};
export default function NotificationsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <div className="header-margin"></div>
      <Notifications />
      <Footer2 />
    </>
  )
}

  

