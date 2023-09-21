import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRekening } from "../store/action/rekening";

const Rekening = () => {
  const dispatch = useDispatch();

  const { Rekenings } = useSelector((state) => state.RekeningReducer);

  useEffect(() => {
    dispatch(fetchRekening());
  }, []);
  console.log(Rekenings);

  return <div>Rekening</div>;
};

export default Rekening;
