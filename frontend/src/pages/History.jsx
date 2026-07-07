import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./history.css";

axios.defaults.withCredentials = true;

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/history"
      );

      setHistory(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <>
      <Navbar />

      <div className="history">

        <h1>History</h1>

        <table>

          <thead>

            <tr>

              <th>Book</th>

              <th>Action</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {history.map((item) => (

              <tr key={item._id}>

                <td>{item.book.title}</td>

                <td className={item.type}>
                  {item.type.toUpperCase()}
                </td>

                <td>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <Footer />
    </>
  );
}

export default History;