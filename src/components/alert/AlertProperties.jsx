import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/sass/alerts/AlertProperties.scss";
import { AlertCard } from "./alertCard";
import { getImgPath } from "../../utils/imageUtils";

const AlertProperties = ({
  alerts = [],
  deleteMode = false,
  selected = [],
  setSelected,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (alert) => {
    console.log({ DeletingThisAlert: alert });
    if (deleteMode) {
      setSelected((prev) => {
        if (prev.includes(alert.alert.id)) {
          return prev.filter((id) => id !== alert.alert.id);
        } else {
          return [...prev, alert.alert.id];
        }
      });
    } else {
      navigate(`/alerts/${alert.id}`);
    }
  };

  return (
    <>
      {alerts.length === 0 ? (
        <div
          className="text-center text-light-1 py-40 w-100"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <img
            src={getImgPath("pages/alerts/no-result-found.png")}
            alt="No alert found"
          />
        </div>
      ) : (
        <div className="row y-gap-20">
          {alerts.map((alert, idx) => {
            return (
              <AlertCard
                key={alert.alert.id}
                idx={idx}
                alert={alert}
                deleteMode={deleteMode}
                selected={selected.includes(alert.alert.id)}
                handleCardClick={handleCardClick}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default AlertProperties;
