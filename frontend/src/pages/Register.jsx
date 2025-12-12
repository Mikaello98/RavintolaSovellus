import { useState } from "react";
import { useAuthActions } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuthActions();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) return setError(data.message);

      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const loginData = await loginRes.json();
      login(loginData);

    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          name="name"
          placeholder="Nimi"
          className="border p-2 w-full"
          onChange={handleChange}
          required 
        />
        <input 
          name="email"
          placeholder="Sähköposti"
          className="border p-2 w-full"
          onChange={handleChange}
          required 
        />
        <input 
          name="password"
          placeholder="Salasana"
          type="password"
          className="border p-2 w-full"
          onChange={handleChange}
          required 
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create account
        </button>
      </form>
    </div>
  );
}