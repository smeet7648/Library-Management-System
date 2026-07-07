import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import "./dashboard.css";

axios.defaults.withCredentials = true;

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  useEffect(() => {
    getBooks();
    getUser();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, search, category]);

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/me");

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");

      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterBooks = () => {
    let data = [...books];

    if (category !== "All") {
      data = data.filter(
        (book) => book.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (search !== "") {
      data = data.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredBooks(data);
  };

  const categories = [
    "All",
    "Programming",
    "Novel",
    "Self Help",
    "History",
    "Science",
  ];

  return (
    <>
      <Navbar />

      <div className="dashboard">
        {/* Hero */}

        <div className="hero">
          <h1>📚 Welcome to BookSys</h1>

          <p>Buy, Rent or Borrow your favourite books.</p>

          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}

        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Books */}

        <div className="book-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                user={user}
                refreshBooks={getBooks}
              />
            ))
          ) : (
            <h2>No Books Found</h2>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
