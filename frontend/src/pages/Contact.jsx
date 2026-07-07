import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./contact.css";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="contact-container">

        <h1>Contact Us</h1>

        <p>
          We'd love to hear from you. Feel free to contact us using the form
          below.
        </p>

        <form className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="email"
            placeholder="Your Email"
          />

          <input
            type="text"
            placeholder="Subject"
          />

          <textarea
            rows="6"
            placeholder="Your Message"
          ></textarea>

          <button>
            Send Message
          </button>

        </form>

      </div>

      <Footer />
    </>
  );
}

export default Contact;