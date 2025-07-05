const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Service client",
      action: "tel:+(212) 6 51 01 95 65",
      text: "+(212) 6 51 01 95 65",
    },
    {
      id: 2,
      title: "Besoin de support?",
      action: "mailto:contact@b2blink.ma",
      text: "contact@b2blink.ma",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mb-20" key={item.id}>
          <div className={"text-14"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 text-dark-1 mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
