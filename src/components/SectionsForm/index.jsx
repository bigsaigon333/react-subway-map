import React from "react";
import PropTypes from "prop-types";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../@shared/Input/hooks";
import { useDistanceInput } from "../LinesForm/hooks";
import { selectStationsList } from "../../pages/Stations/slice";
import { addSection, selectLineByLineId } from "../../pages/Lines/slice";
import Select from "../@shared/Select";
import FloatingLabelInput from "../@shared/FloatingLabelInput";
import Button from "../@shared/Button";
import ListSelect from "../ListSelect";

const SectionsForm = ({ lineId, onSubmit }) => {
  const dispatch = useDispatch();
  const stationList = useSelector(selectStationsList);
  const line = useSelector((state) => selectLineByLineId(state, lineId));

  const [upStationId, handleUpStationIdChange] = useInput();
  const [downStationId, handleDownStationIdChange] = useInput();
  const [distance, handleDistanceChange, isValidDistance] = useDistanceInput();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(
        addSection({
          lineId,
          upStationId,
          downStationId,
          distance,
        })
      );
      await unwrapResult(result);
      onSubmit();
    } catch {
      /* do nothing */
    }
  };

  const isSubmitEnabled = [
    lineId,
    upStationId !== "",
    downStationId !== "",
    upStationId !== downStationId,
    isValidDistance,
  ].every(Boolean);

  return (
    Boolean(line) && (
      <form
        className="flex flex-col items-center px-4 py-12 w-144 bg-white rounded-lg shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 pb-6 text-center text-2xl">구간 추가</h2>

        <Select value={lineId} disabled>
          <option value={lineId}>{line.name}</option>
        </Select>

        <div className="flex mx-4 my-10 w-full">
          <ListSelect
            value={upStationId}
            onChange={handleUpStationIdChange}
            list={stationList}
            placeholder="상행역"
          />
          <span className="mx-6 text-gray-400 text-3xl">⬌</span>
          <ListSelect
            value={downStationId}
            onChange={handleDownStationIdChange}
            list={stationList}
            placeholder="하행역"
          />
        </div>

        <FloatingLabelInput
          type="number"
          id="line-distance"
          label="거리"
          value={distance}
          onChange={handleDistanceChange}
          isValid={isValidDistance}
        />

        <div className="flex justify-end mr-4 mt-14 w-full space-x-4">
          <Button
            type="button"
            size="medium"
            theme="secondary"
            onClick={onSubmit}
          >
            취소
          </Button>
          <Button type="submit" size="medium" disabled={!isSubmitEnabled}>
            확인
          </Button>
        </div>
      </form>
    )
  );
};

SectionsForm.propTypes = {
  lineId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SectionsForm;
