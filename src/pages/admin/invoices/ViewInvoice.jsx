import React, { useRef, useState } from "react";
import "./invoices.scss";
import logo from "../../../assets/logo.png";
import generatePDF from "react-to-pdf";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewInvoice = () => {
  const pdfRef = useRef();
  const params = useParams();
  const { invoices } = useSelector((state) => state.invoices);
  const [installement, setInstallement] = useState({
    label: "All",
    value: "all",
  });

  const options = {
    filename: "Invoice",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", orientation: "portrait" },
  };

  const downloadPdf = () => {
    if (pdfRef.current) {
      generatePDF(pdfRef, options);
    } else {
      console.error("Unable to get the target element.");
    }
  };

  const filteredInvoice =
    invoices && invoices.length > 0
      ? invoices.find((f) => f._id === params.id)
      : {};

  const date = new Date();

  const installementOptions = filteredInvoice
    ? [{ label: "All", value: "all" }].concat(
        filteredInvoice.contract &&
          filteredInvoice.contract.installements.map((i) => ({
            label: i.stage,
            value: i._id,
          }))
      )
    : [];

  const numberToWords = (num) => {
    const belowTwenty = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const aboveThousand = ["", "Thousand", "Million", "Billion"];

    const convertToWords = (n) => {
      if (n < 20) return belowTwenty[n];
      if (n < 100)
        return (
          tens[Math.floor(n / 10)] +
          (n % 10 === 0 ? "" : "-" + belowTwenty[n % 10])
        );
      if (n < 1000)
        return (
          belowTwenty[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 === 0 ? "" : " " + convertToWords(n % 100))
        );
      for (let i = 0; i < aboveThousand.length; i++) {
        let unit = Math.pow(1000, i);
        if (n < unit * 1000)
          return (
            convertToWords(Math.floor(n / unit)) +
            " " +
            aboveThousand[i] +
            (n % unit === 0 ? "" : " " + convertToWords(n % unit))
          );
      }
    };

    return convertToWords(num);
  };

  const calculateTotals = (selectedInstallement) => {
    if (selectedInstallement === "all") {
      return {
        paid: filteredInvoice.paid,
        outstanding: filteredInvoice.totalAmount - filteredInvoice.paid,
        netTotal: filteredInvoice.totalAmount,
        grandTotal: filteredInvoice.totalAmount,
      };
    }

    let totalPaid = 0;
    let outstandingAmount = 0;
    let netTotal = 0;
    let isCurrent = false;

    for (const i of filteredInvoice.contract.installements) {
      if (i._id === selectedInstallement) {
        netTotal = i.amount;
        isCurrent = true;
      }

      if (!isCurrent) {
        totalPaid += i.amount;
      } else {
        outstandingAmount += i.amount;
      }
    }

    return {
      paid: totalPaid,
      outstanding: outstandingAmount,
      netTotal: netTotal,
      grandTotal: filteredInvoice.totalAmount,
    };
  };

  let filteredInstallement =
    installement.value !== "all"
      ? filteredInvoice.contract.installements.find(
          (i) => i._id === installement.value
        )
      : null;

  const { paid, outstanding, netTotal, grandTotal } = calculateTotals(
    installement.value
  );

  return (
    <section className="section">
      <div className="invoice-row">
        <Select
          placeholder="Choose Installement"
          options={installementOptions}
          value={installement}
          onChange={setInstallement}
        ></Select>
        <button className="primary-btn" onClick={downloadPdf}>
          Download Invoice
        </button>
      </div>

      <section className="section" id="view_invoice" ref={pdfRef}>
        <div className="top-row">
          <div className="company">
            <img src={logo} alt="" />

            <div>
              <p>infinigration</p>
              <p>
                Westeria Centre, Plaza 38 2nd Floor, Westeria Road, Sector A,
                DHA @ <br />
                Islamabad PUNJAB 00000
              </p>
              <p>Pakistan</p>
              <p>
                <span>Phone: </span>051-5147224
              </p>
              <p>
                <span>Email: </span>
                info@infinigration.com
              </p>
            </div>
          </div>

          <div className="inv">
            <p>INVOICE</p>
            <p>
              <span>
                Date:{" "}
                {`${date.getUTCDate()}-${date.getMonth()}-${date.getFullYear()}`}
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="bill-to">
          <div>
            <span>Bill To</span>
            <p className="name">
              {filteredInvoice.lead && filteredInvoice.lead.client.name}
            </p>
            <p className="name">
              <span>Phone: </span>
              {filteredInvoice.lead && filteredInvoice.lead.client.phone}
            </p>
          </div>

          <table>
            <tbody>
              <tr>
                <th>Payment Terms</th>
                <td>Installements</td>
              </tr>

              <tr>
                <th>Due Date</th>
                <td className="date">
                  <input type="date" />
                </td>
              </tr>

              <tr>
                <th>Sales Person</th>
                <td>{ filteredInvoice.salesPerson && filteredInvoice.salesPerson.bioData.name}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sr</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Rate (PKR)</th>
              <th>Unit Total (PKR)</th>
              <th>Discount</th>
              <th>Net Amt</th>
              <th>Amount (PKR)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{1}</td>
              <td>{filteredInvoice.title}</td>

              <td>
                {filteredInstallement
                  ? filteredInstallement.stage
                  : filteredInvoice.contract && filteredInvoice.contract.installements.map((i) => (
                      <p key={i._id}>{i.stage}</p>
                    ))}
              </td>
              <td>
                {filteredInstallement
                  ? filteredInstallement.amount
                  : filteredInvoice.totalAmount}{" "}
                PKR
              </td>
              <td>
                {filteredInstallement
                  ? filteredInstallement.amount
                  : filteredInvoice.totalAmount}{" "}
                PKR
              </td>
              <td>{0} %</td>
              <td>
                {filteredInstallement
                  ? filteredInstallement.amount
                  : filteredInvoice.totalAmount}{" "}
                PKR
              </td>
              <td>
                {filteredInstallement
                  ? filteredInstallement.amount
                  : filteredInvoice.totalAmount}{" "}
                PKR
              </td>
            </tr>
          </tbody>
        </table>

        <div className="bill-to">
          <p>Scan</p>

          <table>
            <tbody>
              <tr>
                <th>Net Total</th>
                <td>{netTotal} PKR</td>
              </tr>

              <tr>
                <th>Grand Total</th>
                <td>{grandTotal} PKR</td>
              </tr>

              <tr>
                <th>Payment Made</th>
                <td>{paid} PKR</td>
              </tr>

              <tr>
                <th>Balance Due</th>
                <td>{outstanding} PKR</td>
              </tr>
            </tbody>
          </table>

          <div className="totalAmountContainer">
            <div className="totalAmount">
              <p>PKR {netTotal}</p>
              <span>Total Amount</span>
            </div>

            <div className="amountInWords">
              <p>{numberToWords(netTotal)}</p>
              <span>Total amount in words</span>
            </div>
          </div>
        </div>

        <div className="certification">
          <div className="c-text">
            <p>
              Certified that the particulars given above are true and correct.
            </p>
            <span>For infinigration</span>

            <div className="signature">
              <p>Authorised Signatory</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ViewInvoice;
