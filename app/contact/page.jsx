"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        form,
        process.env.NEXT_PUBLIC_EMAIL_USER_ID
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("Failed to send message. Try again.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-gradient-to-br from-green-500 via-yellow-500 to-red-500 rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-green-400 mb-4 text-center">📞 Contact Us</h1>
        <p className="text-gray-300 text-center mb-6">
          We'd love to hear from you. Send us a message and we'll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 rounded bg-black border border-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 rounded bg-black border border-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows="5"
            className="w-full p-3 rounded bg-black border border-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white font-semibold rounded hover:scale-105 transition-transform duration-300"
          >
            ✉ Send Message
          </button>
        </form>

        {status && (
          <p className="text-center mt-4 text-green-300 animate-pulse">{status}</p>
        )}

        <div className="mt-8 text-center text-green-400 text-sm space-y-2">
          <p>📧 Email: ansarijubai661@gmail.com</p>
          <p>📱 WhatsApp: <a href="https://wa.me/918448454299" className="text-green-300 underline">+91 84484 54299</a></p>
          <p>📍 <a href="https://maps.app.goo.gl/kpTtnVXoAGh6CJBw6" target="_blank" className="text-green-400 underline">View Location on Map</a></p>
          <p>📸 Instagram: <a href="https://instagram.com/__Jubair_786" target="_blank" className="text-green-400 underline">__Jubair_786</a></p>
        </div>
      </div>
    </div>
  );
}
