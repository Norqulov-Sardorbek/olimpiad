import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Mail, User, Lock } from "lucide-react";
const BASE_URL = import.meta.env.VITE_API_URL;

const RegisterForm = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Email noto‘g‘ri formatda",
      }));
    }

    if (name === "firstName") {
      const nameRegex = /^[A-Za-z\u0400-\u04FF]+$/;
      setErrors((prev) => ({
        ...prev,
        firstName:
          value.trim() === ""
            ? "Ism kiritilishi shart"
            : !nameRegex.test(value)
            ? "Ism raqamlardan iborat bo‘lishi mumkin emas"
            : "",
      }));
    }

    if (name === "confirmPassword" || name === "password") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          (name === "confirmPassword" && value !== form.password) ||
          (name === "password" &&
            form.confirmPassword &&
            value !== form.confirmPassword)
            ? "Parollar bir xil bo‘lishi kerak"
            : "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    try {
      const res = await fetch(`${BASE_URL}/users/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          first_name: form.firstName,
          last_name: form.lastName,
          password: form.password,
        }),
      });

      if (!res.ok) throw new Error("Serverdan xato qaytdi");

      if (res.status === 201) {
        setMessage("✅ Ro‘yxatdan muvaffaqiyatli o‘tdingiz!");
        localStorage.setItem("email", form.email);
        window.location.href = "/login";
      } else {
        const data = await res.json();
        setMessage(data.detail);
      }
    } catch (err: any) {
      setMessage("❌ Xatolik yuz berdi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !form.email ||
    !form.firstName ||
    !form.password ||
    !form.confirmPassword ||
    errors.email !== "" ||
    errors.firstName !== "" ||
    errors.confirmPassword !== "";

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Forma markazda */}
      <div className="max-w-md w-full bg-background/80 backdrop-blur-lg border border-border shadow-soft rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Ro'yxatdan o'tish</h2>
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              name="firstName"
              placeholder="Ism"
              value={form.firstName}
              onChange={handleChange}
              className="pl-10"
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              name="lastName"
              placeholder="Familiya (ixtiyoriy)"
              value={form.lastName}
              onChange={handleChange}
              className="pl-10"
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

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Parolni tasdiqlash"
              value={form.confirmPassword}
              onChange={handleChange}
              className="pl-10"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <a href="/login" className="text-sm text-primary hover:underline">
              Mavjud hisobingiz bormi?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:shadow-glow"
            disabled={isDisabled || loading}
          >
            {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
          </Button>
        </form>

        {message && <p className="text-center mt-4">{message}</p>}
      </div>

      {/* 🔽 Forma tashqarisida chap pastda Home icon */}
      <a
        href="/home"
        className="fixed bottom-4 left-4 p-3 rounded-full bg-primary text-white shadow-md hover:bg-primary/80"
      >
        <Home className="w-6 h-6" />
      </a>
    </div>
  );
};

export default RegisterForm;
