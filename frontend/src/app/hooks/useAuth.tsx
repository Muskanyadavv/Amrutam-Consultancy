// hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";

export default function useAuth(requiredRole?: string) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      setLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (requiredRole && parsedUser.role !== requiredRole) {
        // role mismatch, treat as not authorized
        setUser(null);
      } else {
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
      setUser(null);
    }

    setLoading(false);
  }, [requiredRole]);

  return { user, setUser, loading };
}
