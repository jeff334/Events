import { createContext, useState } from "react";

export const displayContext = createContext({
  nameOfEvent: "",
  date: null,
  time: "",
  address: "",
  note: "",
  setNameOfEvent: () => {},
  setDate: () => {},
  setTime: () => {},
  setAddress: () => {},
  setNote: () => {},
  completedIds: [],
  setCompletedIds: () => {},
  //stores event rows so they persist between pages
  rows: [],
  setRows: () => {},
});

export function DisplayProvider({ children }) {
  const [nameOfEvent, setNameOfEvent] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [completedIds, setCompletedIds] = useState([]);

  //stores event rows so they persist between pages
  const [rows, setRows] = useState([]);

  return (
    <displayContext.Provider
      value={{
        nameOfEvent,
        date,
        time,
        address,
        note,
        completedIds,
        //stores event rows so they persist between pages
        rows,
        setRows,
        setNameOfEvent,
        setDate,
        setTime,
        setAddress,
        setNote,
        setCompletedIds,
      }}
    >
      {children}
    </displayContext.Provider>
  );
}
