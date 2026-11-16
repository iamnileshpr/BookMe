import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/admin.js";
import logo from "../assets/logo.png";
import { adminDashboardPageStyles as s } from "../assets/dummyStyles.js";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await adminLogin(form);
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }
      navigate("/admin/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={s.pageContainer}>
      <div className={s.card}>
        <div className={s.leftPanel}>
          <div className={s.leftContent}>
            <p className="leftEyebrow">System Access</p>
            <div className={s.leftLogoRow}>
              <img src={logo} className={s.leftLogoImg} />
            </div>
            <h1 className={s.leftHeading}>
              BookMe
              <br />
              <span className={s.leftHeadingAccent}>Admin</span>
            </h1>
            <p className={s.leftDescription}>
              Money movement, user overview and payout request. Monitor the
              platform for the desk
            </p>
          </div>
          <div className={s.rightPanel}>
            <h2 className={s.formTitle}>Admin Login</h2>
            <p className={s.formSubtile}>
              Enter your credentials to access the admin dashboard
            </p>
            {message && <div className={s.messageBox}>{message}</div>}
            <form onSubmit={handleSubmit} className={s.form}>
              <div>
                <label className={s.inputLable}>Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className={s.textInput}
                  placeholder="Enter admin email"
                  required
                />
                <div>
                  <label className={s.inputLable}>Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        password: event.target.value,
                      }))
                    }
                    className={s.textInput}
                    placeholder="....."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={s.submitButton}
                >
                  {loading ? "Authenticating..." : "Secure Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
