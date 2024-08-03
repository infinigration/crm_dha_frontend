import React, { useRef } from "react";
import logo from "../../../assets/logo.png";
import generatePDF from "react-to-pdf";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../loader/Loader";

const ViewContract = () => {
  const pdfRef = useRef();
  const params = useParams();

  const { contracts } = useSelector((state) => state.contract);
  const contract =
    contracts && contracts.contracts.length > 0
      ? contracts.contracts.find((c) => c._id === params.id)
      : "";

  console.log(contract);
  const options = {
    filename:
      contract.lead &&
      contract.lead.client.name +
        " " +
        contract.program.generalInformation[0].country +
        " Contract",
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

  const getFormattedDate = () => {
    const date = new Date();
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  };

  return !contract.lead || !contract.program ? (
    <Loader />
  ) : (
    <section className="section" id="view-contract">
      <div className="actions-row">
        <button className="primary-btn" onClick={downloadPdf}>
          Download PDF
        </button>
      </div>

      <div className="pdf-file" ref={pdfRef}>
        <div className="logo-row">
          <img src={logo} alt="Infinigration Logo" />
          <h2 className="heading">Infinigration</h2>
        </div>
        <h2 className="heading">
          Service Agreement (
          {contract.program.generalInformation[0].country.toUpperCase()} TRC
          Program)
        </h2>

        <table>
          <thead>
            <tr>
              <th>Consultant Name</th>
              <th>Company Name</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Mariam Ghulam Nabi</td>
              <td>Infinigration</td>
              <td>{getFormattedDate()}</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th>Office Address</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Office Address Goes Here</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th>Mobile Number</th>
              <th>Email Id</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>051-5147224</td>
              <td>info@infinigration.com</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Date of Birth</th>
              <th>CNIC No</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{contract.lead.client.name}</td>
              <td>{contract.lead.client.dob || "Not Added Yet"}</td>
              <td>{contract.lead.client.cnic || "Not Added Yet"}</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th>Client Address</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{contract.lead.client.address || "Not Added Yet"}</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th>Mobile No</th>
              <th>Email Id</th>
              <th>Contract No</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{contract.lead.client.phone}</td>
              <td>{contract.lead.client.email}</td>
              <td>{contract.lead.client.phone}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="heading small">
          Hereinafter referred to as the` `CLIENT’’) <br /> AND
        </h2>

        <p>
          infinigration Consulting herein referred to as the ``CONSULTANT’’
          having its office \e 2nd Floor, Westeria Centre, Westeria Road, Sector
          A, DHA II, Islamabad, Pakistan.
        </p>

        <p>
          The CLIENT has contracted with the CONSULTANT to acquire the services
          of the latter to represent him/her and carry out the necessary
          activities with respect to preparing, forwarding and follow up of
          application for Lithuania Worker Visa later agrees to render such
          services from Pakistan on following terms and conditions.
        </p>

        <div className="duties">
          <h2 className="heading small">DUTIES OF THE CONSULTANT:</h2>
          <p>
            The CONSULTANT shall be responsible for the performance of the
            following:
          </p>

          <ul>
            <li>
              Advise the CLIENT as to which documents are required in support of
              the application.
            </li>

            <li>
              Where applicable, assist the CLIENT in achieving eligibility in
              accordance with criteria established by the relevant authority.
            </li>

            <li>
              Arrange the Job offer / Work permit from Employer which will be
              issued by Government of{" "}
              {contract.program.generalInformation[0].country}.
            </li>

            <li>
              Conduct final review of the CLIENT’s application and related
              forms, supporting documents, and with full fee.
            </li>

            <li>
              In case of any refusal, applicant shall not claim any refund for
              embassy fee, file charges, travel insurance charges or consultancy
              charges.
            </li>
            <li>Applicant shall not submit any fake documents.</li>
            <li>
              Applicant(s) will have to appear in person at the{" "}
              {contract.program.generalInformation[0].country} Visa Application
              Center (VFS Global) to submit their passport or required documents
              file.
            </li>

            <li>
              Collection of passport or approval of TRC shall also be done by
              the Applicant(s) in person.
            </li>

            <li>
              In case of any closure of visa application services due to
              COVID-19 or any similar force majeure event, the process can be
              delayed from the given time line; applicant shall not hold
              consultant responsible.
            </li>

            <li>
              Applicant applying on a short visit visa shall return back to home
              country as per travel plan.
            </li>
          </ul>
        </div>

        <div className="duties">
          <h2 className="heading small">
            COSULTANCY FEE INSTALLMENTS AND PAYMENT SCHEDULE:
          </h2>

          <p>
            The CLIENT retains services of the CONSULTANT for preparation,
            forwarding and follow up of his/her application for employment
            search, and {contract.program.generalInformation[0].country} visa
            services. As consideration of such services, he/she fully agree to
            pay Infinigration Consulting an amount of PKR{" "}
            {contract.program.generalInformation[0].totalCost * 100000} on the
            following terms and conditions.
          </p>

          <table>
            <thead>
              <tr>
                <th>Installment No.</th>
                <th>Installment Stage</th>
                <th>Amount (PKR)</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {contract.installements && contract.installements.length > 0
                ? contract.installements.map((i, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{i.stage}</td>
                      <td>{i.amount}</td>
                      <td>{i.remarks}</td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>

        <div className="duties">
          <h2 className="heading small">
            {contract.program.generalInformation[0].country.toUpperCase()}{" "}
            Government Fee:
          </h2>

          <table>
            <thead>
              <tr>
                <th>Installment No.</th>
                <th>Installment Stage</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Appointment Fee</td>
                <td>Payable by Client Directly</td>
              </tr>

              <tr>
                <td>2</td>
                <td>Visa Fee– Each Member</td>
                <td>Payable by Client Directly</td>
              </tr>

              <tr>
                <td>3</td>
                <td>
                  {contract.program.generalInformation[0].country.toUpperCase()}{" "}
                  Double Legalization Fee
                </td>
                <td>Payable by Client Directly</td>
              </tr>
            </tbody>
          </table>

          <p>
            <b>NOTE:</b> For Receiving of Infinigration Consulting Charges and
            giving refund to client in currency other than Euro say PKR;
            www.xe.com will be followed for using exchange rates. Exchange rate
            of the day of transaction will be followed.
          </p>
        </div>

        <div className="duties">
          <h2 className="heading small">Refund Policies</h2>

          <ol>
            <li>
              Fee paid for visa to relevant Lithuania Departments, are not
              refundable in any circumstance
            </li>
            <li>Double Legalization fee paid is non-refundable.</li>
            <li>
              No refund is given if the client withdraws his/her case at any
              stage, not adheres to the clauses of this contract or not fulfils
              his duties.
            </li>
            <li>
              From the first installment, Non-refundable PKR 500,000/-in case of
              rejection of Visa.
            </li>
            <li>
              No refund is given in case of refusal of Visa or Certificate of
              sponsorship resulting from deception by the CLIENT e.g.,
              submission of fake, forged, altered, wrongly procured documents
              etc. submitted by the client in support of his application. In
              scenario like this, all amount previously paid as consultancy
              charges to Infinigration Consulting and processing fee to
              Lithuania Authorities will be forfeited.
            </li>
            <li>
              No refund of first instalment is given in case of refusal or
              deferral of Visa, resulting from change in applicable
              immigration/work-permit policies. (If client tends to withdraw the
              case)
            </li>
            <li>
              All refund requests, and notifications of withdrawal by the CLIENT
              must be made in writing to the Consultant. Approved refunds will
              be paid within 8 weeks of written request made by CLIENT.
            </li>

            <li>
              For refund, the exchange rates on deposit and refund date will be
              compared according to www.xe.com. The lowest will be paid. Any
              payments against exchange rate difference for transfer, admin
              charges upon instalment and late fee penalty/surcharge will not be
              refunded
            </li>
          </ol>
        </div>

        <div className="duties">
          <h2 className="heading small">Consent</h2>
          <p>
            Both the parties have properly read and understood the contents of
            the agreement and append he respective signatures of their free will
            and without any misrepresentation, coercion, and undue influence of
            any part of either party. Client acknowledges that he/she have read
            and understood this Agreement, have sought translation if required,
            have obtained such independent legal advice as deem appropriate, and
            agree to be bound by its terms. Client has been told, recognizes,
            and understands that the Company has made no “Guarantee “promising
            the success or outcome of his/her application.
          </p>

          <div className="signature-row">
            <div className="sign">
              <h3>Client Signature</h3>

              <p>Name: {contract.lead.client.name}</p>
            </div>
            <div className="sign">
              <h3>Authorized Signatory</h3>

              <p>Name: Kashif Iqbal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewContract;
