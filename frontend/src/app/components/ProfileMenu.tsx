import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ProfileMenu() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return null;

  const goToProfile = () => {
    if (user.role === "doctor") {
      router.push("docDashboard");
    } else {
      router.push("UserDashboard");
    }
  };

  return (
    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
      <div
        onClick={goToProfile}
        style={{
          cursor: "pointer",
          background: "#eee",
          padding: "5px 10px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
        }}
        title="Go to Profile"
      >
        👤
      </div>
    </div>
  );
}

