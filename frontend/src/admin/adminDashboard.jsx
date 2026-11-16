import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAdminDashboard, updateWithdrawalStatus } from "../api/admin.js";
import {
    Users, Wallet, TrendingUp, Landmark, checkCircle,XOctagon,Clock,UserCheck,ShieldCheck
} from "lucide-react"
import logo from "../assets/logo.png";
import { adminDashboardPageStyles as s } from "../assets/dummyStyles.js";

const formatMoney = (amount = 0, currency = "INR") => { 
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
    }).format(amount/100);
}

const withdrawalStatuses = ["processing", "approved", "rejected"];
const terminalWithdrawalStatuses = ["paid", "rejected"];

const isTerminalWithdrawalStatus = (status) => { 
    terminalWithdrawalStatuses.includes(status);
}
const formatStatusLabel = (status = "") => { 
    status?`${status.slice(0,1).toUpperCase()}${status.slice(1)}`: ""
}

export default function AdminDashboardPage() {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(null);
    const [message, setMessage] = useState("");
    const [updateWithdrawalId, setUpdateWithdrawalId] = useState(false);
    const [pendingWithdrawalAction, setPendingWithdrawalAction] = useState({});

    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/login");
            return undefined
        }
        let isActive = true;
        getAdminDashboard().then((data) => {
            if (isActive) {
                setDashboard(data);
            }
        }).catch((error) => {
            setMessage(error.response?.data?.message || "Failed to fetch dashboard data. Please try again.");
        })
        return () => {
            isActive = false;
        }
    }, [navigate]);
    const requestWithdrawalStatusChange = (withdrawal, status) => {
        if (withdrawal.status == status || isTerminalWithdrawalStatus(withdrawal.status)) {
            return;
        }
        setPendingWithdrawalAction({ withdrawal, status });
    }
    const closeWithdrawalConfirm= () => {
        if (updateWithdrawalId) return;
        setPendingWithdrawalAction(null);
    }
    const changeWithdrawalStatus = async () => {
        if (!pendingWithdrawalAction) return;
    
        const { withdrawal, status } = pendingWithdrawalAction;
        setUpdateWithdrawalId(withdrawal._id);
    
        try {
          const { data } = await updateWithdrawalStatus(withdrawal._id, { status });
          setDashboard((prev) => {
            if (!prev) return prev;
    
            return {
              ...prev,
              summary: data.summary || prev.summary,
              withdrawals: prev.withdrawals.map((withdrawal) =>
                withdrawal._id === data.withdrawal._id
                  ? data.withdrawal
                  : withdrawal,
              ),
            };
          });
          setMessage(data.message || `Withdrawal marked as ${status}`);
        } catch (error) {
          setMessage(
            error.response?.data?.message || "Could not update withdrawal",
          );
        } finally {
          setUpdateWithdrawalId("");
          setPendingWithdrawalAction(null);
        }
      };
    
      const logout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      };
    
      const summary = dashboard?.summary || {};
      const pendingWithdrawal = pendingWithdrawalAction?.withdrawal;
      const WithdrawalConfirmIcon =
        pendingWithdrawalAction?.status === "rejected" ? XOctagon : ShieldCheck;
      const isConfirmingWithdrawal =
        pendingWithdrawal && updatingWithdrawalId === pendingWithdrawal._id;
    
      // Helpers for dynamic classes from styles
      const getPayoutStatusClass = (isComplete) =>
        isComplete ? s.userPayoutReady : s.userPayoutPending;
    
      const getWithdrawalStatusClass = (status) =>
        s.withdrawalStatusColors[status] || s.withdrawalStatusDefault;
    
      const statCards = [
        {
          label: "Total Users",
          value: summary.users || 0,
          icon: Users,
          bg: s.statBg1,
          c: s.statColor1,
        },
        {
          label: "Paid Bookings",
          value: summary.paidBookings || 0,
          icon: checkCircle,
          bg: s.statBg2,
          c: s.statColor2,
        },
        {
          label: "Gross Revenue",
          value: formatMoney(summary.grossRevenue),
          icon: TrendingUp,
          bg: s.statBg3,
          c: s.statColor3,
        },
        {
          label: "Platform Fees",
          value: formatMoney(summary.platformFees),
          icon: IndianRupee,
          bg: s.statBg4,
          c: s.statColor4,
        },
        {
          label: "Provider Payouts",
          value: formatMoney(summary.providerPayouts),
          icon: Wallet,
          bg: s.statBg5,
          c: s.statColor5,
        },
        {
          label: "Withdrawal Hold",
          value: formatMoney(summary.withdrawalHolds),
          icon: Landmark,
          bg: s.statBg6,
          c: s.statColor6,
        },
    ];
    return ( 
        <div className={s.pageContainer}>
            <header className={s.header}>
                <div className={s.headerInner}>
                    <div className={s.logoRow}>
                        <img src={logo} className={s.logoImg} />
                        <Link to="/admin/dashboard" className={s.headerActions}>
                            Client App
                        </Link>
                        <button type="button" onCanPlay={logout} className={s.logoutButton}>
                            Log Out
                        </button>
                    </div>
                </div>
            </header>
            <main className={s.main}>
                <section className={s.heroSection}>
                    <div>
                        <h1 className={s.heroTitle}>
                            Platform <span className={s.heroTitleAccent}>Overview</span>
                        </h1>
                        <p className={s.heroSubtitle}>Users, bookings, revenue and active withdrawals.</p>
                    </div>
                    {message && <div className={s.messageBanner}>{message}</div>}
                </section>
                <section className={s.statsGrid}>
                    {statCards.map((stat, i) => {
                        <div key={i} className={s.statCard}>
                            <div className={`${s.statIconContainer}${stat.bg}${stat.c}`}>
                                <stat.icon className={s.statIcon}/>
                            </div>
                            <div>
                                <p className={s.statLabel}>
                                    {stat.label}
                                </p>
                                <h2 className={s.statValue}>
                                    {stat.value}
                                </h2>
                            </div>
                        </div>
                    })}

                </section>
                <section className={s.tablesGrid}>
                    <div className={s.tableHeader}>
                        <h2 className={s.tableTitle}>
                            <UserCheck className={s.tableTitleIcon}>Register Users</UserCheck>
                        </h2>
                    </div>
                    <div className={s.tableScrollContainer}>
                        <table className={s.table}>
                            <thead>
                                <tr className={s.tableHeadRow}>
                                    <th className={s.th}>Buisness</th>
                                    <th className={s.th}>Email</th>
                                    <th className={s.th}>Booking</th>
                                    <th className={s.th}>Status</th>
                                </tr>
                            </thead>
                            <tbody className={s.tbody}>
                                {(dashboard?.users || []).map((user) => (
                                    <tr key={user._id} className={s.tr}>
                                        <td className={s.td}>
                                            <div className={s.userBusinessName}>
                                                {user.businessName||user.name}
                                            </div>
                                        </td>
                                        <td className={s.tdMuted}>{user.email}</td>
                                        <td className={s.tdMuted}>{user.slug}</td>
                                        <td className={s.tdMuted}>
                                            <span className={`${s.payoutStatusBadge}${getPayoutStatusClass(user.payoutDetails?.isComplete)}`}>
                                                {user.payoutDetails?.isComplete ? "Payout Ready" : "Details Pending"}
                                            </span>
                                        </td>
    </tr>
                                ))}
                                {dashboard && dashboard.users?.lenght == 0 && (
                                    <tr>
                                        <td colSpan={4} className={s.emptyTableCell}>
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className={s.withdrawalCard}>
                        <h2 className={`${s.tableTitle}${s.sectionTitleSpacing}`}>
                            <clock className={s.tableTitleIcon} />withdrawal Request
                        </h2>
                    </div>
                </section>
            </main>
        </div>
    )
}
