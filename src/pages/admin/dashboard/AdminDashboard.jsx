import React, { useEffect, useState } from "react";
import AdminData from "../../../componets/admin data/AdminData";
import "./admin-dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeads } from "../../../redux/actions/leads";
import { getDashboardStats } from "../../../redux/actions/other";

import FilteredLeads from "../../../componets/filter_leads/FilteredLeads";
import FilterLeads from "../../../componets/filter_leads/FilterLeads";

const AdminDashboard = () => {
  const [date, setDate] = useState("");
  const [employee, setEmployee] = useState("");
  const [delay, setDelay] = useState("");

  console.log(date);
  console.log(employee);
  console.log(delay);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLeads());
    dispatch(getDashboardStats());
  }, []);

  const { stats } = useSelector((state) => state.other);
  return (
    <section className="section" id="admin-dashboard">
      <FilterLeads
        date={date}
        onDateChange={(e) => setDate(e.target.value)}
        employee={employee}
        onEmployeeChange={setEmployee}
        delay={delay}
        onDelayChange={(e) => setDelay(e.target.value)}
      />

      {date != "" || employee != "" || delay != "" ? (
        <FilteredLeads date={date} delay={delay} employee={employee} />
      ) : (
        <div className="admin-data-row">
          {stats && stats.length > 0
            ? stats.map((s) => (
                <AdminData link={""} description={s.title} number={s.number} />
              ))
            : ""}
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
