import React, { useEffect, useState, useRef } from "react";
import MateriaPanel from "./MateriaPanel";
import EquipmentSelection from "../Equipment/EquipmentSelection";
import "./Materia.css";

import axios from "axios";

// https://damp-reaches-02112.herokuapp.com/
// const MATERIA_URL = "http://localhost:3000/materia";
const MATERIA_URL = "https://damp-reaches-02112.herokuapp.com/materia";

const Materia = ({ setEq, setComparisonEq, mat1, mat2, mat3, mat4 }) => {
  const [fetchComplete, setFetchComplete] = useState(false);
  useEffect(() => {
    const fetchEquipmentList = async () => {
      const res = await axios.get(MATERIA_URL);
      setmateriaList(res.data);
    };
    fetchEquipmentList();
  }, []);

  const compDidMount = useRef(true);
  useEffect(() => {
    if (compDidMount.current) {
      compDidMount.current = false;
      return;
    }
  }, []);

  const [isEqSelectOpen, setIsEqSelectOpen] = useState("");
  useEffect(() => {
    if (isEqSelectOpen && !compDidMount.current) {
      setDisplayEqSelection({ flag: true, activeSlot: isEqSelectOpen });
    } 
    // else if (!isEqSelectOpen && !compDidMount.current) {//Uncomment if lower resource cost is preferred over quicker load time
    //   const timeout = setTimeout(() => {
    //     setDisplayEqSelection({ flag: false, activeSlot: isEqSelectOpen });
    //   }, 300);
    //   return () => {
    //     clearTimeout(timeout);
    //   };
    // }
  }, [isEqSelectOpen]);

  const [materiaList, setmateriaList] = useState([]);

  const [displayEqSelection, setDisplayEqSelection] = useState({
    flag: false,
    activeSlot: "",
  });

  const renderMateriaSelection = () => {
    return (
      <EquipmentSelection
        eqList={materiaList}
        setDisplayEqSelection={setIsEqSelectOpen}
        setEq={setEq}
        setComparisonEq={setComparisonEq}
        activeSlot={displayEqSelection.activeSlot}
      />
    );
  };

  return (
    <div className="materia-top-container">
      <div className="materia-container">
        <MateriaPanel
          className="materia-1"
          slot="materia1"
          info={mat1}
          onClick={() => {
            setIsEqSelectOpen("materia1");
          }}
        />
        <MateriaPanel
          className="materia-2"
          slot="materia2"
          info={mat2}
          onClick={() => {
            setIsEqSelectOpen("materia2");
          }}
        />
        <MateriaPanel
          className="materia-3"
          slot="materia3"
          info={mat3}
          onClick={() => {
            setIsEqSelectOpen("materia3");
          }}
        />
        <MateriaPanel
          className="materia-4"
          slot="materia4"
          info={mat4}
          onClick={() => {
            setIsEqSelectOpen("materia4");
          }}
        />
      </div>
      <div
        className={
          isEqSelectOpen
            ? "materia-selection-container slide-in"
            : "materia-selection-container slide-out"
        }
      >
        {displayEqSelection.flag ? renderMateriaSelection() : null}
      </div>
    </div>
  );
};

export default React.memo(Materia);
