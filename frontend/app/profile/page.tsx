"use client";

import SideBar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Shield,
  Hash,
  Building2,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  Camera,
  KeyRound,
  Eye,
  EyeOff,
  Trash2,
  Loader2,
} from "lucide-react";
import { api, getToken } from "@/lib/api";
import { useRouter } from "next/navigation";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "GURU";
  nip?: string | null;
  namaSekolah?: string | null;
  isActive: boolean;
  avatarUrl?: string | null;
  lastLoginAt?: string | null;
  createdAt: string;
  openrouterApiKeyLast4?: string | null;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <div className="text-sm font-medium text-gray-800">{value}</div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openrouterApiKey, setOpenrouterApiKey] = useState("");
  const [showOpenrouterApiKey, setShowOpenrouterApiKey] = useState(false);
  const [savingOpenrouterApiKey, setSavingOpenrouterApiKey] = useState(false);
  const [openrouterMessage, setOpenrouterMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const data = await api.get<UserProfile>("/profil");
        setUser(data);
      } catch {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  if (!user) return null;

  const saveOpenrouterApiKey = async () => {
    if (!openrouterApiKey.trim()) return;

    setSavingOpenrouterApiKey(true);
    setOpenrouterMessage("");
    try {
      await api.patch("/profil", { openrouterApiKey });
      setUser({ ...user, openrouterApiKeyLast4: openrouterApiKey.trim().slice(-4) });
      setOpenrouterApiKey("");
      setOpenrouterMessage("API key tersimpan dengan aman.");
    } catch (error) {
      setOpenrouterMessage(error instanceof Error ? error.message : "Gagal menyimpan API key.");
    } finally {
      setSavingOpenrouterApiKey(false);
    }
  };

  const removeOpenrouterApiKey = async () => {
    setSavingOpenrouterApiKey(true);
    setOpenrouterMessage("");
    try {
      await api.patch("/profil", { removeOpenrouterApiKey: true });
      setUser({ ...user, openrouterApiKeyLast4: null });
      setOpenrouterMessage("API key telah dihapus.");
    } catch (error) {
      setOpenrouterMessage(error instanceof Error ? error.message : "Gagal menghapus API key.");
    } finally {
      setSavingOpenrouterApiKey(false);
    }
  };

  const roleConfig = {
    ADMIN: { label: "Administrator", cls: "bg-violet-100 text-violet-700 border-violet-200" },
    GURU: { label: "Guru", cls: "bg-sky-100 text-sky-700 border-sky-200" },
  };
  const role = roleConfig[user.role] ?? { label: user.role, cls: "bg-gray-100 text-gray-600 border-gray-200" };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 fixed md:relative z-50`}
      >
        {/* <SideBar role={user.role.toLowerCase()} /> */}
        <SideBar role={user.role.toLowerCase() as "admin" | "guru"} />

      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Profil Saya"
          showHamburger
          onHamburgerClick={() => setSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* ── Avatar + nama + badges ── */}
              <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-gray-100">
                <div className="relative group mb-4">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md ring-2 ring-gray-100 object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md ring-2 ring-gray-100 bg-slate-800 flex items-center justify-center text-white text-2xl font-bold select-none">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <button className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera size={18} />
                  </button>
                </div>

                <h1 className="text-lg font-bold text-gray-900 mb-2">{user.name}</h1>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${role.cls}`}>
                    <Shield size={11} />
                    {role.label}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${user.isActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-600 border-red-200"
                      }`}
                  >
                    {user.isActive ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                    {user.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
              </div>

              {/* ── Info rows ── */}
              <div className="px-6 py-2">
                <InfoRow
                  icon={<User size={15} />}
                  label="Nama Lengkap"
                  value={user.name}
                />
                <InfoRow
                  icon={<Mail size={15} />}
                  label="Email"
                  value={user.email}
                />
                <InfoRow
                  icon={<Hash size={15} />}
                  label="NIP"
                  value={
                    user.nip ?? (
                      <span className="text-gray-400 italic font-normal">Tidak diisi</span>
                    )
                  }
                />
                <InfoRow
                  icon={<Building2 size={15} />}
                  label="Nama Sekolah"
                  value={
                    user.namaSekolah ?? (
                      <span className="text-gray-400 italic font-normal">Tidak diisi</span>
                    )
                  }
                />
                <InfoRow
                  icon={<Clock size={15} />}
                  label="Login Terakhir"
                  value={
                    user.lastLoginAt ? (
                      formatDateTime(user.lastLoginAt)
                    ) : (
                      <span className="text-gray-400 italic font-normal">Belum pernah login</span>
                    )
                  }
                />
                <InfoRow
                  icon={<Calendar size={15} />}
                  label="Bergabung Sejak"
                  value={formatDate(user.createdAt)}
                />
              </div>
            </div>

            <div className="mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                  <KeyRound size={16} />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">OpenRouter API Key</h2>
                  <p className="text-xs text-gray-500 mt-1">Dipakai khusus untuk fitur Import Soal AI. Key disimpan terenkripsi dan tidak ditampilkan kembali.</p>
                </div>
              </div>

              <div className="mt-5">
                {user.openrouterApiKeyLast4 ? (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5">
                    <span className="text-xs font-medium text-emerald-700">Tersimpan, berakhir dengan <code>...{user.openrouterApiKeyLast4}</code></span>
                    <button type="button" onClick={removeOpenrouterApiKey} disabled={savingOpenrouterApiKey} className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50">
                      <Trash2 size={13} /> Hapus
                    </button>
                  </div>
                ) : (
                  <p className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">Belum ada API key. Import Soal AI belum dapat digunakan.</p>
                )}

                <div className="relative mt-3">
                  <input
                    type={showOpenrouterApiKey ? "text" : "password"}
                    value={openrouterApiKey}
                    onChange={(event) => setOpenrouterApiKey(event.target.value)}
                    placeholder={user.openrouterApiKeyLast4 ? "Masukkan key baru untuk mengganti" : "sk-or-v1-..."}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-3 pr-10 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    autoComplete="off"
                  />
                  <button type="button" onClick={() => setShowOpenrouterApiKey(!showOpenrouterApiKey)} className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-600" aria-label="Tampilkan atau sembunyikan API key">
                    {showOpenrouterApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button type="button" onClick={saveOpenrouterApiKey} disabled={savingOpenrouterApiKey || !openrouterApiKey.trim()} className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50">
                  {savingOpenrouterApiKey && <Loader2 size={15} className="animate-spin" />}
                  {user.openrouterApiKeyLast4 ? "Ganti API Key" : "Simpan API Key"}
                </button>
                {openrouterMessage && <p className="mt-3 text-xs text-gray-600" role="status">{openrouterMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
