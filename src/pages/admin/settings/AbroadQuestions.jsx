import React from "react";
import { Link } from "react-router-dom";

const AbroadQuestions = () => {
  return (
    <section className="section" id="abroad-questions">
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Program</th>
            <th>Questions</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>01</td>
            <td>USA</td>
            <td>0</td>
            <td className="actions">
              <Link to={"123"}>View</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default AbroadQuestions;
