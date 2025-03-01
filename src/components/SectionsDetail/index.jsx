import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useSelector } from "react-redux";
import { selectLineByLineId } from "../../pages/Lines/slice";
import SectionsDetailList from "../SectionsDetailList";

const SectionsDetail = ({ lineId }) => {
  const line = useSelector((state) => selectLineByLineId(state, lineId));

  return (
    Boolean(line) && (
      <div className="border rounded-md">
        <h3
          className={cx(
            "pl-4 py-2 text-gray-800 text-xl rounded-t-md",
            line.color
          )}
        >
          {line.name}
        </h3>
        <SectionsDetailList stations={line.stations} lineId={lineId} />
      </div>
    )
  );
};

SectionsDetail.propTypes = {
  lineId: PropTypes.number,
};

SectionsDetail.defaultProps = {
  lineId: null,
};

export default SectionsDetail;
