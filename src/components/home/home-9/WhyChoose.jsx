import { getImgPath } from "../../../utils/imageUtils";
const WhyChoose = () => {
  const whyChooseContent = [
    {
      id: 1,
      icon: getImgPath("featureIcons/3/1.svg"),
      title: "Best Price Guarantee",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      delayAnimaion: "100",
    },
    {
      id: 2,
      icon: getImgPath("featureIcons/3/2.svg"),
      title: "Easy & Quick Booking",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      delayAnimaion: "200",
    },
    {
      id: 3,
      icon: getImgPath("featureIcons/3/3.svg"),
      title: "Awesome Perfect Location",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      delayAnimaion: "300",
    },
    {
      id: 4,
      icon: getImgPath("featureIcons/3/4.svg"),
      title: "Customer Care 24/7",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      delayAnimaion: "400",
    },
  ];

  return (
    <>
      {whyChooseContent.map((item) => (
        <div
          className="col-sm-6"
          data-aos="fade-up"
          data-aos-delay={item.delayAnimaion}
          key={item.id}
        >
          <img src={item.icon} alt="image" className="size-60" />
          <h5 className="text-18 fw-500 mt-10">{item.title}</h5>
          <p className="mt-10">{item.text}</p>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
