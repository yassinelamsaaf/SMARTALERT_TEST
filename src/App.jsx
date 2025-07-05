import Aos from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SrollTop from "./components/common/ScrollTop";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import { fetchPromoCars } from "./features/cars/promoCarsSlice";
import { fetchBrandCriteria } from "./features/filters/brandCriteriaSlice";
import { fetchChipCriteria } from "./features/filters/chipCriteriaSlice";
import { fetchCityCriteria } from "./features/filters/cityCriteriaSlice";
import { fetchSliderCriteria } from "./features/filters/sliderCriteriaSlice";
import { fetchSourceCriteria } from "./features/filters/sourceCriteriaSlice";
import { LanguageContext } from "./i18n/LanguageProvider";
import { AlertListPage } from "./pages/alerts/index.jsx";
import { AlertInfo } from "./pages/alerts/alertInfo.jsx"
import CarListPage2 from "./pages/car/car-list-v2";
import CarSingleV1Dynamic from "./pages/car/car-single/indexNew";
import Home_2 from "./pages/homes/home_2";
import HotelSingleV1Dynamic from "./pages/hotel/hotel-single-v1";
import NotFoundPage from "./pages/not-found";
import About from "./pages/others/about";
import LogIn from "./pages/others/login";
import SignUp from "./pages/others/signup";
import Terms from "./pages/others/terms";
import { store } from "./store/store";
import "./styles/index.scss";
import CreateAlert from "./pages/alerts/createAlert";

if (typeof window !== "undefined") {
  import("bootstrap");
}


import ActivateAccount from "./pages/others/activate";
import PhoneVerification from "./components/phoneVerification";
import SettingsPage from "./pages/settings";
import ChatbotFloatingButton from "./components/chatbot/ChatbotFloatingButton";

import WishlistPage from "./pages/favoris/WishlistPage";
import AnnoncePage from "./pages/annonce/AnnoncePage";


function App() {
  const dispatch = useDispatch();
  const {lang} = useContext(LanguageContext);
  useEffect(() => {
    dispatch(fetchBrandCriteria());
    dispatch(fetchCityCriteria());
    dispatch(fetchSourceCriteria());
    dispatch(fetchChipCriteria());
    dispatch(fetchSliderCriteria());
    dispatch(fetchPromoCars())
  }, [dispatch]);


  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie     : true,
        xfbml      : true,
        version    : 'v19.0'
      });
    };
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <main>
      <Provider store={store}>
        <BrowserRouter basename={"/smartalert"}>
            <Routes>
              <Route path="/" index element={<Home_2 />} />

              <Route path="occasion" element={<CarListPage2 />} />
              <Route path="neuve" element={<CarListPage2 />} />

              <Route path="neuve/:id" element={<HotelSingleV1Dynamic />} />
              <Route path="occasion/:id" element={<CarSingleV1Dynamic />} />

              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />

              <Route path="about" element={<About />} />
              <Route path="terms" element={<Terms />} />

              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="PhoneVerification" element={<PhoneVerification/>}/> 
              <Route path="reglages" element={<SettingsPage/>}></Route>


              <Route path="alerts" element={<AlertListPage />} />
              <Route path="alerts/:id" element={<AlertInfo />} />
              <Route path="alerts/add" element={<CreateAlert />} />

              <Route path="favoris" element={<WishlistPage/>}/>
              <Route path="vitrine" element={<AnnoncePage/>}/>


              <Route path="activate" element={<ActivateAccount />} />

            </Routes>
            <ScrollTopBehaviour />
            <ChatbotFloatingButton />
        </BrowserRouter>
        <SrollTop />
      </Provider>
    </main>
  );
}

export default App;
