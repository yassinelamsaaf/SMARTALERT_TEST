const TopHeaderFilter = () => {
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto"></div>
        {/* End .col */}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -brown-2 h-40 px-20 rounded-100 bg-brown-2-05 text-15 text-brown-2"
              >
                {/* <i className="icon-up-down text-14 mr-10" />
                Filtrer */}
                <i className="icon-search text-20 mr-10" />
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default TopHeaderFilter;
