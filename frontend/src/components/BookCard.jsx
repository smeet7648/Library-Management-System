import axios from "axios";
import { Link } from "react-router-dom";
import "./bookcard.css";

axios.defaults.withCredentials = true;

function BookCard({ book, user, refreshBooks }) {
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

        refreshBooks();

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

      refreshBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="book-card">
      <img
        src={book.image || "https://via.placeholder.com/300x400?text=No+Image"}
        alt={book.title}
      />

      <div className="book-info">
        <h2>{book.title}</h2>

        <p className="author">
          <b>Author:</b> {book.author}
        </p>

        <p className="category">{book.category}</p>

        <p className="description">
          {book.description.length > 90
            ? book.description.substring(0, 90) + "..."
            : book.description}
        </p>

        <div className="price">
          <span>₹{book.buyPrice}</span>
          <span>Rent ₹{book.rentPrice}</span>
        </div>

        <p className={`status ${book.status}`}>{book.status.toUpperCase()}</p>

        <Link to={`/book/${book._id}`} className="details-link">
          View Details
        </Link>

        <div className="card-buttons">
          {user && book.owner === user._id ? (
            <button className="borrow" onClick={() => handleAction("return")}>
              Return
            </button>
          ) : (
            <>
              <button
                className="buy"
                disabled={book.status !== "available"}
                onClick={() => handleAction("buy")}
              >
                Buy
              </button>

              <button
                className="rent"
                disabled={book.status !== "available"}
                onClick={() => handleAction("rent")}
              >
                Rent
              </button>

              <button
                className="borrow"
                disabled={book.status !== "available"}
                onClick={() => handleAction("borrow")}
              >
                Borrow
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
