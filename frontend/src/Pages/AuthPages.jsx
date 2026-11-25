import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";
import { loginUser, registerUser, requestRegistrationOtp, verifyRegistrationOtp } from "../api/auth.js";
import { authPageStyles as s } from "../assets/dummyStyles.js";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(location.pathname === "/register" ? "register" : "login");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", businessName: "", businessDescription: "", timezone: "Asia/Kolkata", emailOtp: "" });

  const update = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const saveSession = (data) => {
    if (data.token) localStorage.setItem("token", data.token);
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  };

  const requestOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      await requestRegistrationOtp({ email: form.email });
      setOtpSent(true);
      setMessage("Verification code sent to your email.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not send OTP.");
    } finally { setLoading(false); }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      await verifyRegistrationOtp({ email: form.email, emailOtp: form.emailOtp });
      setOtpVerified(true);
      setMessage("Email verified successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP.");
    } finally { setLoading(false); }
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { data } = mode === "login"
        ? await loginUser({ email: form.email, password: form.password })
        : await registerUser(form);
      saveSession(data);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || (mode === "login" ? "Login failed." : "Registration failed."));
    } finally { setLoading(false); }
  };

  const switchMode = () => {
    const next = mode === "login" ? "register" : "login";
    setMode(next);
    setMessage("");
    setOtpSent(false);
    setOtpVerified(false);
    navigate(next === "login" ? "/login" : "/register", { replace: true });
  };

  return (
    <div className={s.pageBg}>
      <div className={s.gridContainer}>
        <section className={s.brandSection}>
          <div className={s.logoRow}><img src={logo} className={s.logoImg} alt="BookMe" /></div>
          <h1 className={s.mainHeading}>Turn bookings into <span className={s.gradientText}>growth.</span></h1>
          <p className={s.subtitle}>Manage services, availability, appointments and payments from one simple workspace.</p>
          <div className={s.featureGrid}>
            {[
              [CalendarCheck, s.featureIconWrapPurple, s.featureIconPurple, "Smart scheduling", "Manage availability and appointments."],
              [ShieldCheck, s.featureIconWrapEmerald, s.featureIconEmerald, "Secure payments", "Track earnings and withdrawals."],
              [Sparkles, s.featureIconWrapAmber, s.featureIconAmber, "Public booking", "Let customers book in seconds."],
            ].map(([Icon, wrap, icon, title, text]) => (
              <div className={s.featureCard} key={title}><span className={wrap}><Icon className={icon}/></span><div><p className={s.featureTitle}>{title}</p><p className={s.featureDesc}>{text}</p></div></div>
            ))}
          </div>
        </section>

        <section className={s.formCard}>
          <h2 className={s.formHeading}>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p className={s.formSubtitle}>{mode === "login" ? "Sign in to manage your business" : "Set up your booking page"}</p>
          {message && <div className={s.message}>{message}</div>}
          <form onSubmit={submit} className={s.form}>
            {mode === "register" && (
              <>
                <div><label className={s.inputLabel}>Full name</label><input className={s.inputField} value={form.name} onChange={update("name")} required /></div>
                <div><label className={s.inputLabel}>Business name</label><input className={s.inputField} value={form.businessName} onChange={update("businessName")} required /></div>
                <div><label className={s.inputLabel}>Business description</label><input className={s.inputField} value={form.businessDescription} onChange={update("businessDescription")}/></div>
              </>
            )}
            <div><label className={s.inputLabel}>Email</label><input type="email" className={s.inputField} value={form.email} onChange={update("email")} required /></div>
            {mode === "register" && (
              <div className={s.otpContainer}>
                <p className={s.otpLabel}>Email verification</p>
                <div className={s.otpGrid}>
                  <input className={s.otpField} placeholder="6-digit code" value={form.emailOtp} onChange={update("emailOtp")}/>
                  {otpVerified
                    ? <button type="button" className={s.otpVerifiedButton}><ShieldCheck className={s.otpVerifiedIcon}/>Verified</button>
                    : <button type="button" className={s.otpButton} onClick={otpSent ? verifyOtp : requestOtp} disabled={loading}>{otpSent ? "Verify OTP" : "Send OTP"}</button>}
                </div>
              </div>
            )}
            <div><label className={s.inputLabel}>Password</label><input type="password" className={s.inputField} value={form.password} onChange={update("password")} minLength={6} required /></div>
            <button type="submit" className={s.submitBtn} disabled={loading || (mode === "register" && !otpVerified)}>{loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}</button>
          </form>
          <button type="button" className={s.toggleMode} onClick={switchMode}>{mode === "login" ? "New to BookMe? Create an account" : "Already have an account? Sign in"}</button>
          <div className={s.footerLinks}><Link className={s.footerLink} to="/admin/login">Admin login</Link></div>
        </section>
      </div>
    </div>
  );
}
