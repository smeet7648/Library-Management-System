import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h2>📚 BookSys</h2>
          <p>
            BookSys is a modern library management system that helps
            librarians and students manage books, borrowing records,
            members, and returns efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/books">Books</a>
          <a href="/members">Members</a>
          <a href="/borrow">Borrow Books</a>
          <a href="/history">History</a>
        </div>

        {/* Library Hours */}
        <div className="footer-section">
          <h3>Library Hours</h3>

          <p>Monday - Friday</p>
          <span>9:00 AM - 6:00 PM</span>

          <p>Saturday</p>
          <span>10:00 AM - 4:00 PM</span>

          <p>Sunday</p>
          <span>Closed</span>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 Ahmedabad, Gujarat</p>
          <p>📧 booksys@gmail.com</p>
          <p>📞 +91 98765 43210</p>

          <div className="socials">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 BookSys. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;