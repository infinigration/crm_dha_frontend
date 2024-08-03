import React from "react";

const Table = ({ thList = [], tdList = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          {thList && thList.length > 0 ? thList.map((t) => <th>{t}</th>) : ""}
        </tr>
      </thead>

      <tbody>
        <tr>
          {tdList && tdList.length > 0 ? tdList.map((t) => <td>{t}</td>) : ""}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
