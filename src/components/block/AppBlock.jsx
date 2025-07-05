const AppBlock = () => {
  return (
    <>
      <h2 className="text-30 lh-15">Découvrez dès maintenant la dernière version de SmartAlert !</h2>
      <p className="text-dark-1 pr-40 lg:pr-0 mt-15 sm:mt-5">
        Trouvez sans effort votre voiture idéale au Maroc avec notre application multiplateforme.
        Toutes les annonces de véhicules en un seul endroit avec des notifications instantanées.
      </p>

      <div className="row items-center pt-30 sm:pt-10">
        <a href="https://apps.apple.com/us/app/smartalert/id6471924598" className="col-auto">
          <div className="d-flex items-center px-20 py-10 rounded-8 border-white-15 text-white bg-dark-3">
            <div className="icon-apple text-24" />
            <div className="ml-20">
              <div className="text-14">Télécharger sur</div>
              <div className="text-15 lh-1 fw-500">Apple Store</div>
            </div>
          </div>
        </a>
        {/* End .col */}

        <a href="https://play.google.com/store/apps/details?id=smartalert.app.exponent" className="col-auto">
          <div className="d-flex items-center px-20 py-10 rounded-8 border-white-15 text-white bg-dark-3">
            <div className="icon-play-market text-24" />
            <div className="ml-20">
              <div className="text-14">Disponible sur</div>
              <div className="text-15 lh-1 fw-500">Google Play</div>
            </div>
          </div>
        </a>
      </div>
      {/* End .row */}
    </>
  );
};

export default AppBlock;
