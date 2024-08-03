import React from "react";
import { Link } from "react-router-dom";

const AddQuestions = () => {
  return (
    <section className="section" id="add-questions">
      <div className="actions-row">
        <Link className="primary-btn">Add New</Link>
      </div>

      <table>
        <thead></thead>
      </table>
    </section>
  );
};

export default AddQuestions;
