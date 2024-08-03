import React, { useEffect } from "react";
import Select from "react-select";
import "./filterleads.scss";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../redux/actions/admin";

const FilterLeads = ({
  isOpen,
  date,
  onDateChange,
  employee,
  onEmployeeChange,
  delay,
  onDelayChange,
}) => {
  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const { employees } = useSelector((state) => state.admin);
  const { auth } = useSelector((state) => state.user);

  const employeeOptions =
    employees && employees.length > 0
      ? employees
          .filter((f) => f._id !== auth.user._id)
          .map((e, index) => ({
            value: e._id,
            label: `${e.bioData && e.bioData.name} (${
              e.job && e.job.department
            })`,
          }))
      : [];
  const dispatch = useDispatch();

  return (
    <form
      action=""
      className="filter-leads"
      style={{ display: isOpen ? "none" : "" }}
    >
      <div className="inputs-row">
        <div>
          <label htmlFor="">Select Employees</label>
          <Select
            options={employeeOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: "none",
                outline: "none",
                backgroundColor: "#f1f1f1",
                color: "#363636",
                fontSize: "14px",
                borderRadius: "4px",
                padding: "2px",
              }),
            }}
            value={employee}
            onChange={onEmployeeChange}
            defaultValue={employee}
          />
        </div>

        <div>
          <label htmlFor="">Select Date</label>
          <input type="date" value={date} onChange={onDateChange} />
        </div>

        <div>
          <label htmlFor="">Searh by Delayed Days</label>
          <input
            type="number"
            placeholder="Delayed Days"
            value={delay}
            onChange={onDelayChange}
          />
        </div>
      </div>
    </form>
  );
};

export default FilterLeads;
