import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Mail, Lock } from "lucide-react";
const BASE_URL = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [notVerified, setNotVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotVerified(false);
    try {
      const res = await fetch(`${BASE_URL}/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("access", data.access_token);
        localStorage.setItem("refresh", data.refresh_token);
        window.location.href = "/home";
      } else {
        setMessage(data.detail);
      }
    } catch (err: any) {
      setError(err.message || "Kirishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-background/80 backdrop-blur-lg border border-border shadow-soft rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Kirish</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              name="password"
              placeholder="Parol"
              value={form.password}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <a href="/register" className="text-sm text-primary hover:underline">
            Ro'yxatdan o'tish
          </a>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-primary hover:shadow-glow"
          >
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </Button>

          {message && <p className="text-center text-sm mt-2">{message}</p>}
          {error && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}

          
        </form>
      </div>

      <a
        href="/home"
        className="fixed bottom-4 left-4 p-3 rounded-full bg-primary text-white shadow-md hover:bg-primary/80"
      >
        <Home className="w-6 h-6" />
      </a>
    </div>
  );
};

export default LoginForm;
