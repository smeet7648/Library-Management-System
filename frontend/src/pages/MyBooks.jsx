import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./mybooks.css";

axios.defaults.withCredentials = true;

function MyBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getMyBooks();
  }, []);

  const getMyBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/mybooks");

      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mybooks">
        <h1>📚 My Books</h1>

        <div className="mybook-grid">
          {books.map((item) => (
            <div className="mybook-card" key={item._id}>
              <img src={item.book.image} alt={item.book.title} />

              <div className="mybook-info">
                <h2>{item.book.title}</h2>

                <p>
                  <strong>Author :</strong> {item.book.author}
                </p>

                <span className={`type ${item.type}`}>
                  {item.type.toUpperCase()}
                </span>

                {item.type !== "buy" && (
                  <>
                    <p>
                      <strong>Borrowed :</strong>{" "}
                      {new Date(item.borrowDate).toLocaleDateString()}
                    </p>

                    <p>
                      <strong>Due :</strong>{" "}
                      {new Date(item.dueDate).toLocaleDateString()}
                    </p>
                  </>
                )}

                <div className="return-code">
                  <span>{item.returnCode}</span>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.returnCode);
                      alert("Return code copied!");
                    }}
                  >
                    Copy Code
                  </button>
                </div>

                {item.type !== "buy" && (
                  <button
                    className="return-btn"
                    onClick={async () => {
                      const code = prompt("Enter Return Code");

                      if (!code) return;

                      try {
                        const res = await axios.post(
                          `http://localhost:5000/api/return/${item.book._id}`,
                          { code },
                        );

                        alert(res.data.message);

                        getMyBooks();
                      } catch (err) {
                        alert(
                          err.response?.data?.message || "Something went wrong",
                        );
                      }
                    }}
                  >
                    Return Book
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyBooks;
