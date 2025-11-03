import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return; // não redireciona aqui — deixa o componente decidir
    }

    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Erro ao buscar usuário");

        const data = await res.json();

        // ⚠️ Garante que veio algo válido
        if (data && data.user) {
          setUser(data.user);
          localStorage.setItem("usuario", JSON.stringify(data.user));
        }

      } catch (error) {
        console.error("Erro de autenticação:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
}
