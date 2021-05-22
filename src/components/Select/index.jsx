import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as SelectorArrow } from "../../assets/selector-arrow.svg";

const Select = ({ children }) => (
  <div className="relative w-full">
    <select className="p-2 w-full text-gray-400 bg-white rounded-md focus:outline-none appearance-none ring-gray-300 focus:ring-yellow-300 ring-1 focus:ring-2">
      {children}
    </select>
    <span className="absolute inset-y-0 right-0 flex items-center ml-3 pr-2 pointer-events-none">
      <SelectorArrow />
    </span>
  </div>
);

Select.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Select;
