import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./about.css";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-container">

        <h1>About BookHub</h1>

        <p>
          BookHub is a modern Library Management System designed to make
          borrowing, renting, and purchasing books simple and organized.
        </p>

        <div className="about-grid">

          <div className="about-card">
            <h3>📚 Huge Collection</h3>
            <p>
              Browse books from multiple categories including programming,
              novels, history, science, finance and self-help.
            </p>
          </div>

          <div className="about-card">
            <h3>🔒 Secure Accounts</h3>
            <p>
              Authentication is protected using JWT and HttpOnly cookies,
              keeping your account secure.
            </p>
          </div>

          <div className="about-card">
            <h3>📖 Borrow & Rent</h3>
            <p>
              Borrow, rent or purchase books with a secure return code system
              for easy management.
            </p>
          </div>

          <div className="about-card">
            <h3>⚡ Easy Management</h3>
            <p>
              Admins can manage books while users can track all their borrowed,
              rented and purchased books in one place.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default About;