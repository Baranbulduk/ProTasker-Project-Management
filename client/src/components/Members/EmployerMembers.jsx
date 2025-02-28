import React from "react";
import "./Members.css";

function Employermembers() {
  return (
    <>
      <div>
        <table className="employers-table-container">
          <thead className="employers-table-header">
            <tr className="employers-table-header-title-container">
              <th className="employers-table-header-title">Name</th>
              <th className="employers-table-header-title">Email</th>
              <th className="employers-table-header-title">Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="employers-table-body">
            <tr className="employers-table-body-title-container">
              <td>employer 1</td>
              <td>employer1@example.com</td>
              <td>Employer</td>
              <td></td>
              <td></td>
            </tr>
            <tr className="employers-table-body-title-container">
              <td>employer 2</td>
              <td>employer2@example.com</td>
              <td>Employer</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Employermembers;
