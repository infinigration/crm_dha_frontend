import React from "react";
import "./finance.scss";
import FStats from "../../../componets/finance/FStats";
import { FaWallet } from "react-icons/fa6";
import card from "../../../assets/card.png";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AccountStats from "../../../componets/charts/Chart";
const AdminFinances = () => {
  const params = useParams();
  const { banks } = useSelector((state) => state.bank);
  const selectedBank =
    banks && banks.length > 0 ? banks.find((b) => b._id == params.id) : {};

  return (
    <section className="section" id="admin-finance">
      <div className="container">
        <div className="stats">
          <div className="stats-row">
            <FStats
              icon={FaWallet}
              title={"Balance"}
              number={selectedBank.stats.balance}
            />
            <FStats
              icon={FaWallet}
              title={"Incoming"}
              number={selectedBank.stats.incoming}
            />
            <FStats
              icon={FaWallet}
              title={"Expense"}
              number={selectedBank.stats.expense}
            />
            <FStats
              icon={FaWallet}
              title={"Profit"}
              number={selectedBank.stats.profit}
            />
          </div>
          <AccountStats account={selectedBank} />;
          <div className="transactions">
            <h2 className="heading">Transactions</h2>
            <table>
              <tbody>
                <tr>
                  <td>
                    <div className="image-container">
                      <img
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                      <p>Shahzaib Khan</p>
                    </div>
                  </td>
                  <td>Invoice</td>
                  <td>{}</td>
                  <td>Time</td>
                  <td>Amount</td>
                </tr>

                <tr>
                  <td>
                    <div className="image-container">
                      <img
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                      <p>Shahzaib Khan</p>
                    </div>
                  </td>
                  <td>Reason</td>
                  <td>Date</td>
                  <td>Time</td>
                  <td>Amount</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <img src={card} alt="" />
          </div>
          <div className="card-details">
            <div>
              <p className="sm-heading">Your Balance</p>
              <p className="cash">PKR 20000</p>
            </div>

            <div className="currency-row">
              <div className="currency">
                <p className="sm-heading">Currency</p>
                <p>PKR</p>
              </div>

              <div className="currency">
                <p className="sm-heading">Status</p>
                <p>Active</p>
              </div>
            </div>
          </div>
          <div className="transfer-details"></div>
        </div>
      </div>
    </section>
  );
};

export default AdminFinances;
