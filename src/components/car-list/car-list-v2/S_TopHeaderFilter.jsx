const TopHeaderFilter = ({ announcements_count = 0 }) => {
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="text-18">
            <span className="fw-500">{announcements_count} properties</span> in Europe
          </div>
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default TopHeaderFilter;
