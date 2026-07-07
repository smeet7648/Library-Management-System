import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./bookdetails.css";

axios.defaults.withCredentials = true;

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    getBook();
  }, []);

  const getBook = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);

      setBook(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAction = async (action) => {
    try {
      if (action === "return") {
        const code = prompt("Enter your Return Code");

        if (!code) return;

        const res = await axios.post(
          `http://localhost:5000/api/return/${book._id}`,
          { code },
        );

        alert(res.data.message);

        getBook();

        return;
      }

      const res = await axios.post(
        `http://localhost:5000/api/${action}/${book._id}`,
      );

      alert(
        `${res.data.message}

━━━━━━━━━━━━━━━━━━

Return Code

${res.data.returnCode}

⚠ Save this code.
You'll need it to return the book.`,
      );

      getBook();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!book) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="details">
        <div className="left">
          <img src={book.image} alt={book.title} />
        </div>

        <div className="right">
          <h1>{book.title}</h1>

          <p>
            <b>Author :</b> {book.author}
          </p>

          <p>
            <b>Category :</b> {book.category}
          </p>

          <p className="desc">{book.description}</p>

          <div className="price-box">
            <h2>Buy ₹{book.buyPrice}</h2>

            <h2>Rent ₹{book.rentPrice}</h2>
          </div>

          <h3 className={book.status}>{book.status.toUpperCase()}</h3>

          <div className="actions">
            <button
              onClick={() => handleAction("buy")}
              disabled={book.status !== "available"}
            >
              Buy
            </button>

            <button
              onClick={() => handleAction("rent")}
              disabled={book.status !== "available"}
            >
              Rent
            </button>

            <button
              onClick={() => handleAction("borrow")}
              disabled={book.status !== "available"}
            >
              Borrow
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BookDetails;
