import { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.withCredentials = true;

function Admin() {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
    buyPrice: "",
    rentPrice: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm({
      title: "",
      author: "",
      category: "",
      description: "",
      image: "",
      buyPrice: "",
      rentPrice: "",
    });

    setEditingId(null);
  };

  const saveBook = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/books/${editingId}`, form);

        alert("Book Updated");
      } else {
        await axios.post("http://localhost:5000/api/books", form);

        alert("Book Added");
      }

      clearForm();
      getBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const editBook = (book) => {
    setEditingId(book._id);

    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      description: book.description,
      image: book.image,
      buyPrice: book.buyPrice,
      rentPrice: book.rentPrice,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);

      getBooks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin">
        <h1>📚 Admin Dashboard</h1>

        <div className="book-form">
          <input
            name="title"
            placeholder="Book Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="buyPrice"
            placeholder="Buy Price"
            value={form.buyPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="rentPrice"
            placeholder="Rent Price"
            value={form.rentPrice}
            onChange={handleChange}
          />

          <button onClick={saveBook}>
            {editingId ? "Update Book" : "Add Book"}
          </button>
        </div>

        <h2>All Books</h2>

        <div className="books">
          {books.map((book) => (
            <div className="card" key={book._id}>
              <img src={book.image} alt="" />

              <h3>{book.title}</h3>

              <p>
                <b>Author:</b> {book.author}
              </p>

              <p>
                <b>Category:</b> {book.category}
              </p>

              <p>₹{book.buyPrice}</p>

              <p>Rent ₹{book.rentPrice}</p>

              <p className={book.status}>{book.status}</p>

              <div className="buttons">
                <button className="edit" onClick={() => editBook(book)}>
                  Edit
                </button>

                <button className="delete" onClick={() => deleteBook(book._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
