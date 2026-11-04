// // // // // "use client";

// // // // // import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import Sidebar from "@/components/Sidebar";
// // // // // import Header from "@/components/Header";
// // // // // import { api, getToken } from "@/lib/api";
// // // // // import {
// // // // //   BookOpen,
// // // // //   Plus,
// // // // //   Search,
// // // // //   Pencil,
// // // // //   Trash2,
// // // // //   Copy,
// // // // //   ExternalLink,
// // // // //   AlertCircle,
// // // // //   Loader2,
// // // // //   X,
// // // // //   ArrowLeft,
// // // // //   FileText,
// // // // //   ClipboardList,
// // // // //   Users,
// // // // //   TrendingUp,
// // // // //   BarChart2,
// // // // //   CheckCircle,
// // // // //   ChevronRight,
// // // // //   Eye,
// // // // //   EyeOff,
// // // // //   Check,
// // // // //   Hash,
// // // // //   Clock,
// // // // //   Calendar,
// // // // //   Edit3,
// // // // //   ImageIcon,
// // // // //   Upload,
// // // // //   Shuffle,
// // // // //   ListOrdered,
// // // // //   Save,
// // // // //   Zap,
// // // // //   Calculator,
// // // // //   Dumbbell,
// // // // //   Book,
// // // // // } from "lucide-react";

// // // // // // ─── Types ────────────────────────────────────────────────────────────────────
// // // // // type MataPelajaran = {
// // // // //   id: number;
// // // // //   nama: string;
// // // // //   kelas: string;
// // // // //   deskripsi?: string;
// // // // //   warna: string;
// // // // //   totalSoal: number;
// // // // //   totalUjian: number;
// // // // // };

// // // // // type Ujian = {
// // // // //   id: string;
// // // // //   nama: string;
// // // // //   token: string;
// // // // //   kelas: string;
// // // // //   tipe: string;
// // // // //   status: string;
// // // // //   durasi: number;
// // // // //   tanggalMulai?: string;
// // // // //   totalSoal: number;
// // // // //   peserta: string;
// // // // //   linkSiswa: string;   // ← untuk siswa: /siswa/akses-ujian/[id]
// // // // //   linkPreview: string; // ← untuk admin: /siswa/ujian/preview/[id]
// // // // //   soalAcak?: boolean;
// // // // //   soalList?: SoalItem[];
// // // // // };

// // // // // type SoalItem = {
// // // // //   id: string;
// // // // //   pertanyaan: string;
// // // // //   tipe: "pg" | "essay";
// // // // //   opsi: string[];
// // // // //   jawaban: string;
// // // // //   topik: string;
// // // // //   gambar?: string;
// // // // // };

// // // // // type DeleteMapelDetail = {
// // // // //   totalUjian: number;
// // // // //   totalUlangan: number;
// // // // //   totalLatihan: number;
// // // // //   totalKuis: number;
// // // // //   totalSoal: number;
// // // // // };
// // // // // type HasilSiswa = {
// // // // //   nisn: string;
// // // // //   nama: string;
// // // // //   kelas: string;
// // // // //   nilai: number;
// // // // //   benar: number;
// // // // //   salah: number;
// // // // //   lulus: boolean;
// // // // //   pelanggaran: number;
// // // // //   catatan: string[];
// // // // // };

// // // // // type HasilUjian = {
// // // // //   ujian: { id: string; nama: string; durasi: string; totalSoal: number; kelas: string };
// // // // //   summary: {
// // // // //     rataRata: number;
// // // // //     tertinggi: number;
// // // // //     terendah: number;
// // // // //     lulus: number;
// // // // //     gagal: number;
// // // // //     totalSiswa: number;
// // // // //   };
// // // // //   siswa: HasilSiswa[];
// // // // // };



// // // // // // ─── Color System ─────────────────────────────────────────────────────────────
// // // // // const COLORS: Record<string, { bg: string; icon: string; dot: string; hex: string; border: string; light: string }> = {
// // // // //   zinc: { bg: "#f4f4f5", icon: "#18181b", dot: "#52525b", hex: "#18181b", border: "#d4d4d8", light: "#fafafa" },
// // // // //   blue: { bg: "#eff6ff", icon: "#2563eb", dot: "#3b82f6", hex: "#3b82f6", border: "#bfdbfe", light: "#eff6ff" },
// // // // //   violet: { bg: "#f5f3ff", icon: "#7c3aed", dot: "#8b5cf6", hex: "#8b5cf6", border: "#ddd6fe", light: "#f5f3ff" },
// // // // //   emerald: { bg: "#ecfdf5", icon: "#059669", dot: "#10b981", hex: "#10b981", border: "#a7f3d0", light: "#ecfdf5" },
// // // // //   amber: { bg: "#fffbeb", icon: "#d97706", dot: "#f59e0b", hex: "#f59e0b", border: "#fde68a", light: "#fffbeb" },
// // // // //   red: { bg: "#fef2f2", icon: "#dc2626", dot: "#ef4444", hex: "#ef4444", border: "#fecaca", light: "#fef2f2" },
// // // // //   cyan: { bg: "#ecfeff", icon: "#0891b2", dot: "#06b6d4", hex: "#06b6d4", border: "#a5f3fc", light: "#ecfeff" },
// // // // //   pink: { bg: "#fdf2f8", icon: "#be185d", dot: "#ec4899", hex: "#ec4899", border: "#fbcfe8", light: "#fdf2f8" },
// // // // // };

// // // // // const TAB_LABELS: Record<string, string> = {
// // // // //   ujian: "Ujian",
// // // // //   ulangan: "Ulangan",
// // // // //   latihan: "Latihan",
// // // // //   kuis: "Kuis",
// // // // //   soal: "Bank Soal",
// // // // //   nilai: "Nilai Akhir",
// // // // // };

// // // // // // ─── Draft helpers ────────────────────────────────────────────────────────────
// // // // // const DRAFT_KEY = (tab: string) => `admin_add_content_draft_${tab}`;

// // // // // interface DraftData {
// // // // //   step: 1 | 2;
// // // // //   nama: string;
// // // // //   tanggal: string;
// // // // //   durasi: string;
// // // // //   soalAcak: boolean;
// // // // //   soalList: SoalItem[];
// // // // //   soalPertanyaan: string;
// // // // //   soalTipe: "pg" | "essay";
// // // // //   soalTopik: string;
// // // // //   soalOpsi: string[];
// // // // //   soalJawaban: string;
// // // // //   soalGambar?: string;
// // // // //   editingId: string | null;
// // // // // }
// // // // // function exportToExcel(data: HasilUjian, ujianNama: string) {
// // // // //   // Buat CSV sederhana (universal, tanpa library tambahan)
// // // // //   const header = ["No", "NISN", "Nama", "Kelas", "Nilai", "Benar", "Salah", "Status", "Pelanggaran"];
// // // // //   const rows = data.siswa.map((s, i) => [
// // // // //     i + 1,
// // // // //     s.nisn,
// // // // //     s.nama,
// // // // //     s.kelas,
// // // // //     s.nilai,
// // // // //     s.benar,
// // // // //     s.salah,
// // // // //     s.lulus ? "LULUS" : "TIDAK LULUS",
// // // // //     s.pelanggaran,
// // // // //   ]);

// // // // //   // Summary rows
// // // // //   const summaryRows = [
// // // // //     [],
// // // // //     ["RINGKASAN"],
// // // // //     ["Total Peserta", data.summary.totalSiswa],
// // // // //     ["Rata-rata Nilai", data.summary.rataRata],
// // // // //     ["Nilai Tertinggi", data.summary.tertinggi],
// // // // //     ["Nilai Terendah", data.summary.terendah],
// // // // //     ["Lulus", data.summary.lulus],
// // // // //     ["Tidak Lulus", data.summary.gagal],
// // // // //   ];

// // // // //   const allRows = [header, ...rows, ...summaryRows];
// // // // //   const csvContent = allRows
// // // // //     .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
// // // // //     .join("\n");

// // // // //   // Tambahkan BOM untuk Excel agar baca UTF-8 dengan benar
// // // // //   const bom = "\uFEFF";
// // // // //   const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
// // // // //   const url = URL.createObjectURL(blob);
// // // // //   const link = document.createElement("a");
// // // // //   link.href = url;
// // // // //   link.download = `Hasil_${ujianNama.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`;
// // // // //   document.body.appendChild(link);
// // // // //   link.click();
// // // // //   document.body.removeChild(link);
// // // // //   URL.revokeObjectURL(url);
// // // // // }

// // // // // function saveDraft(tab: string, data: DraftData) {
// // // // //   try { sessionStorage.setItem(DRAFT_KEY(tab), JSON.stringify(data)); } catch (_) { }
// // // // // }
// // // // // function loadDraft(tab: string): DraftData | null {
// // // // //   try { const raw = sessionStorage.getItem(DRAFT_KEY(tab)); return raw ? JSON.parse(raw) : null; } catch (_) { return null; }
// // // // // }
// // // // // function clearDraft(tab: string) {
// // // // //   try { sessionStorage.removeItem(DRAFT_KEY(tab)); } catch (_) { }
// // // // // }

// // // // // // ─── SoalImageUpload ──────────────────────────────────────────────────────────
// // // // // function SoalImageUpload({ value, onChange }: { value?: string; onChange: (v?: string) => void }) {
// // // // //   const fileRef = useRef<HTMLInputElement>(null);
// // // // //   function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
// // // // //     const file = e.target.files?.[0];
// // // // //     if (!file) return;
// // // // //     if (file.size > 5 * 1024 * 1024) { alert("Maks 5MB"); return; }
// // // // //     const r = new FileReader();
// // // // //     r.onload = (ev) => onChange(ev.target?.result as string);
// // // // //     r.readAsDataURL(file);
// // // // //   }
// // // // //   return (
// // // // //     <div>
// // // // //       <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
// // // // //         Gambar Soal <span className="text-slate-400 font-normal">(opsional)</span>
// // // // //       </label>
// // // // //       {value ? (
// // // // //         <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
// // // // //           <img src={value} alt="" className="w-full max-h-48 object-contain" />
// // // // //           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
// // // // //             <button type="button" onClick={() => fileRef.current?.click()} className="h-8 px-3 bg-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 shadow">
// // // // //               <Upload className="w-3.5 h-3.5" /> Ganti
// // // // //             </button>
// // // // //             <button type="button" onClick={() => onChange(undefined)} className="h-8 px-3 bg-red-500 rounded-lg text-[11px] font-semibold text-white flex items-center gap-1.5 shadow">
// // // // //               <Trash2 className="w-3.5 h-3.5" /> Hapus
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <button
// // // // //           type="button"
// // // // //           onClick={() => fileRef.current?.click()}
// // // // //           className="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all group"
// // // // //         >
// // // // //           <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
// // // // //             <ImageIcon className="w-4 h-4 text-slate-400" />
// // // // //           </div>
// // // // //           <div className="text-center">
// // // // //             <p className="text-[12px] font-semibold text-slate-500">Klik untuk upload gambar</p>
// // // // //             <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, GIF · Maks 5MB</p>
// // // // //           </div>
// // // // //         </button>
// // // // //       )}
// // // // //       <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ─── Helper ───────────────────────────────────────────────────────────────────
// // // // // function isSoalLiveValid(pertanyaan: string) {
// // // // //   return pertanyaan.trim().length > 0;
// // // // // }
// // // // // function KkmField({ kkm, setKkm }: { kkm: number; setKkm: (v: number) => void }) {
// // // // //   const [editing, setEditing] = useState(false);
// // // // //   const [tempVal, setTempVal] = useState(String(kkm));
// // // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // // //   function startEdit() {
// // // // //     setTempVal(String(kkm));
// // // // //     setEditing(true);
// // // // //     // fokus setelah render
// // // // //     setTimeout(() => inputRef.current?.select(), 0);
// // // // //   }

// // // // //   function commit() {
// // // // //     const parsed = parseInt(tempVal);
// // // // //     if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
// // // // //       setKkm(parsed);
// // // // //     }
// // // // //     setEditing(false);
// // // // //   }

// // // // //   function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
// // // // //     if (e.key === "Enter") commit();
// // // // //     if (e.key === "Escape") setEditing(false);
// // // // //   }

// // // // //   return (
// // // // //     <div className="flex items-center gap-2">
// // // // //       <label className="text-[12px] font-semibold text-slate-600">KKM:</label>
// // // // //       {editing ? (
// // // // //         <input
// // // // //           ref={inputRef}
// // // // //           type="number"
// // // // //           value={tempVal}
// // // // //           onChange={e => setTempVal(e.target.value)}
// // // // //           onBlur={commit}
// // // // //           onKeyDown={handleKeyDown}
// // // // //           autoFocus
// // // // //           className="w-16 h-9 text-center border-[1.5px] border-zinc-900 rounded-lg text-[13px] font-semibold text-zinc-900 bg-white outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // // //         />
// // // // //       ) : (
// // // // //         // <button
// // // // //         //   onDoubleClick={startEdit}
// // // // //         //   onClick={startEdit}        // single-click juga bisa, hapus baris ini jika mau double-click only
// // // // //         //   title="Klik untuk ubah KKM"
// // // // //         //   className="w-16 h-9 text-center border-[1.5px] border-slate-200 rounded-lg text-[13px] font-semibold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-text"
// // // // //         // >
// // // // //         //   {kkm}
// // // // //         // </button>
// // // // //         <button
// // // // //           onDoubleClick={startEdit}
// // // // //           title="Klik 2x untuk ubah KKM"
// // // // //           className="w-16 h-9 text-center border-[1.5px] border-slate-200 rounded-lg text-[13px] font-semibold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none"
// // // // //         >
// // // // //           {kkm}
// // // // //         </button>
// // // // //       )}
// // // // //       {!editing && (
// // // // //         <span className="text-[10px] text-slate-400 hidden sm:inline">klik untuk ubah</span>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function HasilUjianModal({
// // // // //   ujian,
// // // // //   onClose,
// // // // // }: {
// // // // //   ujian: Ujian;
// // // // //   onClose: () => void;
// // // // // }) {
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [data, setData] = useState<HasilUjian | null>(null);
// // // // //   const [error, setError] = useState("");
// // // // //   const [kkmModal, setKkmModal] = useState(70);

// // // // //   // Filter & sort state (client-side saja)
// // // // //   const [filter, setFilter] = useState("all");
// // // // //   const [sort, setSort] = useState("nama");
// // // // //   const [dir, setDir] = useState<"asc" | "desc">("asc");

// // // // //   const [selectedNisn, setSelectedNisn] = useState<string | null>(null);
// // // // //   const [detailData, setDetailData] = useState<any | null>(null);
// // // // //   const [detailLoading, setDetailLoading] = useState(false);

// // // // //   function KkmInline() {
// // // // //     const [editingKkm, setEditingKkm] = useState(false);
// // // // //     const [tempKkm, setTempKkm] = useState(String(kkmModal));
// // // // //     const ref = useRef<HTMLInputElement>(null);

// // // // //     function commit() {
// // // // //       const v = parseInt(tempKkm);
// // // // //       if (!isNaN(v) && v > 0 && v <= 100) setKkmModal(v);
// // // // //       setEditingKkm(false);
// // // // //     }

// // // // //     return (
// // // // //       <div className="flex items-center gap-1.5">
// // // // //         <span className="text-[11px] text-slate-400">KKM:</span>
// // // // //         {editingKkm ? (
// // // // //           <input
// // // // //             ref={ref}
// // // // //             type="number"
// // // // //             value={tempKkm}
// // // // //             autoFocus
// // // // //             onChange={e => setTempKkm(e.target.value)}
// // // // //             onBlur={commit}
// // // // //             onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditingKkm(false); }}
// // // // //             className="w-14 h-6 text-center border-[1.5px] border-zinc-900 rounded-md text-[11px] font-bold text-zinc-900 bg-white outline-none"
// // // // //           />
// // // // //         ) : (
// // // // //           <button
// // // // //             onDoubleClick={() => { setTempKkm(String(kkmModal)); setEditingKkm(true); setTimeout(() => ref.current?.select(), 0); }}
// // // // //             title="Klik 2x untuk ubah KKM"
// // // // //             className="min-w-[2rem] h-6 px-2 border-[1.5px] border-slate-200 rounded-md text-[11px] font-bold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none"
// // // // //           >
// // // // //             {kkmModal}
// // // // //           </button>
// // // // //         )}
// // // // //         {!editingKkm && <span className="text-[10px] text-slate-300 hidden sm:inline">klik 2×</span>}
// // // // //       </div>
// // // // //     );
// // // // //   }
// // // // //   // ── Fetch SEKALI saja saat modal dibuka ──
// // // // //   useEffect(() => {
// // // // //     async function fetchHasil() {
// // // // //       setLoading(true);
// // // // //       try {
// // // // //         // Ambil semua data tanpa filter dari server
// // // // //         const res = await api.get<HasilUjian>(`/ujian/${ujian.id}/laporan`);
// // // // //         setData(res as HasilUjian);
// // // // //       } catch (e) {
// // // // //         setError("Gagal memuat data hasil ujian");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     }
// // // // //     fetchHasil();
// // // // //   }, [ujian.id]); // hanya re-fetch jika ujian.id berubah

// // // // //   // ── Filter & sort dilakukan di client (useMemo) ──
// // // // //   const filteredSiswa = useMemo(() => {
// // // // //     if (!data) return [];
// // // // //     let list = [...data.siswa];

// // // // //     // Filter
// // // // //     if (filter === "lulus") list = list.filter(s => s.lulus);
// // // // //     else if (filter === "gagal") list = list.filter(s => !s.lulus);
// // // // //     else if (filter === "viol") list = list.filter(s => s.pelanggaran > 0);

// // // // //     // Sort
// // // // //     list.sort((a, b) => {
// // // // //       const va = (a as any)[sort];
// // // // //       const vb = (b as any)[sort];
// // // // //       if (typeof va === "string") {
// // // // //         return dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
// // // // //       }
// // // // //       return dir === "asc" ? va - vb : vb - va;
// // // // //     });

// // // // //     return list;
// // // // //   }, [data, filter, sort, dir]);

// // // // //   async function fetchDetailSiswa(nisn: string) {
// // // // //     setDetailLoading(true);
// // // // //     setSelectedNisn(nisn);
// // // // //     try {
// // // // //       const res = await api.get(`/ujian/${ujian.id}/laporan/siswa/${nisn}`);
// // // // //       setDetailData(res);
// // // // //     } catch {
// // // // //       setDetailData(null);
// // // // //     } finally {
// // // // //       setDetailLoading(false);
// // // // //     }
// // // // //   }

// // // // //   function toggleSort(key: string) {
// // // // //     if (sort === key) setDir(d => d === "asc" ? "desc" : "asc");
// // // // //     else { setSort(key); setDir("asc"); }
// // // // //   }

// // // // //   const SortIcon = ({ col }: { col: string }) => (
// // // // //     <span className={`ml-0.5 text-[9px] ${sort === col ? "text-zinc-900" : "text-slate-300"}`}>
// // // // //       {sort === col ? (dir === "asc" ? "↑" : "↓") : "↕"}
// // // // //     </span>
// // // // //   );

// // // // //   return (
// // // // //     <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center">
// // // // //       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
// // // // //       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-4xl shadow-2xl z-10 max-h-[95vh] flex flex-col">
// // // // //         {/* Header */}
// // // // //         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
// // // // //           <div>
// // // // //             <h3 className="text-base font-bold text-zinc-900">Hasil Ujian</h3>
// // // // //             <p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p>
// // // // //           </div>
// // // // //           <div className="flex items-center gap-2">
// // // // //             {/* ── Tombol Export Excel ── */}
// // // // //             {data && !selectedNisn && (
// // // // //               <button
// // // // //                 onClick={() => exportToExcel(data, ujian.nama)}
// // // // //                 className="inline-flex items-center gap-1.5 h-8 px-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
// // // // //                 title="Export ke Excel/CSV"
// // // // //               >
// // // // //                 {/* Download icon — pastikan Download sudah di-import dari lucide-react */}
// // // // //                 <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// // // // //                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// // // // //                   <polyline points="7 10 12 15 17 10" />
// // // // //                   <line x1="12" y1="15" x2="12" y2="3" />
// // // // //                 </svg>
// // // // //                 Export Excel
// // // // //               </button>
// // // // //             )}
// // // // //             <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
// // // // //               <X className="w-4 h-4" />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="flex-1 overflow-y-auto">
// // // // //           {/* Detail siswa panel */}
// // // // //           {selectedNisn && (
// // // // //             <div className="border-b border-slate-100 bg-slate-50">
// // // // //               <div className="p-4 flex items-center justify-between">
// // // // //                 <div className="flex items-center gap-2">
// // // // //                   <button
// // // // //                     onClick={() => { setSelectedNisn(null); setDetailData(null); }}
// // // // //                     className="p-1.5 rounded-lg hover:bg-white border border-slate-200 text-slate-500"
// // // // //                   >
// // // // //                     <ArrowLeft className="w-3.5 h-3.5" />
// // // // //                   </button>
// // // // //                   <p className="text-[13px] font-bold text-zinc-900">Detail Jawaban Siswa</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //               {detailLoading ? (
// // // // //                 <div className="flex items-center justify-center py-8">
// // // // //                   <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
// // // // //                 </div>
// // // // //               ) : detailData ? (
// // // // //                 <div className="px-4 pb-4 space-y-3">
// // // // //                   <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap gap-4">
// // // // //                     <div>
// // // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Nama</p>
// // // // //                       <p className="text-[13px] font-bold text-zinc-900">{detailData.siswa?.nama}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">NISN</p>
// // // // //                       <p className="text-[13px] font-semibold text-zinc-700">{detailData.siswa?.nisn}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Kelas</p>
// // // // //                       <p className="text-[13px] font-semibold text-zinc-700">{detailData.siswa?.kelas}</p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Nilai</p>
// // // // //                       <p className={`text-[18px] font-black ${detailData.siswa?.lulus ? "text-emerald-600" : "text-red-600"}`}>
// // // // //                         {detailData.siswa?.nilai}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Benar / Salah</p>
// // // // //                       <p className="text-[13px] font-semibold">
// // // // //                         <span className="text-emerald-600">{detailData.siswa?.benar}✓</span>
// // // // //                         {" / "}
// // // // //                         <span className="text-red-500">{detailData.siswa?.salah}✗</span>
// // // // //                       </p>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Status</p>
// // // // //                       {detailData.siswa?.lulus
// // // // //                         ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
// // // // //                         : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>
// // // // //                       }
// // // // //                     </div>
// // // // //                     {detailData.siswa?.pelanggaran > 0 && (
// // // // //                       <div>
// // // // //                         <p className="text-[10px] text-slate-400 font-semibold uppercase">Pelanggaran</p>
// // // // //                         <p className="text-[13px] font-bold text-red-600">{detailData.siswa?.pelanggaran}x</p>
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </div>
// // // // //                   <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
// // // // //                     <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
// // // // //                       <p className="text-[12px] font-bold text-zinc-900">Rincian Jawaban</p>
// // // // //                     </div>
// // // // //                     <div className="divide-y divide-slate-50">
// // // // //                       {(detailData.jawaban || []).map((j: any) => (
// // // // //                         <div key={j.nomorSoal} className={`px-4 py-3 flex items-start gap-3 ${j.isBenar ? "bg-emerald-50/30" : "bg-red-50/30"}`}>
// // // // //                           <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${j.isBenar ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
// // // // //                             {j.nomorSoal}
// // // // //                           </span>
// // // // //                           <div className="flex-1 min-w-0">
// // // // //                             <p className="text-[12px] text-zinc-800 mb-1">{j.pertanyaan}</p>
// // // // //                             <div className="flex items-center gap-3 flex-wrap">
// // // // //                               <span className="text-[11px] text-slate-500">
// // // // //                                 Jawaban: <strong className={j.isBenar ? "text-emerald-600" : "text-red-500"}>{j.jawabanSiswa ?? "—"}</strong>
// // // // //                               </span>
// // // // //                               {!j.isBenar && (
// // // // //                                 <span className="text-[11px] text-slate-500">
// // // // //                                   Benar: <strong className="text-emerald-600">{j.jawabanBenar}</strong>
// // // // //                                 </span>
// // // // //                               )}
// // // // //                               {j.isRagu && (
// // // // //                                 <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">⚑ Ragu</span>
// // // // //                               )}
// // // // //                             </div>
// // // // //                           </div>
// // // // //                           <div className="flex-shrink-0">
// // // // //                             {j.isBenar
// // // // //                               ? <CheckCircle className="w-4 h-4 text-emerald-500" />
// // // // //                               : <AlertCircle className="w-4 h-4 text-red-400" />
// // // // //                             }
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <div className="px-4 pb-4 text-center py-6 text-[12px] text-slate-400">Gagal memuat detail</div>
// // // // //               )}
// // // // //             </div>
// // // // //           )}

// // // // //           {!selectedNisn && (
// // // // //             <div className="p-5 space-y-4">
// // // // //               {error && (
// // // // //                 <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[12px] text-red-600 flex items-center gap-2">
// // // // //                   <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
// // // // //                 </div>
// // // // //               )}

// // // // //               {loading ? (
// // // // //                 <div className="flex items-center justify-center py-16">
// // // // //                   <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
// // // // //                 </div>
// // // // //               ) : data ? (
// // // // //                 <>
// // // // //                   {/* Summary cards */}
// // // // //                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
// // // // //                     {[
// // // // //                       { label: "Total Peserta", val: data.summary.totalSiswa, color: "#18181b", icon: <Users className="w-3.5 h-3.5" /> },
// // // // //                       { label: "Rata-rata Nilai", val: data.summary.rataRata, color: "#2563eb", icon: <BarChart2 className="w-3.5 h-3.5" /> },
// // // // //                       { label: "Tertinggi", val: data.summary.tertinggi, color: "#059669", icon: <TrendingUp className="w-3.5 h-3.5" /> },
// // // // //                       { label: "Terendah", val: data.summary.terendah, color: "#dc2626", icon: <TrendingUp className="w-3.5 h-3.5 rotate-180" /> },
// // // // //                       { label: "Lulus", val: data.summary.lulus, color: "#059669", icon: <CheckCircle className="w-3.5 h-3.5" /> },
// // // // //                       { label: "Tidak Lulus", val: data.summary.gagal, color: "#dc2626", icon: <AlertCircle className="w-3.5 h-3.5" /> },
// // // // //                     ].map(s => (
// // // // //                       <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
// // // // //                         <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>
// // // // //                           {s.icon}
// // // // //                         </div>
// // // // //                         <div>
// // // // //                           <p className="text-lg font-bold text-zinc-900">{s.val}</p>
// // // // //                           <p className="text-[10px] text-slate-400">{s.label}</p>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>

// // // // //                   {/* Filter — tidak trigger API, hanya update state lokal */}
// // // // //                   <div className="flex gap-2 flex-wrap items-center justify-between">
// // // // //                     <div className="flex gap-2 flex-wrap">
// // // // //                       {[
// // // // //                         { val: "all", label: "Semua" },
// // // // //                         { val: "lulus", label: "Lulus" },
// // // // //                         { val: "gagal", label: "Tidak Lulus" },
// // // // //                         { val: "viol", label: "Ada Pelanggaran" },
// // // // //                       ].map(f => (
// // // // //                         <button
// // // // //                           key={f.val}
// // // // //                           onClick={() => setFilter(f.val)}
// // // // //                           className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${filter === f.val ? "bg-zinc-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
// // // // //                         >
// // // // //                           {f.label}
// // // // //                           {f.val !== "all" && data && (
// // // // //                             <span className="ml-1.5 opacity-60">
// // // // //                               ({f.val === "lulus" ? data.summary.lulus
// // // // //                                 : f.val === "gagal" ? data.summary.gagal
// // // // //                                   : data.siswa.filter(s => s.pelanggaran > 0).length})
// // // // //                             </span>
// // // // //                           )}
// // // // //                         </button>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                     <span className="text-[11px] text-slate-400">{filteredSiswa.length} ditampilkan</span>
// // // // //                   </div>

// // // // //                   {/* Tabel siswa */}
// // // // //                   {filteredSiswa.length === 0 ? (
// // // // //                     <div className="text-center py-12">
// // // // //                       <Users className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// // // // //                       <p className="text-[13px] text-slate-400">
// // // // //                         {filter === "all"
// // // // //                           ? "Belum ada peserta yang menyelesaikan ujian ini"
// // // // //                           : "Tidak ada siswa yang sesuai filter ini"}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
// // // // //                       <div className="overflow-x-auto">
// // // // //                         <table className="w-full" style={{ minWidth: "600px" }}>
// // // // //                           <thead className="border-b border-slate-100 bg-slate-50/50">
// // // // //                             <tr>
// // // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
// // // // //                               <th
// // // // //                                 className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700"
// // // // //                                 onClick={() => toggleSort("nama")}
// // // // //                               >
// // // // //                                 Nama <SortIcon col="nama" />
// // // // //                               </th>
// // // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Kelas</th>
// // // // //                               <th
// // // // //                                 className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700"
// // // // //                                 onClick={() => toggleSort("nilai")}
// // // // //                               >
// // // // //                                 Nilai <SortIcon col="nilai" />
// // // // //                               </th>
// // // // //                               <th
// // // // //                                 className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell"
// // // // //                                 onClick={() => toggleSort("benar")}
// // // // //                               >
// // // // //                                 Benar <SortIcon col="benar" />
// // // // //                               </th>
// // // // //                               <th
// // // // //                                 className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell"
// // // // //                                 onClick={() => toggleSort("salah")}
// // // // //                               >
// // // // //                                 Salah <SortIcon col="salah" />
// // // // //                               </th>
// // // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
// // // // //                               <th
// // // // //                                 className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden sm:table-cell"
// // // // //                                 onClick={() => toggleSort("pelanggaran")}
// // // // //                               >
// // // // //                                 Pelang. <SortIcon col="pelanggaran" />
// // // // //                               </th>
// // // // //                               <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Detail</th>
// // // // //                             </tr>
// // // // //                           </thead>
// // // // //                           <tbody className="divide-y divide-slate-50">
// // // // //                             {filteredSiswa.map((s, i) => {
// // // // //                               const nilaiColor = s.nilai >= 90 ? "#059669" : s.nilai >= 80 ? "#10b981" : s.nilai >= 70 ? "#2563eb" : "#dc2626";
// // // // //                               return (
// // // // //                                 <tr key={s.nisn} className="hover:bg-slate-50/50">
// // // // //                                   <td className="px-4 py-3 text-[11px] text-slate-400 font-semibold">{i + 1}</td>
// // // // //                                   <td className="px-4 py-3">
// // // // //                                     <p className="font-semibold text-zinc-900 text-[12px]">{s.nama}</p>
// // // // //                                     <p className="text-[10px] text-slate-400">{s.nisn}</p>
// // // // //                                   </td>
// // // // //                                   <td className="px-4 py-3 text-[12px] text-slate-500 hidden sm:table-cell">{s.kelas}</td>
// // // // //                                   <td className="px-4 py-3">
// // // // //                                     <span className="text-[15px] font-black" style={{ color: nilaiColor }}>{s.nilai}</span>
// // // // //                                   </td>
// // // // //                                   <td className="px-4 py-3 hidden md:table-cell">
// // // // //                                     <span className="text-[12px] font-semibold text-emerald-600">{s.benar}</span>
// // // // //                                   </td>
// // // // //                                   <td className="px-4 py-3 hidden md:table-cell">
// // // // //                                     <span className="text-[12px] font-semibold text-red-500">{s.salah}</span>
// // // // //                                   </td>
// // // // //                                   <td className="px-4 py-3">
// // // // //                                     {s.lulus
// // // // //                                       ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
// // // // //                                       : <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">GAGAL</span>
// // // // //                                     }
// // // // //                                   </td>
// // // // //                                   <td className="px-4 py-3 hidden sm:table-cell">
// // // // //                                     {s.pelanggaran > 0
// // // // //                                       ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">{s.pelanggaran}x</span>
// // // // //                                       : <span className="text-[11px] text-slate-300">—</span>
// // // // //                                     }
// // // // //                                   </td>
// // // // //                                   <td className="px-4 py-3 text-right">
// // // // //                                     <button
// // // // //                                       onClick={() => fetchDetailSiswa(s.nisn)}
// // // // //                                       className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors"
// // // // //                                     >
// // // // //                                       Lihat
// // // // //                                     </button>
// // // // //                                   </td>
// // // // //                                 </tr>
// // // // //                               );
// // // // //                             })}
// // // // //                           </tbody>
// // // // //                         </table>
// // // // //                       </div>
// // // // //                       <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
// // // // //                         <span className="text-[11px] text-slate-400">{filteredSiswa.length} peserta</span>
// // // // //                         {/* <span className="text-[11px] text-slate-400">KKM: <strong className="text-zinc-900">70</strong></span> */}
// // // // //                         <KkmInline />
// // // // //                       </div>

// // // // //                     </div>
// // // // //                   )}
// // // // //                 </>
// // // // //               ) : null}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         <div className="p-5 border-t border-slate-100 shrink-0">
// // // // //           <button onClick={onClose} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">
// // // // //             Tutup
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ─── AddContentModal ──────────────────────────────────────────────────────────
// // // // // function AddContentModal({
// // // // //   activeTab,
// // // // //   onClose,
// // // // //   onSave,
// // // // // }: {
// // // // //   activeTab: string;
// // // // //   onClose: () => void;
// // // // //   onSave: (data: { nama: string; tanggal: string; durasi: string; soalAcak: boolean; soalList: SoalItem[] }) => void;
// // // // // }) {
// // // // //   const label = TAB_LABELS[activeTab] || "Konten";
// // // // //   const draft = loadDraft(activeTab);

// // // // //   const [step, setStep] = useState<1 | 2>(draft?.step ?? 1);
// // // // //   const [nama, setNama] = useState(draft?.nama ?? "");
// // // // //   const [tanggal, setTanggal] = useState(draft?.tanggal ?? "");
// // // // //   const [durasi, setDurasi] = useState(draft?.durasi ?? "");
// // // // //   const [soalAcak, setSoalAcak] = useState<boolean>(draft?.soalAcak ?? true);
// // // // //   const [soalList, setSoalList] = useState<SoalItem[]>(draft?.soalList ?? []);

// // // // //   const [soalPertanyaan, setSoalPertanyaan] = useState(draft?.soalPertanyaan ?? "");
// // // // //   const [soalTipe, setSoalTipe] = useState<"pg" | "essay">(draft?.soalTipe ?? "pg");
// // // // //   const [soalTopik, setSoalTopik] = useState(draft?.soalTopik ?? "");
// // // // //   const [soalOpsi, setSoalOpsi] = useState<string[]>(draft?.soalOpsi ?? ["", "", "", ""]);
// // // // //   const [soalJawaban, setSoalJawaban] = useState(draft?.soalJawaban ?? "");
// // // // //   const [soalGambar, setSoalGambar] = useState<string | undefined>(draft?.soalGambar);
// // // // //   const [editingId, setEditingId] = useState<string | null>(draft?.editingId ?? null);
// // // // //   const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(draft ? new Date() : null);

// // // // //   const liveIsValid = isSoalLiveValid(soalPertanyaan);
// // // // //   const totalSoalPreview = soalList.length + (liveIsValid && !editingId ? 1 : 0);

// // // // //   const persistDraft = useCallback(() => {
// // // // //     saveDraft(activeTab, { step, nama, tanggal, durasi, soalAcak, soalList, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, soalGambar, editingId });
// // // // //     setDraftSavedAt(new Date());
// // // // //   }, [step, nama, tanggal, durasi, soalAcak, soalList, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, soalGambar, editingId, activeTab]);

// // // // //   useEffect(() => {
// // // // //     const timer = setTimeout(persistDraft, 400);
// // // // //     return () => clearTimeout(timer);
// // // // //   }, [persistDraft]);

// // // // //   function resetSoalForm() {
// // // // //     setSoalPertanyaan(""); setSoalTopik(""); setSoalOpsi(["", "", "", ""]); setSoalJawaban(""); setSoalTipe("pg"); setSoalGambar(undefined);
// // // // //   }

// // // // //   function commitLiveSoal(): SoalItem[] {
// // // // //     if (!liveIsValid) return soalList;
// // // // //     if (editingId) {
// // // // //       return soalList.map(s =>
// // // // //         s.id === editingId
// // // // //           ? { id: editingId, pertanyaan: soalPertanyaan.trim(), tipe: soalTipe, opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [], jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar }
// // // // //           : s
// // // // //       );
// // // // //     }
// // // // //     const newSoal: SoalItem = {
// // // // //       id: Date.now().toString(),
// // // // //       pertanyaan: soalPertanyaan.trim(), tipe: soalTipe,
// // // // //       opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [],
// // // // //       jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar,
// // // // //     };
// // // // //     return [...soalList, newSoal];
// // // // //   }

// // // // //   function handleAddSoal() {
// // // // //     if (!soalPertanyaan.trim()) return;
// // // // //     const newSoal: SoalItem = {
// // // // //       id: editingId || Date.now().toString(),
// // // // //       pertanyaan: soalPertanyaan.trim(), tipe: soalTipe,
// // // // //       opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [],
// // // // //       jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar,
// // // // //     };
// // // // //     if (editingId) { setSoalList(prev => prev.map(s => s.id === editingId ? newSoal : s)); setEditingId(null); }
// // // // //     else setSoalList(prev => [...prev, newSoal]);
// // // // //     resetSoalForm();
// // // // //   }

// // // // //   function handleEditSoal(s: SoalItem) {
// // // // //     if (liveIsValid && !editingId) {
// // // // //       setSoalList(commitLiveSoal());
// // // // //       resetSoalForm();
// // // // //     }
// // // // //     setEditingId(s.id); setSoalPertanyaan(s.pertanyaan); setSoalTipe(s.tipe); setSoalTopik(s.topik);
// // // // //     setSoalOpsi(s.tipe === "pg" ? [...s.opsi, "", "", "", ""].slice(0, 4) : ["", "", "", ""]);
// // // // //     setSoalJawaban(s.jawaban); setSoalGambar(s.gambar);
// // // // //   }

// // // // //   function handleSave() {
// // // // //     const finalList = commitLiveSoal();
// // // // //     clearDraft(activeTab);
// // // // //     onSave({ nama, tanggal, durasi, soalAcak, soalList: finalList });
// // // // //   }

// // // // //   function handleClose() { onClose(); }
// // // // //   function handleDiscardDraft() {
// // // // //     clearDraft(activeTab); setStep(1); setNama(""); setTanggal(""); setDurasi("");
// // // // //     setSoalAcak(true); setSoalList([]); resetSoalForm(); setEditingId(null); setDraftSavedAt(null);
// // // // //   }

// // // // //   const hasDraftData = nama.trim() !== "" || soalList.length > 0 || liveIsValid;

// // // // //   return (
// // // // //     <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
// // // // //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
// // // // //       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
// // // // //         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
// // // // //           <div className="flex items-center gap-3">
// // // // //             {step === 2 && (
// // // // //               <button onClick={() => setStep(1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
// // // // //                 <ArrowLeft className="w-4 h-4" />
// // // // //               </button>
// // // // //             )}
// // // // //             <div>
// // // // //               <div className="flex items-center gap-2">
// // // // //                 <h3 className="text-base font-bold text-zinc-900">Tambah {label}</h3>
// // // // //                 {draftSavedAt && hasDraftData && (
// // // // //                   <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
// // // // //                     <Save className="w-2.5 h-2.5" /> Draft tersimpan
// // // // //                   </span>
// // // // //                 )}
// // // // //               </div>
// // // // //               <div className="flex items-center gap-1.5 mt-0.5">
// // // // //                 <span className={`w-5 h-1.5 rounded-full transition-colors ${step === 1 ? "bg-zinc-900" : "bg-zinc-200"}`} />
// // // // //                 <span className={`w-5 h-1.5 rounded-full transition-colors ${step === 2 ? "bg-zinc-900" : "bg-zinc-200"}`} />
// // // // //                 <p className="text-[10px] text-slate-400 ml-1">Langkah {step} dari 2</p>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="flex items-center gap-2">
// // // // //             {hasDraftData && (
// // // // //               <button onClick={handleDiscardDraft} className="text-[10px] font-semibold text-red-400 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">
// // // // //                 Hapus draft
// // // // //               </button>
// // // // //             )}
// // // // //             <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="flex-1 overflow-y-auto">
// // // // //           {step === 1 && (
// // // // //             <div className="p-5 space-y-4">
// // // // //               <div>
// // // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">
// // // // //                   Nama {label} <span className="text-red-500">*</span>
// // // // //                 </label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={nama}
// // // // //                   onChange={e => setNama(e.target.value)}
// // // // //                   placeholder={`e.g. UAS ${label} Semester 2`}
// // // // //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="grid grid-cols-2 gap-3">
// // // // //                 <div>
// // // // //                   <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label>
// // // // //                   <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label>
// // // // //                   <input type="number" value={durasi} onChange={e => setDurasi(e.target.value)} placeholder="60" className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Urutan Soal untuk Siswa</label>
// // // // //                 <div className="grid grid-cols-2 gap-2.5">
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => setSoalAcak(true)}
// // // // //                     className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${soalAcak ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}
// // // // //                   >
// // // // //                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${soalAcak ? "bg-violet-100" : "bg-slate-100"}`}>
// // // // //                       <Shuffle className={`w-4 h-4 ${soalAcak ? "text-violet-600" : "text-slate-400"}`} />
// // // // //                     </div>
// // // // //                     <div className="flex-1 min-w-0">
// // // // //                       <p className={`text-[12px] font-bold ${soalAcak ? "text-violet-700" : "text-zinc-700"}`}>Soal Acak</p>
// // // // //                       <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Urutan soal diacak berbeda tiap siswa</p>
// // // // //                       {soalAcak && (
// // // // //                         <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded-full">
// // // // //                           <Check className="w-2.5 h-2.5" /> Aktif
// // // // //                         </span>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </button>
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => setSoalAcak(false)}
// // // // //                     className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${!soalAcak ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}
// // // // //                   >
// // // // //                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${!soalAcak ? "bg-blue-100" : "bg-slate-100"}`}>
// // // // //                       <ListOrdered className={`w-4 h-4 ${!soalAcak ? "text-blue-600" : "text-slate-400"}`} />
// // // // //                     </div>
// // // // //                     <div className="flex-1 min-w-0">
// // // // //                       <p className={`text-[12px] font-bold ${!soalAcak ? "text-blue-700" : "text-zinc-700"}`}>Soal Berurutan</p>
// // // // //                       <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Semua siswa mengerjakan soal dengan urutan yang sama</p>
// // // // //                       {!soalAcak && (
// // // // //                         <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">
// // // // //                           <Check className="w-2.5 h-2.5" /> Aktif
// // // // //                         </span>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
// // // // //                 <FileText className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
// // // // //                 <p className="text-[11px] text-blue-700">
// // // // //                   Di langkah berikutnya, Anda bisa langsung menambahkan soal-soal untuk {label.toLowerCase()} ini.
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           {step === 2 && (
// // // // //             <div className="p-5 space-y-4">
// // // // //               <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-[11px] font-semibold ${soalAcak ? "bg-violet-50 border-violet-200 text-violet-700" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
// // // // //                 {soalAcak ? <Shuffle className="w-3.5 h-3.5 flex-shrink-0" /> : <ListOrdered className="w-3.5 h-3.5 flex-shrink-0" />}
// // // // //                 <span>
// // // // //                   Mode: <strong>{soalAcak ? "Soal Acak" : "Soal Berurutan"}</strong>
// // // // //                   {" · "}
// // // // //                   <button className="underline font-semibold opacity-70 hover:opacity-100" onClick={() => setStep(1)}>Ubah</button>
// // // // //                 </span>
// // // // //               </div>

// // // // //               {soalList.length > 0 && (
// // // // //                 <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
// // // // //                   <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
// // // // //                     <h4 className="font-semibold text-zinc-900 text-[13px]">Soal Ditambahkan</h4>
// // // // //                     <span className="text-[11px] text-slate-400">{soalList.length} soal</span>
// // // // //                   </div>
// // // // //                   <div className="divide-y divide-slate-50">
// // // // //                     {soalList.map((s, i) => (
// // // // //                       <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId === s.id ? "bg-amber-50" : ""}`}>
// // // // //                         <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
// // // // //                         <div className="flex-1 min-w-0">
// // // // //                           <p className="text-[12px] font-medium text-zinc-900 truncate">{s.pertanyaan}</p>
// // // // //                           <div className="flex items-center gap-2 mt-0.5 flex-wrap">
// // // // //                             <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "pg" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>
// // // // //                               {s.tipe === "pg" ? "Pilihan Ganda" : "Essay"}
// // // // //                             </span>
// // // // //                             {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
// // // // //                             {s.gambar && (
// // // // //                               <span className="inline-flex items-center gap-0.5 text-[10px] text-violet-500 font-semibold">
// // // // //                                 <ImageIcon className="w-3 h-3" /> Gambar
// // // // //                               </span>
// // // // //                             )}
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         <div className="flex items-center gap-1 flex-shrink-0">
// // // // //                           <button onClick={() => handleEditSoal(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
// // // // //                           <button onClick={() => setSoalList(prev => prev.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}

// // // // //               <div className={`border rounded-[14px] p-4 space-y-3 ${editingId ? "border-amber-200 bg-amber-50/50" : liveIsValid ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 bg-slate-50/50"}`}>
// // // // //                 <div className="flex items-center justify-between">
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <h4 className="font-semibold text-zinc-900 text-[13px]">
// // // // //                       {editingId ? `✏️ Edit Soal #${soalList.findIndex(s => s.id === editingId) + 1}` : `Soal #${soalList.length + 1}`}
// // // // //                     </h4>
// // // // //                     {liveIsValid && !editingId && (
// // // // //                       <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">
// // // // //                         <Check className="w-2.5 h-2.5" /> Akan disimpan
// // // // //                       </span>
// // // // //                     )}
// // // // //                   </div>
// // // // //                   {editingId && (
// // // // //                     <button onClick={() => { setEditingId(null); resetSoalForm(); }} className="text-[11px] text-slate-500 hover:text-zinc-900 underline">
// // // // //                       Batal edit
// // // // //                     </button>
// // // // //                   )}
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Pertanyaan <span className="text-red-500">*</span></label>
// // // // //                   <textarea
// // // // //                     value={soalPertanyaan}
// // // // //                     onChange={e => setSoalPertanyaan(e.target.value)}
// // // // //                     rows={2}
// // // // //                     placeholder="Tuliskan pertanyaan soal di sini..."
// // // // //                     className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white"
// // // // //                   />
// // // // //                 </div>
// // // // //                 <SoalImageUpload value={soalGambar} onChange={setSoalGambar} />
// // // // //                 <div className="grid grid-cols-2 gap-3">
// // // // //                   <div>
// // // // //                     <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Tipe Soal</label>
// // // // //                     <select value={soalTipe} onChange={e => setSoalTipe(e.target.value as "pg" | "essay")} className="w-full h-9 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-700 focus:outline-none bg-white">
// // // // //                       <option value="pg">Pilihan Ganda</option>
// // // // //                       <option value="essay">Essay</option>
// // // // //                     </select>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Topik</label>
// // // // //                     <input
// // // // //                       type="text"
// // // // //                       value={soalTopik}
// // // // //                       onChange={e => setSoalTopik(e.target.value)}
// // // // //                       placeholder="e.g. Limit Fungsi"
// // // // //                       className="w-full h-9 px-3 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white"
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 {soalTipe === "pg" && (
// // // // //                   <div className="space-y-2">
// // // // //                     <label className="text-[11px] font-semibold text-slate-500 block">
// // // // //                       Opsi Jawaban <span className="text-slate-400 font-normal">(radio = jawaban benar)</span>
// // // // //                     </label>
// // // // //                     {soalOpsi.map((opsi, i) => (
// // // // //                       <div key={i} className="flex items-center gap-2">
// // // // //                         <span className="w-6 h-6 rounded-full border-[1.5px] border-slate-200 bg-white text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
// // // // //                           {String.fromCharCode(65 + i)}
// // // // //                         </span>
// // // // //                         <input
// // // // //                           type="text"
// // // // //                           value={opsi}
// // // // //                           onChange={e => { const next = [...soalOpsi]; next[i] = e.target.value; setSoalOpsi(next); }}
// // // // //                           placeholder={`Opsi ${String.fromCharCode(65 + i)}`}
// // // // //                           className="flex-1 h-8 px-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white"
// // // // //                         />
// // // // //                         <input
// // // // //                           type="radio"
// // // // //                           name="jawaban-benar-add"
// // // // //                           checked={soalJawaban === opsi && opsi !== ""}
// // // // //                           onChange={() => setSoalJawaban(opsi)}
// // // // //                           className="flex-shrink-0 accent-emerald-600"
// // // // //                         />
// // // // //                       </div>
// // // // //                     ))}
// // // // //                     {soalJawaban && <p className="text-[10px] text-emerald-600 font-medium">✓ Jawaban benar: {soalJawaban}</p>}
// // // // //                   </div>
// // // // //                 )}
// // // // //                 {soalTipe === "essay" && (
// // // // //                   <div>
// // // // //                     <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Kunci Jawaban (Opsional)</label>
// // // // //                     <textarea
// // // // //                       value={soalJawaban}
// // // // //                       onChange={e => setSoalJawaban(e.target.value)}
// // // // //                       rows={2}
// // // // //                       placeholder="Tuliskan kunci jawaban essay..."
// // // // //                       className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white"
// // // // //                     />
// // // // //                   </div>
// // // // //                 )}
// // // // //                 <button
// // // // //                   onClick={handleAddSoal}
// // // // //                   disabled={!soalPertanyaan.trim()}
// // // // //                   className="w-full h-9 bg-zinc-900 text-white rounded-lg text-[12px] font-semibold hover:bg-zinc-800 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// // // // //                 >
// // // // //                   <Plus className="w-3.5 h-3.5" /> {editingId ? "Simpan Perubahan & Lanjut Soal Baru" : "Tambah & Lanjut Soal Berikutnya"}
// // // // //                 </button>
// // // // //                 <p className="text-[10px] text-slate-400 text-center">
// // // // //                   {liveIsValid && !editingId
// // // // //                     ? "✅ Soal ini otomatis ikut tersimpan saat klik \"Simpan\" di bawah"
// // // // //                     : "Isi pertanyaan untuk mulai membuat soal"}
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         <div className="p-5 pt-3 shrink-0 border-t border-slate-100">
// // // // //           {step === 1 ? (
// // // // //             <div className="flex gap-3">
// // // // //               <button onClick={handleClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">
// // // // //                 Tutup & Simpan Draft
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => { if (nama.trim()) setStep(2); }}
// // // // //                 disabled={!nama.trim()}
// // // // //                 className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
// // // // //               >
// // // // //                 Lanjut: Tambah Soal <ChevronRight className="w-4 h-4" />
// // // // //               </button>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <div className="flex gap-3">
// // // // //               <button onClick={handleClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">
// // // // //                 Tutup & Simpan Draft
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={handleSave}
// // // // //                 className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2"
// // // // //               >
// // // // //                 <Check className="w-4 h-4" /> Simpan {TAB_LABELS[activeTab]} ({totalSoalPreview} soal)
// // // // //               </button>
// // // // //             </div>
// // // // //           )}
// // // // //           {hasDraftData && (
// // // // //             <p className="text-center text-[10px] text-slate-400 mt-2">
// // // // //               💾 Data Anda tersimpan otomatis — aman jika modal ditutup
// // // // //             </p>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ─── KelolaSoalModal ──────────────────────────────────────────────────────────
// // // // // function KelolaSoalModal({ ujian, onClose, onUpdate }: {
// // // // //   ujian: Ujian;
// // // // //   onClose: () => void;
// // // // //   onUpdate: (id: string, soalList: SoalItem[]) => void;
// // // // // }) {
// // // // //   // ── FIX: inisialisasi dari ujian.soalList yang sudah di-fetch dari API ──
// // // // //   const [soalList, setSoalList] = useState<SoalItem[]>(ujian.soalList || []);
// // // // //   const [pertanyaan, setPertanyaan] = useState("");
// // // // //   const [tipe, setTipe] = useState<"pg" | "essay">("pg");
// // // // //   const [topik, setTopik] = useState("");
// // // // //   const [opsi, setOpsi] = useState(["", "", "", ""]);
// // // // //   const [jawaban, setJawaban] = useState("");
// // // // //   const [gambar, setGambar] = useState<string | undefined>();
// // // // //   const [editingId, setEditingId] = useState<string | null>(null);
// // // // //   const [showForm, setShowForm] = useState(false);

// // // // //   const liveIsValid = pertanyaan.trim().length > 0;
// // // // //   const totalPreview = soalList.length + (liveIsValid && showForm && !editingId ? 1 : 0);

// // // // //   function reset() {
// // // // //     setPertanyaan(""); setTopik(""); setOpsi(["", "", "", ""]); setJawaban(""); setTipe("pg"); setGambar(undefined);
// // // // //   }

// // // // //   function commitLive(): SoalItem[] {
// // // // //     if (!liveIsValid || !showForm) return soalList;
// // // // //     if (editingId) {
// // // // //       return soalList.map(s =>
// // // // //         s.id === editingId
// // // // //           ? { id: editingId, pertanyaan: pertanyaan.trim(), tipe, opsi: tipe === "pg" ? opsi.filter(Boolean) : [], jawaban, topik: topik.trim(), gambar }
// // // // //           : s
// // // // //       );
// // // // //     }
// // // // //     const newItem: SoalItem = {
// // // // //       id: Date.now().toString(),
// // // // //       pertanyaan: pertanyaan.trim(), tipe,
// // // // //       opsi: tipe === "pg" ? opsi.filter(Boolean) : [],
// // // // //       jawaban, topik: topik.trim(), gambar,
// // // // //     };
// // // // //     return [...soalList, newItem];
// // // // //   }

// // // // //   function handleAdd() {
// // // // //     if (!pertanyaan.trim()) return;
// // // // //     const item: SoalItem = {
// // // // //       id: editingId || Date.now().toString(),
// // // // //       pertanyaan: pertanyaan.trim(), tipe,
// // // // //       opsi: tipe === "pg" ? opsi.filter(Boolean) : [],
// // // // //       jawaban, topik: topik.trim(), gambar,
// // // // //     };
// // // // //     if (editingId) { setSoalList(p => p.map(s => s.id === editingId ? item : s)); setEditingId(null); }
// // // // //     else setSoalList(p => [...p, item]);
// // // // //     reset(); setShowForm(false);
// // // // //   }

// // // // //   function handleEdit(s: SoalItem) {
// // // // //     if (liveIsValid && showForm && !editingId) {
// // // // //       setSoalList(commitLive());
// // // // //       reset();
// // // // //     }
// // // // //     setEditingId(s.id); setPertanyaan(s.pertanyaan); setTipe(s.tipe); setTopik(s.topik);
// // // // //     setOpsi(s.tipe === "pg" ? [...s.opsi, "", "", "", ""].slice(0, 4) : ["", "", "", ""]);
// // // // //     setJawaban(s.jawaban); setGambar(s.gambar); setShowForm(true);
// // // // //   }

// // // // //   function handleSaveAll() {
// // // // //     const finalList = commitLive();
// // // // //     onUpdate(ujian.id, finalList);
// // // // //     onClose();
// // // // //   }

// // // // //   return (
// // // // //     <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
// // // // //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// // // // //       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
// // // // //         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 sticky top-0 bg-white z-10 rounded-t-2xl">
// // // // //           <div>
// // // // //             <h3 className="text-base font-bold text-zinc-900">Kelola Soal</h3>
// // // // //             <p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p>
// // // // //           </div>
// // // // //           <div className="flex items-center gap-2">
// // // // //             <span className="text-[11px] text-slate-500 font-medium">{totalPreview} soal</span>
// // // // //             <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="flex-1 overflow-y-auto p-5 space-y-4">
// // // // //           {soalList.length === 0 && !showForm && (
// // // // //             <div className="text-center py-8">
// // // // //               <FileText className="w-10 h-10 text-slate-200 mx-auto mb-2" />
// // // // //               <p className="text-[13px] font-semibold text-zinc-500">Belum ada soal</p>
// // // // //               <p className="text-[11px] text-slate-400 mt-0.5">Klik tombol "Tambah Soal" untuk mulai</p>
// // // // //             </div>
// // // // //           )}
// // // // //           {soalList.length > 0 && (
// // // // //             <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
// // // // //               <div className="divide-y divide-slate-50">
// // // // //                 {soalList.map((s, i) => (
// // // // //                   <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId === s.id ? "bg-amber-50" : "hover:bg-slate-50/50"}`}>
// // // // //                     <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
// // // // //                     <div className="flex-1 min-w-0">
// // // // //                       <p className="text-[12px] font-medium text-zinc-900">{s.pertanyaan}</p>
// // // // //                       {s.gambar && <img src={s.gambar} alt="" className="mt-1.5 h-12 rounded-lg object-cover border border-slate-200" />}
// // // // //                       <div className="flex items-center gap-2 mt-1 flex-wrap">
// // // // //                         <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "pg" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>
// // // // //                           {s.tipe === "pg" ? "PG" : "Essay"}
// // // // //                         </span>
// // // // //                         {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
// // // // //                         {s.gambar && (
// // // // //                           <span className="inline-flex items-center gap-0.5 text-[10px] text-violet-500 font-semibold">
// // // // //                             <ImageIcon className="w-3 h-3" /> Ada gambar
// // // // //                           </span>
// // // // //                         )}
// // // // //                         {s.tipe === "pg" && s.opsi.length > 0 && (
// // // // //                           <span className="text-[10px] text-slate-400">
// // // // //                             {s.opsi.length} opsi · Jwb: <strong className="text-emerald-600">{s.jawaban}</strong>
// // // // //                           </span>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="flex items-center gap-1 flex-shrink-0">
// // // // //                       <button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
// // // // //                       <button onClick={() => setSoalList(p => p.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //           {!showForm && (
// // // // //             <button
// // // // //               onClick={() => { setShowForm(true); setEditingId(null); reset(); }}
// // // // //               className="w-full h-10 border-2 border-dashed border-slate-200 rounded-xl text-[12px] font-semibold text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2"
// // // // //             >
// // // // //               <Plus className="w-4 h-4" /> Tambah Soal Baru
// // // // //             </button>
// // // // //           )}
// // // // //           {showForm && (
// // // // //             <div className={`border rounded-[14px] p-4 space-y-3 ${editingId ? "border-amber-200 bg-amber-50/30" : liveIsValid ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 bg-slate-50/30"}`}>
// // // // //               <div className="flex items-center justify-between">
// // // // //                 <div className="flex items-center gap-2">
// // // // //                   <h4 className="font-semibold text-zinc-900 text-[13px]">
// // // // //                     {editingId ? `✏️ Edit Soal #${soalList.findIndex(s => s.id === editingId) + 1}` : `Soal #${soalList.length + 1}`}
// // // // //                   </h4>
// // // // //                   {liveIsValid && !editingId && (
// // // // //                     <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">
// // // // //                       <Check className="w-2.5 h-2.5" /> Akan disimpan
// // // // //                     </span>
// // // // //                   )}
// // // // //                 </div>
// // // // //                 <button onClick={() => { setShowForm(false); setEditingId(null); reset(); }} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
// // // // //                   <X className="w-3.5 h-3.5" />
// // // // //                 </button>
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Pertanyaan *</label>
// // // // //                 <textarea
// // // // //                   value={pertanyaan}
// // // // //                   onChange={e => setPertanyaan(e.target.value)}
// // // // //                   rows={2}
// // // // //                   placeholder="Tuliskan pertanyaan soal..."
// // // // //                   className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white"
// // // // //                 />
// // // // //               </div>
// // // // //               <SoalImageUpload value={gambar} onChange={setGambar} />
// // // // //               <div className="grid grid-cols-2 gap-3">
// // // // //                 <div>
// // // // //                   <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Tipe Soal</label>
// // // // //                   <select value={tipe} onChange={e => setTipe(e.target.value as "pg" | "essay")} className="w-full h-9 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-700 focus:outline-none bg-white">
// // // // //                     <option value="pg">Pilihan Ganda</option>
// // // // //                     <option value="essay">Essay</option>
// // // // //                   </select>
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Topik</label>
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     value={topik}
// // // // //                     onChange={e => setTopik(e.target.value)}
// // // // //                     placeholder="e.g. Limit Fungsi"
// // // // //                     className="w-full h-9 px-3 border border-slate-200 rounded-lg text-[12px] bg-white focus:outline-none"
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>
// // // // //               {tipe === "pg" && (
// // // // //                 <div className="space-y-2">
// // // // //                   <label className="text-[11px] font-semibold text-slate-500 block">
// // // // //                     Opsi Jawaban <span className="text-slate-400 font-normal">(klik radio = jawaban benar)</span>
// // // // //                   </label>
// // // // //                   {opsi.map((o, i) => (
// // // // //                     <div key={i} className="flex items-center gap-2">
// // // // //                       <span className="w-6 h-6 rounded-full border-[1.5px] border-slate-200 bg-white text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
// // // // //                         {String.fromCharCode(65 + i)}
// // // // //                       </span>
// // // // //                       <input
// // // // //                         type="text"
// // // // //                         value={o}
// // // // //                         onChange={e => { const n = [...opsi]; n[i] = e.target.value; setOpsi(n); }}
// // // // //                         placeholder={`Opsi ${String.fromCharCode(65 + i)}`}
// // // // //                         className="flex-1 h-8 px-2 border border-slate-200 rounded-lg text-[12px] bg-white focus:outline-none"
// // // // //                       />
// // // // //                       <input
// // // // //                         type="radio"
// // // // //                         name="jawaban-kelola"
// // // // //                         checked={jawaban === o && o !== ""}
// // // // //                         onChange={() => setJawaban(o)}
// // // // //                         className="accent-emerald-600"
// // // // //                       />
// // // // //                     </div>
// // // // //                   ))}
// // // // //                   {jawaban && <p className="text-[10px] text-emerald-600 font-medium">✓ Jawaban benar: {jawaban}</p>}
// // // // //                 </div>
// // // // //               )}
// // // // //               {tipe === "essay" && (
// // // // //                 <div>
// // // // //                   <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Kunci Jawaban (Opsional)</label>
// // // // //                   <textarea
// // // // //                     value={jawaban}
// // // // //                     onChange={e => setJawaban(e.target.value)}
// // // // //                     rows={2}
// // // // //                     className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none resize-none bg-white"
// // // // //                   />
// // // // //                 </div>
// // // // //               )}
// // // // //               <button
// // // // //                 onClick={handleAdd}
// // // // //                 disabled={!pertanyaan.trim()}
// // // // //                 className="w-full h-9 bg-zinc-900 text-white rounded-lg text-[12px] font-semibold hover:bg-zinc-800 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
// // // // //               >
// // // // //                 <Plus className="w-3.5 h-3.5" /> {editingId ? "Simpan Perubahan & Lanjut Soal Baru" : "Tambah & Lanjut Soal Berikutnya"}
// // // // //               </button>
// // // // //               <p className="text-[10px] text-slate-400 text-center">
// // // // //                 {liveIsValid && !editingId
// // // // //                   ? "✅ Soal ini otomatis ikut tersimpan saat klik \"Simpan\" di bawah"
// // // // //                   : "Isi pertanyaan untuk mulai membuat soal"}
// // // // //               </p>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //         <div className="p-5 border-t border-slate-100 shrink-0 flex gap-3">
// // // // //           <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Batal</button>
// // // // //           <button
// // // // //             onClick={handleSaveAll}
// // // // //             className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2"
// // // // //           >
// // // // //             <Check className="w-4 h-4" /> Simpan ({totalPreview} soal)
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function EditUjianModal({
// // // // //   ujian,
// // // // //   onClose,
// // // // //   onSave,
// // // // //   onKelolaSoal, // ← tambah prop ini
// // // // // }: {
// // // // //   ujian: Ujian;
// // // // //   onClose: () => void;
// // // // //   onSave: (id: string, data: { nama: string; durasi: number; tanggalMulai?: string }) => void;
// // // // //   onKelolaSoal?: () => void; // ← tambah
// // // // // }) {
// // // // //   const [nama, setNama] = useState(ujian.nama);
// // // // //   const [durasi, setDurasi] = useState(String(ujian.durasi));
// // // // //   const [tanggal, setTanggal] = useState(
// // // // //     ujian.tanggalMulai ? new Date(ujian.tanggalMulai).toISOString().split("T")[0] : ""
// // // // //   );

// // // // //   return (
// // // // //     <div className="fixed inset-0 z-[300] flex items-center justify-center">
// // // // //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// // // // //       <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl z-10 p-6">
// // // // //         <div className="flex items-center justify-between mb-5">
// // // // //           <h3 className="text-base font-bold text-zinc-900">Edit {TAB_LABELS[ujian.tipe?.toLowerCase()] || "Ujian"}</h3>
// // // // //           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // // //         </div>
// // // // //         <div className="space-y-4">
// // // // //           <div>
// // // // //             <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label>
// // // // //             <input
// // // // //               type="text"
// // // // //               value={nama}
// // // // //               onChange={e => setNama(e.target.value)}
// // // // //               className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // // //             />
// // // // //           </div>
// // // // //           <div className="grid grid-cols-2 gap-3">
// // // // //             <div>
// // // // //               <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label>
// // // // //               <input
// // // // //                 type="date"
// // // // //                 value={tanggal}
// // // // //                 onChange={e => setTanggal(e.target.value)}
// // // // //                 className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // // //               />
// // // // //             </div>
// // // // //             <div>
// // // // //               <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label>
// // // // //               <input
// // // // //                 type="number"
// // // // //                 value={durasi}
// // // // //                 onChange={e => setDurasi(e.target.value)}
// // // // //                 className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // // //               />
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* ← Tombol Kelola Soal dipindah ke sini */}
// // // // //         {/* {onKelolaSoal && (
// // // // //           <button
// // // // //             onClick={onKelolaSoal}
// // // // //             className="w-full mt-4 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50 flex items-center justify-center gap-2"
// // // // //           >
// // // // //             <Edit3 className="w-4 h-4" /> Kelola Soal ({ujian.soalList?.length ?? ujian.totalSoal} soal)
// // // // //           </button>
// // // // //         )} */}

// // // // //         <div className="flex gap-3 mt-4">
// // // // //           <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// // // // //           <button
// // // // //             onClick={() => onSave(ujian.id, { nama, durasi: parseInt(durasi) || 60, tanggalMulai: tanggal || undefined })}
// // // // //             disabled={!nama.trim()}
// // // // //             className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40"
// // // // //           >
// // // // //             Simpan
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ─── DeleteUjianModal ─────────────────────────────────────────────────────────
// // // // // function DeleteUjianModal({
// // // // //   ujian,
// // // // //   onClose,
// // // // //   onDelete,
// // // // // }: {
// // // // //   ujian: Ujian;
// // // // //   onClose: () => void;
// // // // //   onDelete: (id: string) => void;
// // // // // }) {
// // // // //   const tipeLabel = TAB_LABELS[ujian.tipe?.toLowerCase()] || "Ujian";
// // // // //   return (
// // // // //     <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
// // // // //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// // // // //       <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
// // // // //         <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
// // // // //           <Trash2 className="w-5 h-5 text-red-600" />
// // // // //         </div>
// // // // //         <h3 className="text-base font-bold text-zinc-900 mb-2 text-center">Hapus {tipeLabel}</h3>
// // // // //         <p className="text-[13px] text-slate-500 mb-6 text-center">
// // // // //           Yakin ingin menghapus <span className="font-semibold text-zinc-900">"{ujian.nama}"</span>? Semua soal dan data peserta akan ikut terhapus.
// // // // //         </p>
// // // // //         <div className="flex gap-3">
// // // // //           <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// // // // //           <button onClick={() => onDelete(ujian.id)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700">Hapus</button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ─── Main Page ────────────────────────────────────────────────────────────────
// // // // // export default function AdminMataPelajaranPage() {
// // // // //   const router = useRouter();
// // // // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState("");
// // // // //   const [subjects, setSubjects] = useState<MataPelajaran[]>([]);
// // // // //   const [stats, setStats] = useState({ totalSoal: 0, totalUjian: 0 });
// // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // //   const [kelasFilter, setKelasFilter] = useState("all");

// // // // //   const [selectedSubject, setSelectedSubject] = useState<MataPelajaran | null>(null);
// // // // //   const [activeTab, setActiveTab] = useState("ujian");

// // // // //   const [ujianList, setUjianList] = useState<Ujian[]>([]);
// // // // //   const [ujianLoading, setUjianLoading] = useState(false);

// // // // //   // Modals
// // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // //   const [showEditModal, setShowEditModal] = useState(false);
// // // // //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// // // // //   const [showDetailModal, setShowDetailModal] = useState(false);
// // // // //   const [showKelolaSoal, setShowKelolaSoal] = useState(false);
// // // // //   const [showContentModal, setShowContentModal] = useState(false);
// // // // //   const [selectedUjian, setSelectedUjian] = useState<Ujian | null>(null);
// // // // //   const [targetMapel, setTargetMapel] = useState<MataPelajaran | null>(null);

// // // // //   // ── FIX: Delete mapel dengan detail informatif ──
// // // // //   const [deleteMapelDetail, setDeleteMapelDetail] = useState<DeleteMapelDetail | null>(null);
// // // // //   const [deleteMapelLoading, setDeleteMapelLoading] = useState(false);

// // // // //   // Edit/Delete ujian modals
// // // // //   const [showEditUjianModal, setShowEditUjianModal] = useState(false);
// // // // //   const [showDeleteUjianModal, setShowDeleteUjianModal] = useState(false);
// // // // //   const [targetUjian, setTargetUjian] = useState<Ujian | null>(null);

// // // // //   const [showHasilModal, setShowHasilModal] = useState(false);
// // // // //   const [hasilUjianTarget, setHasilUjianTarget] = useState<Ujian | null>(null);
// // // // //   const [soalBankList, setSoalBankList] = useState<any[]>([]);
// // // // //   const [soalBankLoading, setSoalBankLoading] = useState(false);
// // // // //   const [soalBankSearch, setSoalBankSearch] = useState("");
// // // // //   const [soalBankTipe, setSoalBankTipe] = useState("");

// // // // //   // Forms
// // // // //   const [addForm, setAddForm] = useState({ nama: "", kelas: "", deskripsi: "", warna: "zinc" });
// // // // //   const [editForm, setEditForm] = useState<MataPelajaran | null>(null);
// // // // //   const [copiedLink, setCopiedLink] = useState(false);
// // // // //   const [copiedToken, setCopiedToken] = useState(false);
// // // // //   const [showToken, setShowToken] = useState(false);

// // // // //   // Nilai
// // // // //   const [bobotUjian, setBobotUjian] = useState(40);
// // // // //   const [bobotUlangan, setBobotUlangan] = useState(25);
// // // // //   const [bobotLatihan, setBobotLatihan] = useState(20);
// // // // //   const [bobotKuis, setBobotKuis] = useState(15);
// // // // //   const [kkm, setKkm] = useState(70);
// // // // //   const [showNilaiHasil, setShowNilaiHasil] = useState(false);
// // // // //   const [nilaiData, setNilaiData] = useState<any[]>([]);
// // // // //   const [nilaiFilter, setNilaiFilter] = useState("all");
// // // // //   const [nilaiSortKey, setNilaiSortKey] = useState("akhir");
// // // // //   const [nilaiSortAsc, setNilaiSortAsc] = useState(false);

// // // // //   const fetchSubjects = useCallback(async () => {
// // // // //     const token = getToken();
// // // // //     if (!token) { router.push("/auth/login"); return; }
// // // // //     try {
// // // // //       const res = await api.get<{ data: MataPelajaran[]; stats: any }>(`/mata-pelajaran?kelas=${kelasFilter !== "all" ? kelasFilter : ""}`);
// // // // //       setSubjects(res.data || []);
// // // // //       if (res.stats) setStats(res.stats);
// // // // //     } catch (err) {
// // // // //       setError(err instanceof Error ? err.message : "Gagal memuat data");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }, [kelasFilter, router]);

// // // // //   useEffect(() => { fetchSubjects(); }, [fetchSubjects]);


// // // // //   const fetchUjianByTipe = useCallback(async (mapelId: number, tipe: string) => {
// // // // //     setUjianLoading(true);
// // // // //     try {
// // // // //       const tipeMap: Record<string, string> = {
// // // // //         ujian: "UJIAN",
// // // // //         ulangan: "ULANGAN",
// // // // //         latihan: "LATIHAN",
// // // // //         kuis: "KUIS",
// // // // //       };
// // // // //       const tipeParam = tipeMap[tipe];
// // // // //       const url = tipeParam
// // // // //         ? `/mata-pelajaran/${mapelId}/ujian?tipe=${tipeParam}`
// // // // //         : `/mata-pelajaran/${mapelId}/ujian`;

// // // // //       // ── Satu request, soal sudah di-include dari backend ──
// // // // //       const res = await api.get<{ data: Ujian[] }>(url);
// // // // //       setUjianList(res.data || []);
// // // // //     } catch {
// // // // //       setError("Gagal memuat data ujian");
// // // // //     } finally {
// // // // //       setUjianLoading(false);
// // // // //     }
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (selectedSubject && ["ujian", "ulangan", "latihan", "kuis"].includes(activeTab)) {
// // // // //       fetchUjianByTipe(selectedSubject.id, activeTab);
// // // // //     }
// // // // //   }, [selectedSubject, activeTab, fetchUjianByTipe]);
// // // // //   const fetchSoalBank = useCallback(async (mapelId: number, search = "", tipe = "") => {
// // // // //     setSoalBankLoading(true);
// // // // //     try {
// // // // //       const params = new URLSearchParams();
// // // // //       if (search) params.set("search", search);
// // // // //       if (tipe) params.set("tipe", tipe);
// // // // //       const res = await api.get<{ data: any[]; total: number }>(
// // // // //         `/mata-pelajaran/${mapelId}/soal?${params.toString()}`
// // // // //       );
// // // // //       setSoalBankList(res.data || []);
// // // // //     } catch {
// // // // //       setSoalBankList([]);
// // // // //     } finally {
// // // // //       setSoalBankLoading(false);
// // // // //     }
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (selectedSubject && activeTab === "soal") {
// // // // //       fetchSoalBank(selectedSubject.id, soalBankSearch, soalBankTipe);
// // // // //     }
// // // // //   }, [selectedSubject, activeTab, soalBankSearch, soalBankTipe, fetchSoalBank]);

// // // // //   const filtered = subjects.filter(s => !searchQuery || s.nama.toLowerCase().includes(searchQuery.toLowerCase()));

// // // // //   async function handleAdd() {
// // // // //     try {
// // // // //       await api.post("/mata-pelajaran", addForm);
// // // // //       setShowAddModal(false);
// // // // //       setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" });
// // // // //       fetchSubjects();
// // // // //     } catch (err) { setError(err instanceof Error ? err.message : "Gagal menambah"); }
// // // // //   }

// // // // //   async function handleEdit() {
// // // // //     if (!editForm || !targetMapel) return;
// // // // //     try {
// // // // //       await api.put(`/mata-pelajaran/${targetMapel.id}`, editForm);
// // // // //       setShowEditModal(false); setTargetMapel(null); setEditForm(null);
// // // // //       fetchSubjects();
// // // // //     } catch (err) { setError(err instanceof Error ? err.message : "Gagal mengubah"); }
// // // // //   }

// // // // //   // ── FIX: Buka modal hapus mapel + fetch detail jumlah data ──
// // // // //   async function openDeleteMapelModal(subject: MataPelajaran) {
// // // // //     setTargetMapel(subject);
// // // // //     setDeleteMapelDetail(null);
// // // // //     setDeleteMapelLoading(true);
// // // // //     setShowDeleteModal(true);
// // // // //     try {
// // // // //       const [ujianRes, ulanganRes, latihanRes, kuisRes, soalRes] = await Promise.all([
// // // // //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=UJIAN`),
// // // // //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=ULANGAN`),
// // // // //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=LATIHAN`),
// // // // //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=KUIS`),
// // // // //         api.get<{ total: number }>(`/mata-pelajaran/${subject.id}/soal`),
// // // // //       ]);
// // // // //       setDeleteMapelDetail({
// // // // //         totalUjian: ujianRes.data?.length || 0,
// // // // //         totalUlangan: ulanganRes.data?.length || 0,
// // // // //         totalLatihan: latihanRes.data?.length || 0,
// // // // //         totalKuis: kuisRes.data?.length || 0,
// // // // //         totalSoal: soalRes.total || subject.totalSoal,
// // // // //       });
// // // // //     } catch {
// // // // //       // Pakai data dari subject sebagai fallback
// // // // //       setDeleteMapelDetail({
// // // // //         totalUjian: subject.totalUjian,
// // // // //         totalUlangan: 0,
// // // // //         totalLatihan: 0,
// // // // //         totalKuis: 0,
// // // // //         totalSoal: subject.totalSoal,
// // // // //       });
// // // // //     } finally {
// // // // //       setDeleteMapelLoading(false);
// // // // //     }
// // // // //   }

// // // // //   async function handleDelete() {
// // // // //     if (!targetMapel) return;
// // // // //     try {
// // // // //       await api.delete(`/mata-pelajaran/${targetMapel.id}`);
// // // // //       setShowDeleteModal(false);
// // // // //       setDeleteMapelDetail(null);
// // // // //       if (selectedSubject?.id === targetMapel.id) setSelectedSubject(null);
// // // // //       setTargetMapel(null);
// // // // //       fetchSubjects();
// // // // //     } catch (err) {
// // // // //       setError(err instanceof Error ? err.message : "Gagal menghapus mata pelajaran");
// // // // //       setShowDeleteModal(false);
// // // // //     }
// // // // //   }

// // // // //   // ─── Edit & Delete Ujian ───────────────────────────────────────────────────
// // // // //   async function handleEditUjian(ujianId: string, data: { nama: string; durasi: number; tanggalMulai?: string }) {
// // // // //     try {
// // // // //       await api.put(`/ujian/${ujianId}`, {
// // // // //         nama: data.nama,
// // // // //         durasi: data.durasi,
// // // // //         tanggalMulai: data.tanggalMulai ? new Date(data.tanggalMulai).toISOString() : null,
// // // // //       });
// // // // //       setShowEditUjianModal(false);
// // // // //       setTargetUjian(null);
// // // // //       if (selectedSubject) fetchUjianByTipe(selectedSubject.id, activeTab);
// // // // //     } catch (err) {
// // // // //       setError(err instanceof Error ? err.message : "Gagal mengubah ujian");
// // // // //     }
// // // // //   }

// // // // //   async function handleDeleteUjian(ujianId: string) {
// // // // //     try {
// // // // //       await api.delete(`/ujian/${ujianId}`);
// // // // //       setShowDeleteUjianModal(false);
// // // // //       setTargetUjian(null);
// // // // //       if (selectedSubject) {
// // // // //         fetchUjianByTipe(selectedSubject.id, activeTab);
// // // // //         fetchSubjects();
// // // // //       }
// // // // //     } catch (err) {
// // // // //       setError(err instanceof Error ? err.message : "Gagal menghapus ujian");
// // // // //     }
// // // // //   }

// // // // //   async function handleSaveContent(data: {
// // // // //     nama: string;
// // // // //     tanggal: string;
// // // // //     durasi: string;
// // // // //     soalAcak: boolean;
// // // // //     soalList: SoalItem[];
// // // // //   }) {
// // // // //     if (!selectedSubject) return;
// // // // //     const tipeMap: Record<string, string> = { ujian: "UJIAN", ulangan: "ULANGAN", latihan: "LATIHAN", kuis: "KUIS" };
// // // // //     try {
// // // // //       const ujianRes = await api.post<{ id: string; token: string }>(
// // // // //         `/mata-pelajaran/${selectedSubject.id}/ujian`,
// // // // //         {
// // // // //           nama: data.nama,
// // // // //           tipe: tipeMap[activeTab] || "UJIAN",
// // // // //           durasi: parseInt(data.durasi) || 60,
// // // // //           kelas: selectedSubject.kelas,
// // // // //           tanggalMulai: data.tanggal || null,
// // // // //           acakSoal: data.soalAcak,
// // // // //           acakOpsi: false,
// // // // //           soalIds: [],
// // // // //         }
// // // // //       );
// // // // //       const ujianId = ujianRes.id;
// // // // //       if (ujianId && data.soalList.length > 0) {
// // // // //         const soalIds: string[] = [];
// // // // //         for (const s of data.soalList) {
// // // // //           const soalRes = await api.post<{ id: string }>(
// // // // //             `/mata-pelajaran/${selectedSubject.id}/soal`,
// // // // //             {
// // // // //               pertanyaan: s.pertanyaan,
// // // // //               tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
// // // // //               topik: s.topik || null,
// // // // //               gambarUrl: s.gambar || null,
// // // // //               opsiA: s.opsi[0] || null,
// // // // //               opsiB: s.opsi[1] || null,
// // // // //               opsiC: s.opsi[2] || null,
// // // // //               opsiD: s.opsi[3] || null,
// // // // //               jawabanBenar: s.jawaban || null,
// // // // //             }
// // // // //           );
// // // // //           soalIds.push(soalRes.id);
// // // // //         }
// // // // //         await api.put(`/ujian/${ujianId}`, { soalIds });
// // // // //       }
// // // // //       setShowContentModal(false);
// // // // //       fetchUjianByTipe(selectedSubject.id, activeTab);
// // // // //       fetchSubjects();
// // // // //     } catch (err) {
// // // // //       setError(err instanceof Error ? err.message : "Gagal menyimpan");
// // // // //     }
// // // // //   }

// // // // //   async function handleUpdateSoal(ujianId: string, soalList: SoalItem[]) {
// // // // //     if (!selectedSubject) return;
// // // // //     try {
// // // // //       const soalIds: string[] = [];
// // // // //       for (const s of soalList) {
// // // // //         if (/^\d+$/.test(s.id)) {
// // // // //           const soalRes = await api.post<{ id: string }>(
// // // // //             `/mata-pelajaran/${selectedSubject.id}/soal`,
// // // // //             {
// // // // //               pertanyaan: s.pertanyaan,
// // // // //               tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
// // // // //               topik: s.topik || null,
// // // // //               opsiA: s.opsi[0] || null,
// // // // //               opsiB: s.opsi[1] || null,
// // // // //               opsiC: s.opsi[2] || null,
// // // // //               opsiD: s.opsi[3] || null,
// // // // //               jawabanBenar: s.jawaban || null,
// // // // //             }
// // // // //           );
// // // // //           soalIds.push(soalRes.id);
// // // // //         } else {
// // // // //           soalIds.push(s.id);
// // // // //         }
// // // // //       }
// // // // //       await api.put(`/ujian/${ujianId}`, { soalIds });
// // // // //       setUjianList(prev =>
// // // // //         prev.map(u => u.id === ujianId ? { ...u, soalList, totalSoal: soalList.length } : u)
// // // // //       );
// // // // //       fetchSubjects();
// // // // //     } catch (err) {
// // // // //       setError(err instanceof Error ? err.message : "Gagal menyimpan soal");
// // // // //     }
// // // // //   }

// // // // //   function copyToClipboard(text: string, type: "link" | "token") {
// // // // //     navigator.clipboard.writeText(text).then(() => {
// // // // //       if (type === "link") { setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); }
// // // // //       else { setCopiedToken(true); setTimeout(() => setCopiedToken(false), 2000); }
// // // // //     });
// // // // //   }

// // // // //   function hitungNilaiAkhir() {
// // // // //     const namaList = [
// // // // //       "Adi Nugroho", "Bella Rahmawati", "Candra Wijaya", "Dewi Anggraeni", "Eko Prasetyo",
// // // // //       "Fitri Handayani", "Gilang Ramadhan", "Hana Safitri", "Ivan Santoso", "Julia Maharani",
// // // // //       "Kevin Pratama", "Laila Nurfadillah", "Mario Situmorang", "Nadia Kusuma", "Oka Widyatma",
// // // // //       "Putri Wulandari", "Rizki Maulana", "Sari Dewi", "Taufik Hidayat", "Ulfa Ramadhani",
// // // // //       "Vino Adiputra", "Winda Lestari", "Xena Anggraita", "Yoga Permana", "Zahra Meilinda",
// // // // //       "Ahmad Fauzi", "Bagas Saputra", "Clara Oktaviani", "Dino Setiawan", "Elsa Nurhayati",
// // // // //       "Fajar Kurniawan", "Gita Puspita",
// // // // //     ];
// // // // //     let seed = 12345;
// // // // //     function rand(min: number, max: number) {
// // // // //       seed = (seed * 9301 + 49297) % 233280;
// // // // //       return min + Math.floor((seed / 233280) * (max - min + 1));
// // // // //     }
// // // // //     const bU = bobotUjian / 100, bUl = bobotUlangan / 100, bL = bobotLatihan / 100, bK = bobotKuis / 100;
// // // // //     const data = namaList.map((nama, i) => {
// // // // //       const ujian = rand(55, 100), ulangan = rand(55, 100), latihan = rand(60, 100), kuis = rand(60, 100);
// // // // //       const akhir = Math.round(ujian * bU + ulangan * bUl + latihan * bL + kuis * bK);
// // // // //       return {
// // // // //         nisn: `005${String(i + 1).padStart(5, "0")}`, nama, ujian, ulangan, latihan, kuis, akhir,
// // // // //         lulus: akhir >= kkm,
// // // // //         grade: akhir >= 90 ? "A" : akhir >= 80 ? "B" : akhir >= 70 ? "C" : "D",
// // // // //       };
// // // // //     });
// // // // //     setNilaiData(data); setShowNilaiHasil(true);
// // // // //     setTimeout(() => document.getElementById("nilai-hasil-section")?.scrollIntoView({ behavior: "smooth" }), 100);
// // // // //   }

// // // // //   function getSortedNilaiData() {
// // // // //     return [...nilaiData]
// // // // //       .filter(s => {
// // // // //         if (nilaiFilter === "lulus" && !s.lulus) return false;
// // // // //         if (nilaiFilter === "tidak" && s.lulus) return false;
// // // // //         return true;
// // // // //       })
// // // // //       .sort((a, b) => {
// // // // //         const va = a[nilaiSortKey]; const vb = b[nilaiSortKey];
// // // // //         return nilaiSortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
// // // // //       });
// // // // //   }

// // // // //   const bobotTotal = bobotUjian + bobotUlangan + bobotLatihan + bobotKuis;
// // // // //   const isBobotValid = bobotTotal === 100;

// // // // //   // ── Render content table ──
// // // // //   const renderContentTable = () => {
// // // // //     if (ujianLoading) {
// // // // //       return (
// // // // //         <div className="flex items-center justify-center py-16">
// // // // //           <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
// // // // //         </div>
// // // // //       );
// // // // //     }
// // // // //     const tabLabel = TAB_LABELS[activeTab] || activeTab;
// // // // //     return (
// // // // //       <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // // //         <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
// // // // //           <h3 className="font-semibold text-zinc-900 text-[13px]">Daftar {tabLabel}</h3>
// // // // //           <span className="text-[11px] text-slate-400 font-medium">{ujianList.length} {tabLabel.toLowerCase()}</span>
// // // // //         </div>
// // // // //         {ujianList.length === 0 ? (
// // // // //           <div className="py-12 text-center">
// // // // //             <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// // // // //             <p className="text-[13px] text-slate-400">Belum ada {tabLabel.toLowerCase()}</p>
// // // // //             <button onClick={() => setShowContentModal(true)} className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-zinc-700 underline">
// // // // //               <Plus className="w-3.5 h-3.5" /> Tambah {tabLabel}
// // // // //             </button>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="overflow-x-auto">
// // // // //             <table className="w-full text-sm" style={{ minWidth: "680px" }}>
// // // // //               <thead className="border-b border-slate-100 bg-slate-50/50">
// // // // //                 <tr>
// // // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama {tabLabel}</th>
// // // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Tanggal</th>
// // // // //                   {/* <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell">Peserta</th> */}
// // // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Soal</th>
// // // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Urutan</th>
// // // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
// // // // //                   {/* ── FIX: Kolom Aksi dengan Detail + Edit + Hapus di dalam tabel ── */}
// // // // //                   <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Aksi</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody className="divide-y divide-slate-50">
// // // // //                 {ujianList.map(item => {
// // // // //                   const soalCount = item.soalList?.length ?? item.totalSoal;
// // // // //                   return (
// // // // //                     <tr key={item.id} className="hover:bg-slate-50/50">
// // // // //                       <td className="px-4 py-3">
// // // // //                         <p className="font-medium text-zinc-900 text-[13px]">{item.nama}</p>
// // // // //                         <p className="text-[10px] text-slate-400 mt-0.5">{item.kelas}</p>
// // // // //                       </td>
// // // // //                       <td className="px-4 py-3 text-slate-500 text-[12px] hidden sm:table-cell">
// // // // //                         {item.tanggalMulai
// // // // //                           ? new Date(item.tanggalMulai).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
// // // // //                           : "—"}
// // // // //                       </td>
// // // // //                       {/* <td className="px-4 py-3 text-slate-500 text-[12px] hidden md:table-cell">{item.peserta}</td> */}
// // // // //                       <td className="px-4 py-3">
// // // // //                         <div className="flex items-center gap-1.5">
// // // // //                           <span className="font-semibold text-zinc-900 text-[12px]">{soalCount}</span>
// // // // //                           <button
// // // // //                             onClick={() => { setSelectedUjian(item); setShowKelolaSoal(true); }}
// // // // //                             className="inline-flex items-center gap-1 h-5 px-1.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-500 hover:bg-zinc-900 hover:text-white transition-colors"
// // // // //                           >
// // // // //                             <Edit3 className="w-2.5 h-2.5" /> Kelola
// // // // //                           </button>
// // // // //                         </div>
// // // // //                       </td>
// // // // //                       <td className="px-4 py-3 hidden sm:table-cell">
// // // // //                         {item.soalAcak ? (
// // // // //                           <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
// // // // //                             <Shuffle className="w-3 h-3" /> Acak
// // // // //                           </span>
// // // // //                         ) : (
// // // // //                           <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
// // // // //                             <ListOrdered className="w-3 h-3" /> Urut
// // // // //                           </span>
// // // // //                         )}
// // // // //                       </td>
// // // // //                       <td className="px-4 py-3">
// // // // //                         {item.status === "BERLANGSUNG" && (
// // // // //                           <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
// // // // //                             <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" /> BERLANGSUNG
// // // // //                           </span>
// // // // //                         )}
// // // // //                         {item.status === "SELESAI" && (
// // // // //                           <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">SELESAI</span>
// // // // //                         )}
// // // // //                         {item.status === "AKTIF" && (
// // // // //                           <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">AKTIF</span>
// // // // //                         )}
// // // // //                         {item.status === "DRAFT" && (
// // // // //                           <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">DRAFT</span>
// // // // //                         )}
// // // // //                       </td>
// // // // //                       {/* ── FIX: Semua aksi ujian ada di sini: Detail | Edit | Hapus ── */}
// // // // //                       <td className="px-4 py-3">
// // // // //                         <div className="flex items-center justify-end gap-1">
// // // // //                           <button
// // // // //                             onClick={() => {
// // // // //                               setSelectedUjian(item);
// // // // //                               setShowToken(false);
// // // // //                               setCopiedLink(false);
// // // // //                               setCopiedToken(false);
// // // // //                               setShowDetailModal(true);
// // // // //                             }}
// // // // //                             className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors"
// // // // //                             title="Lihat detail"
// // // // //                           >
// // // // //                             Detail
// // // // //                           </button>
// // // // //                           <button
// // // // //                             onClick={() => {
// // // // //                               setHasilUjianTarget(item);
// // // // //                               setShowHasilModal(true);
// // // // //                             }}
// // // // //                             className="h-7 px-2.5 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-semibold hover:bg-emerald-100 transition-colors"
// // // // //                             title="Lihat hasil siswa"
// // // // //                           >
// // // // //                             Hasil
// // // // //                           </button>
// // // // //                           <button
// // // // //                             onClick={() => {
// // // // //                               setTargetUjian(item);
// // // // //                               setShowEditUjianModal(true);
// // // // //                             }}
// // // // //                             className="h-7 w-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
// // // // //                             title="Edit ujian"
// // // // //                           >
// // // // //                             <Pencil className="w-3.5 h-3.5" />
// // // // //                           </button>
// // // // //                           <button
// // // // //                             onClick={() => {
// // // // //                               setTargetUjian(item);
// // // // //                               setShowDeleteUjianModal(true);
// // // // //                             }}
// // // // //                             className="h-7 w-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
// // // // //                             title="Hapus ujian"
// // // // //                           >
// // // // //                             <Trash2 className="w-3.5 h-3.5" />
// // // // //                           </button>

// // // // //                         </div>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   );
// // // // //                 })}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   // ── Render nilai tab ──
// // // // //   const renderNilaiTab = () => (
// // // // //     <div className="space-y-4">
// // // // //       <div className="bg-white border border-slate-200 rounded-[14px] p-4 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // // //         <div className="flex items-start justify-between gap-3 mb-4">
// // // // //           <div>
// // // // //             <h3 className="font-bold text-zinc-900 text-[14px]">Konfigurasi Rumus Nilai Akhir</h3>
// // // // //             <p className="text-[11px] text-slate-500 mt-0.5">Total bobot harus <strong>100%</strong>.</p>
// // // // //           </div>
// // // // //           <div className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[13px] font-bold ${isBobotValid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
// // // // //             {bobotTotal}%
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="space-y-3">
// // // // //           {[
// // // // //             { label: "Ujian", icon: <ClipboardList className="w-4 h-4 text-violet-600" />, desc: `${ujianList.length} ujian`, val: bobotUjian, set: setBobotUjian, color: "violet" },
// // // // //             { label: "Ulangan Harian", icon: <Book className="w-4 h-4 text-blue-600" />, desc: "Rata-rata semua ulangan", val: bobotUlangan, set: setBobotUlangan, color: "blue" },
// // // // //             { label: "Latihan", icon: <Dumbbell className="w-4 h-4 text-emerald-600" />, desc: "Rata-rata semua latihan", val: bobotLatihan, set: setBobotLatihan, color: "emerald" },
// // // // //             { label: "Kuis", icon: <Zap className="w-4 h-4 text-amber-600" />, desc: "Rata-rata semua kuis", val: bobotKuis, set: setBobotKuis, color: "amber" },
// // // // //           ].map(item => (
// // // // //             <div key={item.label} className={`p-3 rounded-xl bg-${item.color}-50 border border-${item.color}-100`}>
// // // // //               <div className="flex items-center justify-between">
// // // // //                 <div className="flex items-center gap-2">
// // // // //                   <div className={`w-7 h-7 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>{item.icon}</div>
// // // // //                   <div>
// // // // //                     <p className="font-semibold text-zinc-900 text-[12px]">{item.label}</p>
// // // // //                     <p className="text-[10px] text-slate-400">{item.desc}</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-1.5">
// // // // //                   <input
// // // // //                     type="number"
// // // // //                     value={item.val}
// // // // //                     onChange={e => item.set(parseInt(e.target.value) || 0)}
// // // // //                     className="w-16 h-8 text-center border-[1.5px] border-slate-200 rounded-lg text-[12px] font-semibold text-zinc-900 bg-white focus:border-zinc-900 outline-none"
// // // // //                   />
// // // // //                   <span className="text-[12px] font-semibold text-slate-500">%</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //         <div className="mt-4 p-3 bg-slate-900 rounded-xl">
// // // // //           <p className="text-[10px] text-slate-400 mb-1 font-semibold uppercase tracking-wider">Preview Rumus</p>
// // // // //           <p className="text-[12px] text-white font-mono">
// // // // //             NA ={" "}
// // // // //             {bobotUjian > 0 && `Ujian×${bobotUjian}%`}
// // // // //             {bobotUjian > 0 && bobotUlangan > 0 && " + "}
// // // // //             {bobotUlangan > 0 && `UH×${bobotUlangan}%`}
// // // // //             {bobotUlangan > 0 && bobotLatihan > 0 && " + "}
// // // // //             {bobotLatihan > 0 && `Latihan×${bobotLatihan}%`}
// // // // //             {bobotLatihan > 0 && bobotKuis > 0 && " + "}
// // // // //             {bobotKuis > 0 && `Kuis×${bobotKuis}%`}
// // // // //           </p>
// // // // //         </div>
// // // // //         <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
// // // // //           {/* <div className="flex items-center gap-2">
// // // // //             <label className="text-[12px] font-semibold text-slate-600">KKM:</label>
// // // // //             <input
// // // // //               type="number"
// // // // //               value={kkm}
// // // // //               onChange={e => setKkm(parseInt(e.target.value) || 0)}
// // // // //               className="w-16 h-9 text-center border-[1.5px] border-slate-200 rounded-lg text-[13px] font-semibold text-zinc-900 bg-slate-50 focus:border-zinc-900 outline-none"
// // // // //             />
// // // // //           </div> */}
// // // // //           <KkmField kkm={kkm} setKkm={setKkm} />
// // // // //           <button
// // // // //             onClick={hitungNilaiAkhir}
// // // // //             disabled={!isBobotValid}
// // // // //             className="h-10 px-5 bg-zinc-900 text-white text-[13px] font-bold rounded-xl hover:bg-zinc-800 flex items-center gap-2 disabled:opacity-40 w-full sm:w-auto justify-center"
// // // // //           >
// // // // //             <Calculator className="w-4 h-4" /> Hitung Nilai Akhir
// // // // //           </button>
// // // // //         </div>
// // // // //         {!isBobotValid && (
// // // // //           <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
// // // // //             <AlertCircle className="text-red-500 w-4 h-4 flex-shrink-0" />
// // // // //             <p className="text-[11px] text-red-600 font-medium">Total bobot harus 100%. Sesuaikan sebelum menghitung.</p>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {showNilaiHasil && (
// // // // //         <div id="nilai-hasil-section" className="space-y-4">
// // // // //           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// // // // //             {[
// // // // //               { label: "Total Siswa", val: nilaiData.length, icon: <Users className="w-3.5 h-3.5" />, color: "#18181b" },
// // // // //               { label: "Rata-rata", val: (nilaiData.reduce((a: number, b: any) => a + b.akhir, 0) / nilaiData.length).toFixed(1), icon: <BarChart2 className="w-3.5 h-3.5" />, color: "#2563eb" },
// // // // //               { label: "Nilai Tertinggi", val: Math.max(...nilaiData.map((s: any) => s.akhir)), icon: <TrendingUp className="w-3.5 h-3.5" />, color: "#059669" },
// // // // //               { label: `Lulus (≥${kkm})`, val: `${nilaiData.filter((s: any) => s.lulus).length}/${nilaiData.length}`, icon: <CheckCircle className="w-3.5 h-3.5" />, color: "#059669" },
// // // // //             ].map(s => (
// // // // //               <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // // //                 <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>{s.icon}</div>
// // // // //                 <div>
// // // // //                   <p className="text-lg font-bold text-zinc-900">{s.val}</p>
// // // // //                   <p className="text-[10px] text-slate-400 font-medium">{s.label}</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //           <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // // //             <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
// // // // //               <h3 className="font-semibold text-zinc-900 text-[13px]">Rekap Nilai Akhir Siswa</h3>
// // // // //               <select value={nilaiFilter} onChange={e => setNilaiFilter(e.target.value)} className="h-8 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-600 focus:outline-none">
// // // // //                 <option value="all">Semua</option>
// // // // //                 <option value="lulus">Lulus</option>
// // // // //                 <option value="tidak">Tidak Lulus</option>
// // // // //               </select>
// // // // //             </div>
// // // // //             <div className="overflow-x-auto">
// // // // //               <table className="w-full" style={{ minWidth: "480px" }}>
// // // // //                 <thead className="border-b border-slate-100 bg-slate-50/50">
// // // // //                   <tr>
// // // // //                     <th className="px-4 py-3 text-center text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
// // // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama</th>
// // // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell cursor-pointer" onClick={() => { if (nilaiSortKey === "ujian") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("ujian"); setNilaiSortAsc(false); } }}>Ujian</th>
// // // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell cursor-pointer" onClick={() => { if (nilaiSortKey === "ulangan") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("ulangan"); setNilaiSortAsc(false); } }}>Ulangan</th>
// // // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer" onClick={() => { if (nilaiSortKey === "akhir") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("akhir"); setNilaiSortAsc(false); } }}>Nilai Akhir</th>
// // // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Grade</th>
// // // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell">Status</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody className="divide-y divide-slate-50">
// // // // //                   {getSortedNilaiData().map((s: any) => {
// // // // //                     const ranked = [...nilaiData].sort((a: any, b: any) => b.akhir - a.akhir);
// // // // //                     const rank = ranked.findIndex((r: any) => r.nisn === s.nisn) + 1;
// // // // //                     const rankClass =
// // // // //                       rank === 1 ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white" :
// // // // //                         rank === 2 ? "bg-gradient-to-br from-slate-400 to-slate-500 text-white" :
// // // // //                           rank === 3 ? "bg-gradient-to-br from-orange-400 to-amber-600 text-white" :
// // // // //                             "bg-slate-100 text-slate-600";
// // // // //                     const akhirColor = s.akhir >= 90 ? "#059669" : s.akhir >= 80 ? "#10b981" : s.akhir >= 70 ? "#2563eb" : "#dc2626";
// // // // //                     const gradeClass: Record<string, string> = { A: "bg-emerald-50 text-emerald-700", B: "bg-blue-50 text-blue-700", C: "bg-amber-50 text-amber-700", D: "bg-red-50 text-red-700" };
// // // // //                     return (
// // // // //                       <tr key={s.nisn} className="hover:bg-slate-50/50">
// // // // //                         <td className="px-4 py-3 text-center">
// // // // //                           <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center mx-auto ${rankClass}`}>{rank}</span>
// // // // //                         </td>
// // // // //                         <td className="px-4 py-3">
// // // // //                           <p className="font-semibold text-zinc-900 text-[12px] truncate max-w-[120px]">{s.nama}</p>
// // // // //                           <p className="text-[10px] text-slate-400">{s.nisn}</p>
// // // // //                         </td>
// // // // //                         <td className="px-4 py-3 hidden sm:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ujian}</span></td>
// // // // //                         <td className="px-4 py-3 hidden md:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ulangan}</span></td>
// // // // //                         <td className="px-4 py-3"><span className="font-black text-[15px]" style={{ color: akhirColor }}>{s.akhir}</span></td>
// // // // //                         <td className="px-4 py-3 hidden sm:table-cell">
// // // // //                           <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-extrabold ${gradeClass[s.grade]}`}>{s.grade}</span>
// // // // //                         </td>
// // // // //                         <td className="px-4 py-3 hidden md:table-cell">
// // // // //                           {s.lulus
// // // // //                             ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
// // // // //                             : <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>}
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     );
// // // // //                   })}
// // // // //                 </tbody>
// // // // //               </table>
// // // // //             </div>
// // // // //             <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
// // // // //               <span className="text-[11px] text-slate-400">{getSortedNilaiData().length} dari {nilaiData.length} siswa</span>
// // // // //               <span className="text-[11px] text-slate-500">KKM: <strong className="text-zinc-900">{kkm}</strong></span>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex h-screen items-center justify-center bg-gray-50">
// // // // //         <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
// // // // //       {sidebarOpen && (
// // // // //         <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
// // // // //       )}
// // // // //       <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 fixed md:relative z-50`}>
// // // // //         <Sidebar role="admin" />
// // // // //       </div>

// // // // //       <div className="flex-1 flex flex-col overflow-hidden">
// // // // //         <Header
// // // // //           title={selectedSubject ? `${selectedSubject.nama} › ${TAB_LABELS[activeTab] || activeTab}` : "Mata Pelajaran"}
// // // // //           showHamburger
// // // // //           onHamburgerClick={() => setSidebarOpen(true)}
// // // // //         />

// // // // //         <div className="flex-1 overflow-y-auto">

// // // // //           {/* ══ LIST MAPEL ══ */}
// // // // //           {!selectedSubject && (
// // // // //             <div className="p-4 md:p-8 space-y-5">
// // // // //               {error && (
// // // // //                 <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
// // // // //                   <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
// // // // //                   <button onClick={() => setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4" /></button>
// // // // //                 </div>
// // // // //               )}

// // // // //               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
// // // // //                 <div>
// // // // //                   <h1 className="text-lg md:text-xl font-bold text-zinc-900">Mata Pelajaran</h1>
// // // // //                   <p className="text-[13px] text-slate-500 mt-0.5">Kelola semua mata pelajaran</p>
// // // // //                 </div>
// // // // //                 <button
// // // // //                   onClick={() => { setShowAddModal(true); setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" }); }}
// // // // //                   className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm w-fit"
// // // // //                 >
// // // // //                   <Plus className="w-4 h-4" /> Tambah Mata Pelajaran
// // // // //                 </button>
// // // // //               </div>

// // // // //               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// // // // //                 {[
// // // // //                   { label: "Total Mapel", val: subjects.length, icon: <BookOpen className="w-4 h-4" />, color: "#18181b" },
// // // // //                   { label: "Total Soal", val: stats.totalSoal, icon: <FileText className="w-4 h-4" />, color: "#2563eb" },
// // // // //                   { label: "Total Ujian", val: stats.totalUjian, icon: <ClipboardList className="w-4 h-4" />, color: "#059669" },
// // // // //                   { label: "Kelas", val: [...new Set(subjects.map(s => s.kelas))].length, icon: <Users className="w-4 h-4" />, color: "#d97706" },
// // // // //                 ].map(s => (
// // // // //                   <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // // //                     <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>
// // // // //                       {s.icon}
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-lg md:text-xl font-bold text-zinc-900">{s.val}</p>
// // // // //                       <p className="text-[10px] md:text-[11px] text-slate-400 font-medium">{s.label}</p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>

// // // // //               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
// // // // //                 <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
// // // // //                   <div className="flex gap-2 flex-wrap">
// // // // //                     {["all", "X", "XI", "XII"].map(k => (
// // // // //                       <button
// // // // //                         key={k}
// // // // //                         onClick={() => setKelasFilter(k)}
// // // // //                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${kelasFilter === k ? "bg-zinc-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
// // // // //                       >
// // // // //                         {k === "all" ? "Semua" : k}
// // // // //                       </button>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                   <div className="relative flex-1 max-w-xs">
// // // // //                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// // // // //                     <input
// // // // //                       type="text"
// // // // //                       placeholder="Cari mata pelajaran..."
// // // // //                       value={searchQuery}
// // // // //                       onChange={e => setSearchQuery(e.target.value)}
// // // // //                       className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // //                 {filtered.map(subject => {
// // // // //                   const c = COLORS[subject.warna] || COLORS.zinc;
// // // // //                   return (
// // // // //                     <div
// // // // //                       key={subject.id}
// // // // //                       className="bg-white border border-slate-200 rounded-[16px] overflow-hidden cursor-pointer hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 hover:border-slate-300 transition-all group"
// // // // //                       onClick={() => { setSelectedSubject(subject); setActiveTab("ujian"); setShowNilaiHasil(false); }}
// // // // //                     >
// // // // //                       <div className="h-[6px]" style={{ background: `linear-gradient(90deg, ${c.dot}, ${c.hex}88)` }} />
// // // // //                       <div className="p-5">
// // // // //                         <div className="flex items-start gap-3 mb-3">
// // // // //                           <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{ background: c.bg, border: `1.5px solid ${c.border}` }}>
// // // // //                             <BookOpen style={{ color: c.icon }} className="w-5 h-5" />
// // // // //                           </div>
// // // // //                           <div className="flex-1 min-w-0">
// // // // //                             <p className="font-bold text-zinc-900 text-[14px] leading-tight truncate">{subject.nama}</p>
// // // // //                             <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: c.bg, color: c.icon, border: `1px solid ${c.border}` }}>
// // // // //                               {subject.kelas}
// // // // //                             </span>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         {subject.deskripsi && (
// // // // //                           <p className="text-[12px] text-slate-500 mb-3 line-clamp-2">{subject.deskripsi}</p>
// // // // //                         )}
// // // // //                         <div className="flex items-center gap-4 text-[12px] text-slate-500 pt-3 border-t border-slate-100">
// // // // //                           <div className="flex items-center gap-1.5">
// // // // //                             <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><FileText className="w-3 h-3 text-slate-400" /></div>
// // // // //                             <span className="font-medium">{subject.totalSoal} soal</span>
// // // // //                           </div>
// // // // //                           <div className="flex items-center gap-1.5">
// // // // //                             <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><ClipboardList className="w-3 h-3 text-slate-400" /></div>
// // // // //                             <span className="font-medium">{subject.totalUjian} ujian</span>
// // // // //                           </div>
// // // // //                           <div className="ml-auto flex items-center gap-1">
// // // // //                             <button
// // // // //                               onClick={e => { e.stopPropagation(); setTargetMapel(subject); setEditForm(subject); setShowEditModal(true); }}
// // // // //                               className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// // // // //                               title="Edit mapel"
// // // // //                             >
// // // // //                               <Pencil className="w-3.5 h-3.5" />
// // // // //                             </button>
// // // // //                             <button
// // // // //                               onClick={e => { e.stopPropagation(); openDeleteMapelModal(subject); }}
// // // // //                               className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// // // // //                               title="Hapus mapel"
// // // // //                             >
// // // // //                               <Trash2 className="w-3.5 h-3.5" />
// // // // //                             </button>
// // // // //                             <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //                 <div
// // // // //                   onClick={() => { setShowAddModal(true); setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" }); }}
// // // // //                   className="border-2 border-dashed border-slate-200 rounded-[16px] p-5 flex flex-col items-center justify-center gap-2 text-center cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all min-h-[160px]"
// // // // //                 >
// // // // //                   <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center"><Plus className="text-slate-400 w-5 h-5" /></div>
// // // // //                   <div>
// // // // //                     <p className="text-[13px] text-zinc-700 font-semibold">Tambah Mata Pelajaran</p>
// // // // //                     <p className="text-[11px] text-slate-400 mt-0.5">Buat mapel baru</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* ══ DETAIL MAPEL ══ */}
// // // // //           {selectedSubject && (
// // // // //             <div className="p-4 md:p-8 space-y-4">
// // // // //               {error && (
// // // // //                 <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
// // // // //                   <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
// // // // //                   <button onClick={() => setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4" /></button>
// // // // //                 </div>
// // // // //               )}

// // // // //               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <button onClick={() => setSelectedSubject(null)} className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 flex-shrink-0">
// // // // //                     <ArrowLeft className="w-4 h-4" />
// // // // //                   </button>
// // // // //                   <div className="min-w-0">
// // // // //                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mata Pelajaran</p>
// // // // //                     <h1 className="text-base md:text-lg font-bold text-zinc-900 truncate">{selectedSubject.nama} — {selectedSubject.kelas}</h1>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 {/* ── Header detail mapel: hanya Tambah + Edit Mapel + Hapus Mapel ── */}
// // // // //                 <div className="flex items-center gap-2">
// // // // //                   {["ujian", "ulangan", "latihan", "kuis"].includes(activeTab) && (
// // // // //                     <button
// // // // //                       onClick={() => setShowContentModal(true)}
// // // // //                       className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
// // // // //                     >
// // // // //                       <Plus className="w-4 h-4" /> Tambah {TAB_LABELS[activeTab]}
// // // // //                     </button>
// // // // //                   )}
// // // // //                   {/* <button
// // // // //                     onClick={() => { setTargetMapel(selectedSubject); setEditForm(selectedSubject); setShowEditModal(true); }}
// // // // //                     className="inline-flex items-center gap-2 border border-slate-200 bg-white text-zinc-700 px-3 py-2 rounded-xl text-[13px] font-semibold hover:bg-slate-50 transition-colors"
// // // // //                     title="Edit mata pelajaran"
// // // // //                   >
// // // // //                     <Pencil className="w-4 h-4" /> Edit Mapel
// // // // //                   </button>
// // // // //                   <button
// // // // //                     onClick={() => openDeleteMapelModal(selectedSubject)}
// // // // //                     className="inline-flex items-center gap-2 border border-red-200 bg-red-50 text-red-600 px-3 py-2 rounded-xl text-[13px] font-semibold hover:bg-red-100 transition-colors"
// // // // //                     title="Hapus mata pelajaran"
// // // // //                   >
// // // // //                     <Trash2 className="w-4 h-4" />
// // // // //                   </button> */}
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// // // // //                 {[
// // // // //                   { label: "Total Soal", val: selectedSubject.totalSoal, icon: <FileText className="w-4 h-4 text-slate-400" /> },
// // // // //                   { label: "Ujian", val: selectedSubject.totalUjian, icon: <ClipboardList className="w-4 h-4 text-slate-400" /> },
// // // // //                   { label: "Siswa Aktif", val: 35, icon: <Users className="w-4 h-4 text-slate-400" /> },
// // // // //                   { label: "Rata-rata", val: "78.5", icon: <TrendingUp className="w-4 h-4 text-slate-400" /> },
// // // // //                 ].map(st => (
// // // // //                   <div key={st.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // // //                     <div className="flex items-center gap-2 mb-1">{st.icon}<p className="text-[11px] text-slate-400 font-medium">{st.label}</p></div>
// // // // //                     <p className="text-xl md:text-2xl font-bold text-zinc-900">{st.val}</p>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>

// // // // //               <div className="overflow-x-auto -mx-1 px-1">
// // // // //                 <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
// // // // //                   {Object.entries(TAB_LABELS).map(([key, label]) => (
// // // // //                     <button
// // // // //                       key={key}
// // // // //                       onClick={() => { setActiveTab(key); setShowNilaiHasil(false); }}
// // // // //                       className={`px-3 py-2 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-all ${activeTab === key ? "bg-white text-zinc-900 shadow-sm" : "text-slate-500 hover:text-zinc-900"}`}
// // // // //                     >
// // // // //                       {label}
// // // // //                     </button>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>

// // // // //               {(activeTab === "ujian" || activeTab === "ulangan" || activeTab === "latihan" || activeTab === "kuis") && renderContentTable()}

// // // // //               {/* {activeTab === "soal" && (
// // // // //                 <div className="space-y-4">
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <div className="relative flex-1 max-w-xs">
// // // // //                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
// // // // //                       <input type="text" placeholder="Cari soal..." className="h-9 pl-8 pr-4 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 w-full" />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // // //                     <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
// // // // //                       <h3 className="font-semibold text-zinc-900 text-[13px]">Bank Soal</h3>
// // // // //                       <span className="text-[11px] text-slate-400 font-medium">{selectedSubject.totalSoal} soal</span>
// // // // //                     </div>
// // // // //                     <div className="py-12 text-center">
// // // // //                       <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// // // // //                       <p className="text-[13px] text-slate-400">Soal dikelola melalui masing-masing ujian/latihan</p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )} */}
// // // // //               {activeTab === "soal" && (
// // // // //                 <div className="space-y-4">
// // // // //                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
// // // // //                     <div className="relative flex-1 max-w-xs">
// // // // //                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
// // // // //                       <input
// // // // //                         type="text"
// // // // //                         placeholder="Cari soal..."
// // // // //                         value={soalBankSearch}
// // // // //                         onChange={e => setSoalBankSearch(e.target.value)}
// // // // //                         className="h-9 pl-8 pr-4 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 w-full"
// // // // //                       />
// // // // //                     </div>
// // // // //                     <select
// // // // //                       value={soalBankTipe}
// // // // //                       onChange={e => setSoalBankTipe(e.target.value)}
// // // // //                       className="h-9 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-white focus:outline-none"
// // // // //                     >
// // // // //                       <option value="">Semua Tipe</option>
// // // // //                       <option value="PILIHAN_GANDA">Pilihan Ganda</option>
// // // // //                       <option value="ESSAY">Essay</option>
// // // // //                     </select>
// // // // //                   </div>
// // // // //                   <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // // //                     <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
// // // // //                       <h3 className="font-semibold text-zinc-900 text-[13px]">Bank Soal</h3>
// // // // //                       <span className="text-[11px] text-slate-400 font-medium">{soalBankList.length} soal</span>
// // // // //                     </div>
// // // // //                     {soalBankLoading ? (
// // // // //                       <div className="flex items-center justify-center py-16">
// // // // //                         <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
// // // // //                       </div>
// // // // //                     ) : soalBankList.length === 0 ? (
// // // // //                       <div className="py-12 text-center">
// // // // //                         <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// // // // //                         <p className="text-[13px] text-slate-400">Belum ada soal di bank soal ini</p>
// // // // //                         <p className="text-[11px] text-slate-400 mt-1">Soal dibuat melalui tab Ujian/Latihan/Kuis</p>
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       <div className="divide-y divide-slate-50">
// // // // //                         {soalBankList.map((s, i) => (
// // // // //                           <div key={s.id} className="px-4 py-3.5 hover:bg-slate-50/50 flex items-start gap-3">
// // // // //                             <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
// // // // //                               {i + 1}
// // // // //                             </span>
// // // // //                             <div className="flex-1 min-w-0">
// // // // //                               <p className="text-[13px] text-zinc-900 font-medium leading-snug">{s.pertanyaan}</p>
// // // // //                               {s.gambarUrl && (
// // // // //                                 <img src={s.gambarUrl} alt="" className="mt-2 h-16 rounded-lg object-cover border border-slate-200" />
// // // // //                               )}
// // // // //                               <div className="flex items-center gap-2 mt-1.5 flex-wrap">
// // // // //                                 <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "PILIHAN_GANDA" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>
// // // // //                                   {s.tipe === "PILIHAN_GANDA" ? "Pilihan Ganda" : "Essay"}
// // // // //                                 </span>
// // // // //                                 {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
// // // // //                                 {s.tipe === "PILIHAN_GANDA" && s.jawabanBenar && (
// // // // //                                   <span className="text-[10px] text-slate-400">
// // // // //                                     Jwb: <strong className="text-emerald-600">{s.jawabanBenar}</strong>
// // // // //                                   </span>
// // // // //                                 )}
// // // // //                               </div>
// // // // //                               {s.tipe === "PILIHAN_GANDA" && (
// // // // //                                 <div className="mt-2 grid grid-cols-2 gap-1">
// // // // //                                   {[
// // // // //                                     { key: "opsiA", label: "A" },
// // // // //                                     { key: "opsiB", label: "B" },
// // // // //                                     { key: "opsiC", label: "C" },
// // // // //                                     { key: "opsiD", label: "D" },
// // // // //                                   ].filter(o => s[o.key]).map(o => (
// // // // //                                     <div key={o.key} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] ${s.jawabanBenar === o.label ? "bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold" : "bg-slate-50 text-slate-600"}`}>
// // // // //                                       <span className="font-bold">{o.label}.</span> {s[o.key]}
// // // // //                                     </div>
// // // // //                                   ))}
// // // // //                                 </div>
// // // // //                               )}
// // // // //                             </div>
// // // // //                             <span className="text-[10px] text-slate-300 flex-shrink-0 mt-1">
// // // // //                               {new Date(s.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
// // // // //                             </span>
// // // // //                           </div>
// // // // //                         ))}
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}

// // // // //               {activeTab === "nilai" && renderNilaiTab()}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ══ MODAL: Add Mapel ══ */}
// // // // //       {showAddModal && (
// // // // //         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
// // // // //           <div className="absolute inset-0" onClick={() => setShowAddModal(false)} />
// // // // //           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
// // // // //             <div className="flex items-center justify-between mb-5">
// // // // //               <h3 className="text-base font-bold text-zinc-900">Tambah Mata Pelajaran</h3>
// // // // //               <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // // //             </div>
// // // // //             <div className="space-y-4">
// // // // //               <div>
// // // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   placeholder="e.g. Matematika Peminatan"
// // // // //                   value={addForm.nama}
// // // // //                   onChange={e => setAddForm({ ...addForm, nama: e.target.value })}
// // // // //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas <span className="text-red-500">*</span></label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   placeholder="e.g. XII IPA 1"
// // // // //                   value={addForm.kelas}
// // // // //                   onChange={e => setAddForm({ ...addForm, kelas: e.target.value })}
// // // // //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label>
// // // // //                 <textarea
// // // // //                   placeholder="Deskripsi singkat..."
// // // // //                   value={addForm.deskripsi}
// // // // //                   onChange={e => setAddForm({ ...addForm, deskripsi: e.target.value })}
// // // // //                   className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none"
// // // // //                   rows={3}
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Warna Tema</label>
// // // // //                 <div className="flex gap-2 flex-wrap">
// // // // //                   {Object.entries(COLORS).map(([key, c]) => (
// // // // //                     <button
// // // // //                       key={key}
// // // // //                       onClick={() => setAddForm({ ...addForm, warna: key })}
// // // // //                       className={`w-8 h-8 rounded-full transition-all ${addForm.warna === key ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : "hover:scale-105"}`}
// // // // //                       style={{ background: c.hex }}
// // // // //                       title={key}
// // // // //                     />
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="flex gap-3 mt-6">
// // // // //               <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// // // // //               <button onClick={handleAdd} disabled={!addForm.nama.trim() || !addForm.kelas.trim()} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40">Simpan</button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* ══ MODAL: Edit Mapel ══ */}
// // // // //       {showEditModal && editForm && (
// // // // //         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
// // // // //           <div className="absolute inset-0" onClick={() => setShowEditModal(false)} />
// // // // //           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
// // // // //             <div className="flex items-center justify-between mb-5">
// // // // //               <h3 className="text-base font-bold text-zinc-900">Edit Mata Pelajaran</h3>
// // // // //               <button onClick={() => setShowEditModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // // //             </div>
// // // // //             <div className="space-y-4">
// // // // //               <div>
// // // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={editForm.nama}
// // // // //                   onChange={e => setEditForm({ ...editForm, nama: e.target.value })}
// // // // //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas</label>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={editForm.kelas}
// // // // //                   onChange={e => setEditForm({ ...editForm, kelas: e.target.value })}
// // // // //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label>
// // // // //                 <textarea
// // // // //                   value={editForm.deskripsi || ""}
// // // // //                   onChange={e => setEditForm({ ...editForm, deskripsi: e.target.value })}
// // // // //                   className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none"
// // // // //                   rows={3}
// // // // //                 />
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="flex gap-3 mt-6">
// // // // //               <button onClick={() => setShowEditModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// // // // //               <button onClick={handleEdit} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800">Simpan</button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* ══ MODAL: Delete Mapel — informatif dengan detail jumlah data ══ */}
// // // // //       {showDeleteModal && targetMapel && (
// // // // //         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
// // // // //           <div className="absolute inset-0" onClick={() => { if (!deleteMapelLoading) { setShowDeleteModal(false); setDeleteMapelDetail(null); } }} />
// // // // //           <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
// // // // //             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
// // // // //               <Trash2 className="w-6 h-6 text-red-600" />
// // // // //             </div>
// // // // //             <h3 className="text-base font-bold text-zinc-900 text-center mb-1">Hapus Mata Pelajaran?</h3>
// // // // //             <p className="text-[13px] font-semibold text-zinc-800 text-center mb-4">"{targetMapel.nama}"</p>

// // // // //             {deleteMapelLoading ? (
// // // // //               <div className="flex flex-col items-center gap-2 py-4">
// // // // //                 <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
// // // // //                 <p className="text-[11px] text-slate-400">Mengambil informasi data...</p>
// // // // //               </div>
// // // // //             ) : deleteMapelDetail ? (
// // // // //               <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
// // // // //                 <p className="text-[11px] font-bold text-red-700 mb-3 flex items-center gap-1.5">
// // // // //                   <AlertCircle className="w-3.5 h-3.5" /> Data yang akan ikut terhapus permanen:
// // // // //                 </p>
// // // // //                 <div className="space-y-2">
// // // // //                   {[
// // // // //                     { label: "Ujian", val: deleteMapelDetail.totalUjian, icon: "📝" },
// // // // //                     { label: "Ulangan Harian", val: deleteMapelDetail.totalUlangan, icon: "📋" },
// // // // //                     { label: "Latihan", val: deleteMapelDetail.totalLatihan, icon: "💪" },
// // // // //                     { label: "Kuis", val: deleteMapelDetail.totalKuis, icon: "⚡" },
// // // // //                     { label: "Bank Soal", val: deleteMapelDetail.totalSoal, icon: "📚" },
// // // // //                   ].map(item => (
// // // // //                     <div key={item.label} className="flex items-center justify-between">
// // // // //                       <span className="text-[12px] text-red-700 flex items-center gap-1.5">
// // // // //                         <span>{item.icon}</span> {item.label}
// // // // //                       </span>
// // // // //                       <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${item.val > 0 ? "bg-red-200 text-red-800" : "bg-slate-100 text-slate-400"}`}>
// // // // //                         {item.val} {item.val === 1 ? "item" : "item"}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //                 <div className="mt-3 pt-3 border-t border-red-200">
// // // // //                   <p className="text-[10px] text-red-600 font-semibold text-center">
// // // // //                     ⚠️ Tindakan ini tidak dapat dibatalkan!
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
// // // // //                 <p className="text-[12px] text-slate-500 text-center">Semua data terkait akan terhapus permanen.</p>
// // // // //               </div>
// // // // //             )}

// // // // //             <div className="flex gap-3">
// // // // //               <button
// // // // //                 onClick={() => { setShowDeleteModal(false); setDeleteMapelDetail(null); }}
// // // // //                 disabled={deleteMapelLoading}
// // // // //                 className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50 disabled:opacity-40"
// // // // //               >
// // // // //                 Batal
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={handleDelete}
// // // // //                 disabled={deleteMapelLoading}
// // // // //                 className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700 disabled:opacity-40 flex items-center justify-center gap-2"
// // // // //               >
// // // // //                 {deleteMapelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
// // // // //                 Ya, Hapus Semua
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* ══ MODAL: Detail Ujian ══ */}
// // // // //       {showDetailModal && selectedUjian && (
// // // // //         <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
// // // // //           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
// // // // //           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
// // // // //             <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
// // // // //               <div className="flex items-center gap-2.5">
// // // // //                 <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
// // // // //                   <ClipboardList className="w-4 h-4 text-zinc-600" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <h3 className="text-[14px] font-bold text-zinc-900">
// // // // //                     Detail {TAB_LABELS[selectedUjian.tipe?.toLowerCase()] || "Ujian"}
// // // // //                   </h3>
// // // // //                   <p className="text-[10px] text-slate-400">Informasi & Akses</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <button onClick={() => setShowDetailModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // // //             </div>
// // // // //             <div className="p-5 space-y-4">
// // // // //               <div className="bg-slate-50 rounded-xl p-4 space-y-3">
// // // // //                 <div>
// // // // //                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nama</p>
// // // // //                   <p className="font-bold text-zinc-900 text-[14px]">{selectedUjian.nama}</p>
// // // // //                 </div>
// // // // //                 <div className="grid grid-cols-2 gap-3">
// // // // //                   {[
// // // // //                     { icon: <Calendar className="w-3.5 h-3.5 text-slate-400" />, label: "Tanggal", val: selectedUjian.tanggalMulai ? new Date(selectedUjian.tanggalMulai).toLocaleDateString("id-ID") : "—" },
// // // // //                     { icon: <Clock className="w-3.5 h-3.5 text-slate-400" />, label: "Durasi", val: `${selectedUjian.durasi} menit` },
// // // // //                     { icon: <FileText className="w-3.5 h-3.5 text-slate-400" />, label: "Total Soal", val: `${selectedUjian.soalList?.length ?? selectedUjian.totalSoal} soal` },
// // // // //                     { icon: <Users className="w-3.5 h-3.5 text-slate-400" />, label: "Peserta", val: selectedUjian.peserta },
// // // // //                   ].map(it => (
// // // // //                     <div key={it.label} className="flex items-center gap-2">
// // // // //                       <div className="w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">{it.icon}</div>
// // // // //                       <div>
// // // // //                         <p className="text-[9px] text-slate-400 font-semibold uppercase">{it.label}</p>
// // // // //                         <p className="text-[12px] font-semibold text-zinc-700">{it.val}</p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-2 pt-1 flex-wrap">
// // // // //                   <p className="text-[10px] font-semibold text-slate-400 uppercase">Urutan Soal:</p>
// // // // //                   {selectedUjian.soalAcak ? (
// // // // //                     <span className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
// // // // //                       <Shuffle className="w-3 h-3" /> Diacak per siswa
// // // // //                     </span>
// // // // //                   ) : (
// // // // //                     <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
// // // // //                       <ListOrdered className="w-3 h-3" /> Berurutan (sama semua)
// // // // //                     </span>
// // // // //                   )}
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-2 pt-1">
// // // // //                   <p className="text-[10px] font-semibold text-slate-400 uppercase">Status:</p>
// // // // //                   {selectedUjian.status === "BERLANGSUNG" && (
// // // // //                     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
// // // // //                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" /> BERLANGSUNG
// // // // //                     </span>
// // // // //                   )}
// // // // //                   {selectedUjian.status === "SELESAI" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">SELESAI</span>}
// // // // //                   {selectedUjian.status === "AKTIF" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">AKTIF</span>}
// // // // //                   {selectedUjian.status === "DRAFT" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">DRAFT</span>}
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
// // // // //                 <div className="flex items-center gap-2 mb-2">
// // // // //                   <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
// // // // //                   <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Link Akses Siswa</p>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-2">
// // // // //                   <div className="flex-1 min-w-0 bg-white border border-blue-200 rounded-lg px-3 py-2">
// // // // //                     <p className="text-[11px] font-mono text-blue-700 truncate">{selectedUjian.linkSiswa}</p>
// // // // //                   </div>
// // // // //                   <button
// // // // //                     onClick={() => copyToClipboard(selectedUjian.linkSiswa, "link")}
// // // // //                     className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedLink ? "bg-emerald-500 text-white" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}
// // // // //                   >
// // // // //                     {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedLink ? "Disalin!" : "Salin"}
// // // // //                   </button>
// // // // //                 </div>
// // // // //                 <a
// // // // //                   href={selectedUjian.linkPreview}
// // // // //                   target="_blank"
// // // // //                   rel="noopener noreferrer"
// // // // //                   className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
// // // // //                 >
// // // // //                   <ExternalLink className="w-3 h-3" /> Buka Preview Ujian
// // // // //                 </a>
// // // // //               </div>

// // // // //               <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
// // // // //                 <div className="flex items-center gap-2 mb-2">
// // // // //                   <Hash className="w-3.5 h-3.5 text-amber-500" />
// // // // //                   <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Token Ujian</p>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-2">
// // // // //                   <div className="flex-1 min-w-0 bg-white border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
// // // // //                     <p className={`text-[13px] font-mono font-bold tracking-widest flex-1 ${showToken ? "text-amber-700" : "text-amber-200 select-none"}`}>
// // // // //                       {showToken ? selectedUjian.token : selectedUjian.token.replace(/[A-Z0-9]/g, "•")}
// // // // //                     </p>
// // // // //                     <button onClick={() => setShowToken(!showToken)} className="text-amber-400 hover:text-amber-600">
// // // // //                       {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// // // // //                     </button>
// // // // //                   </div>
// // // // //                   <button
// // // // //                     onClick={() => copyToClipboard(selectedUjian.token, "token")}
// // // // //                     className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedToken ? "bg-emerald-500 text-white" : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50"}`}
// // // // //                   >
// // // // //                     {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedToken ? "Disalin!" : "Salin"}
// // // // //                   </button>
// // // // //                 </div>
// // // // //                 <p className="text-[10px] text-amber-600 mt-2">⚠️ Bagikan token hanya kepada siswa yang berhak.</p>
// // // // //               </div>
// // // // //               {/* 
// // // // //               <button
// // // // //                 onClick={() => { setShowDetailModal(false); setShowKelolaSoal(true); }}
// // // // //                 className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50 flex items-center justify-center gap-2"
// // // // //               >
// // // // //                 <Edit3 className="w-4 h-4" /> Kelola Soal ({selectedUjian.soalList?.length ?? selectedUjian.totalSoal} soal)
// // // // //               </button> */}
// // // // //             </div>
// // // // //             <div className="p-5 pt-0">
// // // // //               <button onClick={() => setShowDetailModal(false)} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">
// // // // //                 Tutup
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* ══ MODAL: Tambah Konten ══ */}
// // // // //       {showContentModal && (
// // // // //         <AddContentModal
// // // // //           activeTab={activeTab}
// // // // //           onClose={() => setShowContentModal(false)}
// // // // //           onSave={handleSaveContent}
// // // // //         />
// // // // //       )}

// // // // //       {/* ══ MODAL: Kelola Soal ══ */}
// // // // //       {showKelolaSoal && selectedUjian && (
// // // // //         <KelolaSoalModal
// // // // //           ujian={selectedUjian}
// // // // //           onClose={() => { setShowKelolaSoal(false); setSelectedUjian(null); }}
// // // // //           onUpdate={handleUpdateSoal}
// // // // //         />
// // // // //       )}

// // // // //       {/* ══ MODAL: Edit Ujian ══ */}
// // // // //       {showEditUjianModal && targetUjian && (
// // // // //         <EditUjianModal
// // // // //           ujian={targetUjian}
// // // // //           onClose={() => { setShowEditUjianModal(false); setTargetUjian(null); }}
// // // // //           onSave={handleEditUjian}
// // // // //         />
// // // // //       )}

// // // // //       {/* ══ MODAL: Delete Ujian ══ */}
// // // // //       {showDeleteUjianModal && targetUjian && (
// // // // //         <DeleteUjianModal
// // // // //           ujian={targetUjian}
// // // // //           onClose={() => { setShowDeleteUjianModal(false); setTargetUjian(null); }}
// // // // //           onDelete={handleDeleteUjian}
// // // // //         />
// // // // //       )}
// // // // //       {/* ══ MODAL: Hasil Ujian ══ */}
// // // // //       {showHasilModal && hasilUjianTarget && (
// // // // //         <HasilUjianModal
// // // // //           ujian={hasilUjianTarget}
// // // // //           onClose={() => { setShowHasilModal(false); setHasilUjianTarget(null); }}
// // // // //         />
// // // // //       )}
// // // // //       {showEditUjianModal && targetUjian && (
// // // // //         <EditUjianModal
// // // // //           ujian={targetUjian}
// // // // //           onClose={() => { setShowEditUjianModal(false); setTargetUjian(null); }}
// // // // //           onSave={handleEditUjian}
// // // // //           onKelolaSoal={() => {           // ← tambah ini
// // // // //             setSelectedUjian(targetUjian);
// // // // //             setShowEditUjianModal(false);
// // // // //             setShowKelolaSoal(true);
// // // // //           }}
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import Sidebar from "@/components/Sidebar";
// // // // import Header from "@/components/Header";
// // // // import { api, getToken } from "@/lib/api";
// // // // import {
// // // //   BookOpen,
// // // //   Plus,
// // // //   Search,
// // // //   Pencil,
// // // //   Trash2,
// // // //   Copy,
// // // //   ExternalLink,
// // // //   AlertCircle,
// // // //   Loader2,
// // // //   X,
// // // //   ArrowLeft,
// // // //   FileText,
// // // //   ClipboardList,
// // // //   Users,
// // // //   TrendingUp,
// // // //   BarChart2,
// // // //   CheckCircle,
// // // //   ChevronRight,
// // // //   Eye,
// // // //   EyeOff,
// // // //   Check,
// // // //   Hash,
// // // //   Clock,
// // // //   Calendar,
// // // //   Edit3,
// // // //   ImageIcon,
// // // //   Upload,
// // // //   Shuffle,
// // // //   ListOrdered,
// // // //   Save,
// // // //   Zap,
// // // //   Calculator,
// // // //   Dumbbell,
// // // //   Book,
// // // // } from "lucide-react";

// // // // // ─── Types ────────────────────────────────────────────────────────────────────
// // // // type MataPelajaran = {
// // // //   id: number;
// // // //   nama: string;
// // // //   kelas: string;
// // // //   deskripsi?: string;
// // // //   warna: string;
// // // //   totalSoal: number;
// // // //   totalUjian: number;
// // // // };

// // // // type Ujian = {
// // // //   id: string;
// // // //   nama: string;
// // // //   token: string;
// // // //   kelas: string;
// // // //   tipe: string;
// // // //   status: string;
// // // //   durasi: number;
// // // //   tanggalMulai?: string;
// // // //   totalSoal: number;
// // // //   peserta: string;
// // // //   linkSiswa: string;
// // // //   linkPreview: string;
// // // //   soalAcak?: boolean;
// // // //   soalList?: SoalItem[];
// // // // };

// // // // type SoalItem = {
// // // //   id: string;
// // // //   pertanyaan: string;
// // // //   tipe: "pg" | "essay";
// // // //   opsi: string[];
// // // //   jawaban: string;
// // // //   topik: string;
// // // //   gambar?: string;
// // // // };

// // // // type DeleteMapelDetail = {
// // // //   totalUjian: number;
// // // //   totalUlangan: number;
// // // //   totalLatihan: number;
// // // //   totalKuis: number;
// // // //   totalSoal: number;
// // // // };

// // // // type HasilSiswa = {
// // // //   nisn: string;
// // // //   nama: string;
// // // //   kelas: string;
// // // //   nilai: number;
// // // //   benar: number;
// // // //   salah: number;
// // // //   lulus: boolean;
// // // //   pelanggaran: number;
// // // //   catatan: string[];
// // // // };

// // // // type HasilUjian = {
// // // //   ujian: { id: string; nama: string; durasi: string; totalSoal: number; kelas: string };
// // // //   summary: {
// // // //     rataRata: number;
// // // //     tertinggi: number;
// // // //     terendah: number;
// // // //     lulus: number;
// // // //     gagal: number;
// // // //     totalSiswa: number;
// // // //   };
// // // //   siswa: HasilSiswa[];
// // // // };

// // // // // ─── Color System ─────────────────────────────────────────────────────────────
// // // // const COLORS: Record<string, { bg: string; icon: string; dot: string; hex: string; border: string; light: string }> = {
// // // //   zinc:    { bg: "#f4f4f5", icon: "#18181b", dot: "#52525b", hex: "#18181b", border: "#d4d4d8", light: "#fafafa" },
// // // //   blue:    { bg: "#eff6ff", icon: "#2563eb", dot: "#3b82f6", hex: "#3b82f6", border: "#bfdbfe", light: "#eff6ff" },
// // // //   violet:  { bg: "#f5f3ff", icon: "#7c3aed", dot: "#8b5cf6", hex: "#8b5cf6", border: "#ddd6fe", light: "#f5f3ff" },
// // // //   emerald: { bg: "#ecfdf5", icon: "#059669", dot: "#10b981", hex: "#10b981", border: "#a7f3d0", light: "#ecfdf5" },
// // // //   amber:   { bg: "#fffbeb", icon: "#d97706", dot: "#f59e0b", hex: "#f59e0b", border: "#fde68a", light: "#fffbeb" },
// // // //   red:     { bg: "#fef2f2", icon: "#dc2626", dot: "#ef4444", hex: "#ef4444", border: "#fecaca", light: "#fef2f2" },
// // // //   cyan:    { bg: "#ecfeff", icon: "#0891b2", dot: "#06b6d4", hex: "#06b6d4", border: "#a5f3fc", light: "#ecfeff" },
// // // //   pink:    { bg: "#fdf2f8", icon: "#be185d", dot: "#ec4899", hex: "#ec4899", border: "#fbcfe8", light: "#fdf2f8" },
// // // // };

// // // // const TAB_LABELS: Record<string, string> = {
// // // //   ujian:   "Ujian",
// // // //   ulangan: "Ulangan",
// // // //   latihan: "Latihan",
// // // //   kuis:    "Kuis",
// // // //   soal:    "Bank Soal",
// // // //   nilai:   "Nilai Akhir",
// // // // };

// // // // // ─── Draft helpers ────────────────────────────────────────────────────────────
// // // // const DRAFT_KEY = (tab: string) => `admin_add_content_draft_${tab}`;

// // // // interface DraftData {
// // // //   step: 1 | 2;
// // // //   nama: string;
// // // //   tanggal: string;
// // // //   durasi: string;
// // // //   soalAcak: boolean;
// // // //   soalList: SoalItem[];
// // // //   soalPertanyaan: string;
// // // //   soalTipe: "pg" | "essay";
// // // //   soalTopik: string;
// // // //   soalOpsi: string[];
// // // //   soalJawaban: string;
// // // //   soalGambar?: string;
// // // //   editingId: string | null;
// // // // }

// // // // function exportToExcel(data: HasilUjian, ujianNama: string) {
// // // //   const header = ["No", "NISN", "Nama", "Kelas", "Nilai", "Benar", "Salah", "Status", "Pelanggaran"];
// // // //   const rows = data.siswa.map((s, i) => [
// // // //     i + 1, s.nisn, s.nama, s.kelas, s.nilai, s.benar, s.salah,
// // // //     s.lulus ? "LULUS" : "TIDAK LULUS", s.pelanggaran,
// // // //   ]);
// // // //   const summaryRows = [
// // // //     [],
// // // //     ["RINGKASAN"],
// // // //     ["Total Peserta", data.summary.totalSiswa],
// // // //     ["Rata-rata Nilai", data.summary.rataRata],
// // // //     ["Nilai Tertinggi", data.summary.tertinggi],
// // // //     ["Nilai Terendah", data.summary.terendah],
// // // //     ["Lulus", data.summary.lulus],
// // // //     ["Tidak Lulus", data.summary.gagal],
// // // //   ];
// // // //   const allRows = [header, ...rows, ...summaryRows];
// // // //   const csvContent = allRows
// // // //     .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
// // // //     .join("\n");
// // // //   const bom = "\uFEFF";
// // // //   const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
// // // //   const url = URL.createObjectURL(blob);
// // // //   const link = document.createElement("a");
// // // //   link.href = url;
// // // //   link.download = `Hasil_${ujianNama.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`;
// // // //   document.body.appendChild(link);
// // // //   link.click();
// // // //   document.body.removeChild(link);
// // // //   URL.revokeObjectURL(url);
// // // // }

// // // // function saveDraft(tab: string, data: DraftData) {
// // // //   try { sessionStorage.setItem(DRAFT_KEY(tab), JSON.stringify(data)); } catch (_) { }
// // // // }
// // // // function loadDraft(tab: string): DraftData | null {
// // // //   try { const raw = sessionStorage.getItem(DRAFT_KEY(tab)); return raw ? JSON.parse(raw) : null; } catch (_) { return null; }
// // // // }
// // // // function clearDraft(tab: string) {
// // // //   try { sessionStorage.removeItem(DRAFT_KEY(tab)); } catch (_) { }
// // // // }

// // // // // ─── SoalImageUpload ──────────────────────────────────────────────────────────
// // // // function SoalImageUpload({ value, onChange }: { value?: string; onChange: (v?: string) => void }) {
// // // //   const fileRef = useRef<HTMLInputElement>(null);
// // // //   function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
// // // //     const file = e.target.files?.[0];
// // // //     if (!file) return;
// // // //     if (file.size > 5 * 1024 * 1024) { alert("Maks 5MB"); return; }
// // // //     const r = new FileReader();
// // // //     r.onload = (ev) => onChange(ev.target?.result as string);
// // // //     r.readAsDataURL(file);
// // // //   }
// // // //   return (
// // // //     <div>
// // // //       <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
// // // //         Gambar Soal <span className="text-slate-400 font-normal">(opsional)</span>
// // // //       </label>
// // // //       {value ? (
// // // //         <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
// // // //           <img src={value} alt="" className="w-full max-h-48 object-contain" />
// // // //           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
// // // //             <button type="button" onClick={() => fileRef.current?.click()} className="h-8 px-3 bg-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 shadow">
// // // //               <Upload className="w-3.5 h-3.5" /> Ganti
// // // //             </button>
// // // //             <button type="button" onClick={() => onChange(undefined)} className="h-8 px-3 bg-red-500 rounded-lg text-[11px] font-semibold text-white flex items-center gap-1.5 shadow">
// // // //               <Trash2 className="w-3.5 h-3.5" /> Hapus
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       ) : (
// // // //         <button
// // // //           type="button"
// // // //           onClick={() => fileRef.current?.click()}
// // // //           className="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all group"
// // // //         >
// // // //           <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
// // // //             <ImageIcon className="w-4 h-4 text-slate-400" />
// // // //           </div>
// // // //           <div className="text-center">
// // // //             <p className="text-[12px] font-semibold text-slate-500">Klik untuk upload gambar</p>
// // // //             <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, GIF · Maks 5MB</p>
// // // //           </div>
// // // //         </button>
// // // //       )}
// // // //       <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
// // // //     </div>
// // // //   );
// // // // }

// // // // function isSoalLiveValid(pertanyaan: string) {
// // // //   return pertanyaan.trim().length > 0;
// // // // }

// // // // // ─── KkmField (untuk tab Nilai) ───────────────────────────────────────────────
// // // // function KkmField({ kkm, setKkm }: { kkm: number; setKkm: (v: number) => void }) {
// // // //   const [editing, setEditing] = useState(false);
// // // //   const [tempVal, setTempVal] = useState(String(kkm));
// // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // //   function startEdit() {
// // // //     setTempVal(String(kkm));
// // // //     setEditing(true);
// // // //     setTimeout(() => inputRef.current?.select(), 0);
// // // //   }

// // // //   function commit() {
// // // //     const parsed = parseInt(tempVal);
// // // //     if (!isNaN(parsed) && parsed > 0 && parsed <= 100) setKkm(parsed);
// // // //     setEditing(false);
// // // //   }

// // // //   function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
// // // //     if (e.key === "Enter") commit();
// // // //     if (e.key === "Escape") setEditing(false);
// // // //   }

// // // //   return (
// // // //     <div className="flex items-center gap-2">
// // // //       <label className="text-[12px] font-semibold text-slate-600">KKM:</label>
// // // //       {editing ? (
// // // //         <input
// // // //           ref={inputRef}
// // // //           type="number"
// // // //           value={tempVal}
// // // //           onChange={e => setTempVal(e.target.value)}
// // // //           onBlur={commit}
// // // //           onKeyDown={handleKeyDown}
// // // //           autoFocus
// // // //           className="w-16 h-9 text-center border-[1.5px] border-zinc-900 rounded-lg text-[13px] font-semibold text-zinc-900 bg-white outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // //         />
// // // //       ) : (
// // // //         <button
// // // //           onDoubleClick={startEdit}
// // // //           title="Klik 2x untuk ubah KKM"
// // // //           className="w-16 h-9 text-center border-[1.5px] border-slate-200 rounded-lg text-[13px] font-semibold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none"
// // // //         >
// // // //           {kkm}
// // // //         </button>
// // // //       )}
// // // //       {!editing && (
// // // //         <span className="text-[10px] text-slate-400 hidden sm:inline">klik 2x untuk ubah</span>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── KkmInline — DIPINDAH KE LUAR HasilUjianModal ────────────────────────────
// // // // // Ini adalah perbaikan utama: komponen tidak boleh didefinisikan di dalam
// // // // // fungsi komponen lain, karena React akan membuat ulang setiap render
// // // // // dan state internal (editingKkm, tempKkm) akan hilang / tidak sinkron.
// // // // function KkmInline({
// // // //   kkmModal,
// // // //   setKkmModal,
// // // // }: {
// // // //   kkmModal: number;
// // // //   setKkmModal: (v: number) => void;
// // // // }) {
// // // //   const [editingKkm, setEditingKkm] = useState(false);
// // // //   const [tempKkm, setTempKkm] = useState(String(kkmModal));
// // // //   const ref = useRef<HTMLInputElement>(null);

// // // //   // Sinkronkan tempKkm saat kkmModal berubah dari luar (misal pertama kali render)
// // // //   useEffect(() => {
// // // //     if (!editingKkm) setTempKkm(String(kkmModal));
// // // //   }, [kkmModal, editingKkm]);

// // // //   function commit() {
// // // //     const v = parseInt(tempKkm);
// // // //     if (!isNaN(v) && v > 0 && v <= 100) setKkmModal(v);
// // // //     setEditingKkm(false);
// // // //   }

// // // //   return (
// // // //     <div className="flex items-center gap-1.5">
// // // //       <span className="text-[11px] text-slate-400">KKM:</span>
// // // //       {editingKkm ? (
// // // //         <input
// // // //           ref={ref}
// // // //           type="number"
// // // //           value={tempKkm}
// // // //           autoFocus
// // // //           onChange={e => setTempKkm(e.target.value)}
// // // //           onBlur={commit}
// // // //           onKeyDown={e => {
// // // //             if (e.key === "Enter") commit();
// // // //             if (e.key === "Escape") setEditingKkm(false);
// // // //           }}
// // // //           className="w-14 h-6 text-center border-[1.5px] border-zinc-900 rounded-md text-[11px] font-bold text-zinc-900 bg-white outline-none"
// // // //         />
// // // //       ) : (
// // // //         <button
// // // //           onDoubleClick={() => {
// // // //             setTempKkm(String(kkmModal));
// // // //             setEditingKkm(true);
// // // //             setTimeout(() => ref.current?.select(), 0);
// // // //           }}
// // // //           title="Klik 2x untuk ubah KKM"
// // // //           className="min-w-[2rem] h-6 px-2 border-[1.5px] border-slate-200 rounded-md text-[11px] font-bold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none"
// // // //         >
// // // //           {kkmModal}
// // // //         </button>
// // // //       )}
// // // //       {!editingKkm && (
// // // //         <span className="text-[10px] text-slate-300 hidden sm:inline">klik 2×</span>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── HasilUjianModal ──────────────────────────────────────────────────────────
// // // // function HasilUjianModal({
// // // //   ujian,
// // // //   onClose,
// // // // }: {
// // // //   ujian: Ujian;
// // // //   onClose: () => void;
// // // // }) {
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [data, setData] = useState<HasilUjian | null>(null);
// // // //   const [error, setError] = useState("");

// // // //   // ── KKM dikelola di sini, diteruskan ke KkmInline via props ──
// // // //   const [kkmModal, setKkmModal] = useState<number>(() => {
// // // //     try {
// // // //       const saved = sessionStorage.getItem(`kkm_hasil_${ujian.id}`);
// // // //       return saved ? parseInt(saved) : 70;
// // // //     } catch { return 70; }
// // // //   });

// // // //   // Persist KKM ke sessionStorage setiap kali berubah
// // // //   useEffect(() => {
// // // //     try { sessionStorage.setItem(`kkm_hasil_${ujian.id}`, String(kkmModal)); } catch (_) { }
// // // //   }, [kkmModal, ujian.id]);

// // // //   const [filter, setFilter] = useState("all");
// // // //   const [sort, setSort] = useState("nama");
// // // //   const [dir, setDir] = useState<"asc" | "desc">("asc");

// // // //   const [selectedNisn, setSelectedNisn] = useState<string | null>(null);
// // // //   const [detailData, setDetailData] = useState<any | null>(null);
// // // //   const [detailLoading, setDetailLoading] = useState(false);

// // // //   // ── Fetch data satu kali saat modal dibuka ──
// // // //   useEffect(() => {
// // // //     async function fetchHasil() {
// // // //       setLoading(true);
// // // //       try {
// // // //         const res = await api.get<HasilUjian>(`/ujian/${ujian.id}/laporan`);
// // // //         setData(res as HasilUjian);
// // // //       } catch (e) {
// // // //         setError("Gagal memuat data hasil ujian");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     }
// // // //     fetchHasil();
// // // //   }, [ujian.id]);

// // // //   // ── Hitung ulang lulus/tidak berdasarkan kkmModal (client-side) ──
// // // //   const siswaWithKkm = useMemo(() => {
// // // //     if (!data) return [];
// // // //     return data.siswa.map(s => ({ ...s, lulus: s.nilai >= kkmModal }));
// // // //   }, [data, kkmModal]);

// // // //   // ── Summary dihitung ulang berdasarkan kkmModal ──
// // // //   const recomputedSummary = useMemo(() => {
// // // //     if (!data) return null;
// // // //     return {
// // // //       ...data.summary,
// // // //       lulus: siswaWithKkm.filter(s => s.lulus).length,
// // // //       gagal:  siswaWithKkm.filter(s => !s.lulus).length,
// // // //     };
// // // //   }, [data, siswaWithKkm]);

// // // //   // ── Filter & sort dilakukan di client ──
// // // //   const filteredSiswa = useMemo(() => {
// // // //     let list = [...siswaWithKkm];
// // // //     if (filter === "lulus") list = list.filter(s => s.lulus);
// // // //     else if (filter === "gagal") list = list.filter(s => !s.lulus);
// // // //     else if (filter === "viol") list = list.filter(s => s.pelanggaran > 0);
// // // //     list.sort((a, b) => {
// // // //       const va = (a as any)[sort];
// // // //       const vb = (b as any)[sort];
// // // //       if (typeof va === "string") return dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
// // // //       return dir === "asc" ? va - vb : vb - va;
// // // //     });
// // // //     return list;
// // // //   }, [siswaWithKkm, filter, sort, dir]);

// // // //   async function fetchDetailSiswa(nisn: string) {
// // // //     setDetailLoading(true);
// // // //     setSelectedNisn(nisn);
// // // //     try {
// // // //       const res = await api.get(`/ujian/${ujian.id}/laporan/siswa/${nisn}`);
// // // //       setDetailData(res);
// // // //     } catch {
// // // //       setDetailData(null);
// // // //     } finally {
// // // //       setDetailLoading(false);
// // // //     }
// // // //   }

// // // //   function toggleSort(key: string) {
// // // //     if (sort === key) setDir(d => d === "asc" ? "desc" : "asc");
// // // //     else { setSort(key); setDir("asc"); }
// // // //   }

// // // //   const SortIcon = ({ col }: { col: string }) => (
// // // //     <span className={`ml-0.5 text-[9px] ${sort === col ? "text-zinc-900" : "text-slate-300"}`}>
// // // //       {sort === col ? (dir === "asc" ? "↑" : "↓") : "↕"}
// // // //     </span>
// // // //   );

// // // //   // Export menggunakan data yang sudah di-recompute dengan KKM terbaru
// // // //   function handleExport() {
// // // //     if (!data || !recomputedSummary) return;
// // // //     exportToExcel(
// // // //       { ...data, siswa: siswaWithKkm, summary: recomputedSummary },
// // // //       ujian.nama
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center">
// // // //       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
// // // //       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-4xl shadow-2xl z-10 max-h-[95vh] flex flex-col">
// // // //         {/* Header */}
// // // //         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
// // // //           <div>
// // // //             <h3 className="text-base font-bold text-zinc-900">Hasil Ujian</h3>
// // // //             <p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p>
// // // //           </div>
// // // //           <div className="flex items-center gap-2">
// // // //             {data && !selectedNisn && (
// // // //               <button
// // // //                 onClick={handleExport}
// // // //                 className="inline-flex items-center gap-1.5 h-8 px-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
// // // //                 title="Export ke Excel/CSV"
// // // //               >
// // // //                 <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// // // //                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// // // //                   <polyline points="7 10 12 15 17 10" />
// // // //                   <line x1="12" y1="15" x2="12" y2="3" />
// // // //                 </svg>
// // // //                 Export Excel
// // // //               </button>
// // // //             )}
// // // //             <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
// // // //               <X className="w-4 h-4" />
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         <div className="flex-1 overflow-y-auto">
// // // //           {/* Detail siswa panel */}
// // // //           {selectedNisn && (
// // // //             <div className="border-b border-slate-100 bg-slate-50">
// // // //               <div className="p-4 flex items-center justify-between">
// // // //                 <div className="flex items-center gap-2">
// // // //                   <button
// // // //                     onClick={() => { setSelectedNisn(null); setDetailData(null); }}
// // // //                     className="p-1.5 rounded-lg hover:bg-white border border-slate-200 text-slate-500"
// // // //                   >
// // // //                     <ArrowLeft className="w-3.5 h-3.5" />
// // // //                   </button>
// // // //                   <p className="text-[13px] font-bold text-zinc-900">Detail Jawaban Siswa</p>
// // // //                 </div>
// // // //               </div>
// // // //               {detailLoading ? (
// // // //                 <div className="flex items-center justify-center py-8">
// // // //                   <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
// // // //                 </div>
// // // //               ) : detailData ? (
// // // //                 <div className="px-4 pb-4 space-y-3">
// // // //                   <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap gap-4">
// // // //                     <div>
// // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Nama</p>
// // // //                       <p className="text-[13px] font-bold text-zinc-900">{detailData.siswa?.nama}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">NISN</p>
// // // //                       <p className="text-[13px] font-semibold text-zinc-700">{detailData.siswa?.nisn}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Kelas</p>
// // // //                       <p className="text-[13px] font-semibold text-zinc-700">{detailData.siswa?.kelas}</p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Nilai</p>
// // // //                       {/* Gunakan kkmModal untuk menentukan warna nilai di detail */}
// // // //                       <p className={`text-[18px] font-black ${(detailData.siswa?.nilai ?? 0) >= kkmModal ? "text-emerald-600" : "text-red-600"}`}>
// // // //                         {detailData.siswa?.nilai}
// // // //                       </p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Benar / Salah</p>
// // // //                       <p className="text-[13px] font-semibold">
// // // //                         <span className="text-emerald-600">{detailData.siswa?.benar}✓</span>
// // // //                         {" / "}
// // // //                         <span className="text-red-500">{detailData.siswa?.salah}✗</span>
// // // //                       </p>
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Status</p>
// // // //                       {/* Hitung ulang status berdasarkan kkmModal */}
// // // //                       {(detailData.siswa?.nilai ?? 0) >= kkmModal
// // // //                         ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
// // // //                         : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>
// // // //                       }
// // // //                     </div>
// // // //                     {detailData.siswa?.pelanggaran > 0 && (
// // // //                       <div>
// // // //                         <p className="text-[10px] text-slate-400 font-semibold uppercase">Pelanggaran</p>
// // // //                         <p className="text-[13px] font-bold text-red-600">{detailData.siswa?.pelanggaran}x</p>
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                   <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
// // // //                     <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
// // // //                       <p className="text-[12px] font-bold text-zinc-900">Rincian Jawaban</p>
// // // //                     </div>
// // // //                     <div className="divide-y divide-slate-50">
// // // //                       {(detailData.jawaban || []).map((j: any) => (
// // // //                         <div key={j.nomorSoal} className={`px-4 py-3 flex items-start gap-3 ${j.isBenar ? "bg-emerald-50/30" : "bg-red-50/30"}`}>
// // // //                           <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${j.isBenar ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
// // // //                             {j.nomorSoal}
// // // //                           </span>
// // // //                           <div className="flex-1 min-w-0">
// // // //                             <p className="text-[12px] text-zinc-800 mb-1">{j.pertanyaan}</p>
// // // //                             <div className="flex items-center gap-3 flex-wrap">
// // // //                               <span className="text-[11px] text-slate-500">
// // // //                                 Jawaban: <strong className={j.isBenar ? "text-emerald-600" : "text-red-500"}>{j.jawabanSiswa ?? "—"}</strong>
// // // //                               </span>
// // // //                               {!j.isBenar && (
// // // //                                 <span className="text-[11px] text-slate-500">
// // // //                                   Benar: <strong className="text-emerald-600">{j.jawabanBenar}</strong>
// // // //                                 </span>
// // // //                               )}
// // // //                               {j.isRagu && (
// // // //                                 <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">⚑ Ragu</span>
// // // //                               )}
// // // //                             </div>
// // // //                           </div>
// // // //                           <div className="flex-shrink-0">
// // // //                             {j.isBenar
// // // //                               ? <CheckCircle className="w-4 h-4 text-emerald-500" />
// // // //                               : <AlertCircle className="w-4 h-4 text-red-400" />
// // // //                             }
// // // //                           </div>
// // // //                         </div>
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               ) : (
// // // //                 <div className="px-4 pb-4 text-center py-6 text-[12px] text-slate-400">Gagal memuat detail</div>
// // // //               )}
// // // //             </div>
// // // //           )}

// // // //           {!selectedNisn && (
// // // //             <div className="p-5 space-y-4">
// // // //               {error && (
// // // //                 <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[12px] text-red-600 flex items-center gap-2">
// // // //                   <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
// // // //                 </div>
// // // //               )}

// // // //               {loading ? (
// // // //                 <div className="flex items-center justify-center py-16">
// // // //                   <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
// // // //                 </div>
// // // //               ) : data && recomputedSummary ? (
// // // //                 <>
// // // //                   {/* Summary cards — pakai recomputedSummary agar lulus/gagal ikut KKM */}
// // // //                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
// // // //                     {[
// // // //                       { label: "Total Peserta", val: recomputedSummary.totalSiswa,  color: "#18181b", icon: <Users className="w-3.5 h-3.5" /> },
// // // //                       { label: "Rata-rata Nilai", val: recomputedSummary.rataRata,  color: "#2563eb", icon: <BarChart2 className="w-3.5 h-3.5" /> },
// // // //                       { label: "Tertinggi",       val: recomputedSummary.tertinggi, color: "#059669", icon: <TrendingUp className="w-3.5 h-3.5" /> },
// // // //                       { label: "Terendah",        val: recomputedSummary.terendah,  color: "#dc2626", icon: <TrendingUp className="w-3.5 h-3.5 rotate-180" /> },
// // // //                       { label: "Lulus",           val: recomputedSummary.lulus,     color: "#059669", icon: <CheckCircle className="w-3.5 h-3.5" /> },
// // // //                       { label: "Tidak Lulus",     val: recomputedSummary.gagal,     color: "#dc2626", icon: <AlertCircle className="w-3.5 h-3.5" /> },
// // // //                     ].map(s => (
// // // //                       <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
// // // //                         <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>
// // // //                           {s.icon}
// // // //                         </div>
// // // //                         <div>
// // // //                           <p className="text-lg font-bold text-zinc-900">{s.val}</p>
// // // //                           <p className="text-[10px] text-slate-400">{s.label}</p>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>

// // // //                   {/* Filter */}
// // // //                   <div className="flex gap-2 flex-wrap items-center justify-between">
// // // //                     <div className="flex gap-2 flex-wrap">
// // // //                       {[
// // // //                         { val: "all",  label: "Semua" },
// // // //                         { val: "lulus", label: "Lulus" },
// // // //                         { val: "gagal", label: "Tidak Lulus" },
// // // //                         { val: "viol",  label: "Ada Pelanggaran" },
// // // //                       ].map(f => (
// // // //                         <button
// // // //                           key={f.val}
// // // //                           onClick={() => setFilter(f.val)}
// // // //                           className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${filter === f.val ? "bg-zinc-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
// // // //                         >
// // // //                           {f.label}
// // // //                           {f.val !== "all" && (
// // // //                             <span className="ml-1.5 opacity-60">
// // // //                               ({f.val === "lulus"  ? recomputedSummary.lulus
// // // //                               : f.val === "gagal" ? recomputedSummary.gagal
// // // //                               : siswaWithKkm.filter(s => s.pelanggaran > 0).length})
// // // //                             </span>
// // // //                           )}
// // // //                         </button>
// // // //                       ))}
// // // //                     </div>
// // // //                     <span className="text-[11px] text-slate-400">{filteredSiswa.length} ditampilkan</span>
// // // //                   </div>

// // // //                   {/* Tabel siswa */}
// // // //                   {filteredSiswa.length === 0 ? (
// // // //                     <div className="text-center py-12">
// // // //                       <Users className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// // // //                       <p className="text-[13px] text-slate-400">
// // // //                         {filter === "all"
// // // //                           ? "Belum ada peserta yang menyelesaikan ujian ini"
// // // //                           : "Tidak ada siswa yang sesuai filter ini"}
// // // //                       </p>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
// // // //                       <div className="overflow-x-auto">
// // // //                         <table className="w-full" style={{ minWidth: "600px" }}>
// // // //                           <thead className="border-b border-slate-100 bg-slate-50/50">
// // // //                             <tr>
// // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
// // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700" onClick={() => toggleSort("nama")}>
// // // //                                 Nama <SortIcon col="nama" />
// // // //                               </th>
// // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Kelas</th>
// // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700" onClick={() => toggleSort("nilai")}>
// // // //                                 Nilai <SortIcon col="nilai" />
// // // //                               </th>
// // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell" onClick={() => toggleSort("benar")}>
// // // //                                 Benar <SortIcon col="benar" />
// // // //                               </th>
// // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell" onClick={() => toggleSort("salah")}>
// // // //                                 Salah <SortIcon col="salah" />
// // // //                               </th>
// // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
// // // //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden sm:table-cell" onClick={() => toggleSort("pelanggaran")}>
// // // //                                 Pelang. <SortIcon col="pelanggaran" />
// // // //                               </th>
// // // //                               <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Detail</th>
// // // //                             </tr>
// // // //                           </thead>
// // // //                           <tbody className="divide-y divide-slate-50">
// // // //                             {filteredSiswa.map((s, i) => {
// // // //                               const nilaiColor = s.nilai >= 90 ? "#059669" : s.nilai >= 80 ? "#10b981" : s.nilai >= 70 ? "#2563eb" : "#dc2626";
// // // //                               return (
// // // //                                 <tr key={s.nisn} className="hover:bg-slate-50/50">
// // // //                                   <td className="px-4 py-3 text-[11px] text-slate-400 font-semibold">{i + 1}</td>
// // // //                                   <td className="px-4 py-3">
// // // //                                     <p className="font-semibold text-zinc-900 text-[12px]">{s.nama}</p>
// // // //                                     <p className="text-[10px] text-slate-400">{s.nisn}</p>
// // // //                                   </td>
// // // //                                   <td className="px-4 py-3 text-[12px] text-slate-500 hidden sm:table-cell">{s.kelas}</td>
// // // //                                   <td className="px-4 py-3">
// // // //                                     <span className="text-[15px] font-black" style={{ color: nilaiColor }}>{s.nilai}</span>
// // // //                                   </td>
// // // //                                   <td className="px-4 py-3 hidden md:table-cell">
// // // //                                     <span className="text-[12px] font-semibold text-emerald-600">{s.benar}</span>
// // // //                                   </td>
// // // //                                   <td className="px-4 py-3 hidden md:table-cell">
// // // //                                     <span className="text-[12px] font-semibold text-red-500">{s.salah}</span>
// // // //                                   </td>
// // // //                                   <td className="px-4 py-3">
// // // //                                     {/* s.lulus sudah dihitung ulang berdasarkan kkmModal */}
// // // //                                     {s.lulus
// // // //                                       ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
// // // //                                       : <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">GAGAL</span>
// // // //                                     }
// // // //                                   </td>
// // // //                                   <td className="px-4 py-3 hidden sm:table-cell">
// // // //                                     {s.pelanggaran > 0
// // // //                                       ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">{s.pelanggaran}x</span>
// // // //                                       : <span className="text-[11px] text-slate-300">—</span>
// // // //                                     }
// // // //                                   </td>
// // // //                                   <td className="px-4 py-3 text-right">
// // // //                                     <button
// // // //                                       onClick={() => fetchDetailSiswa(s.nisn)}
// // // //                                       className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors"
// // // //                                     >
// // // //                                       Lihat
// // // //                                     </button>
// // // //                                   </td>
// // // //                                 </tr>
// // // //                               );
// // // //                             })}
// // // //                           </tbody>
// // // //                         </table>
// // // //                       </div>
// // // //                       <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
// // // //                         <span className="text-[11px] text-slate-400">{filteredSiswa.length} peserta</span>
// // // //                         {/* KkmInline sekarang menerima props — tidak didefinisikan di dalam render */}
// // // //                         <KkmInline kkmModal={kkmModal} setKkmModal={setKkmModal} />
// // // //                       </div>
// // // //                     </div>
// // // //                   )}
// // // //                 </>
// // // //               ) : null}
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div className="p-5 border-t border-slate-100 shrink-0">
// // // //           <button onClick={onClose} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">
// // // //             Tutup
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── AddContentModal ──────────────────────────────────────────────────────────
// // // // function AddContentModal({
// // // //   activeTab,
// // // //   onClose,
// // // //   onSave,
// // // // }: {
// // // //   activeTab: string;
// // // //   onClose: () => void;
// // // //   onSave: (data: { nama: string; tanggal: string; durasi: string; soalAcak: boolean; soalList: SoalItem[] }) => void;
// // // // }) {
// // // //   const label = TAB_LABELS[activeTab] || "Konten";
// // // //   const draft = loadDraft(activeTab);

// // // //   const [step, setStep] = useState<1 | 2>(draft?.step ?? 1);
// // // //   const [nama, setNama] = useState(draft?.nama ?? "");
// // // //   const [tanggal, setTanggal] = useState(draft?.tanggal ?? "");
// // // //   const [durasi, setDurasi] = useState(draft?.durasi ?? "");
// // // //   const [soalAcak, setSoalAcak] = useState<boolean>(draft?.soalAcak ?? true);
// // // //   const [soalList, setSoalList] = useState<SoalItem[]>(draft?.soalList ?? []);

// // // //   const [soalPertanyaan, setSoalPertanyaan] = useState(draft?.soalPertanyaan ?? "");
// // // //   const [soalTipe, setSoalTipe] = useState<"pg" | "essay">(draft?.soalTipe ?? "pg");
// // // //   const [soalTopik, setSoalTopik] = useState(draft?.soalTopik ?? "");
// // // //   const [soalOpsi, setSoalOpsi] = useState<string[]>(draft?.soalOpsi ?? ["", "", "", ""]);
// // // //   const [soalJawaban, setSoalJawaban] = useState(draft?.soalJawaban ?? "");
// // // //   const [soalGambar, setSoalGambar] = useState<string | undefined>(draft?.soalGambar);
// // // //   const [editingId, setEditingId] = useState<string | null>(draft?.editingId ?? null);
// // // //   const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(draft ? new Date() : null);

// // // //   const liveIsValid = isSoalLiveValid(soalPertanyaan);
// // // //   const totalSoalPreview = soalList.length + (liveIsValid && !editingId ? 1 : 0);

// // // //   const persistDraft = useCallback(() => {
// // // //     saveDraft(activeTab, { step, nama, tanggal, durasi, soalAcak, soalList, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, soalGambar, editingId });
// // // //     setDraftSavedAt(new Date());
// // // //   }, [step, nama, tanggal, durasi, soalAcak, soalList, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, soalGambar, editingId, activeTab]);

// // // //   useEffect(() => {
// // // //     const timer = setTimeout(persistDraft, 400);
// // // //     return () => clearTimeout(timer);
// // // //   }, [persistDraft]);

// // // //   function resetSoalForm() {
// // // //     setSoalPertanyaan(""); setSoalTopik(""); setSoalOpsi(["", "", "", ""]); setSoalJawaban(""); setSoalTipe("pg"); setSoalGambar(undefined);
// // // //   }

// // // //   function commitLiveSoal(): SoalItem[] {
// // // //     if (!liveIsValid) return soalList;
// // // //     if (editingId) {
// // // //       return soalList.map(s =>
// // // //         s.id === editingId
// // // //           ? { id: editingId, pertanyaan: soalPertanyaan.trim(), tipe: soalTipe, opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [], jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar }
// // // //           : s
// // // //       );
// // // //     }
// // // //     const newSoal: SoalItem = {
// // // //       id: Date.now().toString(),
// // // //       pertanyaan: soalPertanyaan.trim(), tipe: soalTipe,
// // // //       opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [],
// // // //       jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar,
// // // //     };
// // // //     return [...soalList, newSoal];
// // // //   }

// // // //   function handleAddSoal() {
// // // //     if (!soalPertanyaan.trim()) return;
// // // //     const newSoal: SoalItem = {
// // // //       id: editingId || Date.now().toString(),
// // // //       pertanyaan: soalPertanyaan.trim(), tipe: soalTipe,
// // // //       opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [],
// // // //       jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar,
// // // //     };
// // // //     if (editingId) { setSoalList(prev => prev.map(s => s.id === editingId ? newSoal : s)); setEditingId(null); }
// // // //     else setSoalList(prev => [...prev, newSoal]);
// // // //     resetSoalForm();
// // // //   }

// // // //   function handleEditSoal(s: SoalItem) {
// // // //     if (liveIsValid && !editingId) { setSoalList(commitLiveSoal()); resetSoalForm(); }
// // // //     setEditingId(s.id); setSoalPertanyaan(s.pertanyaan); setSoalTipe(s.tipe); setSoalTopik(s.topik);
// // // //     setSoalOpsi(s.tipe === "pg" ? [...s.opsi, "", "", "", ""].slice(0, 4) : ["", "", "", ""]);
// // // //     setSoalJawaban(s.jawaban); setSoalGambar(s.gambar);
// // // //   }

// // // //   function handleSave() {
// // // //     const finalList = commitLiveSoal();
// // // //     clearDraft(activeTab);
// // // //     onSave({ nama, tanggal, durasi, soalAcak, soalList: finalList });
// // // //   }

// // // //   function handleClose() { onClose(); }
// // // //   function handleDiscardDraft() {
// // // //     clearDraft(activeTab); setStep(1); setNama(""); setTanggal(""); setDurasi("");
// // // //     setSoalAcak(true); setSoalList([]); resetSoalForm(); setEditingId(null); setDraftSavedAt(null);
// // // //   }

// // // //   const hasDraftData = nama.trim() !== "" || soalList.length > 0 || liveIsValid;

// // // //   return (
// // // //     <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
// // // //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
// // // //       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
// // // //         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
// // // //           <div className="flex items-center gap-3">
// // // //             {step === 2 && (
// // // //               <button onClick={() => setStep(1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
// // // //                 <ArrowLeft className="w-4 h-4" />
// // // //               </button>
// // // //             )}
// // // //             <div>
// // // //               <div className="flex items-center gap-2">
// // // //                 <h3 className="text-base font-bold text-zinc-900">Tambah {label}</h3>
// // // //                 {draftSavedAt && hasDraftData && (
// // // //                   <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
// // // //                     <Save className="w-2.5 h-2.5" /> Draft tersimpan
// // // //                   </span>
// // // //                 )}
// // // //               </div>
// // // //               <div className="flex items-center gap-1.5 mt-0.5">
// // // //                 <span className={`w-5 h-1.5 rounded-full transition-colors ${step === 1 ? "bg-zinc-900" : "bg-zinc-200"}`} />
// // // //                 <span className={`w-5 h-1.5 rounded-full transition-colors ${step === 2 ? "bg-zinc-900" : "bg-zinc-200"}`} />
// // // //                 <p className="text-[10px] text-slate-400 ml-1">Langkah {step} dari 2</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex items-center gap-2">
// // // //             {hasDraftData && (
// // // //               <button onClick={handleDiscardDraft} className="text-[10px] font-semibold text-red-400 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">
// // // //                 Hapus draft
// // // //               </button>
// // // //             )}
// // // //             <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // //           </div>
// // // //         </div>

// // // //         <div className="flex-1 overflow-y-auto">
// // // //           {step === 1 && (
// // // //             <div className="p-5 space-y-4">
// // // //               <div>
// // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">
// // // //                   Nama {label} <span className="text-red-500">*</span>
// // // //                 </label>
// // // //                 <input
// // // //                   type="text"
// // // //                   value={nama}
// // // //                   onChange={e => setNama(e.target.value)}
// // // //                   placeholder={`e.g. UAS ${label} Semester 2`}
// // // //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // //                 />
// // // //               </div>
// // // //               <div className="grid grid-cols-2 gap-3">
// // // //                 <div>
// // // //                   <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label>
// // // //                   <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label>
// // // //                   <input type="number" value={durasi} onChange={e => setDurasi(e.target.value)} placeholder="60" className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Urutan Soal untuk Siswa</label>
// // // //                 <div className="grid grid-cols-2 gap-2.5">
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={() => setSoalAcak(true)}
// // // //                     className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${soalAcak ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}
// // // //                   >
// // // //                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${soalAcak ? "bg-violet-100" : "bg-slate-100"}`}>
// // // //                       <Shuffle className={`w-4 h-4 ${soalAcak ? "text-violet-600" : "text-slate-400"}`} />
// // // //                     </div>
// // // //                     <div className="flex-1 min-w-0">
// // // //                       <p className={`text-[12px] font-bold ${soalAcak ? "text-violet-700" : "text-zinc-700"}`}>Soal Acak</p>
// // // //                       <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Urutan soal diacak berbeda tiap siswa</p>
// // // //                       {soalAcak && (
// // // //                         <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded-full">
// // // //                           <Check className="w-2.5 h-2.5" /> Aktif
// // // //                         </span>
// // // //                       )}
// // // //                     </div>
// // // //                   </button>
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={() => setSoalAcak(false)}
// // // //                     className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${!soalAcak ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}
// // // //                   >
// // // //                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${!soalAcak ? "bg-blue-100" : "bg-slate-100"}`}>
// // // //                       <ListOrdered className={`w-4 h-4 ${!soalAcak ? "text-blue-600" : "text-slate-400"}`} />
// // // //                     </div>
// // // //                     <div className="flex-1 min-w-0">
// // // //                       <p className={`text-[12px] font-bold ${!soalAcak ? "text-blue-700" : "text-zinc-700"}`}>Soal Berurutan</p>
// // // //                       <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Semua siswa mengerjakan soal dengan urutan yang sama</p>
// // // //                       {!soalAcak && (
// // // //                         <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">
// // // //                           <Check className="w-2.5 h-2.5" /> Aktif
// // // //                         </span>
// // // //                       )}
// // // //                     </div>
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
// // // //                 <FileText className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
// // // //                 <p className="text-[11px] text-blue-700">
// // // //                   Di langkah berikutnya, Anda bisa langsung menambahkan soal-soal untuk {label.toLowerCase()} ini.
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {step === 2 && (
// // // //             <div className="p-5 space-y-4">
// // // //               <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-[11px] font-semibold ${soalAcak ? "bg-violet-50 border-violet-200 text-violet-700" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
// // // //                 {soalAcak ? <Shuffle className="w-3.5 h-3.5 flex-shrink-0" /> : <ListOrdered className="w-3.5 h-3.5 flex-shrink-0" />}
// // // //                 <span>
// // // //                   Mode: <strong>{soalAcak ? "Soal Acak" : "Soal Berurutan"}</strong>
// // // //                   {" · "}
// // // //                   <button className="underline font-semibold opacity-70 hover:opacity-100" onClick={() => setStep(1)}>Ubah</button>
// // // //                 </span>
// // // //               </div>

// // // //               {soalList.length > 0 && (
// // // //                 <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
// // // //                   <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
// // // //                     <h4 className="font-semibold text-zinc-900 text-[13px]">Soal Ditambahkan</h4>
// // // //                     <span className="text-[11px] text-slate-400">{soalList.length} soal</span>
// // // //                   </div>
// // // //                   <div className="divide-y divide-slate-50">
// // // //                     {soalList.map((s, i) => (
// // // //                       <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId === s.id ? "bg-amber-50" : ""}`}>
// // // //                         <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
// // // //                         <div className="flex-1 min-w-0">
// // // //                           <p className="text-[12px] font-medium text-zinc-900 truncate">{s.pertanyaan}</p>
// // // //                           <div className="flex items-center gap-2 mt-0.5 flex-wrap">
// // // //                             <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "pg" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>
// // // //                               {s.tipe === "pg" ? "Pilihan Ganda" : "Essay"}
// // // //                             </span>
// // // //                             {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
// // // //                             {s.gambar && (
// // // //                               <span className="inline-flex items-center gap-0.5 text-[10px] text-violet-500 font-semibold">
// // // //                                 <ImageIcon className="w-3 h-3" /> Gambar
// // // //                               </span>
// // // //                             )}
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="flex items-center gap-1 flex-shrink-0">
// // // //                           <button onClick={() => handleEditSoal(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
// // // //                           <button onClick={() => setSoalList(prev => prev.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               <div className={`border rounded-[14px] p-4 space-y-3 ${editingId ? "border-amber-200 bg-amber-50/50" : liveIsValid ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 bg-slate-50/50"}`}>
// // // //                 <div className="flex items-center justify-between">
// // // //                   <div className="flex items-center gap-2">
// // // //                     <h4 className="font-semibold text-zinc-900 text-[13px]">
// // // //                       {editingId ? `✏️ Edit Soal #${soalList.findIndex(s => s.id === editingId) + 1}` : `Soal #${soalList.length + 1}`}
// // // //                     </h4>
// // // //                     {liveIsValid && !editingId && (
// // // //                       <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">
// // // //                         <Check className="w-2.5 h-2.5" /> Akan disimpan
// // // //                       </span>
// // // //                     )}
// // // //                   </div>
// // // //                   {editingId && (
// // // //                     <button onClick={() => { setEditingId(null); resetSoalForm(); }} className="text-[11px] text-slate-500 hover:text-zinc-900 underline">
// // // //                       Batal edit
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //                 <div>
// // // //                   <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Pertanyaan <span className="text-red-500">*</span></label>
// // // //                   <textarea
// // // //                     value={soalPertanyaan}
// // // //                     onChange={e => setSoalPertanyaan(e.target.value)}
// // // //                     rows={2}
// // // //                     placeholder="Tuliskan pertanyaan soal di sini..."
// // // //                     className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white"
// // // //                   />
// // // //                 </div>
// // // //                 <SoalImageUpload value={soalGambar} onChange={setSoalGambar} />
// // // //                 <div className="grid grid-cols-2 gap-3">
// // // //                   <div>
// // // //                     <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Tipe Soal</label>
// // // //                     <select value={soalTipe} onChange={e => setSoalTipe(e.target.value as "pg" | "essay")} className="w-full h-9 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-700 focus:outline-none bg-white">
// // // //                       <option value="pg">Pilihan Ganda</option>
// // // //                       <option value="essay">Essay</option>
// // // //                     </select>
// // // //                   </div>
// // // //                   <div>
// // // //                     <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Topik</label>
// // // //                     <input
// // // //                       type="text"
// // // //                       value={soalTopik}
// // // //                       onChange={e => setSoalTopik(e.target.value)}
// // // //                       placeholder="e.g. Limit Fungsi"
// // // //                       className="w-full h-9 px-3 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white"
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //                 {soalTipe === "pg" && (
// // // //                   <div className="space-y-2">
// // // //                     <label className="text-[11px] font-semibold text-slate-500 block">
// // // //                       Opsi Jawaban <span className="text-slate-400 font-normal">(radio = jawaban benar)</span>
// // // //                     </label>
// // // //                     {soalOpsi.map((opsi, i) => (
// // // //                       <div key={i} className="flex items-center gap-2">
// // // //                         <span className="w-6 h-6 rounded-full border-[1.5px] border-slate-200 bg-white text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
// // // //                           {String.fromCharCode(65 + i)}
// // // //                         </span>
// // // //                         <input
// // // //                           type="text"
// // // //                           value={opsi}
// // // //                           onChange={e => { const next = [...soalOpsi]; next[i] = e.target.value; setSoalOpsi(next); }}
// // // //                           placeholder={`Opsi ${String.fromCharCode(65 + i)}`}
// // // //                           className="flex-1 h-8 px-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white"
// // // //                         />
// // // //                         <input
// // // //                           type="radio"
// // // //                           name="jawaban-benar-add"
// // // //                           checked={soalJawaban === opsi && opsi !== ""}
// // // //                           onChange={() => setSoalJawaban(opsi)}
// // // //                           className="flex-shrink-0 accent-emerald-600"
// // // //                         />
// // // //                       </div>
// // // //                     ))}
// // // //                     {soalJawaban && <p className="text-[10px] text-emerald-600 font-medium">✓ Jawaban benar: {soalJawaban}</p>}
// // // //                   </div>
// // // //                 )}
// // // //                 {soalTipe === "essay" && (
// // // //                   <div>
// // // //                     <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Kunci Jawaban (Opsional)</label>
// // // //                     <textarea
// // // //                       value={soalJawaban}
// // // //                       onChange={e => setSoalJawaban(e.target.value)}
// // // //                       rows={2}
// // // //                       placeholder="Tuliskan kunci jawaban essay..."
// // // //                       className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white"
// // // //                     />
// // // //                   </div>
// // // //                 )}
// // // //                 <button
// // // //                   onClick={handleAddSoal}
// // // //                   disabled={!soalPertanyaan.trim()}
// // // //                   className="w-full h-9 bg-zinc-900 text-white rounded-lg text-[12px] font-semibold hover:bg-zinc-800 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// // // //                 >
// // // //                   <Plus className="w-3.5 h-3.5" /> {editingId ? "Simpan Perubahan & Lanjut Soal Baru" : "Tambah & Lanjut Soal Berikutnya"}
// // // //                 </button>
// // // //                 <p className="text-[10px] text-slate-400 text-center">
// // // //                   {liveIsValid && !editingId
// // // //                     ? "✅ Soal ini otomatis ikut tersimpan saat klik \"Simpan\" di bawah"
// // // //                     : "Isi pertanyaan untuk mulai membuat soal"}
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div className="p-5 pt-3 shrink-0 border-t border-slate-100">
// // // //           {step === 1 ? (
// // // //             <div className="flex gap-3">
// // // //               <button onClick={handleClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">
// // // //                 Tutup & Simpan Draft
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => { if (nama.trim()) setStep(2); }}
// // // //                 disabled={!nama.trim()}
// // // //                 className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
// // // //               >
// // // //                 Lanjut: Tambah Soal <ChevronRight className="w-4 h-4" />
// // // //               </button>
// // // //             </div>
// // // //           ) : (
// // // //             <div className="flex gap-3">
// // // //               <button onClick={handleClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">
// // // //                 Tutup & Simpan Draft
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleSave}
// // // //                 className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2"
// // // //               >
// // // //                 <Check className="w-4 h-4" /> Simpan {TAB_LABELS[activeTab]} ({totalSoalPreview} soal)
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //           {hasDraftData && (
// // // //             <p className="text-center text-[10px] text-slate-400 mt-2">
// // // //               💾 Data Anda tersimpan otomatis — aman jika modal ditutup
// // // //             </p>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── KelolaSoalModal ──────────────────────────────────────────────────────────
// // // // function KelolaSoalModal({ ujian, onClose, onUpdate }: {
// // // //   ujian: Ujian;
// // // //   onClose: () => void;
// // // //   onUpdate: (id: string, soalList: SoalItem[]) => void;
// // // // }) {
// // // //   const [soalList, setSoalList] = useState<SoalItem[]>(ujian.soalList || []);
// // // //   const [pertanyaan, setPertanyaan] = useState("");
// // // //   const [tipe, setTipe] = useState<"pg" | "essay">("pg");
// // // //   const [topik, setTopik] = useState("");
// // // //   const [opsi, setOpsi] = useState(["", "", "", ""]);
// // // //   const [jawaban, setJawaban] = useState("");
// // // //   const [gambar, setGambar] = useState<string | undefined>();
// // // //   const [editingId, setEditingId] = useState<string | null>(null);
// // // //   const [showForm, setShowForm] = useState(false);

// // // //   const liveIsValid = pertanyaan.trim().length > 0;
// // // //   const totalPreview = soalList.length + (liveIsValid && showForm && !editingId ? 1 : 0);

// // // //   function reset() {
// // // //     setPertanyaan(""); setTopik(""); setOpsi(["", "", "", ""]); setJawaban(""); setTipe("pg"); setGambar(undefined);
// // // //   }

// // // //   function commitLive(): SoalItem[] {
// // // //     if (!liveIsValid || !showForm) return soalList;
// // // //     if (editingId) {
// // // //       return soalList.map(s =>
// // // //         s.id === editingId
// // // //           ? { id: editingId, pertanyaan: pertanyaan.trim(), tipe, opsi: tipe === "pg" ? opsi.filter(Boolean) : [], jawaban, topik: topik.trim(), gambar }
// // // //           : s
// // // //       );
// // // //     }
// // // //     const newItem: SoalItem = {
// // // //       id: Date.now().toString(),
// // // //       pertanyaan: pertanyaan.trim(), tipe,
// // // //       opsi: tipe === "pg" ? opsi.filter(Boolean) : [],
// // // //       jawaban, topik: topik.trim(), gambar,
// // // //     };
// // // //     return [...soalList, newItem];
// // // //   }

// // // //   function handleAdd() {
// // // //     if (!pertanyaan.trim()) return;
// // // //     const item: SoalItem = {
// // // //       id: editingId || Date.now().toString(),
// // // //       pertanyaan: pertanyaan.trim(), tipe,
// // // //       opsi: tipe === "pg" ? opsi.filter(Boolean) : [],
// // // //       jawaban, topik: topik.trim(), gambar,
// // // //     };
// // // //     if (editingId) { setSoalList(p => p.map(s => s.id === editingId ? item : s)); setEditingId(null); }
// // // //     else setSoalList(p => [...p, item]);
// // // //     reset(); setShowForm(false);
// // // //   }

// // // //   function handleEdit(s: SoalItem) {
// // // //     if (liveIsValid && showForm && !editingId) { setSoalList(commitLive()); reset(); }
// // // //     setEditingId(s.id); setPertanyaan(s.pertanyaan); setTipe(s.tipe); setTopik(s.topik);
// // // //     setOpsi(s.tipe === "pg" ? [...s.opsi, "", "", "", ""].slice(0, 4) : ["", "", "", ""]);
// // // //     setJawaban(s.jawaban); setGambar(s.gambar); setShowForm(true);
// // // //   }

// // // //   function handleSaveAll() {
// // // //     const finalList = commitLive();
// // // //     onUpdate(ujian.id, finalList);
// // // //     onClose();
// // // //   }

// // // //   return (
// // // //     <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
// // // //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// // // //       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
// // // //         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 sticky top-0 bg-white z-10 rounded-t-2xl">
// // // //           <div>
// // // //             <h3 className="text-base font-bold text-zinc-900">Kelola Soal</h3>
// // // //             <p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p>
// // // //           </div>
// // // //           <div className="flex items-center gap-2">
// // // //             <span className="text-[11px] text-slate-500 font-medium">{totalPreview} soal</span>
// // // //             <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // //           </div>
// // // //         </div>
// // // //         <div className="flex-1 overflow-y-auto p-5 space-y-4">
// // // //           {soalList.length === 0 && !showForm && (
// // // //             <div className="text-center py-8">
// // // //               <FileText className="w-10 h-10 text-slate-200 mx-auto mb-2" />
// // // //               <p className="text-[13px] font-semibold text-zinc-500">Belum ada soal</p>
// // // //               <p className="text-[11px] text-slate-400 mt-0.5">Klik tombol "Tambah Soal" untuk mulai</p>
// // // //             </div>
// // // //           )}
// // // //           {soalList.length > 0 && (
// // // //             <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
// // // //               <div className="divide-y divide-slate-50">
// // // //                 {soalList.map((s, i) => (
// // // //                   <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId === s.id ? "bg-amber-50" : "hover:bg-slate-50/50"}`}>
// // // //                     <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
// // // //                     <div className="flex-1 min-w-0">
// // // //                       <p className="text-[12px] font-medium text-zinc-900">{s.pertanyaan}</p>
// // // //                       {s.gambar && <img src={s.gambar} alt="" className="mt-1.5 h-12 rounded-lg object-cover border border-slate-200" />}
// // // //                       <div className="flex items-center gap-2 mt-1 flex-wrap">
// // // //                         <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "pg" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>
// // // //                           {s.tipe === "pg" ? "PG" : "Essay"}
// // // //                         </span>
// // // //                         {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
// // // //                         {s.gambar && (
// // // //                           <span className="inline-flex items-center gap-0.5 text-[10px] text-violet-500 font-semibold">
// // // //                             <ImageIcon className="w-3 h-3" /> Ada gambar
// // // //                           </span>
// // // //                         )}
// // // //                         {s.tipe === "pg" && s.opsi.length > 0 && (
// // // //                           <span className="text-[10px] text-slate-400">
// // // //                             {s.opsi.length} opsi · Jwb: <strong className="text-emerald-600">{s.jawaban}</strong>
// // // //                           </span>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="flex items-center gap-1 flex-shrink-0">
// // // //                       <button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
// // // //                       <button onClick={() => setSoalList(p => p.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //           {!showForm && (
// // // //             <button
// // // //               onClick={() => { setShowForm(true); setEditingId(null); reset(); }}
// // // //               className="w-full h-10 border-2 border-dashed border-slate-200 rounded-xl text-[12px] font-semibold text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2"
// // // //             >
// // // //               <Plus className="w-4 h-4" /> Tambah Soal Baru
// // // //             </button>
// // // //           )}
// // // //           {showForm && (
// // // //             <div className={`border rounded-[14px] p-4 space-y-3 ${editingId ? "border-amber-200 bg-amber-50/30" : liveIsValid ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 bg-slate-50/30"}`}>
// // // //               <div className="flex items-center justify-between">
// // // //                 <div className="flex items-center gap-2">
// // // //                   <h4 className="font-semibold text-zinc-900 text-[13px]">
// // // //                     {editingId ? `✏️ Edit Soal #${soalList.findIndex(s => s.id === editingId) + 1}` : `Soal #${soalList.length + 1}`}
// // // //                   </h4>
// // // //                   {liveIsValid && !editingId && (
// // // //                     <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">
// // // //                       <Check className="w-2.5 h-2.5" /> Akan disimpan
// // // //                     </span>
// // // //                   )}
// // // //                 </div>
// // // //                 <button onClick={() => { setShowForm(false); setEditingId(null); reset(); }} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
// // // //                   <X className="w-3.5 h-3.5" />
// // // //                 </button>
// // // //               </div>
// // // //               <div>
// // // //                 <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Pertanyaan *</label>
// // // //                 <textarea
// // // //                   value={pertanyaan}
// // // //                   onChange={e => setPertanyaan(e.target.value)}
// // // //                   rows={2}
// // // //                   placeholder="Tuliskan pertanyaan soal..."
// // // //                   className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white"
// // // //                 />
// // // //               </div>
// // // //               <SoalImageUpload value={gambar} onChange={setGambar} />
// // // //               <div className="grid grid-cols-2 gap-3">
// // // //                 <div>
// // // //                   <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Tipe Soal</label>
// // // //                   <select value={tipe} onChange={e => setTipe(e.target.value as "pg" | "essay")} className="w-full h-9 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-700 focus:outline-none bg-white">
// // // //                     <option value="pg">Pilihan Ganda</option>
// // // //                     <option value="essay">Essay</option>
// // // //                   </select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Topik</label>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={topik}
// // // //                     onChange={e => setTopik(e.target.value)}
// // // //                     placeholder="e.g. Limit Fungsi"
// // // //                     className="w-full h-9 px-3 border border-slate-200 rounded-lg text-[12px] bg-white focus:outline-none"
// // // //                   />
// // // //                 </div>
// // // //               </div>
// // // //               {tipe === "pg" && (
// // // //                 <div className="space-y-2">
// // // //                   <label className="text-[11px] font-semibold text-slate-500 block">
// // // //                     Opsi Jawaban <span className="text-slate-400 font-normal">(klik radio = jawaban benar)</span>
// // // //                   </label>
// // // //                   {opsi.map((o, i) => (
// // // //                     <div key={i} className="flex items-center gap-2">
// // // //                       <span className="w-6 h-6 rounded-full border-[1.5px] border-slate-200 bg-white text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
// // // //                         {String.fromCharCode(65 + i)}
// // // //                       </span>
// // // //                       <input
// // // //                         type="text"
// // // //                         value={o}
// // // //                         onChange={e => { const n = [...opsi]; n[i] = e.target.value; setOpsi(n); }}
// // // //                         placeholder={`Opsi ${String.fromCharCode(65 + i)}`}
// // // //                         className="flex-1 h-8 px-2 border border-slate-200 rounded-lg text-[12px] bg-white focus:outline-none"
// // // //                       />
// // // //                       <input
// // // //                         type="radio"
// // // //                         name="jawaban-kelola"
// // // //                         checked={jawaban === o && o !== ""}
// // // //                         onChange={() => setJawaban(o)}
// // // //                         className="accent-emerald-600"
// // // //                       />
// // // //                     </div>
// // // //                   ))}
// // // //                   {jawaban && <p className="text-[10px] text-emerald-600 font-medium">✓ Jawaban benar: {jawaban}</p>}
// // // //                 </div>
// // // //               )}
// // // //               {tipe === "essay" && (
// // // //                 <div>
// // // //                   <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Kunci Jawaban (Opsional)</label>
// // // //                   <textarea
// // // //                     value={jawaban}
// // // //                     onChange={e => setJawaban(e.target.value)}
// // // //                     rows={2}
// // // //                     className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none resize-none bg-white"
// // // //                   />
// // // //                 </div>
// // // //               )}
// // // //               <button
// // // //                 onClick={handleAdd}
// // // //                 disabled={!pertanyaan.trim()}
// // // //                 className="w-full h-9 bg-zinc-900 text-white rounded-lg text-[12px] font-semibold hover:bg-zinc-800 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
// // // //               >
// // // //                 <Plus className="w-3.5 h-3.5" /> {editingId ? "Simpan Perubahan & Lanjut Soal Baru" : "Tambah & Lanjut Soal Berikutnya"}
// // // //               </button>
// // // //               <p className="text-[10px] text-slate-400 text-center">
// // // //                 {liveIsValid && !editingId
// // // //                   ? "✅ Soal ini otomatis ikut tersimpan saat klik \"Simpan\" di bawah"
// // // //                   : "Isi pertanyaan untuk mulai membuat soal"}
// // // //               </p>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //         <div className="p-5 border-t border-slate-100 shrink-0 flex gap-3">
// // // //           <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Batal</button>
// // // //           <button
// // // //             onClick={handleSaveAll}
// // // //             className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2"
// // // //           >
// // // //             <Check className="w-4 h-4" /> Simpan ({totalPreview} soal)
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── EditUjianModal ───────────────────────────────────────────────────────────
// // // // function EditUjianModal({
// // // //   ujian,
// // // //   onClose,
// // // //   onSave,
// // // //   onKelolaSoal,
// // // // }: {
// // // //   ujian: Ujian;
// // // //   onClose: () => void;
// // // //   onSave: (id: string, data: { nama: string; durasi: number; tanggalMulai?: string }) => void;
// // // //   onKelolaSoal?: () => void;
// // // // }) {
// // // //   const [nama, setNama] = useState(ujian.nama);
// // // //   const [durasi, setDurasi] = useState(String(ujian.durasi));
// // // //   const [tanggal, setTanggal] = useState(
// // // //     ujian.tanggalMulai ? new Date(ujian.tanggalMulai).toISOString().split("T")[0] : ""
// // // //   );

// // // //   return (
// // // //     <div className="fixed inset-0 z-[300] flex items-center justify-center">
// // // //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// // // //       <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl z-10 p-6">
// // // //         <div className="flex items-center justify-between mb-5">
// // // //           <h3 className="text-base font-bold text-zinc-900">Edit {TAB_LABELS[ujian.tipe?.toLowerCase()] || "Ujian"}</h3>
// // // //           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // //         </div>
// // // //         <div className="space-y-4">
// // // //           <div>
// // // //             <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label>
// // // //             <input
// // // //               type="text"
// // // //               value={nama}
// // // //               onChange={e => setNama(e.target.value)}
// // // //               className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // //             />
// // // //           </div>
// // // //           <div className="grid grid-cols-2 gap-3">
// // // //             <div>
// // // //               <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label>
// // // //               <input
// // // //                 type="date"
// // // //                 value={tanggal}
// // // //                 onChange={e => setTanggal(e.target.value)}
// // // //                 className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // //               />
// // // //             </div>
// // // //             <div>
// // // //               <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label>
// // // //               <input
// // // //                 type="number"
// // // //                 value={durasi}
// // // //                 onChange={e => setDurasi(e.target.value)}
// // // //                 className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //         <div className="flex gap-3 mt-4">
// // // //           <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// // // //           <button
// // // //             onClick={() => onSave(ujian.id, { nama, durasi: parseInt(durasi) || 60, tanggalMulai: tanggal || undefined })}
// // // //             disabled={!nama.trim()}
// // // //             className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40"
// // // //           >
// // // //             Simpan
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── DeleteUjianModal ─────────────────────────────────────────────────────────
// // // // function DeleteUjianModal({
// // // //   ujian,
// // // //   onClose,
// // // //   onDelete,
// // // // }: {
// // // //   ujian: Ujian;
// // // //   onClose: () => void;
// // // //   onDelete: (id: string) => void;
// // // // }) {
// // // //   const tipeLabel = TAB_LABELS[ujian.tipe?.toLowerCase()] || "Ujian";
// // // //   return (
// // // //     <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
// // // //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// // // //       <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
// // // //         <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
// // // //           <Trash2 className="w-5 h-5 text-red-600" />
// // // //         </div>
// // // //         <h3 className="text-base font-bold text-zinc-900 mb-2 text-center">Hapus {tipeLabel}</h3>
// // // //         <p className="text-[13px] text-slate-500 mb-6 text-center">
// // // //           Yakin ingin menghapus <span className="font-semibold text-zinc-900">"{ujian.nama}"</span>? Semua soal dan data peserta akan ikut terhapus.
// // // //         </p>
// // // //         <div className="flex gap-3">
// // // //           <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// // // //           <button onClick={() => onDelete(ujian.id)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700">Hapus</button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Main Page ────────────────────────────────────────────────────────────────
// // // // export default function AdminMataPelajaranPage() {
// // // //   const router = useRouter();
// // // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");
// // // //   const [subjects, setSubjects] = useState<MataPelajaran[]>([]);
// // // //   const [stats, setStats] = useState({ totalSoal: 0, totalUjian: 0 });
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [kelasFilter, setKelasFilter] = useState("all");

// // // //   const [selectedSubject, setSelectedSubject] = useState<MataPelajaran | null>(null);
// // // //   const [activeTab, setActiveTab] = useState("ujian");

// // // //   const [ujianList, setUjianList] = useState<Ujian[]>([]);
// // // //   const [ujianLoading, setUjianLoading] = useState(false);

// // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // //   const [showEditModal, setShowEditModal] = useState(false);
// // // //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// // // //   const [showDetailModal, setShowDetailModal] = useState(false);
// // // //   const [showKelolaSoal, setShowKelolaSoal] = useState(false);
// // // //   const [showContentModal, setShowContentModal] = useState(false);
// // // //   const [selectedUjian, setSelectedUjian] = useState<Ujian | null>(null);
// // // //   const [targetMapel, setTargetMapel] = useState<MataPelajaran | null>(null);

// // // //   const [deleteMapelDetail, setDeleteMapelDetail] = useState<DeleteMapelDetail | null>(null);
// // // //   const [deleteMapelLoading, setDeleteMapelLoading] = useState(false);

// // // //   const [showEditUjianModal, setShowEditUjianModal] = useState(false);
// // // //   const [showDeleteUjianModal, setShowDeleteUjianModal] = useState(false);
// // // //   const [targetUjian, setTargetUjian] = useState<Ujian | null>(null);

// // // //   const [showHasilModal, setShowHasilModal] = useState(false);
// // // //   const [hasilUjianTarget, setHasilUjianTarget] = useState<Ujian | null>(null);
// // // //   const [soalBankList, setSoalBankList] = useState<any[]>([]);
// // // //   const [soalBankLoading, setSoalBankLoading] = useState(false);
// // // //   const [soalBankSearch, setSoalBankSearch] = useState("");
// // // //   const [soalBankTipe, setSoalBankTipe] = useState("");

// // // //   const [addForm, setAddForm] = useState({ nama: "", kelas: "", deskripsi: "", warna: "zinc" });
// // // //   const [editForm, setEditForm] = useState<MataPelajaran | null>(null);
// // // //   const [copiedLink, setCopiedLink] = useState(false);
// // // //   const [copiedToken, setCopiedToken] = useState(false);
// // // //   const [showToken, setShowToken] = useState(false);

// // // //   const [bobotUjian, setBobotUjian] = useState(40);
// // // //   const [bobotUlangan, setBobotUlangan] = useState(25);
// // // //   const [bobotLatihan, setBobotLatihan] = useState(20);
// // // //   const [bobotKuis, setBobotKuis] = useState(15);
// // // //   const [kkm, setKkm] = useState(70);
// // // //   const [showNilaiHasil, setShowNilaiHasil] = useState(false);
// // // //   const [nilaiData, setNilaiData] = useState<any[]>([]);
// // // //   const [nilaiFilter, setNilaiFilter] = useState("all");
// // // //   const [nilaiSortKey, setNilaiSortKey] = useState("akhir");
// // // //   const [nilaiSortAsc, setNilaiSortAsc] = useState(false);

// // // //   const fetchSubjects = useCallback(async () => {
// // // //     const token = getToken();
// // // //     if (!token) { router.push("/auth/login"); return; }
// // // //     try {
// // // //       const res = await api.get<{ data: MataPelajaran[]; stats: any }>(`/mata-pelajaran?kelas=${kelasFilter !== "all" ? kelasFilter : ""}`);
// // // //       setSubjects(res.data || []);
// // // //       if (res.stats) setStats(res.stats);
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "Gagal memuat data");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [kelasFilter, router]);

// // // //   useEffect(() => { fetchSubjects(); }, [fetchSubjects]);

// // // //   const fetchUjianByTipe = useCallback(async (mapelId: number, tipe: string) => {
// // // //     setUjianLoading(true);
// // // //     try {
// // // //       const tipeMap: Record<string, string> = { ujian: "UJIAN", ulangan: "ULANGAN", latihan: "LATIHAN", kuis: "KUIS" };
// // // //       const tipeParam = tipeMap[tipe];
// // // //       const url = tipeParam ? `/mata-pelajaran/${mapelId}/ujian?tipe=${tipeParam}` : `/mata-pelajaran/${mapelId}/ujian`;
// // // //       const res = await api.get<{ data: Ujian[] }>(url);
// // // //       setUjianList(res.data || []);
// // // //     } catch {
// // // //       setError("Gagal memuat data ujian");
// // // //     } finally {
// // // //       setUjianLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (selectedSubject && ["ujian", "ulangan", "latihan", "kuis"].includes(activeTab)) {
// // // //       fetchUjianByTipe(selectedSubject.id, activeTab);
// // // //     }
// // // //   }, [selectedSubject, activeTab, fetchUjianByTipe]);

// // // //   const fetchSoalBank = useCallback(async (mapelId: number, search = "", tipe = "") => {
// // // //     setSoalBankLoading(true);
// // // //     try {
// // // //       const params = new URLSearchParams();
// // // //       if (search) params.set("search", search);
// // // //       if (tipe) params.set("tipe", tipe);
// // // //       const res = await api.get<{ data: any[]; total: number }>(`/mata-pelajaran/${mapelId}/soal?${params.toString()}`);
// // // //       setSoalBankList(res.data || []);
// // // //     } catch {
// // // //       setSoalBankList([]);
// // // //     } finally {
// // // //       setSoalBankLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (selectedSubject && activeTab === "soal") {
// // // //       fetchSoalBank(selectedSubject.id, soalBankSearch, soalBankTipe);
// // // //     }
// // // //   }, [selectedSubject, activeTab, soalBankSearch, soalBankTipe, fetchSoalBank]);

// // // //   const filtered = subjects.filter(s => !searchQuery || s.nama.toLowerCase().includes(searchQuery.toLowerCase()));

// // // //   async function handleAdd() {
// // // //     try {
// // // //       await api.post("/mata-pelajaran", addForm);
// // // //       setShowAddModal(false);
// // // //       setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" });
// // // //       fetchSubjects();
// // // //     } catch (err) { setError(err instanceof Error ? err.message : "Gagal menambah"); }
// // // //   }

// // // //   async function handleEdit() {
// // // //     if (!editForm || !targetMapel) return;
// // // //     try {
// // // //       await api.put(`/mata-pelajaran/${targetMapel.id}`, editForm);
// // // //       setShowEditModal(false); setTargetMapel(null); setEditForm(null);
// // // //       fetchSubjects();
// // // //     } catch (err) { setError(err instanceof Error ? err.message : "Gagal mengubah"); }
// // // //   }

// // // //   async function openDeleteMapelModal(subject: MataPelajaran) {
// // // //     setTargetMapel(subject);
// // // //     setDeleteMapelDetail(null);
// // // //     setDeleteMapelLoading(true);
// // // //     setShowDeleteModal(true);
// // // //     try {
// // // //       const [ujianRes, ulanganRes, latihanRes, kuisRes, soalRes] = await Promise.all([
// // // //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=UJIAN`),
// // // //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=ULANGAN`),
// // // //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=LATIHAN`),
// // // //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=KUIS`),
// // // //         api.get<{ total: number }>(`/mata-pelajaran/${subject.id}/soal`),
// // // //       ]);
// // // //       setDeleteMapelDetail({
// // // //         totalUjian: ujianRes.data?.length || 0,
// // // //         totalUlangan: ulanganRes.data?.length || 0,
// // // //         totalLatihan: latihanRes.data?.length || 0,
// // // //         totalKuis: kuisRes.data?.length || 0,
// // // //         totalSoal: soalRes.total || subject.totalSoal,
// // // //       });
// // // //     } catch {
// // // //       setDeleteMapelDetail({
// // // //         totalUjian: subject.totalUjian, totalUlangan: 0, totalLatihan: 0, totalKuis: 0, totalSoal: subject.totalSoal,
// // // //       });
// // // //     } finally {
// // // //       setDeleteMapelLoading(false);
// // // //     }
// // // //   }

// // // //   async function handleDelete() {
// // // //     if (!targetMapel) return;
// // // //     try {
// // // //       await api.delete(`/mata-pelajaran/${targetMapel.id}`);
// // // //       setShowDeleteModal(false);
// // // //       setDeleteMapelDetail(null);
// // // //       if (selectedSubject?.id === targetMapel.id) setSelectedSubject(null);
// // // //       setTargetMapel(null);
// // // //       fetchSubjects();
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "Gagal menghapus mata pelajaran");
// // // //       setShowDeleteModal(false);
// // // //     }
// // // //   }

// // // //   async function handleEditUjian(ujianId: string, data: { nama: string; durasi: number; tanggalMulai?: string }) {
// // // //     try {
// // // //       await api.put(`/ujian/${ujianId}`, {
// // // //         nama: data.nama,
// // // //         durasi: data.durasi,
// // // //         tanggalMulai: data.tanggalMulai ? new Date(data.tanggalMulai).toISOString() : null,
// // // //       });
// // // //       setShowEditUjianModal(false);
// // // //       setTargetUjian(null);
// // // //       if (selectedSubject) fetchUjianByTipe(selectedSubject.id, activeTab);
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "Gagal mengubah ujian");
// // // //     }
// // // //   }

// // // //   async function handleDeleteUjian(ujianId: string) {
// // // //     try {
// // // //       await api.delete(`/ujian/${ujianId}`);
// // // //       setShowDeleteUjianModal(false);
// // // //       setTargetUjian(null);
// // // //       if (selectedSubject) { fetchUjianByTipe(selectedSubject.id, activeTab); fetchSubjects(); }
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "Gagal menghapus ujian");
// // // //     }
// // // //   }

// // // //   async function handleSaveContent(data: { nama: string; tanggal: string; durasi: string; soalAcak: boolean; soalList: SoalItem[] }) {
// // // //     if (!selectedSubject) return;
// // // //     const tipeMap: Record<string, string> = { ujian: "UJIAN", ulangan: "ULANGAN", latihan: "LATIHAN", kuis: "KUIS" };
// // // //     try {
// // // //       const ujianRes = await api.post<{ id: string; token: string }>(
// // // //         `/mata-pelajaran/${selectedSubject.id}/ujian`,
// // // //         {
// // // //           nama: data.nama, tipe: tipeMap[activeTab] || "UJIAN",
// // // //           durasi: parseInt(data.durasi) || 60, kelas: selectedSubject.kelas,
// // // //           tanggalMulai: data.tanggal || null, acakSoal: data.soalAcak, acakOpsi: false, soalIds: [],
// // // //         }
// // // //       );
// // // //       const ujianId = ujianRes.id;
// // // //       if (ujianId && data.soalList.length > 0) {
// // // //         const soalIds: string[] = [];
// // // //         for (const s of data.soalList) {
// // // //           const soalRes = await api.post<{ id: string }>(
// // // //             `/mata-pelajaran/${selectedSubject.id}/soal`,
// // // //             {
// // // //               pertanyaan: s.pertanyaan, tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
// // // //               topik: s.topik || null, gambarUrl: s.gambar || null,
// // // //               opsiA: s.opsi[0] || null, opsiB: s.opsi[1] || null,
// // // //               opsiC: s.opsi[2] || null, opsiD: s.opsi[3] || null,
// // // //               jawabanBenar: s.jawaban || null,
// // // //             }
// // // //           );
// // // //           soalIds.push(soalRes.id);
// // // //         }
// // // //         await api.put(`/ujian/${ujianId}`, { soalIds });
// // // //       }
// // // //       setShowContentModal(false);
// // // //       fetchUjianByTipe(selectedSubject.id, activeTab);
// // // //       fetchSubjects();
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "Gagal menyimpan");
// // // //     }
// // // //   }

// // // //   async function handleUpdateSoal(ujianId: string, soalList: SoalItem[]) {
// // // //     if (!selectedSubject) return;
// // // //     try {
// // // //       const soalIds: string[] = [];
// // // //       for (const s of soalList) {
// // // //         if (/^\d+$/.test(s.id)) {
// // // //           const soalRes = await api.post<{ id: string }>(
// // // //             `/mata-pelajaran/${selectedSubject.id}/soal`,
// // // //             {
// // // //               pertanyaan: s.pertanyaan, tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
// // // //               topik: s.topik || null,
// // // //               opsiA: s.opsi[0] || null, opsiB: s.opsi[1] || null,
// // // //               opsiC: s.opsi[2] || null, opsiD: s.opsi[3] || null,
// // // //               jawabanBenar: s.jawaban || null,
// // // //             }
// // // //           );
// // // //           soalIds.push(soalRes.id);
// // // //         } else {
// // // //           soalIds.push(s.id);
// // // //         }
// // // //       }
// // // //       await api.put(`/ujian/${ujianId}`, { soalIds });
// // // //       setUjianList(prev => prev.map(u => u.id === ujianId ? { ...u, soalList, totalSoal: soalList.length } : u));
// // // //       fetchSubjects();
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "Gagal menyimpan soal");
// // // //     }
// // // //   }

// // // //   function copyToClipboard(text: string, type: "link" | "token") {
// // // //     navigator.clipboard.writeText(text).then(() => {
// // // //       if (type === "link") { setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); }
// // // //       else { setCopiedToken(true); setTimeout(() => setCopiedToken(false), 2000); }
// // // //     });
// // // //   }

// // // //   function hitungNilaiAkhir() {
// // // //     const namaList = [
// // // //       "Adi Nugroho", "Bella Rahmawati", "Candra Wijaya", "Dewi Anggraeni", "Eko Prasetyo",
// // // //       // "Fitri Handayani", "Gilang Ramadhan", "Hana Safitri", "Ivan Santoso", "Julia Maharani",
// // // //       // "Kevin Pratama", "Laila Nurfadillah", "Mario Situmorang", "Nadia Kusuma", "Oka Widyatma",
// // // //       // "Putri Wulandari", "Rizki Maulana", "Sari Dewi", "Taufik Hidayat", "Ulfa Ramadhani",
// // // //       // "Vino Adiputra", "Winda Lestari", "Xena Anggraita", "Yoga Permana", "Zahra Meilinda",
// // // //       // "Ahmad Fauzi", "Bagas Saputra", "Clara Oktaviani", "Dino Setiawan", "Elsa Nurhayati",
// // // //       // "Fajar Kurniawan", "Gita Puspita",
// // // //     ];
// // // //     let seed = 12345;
// // // //     function rand(min: number, max: number) {
// // // //       seed = (seed * 9301 + 49297) % 233280;
// // // //       return min + Math.floor((seed / 233280) * (max - min + 1));
// // // //     }
// // // //     const bU = bobotUjian / 100, bUl = bobotUlangan / 100, bL = bobotLatihan / 100, bK = bobotKuis / 100;
// // // //     const data = namaList.map((nama, i) => {
// // // //       const ujian = rand(55, 100), ulangan = rand(55, 100), latihan = rand(60, 100), kuis = rand(60, 100);
// // // //       const akhir = Math.round(ujian * bU + ulangan * bUl + latihan * bL + kuis * bK);
// // // //       return {
// // // //         nisn: `005${String(i + 1).padStart(5, "0")}`, nama, ujian, ulangan, latihan, kuis, akhir,
// // // //         lulus: akhir >= kkm,
// // // //         grade: akhir >= 90 ? "A" : akhir >= 80 ? "B" : akhir >= 70 ? "C" : "D",
// // // //       };
// // // //     });
// // // //     setNilaiData(data); setShowNilaiHasil(true);
// // // //     setTimeout(() => document.getElementById("nilai-hasil-section")?.scrollIntoView({ behavior: "smooth" }), 100);
// // // //   }

// // // //   function getSortedNilaiData() {
// // // //     return [...nilaiData]
// // // //       .filter(s => {
// // // //         if (nilaiFilter === "lulus" && !s.lulus) return false;
// // // //         if (nilaiFilter === "tidak" && s.lulus) return false;
// // // //         return true;
// // // //       })
// // // //       .sort((a, b) => {
// // // //         const va = a[nilaiSortKey]; const vb = b[nilaiSortKey];
// // // //         return nilaiSortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
// // // //       });
// // // //   }

// // // //   const bobotTotal = bobotUjian + bobotUlangan + bobotLatihan + bobotKuis;
// // // //   const isBobotValid = bobotTotal === 100;

// // // //   const renderContentTable = () => {
// // // //     if (ujianLoading) return (
// // // //       <div className="flex items-center justify-center py-16">
// // // //         <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
// // // //       </div>
// // // //     );
// // // //     const tabLabel = TAB_LABELS[activeTab] || activeTab;
// // // //     return (
// // // //       <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // //         <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
// // // //           <h3 className="font-semibold text-zinc-900 text-[13px]">Daftar {tabLabel}</h3>
// // // //           <span className="text-[11px] text-slate-400 font-medium">{ujianList.length} {tabLabel.toLowerCase()}</span>
// // // //         </div>
// // // //         {ujianList.length === 0 ? (
// // // //           <div className="py-12 text-center">
// // // //             <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// // // //             <p className="text-[13px] text-slate-400">Belum ada {tabLabel.toLowerCase()}</p>
// // // //             <button onClick={() => setShowContentModal(true)} className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-zinc-700 underline">
// // // //               <Plus className="w-3.5 h-3.5" /> Tambah {tabLabel}
// // // //             </button>
// // // //           </div>
// // // //         ) : (
// // // //           <div className="overflow-x-auto">
// // // //             <table className="w-full text-sm" style={{ minWidth: "680px" }}>
// // // //               <thead className="border-b border-slate-100 bg-slate-50/50">
// // // //                 <tr>
// // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama {tabLabel}</th>
// // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Tanggal</th>
// // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Soal</th>
// // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Urutan</th>
// // // //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
// // // //                   <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Aksi</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="divide-y divide-slate-50">
// // // //                 {ujianList.map(item => {
// // // //                   const soalCount = item.soalList?.length ?? item.totalSoal;
// // // //                   return (
// // // //                     <tr key={item.id} className="hover:bg-slate-50/50">
// // // //                       <td className="px-4 py-3">
// // // //                         <p className="font-medium text-zinc-900 text-[13px]">{item.nama}</p>
// // // //                         <p className="text-[10px] text-slate-400 mt-0.5">{item.kelas}</p>
// // // //                       </td>
// // // //                       <td className="px-4 py-3 text-slate-500 text-[12px] hidden sm:table-cell">
// // // //                         {item.tanggalMulai
// // // //                           ? new Date(item.tanggalMulai).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
// // // //                           : "—"}
// // // //                       </td>
// // // //                       <td className="px-4 py-3">
// // // //                         <div className="flex items-center gap-1.5">
// // // //                           <span className="font-semibold text-zinc-900 text-[12px]">{soalCount}</span>
// // // //                           <button
// // // //                             onClick={() => { setSelectedUjian(item); setShowKelolaSoal(true); }}
// // // //                             className="inline-flex items-center gap-1 h-5 px-1.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-500 hover:bg-zinc-900 hover:text-white transition-colors"
// // // //                           >
// // // //                             <Edit3 className="w-2.5 h-2.5" /> Kelola
// // // //                           </button>
// // // //                         </div>
// // // //                       </td>
// // // //                       <td className="px-4 py-3 hidden sm:table-cell">
// // // //                         {item.soalAcak ? (
// // // //                           <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
// // // //                             <Shuffle className="w-3 h-3" /> Acak
// // // //                           </span>
// // // //                         ) : (
// // // //                           <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
// // // //                             <ListOrdered className="w-3 h-3" /> Urut
// // // //                           </span>
// // // //                         )}
// // // //                       </td>
// // // //                       <td className="px-4 py-3">
// // // //                         {item.status === "BERLANGSUNG" && (
// // // //                           <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
// // // //                             <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" /> BERLANGSUNG
// // // //                           </span>
// // // //                         )}
// // // //                         {item.status === "SELESAI" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">SELESAI</span>}
// // // //                         {item.status === "AKTIF" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">AKTIF</span>}
// // // //                         {item.status === "DRAFT" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">DRAFT</span>}
// // // //                       </td>
// // // //                       <td className="px-4 py-3">
// // // //                         <div className="flex items-center justify-end gap-1">
// // // //                           <button
// // // //                             onClick={() => { setSelectedUjian(item); setShowToken(false); setCopiedLink(false); setCopiedToken(false); setShowDetailModal(true); }}
// // // //                             className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors"
// // // //                           >
// // // //                             Detail
// // // //                           </button>
// // // //                           <button
// // // //                             onClick={() => { setHasilUjianTarget(item); setShowHasilModal(true); }}
// // // //                             className="h-7 px-2.5 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-semibold hover:bg-emerald-100 transition-colors"
// // // //                           >
// // // //                             Hasil
// // // //                           </button>
// // // //                           <button
// // // //                             onClick={() => { setTargetUjian(item); setShowEditUjianModal(true); }}
// // // //                             className="h-7 w-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
// // // //                           >
// // // //                             <Pencil className="w-3.5 h-3.5" />
// // // //                           </button>
// // // //                           <button
// // // //                             onClick={() => { setTargetUjian(item); setShowDeleteUjianModal(true); }}
// // // //                             className="h-7 w-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
// // // //                           >
// // // //                             <Trash2 className="w-3.5 h-3.5" />
// // // //                           </button>
// // // //                         </div>
// // // //                       </td>
// // // //                     </tr>
// // // //                   );
// // // //                 })}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const renderNilaiTab = () => (
// // // //     <div className="space-y-4">
// // // //       <div className="bg-white border border-slate-200 rounded-[14px] p-4 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // //         <div className="flex items-start justify-between gap-3 mb-4">
// // // //           <div>
// // // //             <h3 className="font-bold text-zinc-900 text-[14px]">Konfigurasi Rumus Nilai Akhir</h3>
// // // //             <p className="text-[11px] text-slate-500 mt-0.5">Total bobot harus <strong>100%</strong>.</p>
// // // //           </div>
// // // //           <div className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[13px] font-bold ${isBobotValid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
// // // //             {bobotTotal}%
// // // //           </div>
// // // //         </div>
// // // //         <div className="space-y-3">
// // // //           {[
// // // //             { label: "Ujian",          icon: <ClipboardList className="w-4 h-4 text-violet-600" />, desc: `${ujianList.length} ujian`,       val: bobotUjian,   set: setBobotUjian,   color: "violet" },
// // // //             { label: "Ulangan Harian", icon: <Book className="w-4 h-4 text-blue-600" />,           desc: "Rata-rata semua ulangan",          val: bobotUlangan, set: setBobotUlangan, color: "blue" },
// // // //             { label: "Latihan",        icon: <Dumbbell className="w-4 h-4 text-emerald-600" />,    desc: "Rata-rata semua latihan",          val: bobotLatihan, set: setBobotLatihan, color: "emerald" },
// // // //             { label: "Kuis",           icon: <Zap className="w-4 h-4 text-amber-600" />,           desc: "Rata-rata semua kuis",             val: bobotKuis,    set: setBobotKuis,    color: "amber" },
// // // //           ].map(item => (
// // // //             <div key={item.label} className={`p-3 rounded-xl bg-${item.color}-50 border border-${item.color}-100`}>
// // // //               <div className="flex items-center justify-between">
// // // //                 <div className="flex items-center gap-2">
// // // //                   <div className={`w-7 h-7 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>{item.icon}</div>
// // // //                   <div>
// // // //                     <p className="font-semibold text-zinc-900 text-[12px]">{item.label}</p>
// // // //                     <p className="text-[10px] text-slate-400">{item.desc}</p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-1.5">
// // // //                   <input
// // // //                     type="number"
// // // //                     value={item.val}
// // // //                     onChange={e => item.set(parseInt(e.target.value) || 0)}
// // // //                     className="w-16 h-8 text-center border-[1.5px] border-slate-200 rounded-lg text-[12px] font-semibold text-zinc-900 bg-white focus:border-zinc-900 outline-none"
// // // //                   />
// // // //                   <span className="text-[12px] font-semibold text-slate-500">%</span>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //         <div className="mt-4 p-3 bg-slate-900 rounded-xl">
// // // //           <p className="text-[10px] text-slate-400 mb-1 font-semibold uppercase tracking-wider">Preview Rumus</p>
// // // //           <p className="text-[12px] text-white font-mono">
// // // //             NA ={" "}
// // // //             {bobotUjian > 0 && `Ujian×${bobotUjian}%`}
// // // //             {bobotUjian > 0 && bobotUlangan > 0 && " + "}
// // // //             {bobotUlangan > 0 && `UH×${bobotUlangan}%`}
// // // //             {bobotUlangan > 0 && bobotLatihan > 0 && " + "}
// // // //             {bobotLatihan > 0 && `Latihan×${bobotLatihan}%`}
// // // //             {bobotLatihan > 0 && bobotKuis > 0 && " + "}
// // // //             {bobotKuis > 0 && `Kuis×${bobotKuis}%`}
// // // //           </p>
// // // //         </div>
// // // //         <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
// // // //           <KkmField kkm={kkm} setKkm={setKkm} />
// // // //           <button
// // // //             onClick={hitungNilaiAkhir}
// // // //             disabled={!isBobotValid}
// // // //             className="h-10 px-5 bg-zinc-900 text-white text-[13px] font-bold rounded-xl hover:bg-zinc-800 flex items-center gap-2 disabled:opacity-40 w-full sm:w-auto justify-center"
// // // //           >
// // // //             <Calculator className="w-4 h-4" /> Hitung Nilai Akhir
// // // //           </button>
// // // //         </div>
// // // //         {!isBobotValid && (
// // // //           <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
// // // //             <AlertCircle className="text-red-500 w-4 h-4 flex-shrink-0" />
// // // //             <p className="text-[11px] text-red-600 font-medium">Total bobot harus 100%. Sesuaikan sebelum menghitung.</p>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {showNilaiHasil && (
// // // //         <div id="nilai-hasil-section" className="space-y-4">
// // // //           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// // // //             {[
// // // //               { label: "Total Siswa",    val: nilaiData.length, icon: <Users className="w-3.5 h-3.5" />, color: "#18181b" },
// // // //               { label: "Rata-rata",      val: (nilaiData.reduce((a: number, b: any) => a + b.akhir, 0) / nilaiData.length).toFixed(1), icon: <BarChart2 className="w-3.5 h-3.5" />, color: "#2563eb" },
// // // //               { label: "Nilai Tertinggi", val: Math.max(...nilaiData.map((s: any) => s.akhir)), icon: <TrendingUp className="w-3.5 h-3.5" />, color: "#059669" },
// // // //               { label: `Lulus (≥${kkm})`, val: `${nilaiData.filter((s: any) => s.lulus).length}/${nilaiData.length}`, icon: <CheckCircle className="w-3.5 h-3.5" />, color: "#059669" },
// // // //             ].map(s => (
// // // //               <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // //                 <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>{s.icon}</div>
// // // //                 <div>
// // // //                   <p className="text-lg font-bold text-zinc-900">{s.val}</p>
// // // //                   <p className="text-[10px] text-slate-400 font-medium">{s.label}</p>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //           <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // //             <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
// // // //               <h3 className="font-semibold text-zinc-900 text-[13px]">Rekap Nilai Akhir Siswa</h3>
// // // //               <select value={nilaiFilter} onChange={e => setNilaiFilter(e.target.value)} className="h-8 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-600 focus:outline-none">
// // // //                 <option value="all">Semua</option>
// // // //                 <option value="lulus">Lulus</option>
// // // //                 <option value="tidak">Tidak Lulus</option>
// // // //               </select>
// // // //             </div>
// // // //             <div className="overflow-x-auto">
// // // //               <table className="w-full" style={{ minWidth: "480px" }}>
// // // //                 <thead className="border-b border-slate-100 bg-slate-50/50">
// // // //                   <tr>
// // // //                     <th className="px-4 py-3 text-center text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
// // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama</th>
// // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell cursor-pointer" onClick={() => { if (nilaiSortKey === "ujian") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("ujian"); setNilaiSortAsc(false); } }}>Ujian</th>
// // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell cursor-pointer" onClick={() => { if (nilaiSortKey === "ulangan") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("ulangan"); setNilaiSortAsc(false); } }}>Ulangan</th>
// // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer" onClick={() => { if (nilaiSortKey === "akhir") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("akhir"); setNilaiSortAsc(false); } }}>Nilai Akhir</th>
// // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Grade</th>
// // // //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell">Status</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody className="divide-y divide-slate-50">
// // // //                   {getSortedNilaiData().map((s: any) => {
// // // //                     const ranked = [...nilaiData].sort((a: any, b: any) => b.akhir - a.akhir);
// // // //                     const rank = ranked.findIndex((r: any) => r.nisn === s.nisn) + 1;
// // // //                     const rankClass =
// // // //                       rank === 1 ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white" :
// // // //                       rank === 2 ? "bg-gradient-to-br from-slate-400 to-slate-500 text-white" :
// // // //                       rank === 3 ? "bg-gradient-to-br from-orange-400 to-amber-600 text-white" :
// // // //                                    "bg-slate-100 text-slate-600";
// // // //                     const akhirColor = s.akhir >= 90 ? "#059669" : s.akhir >= 80 ? "#10b981" : s.akhir >= 70 ? "#2563eb" : "#dc2626";
// // // //                     const gradeClass: Record<string, string> = { A: "bg-emerald-50 text-emerald-700", B: "bg-blue-50 text-blue-700", C: "bg-amber-50 text-amber-700", D: "bg-red-50 text-red-700" };
// // // //                     return (
// // // //                       <tr key={s.nisn} className="hover:bg-slate-50/50">
// // // //                         <td className="px-4 py-3 text-center">
// // // //                           <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center mx-auto ${rankClass}`}>{rank}</span>
// // // //                         </td>
// // // //                         <td className="px-4 py-3">
// // // //                           <p className="font-semibold text-zinc-900 text-[12px] truncate max-w-[120px]">{s.nama}</p>
// // // //                           <p className="text-[10px] text-slate-400">{s.nisn}</p>
// // // //                         </td>
// // // //                         <td className="px-4 py-3 hidden sm:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ujian}</span></td>
// // // //                         <td className="px-4 py-3 hidden md:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ulangan}</span></td>
// // // //                         <td className="px-4 py-3"><span className="font-black text-[15px]" style={{ color: akhirColor }}>{s.akhir}</span></td>
// // // //                         <td className="px-4 py-3 hidden sm:table-cell">
// // // //                           <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-extrabold ${gradeClass[s.grade]}`}>{s.grade}</span>
// // // //                         </td>
// // // //                         <td className="px-4 py-3 hidden md:table-cell">
// // // //                           {s.lulus
// // // //                             ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
// // // //                             : <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>}
// // // //                         </td>
// // // //                       </tr>
// // // //                     );
// // // //                   })}
// // // //                 </tbody>
// // // //               </table>
// // // //             </div>
// // // //             <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
// // // //               <span className="text-[11px] text-slate-400">{getSortedNilaiData().length} dari {nilaiData.length} siswa</span>
// // // //               <span className="text-[11px] text-slate-500">KKM: <strong className="text-zinc-900">{kkm}</strong></span>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex h-screen items-center justify-center bg-gray-50">
// // // //         <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
// // // //       {sidebarOpen && (
// // // //         <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
// // // //       )}
// // // //       <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 fixed md:relative z-50`}>
// // // //         <Sidebar role="admin" />
// // // //       </div>

// // // //       <div className="flex-1 flex flex-col overflow-hidden">
// // // //         <Header
// // // //           title={selectedSubject ? `${selectedSubject.nama} › ${TAB_LABELS[activeTab] || activeTab}` : "Mata Pelajaran"}
// // // //           showHamburger
// // // //           onHamburgerClick={() => setSidebarOpen(true)}
// // // //         />

// // // //         <div className="flex-1 overflow-y-auto">
// // // //           {/* ══ LIST MAPEL ══ */}
// // // //           {!selectedSubject && (
// // // //             <div className="p-4 md:p-8 space-y-5">
// // // //               {error && (
// // // //                 <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
// // // //                   <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
// // // //                   <button onClick={() => setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4" /></button>
// // // //                 </div>
// // // //               )}
// // // //               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
// // // //                 <div>
// // // //                   <h1 className="text-lg md:text-xl font-bold text-zinc-900">Mata Pelajaran</h1>
// // // //                   <p className="text-[13px] text-slate-500 mt-0.5">Kelola semua mata pelajaran</p>
// // // //                 </div>
// // // //                 <button
// // // //                   onClick={() => { setShowAddModal(true); setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" }); }}
// // // //                   className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm w-fit"
// // // //                 >
// // // //                   <Plus className="w-4 h-4" /> Tambah Mata Pelajaran
// // // //                 </button>
// // // //               </div>

// // // //               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// // // //                 {[
// // // //                   { label: "Total Mapel", val: subjects.length,  icon: <BookOpen className="w-4 h-4" />,     color: "#18181b" },
// // // //                   { label: "Total Soal",  val: stats.totalSoal,  icon: <FileText className="w-4 h-4" />,     color: "#2563eb" },
// // // //                   { label: "Total Ujian", val: stats.totalUjian, icon: <ClipboardList className="w-4 h-4" />, color: "#059669" },
// // // //                   { label: "Kelas",       val: [...new Set(subjects.map(s => s.kelas))].length, icon: <Users className="w-4 h-4" />, color: "#d97706" },
// // // //                 ].map(s => (
// // // //                   <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // //                     <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>
// // // //                       {s.icon}
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-lg md:text-xl font-bold text-zinc-900">{s.val}</p>
// // // //                       <p className="text-[10px] md:text-[11px] text-slate-400 font-medium">{s.label}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>

// // // //               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
// // // //                 <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
// // // //                   <div className="flex gap-2 flex-wrap">
// // // //                     {["all", "X", "XI", "XII"].map(k => (
// // // //                       <button
// // // //                         key={k}
// // // //                         onClick={() => setKelasFilter(k)}
// // // //                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${kelasFilter === k ? "bg-zinc-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
// // // //                       >
// // // //                         {k === "all" ? "Semua" : k}
// // // //                       </button>
// // // //                     ))}
// // // //                   </div>
// // // //                   <div className="relative flex-1 max-w-xs">
// // // //                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// // // //                     <input
// // // //                       type="text"
// // // //                       placeholder="Cari mata pelajaran..."
// // // //                       value={searchQuery}
// // // //                       onChange={e => setSearchQuery(e.target.value)}
// // // //                       className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // //                 {filtered.map(subject => {
// // // //                   const c = COLORS[subject.warna] || COLORS.zinc;
// // // //                   return (
// // // //                     <div
// // // //                       key={subject.id}
// // // //                       className="bg-white border border-slate-200 rounded-[16px] overflow-hidden cursor-pointer hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 hover:border-slate-300 transition-all group"
// // // //                       onClick={() => { setSelectedSubject(subject); setActiveTab("ujian"); setShowNilaiHasil(false); }}
// // // //                     >
// // // //                       <div className="h-[6px]" style={{ background: `linear-gradient(90deg, ${c.dot}, ${c.hex}88)` }} />
// // // //                       <div className="p-5">
// // // //                         <div className="flex items-start gap-3 mb-3">
// // // //                           <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{ background: c.bg, border: `1.5px solid ${c.border}` }}>
// // // //                             <BookOpen style={{ color: c.icon }} className="w-5 h-5" />
// // // //                           </div>
// // // //                           <div className="flex-1 min-w-0">
// // // //                             <p className="font-bold text-zinc-900 text-[14px] leading-tight truncate">{subject.nama}</p>
// // // //                             <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: c.bg, color: c.icon, border: `1px solid ${c.border}` }}>
// // // //                               {subject.kelas}
// // // //                             </span>
// // // //                           </div>
// // // //                         </div>
// // // //                         {subject.deskripsi && (
// // // //                           <p className="text-[12px] text-slate-500 mb-3 line-clamp-2">{subject.deskripsi}</p>
// // // //                         )}
// // // //                         <div className="flex items-center gap-4 text-[12px] text-slate-500 pt-3 border-t border-slate-100">
// // // //                           <div className="flex items-center gap-1.5">
// // // //                             <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><FileText className="w-3 h-3 text-slate-400" /></div>
// // // //                             <span className="font-medium">{subject.totalSoal} soal</span>
// // // //                           </div>
// // // //                           <div className="flex items-center gap-1.5">
// // // //                             <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><ClipboardList className="w-3 h-3 text-slate-400" /></div>
// // // //                             <span className="font-medium">{subject.totalUjian} ujian</span>
// // // //                           </div>
// // // //                           <div className="ml-auto flex items-center gap-1">
// // // //                             <button
// // // //                               onClick={e => { e.stopPropagation(); setTargetMapel(subject); setEditForm(subject); setShowEditModal(true); }}
// // // //                               className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// // // //                             >
// // // //                               <Pencil className="w-3.5 h-3.5" />
// // // //                             </button>
// // // //                             <button
// // // //                               onClick={e => { e.stopPropagation(); openDeleteMapelModal(subject); }}
// // // //                               className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// // // //                             >
// // // //                               <Trash2 className="w-3.5 h-3.5" />
// // // //                             </button>
// // // //                             <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   );
// // // //                 })}
// // // //                 <div
// // // //                   onClick={() => { setShowAddModal(true); setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" }); }}
// // // //                   className="border-2 border-dashed border-slate-200 rounded-[16px] p-5 flex flex-col items-center justify-center gap-2 text-center cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all min-h-[160px]"
// // // //                 >
// // // //                   <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center"><Plus className="text-slate-400 w-5 h-5" /></div>
// // // //                   <div>
// // // //                     <p className="text-[13px] text-zinc-700 font-semibold">Tambah Mata Pelajaran</p>
// // // //                     <p className="text-[11px] text-slate-400 mt-0.5">Buat mapel baru</p>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {/* ══ DETAIL MAPEL ══ */}
// // // //           {selectedSubject && (
// // // //             <div className="p-4 md:p-8 space-y-4">
// // // //               {error && (
// // // //                 <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
// // // //                   <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
// // // //                   <button onClick={() => setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4" /></button>
// // // //                 </div>
// // // //               )}
// // // //               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
// // // //                 <div className="flex items-center gap-3">
// // // //                   <button onClick={() => setSelectedSubject(null)} className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 flex-shrink-0">
// // // //                     <ArrowLeft className="w-4 h-4" />
// // // //                   </button>
// // // //                   <div className="min-w-0">
// // // //                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mata Pelajaran</p>
// // // //                     <h1 className="text-base md:text-lg font-bold text-zinc-900 truncate">{selectedSubject.nama} — {selectedSubject.kelas}</h1>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-2">
// // // //                   {["ujian", "ulangan", "latihan", "kuis"].includes(activeTab) && (
// // // //                     <button
// // // //                       onClick={() => setShowContentModal(true)}
// // // //                       className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
// // // //                     >
// // // //                       <Plus className="w-4 h-4" /> Tambah {TAB_LABELS[activeTab]}
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// // // //                 {[
// // // //                   { label: "Total Soal", val: selectedSubject.totalSoal, icon: <FileText className="w-4 h-4 text-slate-400" /> },
// // // //                   { label: "Ujian",      val: selectedSubject.totalUjian, icon: <ClipboardList className="w-4 h-4 text-slate-400" /> },
// // // //                   { label: "Siswa Aktif", val: 0, icon: <Users className="w-4 h-4 text-slate-400" /> },
// // // //                   { label: "Rata-rata",  val: "0", icon: <TrendingUp className="w-4 h-4 text-slate-400" /> },
// // // //                 ].map(st => (
// // // //                   <div key={st.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // //                     <div className="flex items-center gap-2 mb-1">{st.icon}<p className="text-[11px] text-slate-400 font-medium">{st.label}</p></div>
// // // //                     <p className="text-xl md:text-2xl font-bold text-zinc-900">{st.val}</p>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>

// // // //               <div className="overflow-x-auto -mx-1 px-1">
// // // //                 <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
// // // //                   {Object.entries(TAB_LABELS).map(([key, label]) => (
// // // //                     <button
// // // //                       key={key}
// // // //                       onClick={() => { setActiveTab(key); setShowNilaiHasil(false); }}
// // // //                       className={`px-3 py-2 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-all ${activeTab === key ? "bg-white text-zinc-900 shadow-sm" : "text-slate-500 hover:text-zinc-900"}`}
// // // //                     >
// // // //                       {label}
// // // //                     </button>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>

// // // //               {(activeTab === "ujian" || activeTab === "ulangan" || activeTab === "latihan" || activeTab === "kuis") && renderContentTable()}

// // // //               {activeTab === "soal" && (
// // // //                 <div className="space-y-4">
// // // //                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
// // // //                     <div className="relative flex-1 max-w-xs">
// // // //                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
// // // //                       <input
// // // //                         type="text"
// // // //                         placeholder="Cari soal..."
// // // //                         value={soalBankSearch}
// // // //                         onChange={e => setSoalBankSearch(e.target.value)}
// // // //                         className="h-9 pl-8 pr-4 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 w-full"
// // // //                       />
// // // //                     </div>
// // // //                     <select
// // // //                       value={soalBankTipe}
// // // //                       onChange={e => setSoalBankTipe(e.target.value)}
// // // //                       className="h-9 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-white focus:outline-none"
// // // //                     >
// // // //                       <option value="">Semua Tipe</option>
// // // //                       <option value="PILIHAN_GANDA">Pilihan Ganda</option>
// // // //                       <option value="ESSAY">Essay</option>
// // // //                     </select>
// // // //                   </div>
// // // //                   <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// // // //                     <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
// // // //                       <h3 className="font-semibold text-zinc-900 text-[13px]">Bank Soal</h3>
// // // //                       <span className="text-[11px] text-slate-400 font-medium">{soalBankList.length} soal</span>
// // // //                     </div>
// // // //                     {soalBankLoading ? (
// // // //                       <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>
// // // //                     ) : soalBankList.length === 0 ? (
// // // //                       <div className="py-12 text-center">
// // // //                         <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// // // //                         <p className="text-[13px] text-slate-400">Belum ada soal di bank soal ini</p>
// // // //                         <p className="text-[11px] text-slate-400 mt-1">Soal dibuat melalui tab Ujian/Latihan/Kuis</p>
// // // //                       </div>
// // // //                     ) : (
// // // //                       <div className="divide-y divide-slate-50">
// // // //                         {soalBankList.map((s, i) => (
// // // //                           <div key={s.id} className="px-4 py-3.5 hover:bg-slate-50/50 flex items-start gap-3">
// // // //                             <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
// // // //                             <div className="flex-1 min-w-0">
// // // //                               <p className="text-[13px] text-zinc-900 font-medium leading-snug">{s.pertanyaan}</p>
// // // //                               {s.gambarUrl && <img src={s.gambarUrl} alt="" className="mt-2 h-16 rounded-lg object-cover border border-slate-200" />}
// // // //                               <div className="flex items-center gap-2 mt-1.5 flex-wrap">
// // // //                                 <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "PILIHAN_GANDA" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>
// // // //                                   {s.tipe === "PILIHAN_GANDA" ? "Pilihan Ganda" : "Essay"}
// // // //                                 </span>
// // // //                                 {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
// // // //                                 {s.tipe === "PILIHAN_GANDA" && s.jawabanBenar && (
// // // //                                   <span className="text-[10px] text-slate-400">Jwb: <strong className="text-emerald-600">{s.jawabanBenar}</strong></span>
// // // //                                 )}
// // // //                               </div>
// // // //                               {s.tipe === "PILIHAN_GANDA" && (
// // // //                                 <div className="mt-2 grid grid-cols-2 gap-1">
// // // //                                   {[{ key: "opsiA", label: "A" }, { key: "opsiB", label: "B" }, { key: "opsiC", label: "C" }, { key: "opsiD", label: "D" }]
// // // //                                     .filter(o => s[o.key]).map(o => (
// // // //                                     <div key={o.key} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] ${s.jawabanBenar === o.label ? "bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold" : "bg-slate-50 text-slate-600"}`}>
// // // //                                       <span className="font-bold">{o.label}.</span> {s[o.key]}
// // // //                                     </div>
// // // //                                   ))}
// // // //                                 </div>
// // // //                               )}
// // // //                             </div>
// // // //                             <span className="text-[10px] text-slate-300 flex-shrink-0 mt-1">
// // // //                               {new Date(s.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
// // // //                             </span>
// // // //                           </div>
// // // //                         ))}
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {activeTab === "nilai" && renderNilaiTab()}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* ══ MODAL: Add Mapel ══ */}
// // // //       {showAddModal && (
// // // //         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
// // // //           <div className="absolute inset-0" onClick={() => setShowAddModal(false)} />
// // // //           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
// // // //             <div className="flex items-center justify-between mb-5">
// // // //               <h3 className="text-base font-bold text-zinc-900">Tambah Mata Pelajaran</h3>
// // // //               <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // //             </div>
// // // //             <div className="space-y-4">
// // // //               <div>
// // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label>
// // // //                 <input type="text" placeholder="e.g. Matematika Peminatan" value={addForm.nama} onChange={e => setAddForm({ ...addForm, nama: e.target.value })} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas <span className="text-red-500">*</span></label>
// // // //                 <input type="text" placeholder="e.g. XII IPA 1" value={addForm.kelas} onChange={e => setAddForm({ ...addForm, kelas: e.target.value })} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label>
// // // //                 <textarea placeholder="Deskripsi singkat..." value={addForm.deskripsi} onChange={e => setAddForm({ ...addForm, deskripsi: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none" rows={3} />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Warna Tema</label>
// // // //                 <div className="flex gap-2 flex-wrap">
// // // //                   {Object.entries(COLORS).map(([key, c]) => (
// // // //                     <button key={key} onClick={() => setAddForm({ ...addForm, warna: key })} className={`w-8 h-8 rounded-full transition-all ${addForm.warna === key ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : "hover:scale-105"}`} style={{ background: c.hex }} title={key} />
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //             <div className="flex gap-3 mt-6">
// // // //               <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// // // //               <button onClick={handleAdd} disabled={!addForm.nama.trim() || !addForm.kelas.trim()} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40">Simpan</button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* ══ MODAL: Edit Mapel ══ */}
// // // //       {showEditModal && editForm && (
// // // //         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
// // // //           <div className="absolute inset-0" onClick={() => setShowEditModal(false)} />
// // // //           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
// // // //             <div className="flex items-center justify-between mb-5">
// // // //               <h3 className="text-base font-bold text-zinc-900">Edit Mata Pelajaran</h3>
// // // //               <button onClick={() => setShowEditModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // //             </div>
// // // //             <div className="space-y-4">
// // // //               <div>
// // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama</label>
// // // //                 <input type="text" value={editForm.nama} onChange={e => setEditForm({ ...editForm, nama: e.target.value })} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas</label>
// // // //                 <input type="text" value={editForm.kelas} onChange={e => setEditForm({ ...editForm, kelas: e.target.value })} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label>
// // // //                 <textarea value={editForm.deskripsi || ""} onChange={e => setEditForm({ ...editForm, deskripsi: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none" rows={3} />
// // // //               </div>
// // // //             </div>
// // // //             <div className="flex gap-3 mt-6">
// // // //               <button onClick={() => setShowEditModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// // // //               <button onClick={handleEdit} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800">Simpan</button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* ══ MODAL: Delete Mapel ══ */}
// // // //       {showDeleteModal && targetMapel && (
// // // //         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
// // // //           <div className="absolute inset-0" onClick={() => { if (!deleteMapelLoading) { setShowDeleteModal(false); setDeleteMapelDetail(null); } }} />
// // // //           <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
// // // //             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
// // // //               <Trash2 className="w-6 h-6 text-red-600" />
// // // //             </div>
// // // //             <h3 className="text-base font-bold text-zinc-900 text-center mb-1">Hapus Mata Pelajaran?</h3>
// // // //             <p className="text-[13px] font-semibold text-zinc-800 text-center mb-4">"{targetMapel.nama}"</p>
// // // //             {deleteMapelLoading ? (
// // // //               <div className="flex flex-col items-center gap-2 py-4">
// // // //                 <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
// // // //                 <p className="text-[11px] text-slate-400">Mengambil informasi data...</p>
// // // //               </div>
// // // //             ) : deleteMapelDetail ? (
// // // //               <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
// // // //                 <p className="text-[11px] font-bold text-red-700 mb-3 flex items-center gap-1.5">
// // // //                   <AlertCircle className="w-3.5 h-3.5" /> Data yang akan ikut terhapus permanen:
// // // //                 </p>
// // // //                 <div className="space-y-2">
// // // //                   {[
// // // //                     { label: "Ujian", val: deleteMapelDetail.totalUjian, icon: "📝" },
// // // //                     { label: "Ulangan Harian", val: deleteMapelDetail.totalUlangan, icon: "📋" },
// // // //                     { label: "Latihan", val: deleteMapelDetail.totalLatihan, icon: "💪" },
// // // //                     { label: "Kuis", val: deleteMapelDetail.totalKuis, icon: "⚡" },
// // // //                     { label: "Bank Soal", val: deleteMapelDetail.totalSoal, icon: "📚" },
// // // //                   ].map(item => (
// // // //                     <div key={item.label} className="flex items-center justify-between">
// // // //                       <span className="text-[12px] text-red-700 flex items-center gap-1.5"><span>{item.icon}</span> {item.label}</span>
// // // //                       <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${item.val > 0 ? "bg-red-200 text-red-800" : "bg-slate-100 text-slate-400"}`}>
// // // //                         {item.val} item
// // // //                       </span>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //                 <div className="mt-3 pt-3 border-t border-red-200">
// // // //                   <p className="text-[10px] text-red-600 font-semibold text-center">⚠️ Tindakan ini tidak dapat dibatalkan!</p>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
// // // //                 <p className="text-[12px] text-slate-500 text-center">Semua data terkait akan terhapus permanen.</p>
// // // //               </div>
// // // //             )}
// // // //             <div className="flex gap-3">
// // // //               <button onClick={() => { setShowDeleteModal(false); setDeleteMapelDetail(null); }} disabled={deleteMapelLoading} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50 disabled:opacity-40">Batal</button>
// // // //               <button onClick={handleDelete} disabled={deleteMapelLoading} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700 disabled:opacity-40 flex items-center justify-center gap-2">
// // // //                 {deleteMapelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
// // // //                 Ya, Hapus Semua
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* ══ MODAL: Detail Ujian ══ */}
// // // //       {showDetailModal && selectedUjian && (
// // // //         <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
// // // //           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
// // // //           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
// // // //             <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
// // // //               <div className="flex items-center gap-2.5">
// // // //                 <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
// // // //                   <ClipboardList className="w-4 h-4 text-zinc-600" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h3 className="text-[14px] font-bold text-zinc-900">Detail {TAB_LABELS[selectedUjian.tipe?.toLowerCase()] || "Ujian"}</h3>
// // // //                   <p className="text-[10px] text-slate-400">Informasi & Akses</p>
// // // //                 </div>
// // // //               </div>
// // // //               <button onClick={() => setShowDetailModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// // // //             </div>
// // // //             <div className="p-5 space-y-4">
// // // //               <div className="bg-slate-50 rounded-xl p-4 space-y-3">
// // // //                 <div>
// // // //                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nama</p>
// // // //                   <p className="font-bold text-zinc-900 text-[14px]">{selectedUjian.nama}</p>
// // // //                 </div>
// // // //                 <div className="grid grid-cols-2 gap-3">
// // // //                   {[
// // // //                     { icon: <Calendar className="w-3.5 h-3.5 text-slate-400" />, label: "Tanggal", val: selectedUjian.tanggalMulai ? new Date(selectedUjian.tanggalMulai).toLocaleDateString("id-ID") : "—" },
// // // //                     { icon: <Clock className="w-3.5 h-3.5 text-slate-400" />,    label: "Durasi",  val: `${selectedUjian.durasi} menit` },
// // // //                     { icon: <FileText className="w-3.5 h-3.5 text-slate-400" />, label: "Total Soal", val: `${selectedUjian.soalList?.length ?? selectedUjian.totalSoal} soal` },
// // // //                     { icon: <Users className="w-3.5 h-3.5 text-slate-400" />,    label: "Peserta", val: selectedUjian.peserta },
// // // //                   ].map(it => (
// // // //                     <div key={it.label} className="flex items-center gap-2">
// // // //                       <div className="w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">{it.icon}</div>
// // // //                       <div>
// // // //                         <p className="text-[9px] text-slate-400 font-semibold uppercase">{it.label}</p>
// // // //                         <p className="text-[12px] font-semibold text-zinc-700">{it.val}</p>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //                 <div className="flex items-center gap-2 pt-1 flex-wrap">
// // // //                   <p className="text-[10px] font-semibold text-slate-400 uppercase">Urutan Soal:</p>
// // // //                   {selectedUjian.soalAcak ? (
// // // //                     <span className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
// // // //                       <Shuffle className="w-3 h-3" /> Diacak per siswa
// // // //                     </span>
// // // //                   ) : (
// // // //                     <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
// // // //                       <ListOrdered className="w-3 h-3" /> Berurutan (sama semua)
// // // //                     </span>
// // // //                   )}
// // // //                 </div>
// // // //                 <div className="flex items-center gap-2 pt-1">
// // // //                   <p className="text-[10px] font-semibold text-slate-400 uppercase">Status:</p>
// // // //                   {selectedUjian.status === "BERLANGSUNG" && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" /> BERLANGSUNG</span>}
// // // //                   {selectedUjian.status === "SELESAI"     && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">SELESAI</span>}
// // // //                   {selectedUjian.status === "AKTIF"       && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">AKTIF</span>}
// // // //                   {selectedUjian.status === "DRAFT"       && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">DRAFT</span>}
// // // //                 </div>
// // // //               </div>

// // // //               <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
// // // //                 <div className="flex items-center gap-2 mb-2">
// // // //                   <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
// // // //                   <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Link Akses Siswa</p>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-2">
// // // //                   <div className="flex-1 min-w-0 bg-white border border-blue-200 rounded-lg px-3 py-2">
// // // //                     <p className="text-[11px] font-mono text-blue-700 truncate">{selectedUjian.linkSiswa}</p>
// // // //                   </div>
// // // //                   <button
// // // //                     onClick={() => copyToClipboard(selectedUjian.linkSiswa, "link")}
// // // //                     className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedLink ? "bg-emerald-500 text-white" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}
// // // //                   >
// // // //                     {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedLink ? "Disalin!" : "Salin"}
// // // //                   </button>
// // // //                 </div>
// // // //                 <a href={selectedUjian.linkPreview} target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">
// // // //                   <ExternalLink className="w-3 h-3" /> Buka Preview Ujian
// // // //                 </a>
// // // //               </div>

// // // //               <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
// // // //                 <div className="flex items-center gap-2 mb-2">
// // // //                   <Hash className="w-3.5 h-3.5 text-amber-500" />
// // // //                   <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Token Ujian</p>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-2">
// // // //                   <div className="flex-1 min-w-0 bg-white border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
// // // //                     <p className={`text-[13px] font-mono font-bold tracking-widest flex-1 ${showToken ? "text-amber-700" : "text-amber-200 select-none"}`}>
// // // //                       {showToken ? selectedUjian.token : selectedUjian.token.replace(/[A-Z0-9]/g, "•")}
// // // //                     </p>
// // // //                     <button onClick={() => setShowToken(!showToken)} className="text-amber-400 hover:text-amber-600">
// // // //                       {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// // // //                     </button>
// // // //                   </div>
// // // //                   <button
// // // //                     onClick={() => copyToClipboard(selectedUjian.token, "token")}
// // // //                     className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedToken ? "bg-emerald-500 text-white" : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50"}`}
// // // //                   >
// // // //                     {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedToken ? "Disalin!" : "Salin"}
// // // //                   </button>
// // // //                 </div>
// // // //                 <p className="text-[10px] text-amber-600 mt-2">⚠️ Bagikan token hanya kepada siswa yang berhak.</p>
// // // //               </div>
// // // //             </div>
// // // //             <div className="p-5 pt-0">
// // // //               <button onClick={() => setShowDetailModal(false)} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup</button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* ══ MODAL: Tambah Konten ══ */}
// // // //       {showContentModal && (
// // // //         <AddContentModal activeTab={activeTab} onClose={() => setShowContentModal(false)} onSave={handleSaveContent} />
// // // //       )}

// // // //       {/* ══ MODAL: Kelola Soal ══ */}
// // // //       {showKelolaSoal && selectedUjian && (
// // // //         <KelolaSoalModal
// // // //           ujian={selectedUjian}
// // // //           onClose={() => { setShowKelolaSoal(false); setSelectedUjian(null); }}
// // // //           onUpdate={handleUpdateSoal}
// // // //         />
// // // //       )}

// // // //       {/* ══ MODAL: Edit Ujian ══ */}
// // // //       {showEditUjianModal && targetUjian && (
// // // //         <EditUjianModal
// // // //           ujian={targetUjian}
// // // //           onClose={() => { setShowEditUjianModal(false); setTargetUjian(null); }}
// // // //           onSave={handleEditUjian}
// // // //           onKelolaSoal={() => { setSelectedUjian(targetUjian); setShowEditUjianModal(false); setShowKelolaSoal(true); }}
// // // //         />
// // // //       )}

// // // //       {/* ══ MODAL: Delete Ujian ══ */}
// // // //       {showDeleteUjianModal && targetUjian && (
// // // //         <DeleteUjianModal
// // // //           ujian={targetUjian}
// // // //           onClose={() => { setShowDeleteUjianModal(false); setTargetUjian(null); }}
// // // //           onDelete={handleDeleteUjian}
// // // //         />
// // // //       )}

// // // //       {/* ══ MODAL: Hasil Ujian ══ */}
// // // //       {showHasilModal && hasilUjianTarget && (
// // // //         <HasilUjianModal
// // // //           ujian={hasilUjianTarget}
// // // //           onClose={() => { setShowHasilModal(false); setHasilUjianTarget(null); }}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }



// // // ini isudah berhasil, tapi belum bisa import gambar langsung dari pdf
// // "use client";


// // import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// // import { useRouter } from "next/navigation";
// // import Sidebar from "@/components/Sidebar";
// // import Header from "@/components/Header";
// // import { api, getToken } from "@/lib/api";
// // import {
// //   BookOpen,
// //   Plus,
// //   Search,
// //   Pencil,
// //   Trash2,
// //   Copy,
// //   ExternalLink,
// //   AlertCircle,
// //   Loader2,
// //   X,
// //   ArrowLeft,
// //   FileText,
// //   ClipboardList,
// //   Users,
// //   TrendingUp,
// //   BarChart2,
// //   CheckCircle,
// //   ChevronRight,
// //   Eye,
// //   EyeOff,
// //   Check,
// //   Hash,
// //   Clock,
// //   Calendar,
// //   Edit3,
// //   ImageIcon,
// //   Upload,
// //   Shuffle,
// //   ListOrdered,
// //   Save,
// //   Zap,
// //   Calculator,
// //   Dumbbell,
// //   Book,
// //   FileUp,
// // } from "lucide-react";

// // // ─── Types ────────────────────────────────────────────────────────────────────
// // type MataPelajaran = {
// //   id: number;
// //   nama: string;
// //   kelas: string;
// //   deskripsi?: string;
// //   warna: string;
// //   totalSoal: number;
// //   totalUjian: number;
// // };

// // type Ujian = {
// //   id: string;
// //   nama: string;
// //   token: string;
// //   kelas: string;
// //   tipe: string;
// //   status: string;
// //   durasi: number;
// //   tanggalMulai?: string;
// //   totalSoal: number;
// //   peserta: string;
// //   linkSiswa: string;
// //   linkPreview: string;
// //   soalAcak?: boolean;
// //   soalList?: SoalItem[];
// // };

// // type SoalItem = {
// //   id: string;
// //   pertanyaan: string;
// //   tipe: "pg" | "essay";
// //   opsi: string[];
// //   jawaban: string;
// //   topik: string;
// //   gambar?: string;
// // };

// // type DeleteMapelDetail = {
// //   totalUjian: number;
// //   totalUlangan: number;
// //   totalLatihan: number;
// //   totalKuis: number;
// //   totalSoal: number;
// // };

// // type HasilSiswa = {
// //   nisn: string;
// //   nama: string;
// //   kelas: string;
// //   nilai: number;
// //   benar: number;
// //   salah: number;
// //   lulus: boolean;
// //   pelanggaran: number;
// //   catatan: string[];
// // };

// // type HasilUjian = {
// //   ujian: { id: string; nama: string; durasi: string; totalSoal: number; kelas: string };
// //   summary: {
// //     rataRata: number;
// //     tertinggi: number;
// //     terendah: number;
// //     lulus: number;
// //     gagal: number;
// //     totalSiswa: number;
// //   };
// //   siswa: HasilSiswa[];
// // };

// // // ─── Color System ─────────────────────────────────────────────────────────────
// // const COLORS: Record<string, { bg: string; icon: string; dot: string; hex: string; border: string; light: string }> = {
// //   zinc: { bg: "#f4f4f5", icon: "#18181b", dot: "#52525b", hex: "#18181b", border: "#d4d4d8", light: "#fafafa" },
// //   blue: { bg: "#eff6ff", icon: "#2563eb", dot: "#3b82f6", hex: "#3b82f6", border: "#bfdbfe", light: "#eff6ff" },
// //   violet: { bg: "#f5f3ff", icon: "#7c3aed", dot: "#8b5cf6", hex: "#8b5cf6", border: "#ddd6fe", light: "#f5f3ff" },
// //   emerald: { bg: "#ecfdf5", icon: "#059669", dot: "#10b981", hex: "#10b981", border: "#a7f3d0", light: "#ecfdf5" },
// //   amber: { bg: "#fffbeb", icon: "#d97706", dot: "#f59e0b", hex: "#f59e0b", border: "#fde68a", light: "#fffbeb" },
// //   red: { bg: "#fef2f2", icon: "#dc2626", dot: "#ef4444", hex: "#ef4444", border: "#fecaca", light: "#fef2f2" },
// //   cyan: { bg: "#ecfeff", icon: "#0891b2", dot: "#06b6d4", hex: "#06b6d4", border: "#a5f3fc", light: "#ecfeff" },
// //   pink: { bg: "#fdf2f8", icon: "#be185d", dot: "#ec4899", hex: "#ec4899", border: "#fbcfe8", light: "#fdf2f8" },
// // };

// // const TAB_LABELS: Record<string, string> = {
// //   ujian: "Ujian",
// //   ulangan: "Ulangan",
// //   latihan: "Latihan",
// //   kuis: "Kuis",
// //   soal: "Bank Soal",
// //   nilai: "Nilai Akhir",
// // };

// // // ─── OpenRouter config ────────────────────────────────────────────────────────
// // // SESUDAH
// // API key OpenRouter sekarang diproses aman oleh backend.
// // // Gunakan model 120b free sesuai permintaan
// // const OPENROUTER_MODEL = "openai/gpt-oss-120b:free";

// // // ─── Draft helpers ────────────────────────────────────────────────────────────
// // const DRAFT_KEY = (tab: string) => `admin_add_content_draft_${tab}`;

// // interface DraftData {
// //   step: 1 | 2;
// //   nama: string;
// //   tanggal: string;
// //   durasi: string;
// //   soalAcak: boolean;
// //   soalList: SoalItem[];
// //   soalPertanyaan: string;
// //   soalTipe: "pg" | "essay";
// //   soalTopik: string;
// //   soalOpsi: string[];
// //   soalJawaban: string;
// //   soalGambar?: string;
// //   editingId: string | null;
// // }

// // function exportToExcel(data: HasilUjian, ujianNama: string) {
// //   const header = ["No", "NISN", "Nama", "Kelas", "Nilai", "Benar", "Salah", "Status", "Pelanggaran"];
// //   const rows = data.siswa.map((s, i) => [
// //     i + 1, s.nisn, s.nama, s.kelas, s.nilai, s.benar, s.salah,
// //     s.lulus ? "LULUS" : "TIDAK LULUS", s.pelanggaran,
// //   ]);
// //   const summaryRows = [
// //     [],
// //     ["RINGKASAN"],
// //     ["Total Peserta", data.summary.totalSiswa],
// //     ["Rata-rata Nilai", data.summary.rataRata],
// //     ["Nilai Tertinggi", data.summary.tertinggi],
// //     ["Nilai Terendah", data.summary.terendah],
// //     ["Lulus", data.summary.lulus],
// //     ["Tidak Lulus", data.summary.gagal],
// //   ];
// //   const allRows = [header, ...rows, ...summaryRows];
// //   const csvContent = allRows
// //     .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
// //     .join("\n");
// //   const bom = "\uFEFF";
// //   const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
// //   const url = URL.createObjectURL(blob);
// //   const link = document.createElement("a");
// //   link.href = url;
// //   link.download = `Hasil_${ujianNama.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`;
// //   document.body.appendChild(link);
// //   link.click();
// //   document.body.removeChild(link);
// //   URL.revokeObjectURL(url);
// // }

// // function saveDraft(tab: string, data: DraftData) {
// //   try { sessionStorage.setItem(DRAFT_KEY(tab), JSON.stringify(data)); } catch (_) { }
// // }
// // function loadDraft(tab: string): DraftData | null {
// //   try { const raw = sessionStorage.getItem(DRAFT_KEY(tab)); return raw ? JSON.parse(raw) : null; } catch (_) { return null; }
// // }
// // function clearDraft(tab: string) {
// //   try { sessionStorage.removeItem(DRAFT_KEY(tab)); } catch (_) { }
// // }

// // // ─── Helper: clean extracted text ────────────────────────────────────────────
// // function cleanText(text: string): string {
// //   return text
// //     .replace(/×/g, "*")
// //     .replace(/−/g, "-")
// //     .replace(/\s{2,}/g, " ")
// //     .replace(/\r\n/g, "\n")
// //     .replace(/\r/g, "\n")
// //     .trim();
// // }

// // // ─── Helper: read PDF as text (using pdf.js via CDN) ─────────────────────────
// // async function readPdfAsText(file: File): Promise<string> {
// //   return new Promise((resolve, reject) => {
// //     const reader = new FileReader();
// //     reader.onload = async (e) => {
// //       try {
// //         const arrayBuffer = e.target?.result as ArrayBuffer;

// //         // Dynamically load pdf.js dari CDN
// //         const pdfjsLib = await loadPdfJs();

// //         const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
// //         const pdf = await loadingTask.promise;

// //         let fullText = "";
// //         for (let i = 1; i <= pdf.numPages; i++) {
// //           const page = await pdf.getPage(i);
// //           const content = await page.getTextContent();
// //           const pageText = content.items
// //             .map((item: any) => item.str)
// //             .join(" ");
// //           fullText += pageText + "\n";
// //         }

// //         if (!fullText.trim()) {
// //           throw new Error("Tidak ada teks yang bisa diekstrak dari PDF. Pastikan PDF bukan hasil scan/gambar.");
// //         }

// //         resolve(cleanText(fullText));
// //       } catch (err) {
// //         reject(err);
// //       }
// //     };
// //     reader.onerror = () => reject(new Error("Gagal membaca file PDF"));
// //     reader.readAsArrayBuffer(file);
// //   });
// // }

// // // ─── Helper: load pdf.js dari CDN ────────────────────────────────────────────
// // function loadPdfJs(): Promise<any> {
// //   return new Promise((resolve, reject) => {
// //     if ((window as any).pdfjsLib) {
// //       resolve((window as any).pdfjsLib);
// //       return;
// //     }
// //     const script = document.createElement("script");
// //     script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
// //     script.onload = () => {
// //       const lib = (window as any).pdfjsLib;
// //       if (lib) {
// //         lib.GlobalWorkerOptions.workerSrc =
// //           "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
// //         resolve(lib);
// //       } else {
// //         reject(new Error("Gagal memuat pdf.js"));
// //       }
// //     };
// //     script.onerror = () => reject(new Error("Gagal memuat library PDF"));
// //     document.head.appendChild(script);
// //   });
// // }

// // // ─── Helper: read DOCX as plain text ─────────────────────────────────────────
// // async function readDocxAsText(file: File): Promise<string> {
// //   return new Promise((resolve, reject) => {
// //     const reader = new FileReader();
// //     reader.onload = async (e) => {
// //       try {
// //         const arrayBuffer = e.target?.result as ArrayBuffer;
// //         const uint8Array = new Uint8Array(arrayBuffer);
// //         const decoder = new TextDecoder("utf-8", { fatal: false });
// //         const raw = decoder.decode(uint8Array);

// //         // Ekstrak teks dari XML word/document.xml
// //         const xmlMatches = raw.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
// //         let text = xmlMatches
// //           .map(m => m.replace(/<[^>]+>/g, ""))
// //           .join(" ")
// //           .replace(/\s+/g, " ")
// //           .trim();

// //         if (text.length < 50) {
// //           // Fallback: ambil semua teks readable
// //           const allText = raw.match(/[A-Za-z0-9\u00C0-\u024F\u4e00-\u9fff\s\.\?\!\,\;\:\(\)\-\"\'\/\\%]+/g) || [];
// //           text = allText.filter(t => t.trim().length > 3).join(" ");
// //         }

// //         if (!text.trim()) {
// //           throw new Error("Tidak ada teks yang bisa dibaca dari file DOCX.");
// //         }

// //         resolve(cleanText(text));
// //       } catch (err) {
// //         reject(err);
// //       }
// //     };
// //     reader.onerror = () => reject(new Error("Gagal membaca file"));
// //     reader.readAsArrayBuffer(file);
// //   });
// // }

// // // ─── Helper: read TXT ────────────────────────────────────────────────────────
// // async function readTxtAsText(file: File): Promise<string> {
// //   return new Promise((resolve, reject) => {
// //     const reader = new FileReader();
// //     reader.onload = (e) => resolve(cleanText(e.target?.result as string));
// //     reader.onerror = () => reject(new Error("Gagal membaca file"));
// //     reader.readAsText(file, "utf-8");
// //   });
// // }

// // // ─── Helper: call OpenRouter AI untuk parse soal ──────────────────────────────
// // async function parseQuestionsWithAI(text: string): Promise<SoalItem[]> {
// //   //   const systemPrompt = `Kamu adalah parser soal ujian profesional yang sangat teliti.
// //   // Tugasmu adalah mengonversi SETIAP soal pilihan ganda dalam teks ke format JSON.

// //   // Aturan WAJIB:
// //   // 1. Output HANYA array JSON mentah. TIDAK ada markdown, TIDAK ada \`\`\`json, TIDAK ada teks lain.
// //   // 2. Konversi SEMUA soal yang ada — jangan ada yang terlewat.
// //   // 3. Field "jawaban" WAJIB berisi teks yang IDENTIK SAMA PERSIS dengan salah satu elemen di array "opsi".
// //   //    - Salin teks opsi yang benar ke field "jawaban" kata per kata, huruf per huruf.
// //   //    - Contoh: jika opsi = ["Rp70.000", "Rp80.000", "Rp90.000", "Rp100.000"] dan jawaban benar adalah opsi kedua, maka "jawaban": "Rp80.000"
// //   //    - Contoh: jika opsi = ["1 dan 2", "2 dan 3", "3 dan 4", "1 dan 4"] dan jawaban benar opsi kedua, maka "jawaban": "2 dan 3"
// //   //    - DILARANG menulis jawaban yang berbeda huruf besar/kecil, spasi, atau ejaan dari teks opsi.
// //   //    - DILARANG mengosongkan jawaban jika soal pilihan ganda — harus selalu ada.
// //   // 4. Verifikasi sebelum output: pastikan nilai "jawaban" === salah satu nilai di array "opsi". Jika tidak sama, perbaiki.
// //   // 5. Jika soal TIDAK memiliki opsi jawaban sama sekali, BUAT 4-5 opsi yang masuk akal berdasarkan konteks soal, lalu salin salah satunya ke "jawaban".
// //   // 6. Bersihkan semua notasi LaTeX menjadi teks biasa (misal: \\frac{a}{b} → a/b). Terapkan konsisten ke pertanyaan DAN semua opsi DAN jawaban.
// //   // 7. Opsi bisa sampai 5 (A, B, C, D, E).
// //   // 8. Hapus teks duplikat/repetisi dari pertanyaan dan opsi.`;
// //   const systemPrompt = `Kamu adalah parser soal ujian profesional yang sangat teliti.
// // Tugasmu adalah mengonversi SETIAP soal pilihan ganda dalam teks ke format JSON.

// // Aturan WAJIB:
// // 1. Output HANYA array JSON mentah. TIDAK ada markdown, TIDAK ada \`\`\`json, TIDAK ada teks lain.
// // 2. Konversi SEMUA soal yang ada — jangan ada yang terlewat.
// // 3. Field "jawaban" WAJIB berisi HURUF opsi yang benar: "A", "B", "C", "D", atau "E".
// //    - Tentukan huruf berdasarkan posisi dalam array "opsi".
// //    - Contoh: jika jawaban benar adalah opsi pertama → "jawaban": "A"
// //    - Contoh: jika jawaban benar adalah opsi ketiga → "jawaban": "C"
// //    - DILARANG mengisi dengan teks opsi.
// // 4. Verifikasi sebelum output:
// //    - Pastikan huruf jawaban sesuai dengan posisi opsi yang benar.
// // 5. Jika soal TIDAK memiliki opsi jawaban sama sekali, BUAT 4-5 opsi yang masuk akal berdasarkan konteks soal, lalu tentukan salah satunya sebagai jawaban dan isi dengan hurufnya.
// // 6. Bersihkan semua notasi LaTeX menjadi teks biasa (misal: \\frac{a}{b} → a/b). Terapkan konsisten ke pertanyaan DAN semua opsi.
// // 7. Opsi bisa sampai 5 (A, B, C, D, E).
// // 8. Hapus teks duplikat/repetisi dari pertanyaan dan opsi.`;

// //   const userPrompt = `Konversi SEMUA soal berikut ke dalam JSON array.

// // Format setiap elemen JSON:
// // {
// //   "no": <nomor soal integer>,
// //   "pertanyaan": "<teks soal bersih tanpa LaTeX>",
// //   "tipe": "pg",
// //   "opsi": ["<teks opsi A bersih>", "<teks opsi B bersih>", "<teks opsi C bersih>", "<teks opsi D bersih>", "<teks opsi E bersih>"],
// //   "jawaban": "<HURUF jawaban benar: A, B, C, D, atau E — BUKAN teks opsinya>",
// //   "topik": ""
// // }

// // Jika soal adalah essay (tidak ada pilihan), gunakan:
// // {
// //   "no": <nomor>,
// //   "pertanyaan": "<teks soal>",
// //   "tipe": "essay",
// //   "opsi": [],
// //   "jawaban": "",
// //   "topik": ""
// // }

// // ===SOAL===
// // ${text}
// // ===AKHIR SOAL===

// // Keluarkan HANYA array JSON. Mulai dengan [ dan akhiri dengan ].`;

// //   const response = await api.post("/ai/parse-soal", {
// //     method: "POST",
// //     headers: {
// //       "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //       model: OPENROUTER_MODEL,
// //       messages: [
// //         { role: "system", content: systemPrompt },
// //         { role: "user", content: userPrompt },
// //       ],
// //       temperature: 0,
// //       max_tokens: 12000,
// //     }),
// //   });

// //   if (!response.ok) {
// //     const err = await response.text();
// //     throw new Error(`OpenRouter error: ${err}`);
// //   }

// //   const data = await response.json();
// //   let content = data.choices?.[0]?.message?.content?.trim() || "[]";

// //   // Strip markdown fences jika ada
// //   content = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
// //   const match = content.match(/(\[[\s\S]*\])/);
// //   if (match) content = match[1];

// //   const parsed: any[] = JSON.parse(content);

// //   // return parsed.map((q, i) => ({
// //   //   id: `import_${Date.now()}_${i}`,
// //   //   pertanyaan: q.pertanyaan || q.question || "",
// //   //   tipe: (q.tipe === "essay" ? "essay" : "pg") as "pg" | "essay",
// //   //   opsi: Array.isArray(q.opsi) ? q.opsi.filter(Boolean) : [],
// //   //   jawaban: q.jawaban || q.correct_answer || "",
// //   //   topik: q.topik || "",
// //   // }));
// //   return parsed.map((q, i) => ({
// //     id: `import_${Date.now()}_${i}`,
// //     pertanyaan: q.pertanyaan || q.question || "",
// //     tipe: (q.tipe === "essay" ? "essay" : "pg") as "pg" | "essay",
// //     opsi: Array.isArray(q.opsi) ? q.opsi.filter(Boolean) : [],
// //     jawaban: q.jawaban?.trim().toUpperCase() || "", // pastikan huruf kapital
// //     topik: q.topik || "",
// //   }));
// // }

// // // ─── ImportSoalModal ──────────────────────────────────────────────────────────
// // function ImportSoalModal({
// //   onClose,
// //   onImport,
// // }: {
// //   onClose: () => void;
// //   onImport: (soalList: SoalItem[]) => void;
// // }) {
// //   const fileRef = useRef<HTMLInputElement>(null);
// //   const [file, setFile] = useState<File | null>(null);
// //   const [status, setStatus] = useState<"idle" | "reading" | "parsing" | "preview" | "error">("idle");
// //   const [errorMsg, setErrorMsg] = useState("");
// //   const [preview, setPreview] = useState<SoalItem[]>([]);
// //   const [selected, setSelected] = useState<Set<string>>(new Set());
// //   const [readingProgress, setReadingProgress] = useState("");

// //   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
// //     const f = e.target.files?.[0];
// //     if (!f) return;
// //     const ext = f.name.split(".").pop()?.toLowerCase();
// //     if (!["pdf", "docx", "txt"].includes(ext || "")) {
// //       setErrorMsg("Hanya file .pdf, .docx, atau .txt yang didukung.");
// //       setStatus("error");
// //       return;
// //     }
// //     setFile(f);
// //     setStatus("idle");
// //     setErrorMsg("");
// //     setPreview([]);
// //   }

// //   async function handleParse() {
// //     if (!file) return;
// //     setStatus("reading");
// //     setErrorMsg("");
// //     setReadingProgress("");
// //     try {
// //       const ext = file.name.split(".").pop()?.toLowerCase();
// //       let text = "";

// //       if (ext === "txt") {
// //         setReadingProgress("Membaca file teks...");
// //         text = await readTxtAsText(file);
// //       } else if (ext === "pdf") {
// //         setReadingProgress("Memuat library PDF...");
// //         text = await readPdfAsText(file);
// //       } else {
// //         setReadingProgress("Membaca file DOCX...");
// //         text = await readDocxAsText(file);
// //       }

// //       if (!text.trim()) throw new Error("Tidak ada teks yang bisa dibaca dari file.");

// //       setStatus("parsing");
// //       setReadingProgress("AI sedang menganalisis soal...");
// //       const soalList = await parseQuestionsWithAI(text);
// //       if (!soalList.length) throw new Error("Tidak ada soal yang berhasil diparse. Pastikan format soal sesuai.");
// //       setPreview(soalList);
// //       setSelected(new Set(soalList.map(s => s.id)));
// //       setStatus("preview");
// //     } catch (err) {
// //       setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
// //       setStatus("error");
// //     }
// //   }

// //   function toggleSelect(id: string) {
// //     setSelected(prev => {
// //       const next = new Set(prev);
// //       if (next.has(id)) next.delete(id);
// //       else next.add(id);
// //       return next;
// //     });
// //   }

// //   function handleImport() {
// //     const toImport = preview.filter(s => selected.has(s.id));
// //     onImport(toImport);
// //     onClose();
// //   }

// //   const extIcon = file?.name.split(".").pop()?.toLowerCase();

// //   return (
// //     <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center">
// //       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
// //       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
// //         {/* Header */}
// //         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
// //           <div className="flex items-center gap-3">
// //             <div className="w-9 h-9 bg-violet-50 border border-violet-200 rounded-xl flex items-center justify-center">
// //               <FileUp className="w-4 h-4 text-violet-600" />
// //             </div>
// //             <div>
// //               <h3 className="text-base font-bold text-zinc-900">Import Soal</h3>
// //               <p className="text-[11px] text-slate-400">Upload file .pdf, .docx, atau .txt berisi soal</p>
// //             </div>
// //           </div>
// //           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
// //             <X className="w-4 h-4" />
// //           </button>
// //         </div>

// //         <div className="flex-1 overflow-y-auto p-5 space-y-4">
// //           {/* Upload area */}
// //           {status !== "preview" && (
// //             <div>
// //               <button
// //                 type="button"
// //                 onClick={() => fileRef.current?.click()}
// //                 className="w-full border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center gap-3 hover:bg-slate-50 hover:border-violet-300 transition-all group"
// //               >
// //                 <div className="w-12 h-12 rounded-xl bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
// //                   <FileUp className="w-5 h-5 text-violet-500" />
// //                 </div>
// //                 <div className="text-center">
// //                   <p className="text-[13px] font-semibold text-zinc-700">
// //                     {file ? file.name : "Klik untuk upload file soal"}
// //                   </p>
// //                   <p className="text-[11px] text-slate-400 mt-0.5">
// //                     {file
// //                       ? `${(file.size / 1024).toFixed(1)} KB · ${file.name.split(".").pop()?.toUpperCase()}`
// //                       : "Format: .pdf, .docx, atau .txt"}
// //                   </p>
// //                 </div>
// //               </button>
// //               <input
// //                 ref={fileRef}
// //                 type="file"
// //                 accept=".pdf,.docx,.txt"
// //                 className="hidden"
// //                 onChange={handleFileChange}
// //               />
// //             </div>
// //           )}

// //           {/* Format badges */}
// //           {status === "idle" && !file && (
// //             <div className="flex items-center gap-2 flex-wrap">
// //               {[
// //                 { ext: "PDF", color: "bg-red-50 text-red-600 border-red-200", desc: "Teks native (bukan scan)" },
// //                 { ext: "DOCX", color: "bg-blue-50 text-blue-600 border-blue-200", desc: "Word Document" },
// //                 { ext: "TXT", color: "bg-slate-50 text-slate-600 border-slate-200", desc: "Plain Text" },
// //               ].map(f => (
// //                 <span key={f.ext} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold ${f.color}`}>
// //                   <FileText className="w-3 h-3" /> {f.ext}
// //                   <span className="font-normal opacity-70">· {f.desc}</span>
// //                 </span>
// //               ))}
// //             </div>
// //           )}

// //           {/* Info box */}
// //           {status === "idle" && (
// //             <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
// //               <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
// //               <div className="text-[11px] text-blue-700 space-y-1">
// //                 <p className="font-semibold">Tips format soal:</p>
// //                 <p>• Nomor soal diikuti titik atau kurung: <strong>1.</strong> atau <strong>1)</strong></p>
// //                 <p>• Opsi dengan huruf: <strong>a.</strong> <strong>b.</strong> dst (hingga e)</p>
// //                 <p>• Kunci jawaban: <strong>Jawaban: B</strong> atau <strong>Kunci: C</strong></p>
// //                 <p>• PDF harus teks native (bukan foto/scan)</p>
// //               </div>
// //             </div>
// //           )}

// //           {/* Error */}
// //           {status === "error" && (
// //             <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-[12px] text-red-600">
// //               <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMsg}
// //             </div>
// //           )}

// //           {/* Loading states */}
// //           {(status === "reading" || status === "parsing") && (
// //             <div className="flex flex-col items-center gap-3 py-8">
// //               <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
// //               <p className="text-[13px] font-semibold text-zinc-700">
// //                 {status === "reading" ? "Membaca file..." : "AI sedang memparse soal..."}
// //               </p>
// //               <p className="text-[11px] text-slate-400">{readingProgress}</p>
// //               {status === "parsing" && (
// //                 <p className="text-[11px] text-slate-400">Proses ini bisa memakan 10–30 detik</p>
// //               )}
// //             </div>
// //           )}

// //           {/* Preview */}
// //           {status === "preview" && (
// //             <div className="space-y-3">
// //               <div className="flex items-center justify-between">
// //                 <p className="text-[13px] font-bold text-zinc-900">
// //                   {preview.length} soal berhasil diparse
// //                 </p>
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={() => setSelected(new Set(preview.map(s => s.id)))}
// //                     className="text-[11px] font-semibold text-emerald-600 hover:underline"
// //                   >
// //                     Pilih semua
// //                   </button>
// //                   <span className="text-slate-300">·</span>
// //                   <button
// //                     onClick={() => setSelected(new Set())}
// //                     className="text-[11px] font-semibold text-red-500 hover:underline"
// //                   >
// //                     Hapus semua
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="border border-slate-200 rounded-[14px] overflow-hidden divide-y divide-slate-50">
// //                 {preview.map((s, i) => (
// //                   <div
// //                     key={s.id}
// //                     onClick={() => toggleSelect(s.id)}
// //                     className={`px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors ${selected.has(s.id) ? "bg-violet-50/50" : "hover:bg-slate-50"}`}
// //                   >
// //                     <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${selected.has(s.id) ? "bg-violet-600 border-violet-600" : "border-slate-300"}`}>
// //                       {selected.has(s.id) && <Check className="w-3 h-3 text-white" />}
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <p className="text-[12px] font-medium text-zinc-900">
// //                         <span className="text-slate-400 mr-1">{i + 1}.</span>
// //                         {s.pertanyaan}
// //                       </p>
// //                       {s.tipe === "pg" && s.opsi.length > 0 && (
// //                         <div className="mt-1 flex flex-wrap gap-1">
// //                           {s.opsi.map((o, oi) => (
// //                             <span
// //                               key={oi}
// //                               className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${s.jawaban === String.fromCharCode(65 + oi) ? "bg-emerald-100 text-emerald-700 font-bold" : "bg-slate-100 text-slate-600"}`}
// //                             >
// //                               {String.fromCharCode(65 + oi)}. {o}
// //                             </span>
// //                           ))}
// //                         </div>
// //                       )}
// //                       {s.jawaban && (
// //                         <p className="text-[10px] text-emerald-600 mt-1 font-semibold">✓ {s.jawaban}</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               <button
// //                 onClick={() => { setFile(null); setPreview([]); setStatus("idle"); }}
// //                 className="text-[11px] font-semibold text-slate-500 hover:text-zinc-700 underline"
// //               >
// //                 ← Upload file lain
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {/* Footer */}
// //         <div className="p-5 border-t border-slate-100 shrink-0 flex gap-3">
// //           <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">
// //             Batal
// //           </button>
// //           {status === "idle" && file && (
// //             <button
// //               onClick={handleParse}
// //               className="flex-1 h-10 bg-violet-600 text-white rounded-xl text-[13px] font-bold hover:bg-violet-700 flex items-center justify-center gap-2"
// //             >
// //               <Zap className="w-4 h-4" /> Parse dengan AI
// //             </button>
// //           )}
// //           {status === "preview" && (
// //             <button
// //               onClick={handleImport}
// //               disabled={selected.size === 0}
// //               className="flex-1 h-10 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 flex items-center justify-center gap-2 disabled:opacity-40"
// //             >
// //               <Plus className="w-4 h-4" /> Tambahkan {selected.size} Soal
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // // ─── SoalImageUpload ──────────────────────────────────────────────────────────
// // // function SoalImageUpload({ value, onChange }: { value?: string; onChange: (v?: string) => void }) {
// // //   const fileRef = useRef<HTMLInputElement>(null);

// // //   function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
// // //     const file = e.target.files?.[0];
// // //     if (!file) return;
// // //     if (file.size > 5 * 1024 * 1024) { alert("Maks 5MB"); return; }

// // //     // ← Gunakan object URL, bukan base64
// // //     // Object URL tidak bisa disimpan ke sessionStorage, tapi aman untuk ditampilkan
// // //     const objectUrl = URL.createObjectURL(file);
// // //     onChange(objectUrl);
// // //   }

// // //   return (
// // //     <div>
// // //       <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
// // //         Gambar Soal <span className="text-slate-400 font-normal">(opsional)</span>
// // //       </label>
// // //       {value ? (
// // //         <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
// // //           <img src={value} alt="" className="w-full max-h-48 object-contain" />
// // //           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
// // //             <button type="button" onClick={() => fileRef.current?.click()} className="h-8 px-3 bg-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 shadow">
// // //               <Upload className="w-3.5 h-3.5" /> Ganti
// // //             </button>
// // //             <button type="button" onClick={() => onChange(undefined)} className="h-8 px-3 bg-red-500 rounded-lg text-[11px] font-semibold text-white flex items-center gap-1.5 shadow">
// // //               <Trash2 className="w-3.5 h-3.5" /> Hapus
// // //             </button>
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         <button
// // //           type="button"
// // //           onClick={() => fileRef.current?.click()}
// // //           className="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all group"
// // //         >
// // //           <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
// // //             <ImageIcon className="w-4 h-4 text-slate-400" />
// // //           </div>
// // //           <div className="text-center">
// // //             <p className="text-[12px] font-semibold text-slate-500">Klik untuk upload gambar</p>
// // //             <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, GIF · Maks 5MB</p>
// // //           </div>
// // //         </button>
// // //       )}
// // //       <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
// // //     </div>
// // //   );
// // // }
// // // D:\Project\sistem-sekolah\sistem-penilaian-siswa\frontend\app\admin\mata-pelajaran\page.tsx
// // // Ganti fungsi SoalImageUpload dengan ini:

// // function SoalImageUpload({ value, onChange }: { value?: string; onChange: (v?: string) => void }) {
// //   const fileRef = useRef<HTMLInputElement>(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [uploadError, setUploadError] = useState("");

// //   async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
// //     if (!allowedTypes.includes(file.type)) {
// //       setUploadError("Format tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.");
// //       return;
// //     }
// //     if (file.size > 5 * 1024 * 1024) {
// //       setUploadError("Ukuran file terlalu besar. Maksimal 5MB.");
// //       return;
// //     }

// //     setUploadError("");
// //     setUploading(true);

// //     try {
// //       const token = getToken();
// //       const formData = new FormData();
// //       formData.append("file", file);

// //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
// //         method: "POST",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           // Jangan set Content-Type — biarkan browser set multipart boundary otomatis
// //         },
// //         body: formData,
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || "Upload gagal");

// //       onChange(data.url); // URL Cloudinary (https://...)
// //     } catch (err) {
// //       setUploadError(err instanceof Error ? err.message : "Upload gagal");
// //     } finally {
// //       setUploading(false);
// //       // Reset input agar file yang sama bisa diupload ulang
// //       if (fileRef.current) fileRef.current.value = "";
// //     }
// //   }

// //   return (
// //     <div>
// //       <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
// //         Gambar Soal <span className="text-slate-400 font-normal">(opsional)</span>
// //       </label>

// //       {uploadError && (
// //         <div className="mb-2 p-2 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-[11px] text-red-600">
// //           <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {uploadError}
// //         </div>
// //       )}

// //       {value ? (
// //         <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
// //           <img src={value} alt="" className="w-full max-h-48 object-contain" />
// //           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
// //             <button
// //               type="button"
// //               onClick={() => fileRef.current?.click()}
// //               disabled={uploading}
// //               className="h-8 px-3 bg-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 shadow"
// //             >
// //               {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
// //               {uploading ? "Mengupload..." : "Ganti"}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => onChange(undefined)}
// //               disabled={uploading}
// //               className="h-8 px-3 bg-red-500 rounded-lg text-[11px] font-semibold text-white flex items-center gap-1.5 shadow"
// //             >
// //               <Trash2 className="w-3.5 h-3.5" /> Hapus
// //             </button>
// //           </div>
// //         </div>
// //       ) : (
// //         <button
// //           type="button"
// //           onClick={() => fileRef.current?.click()}
// //           disabled={uploading}
// //           className="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all group disabled:opacity-60"
// //         >
// //           <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
// //             {uploading ? (
// //               <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
// //             ) : (
// //               <ImageIcon className="w-4 h-4 text-slate-400" />
// //             )}
// //           </div>
// //           <div className="text-center">
// //             <p className="text-[12px] font-semibold text-slate-500">
// //               {uploading ? "Mengupload ke Cloudinary..." : "Klik untuk upload gambar"}
// //             </p>
// //             <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, GIF · Maks 5MB</p>
// //           </div>
// //         </button>
// //       )}

// //       <input
// //         ref={fileRef}
// //         type="file"
// //         accept="image/jpeg,image/png,image/webp,image/gif"
// //         className="hidden"
// //         onChange={handleFile}
// //       />
// //     </div>
// //   );
// // }

// // function isSoalLiveValid(pertanyaan: string) {
// //   return pertanyaan.trim().length > 0;
// // }

// // // ─── Default opsi (5 item A-E) ───────────────────────────────────────────────
// // const DEFAULT_OPSI = ["", "", "", "", ""];

// // // ─── KkmField ────────────────────────────────────────────────────────────────
// // function KkmField({ kkm, setKkm }: { kkm: number; setKkm: (v: number) => void }) {
// //   const [editing, setEditing] = useState(false);
// //   const [tempVal, setTempVal] = useState(String(kkm));
// //   const inputRef = useRef<HTMLInputElement>(null);

// //   function startEdit() {
// //     setTempVal(String(kkm));
// //     setEditing(true);
// //     setTimeout(() => inputRef.current?.select(), 0);
// //   }

// //   function commit() {
// //     const parsed = parseInt(tempVal);
// //     if (!isNaN(parsed) && parsed > 0 && parsed <= 100) setKkm(parsed);
// //     setEditing(false);
// //   }

// //   return (
// //     <div className="flex items-center gap-2">
// //       <label className="text-[12px] font-semibold text-slate-600">KKM:</label>
// //       {editing ? (
// //         <input
// //           ref={inputRef}
// //           type="number"
// //           value={tempVal}
// //           onChange={e => setTempVal(e.target.value)}
// //           onBlur={commit}
// //           onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
// //           autoFocus
// //           className="w-16 h-9 text-center border-[1.5px] border-zinc-900 rounded-lg text-[13px] font-semibold text-zinc-900 bg-white outline-none focus:ring-2 focus:ring-zinc-900/20"
// //         />
// //       ) : (
// //         <button
// //           onDoubleClick={startEdit}
// //           title="Klik 2x untuk ubah KKM"
// //           className="w-16 h-9 text-center border-[1.5px] border-slate-200 rounded-lg text-[13px] font-semibold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none"
// //         >
// //           {kkm}
// //         </button>
// //       )}
// //       {!editing && <span className="text-[10px] text-slate-400 hidden sm:inline">klik 2x untuk ubah</span>}
// //     </div>
// //   );
// // }

// // // ─── KkmInline ────────────────────────────────────────────────────────────────
// // function KkmInline({ kkmModal, setKkmModal }: { kkmModal: number; setKkmModal: (v: number) => void }) {
// //   const [editingKkm, setEditingKkm] = useState(false);
// //   const [tempKkm, setTempKkm] = useState(String(kkmModal));
// //   const ref = useRef<HTMLInputElement>(null);

// //   useEffect(() => {
// //     if (!editingKkm) setTempKkm(String(kkmModal));
// //   }, [kkmModal, editingKkm]);

// //   function commit() {
// //     const v = parseInt(tempKkm);
// //     if (!isNaN(v) && v > 0 && v <= 100) setKkmModal(v);
// //     setEditingKkm(false);
// //   }

// //   return (
// //     <div className="flex items-center gap-1.5">
// //       <span className="text-[11px] text-slate-400">KKM:</span>
// //       {editingKkm ? (
// //         <input
// //           ref={ref}
// //           type="number"
// //           value={tempKkm}
// //           autoFocus
// //           onChange={e => setTempKkm(e.target.value)}
// //           onBlur={commit}
// //           onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditingKkm(false); }}
// //           className="w-14 h-6 text-center border-[1.5px] border-zinc-900 rounded-md text-[11px] font-bold text-zinc-900 bg-white outline-none"
// //         />
// //       ) : (
// //         <button
// //           onDoubleClick={() => { setTempKkm(String(kkmModal)); setEditingKkm(true); setTimeout(() => ref.current?.select(), 0); }}
// //           title="Klik 2x untuk ubah KKM"
// //           className="min-w-[2rem] h-6 px-2 border-[1.5px] border-slate-200 rounded-md text-[11px] font-bold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none"
// //         >
// //           {kkmModal}
// //         </button>
// //       )}
// //       {!editingKkm && <span className="text-[10px] text-slate-300 hidden sm:inline">klik 2×</span>}
// //     </div>
// //   );
// // }

// // // ─── HasilUjianModal ──────────────────────────────────────────────────────────
// // function HasilUjianModal({ ujian, onClose }: { ujian: Ujian; onClose: () => void }) {
// //   const [loading, setLoading] = useState(true);
// //   const [data, setData] = useState<HasilUjian | null>(null);
// //   const [error, setError] = useState("");
// //   const [kkmModal, setKkmModal] = useState<number>(() => {
// //     try { const saved = sessionStorage.getItem(`kkm_hasil_${ujian.id}`); return saved ? parseInt(saved) : 70; } catch { return 70; }
// //   });

// //   useEffect(() => {
// //     try { sessionStorage.setItem(`kkm_hasil_${ujian.id}`, String(kkmModal)); } catch (_) { }
// //   }, [kkmModal, ujian.id]);

// //   const [filter, setFilter] = useState("all");
// //   const [sort, setSort] = useState("nama");
// //   const [dir, setDir] = useState<"asc" | "desc">("asc");
// //   const [selectedNisn, setSelectedNisn] = useState<string | null>(null);
// //   const [detailData, setDetailData] = useState<any | null>(null);
// //   const [detailLoading, setDetailLoading] = useState(false);

// //   useEffect(() => {
// //     async function fetchHasil() {
// //       setLoading(true);
// //       try {
// //         const res = await api.get<HasilUjian>(`/ujian/${ujian.id}/laporan`);
// //         setData(res as HasilUjian);
// //       } catch { setError("Gagal memuat data hasil ujian"); }
// //       finally { setLoading(false); }
// //     }
// //     fetchHasil();
// //   }, [ujian.id]);

// //   const siswaWithKkm = useMemo(() => {
// //     if (!data) return [];
// //     return data.siswa.map(s => ({ ...s, lulus: s.nilai >= kkmModal }));
// //   }, [data, kkmModal]);

// //   const recomputedSummary = useMemo(() => {
// //     if (!data) return null;
// //     return { ...data.summary, lulus: siswaWithKkm.filter(s => s.lulus).length, gagal: siswaWithKkm.filter(s => !s.lulus).length };
// //   }, [data, siswaWithKkm]);

// //   const filteredSiswa = useMemo(() => {
// //     let list = [...siswaWithKkm];
// //     if (filter === "lulus") list = list.filter(s => s.lulus);
// //     else if (filter === "gagal") list = list.filter(s => !s.lulus);
// //     else if (filter === "viol") list = list.filter(s => s.pelanggaran > 0);
// //     list.sort((a, b) => {
// //       const va = (a as any)[sort], vb = (b as any)[sort];
// //       if (typeof va === "string") return dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
// //       return dir === "asc" ? va - vb : vb - va;
// //     });
// //     return list;
// //   }, [siswaWithKkm, filter, sort, dir]);

// //   async function fetchDetailSiswa(nisn: string) {
// //     setDetailLoading(true); setSelectedNisn(nisn);
// //     try { const res = await api.get(`/ujian/${ujian.id}/laporan/siswa/${nisn}`); setDetailData(res); }
// //     catch { setDetailData(null); }
// //     finally { setDetailLoading(false); }
// //   }

// //   function toggleSort(key: string) {
// //     if (sort === key) setDir(d => d === "asc" ? "desc" : "asc");
// //     else { setSort(key); setDir("asc"); }
// //   }

// //   const SortIcon = ({ col }: { col: string }) => (
// //     <span className={`ml-0.5 text-[9px] ${sort === col ? "text-zinc-900" : "text-slate-300"}`}>
// //       {sort === col ? (dir === "asc" ? "↑" : "↓") : "↕"}
// //     </span>
// //   );

// //   function handleExport() {
// //     if (!data || !recomputedSummary) return;
// //     exportToExcel({ ...data, siswa: siswaWithKkm, summary: recomputedSummary }, ujian.nama);
// //   }

// //   return (
// //     <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center">
// //       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
// //       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-4xl shadow-2xl z-10 max-h-[95vh] flex flex-col">
// //         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
// //           <div>
// //             <h3 className="text-base font-bold text-zinc-900">Hasil Ujian</h3>
// //             <p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             {data && !selectedNisn && (
// //               <button onClick={handleExport} className="inline-flex items-center gap-1.5 h-8 px-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-semibold hover:bg-emerald-100 transition-colors">
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
// //                 </svg>
// //                 Export Excel
// //               </button>
// //             )}
// //             <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// //           </div>
// //         </div>
// //         <div className="flex-1 overflow-y-auto">
// //           {selectedNisn && (
// //             <div className="border-b border-slate-100 bg-slate-50">
// //               <div className="p-4 flex items-center gap-2">
// //                 <button onClick={() => { setSelectedNisn(null); setDetailData(null); }} className="p-1.5 rounded-lg hover:bg-white border border-slate-200 text-slate-500"><ArrowLeft className="w-3.5 h-3.5" /></button>
// //                 <p className="text-[13px] font-bold text-zinc-900">Detail Jawaban Siswa</p>
// //               </div>
// //               {detailLoading ? (
// //                 <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-slate-400" /></div>
// //               ) : detailData ? (
// //                 <div className="px-4 pb-4 space-y-3">
// //                   <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap gap-4">
// //                     {[
// //                       { label: "Nama", val: detailData.siswa?.nama },
// //                       { label: "NISN", val: detailData.siswa?.nisn },
// //                       { label: "Kelas", val: detailData.siswa?.kelas },
// //                     ].map(item => (
// //                       <div key={item.label}>
// //                         <p className="text-[10px] text-slate-400 font-semibold uppercase">{item.label}</p>
// //                         <p className="text-[13px] font-bold text-zinc-900">{item.val}</p>
// //                       </div>
// //                     ))}
// //                     <div>
// //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Nilai</p>
// //                       <p className={`text-[18px] font-black ${(detailData.siswa?.nilai ?? 0) >= kkmModal ? "text-emerald-600" : "text-red-600"}`}>{detailData.siswa?.nilai}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-[10px] text-slate-400 font-semibold uppercase">Status</p>
// //                       {(detailData.siswa?.nilai ?? 0) >= kkmModal
// //                         ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
// //                         : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>}
// //                     </div>
// //                   </div>
// //                   <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
// //                     <div className="px-4 py-3 border-b border-slate-100 bg-slate-50"><p className="text-[12px] font-bold text-zinc-900">Rincian Jawaban</p></div>
// //                     <div className="divide-y divide-slate-50">
// //                       {(detailData.jawaban || []).map((j: any) => (
// //                         <div key={j.nomorSoal} className={`px-4 py-3 flex items-start gap-3 ${j.isBenar ? "bg-emerald-50/30" : "bg-red-50/30"}`}>
// //                           <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${j.isBenar ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{j.nomorSoal}</span>
// //                           <div className="flex-1 min-w-0">
// //                             <p className="text-[12px] text-zinc-800 mb-1">{j.pertanyaan}</p>
// //                             <div className="flex items-center gap-3 flex-wrap">
// //                               <span className="text-[11px] text-slate-500">Jawaban: <strong className={j.isBenar ? "text-emerald-600" : "text-red-500"}>{j.jawabanSiswa ?? "—"}</strong></span>
// //                               {!j.isBenar && <span className="text-[11px] text-slate-500">Benar: <strong className="text-emerald-600">{j.jawabanBenar}</strong></span>}
// //                               {j.isRagu && <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">⚑ Ragu</span>}
// //                             </div>
// //                           </div>
// //                           <div className="flex-shrink-0">{j.isBenar ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-400" />}</div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div className="px-4 pb-4 text-center py-6 text-[12px] text-slate-400">Gagal memuat detail</div>
// //               )}
// //             </div>
// //           )}
// //           {!selectedNisn && (
// //             <div className="p-5 space-y-4">
// //               {error && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[12px] text-red-600 flex items-center gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}</div>}
// //               {loading ? (
// //                 <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>
// //               ) : data && recomputedSummary ? (
// //                 <>
// //                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
// //                     {[
// //                       { label: "Total Peserta", val: recomputedSummary.totalSiswa, color: "#18181b", icon: <Users className="w-3.5 h-3.5" /> },
// //                       { label: "Rata-rata Nilai", val: recomputedSummary.rataRata, color: "#2563eb", icon: <BarChart2 className="w-3.5 h-3.5" /> },
// //                       { label: "Tertinggi", val: recomputedSummary.tertinggi, color: "#059669", icon: <TrendingUp className="w-3.5 h-3.5" /> },
// //                       { label: "Terendah", val: recomputedSummary.terendah, color: "#dc2626", icon: <TrendingUp className="w-3.5 h-3.5 rotate-180" /> },
// //                       { label: "Lulus", val: recomputedSummary.lulus, color: "#059669", icon: <CheckCircle className="w-3.5 h-3.5" /> },
// //                       { label: "Tidak Lulus", val: recomputedSummary.gagal, color: "#dc2626", icon: <AlertCircle className="w-3.5 h-3.5" /> },
// //                     ].map(s => (
// //                       <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
// //                         <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>{s.icon}</div>
// //                         <div><p className="text-lg font-bold text-zinc-900">{s.val}</p><p className="text-[10px] text-slate-400">{s.label}</p></div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                   <div className="flex gap-2 flex-wrap items-center justify-between">
// //                     <div className="flex gap-2 flex-wrap">
// //                       {[
// //                         { val: "all", label: "Semua" },
// //                         { val: "lulus", label: "Lulus" },
// //                         { val: "gagal", label: "Tidak Lulus" },
// //                         { val: "viol", label: "Ada Pelanggaran" },
// //                       ].map(f => (
// //                         <button key={f.val} onClick={() => setFilter(f.val)} className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${filter === f.val ? "bg-zinc-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
// //                           {f.label}
// //                           {f.val !== "all" && <span className="ml-1.5 opacity-60">({f.val === "lulus" ? recomputedSummary.lulus : f.val === "gagal" ? recomputedSummary.gagal : siswaWithKkm.filter(s => s.pelanggaran > 0).length})</span>}
// //                         </button>
// //                       ))}
// //                     </div>
// //                     <span className="text-[11px] text-slate-400">{filteredSiswa.length} ditampilkan</span>
// //                   </div>
// //                   {filteredSiswa.length === 0 ? (
// //                     <div className="text-center py-12">
// //                       <Users className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// //                       <p className="text-[13px] text-slate-400">{filter === "all" ? "Belum ada peserta yang menyelesaikan ujian ini" : "Tidak ada siswa yang sesuai filter ini"}</p>
// //                     </div>
// //                   ) : (
// //                     <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
// //                       <div className="overflow-x-auto">
// //                         <table className="w-full" style={{ minWidth: "600px" }}>
// //                           <thead className="border-b border-slate-100 bg-slate-50/50">
// //                             <tr>
// //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
// //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700" onClick={() => toggleSort("nama")}>Nama <SortIcon col="nama" /></th>
// //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Kelas</th>
// //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700" onClick={() => toggleSort("nilai")}>Nilai <SortIcon col="nilai" /></th>
// //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell" onClick={() => toggleSort("benar")}>Benar <SortIcon col="benar" /></th>
// //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell" onClick={() => toggleSort("salah")}>Salah <SortIcon col="salah" /></th>
// //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
// //                               <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden sm:table-cell" onClick={() => toggleSort("pelanggaran")}>Pelang. <SortIcon col="pelanggaran" /></th>
// //                               <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Detail</th>
// //                             </tr>
// //                           </thead>
// //                           <tbody className="divide-y divide-slate-50">
// //                             {filteredSiswa.map((s, i) => {
// //                               const nilaiColor = s.nilai >= 90 ? "#059669" : s.nilai >= 80 ? "#10b981" : s.nilai >= 70 ? "#2563eb" : "#dc2626";
// //                               return (
// //                                 <tr key={s.nisn} className="hover:bg-slate-50/50">
// //                                   <td className="px-4 py-3 text-[11px] text-slate-400 font-semibold">{i + 1}</td>
// //                                   <td className="px-4 py-3"><p className="font-semibold text-zinc-900 text-[12px]">{s.nama}</p><p className="text-[10px] text-slate-400">{s.nisn}</p></td>
// //                                   <td className="px-4 py-3 text-[12px] text-slate-500 hidden sm:table-cell">{s.kelas}</td>
// //                                   <td className="px-4 py-3"><span className="text-[15px] font-black" style={{ color: nilaiColor }}>{s.nilai}</span></td>
// //                                   <td className="px-4 py-3 hidden md:table-cell"><span className="text-[12px] font-semibold text-emerald-600">{s.benar}</span></td>
// //                                   <td className="px-4 py-3 hidden md:table-cell"><span className="text-[12px] font-semibold text-red-500">{s.salah}</span></td>
// //                                   <td className="px-4 py-3">{s.lulus ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span> : <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">GAGAL</span>}</td>
// //                                   <td className="px-4 py-3 hidden sm:table-cell">{s.pelanggaran > 0 ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">{s.pelanggaran}x</span> : <span className="text-[11px] text-slate-300">—</span>}</td>
// //                                   <td className="px-4 py-3 text-right"><button onClick={() => fetchDetailSiswa(s.nisn)} className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors">Lihat</button></td>
// //                                 </tr>
// //                               );
// //                             })}
// //                           </tbody>
// //                         </table>
// //                       </div>
// //                       <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
// //                         <span className="text-[11px] text-slate-400">{filteredSiswa.length} peserta</span>
// //                         <KkmInline kkmModal={kkmModal} setKkmModal={setKkmModal} />
// //                       </div>
// //                     </div>
// //                   )}
// //                 </>
// //               ) : null}
// //             </div>
// //           )}
// //         </div>
// //         <div className="p-5 border-t border-slate-100 shrink-0">
// //           <button onClick={onClose} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── SoalForm (shared between AddContentModal & KelolaSoalModal) ─────────────
// // function SoalForm({
// //   soalPertanyaan, setSoalPertanyaan,
// //   soalTipe, setSoalTipe,
// //   soalTopik, setSoalTopik,
// //   soalOpsi, setSoalOpsi,
// //   soalJawaban, setSoalJawaban,
// //   soalGambar, setSoalGambar,
// //   editingId,
// //   soalListLength,
// //   soalList,
// //   onAdd,
// //   onCancelEdit,
// //   radioName,
// // }: {
// //   soalPertanyaan: string; setSoalPertanyaan: (v: string) => void;
// //   soalTipe: "pg" | "essay"; setSoalTipe: (v: "pg" | "essay") => void;
// //   soalTopik: string; setSoalTopik: (v: string) => void;
// //   soalOpsi: string[]; setSoalOpsi: (v: string[]) => void;
// //   soalJawaban: string; setSoalJawaban: (v: string) => void;
// //   soalGambar?: string; setSoalGambar: (v?: string) => void;
// //   editingId: string | null;
// //   soalListLength: number;
// //   soalList: SoalItem[];
// //   onAdd: () => void;
// //   onCancelEdit: () => void;
// //   radioName: string;
// // }) {
// //   const liveIsValid = isSoalLiveValid(soalPertanyaan);

// //   return (
// //     <div className={`border rounded-[14px] p-4 space-y-3 ${editingId ? "border-amber-200 bg-amber-50/50" : liveIsValid ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 bg-slate-50/50"}`}>
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center gap-2">
// //           <h4 className="font-semibold text-zinc-900 text-[13px]">
// //             {editingId ? `✏️ Edit Soal #${soalList.findIndex(s => s.id === editingId) + 1}` : `Soal #${soalListLength + 1}`}
// //           </h4>
// //           {liveIsValid && !editingId && (
// //             <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">
// //               <Check className="w-2.5 h-2.5" /> Akan disimpan
// //             </span>
// //           )}
// //         </div>
// //         {editingId && (
// //           <button onClick={onCancelEdit} className="text-[11px] text-slate-500 hover:text-zinc-900 underline">Batal edit</button>
// //         )}
// //       </div>
// //       <div>
// //         <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Pertanyaan <span className="text-red-500">*</span></label>
// //         <textarea
// //           value={soalPertanyaan}
// //           onChange={e => setSoalPertanyaan(e.target.value)}
// //           rows={2}
// //           placeholder="Tuliskan pertanyaan soal di sini..."
// //           className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white"
// //         />
// //       </div>
// //       <SoalImageUpload value={soalGambar} onChange={setSoalGambar} />
// //       <div className="grid grid-cols-2 gap-3">
// //         <div>
// //           <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Tipe Soal</label>
// //           <select value={soalTipe} onChange={e => setSoalTipe(e.target.value as "pg" | "essay")} className="w-full h-9 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-700 focus:outline-none bg-white">
// //             <option value="pg">Pilihan Ganda</option>
// //             <option value="essay">Essay</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Topik</label>
// //           <input type="text" value={soalTopik} onChange={e => setSoalTopik(e.target.value)} placeholder="e.g. Limit Fungsi"
// //             className="w-full h-9 px-3 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white" />
// //         </div>
// //       </div>
// //       {/* {soalTipe === "pg" && (
// //         <div className="space-y-2">
// //           <label className="text-[11px] font-semibold text-slate-500 block">Opsi Jawaban A–E <span className="text-slate-400 font-normal">(radio = jawaban benar)</span></label>
// //           {soalOpsi.map((opsi, i) => (
// //             <div key={i} className="flex items-center gap-2">
// //               <span className="w-6 h-6 rounded-full border-[1.5px] border-slate-200 bg-white text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
// //                 {String.fromCharCode(65 + i)}
// //               </span>
// //               <input
// //                 type="text"
// //                 value={opsi}
// //                 onChange={e => { const next = [...soalOpsi]; next[i] = e.target.value; setSoalOpsi(next); }}
// //                 placeholder={`Opsi ${String.fromCharCode(65 + i)}`}
// //                 className="flex-1 h-8 px-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white"
// //               />
// //               <input
// //                 type="radio"
// //                 name={radioName}
// //                 checked={soalJawaban === opsi && opsi !== ""}
// //                 onChange={() => setSoalJawaban(opsi)}
// //                 className="flex-shrink-0 accent-emerald-600"
// //               />
// //             </div>
// //           ))}
// //           {soalJawaban && <p className="text-[10px] text-emerald-600 font-medium">✓ Jawaban benar: {soalJawaban}</p>}
// //         </div>
// //       )} */}
// //       {soalTipe === "pg" && (
// //         <div className="space-y-2">
// //           <label className="text-[11px] font-semibold text-slate-500 block">
// //             Opsi Jawaban A–E <span className="text-slate-400 font-normal">(radio = jawaban benar)</span>
// //           </label>
// //           {soalOpsi.map((opsi, i) => {
// //             const huruf = String.fromCharCode(65 + i); // A, B, C, D, E
// //             return (
// //               <div key={i} className="flex items-center gap-2">
// //                 <span className="w-6 h-6 rounded-full border-[1.5px] border-slate-200 bg-white text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
// //                   {huruf}
// //                 </span>
// //                 <input
// //                   type="text"
// //                   value={opsi}
// //                   onChange={e => {
// //                     const next = [...soalOpsi];
// //                     next[i] = e.target.value;
// //                     setSoalOpsi(next);
// //                   }}
// //                   placeholder={`Opsi ${huruf}`}
// //                   className="flex-1 h-8 px-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white"
// //                 />
// //                 <input
// //                   type="radio"
// //                   name={radioName}
// //                   // ← SIMPAN HURUF, bukan teks opsi
// //                   checked={soalJawaban === huruf}
// //                   onChange={() => setSoalJawaban(huruf)}
// //                   disabled={!opsi.trim()} // nonaktif jika opsi kosong
// //                   className="flex-shrink-0 accent-emerald-600"
// //                 />
// //               </div>
// //             );
// //           })}
// //           {soalJawaban && (
// //             <p className="text-[10px] text-emerald-600 font-medium">
// //               ✓ Jawaban benar: <strong>{soalJawaban}</strong>
// //               {soalOpsi[soalJawaban.charCodeAt(0) - 65] && (
// //                 <span className="text-slate-400 font-normal">
// //                   {" "}— {soalOpsi[soalJawaban.charCodeAt(0) - 65]}
// //                 </span>
// //               )}
// //             </p>
// //           )}
// //         </div>
// //       )}
// //       {soalTipe === "essay" && (
// //         <div>
// //           <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Kunci Jawaban (Opsional)</label>
// //           <textarea value={soalJawaban} onChange={e => setSoalJawaban(e.target.value)} rows={2} placeholder="Tuliskan kunci jawaban essay..."
// //             className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white" />
// //         </div>
// //       )}
// //       <button
// //         onClick={onAdd}
// //         disabled={!soalPertanyaan.trim()}
// //         className="w-full h-9 bg-zinc-900 text-white rounded-lg text-[12px] font-semibold hover:bg-zinc-800 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// //       >
// //         <Plus className="w-3.5 h-3.5" /> {editingId ? "Simpan Perubahan & Lanjut Soal Baru" : "Tambah & Lanjut Soal Berikutnya"}
// //       </button>
// //       <p className="text-[10px] text-slate-400 text-center">
// //         {liveIsValid && !editingId ? "✅ Soal ini otomatis ikut tersimpan saat klik \"Simpan\" di bawah" : "Isi pertanyaan untuk mulai membuat soal"}
// //       </p>
// //     </div>
// //   );
// // }

// // // ─── AddContentModal ──────────────────────────────────────────────────────────
// // function AddContentModal({
// //   activeTab, onClose, onSave,
// // }: {
// //   activeTab: string;
// //   onClose: () => void;
// //   onSave: (data: { nama: string; tanggal: string; durasi: string; soalAcak: boolean; soalList: SoalItem[] }) => void;
// // }) {
// //   const label = TAB_LABELS[activeTab] || "Konten";
// //   const draft = loadDraft(activeTab);

// //   const [step, setStep] = useState<1 | 2>(draft?.step ?? 1);
// //   const [nama, setNama] = useState(draft?.nama ?? "");
// //   const [tanggal, setTanggal] = useState(draft?.tanggal ?? "");
// //   const [durasi, setDurasi] = useState(draft?.durasi ?? "");
// //   const [soalAcak, setSoalAcak] = useState<boolean>(draft?.soalAcak ?? true);
// //   const [soalList, setSoalList] = useState<SoalItem[]>(draft?.soalList ?? []);

// //   const [soalPertanyaan, setSoalPertanyaan] = useState(draft?.soalPertanyaan ?? "");
// //   const [soalTipe, setSoalTipe] = useState<"pg" | "essay">(draft?.soalTipe ?? "pg");
// //   const [soalTopik, setSoalTopik] = useState(draft?.soalTopik ?? "");
// //   const [soalOpsi, setSoalOpsi] = useState<string[]>(draft?.soalOpsi ?? [...DEFAULT_OPSI]);
// //   const [soalJawaban, setSoalJawaban] = useState(draft?.soalJawaban ?? "");
// //   const [soalGambar, setSoalGambar] = useState<string | undefined>(draft?.soalGambar);
// //   const [editingId, setEditingId] = useState<string | null>(draft?.editingId ?? null);
// //   const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(draft ? new Date() : null);
// //   const [showImportModal, setShowImportModal] = useState(false);

// //   const liveIsValid = isSoalLiveValid(soalPertanyaan);
// //   const totalSoalPreview = soalList.length + (liveIsValid && !editingId ? 1 : 0);

// //   // const persistDraft = useCallback(() => {
// //   //   saveDraft(activeTab, { step, nama, tanggal, durasi, soalAcak, soalList, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, soalGambar, editingId });
// //   //   setDraftSavedAt(new Date());
// //   // }, [step, nama, tanggal, durasi, soalAcak, soalList, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, soalGambar, editingId, activeTab]);

// //   const persistDraft = useCallback(() => {
// //     // Strip gambar dari soalList sebelum simpan ke sessionStorage
// //     // karena base64/blob URL terlalu besar dan bisa rusak
// //     const soalListTanpaGambar = soalList.map(s => ({ ...s, gambar: undefined }));

// //     saveDraft(activeTab, {
// //       step, nama, tanggal, durasi, soalAcak,
// //       soalList: soalListTanpaGambar,  // ← tanpa gambar
// //       soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban,
// //       soalGambar: undefined,          // ← jangan simpan gambar ke draft
// //       editingId,
// //     });
// //     setDraftSavedAt(new Date());
// //   }, [step, nama, tanggal, durasi, soalAcak, soalList, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, editingId, activeTab]);
// //   useEffect(() => {
// //     const timer = setTimeout(persistDraft, 400);
// //     return () => clearTimeout(timer);
// //   }, [persistDraft]);

// //   function resetSoalForm() {
// //     setSoalPertanyaan(""); setSoalTopik(""); setSoalOpsi([...DEFAULT_OPSI]); setSoalJawaban(""); setSoalTipe("pg"); setSoalGambar(undefined);
// //   }

// //   function commitLiveSoal(): SoalItem[] {
// //     if (!liveIsValid) return soalList;
// //     if (editingId) {
// //       return soalList.map(s => s.id === editingId
// //         ? { id: editingId, pertanyaan: soalPertanyaan.trim(), tipe: soalTipe, opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [], jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar }
// //         : s);
// //     }
// //     return [...soalList, { id: Date.now().toString(), pertanyaan: soalPertanyaan.trim(), tipe: soalTipe, opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [], jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar }];
// //   }

// //   function handleAddSoal() {
// //     if (!soalPertanyaan.trim()) return;
// //     const newSoal: SoalItem = {
// //       id: editingId || Date.now().toString(),
// //       pertanyaan: soalPertanyaan.trim(), tipe: soalTipe,
// //       opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [],
// //       jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar,
// //     };
// //     if (editingId) { setSoalList(prev => prev.map(s => s.id === editingId ? newSoal : s)); setEditingId(null); }
// //     else setSoalList(prev => [...prev, newSoal]);
// //     resetSoalForm();
// //   }

// //   function handleEditSoal(s: SoalItem) {
// //     if (liveIsValid && !editingId) { setSoalList(commitLiveSoal()); resetSoalForm(); }
// //     setEditingId(s.id); setSoalPertanyaan(s.pertanyaan); setSoalTipe(s.tipe); setSoalTopik(s.topik);
// //     setSoalOpsi(s.tipe === "pg" ? [...s.opsi, "", "", "", "", ""].slice(0, 5) : [...DEFAULT_OPSI]);
// //     setSoalJawaban(s.jawaban); setSoalGambar(s.gambar);
// //   }

// //   function handleSave() {
// //     const finalList = commitLiveSoal();
// //     clearDraft(activeTab);
// //     onSave({ nama, tanggal, durasi, soalAcak, soalList: finalList });
// //   }

// //   function handleImport(imported: SoalItem[]) {
// //     setSoalList(prev => [...prev, ...imported]);
// //   }

// //   const hasDraftData = nama.trim() !== "" || soalList.length > 0 || liveIsValid;

// //   return (
// //     <>
// //       <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
// //         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// //         <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
// //           <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
// //             <div className="flex items-center gap-3">
// //               {step === 2 && <button onClick={() => setStep(1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><ArrowLeft className="w-4 h-4" /></button>}
// //               <div>
// //                 <div className="flex items-center gap-2">
// //                   <h3 className="text-base font-bold text-zinc-900">Tambah {label}</h3>
// //                   {draftSavedAt && hasDraftData && (
// //                     <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
// //                       <Save className="w-2.5 h-2.5" /> Draft tersimpan
// //                     </span>
// //                   )}
// //                 </div>
// //                 <div className="flex items-center gap-1.5 mt-0.5">
// //                   <span className={`w-5 h-1.5 rounded-full transition-colors ${step === 1 ? "bg-zinc-900" : "bg-zinc-200"}`} />
// //                   <span className={`w-5 h-1.5 rounded-full transition-colors ${step === 2 ? "bg-zinc-900" : "bg-zinc-200"}`} />
// //                   <p className="text-[10px] text-slate-400 ml-1">Langkah {step} dari 2</p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               {hasDraftData && (
// //                 <button onClick={() => { clearDraft(activeTab); setStep(1); setNama(""); setTanggal(""); setDurasi(""); setSoalAcak(true); setSoalList([]); resetSoalForm(); setEditingId(null); setDraftSavedAt(null); }}
// //                   className="text-[10px] font-semibold text-red-400 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">
// //                   Hapus draft
// //                 </button>
// //               )}
// //               <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// //             </div>
// //           </div>

// //           <div className="flex-1 overflow-y-auto">
// //             {step === 1 && (
// //               <div className="p-5 space-y-4">
// //                 <div>
// //                   <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama {label} <span className="text-red-500">*</span></label>
// //                   <input type="text" value={nama} onChange={e => setNama(e.target.value)} placeholder={`e.g. UAS ${label} Semester 2`}
// //                     className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   <div>
// //                     <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label>
// //                     <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// //                   </div>
// //                   <div>
// //                     <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label>
// //                     <input type="number" value={durasi} onChange={e => setDurasi(e.target.value)} placeholder="60" className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Urutan Soal untuk Siswa</label>
// //                   <div className="grid grid-cols-2 gap-2.5">
// //                     <button type="button" onClick={() => setSoalAcak(true)} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${soalAcak ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
// //                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${soalAcak ? "bg-violet-100" : "bg-slate-100"}`}><Shuffle className={`w-4 h-4 ${soalAcak ? "text-violet-600" : "text-slate-400"}`} /></div>
// //                       <div className="flex-1 min-w-0">
// //                         <p className={`text-[12px] font-bold ${soalAcak ? "text-violet-700" : "text-zinc-700"}`}>Soal Acak</p>
// //                         <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Urutan soal diacak berbeda tiap siswa</p>
// //                         {soalAcak && <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded-full"><Check className="w-2.5 h-2.5" /> Aktif</span>}
// //                       </div>
// //                     </button>
// //                     <button type="button" onClick={() => setSoalAcak(false)} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${!soalAcak ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
// //                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${!soalAcak ? "bg-blue-100" : "bg-slate-100"}`}><ListOrdered className={`w-4 h-4 ${!soalAcak ? "text-blue-600" : "text-slate-400"}`} /></div>
// //                       <div className="flex-1 min-w-0">
// //                         <p className={`text-[12px] font-bold ${!soalAcak ? "text-blue-700" : "text-zinc-700"}`}>Soal Berurutan</p>
// //                         <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Semua siswa mengerjakan soal dengan urutan yang sama</p>
// //                         {!soalAcak && <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full"><Check className="w-2.5 h-2.5" /> Aktif</span>}
// //                       </div>
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
// //                   <FileText className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
// //                   <p className="text-[11px] text-blue-700">Di langkah berikutnya, Anda bisa menambahkan soal manual atau import dari file PDF/DOCX/TXT.</p>
// //                 </div>
// //               </div>
// //             )}

// //             {step === 2 && (
// //               <div className="p-5 space-y-4">
// //                 {/* Mode indicator */}
// //                 <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-[11px] font-semibold ${soalAcak ? "bg-violet-50 border-violet-200 text-violet-700" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
// //                   {soalAcak ? <Shuffle className="w-3.5 h-3.5 flex-shrink-0" /> : <ListOrdered className="w-3.5 h-3.5 flex-shrink-0" />}
// //                   <span>Mode: <strong>{soalAcak ? "Soal Acak" : "Soal Berurutan"}</strong> · <button className="underline font-semibold opacity-70 hover:opacity-100" onClick={() => setStep(1)}>Ubah</button></span>
// //                 </div>

// //                 {/* Import button */}
// //                 <button
// //                   onClick={() => setShowImportModal(true)}
// //                   className="w-full h-10 border-2 border-violet-200 bg-violet-50 text-violet-700 rounded-xl text-[12px] font-semibold hover:bg-violet-100 flex items-center justify-center gap-2 transition-colors"
// //                 >
// //                   <FileUp className="w-4 h-4" /> Import Soal dari File (PDF / DOCX / TXT)
// //                 </button>

// //                 {/* Soal list */}
// //                 {soalList.length > 0 && (
// //                   <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
// //                     <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
// //                       <h4 className="font-semibold text-zinc-900 text-[13px]">Soal Ditambahkan</h4>
// //                       <span className="text-[11px] text-slate-400">{soalList.length} soal</span>
// //                     </div>
// //                     <div className="divide-y divide-slate-50">
// //                       {soalList.map((s, i) => (
// //                         <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId === s.id ? "bg-amber-50" : ""}`}>
// //                           <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
// //                           <div className="flex-1 min-w-0">
// //                             <p className="text-[12px] font-medium text-zinc-900 truncate">{s.pertanyaan}</p>
// //                             <div className="flex items-center gap-2 mt-0.5 flex-wrap">
// //                               <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "pg" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{s.tipe === "pg" ? "Pilihan Ganda" : "Essay"}</span>
// //                               {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
// //                               {s.gambar && <span className="inline-flex items-center gap-0.5 text-[10px] text-violet-500 font-semibold"><ImageIcon className="w-3 h-3" /> Gambar</span>}
// //                             </div>
// //                           </div>
// //                           <div className="flex items-center gap-1 flex-shrink-0">
// //                             <button onClick={() => handleEditSoal(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
// //                             <button onClick={() => setSoalList(prev => prev.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Soal form */}
// //                 <SoalForm
// //                   soalPertanyaan={soalPertanyaan} setSoalPertanyaan={setSoalPertanyaan}
// //                   soalTipe={soalTipe} setSoalTipe={setSoalTipe}
// //                   soalTopik={soalTopik} setSoalTopik={setSoalTopik}
// //                   soalOpsi={soalOpsi} setSoalOpsi={setSoalOpsi}
// //                   soalJawaban={soalJawaban} setSoalJawaban={setSoalJawaban}
// //                   soalGambar={soalGambar} setSoalGambar={setSoalGambar}
// //                   editingId={editingId}
// //                   soalListLength={soalList.length}
// //                   soalList={soalList}
// //                   onAdd={handleAddSoal}
// //                   onCancelEdit={() => { setEditingId(null); resetSoalForm(); }}
// //                   radioName="jawaban-benar-add"
// //                 />
// //               </div>
// //             )}
// //           </div>

// //           <div className="p-5 pt-3 shrink-0 border-t border-slate-100">
// //             {step === 1 ? (
// //               <div className="flex gap-3">
// //                 <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup & Simpan Draft</button>
// //                 <button onClick={() => { if (nama.trim()) setStep(2); }} disabled={!nama.trim()}
// //                   className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
// //                   Lanjut: Tambah Soal <ChevronRight className="w-4 h-4" />
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="flex gap-3">
// //                 <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup & Simpan Draft</button>
// //                 <button onClick={handleSave} className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2">
// //                   <Check className="w-4 h-4" /> Simpan {TAB_LABELS[activeTab]} ({totalSoalPreview} soal)
// //                 </button>
// //               </div>
// //             )}
// //             {hasDraftData && <p className="text-center text-[10px] text-slate-400 mt-2">💾 Data Anda tersimpan otomatis — aman jika modal ditutup</p>}
// //           </div>
// //         </div>
// //       </div>

// //       {showImportModal && (
// //         <ImportSoalModal
// //           onClose={() => setShowImportModal(false)}
// //           onImport={handleImport}
// //         />
// //       )}
// //     </>
// //   );
// // }

// // // ─── KelolaSoalModal ──────────────────────────────────────────────────────────
// // function KelolaSoalModal({ ujian, onClose, onUpdate }: {
// //   ujian: Ujian;
// //   onClose: () => void;
// //   onUpdate: (id: string, soalList: SoalItem[]) => void;
// // }) {
// //   const [soalList, setSoalList] = useState<SoalItem[]>(ujian.soalList || []);
// //   const [pertanyaan, setPertanyaan] = useState("");
// //   const [tipe, setTipe] = useState<"pg" | "essay">("pg");
// //   const [topik, setTopik] = useState("");
// //   const [opsi, setOpsi] = useState([...DEFAULT_OPSI]);
// //   const [jawaban, setJawaban] = useState("");
// //   const [gambar, setGambar] = useState<string | undefined>();
// //   const [editingId, setEditingId] = useState<string | null>(null);
// //   const [showForm, setShowForm] = useState(false);
// //   const [showImportModal, setShowImportModal] = useState(false);

// //   const liveIsValid = pertanyaan.trim().length > 0;
// //   const totalPreview = soalList.length + (liveIsValid && showForm && !editingId ? 1 : 0);

// //   function reset() { setPertanyaan(""); setTopik(""); setOpsi([...DEFAULT_OPSI]); setJawaban(""); setTipe("pg"); setGambar(undefined); }

// //   function commitLive(): SoalItem[] {
// //     if (!liveIsValid || !showForm) return soalList;
// //     if (editingId) {
// //       return soalList.map(s => s.id === editingId
// //         ? { id: editingId, pertanyaan: pertanyaan.trim(), tipe, opsi: tipe === "pg" ? opsi.filter(Boolean) : [], jawaban, topik: topik.trim(), gambar }
// //         : s);
// //     }
// //     return [...soalList, { id: Date.now().toString(), pertanyaan: pertanyaan.trim(), tipe, opsi: tipe === "pg" ? opsi.filter(Boolean) : [], jawaban, topik: topik.trim(), gambar }];
// //   }

// //   function handleAdd() {
// //     if (!pertanyaan.trim()) return;
// //     const item: SoalItem = { id: editingId || Date.now().toString(), pertanyaan: pertanyaan.trim(), tipe, opsi: tipe === "pg" ? opsi.filter(Boolean) : [], jawaban, topik: topik.trim(), gambar };
// //     if (editingId) { setSoalList(p => p.map(s => s.id === editingId ? item : s)); setEditingId(null); }
// //     else setSoalList(p => [...p, item]);
// //     reset(); setShowForm(false);
// //   }

// //   function handleEdit(s: SoalItem) {
// //     if (liveIsValid && showForm && !editingId) { setSoalList(commitLive()); reset(); }
// //     setEditingId(s.id); setPertanyaan(s.pertanyaan); setTipe(s.tipe); setTopik(s.topik);
// //     setOpsi(s.tipe === "pg" ? [...s.opsi, "", "", "", "", ""].slice(0, 5) : [...DEFAULT_OPSI]);
// //     setJawaban(s.jawaban); setGambar(s.gambar); setShowForm(true);
// //   }

// //   function handleSaveAll() { const finalList = commitLive(); onUpdate(ujian.id, finalList); onClose(); }

// //   function handleImport(imported: SoalItem[]) {
// //     setSoalList(prev => [...prev, ...imported]);
// //   }

// //   return (
// //     <>
// //       <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
// //         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// //         <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
// //           {/* ── Header dengan tombol Tambah Soal di mobile ── */}
// //           <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 sticky top-0 bg-white z-10 rounded-t-2xl">
// //             <div>
// //               <h3 className="text-base font-bold text-zinc-900">Kelola Soal</h3>
// //               <p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <span className="text-[11px] text-slate-500 font-medium">{totalPreview} soal</span>
// //               {/* Tombol Tambah Soal — tampil di semua ukuran layar, termasuk mobile */}
// //               {!showForm && (
// //                 <button
// //                   onClick={() => { setShowForm(true); setEditingId(null); reset(); }}
// //                   className="inline-flex items-center gap-1.5 h-8 px-3 bg-zinc-900 text-white rounded-lg text-[11px] font-semibold hover:bg-zinc-800 transition-colors"
// //                 >
// //                   <Plus className="w-3.5 h-3.5" />
// //                   <span>Tambah Soal</span>
// //                 </button>
// //               )}
// //               <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// //             </div>
// //           </div>

// //           <div className="flex-1 overflow-y-auto p-5 space-y-4">
// //             {/* Import button */}
// //             <button
// //               onClick={() => setShowImportModal(true)}
// //               className="w-full h-10 border-2 border-violet-200 bg-violet-50 text-violet-700 rounded-xl text-[12px] font-semibold hover:bg-violet-100 flex items-center justify-center gap-2 transition-colors"
// //             >
// //               <FileUp className="w-4 h-4" /> Import Soal dari File (PDF / DOCX / TXT)
// //             </button>

// //             {soalList.length === 0 && !showForm && (
// //               <div className="text-center py-8">
// //                 <FileText className="w-10 h-10 text-slate-200 mx-auto mb-2" />
// //                 <p className="text-[13px] font-semibold text-zinc-500">Belum ada soal</p>
// //                 <p className="text-[11px] text-slate-400 mt-0.5">Import dari file atau klik "Tambah Soal" untuk mulai</p>
// //               </div>
// //             )}

// //             {soalList.length > 0 && (
// //               <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
// //                 <div className="divide-y divide-slate-50">
// //                   {soalList.map((s, i) => (
// //                     <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId === s.id ? "bg-amber-50" : "hover:bg-slate-50/50"}`}>
// //                       <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
// //                       <div className="flex-1 min-w-0">
// //                         <p className="text-[12px] font-medium text-zinc-900">{s.pertanyaan}</p>
// //                         {/* {s.gambar && <img src={s.gambar} alt="" className="mt-1.5 h-12 rounded-lg object-cover border border-slate-200" />} */}
// //                         {s.gambar && (
// //                           <img
// //                             src={s.gambar}
// //                             alt=""
// //                             className="mt-1.5 h-12 rounded-lg object-cover border border-slate-200"
// //                             onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
// //                           />
// //                         )}
// //                         <div className="flex items-center gap-2 mt-1 flex-wrap">

// //                           <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "pg" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{s.tipe === "pg" ? "PG" : "Essay"}</span>
// //                           {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
// //                           {s.tipe === "pg" && s.opsi.length > 0 && <span className="text-[10px] text-slate-400">{s.opsi.length} opsi · Jwb: <strong className="text-emerald-600">{s.jawaban}</strong></span>}
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center gap-1 flex-shrink-0">
// //                         <button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
// //                         <button onClick={() => setSoalList(p => p.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Tombol Tambah Soal di body (fallback/alternatif, hanya tampil jika form belum muncul) */}
// //             {!showForm && soalList.length > 0 && (
// //               <button onClick={() => { setShowForm(true); setEditingId(null); reset(); }}
// //                 className="w-full h-10 border-2 border-dashed border-slate-200 rounded-xl text-[12px] font-semibold text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2">
// //                 <Plus className="w-4 h-4" /> Tambah Soal Manual
// //               </button>
// //             )}

// //             {showForm && (
// //               <SoalForm
// //                 soalPertanyaan={pertanyaan} setSoalPertanyaan={setPertanyaan}
// //                 soalTipe={tipe} setSoalTipe={setTipe}
// //                 soalTopik={topik} setSoalTopik={setTopik}
// //                 soalOpsi={opsi} setSoalOpsi={setOpsi}
// //                 soalJawaban={jawaban} setSoalJawaban={setJawaban}
// //                 soalGambar={gambar} setSoalGambar={setGambar}
// //                 editingId={editingId}
// //                 soalListLength={soalList.length}
// //                 soalList={soalList}
// //                 onAdd={handleAdd}
// //                 onCancelEdit={() => { setShowForm(false); setEditingId(null); reset(); }}
// //                 radioName="jawaban-kelola"
// //               />
// //             )}
// //           </div>

// //           <div className="p-5 border-t border-slate-100 shrink-0 flex gap-3">
// //             <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Batal</button>
// //             <button onClick={handleSaveAll} className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2">
// //               <Check className="w-4 h-4" /> Simpan ({totalPreview} soal)
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {showImportModal && (
// //         <ImportSoalModal
// //           onClose={() => setShowImportModal(false)}
// //           onImport={handleImport}
// //         />
// //       )}
// //     </>
// //   );
// // }

// // // ─── EditUjianModal ───────────────────────────────────────────────────────────
// // function EditUjianModal({ ujian, onClose, onSave, onKelolaSoal }: {
// //   ujian: Ujian; onClose: () => void;
// //   onSave: (id: string, data: { nama: string; durasi: number; tanggalMulai?: string }) => void;
// //   onKelolaSoal?: () => void;
// // }) {
// //   const [nama, setNama] = useState(ujian.nama);
// //   const [durasi, setDurasi] = useState(String(ujian.durasi));
// //   const [tanggal, setTanggal] = useState(ujian.tanggalMulai ? new Date(ujian.tanggalMulai).toISOString().split("T")[0] : "");

// //   return (
// //     <div className="fixed inset-0 z-[300] flex items-center justify-center">
// //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// //       <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl z-10 p-6">
// //         <div className="flex items-center justify-between mb-5">
// //           <h3 className="text-base font-bold text-zinc-900">Edit {TAB_LABELS[ujian.tipe?.toLowerCase()] || "Ujian"}</h3>
// //           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// //         </div>
// //         <div className="space-y-4">
// //           <div>
// //             <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label>
// //             <input type="text" value={nama} onChange={e => setNama(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// //           </div>
// //           <div className="grid grid-cols-2 gap-3">
// //             <div>
// //               <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label>
// //               <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// //             </div>
// //             <div>
// //               <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label>
// //               <input type="number" value={durasi} onChange={e => setDurasi(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// //             </div>
// //           </div>
// //         </div>
// //         <div className="flex gap-3 mt-4">
// //           <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// //           <button onClick={() => onSave(ujian.id, { nama, durasi: parseInt(durasi) || 60, tanggalMulai: tanggal || undefined })} disabled={!nama.trim()}
// //             className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40">Simpan</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── DeleteUjianModal ─────────────────────────────────────────────────────────
// // function DeleteUjianModal({ ujian, onClose, onDelete }: { ujian: Ujian; onClose: () => void; onDelete: (id: string) => void }) {
// //   return (
// //     <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
// //       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
// //       <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
// //         <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trash2 className="w-5 h-5 text-red-600" /></div>
// //         <h3 className="text-base font-bold text-zinc-900 mb-2 text-center">Hapus {TAB_LABELS[ujian.tipe?.toLowerCase()] || "Ujian"}</h3>
// //         <p className="text-[13px] text-slate-500 mb-6 text-center">Yakin ingin menghapus <span className="font-semibold text-zinc-900">"{ujian.nama}"</span>? Semua soal dan data peserta akan ikut terhapus.</p>
// //         <div className="flex gap-3">
// //           <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// //           <button onClick={() => onDelete(ujian.id)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700">Hapus</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Main Page ────────────────────────────────────────────────────────────────
// // export default function AdminMataPelajaranPage() {
// //   const router = useRouter();
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [subjects, setSubjects] = useState<MataPelajaran[]>([]);
// //   const [stats, setStats] = useState({ totalSoal: 0, totalUjian: 0 });
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [kelasFilter, setKelasFilter] = useState("all");

// //   const [selectedSubject, setSelectedSubject] = useState<MataPelajaran | null>(null);
// //   const [activeTab, setActiveTab] = useState("ujian");

// //   const [ujianList, setUjianList] = useState<Ujian[]>([]);
// //   const [ujianLoading, setUjianLoading] = useState(false);

// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showEditModal, setShowEditModal] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [showDetailModal, setShowDetailModal] = useState(false);
// //   const [showKelolaSoal, setShowKelolaSoal] = useState(false);
// //   const [showContentModal, setShowContentModal] = useState(false);
// //   const [selectedUjian, setSelectedUjian] = useState<Ujian | null>(null);
// //   const [targetMapel, setTargetMapel] = useState<MataPelajaran | null>(null);

// //   const [deleteMapelDetail, setDeleteMapelDetail] = useState<DeleteMapelDetail | null>(null);
// //   const [deleteMapelLoading, setDeleteMapelLoading] = useState(false);

// //   const [showEditUjianModal, setShowEditUjianModal] = useState(false);
// //   const [showDeleteUjianModal, setShowDeleteUjianModal] = useState(false);
// //   const [targetUjian, setTargetUjian] = useState<Ujian | null>(null);

// //   const [showHasilModal, setShowHasilModal] = useState(false);
// //   const [hasilUjianTarget, setHasilUjianTarget] = useState<Ujian | null>(null);
// //   const [soalBankList, setSoalBankList] = useState<any[]>([]);
// //   const [soalBankLoading, setSoalBankLoading] = useState(false);
// //   const [soalBankSearch, setSoalBankSearch] = useState("");
// //   const [soalBankTipe, setSoalBankTipe] = useState("");

// //   const [addForm, setAddForm] = useState({ nama: "", kelas: "", deskripsi: "", warna: "zinc" });
// //   const [editForm, setEditForm] = useState<MataPelajaran | null>(null);
// //   const [copiedLink, setCopiedLink] = useState(false);
// //   const [copiedToken, setCopiedToken] = useState(false);
// //   const [showToken, setShowToken] = useState(false);

// //   const [bobotUjian, setBobotUjian] = useState(40);
// //   const [bobotUlangan, setBobotUlangan] = useState(25);
// //   const [bobotLatihan, setBobotLatihan] = useState(20);
// //   const [bobotKuis, setBobotKuis] = useState(15);
// //   const [kkm, setKkm] = useState(70);
// //   const [showNilaiHasil, setShowNilaiHasil] = useState(false);
// //   const [nilaiData, setNilaiData] = useState<any[]>([]);
// //   const [nilaiFilter, setNilaiFilter] = useState("all");
// //   const [nilaiSortKey, setNilaiSortKey] = useState("akhir");
// //   const [nilaiSortAsc, setNilaiSortAsc] = useState(false);

// //   const fetchSubjects = useCallback(async () => {
// //     const token = getToken();
// //     if (!token) { router.push("/auth/login"); return; }
// //     try {
// //       const res = await api.get<{ data: MataPelajaran[]; stats: any }>(`/mata-pelajaran?kelas=${kelasFilter !== "all" ? kelasFilter : ""}`);
// //       setSubjects(res.data || []);
// //       if (res.stats) setStats(res.stats);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Gagal memuat data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [kelasFilter, router]);

// //   useEffect(() => { fetchSubjects(); }, [fetchSubjects]);

// //   const fetchUjianByTipe = useCallback(async (mapelId: number, tipe: string) => {
// //     setUjianLoading(true);
// //     try {
// //       const tipeMap: Record<string, string> = { ujian: "UJIAN", ulangan: "ULANGAN", latihan: "LATIHAN", kuis: "KUIS" };
// //       const tipeParam = tipeMap[tipe];
// //       const url = tipeParam ? `/mata-pelajaran/${mapelId}/ujian?tipe=${tipeParam}` : `/mata-pelajaran/${mapelId}/ujian`;
// //       const res = await api.get<{ data: Ujian[] }>(url);
// //       setUjianList(res.data || []);
// //     } catch { setError("Gagal memuat data ujian"); }
// //     finally { setUjianLoading(false); }
// //   }, []);

// //   useEffect(() => {
// //     if (selectedSubject && ["ujian", "ulangan", "latihan", "kuis"].includes(activeTab)) {
// //       fetchUjianByTipe(selectedSubject.id, activeTab);
// //     }
// //   }, [selectedSubject, activeTab, fetchUjianByTipe]);

// //   const fetchSoalBank = useCallback(async (mapelId: number, search = "", tipe = "") => {
// //     setSoalBankLoading(true);
// //     try {
// //       const params = new URLSearchParams();
// //       if (search) params.set("search", search);
// //       if (tipe) params.set("tipe", tipe);
// //       const res = await api.get<{ data: any[]; total: number }>(`/mata-pelajaran/${mapelId}/soal?${params.toString()}`);
// //       setSoalBankList(res.data || []);
// //     } catch { setSoalBankList([]); }
// //     finally { setSoalBankLoading(false); }
// //   }, []);

// //   useEffect(() => {
// //     if (selectedSubject && activeTab === "soal") {
// //       fetchSoalBank(selectedSubject.id, soalBankSearch, soalBankTipe);
// //     }
// //   }, [selectedSubject, activeTab, soalBankSearch, soalBankTipe, fetchSoalBank]);

// //   const filtered = subjects.filter(s => !searchQuery || s.nama.toLowerCase().includes(searchQuery.toLowerCase()));

// //   async function handleAdd() {
// //     try {
// //       await api.post("/mata-pelajaran", addForm);
// //       setShowAddModal(false);
// //       setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" });
// //       fetchSubjects();
// //     } catch (err) { setError(err instanceof Error ? err.message : "Gagal menambah"); }
// //   }

// //   async function handleEdit() {
// //     if (!editForm || !targetMapel) return;
// //     try {
// //       await api.put(`/mata-pelajaran/${targetMapel.id}`, editForm);
// //       setShowEditModal(false); setTargetMapel(null); setEditForm(null);
// //       fetchSubjects();
// //     } catch (err) { setError(err instanceof Error ? err.message : "Gagal mengubah"); }
// //   }

// //   async function openDeleteMapelModal(subject: MataPelajaran) {
// //     setTargetMapel(subject); setDeleteMapelDetail(null); setDeleteMapelLoading(true); setShowDeleteModal(true);
// //     try {
// //       const [ujianRes, ulanganRes, latihanRes, kuisRes, soalRes] = await Promise.all([
// //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=UJIAN`),
// //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=ULANGAN`),
// //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=LATIHAN`),
// //         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=KUIS`),
// //         api.get<{ total: number }>(`/mata-pelajaran/${subject.id}/soal`),
// //       ]);
// //       setDeleteMapelDetail({
// //         totalUjian: ujianRes.data?.length || 0, totalUlangan: ulanganRes.data?.length || 0,
// //         totalLatihan: latihanRes.data?.length || 0, totalKuis: kuisRes.data?.length || 0,
// //         totalSoal: soalRes.total || subject.totalSoal,
// //       });
// //     } catch {
// //       setDeleteMapelDetail({ totalUjian: subject.totalUjian, totalUlangan: 0, totalLatihan: 0, totalKuis: 0, totalSoal: subject.totalSoal });
// //     } finally { setDeleteMapelLoading(false); }
// //   }

// //   async function handleDelete() {
// //     if (!targetMapel) return;
// //     try {
// //       await api.delete(`/mata-pelajaran/${targetMapel.id}`);
// //       setShowDeleteModal(false); setDeleteMapelDetail(null);
// //       if (selectedSubject?.id === targetMapel.id) setSelectedSubject(null);
// //       setTargetMapel(null); fetchSubjects();
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Gagal menghapus mata pelajaran");
// //       setShowDeleteModal(false);
// //     }
// //   }

// //   async function handleEditUjian(ujianId: string, data: { nama: string; durasi: number; tanggalMulai?: string }) {
// //     try {
// //       await api.put(`/ujian/${ujianId}`, { nama: data.nama, durasi: data.durasi, tanggalMulai: data.tanggalMulai ? new Date(data.tanggalMulai).toISOString() : null });
// //       setShowEditUjianModal(false); setTargetUjian(null);
// //       if (selectedSubject) fetchUjianByTipe(selectedSubject.id, activeTab);
// //     } catch (err) { setError(err instanceof Error ? err.message : "Gagal mengubah ujian"); }
// //   }

// //   async function handleDeleteUjian(ujianId: string) {
// //     try {
// //       await api.delete(`/ujian/${ujianId}`);
// //       setShowDeleteUjianModal(false); setTargetUjian(null);
// //       if (selectedSubject) { fetchUjianByTipe(selectedSubject.id, activeTab); fetchSubjects(); }
// //     } catch (err) { setError(err instanceof Error ? err.message : "Gagal menghapus ujian"); }
// //   }

// //   async function handleSaveContent(data: { nama: string; tanggal: string; durasi: string; soalAcak: boolean; soalList: SoalItem[] }) {
// //     if (!selectedSubject) return;
// //     const tipeMap: Record<string, string> = { ujian: "UJIAN", ulangan: "ULANGAN", latihan: "LATIHAN", kuis: "KUIS" };
// //     try {
// //       const ujianRes = await api.post<{ id: string; token: string }>(`/mata-pelajaran/${selectedSubject.id}/ujian`, {
// //         nama: data.nama, tipe: tipeMap[activeTab] || "UJIAN", durasi: parseInt(data.durasi) || 60,
// //         kelas: selectedSubject.kelas, tanggalMulai: data.tanggal || null, acakSoal: data.soalAcak, acakOpsi: false, soalIds: [],
// //       });
// //       const ujianId = ujianRes.id;
// //       if (ujianId && data.soalList.length > 0) {
// //         const soalIds: string[] = [];
// //         for (const s of data.soalList) {
// //           const soalRes = await api.post<{ id: string }>(`/mata-pelajaran/${selectedSubject.id}/soal`, {
// //             pertanyaan: s.pertanyaan,
// //             tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
// //             topik: s.topik || null,
// //             opsiA: s.opsi[0] || null,
// //             opsiB: s.opsi[1] || null,
// //             gambarUrl: s.gambar || null,  // ← tambahkan ini
// //             opsiC: s.opsi[2] || null,
// //             opsiD: s.opsi[3] || null,
// //             opsiE: s.opsi[4] || null,  // ← tambah
// //             jawabanBenar: s.jawaban || null,
// //           });
// //           soalIds.push(soalRes.id);
// //         }
// //         await api.put(`/ujian/${ujianId}`, { soalIds });
// //       }
// //       setShowContentModal(false);
// //       fetchUjianByTipe(selectedSubject.id, activeTab);
// //       fetchSubjects();
// //     } catch (err) { setError(err instanceof Error ? err.message : "Gagal menyimpan"); }
// //   }

// //   // async function handleUpdateSoal(ujianId: string, soalList: SoalItem[]) {
// //   //   if (!selectedSubject) return;
// //   //   try {
// //   //     const soalIds: string[] = [];
// //   //     for (const s of soalList) {
// //   //       if (/^\d+$/.test(s.id) || s.id.startsWith("import_")) {
// //   //         const soalRes = await api.post<{ id: string }>(`/mata-pelajaran/${selectedSubject.id}/soal`, {
// //   //           pertanyaan: s.pertanyaan,
// //   //           tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
// //   //           topik: s.topik || null,
// //   //           gambarUrl: s.gambar || null,
// //   //           opsiA: s.opsi[0] || null,
// //   //           opsiB: s.opsi[1] || null,
// //   //           opsiC: s.opsi[2] || null,
// //   //           opsiD: s.opsi[3] || null,
// //   //           opsiE: s.opsi[4] || null,  // ← tambah
// //   //           jawabanBenar: s.jawaban || null,
// //   //         });
// //   //         soalIds.push(soalRes.id);
// //   //       } else {
// //   //         soalIds.push(s.id);
// //   //       }
// //   //     }
// //   //     await api.put(`/ujian/${ujianId}`, { soalIds });
// //   //     setUjianList(prev => prev.map(u => u.id === ujianId ? { ...u, soalList, totalSoal: soalList.length } : u));
// //   //     fetchSubjects();
// //   //   } catch (err) { setError(err instanceof Error ? err.message : "Gagal menyimpan soal"); }
// //   // }
// //   // D:\Project\sistem-sekolah\sistem-penilaian-siswa\frontend\app\admin\mata-pelajaran\page.tsx
// //   // Ganti fungsi handleUpdateSoal dengan ini:

// //   async function handleUpdateSoal(ujianId: string, soalList: SoalItem[]) {
// //     if (!selectedSubject) return;
// //     try {
// //       const soalIds: string[] = [];

// //       for (const s of soalList) {
// //         const isNewSoal = /^\d+$/.test(s.id) || s.id.startsWith("import_");

// //         if (isNewSoal) {
// //           // ── Soal baru: buat dulu via POST ──
// //           const soalRes = await api.post<{ id: string }>(`/mata-pelajaran/${selectedSubject.id}/soal`, {
// //             pertanyaan: s.pertanyaan,
// //             tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
// //             topik: s.topik || null,
// //             gambarUrl: s.gambar || null,
// //             opsiA: s.opsi[0] || null,
// //             opsiB: s.opsi[1] || null,
// //             opsiC: s.opsi[2] || null,
// //             opsiD: s.opsi[3] || null,
// //             opsiE: s.opsi[4] || null,
// //             jawabanBenar: s.jawaban || null,
// //           });
// //           soalIds.push(soalRes.id);
// //         } else {
// //           // ── Soal lama: update via PUT ──
// //           await api.put(`/soal/${s.id}`, {
// //             pertanyaan: s.pertanyaan,
// //             tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
// //             topik: s.topik || null,
// //             gambarUrl: s.gambar || null,
// //             opsiA: s.opsi[0] || null,
// //             opsiB: s.opsi[1] || null,
// //             opsiC: s.opsi[2] || null,
// //             opsiD: s.opsi[3] || null,
// //             opsiE: s.opsi[4] || null,
// //             jawabanBenar: s.jawaban || null,
// //           });
// //           soalIds.push(s.id);
// //         }
// //       }

// //       await api.put(`/ujian/${ujianId}`, { soalIds });
// //       setUjianList(prev => prev.map(u => u.id === ujianId ? { ...u, soalList, totalSoal: soalList.length } : u));
// //       fetchSubjects();
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Gagal menyimpan soal");
// //     }
// //   }

// //   function copyToClipboard(text: string, type: "link" | "token") {
// //     navigator.clipboard.writeText(text).then(() => {
// //       if (type === "link") { setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); }
// //       else { setCopiedToken(true); setTimeout(() => setCopiedToken(false), 2000); }
// //     });
// //   }

// //   function hitungNilaiAkhir() {
// //     const namaList = ["Adi Nugroho", "Bella Rahmawati", "Candra Wijaya", "Dewi Anggraeni", "Eko Prasetyo"];
// //     let seed = 12345;
// //     function rand(min: number, max: number) { seed = (seed * 9301 + 49297) % 233280; return min + Math.floor((seed / 233280) * (max - min + 1)); }
// //     const bU = bobotUjian / 100, bUl = bobotUlangan / 100, bL = bobotLatihan / 100, bK = bobotKuis / 100;
// //     const data = namaList.map((nama, i) => {
// //       const ujian = rand(55, 100), ulangan = rand(55, 100), latihan = rand(60, 100), kuis = rand(60, 100);
// //       const akhir = Math.round(ujian * bU + ulangan * bUl + latihan * bL + kuis * bK);
// //       return { nisn: `005${String(i + 1).padStart(5, "0")}`, nama, ujian, ulangan, latihan, kuis, akhir, lulus: akhir >= kkm, grade: akhir >= 90 ? "A" : akhir >= 80 ? "B" : akhir >= 70 ? "C" : "D" };
// //     });
// //     setNilaiData(data); setShowNilaiHasil(true);
// //     setTimeout(() => document.getElementById("nilai-hasil-section")?.scrollIntoView({ behavior: "smooth" }), 100);
// //   }

// //   function getSortedNilaiData() {
// //     return [...nilaiData]
// //       .filter(s => { if (nilaiFilter === "lulus" && !s.lulus) return false; if (nilaiFilter === "tidak" && s.lulus) return false; return true; })
// //       .sort((a, b) => { const va = a[nilaiSortKey]; const vb = b[nilaiSortKey]; return nilaiSortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1); });
// //   }

// //   const bobotTotal = bobotUjian + bobotUlangan + bobotLatihan + bobotKuis;
// //   const isBobotValid = bobotTotal === 100;

// //   const renderContentTable = () => {
// //     if (ujianLoading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>;
// //     const tabLabel = TAB_LABELS[activeTab] || activeTab;
// //     return (
// //       <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// //         <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
// //           <h3 className="font-semibold text-zinc-900 text-[13px]">Daftar {tabLabel}</h3>
// //           <span className="text-[11px] text-slate-400 font-medium">{ujianList.length} {tabLabel.toLowerCase()}</span>
// //         </div>
// //         {ujianList.length === 0 ? (
// //           <div className="py-12 text-center">
// //             <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// //             <p className="text-[13px] text-slate-400">Belum ada {tabLabel.toLowerCase()}</p>
// //             <button onClick={() => setShowContentModal(true)} className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-zinc-700 underline"><Plus className="w-3.5 h-3.5" /> Tambah {tabLabel}</button>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="w-full text-sm" style={{ minWidth: "680px" }}>
// //               <thead className="border-b border-slate-100 bg-slate-50/50">
// //                 <tr>
// //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama {tabLabel}</th>
// //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Tanggal</th>
// //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Soal</th>
// //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Urutan</th>
// //                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
// //                   <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Aksi</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-slate-50">
// //                 {ujianList.map(item => {
// //                   const soalCount = item.soalList?.length ?? item.totalSoal;
// //                   return (
// //                     <tr key={item.id} className="hover:bg-slate-50/50">
// //                       <td className="px-4 py-3">
// //                         <p className="font-medium text-zinc-900 text-[13px]">{item.nama}</p>
// //                         <p className="text-[10px] text-slate-400 mt-0.5">{item.kelas}</p>
// //                       </td>
// //                       <td className="px-4 py-3 text-slate-500 text-[12px] hidden sm:table-cell">
// //                         {item.tanggalMulai ? new Date(item.tanggalMulai).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "—"}
// //                       </td>
// //                       <td className="px-4 py-3">
// //                         <div className="flex items-center gap-1.5">
// //                           <span className="font-semibold text-zinc-900 text-[12px]">{soalCount}</span>
// //                           <button onClick={() => { setSelectedUjian(item); setShowKelolaSoal(true); }}
// //                             className="inline-flex items-center gap-1 h-5 px-1.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-500 hover:bg-zinc-900 hover:text-white transition-colors">
// //                             <Edit3 className="w-2.5 h-2.5" /> Kelola
// //                           </button>
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-3 hidden sm:table-cell">
// //                         {item.soalAcak
// //                           ? <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full"><Shuffle className="w-3 h-3" /> Acak</span>
// //                           : <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full"><ListOrdered className="w-3 h-3" /> Urut</span>}
// //                       </td>
// //                       <td className="px-4 py-3">
// //                         {item.status === "BERLANGSUNG" && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" /> BERLANGSUNG</span>}
// //                         {item.status === "SELESAI" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">SELESAI</span>}
// //                         {item.status === "AKTIF" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">AKTIF</span>}
// //                         {item.status === "DRAFT" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">DRAFT</span>}
// //                       </td>
// //                       <td className="px-4 py-3">
// //                         <div className="flex items-center justify-end gap-1">
// //                           <button onClick={() => { setSelectedUjian(item); setShowToken(false); setCopiedLink(false); setCopiedToken(false); setShowDetailModal(true); }}
// //                             className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors">Detail</button>
// //                           <button onClick={() => { setHasilUjianTarget(item); setShowHasilModal(true); }}
// //                             className="h-7 px-2.5 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-semibold hover:bg-emerald-100 transition-colors">Hasil</button>
// //                           <button onClick={() => { setTargetUjian(item); setShowEditUjianModal(true); }}
// //                             className="h-7 w-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
// //                           <button onClick={() => { setTargetUjian(item); setShowDeleteUjianModal(true); }}
// //                             className="h-7 w-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   const renderNilaiTab = () => (
// //     <div className="space-y-4">
// //       <div className="bg-white border border-slate-200 rounded-[14px] p-4 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// //         <div className="flex items-start justify-between gap-3 mb-4">
// //           <div>
// //             <h3 className="font-bold text-zinc-900 text-[14px]">Konfigurasi Rumus Nilai Akhir</h3>
// //             <p className="text-[11px] text-slate-500 mt-0.5">Total bobot harus <strong>100%</strong>.</p>
// //           </div>
// //           <div className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[13px] font-bold ${isBobotValid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>{bobotTotal}%</div>
// //         </div>
// //         <div className="space-y-3">
// //           {[
// //             { label: "Ujian", icon: <ClipboardList className="w-4 h-4 text-violet-600" />, desc: `${ujianList.length} ujian`, val: bobotUjian, set: setBobotUjian, color: "violet" },
// //             { label: "Ulangan Harian", icon: <Book className="w-4 h-4 text-blue-600" />, desc: "Rata-rata semua ulangan", val: bobotUlangan, set: setBobotUlangan, color: "blue" },
// //             { label: "Latihan", icon: <Dumbbell className="w-4 h-4 text-emerald-600" />, desc: "Rata-rata semua latihan", val: bobotLatihan, set: setBobotLatihan, color: "emerald" },
// //             { label: "Kuis", icon: <Zap className="w-4 h-4 text-amber-600" />, desc: "Rata-rata semua kuis", val: bobotKuis, set: setBobotKuis, color: "amber" },
// //           ].map(item => (
// //             <div key={item.label} className={`p-3 rounded-xl bg-${item.color}-50 border border-${item.color}-100`}>
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-2">
// //                   <div className={`w-7 h-7 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>{item.icon}</div>
// //                   <div>
// //                     <p className="font-semibold text-zinc-900 text-[12px]">{item.label}</p>
// //                     <p className="text-[10px] text-slate-400">{item.desc}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-1.5">
// //                   <input type="number" value={item.val} onChange={e => item.set(parseInt(e.target.value) || 0)}
// //                     className="w-16 h-8 text-center border-[1.5px] border-slate-200 rounded-lg text-[12px] font-semibold text-zinc-900 bg-white focus:border-zinc-900 outline-none" />
// //                   <span className="text-[12px] font-semibold text-slate-500">%</span>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //         <div className="mt-4 p-3 bg-slate-900 rounded-xl">
// //           <p className="text-[10px] text-slate-400 mb-1 font-semibold uppercase tracking-wider">Preview Rumus</p>
// //           <p className="text-[12px] text-white font-mono">
// //             NA = {bobotUjian > 0 && `Ujian×${bobotUjian}%`}{bobotUjian > 0 && bobotUlangan > 0 && " + "}{bobotUlangan > 0 && `UH×${bobotUlangan}%`}{bobotUlangan > 0 && bobotLatihan > 0 && " + "}{bobotLatihan > 0 && `Latihan×${bobotLatihan}%`}{bobotLatihan > 0 && bobotKuis > 0 && " + "}{bobotKuis > 0 && `Kuis×${bobotKuis}%`}
// //           </p>
// //         </div>
// //         <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
// //           <KkmField kkm={kkm} setKkm={setKkm} />
// //           <button onClick={hitungNilaiAkhir} disabled={!isBobotValid}
// //             className="h-10 px-5 bg-zinc-900 text-white text-[13px] font-bold rounded-xl hover:bg-zinc-800 flex items-center gap-2 disabled:opacity-40 w-full sm:w-auto justify-center">
// //             <Calculator className="w-4 h-4" /> Hitung Nilai Akhir
// //           </button>
// //         </div>
// //         {!isBobotValid && (
// //           <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
// //             <AlertCircle className="text-red-500 w-4 h-4 flex-shrink-0" />
// //             <p className="text-[11px] text-red-600 font-medium">Total bobot harus 100%. Sesuaikan sebelum menghitung.</p>
// //           </div>
// //         )}
// //       </div>

// //       {showNilaiHasil && (
// //         <div id="nilai-hasil-section" className="space-y-4">
// //           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// //             {[
// //               { label: "Total Siswa", val: nilaiData.length, icon: <Users className="w-3.5 h-3.5" />, color: "#18181b" },
// //               { label: "Rata-rata", val: (nilaiData.reduce((a: number, b: any) => a + b.akhir, 0) / nilaiData.length).toFixed(1), icon: <BarChart2 className="w-3.5 h-3.5" />, color: "#2563eb" },
// //               { label: "Nilai Tertinggi", val: Math.max(...nilaiData.map((s: any) => s.akhir)), icon: <TrendingUp className="w-3.5 h-3.5" />, color: "#059669" },
// //               { label: `Lulus (≥${kkm})`, val: `${nilaiData.filter((s: any) => s.lulus).length}/${nilaiData.length}`, icon: <CheckCircle className="w-3.5 h-3.5" />, color: "#059669" },
// //             ].map(s => (
// //               <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// //                 <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>{s.icon}</div>
// //                 <div><p className="text-lg font-bold text-zinc-900">{s.val}</p><p className="text-[10px] text-slate-400 font-medium">{s.label}</p></div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// //             <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
// //               <h3 className="font-semibold text-zinc-900 text-[13px]">Rekap Nilai Akhir Siswa</h3>
// //               <select value={nilaiFilter} onChange={e => setNilaiFilter(e.target.value)} className="h-8 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-600 focus:outline-none">
// //                 <option value="all">Semua</option>
// //                 <option value="lulus">Lulus</option>
// //                 <option value="tidak">Tidak Lulus</option>
// //               </select>
// //             </div>
// //             <div className="overflow-x-auto">
// //               <table className="w-full" style={{ minWidth: "480px" }}>
// //                 <thead className="border-b border-slate-100 bg-slate-50/50">
// //                   <tr>
// //                     <th className="px-4 py-3 text-center text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
// //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama</th>
// //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell cursor-pointer" onClick={() => { if (nilaiSortKey === "ujian") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("ujian"); setNilaiSortAsc(false); } }}>Ujian</th>
// //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell cursor-pointer" onClick={() => { if (nilaiSortKey === "ulangan") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("ulangan"); setNilaiSortAsc(false); } }}>Ulangan</th>
// //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer" onClick={() => { if (nilaiSortKey === "akhir") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("akhir"); setNilaiSortAsc(false); } }}>Nilai Akhir</th>
// //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Grade</th>
// //                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell">Status</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-slate-50">
// //                   {getSortedNilaiData().map((s: any) => {
// //                     const ranked = [...nilaiData].sort((a: any, b: any) => b.akhir - a.akhir);
// //                     const rank = ranked.findIndex((r: any) => r.nisn === s.nisn) + 1;
// //                     const rankClass = rank === 1 ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white" : rank === 2 ? "bg-gradient-to-br from-slate-400 to-slate-500 text-white" : rank === 3 ? "bg-gradient-to-br from-orange-400 to-amber-600 text-white" : "bg-slate-100 text-slate-600";
// //                     const akhirColor = s.akhir >= 90 ? "#059669" : s.akhir >= 80 ? "#10b981" : s.akhir >= 70 ? "#2563eb" : "#dc2626";
// //                     const gradeClass: Record<string, string> = { A: "bg-emerald-50 text-emerald-700", B: "bg-blue-50 text-blue-700", C: "bg-amber-50 text-amber-700", D: "bg-red-50 text-red-700" };
// //                     return (
// //                       <tr key={s.nisn} className="hover:bg-slate-50/50">
// //                         <td className="px-4 py-3 text-center"><span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center mx-auto ${rankClass}`}>{rank}</span></td>
// //                         <td className="px-4 py-3"><p className="font-semibold text-zinc-900 text-[12px] truncate max-w-[120px]">{s.nama}</p><p className="text-[10px] text-slate-400">{s.nisn}</p></td>
// //                         <td className="px-4 py-3 hidden sm:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ujian}</span></td>
// //                         <td className="px-4 py-3 hidden md:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ulangan}</span></td>
// //                         <td className="px-4 py-3"><span className="font-black text-[15px]" style={{ color: akhirColor }}>{s.akhir}</span></td>
// //                         <td className="px-4 py-3 hidden sm:table-cell"><span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-extrabold ${gradeClass[s.grade]}`}>{s.grade}</span></td>
// //                         <td className="px-4 py-3 hidden md:table-cell">
// //                           {s.lulus ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
// //                             : <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>}
// //                         </td>
// //                       </tr>
// //                     );
// //                   })}
// //                 </tbody>
// //               </table>
// //             </div>
// //             <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
// //               <span className="text-[11px] text-slate-400">{getSortedNilaiData().length} dari {nilaiData.length} siswa</span>
// //               <span className="text-[11px] text-slate-500">KKM: <strong className="text-zinc-900">{kkm}</strong></span>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );

// //   if (loading) {
// //     return <div className="flex h-screen items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-zinc-900" /></div>;
// //   }

// //   return (
// //     <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
// //       {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
// //       <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 fixed md:relative z-50`}>
// //         <Sidebar role="admin" />
// //       </div>

// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         <Header
// //           title={selectedSubject ? `${selectedSubject.nama} › ${TAB_LABELS[activeTab] || activeTab}` : "Mata Pelajaran"}
// //           showHamburger
// //           onHamburgerClick={() => setSidebarOpen(true)}
// //         />

// //         <div className="flex-1 overflow-y-auto">
// //           {/* ══ LIST MAPEL ══ */}
// //           {!selectedSubject && (
// //             <div className="p-4 md:p-8 space-y-5">
// //               {error && (
// //                 <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
// //                   <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
// //                   <button onClick={() => setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4" /></button>
// //                 </div>
// //               )}
// //               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
// //                 <div>
// //                   <h1 className="text-lg md:text-xl font-bold text-zinc-900">Mata Pelajaran</h1>
// //                   <p className="text-[13px] text-slate-500 mt-0.5">Kelola semua mata pelajaran</p>
// //                 </div>
// //                 <button onClick={() => { setShowAddModal(true); setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" }); }}
// //                   className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm w-fit">
// //                   <Plus className="w-4 h-4" /> Tambah Mata Pelajaran
// //                 </button>
// //               </div>

// //               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// //                 {[
// //                   { label: "Total Mapel", val: subjects.length, icon: <BookOpen className="w-4 h-4" />, color: "#18181b" },
// //                   { label: "Total Soal", val: stats.totalSoal, icon: <FileText className="w-4 h-4" />, color: "#2563eb" },
// //                   { label: "Total Ujian", val: stats.totalUjian, icon: <ClipboardList className="w-4 h-4" />, color: "#059669" },
// //                   { label: "Kelas", val: [...new Set(subjects.map(s => s.kelas))].length, icon: <Users className="w-4 h-4" />, color: "#d97706" },
// //                 ].map(s => (
// //                   <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// //                     <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>{s.icon}</div>
// //                     <div><p className="text-lg md:text-xl font-bold text-zinc-900">{s.val}</p><p className="text-[10px] md:text-[11px] text-slate-400 font-medium">{s.label}</p></div>
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
// //                 <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
// //                   <div className="flex gap-2 flex-wrap">
// //                     {["all", "X", "XI", "XII"].map(k => (
// //                       <button key={k} onClick={() => setKelasFilter(k)}
// //                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${kelasFilter === k ? "bg-zinc-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
// //                         {k === "all" ? "Semua" : k}
// //                       </button>
// //                     ))}
// //                   </div>
// //                   <div className="relative flex-1 max-w-xs">
// //                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                     <input type="text" placeholder="Cari mata pelajaran..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
// //                       className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //                 {filtered.map(subject => {
// //                   const c = COLORS[subject.warna] || COLORS.zinc;
// //                   return (
// //                     <div key={subject.id}
// //                       className="bg-white border border-slate-200 rounded-[16px] overflow-hidden cursor-pointer hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 hover:border-slate-300 transition-all group"
// //                       onClick={() => { setSelectedSubject(subject); setActiveTab("ujian"); setShowNilaiHasil(false); }}>
// //                       <div className="h-[6px]" style={{ background: `linear-gradient(90deg, ${c.dot}, ${c.hex}88)` }} />
// //                       <div className="p-5">
// //                         <div className="flex items-start gap-3 mb-3">
// //                           <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{ background: c.bg, border: `1.5px solid ${c.border}` }}>
// //                             <BookOpen style={{ color: c.icon }} className="w-5 h-5" />
// //                           </div>
// //                           <div className="flex-1 min-w-0">
// //                             <p className="font-bold text-zinc-900 text-[14px] leading-tight truncate">{subject.nama}</p>
// //                             <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: c.bg, color: c.icon, border: `1px solid ${c.border}` }}>{subject.kelas}</span>
// //                           </div>
// //                         </div>
// //                         {subject.deskripsi && <p className="text-[12px] text-slate-500 mb-3 line-clamp-2">{subject.deskripsi}</p>}
// //                         <div className="flex items-center gap-4 text-[12px] text-slate-500 pt-3 border-t border-slate-100">
// //                           <div className="flex items-center gap-1.5">
// //                             <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><FileText className="w-3 h-3 text-slate-400" /></div>
// //                             <span className="font-medium">{subject.totalSoal} soal</span>
// //                           </div>
// //                           <div className="flex items-center gap-1.5">
// //                             <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><ClipboardList className="w-3 h-3 text-slate-400" /></div>
// //                             <span className="font-medium">{subject.totalUjian} ujian</span>
// //                           </div>
// //                           <div className="ml-auto flex items-center gap-1">
// //                             <button onClick={e => { e.stopPropagation(); setTargetMapel(subject); setEditForm(subject); setShowEditModal(true); }}
// //                               className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
// //                             <button onClick={e => { e.stopPropagation(); openDeleteMapelModal(subject); }}
// //                               className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
// //                             <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //                 <div onClick={() => { setShowAddModal(true); setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" }); }}
// //                   className="border-2 border-dashed border-slate-200 rounded-[16px] p-5 flex flex-col items-center justify-center gap-2 text-center cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all min-h-[160px]">
// //                   <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center"><Plus className="text-slate-400 w-5 h-5" /></div>
// //                   <div>
// //                     <p className="text-[13px] text-zinc-700 font-semibold">Tambah Mata Pelajaran</p>
// //                     <p className="text-[11px] text-slate-400 mt-0.5">Buat mapel baru</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* ══ DETAIL MAPEL ══ */}
// //           {selectedSubject && (
// //             <div className="p-4 md:p-8 space-y-4">
// //               {error && (
// //                 <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
// //                   <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
// //                   <button onClick={() => setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4" /></button>
// //                 </div>
// //               )}
// //               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
// //                 <div className="flex items-center gap-3">
// //                   <button onClick={() => setSelectedSubject(null)} className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 flex-shrink-0">
// //                     <ArrowLeft className="w-4 h-4" />
// //                   </button>
// //                   <div className="min-w-0">
// //                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mata Pelajaran</p>
// //                     <h1 className="text-base md:text-lg font-bold text-zinc-900 truncate">{selectedSubject.nama} — {selectedSubject.kelas}</h1>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   {["ujian", "ulangan", "latihan", "kuis"].includes(activeTab) && (
// //                     <button onClick={() => setShowContentModal(true)}
// //                       className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm">
// //                       <Plus className="w-4 h-4" /> Tambah {TAB_LABELS[activeTab]}
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
// //                 {[
// //                   { label: "Total Soal", val: selectedSubject.totalSoal, icon: <FileText className="w-4 h-4 text-slate-400" /> },
// //                   { label: "Ujian", val: selectedSubject.totalUjian, icon: <ClipboardList className="w-4 h-4 text-slate-400" /> },
// //                   { label: "Siswa Aktif", val: 0, icon: <Users className="w-4 h-4 text-slate-400" /> },
// //                   { label: "Rata-rata", val: "0", icon: <TrendingUp className="w-4 h-4 text-slate-400" /> },
// //                 ].map(st => (
// //                   <div key={st.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// //                     <div className="flex items-center gap-2 mb-1">{st.icon}<p className="text-[11px] text-slate-400 font-medium">{st.label}</p></div>
// //                     <p className="text-xl md:text-2xl font-bold text-zinc-900">{st.val}</p>
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="overflow-x-auto -mx-1 px-1">
// //                 <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
// //                   {Object.entries(TAB_LABELS).map(([key, label]) => (
// //                     <button key={key} onClick={() => { setActiveTab(key); setShowNilaiHasil(false); }}
// //                       className={`px-3 py-2 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-all ${activeTab === key ? "bg-white text-zinc-900 shadow-sm" : "text-slate-500 hover:text-zinc-900"}`}>
// //                       {label}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               {(activeTab === "ujian" || activeTab === "ulangan" || activeTab === "latihan" || activeTab === "kuis") && renderContentTable()}

// //               {activeTab === "soal" && (
// //                 <div className="space-y-4">
// //                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
// //                     <div className="relative flex-1 max-w-xs">
// //                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
// //                       <input type="text" placeholder="Cari soal..." value={soalBankSearch} onChange={e => setSoalBankSearch(e.target.value)}
// //                         className="h-9 pl-8 pr-4 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 w-full" />
// //                     </div>
// //                     <select value={soalBankTipe} onChange={e => setSoalBankTipe(e.target.value)} className="h-9 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-white focus:outline-none">
// //                       <option value="">Semua Tipe</option>
// //                       <option value="PILIHAN_GANDA">Pilihan Ganda</option>
// //                       <option value="ESSAY">Essay</option>
// //                     </select>
// //                   </div>
// //                   <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
// //                     <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
// //                       <h3 className="font-semibold text-zinc-900 text-[13px]">Bank Soal</h3>
// //                       <span className="text-[11px] text-slate-400 font-medium">{soalBankList.length} soal</span>
// //                     </div>
// //                     {soalBankLoading ? (
// //                       <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>
// //                     ) : soalBankList.length === 0 ? (
// //                       <div className="py-12 text-center">
// //                         <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
// //                         <p className="text-[13px] text-slate-400">Belum ada soal di bank soal ini</p>
// //                         <p className="text-[11px] text-slate-400 mt-1">Soal dibuat melalui tab Ujian/Latihan/Kuis</p>
// //                       </div>
// //                     ) : (
// //                       <div className="divide-y divide-slate-50">
// //                         {soalBankList.map((s, i) => (
// //                           <div key={s.id} className="px-4 py-3.5 hover:bg-slate-50/50 flex items-start gap-3">
// //                             <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
// //                             <div className="flex-1 min-w-0">
// //                               <p className="text-[13px] text-zinc-900 font-medium leading-snug">{s.pertanyaan}</p>
// //                               {s.gambarUrl && <img src={s.gambarUrl} alt="" className="mt-2 h-16 rounded-lg object-cover border border-slate-200" />}
// //                               <div className="flex items-center gap-2 mt-1.5 flex-wrap">
// //                                 <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "PILIHAN_GANDA" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{s.tipe === "PILIHAN_GANDA" ? "Pilihan Ganda" : "Essay"}</span>
// //                                 {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
// //                                 {s.tipe === "PILIHAN_GANDA" && s.jawabanBenar && <span className="text-[10px] text-slate-400">Jwb: <strong className="text-emerald-600">{s.jawabanBenar}</strong></span>}
// //                               </div>
// //                               {s.tipe === "PILIHAN_GANDA" && (
// //                                 <div className="mt-2 grid grid-cols-2 gap-1">
// //                                   {[
// //                                     { key: "opsiA", label: "A" }, { key: "opsiB", label: "B" },
// //                                     { key: "opsiC", label: "C" }, { key: "opsiD", label: "D" },
// //                                     { key: "opsiE", label: "E" },
// //                                   ].filter(o => s[o.key]).map(o => (
// //                                     <div key={o.key} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] ${s.jawabanBenar === o.label ? "bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold" : "bg-slate-50 text-slate-600"}`}>
// //                                       <span className="font-bold">{o.label}.</span> {s[o.key]}
// //                                     </div>
// //                                   ))}
// //                                 </div>
// //                               )}
// //                             </div>
// //                             <span className="text-[10px] text-slate-300 flex-shrink-0 mt-1">
// //                               {new Date(s.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
// //                             </span>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               )}

// //               {activeTab === "nilai" && renderNilaiTab()}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* ══ MODAL: Add Mapel ══ */}
// //       {showAddModal && (
// //         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
// //           <div className="absolute inset-0" onClick={() => setShowAddModal(false)} />
// //           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
// //             <div className="flex items-center justify-between mb-5">
// //               <h3 className="text-base font-bold text-zinc-900">Tambah Mata Pelajaran</h3>
// //               <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// //             </div>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label>
// //                 <input type="text" placeholder="e.g. Matematika Peminatan" value={addForm.nama} onChange={e => setAddForm({ ...addForm, nama: e.target.value })}
// //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// //               </div>
// //               <div>
// //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas <span className="text-red-500">*</span></label>
// //                 <select value={addForm.kelas} onChange={e => setAddForm({ ...addForm, kelas: e.target.value })}
// //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white">
// //                   <option value="">Pilih kelas...</option>
// //                   <optgroup label="Kelas X">
// //                     <option value="X IPA 1">X IPA 1</option>
// //                     <option value="X IPA 2">X IPA 2</option>
// //                     <option value="X IPS 1">X IPS 1</option>
// //                     <option value="X IPS 2">X IPS 2</option>
// //                   </optgroup>
// //                   <optgroup label="Kelas XI">
// //                     <option value="XI IPA 1">XI IPA 1</option>
// //                     <option value="XI IPA 2">XI IPA 2</option>
// //                     <option value="XI IPS 1">XI IPS 1</option>
// //                     <option value="XI IPS 2">XI IPS 2</option>
// //                   </optgroup>
// //                   <optgroup label="Kelas XII">
// //                     <option value="XII IPA 1">XII IPA 1</option>
// //                     <option value="XII IPA 2">XII IPA 2</option>
// //                     <option value="XII IPS 1">XII IPS 1</option>
// //                     <option value="XII IPS 2">XII IPS 2</option>
// //                   </optgroup>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label>
// //                 <textarea placeholder="Deskripsi singkat..." value={addForm.deskripsi} onChange={e => setAddForm({ ...addForm, deskripsi: e.target.value })}
// //                   className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none" rows={3} />
// //               </div>
// //               <div>
// //                 <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Warna Tema</label>
// //                 <div className="flex gap-2 flex-wrap">
// //                   {Object.entries(COLORS).map(([key, c]) => (
// //                     <button key={key} onClick={() => setAddForm({ ...addForm, warna: key })}
// //                       className={`w-8 h-8 rounded-full transition-all ${addForm.warna === key ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : "hover:scale-105"}`}
// //                       style={{ background: c.hex }} title={key} />
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="flex gap-3 mt-6">
// //               <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// //               <button onClick={handleAdd} disabled={!addForm.nama.trim() || !addForm.kelas.trim()} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40">Simpan</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ══ MODAL: Edit Mapel ══ */}
// //       {showEditModal && editForm && (
// //         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
// //           <div className="absolute inset-0" onClick={() => setShowEditModal(false)} />
// //           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
// //             <div className="flex items-center justify-between mb-5">
// //               <h3 className="text-base font-bold text-zinc-900">Edit Mata Pelajaran</h3>
// //               <button onClick={() => setShowEditModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// //             </div>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama</label>
// //                 <input type="text" value={editForm.nama} onChange={e => setEditForm({ ...editForm, nama: e.target.value })}
// //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
// //               </div>
// //               <div>
// //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas</label>
// //                 <select value={editForm.kelas} onChange={e => setEditForm({ ...editForm, kelas: e.target.value })}
// //                   className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white">
// //                   <option value="">Pilih kelas...</option>
// //                   <optgroup label="Kelas X">
// //                     <option value="X IPA 1">X IPA 1</option>
// //                     <option value="X IPA 2">X IPA 2</option>
// //                     <option value="X IPS 1">X IPS 1</option>
// //                     <option value="X IPS 2">X IPS 2</option>
// //                   </optgroup>
// //                   <optgroup label="Kelas XI">
// //                     <option value="XI IPA 1">XI IPA 1</option>
// //                     <option value="XI IPA 2">XI IPA 2</option>
// //                     <option value="XI IPS 1">XI IPS 1</option>
// //                     <option value="XI IPS 2">XI IPS 2</option>
// //                   </optgroup>
// //                   <optgroup label="Kelas XII">
// //                     <option value="XII IPA 1">XII IPA 1</option>
// //                     <option value="XII IPA 2">XII IPA 2</option>
// //                     <option value="XII IPS 1">XII IPS 1</option>
// //                     <option value="XII IPS 2">XII IPS 2</option>
// //                   </optgroup>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label>
// //                 <textarea value={editForm.deskripsi || ""} onChange={e => setEditForm({ ...editForm, deskripsi: e.target.value })}
// //                   className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none" rows={3} />
// //               </div>
// //             </div>
// //             <div className="flex gap-3 mt-6">
// //               <button onClick={() => setShowEditModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
// //               <button onClick={handleEdit} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800">Simpan</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ══ MODAL: Delete Mapel ══ */}
// //       {showDeleteModal && targetMapel && (
// //         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
// //           <div className="absolute inset-0" onClick={() => { if (!deleteMapelLoading) { setShowDeleteModal(false); setDeleteMapelDetail(null); } }} />
// //           <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
// //             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trash2 className="w-6 h-6 text-red-600" /></div>
// //             <h3 className="text-base font-bold text-zinc-900 text-center mb-1">Hapus Mata Pelajaran?</h3>
// //             <p className="text-[13px] font-semibold text-zinc-800 text-center mb-4">"{targetMapel.nama}"</p>
// //             {deleteMapelLoading ? (
// //               <div className="flex flex-col items-center gap-2 py-4"><Loader2 className="w-5 h-5 animate-spin text-slate-400" /><p className="text-[11px] text-slate-400">Mengambil informasi data...</p></div>
// //             ) : deleteMapelDetail ? (
// //               <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
// //                 <p className="text-[11px] font-bold text-red-700 mb-3 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Data yang akan ikut terhapus permanen:</p>
// //                 <div className="space-y-2">
// //                   {[
// //                     { label: "Ujian", val: deleteMapelDetail.totalUjian, icon: "📝" },
// //                     { label: "Ulangan Harian", val: deleteMapelDetail.totalUlangan, icon: "📋" },
// //                     { label: "Latihan", val: deleteMapelDetail.totalLatihan, icon: "💪" },
// //                     { label: "Kuis", val: deleteMapelDetail.totalKuis, icon: "⚡" },
// //                     { label: "Bank Soal", val: deleteMapelDetail.totalSoal, icon: "📚" },
// //                   ].map(item => (
// //                     <div key={item.label} className="flex items-center justify-between">
// //                       <span className="text-[12px] text-red-700 flex items-center gap-1.5"><span>{item.icon}</span> {item.label}</span>
// //                       <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${item.val > 0 ? "bg-red-200 text-red-800" : "bg-slate-100 text-slate-400"}`}>{item.val} item</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <div className="mt-3 pt-3 border-t border-red-200"><p className="text-[10px] text-red-600 font-semibold text-center">⚠️ Tindakan ini tidak dapat dibatalkan!</p></div>
// //               </div>
// //             ) : (
// //               <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4"><p className="text-[12px] text-slate-500 text-center">Semua data terkait akan terhapus permanen.</p></div>
// //             )}
// //             <div className="flex gap-3">
// //               <button onClick={() => { setShowDeleteModal(false); setDeleteMapelDetail(null); }} disabled={deleteMapelLoading} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50 disabled:opacity-40">Batal</button>
// //               <button onClick={handleDelete} disabled={deleteMapelLoading} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700 disabled:opacity-40 flex items-center justify-center gap-2">
// //                 {deleteMapelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Ya, Hapus Semua
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ══ MODAL: Detail Ujian ══ */}
// //       {showDetailModal && selectedUjian && (
// //         <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
// //           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
// //           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
// //             <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
// //               <div className="flex items-center gap-2.5">
// //                 <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center"><ClipboardList className="w-4 h-4 text-zinc-600" /></div>
// //                 <div>
// //                   <h3 className="text-[14px] font-bold text-zinc-900">Detail {TAB_LABELS[selectedUjian.tipe?.toLowerCase()] || "Ujian"}</h3>
// //                   <p className="text-[10px] text-slate-400">Informasi & Akses</p>
// //                 </div>
// //               </div>
// //               <button onClick={() => setShowDetailModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
// //             </div>
// //             <div className="p-5 space-y-4">
// //               <div className="bg-slate-50 rounded-xl p-4 space-y-3">
// //                 <div>
// //                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nama</p>
// //                   <p className="font-bold text-zinc-900 text-[14px]">{selectedUjian.nama}</p>
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   {[
// //                     { icon: <Calendar className="w-3.5 h-3.5 text-slate-400" />, label: "Tanggal", val: selectedUjian.tanggalMulai ? new Date(selectedUjian.tanggalMulai).toLocaleDateString("id-ID") : "—" },
// //                     { icon: <Clock className="w-3.5 h-3.5 text-slate-400" />, label: "Durasi", val: `${selectedUjian.durasi} menit` },
// //                     { icon: <FileText className="w-3.5 h-3.5 text-slate-400" />, label: "Total Soal", val: `${selectedUjian.soalList?.length ?? selectedUjian.totalSoal} soal` },
// //                     { icon: <Users className="w-3.5 h-3.5 text-slate-400" />, label: "Peserta", val: selectedUjian.peserta },
// //                   ].map(it => (
// //                     <div key={it.label} className="flex items-center gap-2">
// //                       <div className="w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">{it.icon}</div>
// //                       <div>
// //                         <p className="text-[9px] text-slate-400 font-semibold uppercase">{it.label}</p>
// //                         <p className="text-[12px] font-semibold text-zinc-700">{it.val}</p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
// //                 <div className="flex items-center gap-2 mb-2">
// //                   <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
// //                   <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Link Akses Siswa</p>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <div className="flex-1 min-w-0 bg-white border border-blue-200 rounded-lg px-3 py-2">
// //                     <p className="text-[11px] font-mono text-blue-700 truncate">{selectedUjian.linkSiswa}</p>
// //                   </div>
// //                   <button onClick={() => copyToClipboard(selectedUjian.linkSiswa, "link")}
// //                     className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedLink ? "bg-emerald-500 text-white" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}>
// //                     {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedLink ? "Disalin!" : "Salin"}
// //                   </button>
// //                 </div>
// //                 <a href={selectedUjian.linkPreview} target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">
// //                   <ExternalLink className="w-3 h-3" /> Buka Preview Ujian
// //                 </a>
// //               </div>

// //               <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
// //                 <div className="flex items-center gap-2 mb-2">
// //                   <Hash className="w-3.5 h-3.5 text-amber-500" />
// //                   <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Token Ujian</p>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <div className="flex-1 min-w-0 bg-white border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
// //                     <p className={`text-[13px] font-mono font-bold tracking-widest flex-1 ${showToken ? "text-amber-700" : "text-amber-200 select-none"}`}>
// //                       {showToken ? selectedUjian.token : selectedUjian.token.replace(/[A-Z0-9]/g, "•")}
// //                     </p>
// //                     <button onClick={() => setShowToken(!showToken)} className="text-amber-400 hover:text-amber-600">
// //                       {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                     </button>
// //                   </div>
// //                   <button onClick={() => copyToClipboard(selectedUjian.token, "token")}
// //                     className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedToken ? "bg-emerald-500 text-white" : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50"}`}>
// //                     {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedToken ? "Disalin!" : "Salin"}
// //                   </button>
// //                 </div>
// //                 <p className="text-[10px] text-amber-600 mt-2">⚠️ Bagikan token hanya kepada siswa yang berhak.</p>
// //               </div>
// //             </div>
// //             <div className="p-5 pt-0">
// //               <button onClick={() => setShowDetailModal(false)} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ══ MODAL: Tambah Konten ══ */}
// //       {showContentModal && (
// //         <AddContentModal activeTab={activeTab} onClose={() => setShowContentModal(false)} onSave={handleSaveContent} />
// //       )}

// //       {/* ══ MODAL: Kelola Soal ══ */}
// //       {showKelolaSoal && selectedUjian && (
// //         <KelolaSoalModal ujian={selectedUjian} onClose={() => { setShowKelolaSoal(false); setSelectedUjian(null); }} onUpdate={handleUpdateSoal} />
// //       )}

// //       {/* ══ MODAL: Edit Ujian ══ */}
// //       {showEditUjianModal && targetUjian && (
// //         <EditUjianModal ujian={targetUjian} onClose={() => { setShowEditUjianModal(false); setTargetUjian(null); }} onSave={handleEditUjian}
// //           onKelolaSoal={() => { setSelectedUjian(targetUjian); setShowEditUjianModal(false); setShowKelolaSoal(true); }} />
// //       )}

// //       {/* ══ MODAL: Delete Ujian ══ */}
// //       {showDeleteUjianModal && targetUjian && (
// //         <DeleteUjianModal ujian={targetUjian} onClose={() => { setShowDeleteUjianModal(false); setTargetUjian(null); }} onDelete={handleDeleteUjian} />
// //       )}

// //       {/* ══ MODAL: Hasil Ujian ══ */}
// //       {showHasilModal && hasilUjianTarget && (
// //         <HasilUjianModal ujian={hasilUjianTarget} onClose={() => { setShowHasilModal(false); setHasilUjianTarget(null); }} />
// //       )}
// //     </div>
// //   );
// // }


























// "use client";

// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import { api, getToken } from "@/lib/api";
// import {
//   BookOpen, Plus, Search, Pencil, Trash2, Copy, ExternalLink,
//   AlertCircle, Loader2, X, ArrowLeft, FileText, ClipboardList,
//   Users, TrendingUp, BarChart2, CheckCircle, ChevronRight, Eye,
//   EyeOff, Check, Hash, Clock, Calendar, Edit3, ImageIcon, Upload,
//   Shuffle, ListOrdered, Save, Zap, Calculator, Dumbbell, Book, FileUp,
// } from "lucide-react";

// // ─── Types ────────────────────────────────────────────────────────────────────
// type MataPelajaran = {
//   id: number;
//   nama: string;
//   kelas: string;
//   deskripsi?: string;
//   warna: string;
//   totalSoal: number;
//   totalUjian: number;
// };

// type Ujian = {
//   id: string;
//   nama: string;
//   token: string;
//   kelas: string;
//   tipe: string;
//   status: string;
//   durasi: number;
//   tanggalMulai?: string;
//   totalSoal: number;
//   peserta: string;
//   linkSiswa: string;
//   linkPreview: string;
//   soalAcak?: boolean;
//   soalList?: SoalItem[];
// };

// type SoalItem = {
//   id: string;
//   pertanyaan: string;
//   tipe: "pg" | "essay";
//   opsi: string[];
//   jawaban: string;
//   topik: string;
//   // gambar selalu berupa URL Cloudinary (https://...) atau undefined
//   // TIDAK PERNAH base64 atau blob URL
//   gambar?: string;
// };

// type DeleteMapelDetail = {
//   totalUjian: number;
//   totalUlangan: number;
//   totalLatihan: number;
//   totalKuis: number;
//   totalSoal: number;
// };

// type HasilSiswa = {
//   nisn: string;
//   nama: string;
//   kelas: string;
//   nilai: number;
//   benar: number;
//   salah: number;
//   lulus: boolean;
//   pelanggaran: number;
//   catatan: string[];
// };

// type HasilUjian = {
//   ujian: { id: string; nama: string; durasi: string; totalSoal: number; kelas: string };
//   summary: { rataRata: number; tertinggi: number; terendah: number; lulus: number; gagal: number; totalSiswa: number };
//   siswa: HasilSiswa[];
// };

// // ─── Color System ─────────────────────────────────────────────────────────────
// const COLORS: Record<string, { bg: string; icon: string; dot: string; hex: string; border: string; light: string }> = {
//   zinc:    { bg: "#f4f4f5", icon: "#18181b", dot: "#52525b", hex: "#18181b", border: "#d4d4d8", light: "#fafafa" },
//   blue:    { bg: "#eff6ff", icon: "#2563eb", dot: "#3b82f6", hex: "#3b82f6", border: "#bfdbfe", light: "#eff6ff" },
//   violet:  { bg: "#f5f3ff", icon: "#7c3aed", dot: "#8b5cf6", hex: "#8b5cf6", border: "#ddd6fe", light: "#f5f3ff" },
//   emerald: { bg: "#ecfdf5", icon: "#059669", dot: "#10b981", hex: "#10b981", border: "#a7f3d0", light: "#ecfdf5" },
//   amber:   { bg: "#fffbeb", icon: "#d97706", dot: "#f59e0b", hex: "#f59e0b", border: "#fde68a", light: "#fffbeb" },
//   red:     { bg: "#fef2f2", icon: "#dc2626", dot: "#ef4444", hex: "#ef4444", border: "#fecaca", light: "#fef2f2" },
//   cyan:    { bg: "#ecfeff", icon: "#0891b2", dot: "#06b6d4", hex: "#06b6d4", border: "#a5f3fc", light: "#ecfeff" },
//   pink:    { bg: "#fdf2f8", icon: "#be185d", dot: "#ec4899", hex: "#ec4899", border: "#fbcfe8", light: "#fdf2f8" },
// };

// const TAB_LABELS: Record<string, string> = {
//   ujian: "Ujian", ulangan: "Ulangan", latihan: "Latihan", kuis: "Kuis", soal: "Bank Soal",
// };

// API key OpenRouter sekarang diproses aman oleh backend.
// const OPENROUTER_MODEL = "openai/gpt-oss-120b:free";
// const DEFAULT_OPSI = ["", "", "", "", ""];
// const DRAFT_KEY = (tab: string) => `guru_add_content_draft_${tab}`;

// interface DraftData {
//   step: 1 | 2;
//   nama: string;
//   tanggal: string;
//   durasi: string;
//   soalAcak: boolean;
//   // soalList di draft TIDAK menyimpan gambar (hanya teks/opsi/jawaban)
//   soalList: SoalItem[];
//   soalPertanyaan: string;
//   soalTipe: "pg" | "essay";
//   soalTopik: string;
//   soalOpsi: string[];
//   soalJawaban: string;
//   editingId: string | null;
// }

// // ─── Upload ke Cloudinary via backend API ─────────────────────────────────────
// // Menerima File object (bukan base64/blob URL)
// // Mengembalikan URL Cloudinary (https://...)
// async function uploadFileKeCloudinary(file: File): Promise<string> {
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
//   const formData = new FormData();
//   formData.append("file", file);

//   const uploadUrl = `${process.env.NEXT_PUBLIC_API_URL}/upload/image`;
//   console.log("[Upload] Sending to:", uploadUrl);

//   const res = await fetch(uploadUrl, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData,
//   });

//   if (!res.ok) {
//     let errMsg = `Upload gagal (status ${res.status})`;
//     try { const err = await res.json(); errMsg = err.message || errMsg; } catch (_) {}
//     throw new Error(errMsg);
//   }

//   const data = await res.json();
//   if (!data.url) throw new Error("Response tidak mengandung URL gambar");
//   console.log("[Upload] Success:", data.url);
//   return data.url as string;
// }

// // ─── Helper: pastikan gambar adalah URL Cloudinary ────────────────────────────
// // Mengembalikan URL https:// atau null
// // TIDAK menerima blob URL (sudah expired) atau base64 (tidak akan terjadi lagi)
// function safeGambarUrl(gambar?: string): string | null {
//   if (!gambar) return null;
//   if (gambar.startsWith("https://")) return gambar;
//   // blob URL atau data: diabaikan karena tidak valid lintas sesi
//   return null;
// }

// // ─── Export helpers ────────────────────────────────────────────────────────────
// function exportToExcel(data: HasilUjian, ujianNama: string) {
//   const header = ["No", "NISN", "Nama", "Kelas", "Nilai", "Benar", "Salah", "Status", "Pelanggaran"];
//   const rows = data.siswa.map((s, i) => [i + 1, s.nisn, s.nama, s.kelas, s.nilai, s.benar, s.salah, s.lulus ? "LULUS" : "TIDAK LULUS", s.pelanggaran]);
//   const summaryRows = [[], ["RINGKASAN"], ["Total Peserta", data.summary.totalSiswa], ["Rata-rata Nilai", data.summary.rataRata], ["Nilai Tertinggi", data.summary.tertinggi], ["Nilai Terendah", data.summary.terendah], ["Lulus", data.summary.lulus], ["Tidak Lulus", data.summary.gagal]];
//   const allRows = [header, ...rows, ...summaryRows];
//   const csvContent = allRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
//   const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = `Hasil_${ujianNama.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// }

// // Draft helpers — TIDAK menyimpan gambar
// function saveDraft(tab: string, data: DraftData) {
//   try { sessionStorage.setItem(DRAFT_KEY(tab), JSON.stringify(data)); } catch (_) {}
// }
// function loadDraft(tab: string): DraftData | null {
//   try { const raw = sessionStorage.getItem(DRAFT_KEY(tab)); return raw ? JSON.parse(raw) : null; } catch (_) { return null; }
// }
// function clearDraft(tab: string) {
//   try { sessionStorage.removeItem(DRAFT_KEY(tab)); } catch (_) {}
// }

// // ─── PDF / DOCX / TXT helpers ─────────────────────────────────────────────────
// function cleanText(text: string): string {
//   return text.replace(/×/g, "*").replace(/−/g, "-").replace(/\s{2,}/g, " ").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
// }

// async function readPdfAsText(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       try {
//         const arrayBuffer = e.target?.result as ArrayBuffer;
//         const pdfjsLib = await loadPdfJs();
//         const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//         let fullText = "";
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           fullText += content.items.map((item: any) => item.str).join(" ") + "\n";
//         }
//         if (!fullText.trim()) throw new Error("Tidak ada teks yang bisa diekstrak dari PDF.");
//         resolve(cleanText(fullText));
//       } catch (err) { reject(err); }
//     };
//     reader.onerror = () => reject(new Error("Gagal membaca file PDF"));
//     reader.readAsArrayBuffer(file);
//   });
// }

// function loadPdfJs(): Promise<any> {
//   return new Promise((resolve, reject) => {
//     if ((window as any).pdfjsLib) { resolve((window as any).pdfjsLib); return; }
//     const script = document.createElement("script");
//     script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
//     script.onload = () => {
//       const lib = (window as any).pdfjsLib;
//       if (lib) { lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"; resolve(lib); }
//       else reject(new Error("Gagal memuat pdf.js"));
//     };
//     script.onerror = () => reject(new Error("Gagal memuat library PDF"));
//     document.head.appendChild(script);
//   });
// }

// async function readDocxAsText(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       try {
//         const raw = new TextDecoder("utf-8", { fatal: false }).decode(new Uint8Array(e.target?.result as ArrayBuffer));
//         const xmlMatches = raw.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
//         let text = xmlMatches.map(m => m.replace(/<[^>]+>/g, "")).join(" ").replace(/\s+/g, " ").trim();
//         if (text.length < 50) {
//           const allText = raw.match(/[A-Za-z0-9\u00C0-\u024F\u4e00-\u9fff\s\.\?\!\,\;\:\(\)\-\"\'\/\\%]+/g) || [];
//           text = allText.filter(t => t.trim().length > 3).join(" ");
//         }
//         if (!text.trim()) throw new Error("Tidak ada teks yang bisa dibaca dari file DOCX.");
//         resolve(cleanText(text));
//       } catch (err) { reject(err); }
//     };
//     reader.onerror = () => reject(new Error("Gagal membaca file"));
//     reader.readAsArrayBuffer(file);
//   });
// }

// async function readTxtAsText(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (e) => resolve(cleanText(e.target?.result as string));
//     reader.onerror = () => reject(new Error("Gagal membaca file"));
//     reader.readAsText(file, "utf-8");
//   });
// }

// async function parseQuestionsWithAI(text: string): Promise<SoalItem[]> {
//   const systemPrompt = `Kamu adalah parser soal ujian profesional yang sangat teliti.
// Tugasmu adalah mengonversi SETIAP soal pilihan ganda dalam teks ke format JSON.
// Aturan WAJIB:
// 1. Output HANYA array JSON mentah. TIDAK ada markdown, TIDAK ada \`\`\`json, TIDAK ada teks lain.
// 2. Konversi SEMUA soal yang ada — jangan ada yang terlewat.
// 3. Field "jawaban" WAJIB berisi HURUF opsi yang benar: "A", "B", "C", "D", atau "E".
// 4. Bersihkan semua notasi LaTeX menjadi teks biasa.
// 5. Opsi bisa sampai 5 (A, B, C, D, E).`;

//   const userPrompt = `Konversi SEMUA soal berikut ke dalam JSON array.
// Format: [{"no":1,"pertanyaan":"...","tipe":"pg","opsi":["A...","B...","C...","D..."],"jawaban":"A","topik":""}]
// Essay: {"tipe":"essay","opsi":[],"jawaban":""}
// ===SOAL===\n${text}\n===AKHIR SOAL===
// Keluarkan HANYA array JSON.`;

//   const response = await api.post("/ai/parse-soal", {
//     method: "POST",
//     headers: { "Authorization": `Bearer ${OPENROUTER_API_KEY}`, "Content-Type": "application/json" },
//     body: JSON.stringify({ model: OPENROUTER_MODEL, messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }], temperature: 0, max_tokens: 12000 }),
//   });
//   if (!response.ok) throw new Error(`OpenRouter error: ${await response.text()}`);
//   const data = await response.json();
//   let content = data.choices?.[0]?.message?.content?.trim() || "[]";
//   content = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
//   const match = content.match(/(\[[\s\S]*\])/);
//   if (match) content = match[1];
//   const parsed: any[] = JSON.parse(content);
//   return parsed.map((q, i) => ({
//     id: `import_${Date.now()}_${i}`,
//     pertanyaan: q.pertanyaan || "",
//     tipe: (q.tipe === "essay" ? "essay" : "pg") as "pg" | "essay",
//     opsi: Array.isArray(q.opsi) ? q.opsi.filter(Boolean) : [],
//     jawaban: q.jawaban?.trim().toUpperCase() || "",
//     topik: q.topik || "",
//     gambar: undefined, // import soal tidak punya gambar
//   }));
// }

// // ─── SoalImageUpload ──────────────────────────────────────────────────────────
// // PERBAIKAN UTAMA:
// // - Upload langsung ke Cloudinary saat file dipilih (tidak simpan base64/blob)
// // - value selalu berupa URL https:// Cloudinary atau undefined
// // - Tidak ada blob URL, tidak ada base64
// function SoalImageUpload({ value, onChange }: { value?: string; onChange: (v?: string) => void }) {
//   const fileRef = useRef<HTMLInputElement>(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState("");

//   // value harus selalu https:// — jika bukan, abaikan (expired blob/base64 dari draft lama)
//   const safeValue = value?.startsWith("https://") ? value : undefined;

//   async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) { setUploadError("Ukuran gambar maksimal 5MB."); return; }
//     setUploading(true);
//     setUploadError("");
//     try {
//       // ✅ Upload File langsung ke backend → Cloudinary
//       // Tidak ada base64, tidak ada blob URL
//       const cloudinaryUrl = await uploadFileKeCloudinary(file);
//       onChange(cloudinaryUrl); // ← selalu https://
//     } catch (err) {
//       setUploadError(err instanceof Error ? err.message : "Gagal mengupload gambar");
//     } finally {
//       setUploading(false);
//       if (fileRef.current) fileRef.current.value = "";
//     }
//   }

//   return (
//     <div>
//       <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
//         Gambar Soal <span className="text-slate-400 font-normal">(opsional)</span>
//       </label>
//       {uploadError && <p className="text-[10px] text-red-500 mb-1">{uploadError}</p>}
//       {safeValue ? (
//         <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
//           <img src={safeValue} alt="Gambar soal" className="w-full max-h-48 object-contain" />
//           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
//             <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
//               className="h-8 px-3 bg-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 shadow disabled:opacity-60">
//               {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
//               {uploading ? "Mengupload..." : "Ganti"}
//             </button>
//             <button type="button" onClick={() => onChange(undefined)} disabled={uploading}
//               className="h-8 px-3 bg-red-500 rounded-lg text-[11px] font-semibold text-white flex items-center gap-1.5 shadow disabled:opacity-60">
//               <Trash2 className="w-3.5 h-3.5" /> Hapus
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
//           className="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all group disabled:opacity-60">
//           <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
//             {uploading ? <Loader2 className="w-4 h-4 text-violet-500 animate-spin" /> : <ImageIcon className="w-4 h-4 text-slate-400" />}
//           </div>
//           <div className="text-center">
//             <p className="text-[12px] font-semibold text-slate-500">{uploading ? "Mengupload ke Cloudinary..." : "Klik untuk upload gambar"}</p>
//             <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, GIF · Maks 5MB</p>
//           </div>
//         </button>
//       )}
//       <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
//     </div>
//   );
// }

// function isSoalLiveValid(pertanyaan: string) { return pertanyaan.trim().length > 0; }

// // ─── KkmField ─────────────────────────────────────────────────────────────────
// function KkmField({ kkm, setKkm }: { kkm: number; setKkm: (v: number) => void }) {
//   const [editing, setEditing] = useState(false);
//   const [tempVal, setTempVal] = useState(String(kkm));
//   const inputRef = useRef<HTMLInputElement>(null);
//   function commit() { const p = parseInt(tempVal); if (!isNaN(p) && p > 0 && p <= 100) setKkm(p); setEditing(false); }
//   return (
//     <div className="flex items-center gap-2">
//       <label className="text-[12px] font-semibold text-slate-600">KKM:</label>
//       {editing ? (
//         <input ref={inputRef} type="number" value={tempVal} onChange={e => setTempVal(e.target.value)}
//           onBlur={commit} onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }} autoFocus
//           className="w-16 h-9 text-center border-[1.5px] border-zinc-900 rounded-lg text-[13px] font-semibold text-zinc-900 bg-white outline-none" />
//       ) : (
//         <button onDoubleClick={() => { setTempVal(String(kkm)); setEditing(true); setTimeout(() => inputRef.current?.select(), 0); }}
//           className="w-16 h-9 text-center border-[1.5px] border-slate-200 rounded-lg text-[13px] font-semibold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none">
//           {kkm}
//         </button>
//       )}
//       {!editing && <span className="text-[10px] text-slate-400 hidden sm:inline">klik 2x untuk ubah</span>}
//     </div>
//   );
// }

// // ─── KkmInline ────────────────────────────────────────────────────────────────
// function KkmInline({ kkmModal, setKkmModal }: { kkmModal: number; setKkmModal: (v: number) => void }) {
//   const [editingKkm, setEditingKkm] = useState(false);
//   const [tempKkm, setTempKkm] = useState(String(kkmModal));
//   const ref = useRef<HTMLInputElement>(null);
//   useEffect(() => { if (!editingKkm) setTempKkm(String(kkmModal)); }, [kkmModal, editingKkm]);
//   function commit() { const v = parseInt(tempKkm); if (!isNaN(v) && v > 0 && v <= 100) setKkmModal(v); setEditingKkm(false); }
//   return (
//     <div className="flex items-center gap-1.5">
//       <span className="text-[11px] text-slate-400">KKM:</span>
//       {editingKkm ? (
//         <input ref={ref} type="number" value={tempKkm} autoFocus onChange={e => setTempKkm(e.target.value)}
//           onBlur={commit} onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditingKkm(false); }}
//           className="w-14 h-6 text-center border-[1.5px] border-zinc-900 rounded-md text-[11px] font-bold text-zinc-900 bg-white outline-none" />
//       ) : (
//         <button onDoubleClick={() => { setTempKkm(String(kkmModal)); setEditingKkm(true); setTimeout(() => ref.current?.select(), 0); }}
//           className="min-w-[2rem] h-6 px-2 border-[1.5px] border-slate-200 rounded-md text-[11px] font-bold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none">
//           {kkmModal}
//         </button>
//       )}
//       {!editingKkm && <span className="text-[10px] text-slate-300 hidden sm:inline">klik 2×</span>}
//     </div>
//   );
// }

// // ─── HasilUjianModal ──────────────────────────────────────────────────────────
// function HasilUjianModal({ ujian, onClose }: { ujian: Ujian; onClose: () => void }) {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<HasilUjian | null>(null);
//   const [error, setError] = useState("");
//   const [kkmModal, setKkmModal] = useState<number>(() => { try { const s = sessionStorage.getItem(`kkm_hasil_${ujian.id}`); return s ? parseInt(s) : 70; } catch { return 70; } });
//   useEffect(() => { try { sessionStorage.setItem(`kkm_hasil_${ujian.id}`, String(kkmModal)); } catch (_) {} }, [kkmModal, ujian.id]);
//   const [filter, setFilter] = useState("all");
//   const [sort, setSort] = useState("nama");
//   const [dir, setDir] = useState<"asc" | "desc">("asc");
//   const [selectedNisn, setSelectedNisn] = useState<string | null>(null);
//   const [detailData, setDetailData] = useState<any | null>(null);
//   const [detailLoading, setDetailLoading] = useState(false);

//   useEffect(() => {
//     async function fetchHasil() {
//       setLoading(true);
//       try { const res = await api.get<HasilUjian>(`/ujian/${ujian.id}/laporan`); setData(res as HasilUjian); }
//       catch { setError("Gagal memuat data hasil ujian"); }
//       finally { setLoading(false); }
//     }
//     fetchHasil();
//   }, [ujian.id]);

//   const siswaWithKkm = useMemo(() => { if (!data) return []; return data.siswa.map(s => ({ ...s, lulus: s.nilai >= kkmModal })); }, [data, kkmModal]);
//   const recomputedSummary = useMemo(() => { if (!data) return null; return { ...data.summary, lulus: siswaWithKkm.filter(s => s.lulus).length, gagal: siswaWithKkm.filter(s => !s.lulus).length }; }, [data, siswaWithKkm]);
//   const filteredSiswa = useMemo(() => {
//     let list = [...siswaWithKkm];
//     if (filter === "lulus") list = list.filter(s => s.lulus);
//     else if (filter === "gagal") list = list.filter(s => !s.lulus);
//     else if (filter === "viol") list = list.filter(s => s.pelanggaran > 0);
//     list.sort((a, b) => { const va = (a as any)[sort], vb = (b as any)[sort]; if (typeof va === "string") return dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va); return dir === "asc" ? va - vb : vb - va; });
//     return list;
//   }, [siswaWithKkm, filter, sort, dir]);

//   async function fetchDetailSiswa(nisn: string) {
//     setDetailLoading(true); setSelectedNisn(nisn);
//     try { const res = await api.get(`/ujian/${ujian.id}/laporan/siswa/${nisn}`); setDetailData(res); }
//     catch { setDetailData(null); }
//     finally { setDetailLoading(false); }
//   }
//   function toggleSort(key: string) { if (sort === key) setDir(d => d === "asc" ? "desc" : "asc"); else { setSort(key); setDir("asc"); } }
//   const SortIcon = ({ col }: { col: string }) => <span className={`ml-0.5 text-[9px] ${sort === col ? "text-zinc-900" : "text-slate-300"}`}>{sort === col ? (dir === "asc" ? "↑" : "↓") : "↕"}</span>;
//   function handleExport() { if (!data || !recomputedSummary) return; exportToExcel({ ...data, siswa: siswaWithKkm, summary: recomputedSummary }, ujian.nama); }

//   return (
//     <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-4xl shadow-2xl z-10 max-h-[95vh] flex flex-col">
//         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
//           <div><h3 className="text-base font-bold text-zinc-900">Hasil Ujian</h3><p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p></div>
//           <div className="flex items-center gap-2">
//             {data && !selectedNisn && (
//               <button onClick={handleExport} className="inline-flex items-center gap-1.5 h-8 px-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-semibold hover:bg-emerald-100 transition-colors">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
//                 Export Excel
//               </button>
//             )}
//             <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {selectedNisn && (
//             <div className="border-b border-slate-100 bg-slate-50">
//               <div className="p-4 flex items-center gap-2">
//                 <button onClick={() => { setSelectedNisn(null); setDetailData(null); }} className="p-1.5 rounded-lg hover:bg-white border border-slate-200 text-slate-500"><ArrowLeft className="w-3.5 h-3.5" /></button>
//                 <p className="text-[13px] font-bold text-zinc-900">Detail Jawaban Siswa</p>
//               </div>
//               {detailLoading ? <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-slate-400" /></div>
//                 : detailData ? (
//                   <div className="px-4 pb-4 space-y-3">
//                     <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap gap-4">
//                       {[{ label: "Nama", val: detailData.siswa?.nama }, { label: "NISN", val: detailData.siswa?.nisn }, { label: "Kelas", val: detailData.siswa?.kelas }].map(item => (
//                         <div key={item.label}><p className="text-[10px] text-slate-400 font-semibold uppercase">{item.label}</p><p className="text-[13px] font-bold text-zinc-900">{item.val}</p></div>
//                       ))}
//                       <div><p className="text-[10px] text-slate-400 font-semibold uppercase">Nilai</p><p className={`text-[18px] font-black ${(detailData.siswa?.nilai ?? 0) >= kkmModal ? "text-emerald-600" : "text-red-600"}`}>{detailData.siswa?.nilai}</p></div>
//                       <div><p className="text-[10px] text-slate-400 font-semibold uppercase">Status</p>
//                         {(detailData.siswa?.nilai ?? 0) >= kkmModal
//                           ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
//                           : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>}
//                       </div>
//                     </div>
//                     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//                       <div className="px-4 py-3 border-b border-slate-100 bg-slate-50"><p className="text-[12px] font-bold text-zinc-900">Rincian Jawaban</p></div>
//                       <div className="divide-y divide-slate-50">
//                         {(detailData.jawaban || []).map((j: any) => (
//                           <div key={j.nomorSoal} className={`px-4 py-3 flex items-start gap-3 ${j.isBenar ? "bg-emerald-50/30" : "bg-red-50/30"}`}>
//                             <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${j.isBenar ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{j.nomorSoal}</span>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-[12px] text-zinc-800 mb-1">{j.pertanyaan}</p>
//                               <div className="flex items-center gap-3 flex-wrap">
//                                 <span className="text-[11px] text-slate-500">Jawaban: <strong className={j.isBenar ? "text-emerald-600" : "text-red-500"}>{j.jawabanSiswa ?? "—"}</strong></span>
//                                 {!j.isBenar && <span className="text-[11px] text-slate-500">Benar: <strong className="text-emerald-600">{j.jawabanBenar}</strong></span>}
//                                 {j.isRagu && <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">⚑ Ragu</span>}
//                               </div>
//                             </div>
//                             <div className="flex-shrink-0">{j.isBenar ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-400" />}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ) : <div className="px-4 pb-4 text-center py-6 text-[12px] text-slate-400">Gagal memuat detail</div>}
//             </div>
//           )}
//           {!selectedNisn && (
//             <div className="p-5 space-y-4">
//               {error && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[12px] text-red-600 flex items-center gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}</div>}
//               {loading ? <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>
//                 : data && recomputedSummary ? (
//                   <>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {[
//                         { label: "Total Peserta", val: recomputedSummary.totalSiswa, color: "#18181b", icon: <Users className="w-3.5 h-3.5" /> },
//                         { label: "Rata-rata Nilai", val: recomputedSummary.rataRata, color: "#2563eb", icon: <BarChart2 className="w-3.5 h-3.5" /> },
//                         { label: "Tertinggi", val: recomputedSummary.tertinggi, color: "#059669", icon: <TrendingUp className="w-3.5 h-3.5" /> },
//                         { label: "Terendah", val: recomputedSummary.terendah, color: "#dc2626", icon: <TrendingUp className="w-3.5 h-3.5 rotate-180" /> },
//                         { label: "Lulus", val: recomputedSummary.lulus, color: "#059669", icon: <CheckCircle className="w-3.5 h-3.5" /> },
//                         { label: "Tidak Lulus", val: recomputedSummary.gagal, color: "#dc2626", icon: <AlertCircle className="w-3.5 h-3.5" /> },
//                       ].map(s => (
//                         <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
//                           <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>{s.icon}</div>
//                           <div><p className="text-lg font-bold text-zinc-900">{s.val}</p><p className="text-[10px] text-slate-400">{s.label}</p></div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex gap-2 flex-wrap items-center justify-between">
//                       <div className="flex gap-2 flex-wrap">
//                         {[{ val: "all", label: "Semua" }, { val: "lulus", label: "Lulus" }, { val: "gagal", label: "Tidak Lulus" }, { val: "viol", label: "Ada Pelanggaran" }].map(f => (
//                           <button key={f.val} onClick={() => setFilter(f.val)} className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${filter === f.val ? "bg-zinc-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
//                             {f.label}{f.val !== "all" && <span className="ml-1.5 opacity-60">({f.val === "lulus" ? recomputedSummary.lulus : f.val === "gagal" ? recomputedSummary.gagal : siswaWithKkm.filter(s => s.pelanggaran > 0).length})</span>}
//                           </button>
//                         ))}
//                       </div>
//                       <span className="text-[11px] text-slate-400">{filteredSiswa.length} ditampilkan</span>
//                     </div>
//                     {filteredSiswa.length === 0
//                       ? <div className="text-center py-12"><Users className="w-8 h-8 text-slate-200 mx-auto mb-2" /><p className="text-[13px] text-slate-400">{filter === "all" ? "Belum ada peserta" : "Tidak ada siswa yang sesuai filter"}</p></div>
//                       : (
//                         <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
//                           <div className="overflow-x-auto">
//                             <table className="w-full" style={{ minWidth: "600px" }}>
//                               <thead className="border-b border-slate-100 bg-slate-50/50">
//                                 <tr>
//                                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
//                                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700" onClick={() => toggleSort("nama")}>Nama <SortIcon col="nama" /></th>
//                                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Kelas</th>
//                                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700" onClick={() => toggleSort("nilai")}>Nilai <SortIcon col="nilai" /></th>
//                                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell" onClick={() => toggleSort("benar")}>Benar <SortIcon col="benar" /></th>
//                                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell" onClick={() => toggleSort("salah")}>Salah <SortIcon col="salah" /></th>
//                                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
//                                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden sm:table-cell" onClick={() => toggleSort("pelanggaran")}>Pelang. <SortIcon col="pelanggaran" /></th>
//                                   <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Detail</th>
//                                 </tr>
//                               </thead>
//                               <tbody className="divide-y divide-slate-50">
//                                 {filteredSiswa.map((s, i) => {
//                                   const nilaiColor = s.nilai >= 90 ? "#059669" : s.nilai >= 80 ? "#10b981" : s.nilai >= 70 ? "#2563eb" : "#dc2626";
//                                   return (
//                                     <tr key={s.nisn} className="hover:bg-slate-50/50">
//                                       <td className="px-4 py-3 text-[11px] text-slate-400 font-semibold">{i + 1}</td>
//                                       <td className="px-4 py-3"><p className="font-semibold text-zinc-900 text-[12px]">{s.nama}</p><p className="text-[10px] text-slate-400">{s.nisn}</p></td>
//                                       <td className="px-4 py-3 text-[12px] text-slate-500 hidden sm:table-cell">{s.kelas}</td>
//                                       <td className="px-4 py-3"><span className="text-[15px] font-black" style={{ color: nilaiColor }}>{s.nilai}</span></td>
//                                       <td className="px-4 py-3 hidden md:table-cell"><span className="text-[12px] font-semibold text-emerald-600">{s.benar}</span></td>
//                                       <td className="px-4 py-3 hidden md:table-cell"><span className="text-[12px] font-semibold text-red-500">{s.salah}</span></td>
//                                       <td className="px-4 py-3">{s.lulus ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span> : <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">GAGAL</span>}</td>
//                                       <td className="px-4 py-3 hidden sm:table-cell">{s.pelanggaran > 0 ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">{s.pelanggaran}x</span> : <span className="text-[11px] text-slate-300">—</span>}</td>
//                                       <td className="px-4 py-3 text-right"><button onClick={() => fetchDetailSiswa(s.nisn)} className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors">Lihat</button></td>
//                                     </tr>
//                                   );
//                                 })}
//                               </tbody>
//                             </table>
//                           </div>
//                           <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
//                             <span className="text-[11px] text-slate-400">{filteredSiswa.length} peserta</span>
//                             <KkmInline kkmModal={kkmModal} setKkmModal={setKkmModal} />
//                           </div>
//                         </div>
//                       )}
//                   </>
//                 ) : null}
//             </div>
//           )}
//         </div>
//         <div className="p-5 border-t border-slate-100 shrink-0">
//           <button onClick={onClose} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── ImportSoalModal ──────────────────────────────────────────────────────────
// function ImportSoalModal({ onClose, onImport }: { onClose: () => void; onImport: (soalList: SoalItem[]) => void }) {
//   const fileRef = useRef<HTMLInputElement>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [status, setStatus] = useState<"idle" | "reading" | "parsing" | "preview" | "error">("idle");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [preview, setPreview] = useState<SoalItem[]>([]);
//   const [selected, setSelected] = useState<Set<string>>(new Set());
//   const [readingProgress, setReadingProgress] = useState("");

//   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     const ext = f.name.split(".").pop()?.toLowerCase();
//     if (!["pdf", "docx", "txt"].includes(ext || "")) { setErrorMsg("Hanya file .pdf, .docx, atau .txt."); setStatus("error"); return; }
//     setFile(f); setStatus("idle"); setErrorMsg(""); setPreview([]);
//   }

//   async function handleParse() {
//     if (!file) return;
//     setStatus("reading"); setErrorMsg(""); setReadingProgress("");
//     try {
//       const ext = file.name.split(".").pop()?.toLowerCase();
//       let text = "";
//       if (ext === "txt") { setReadingProgress("Membaca file teks..."); text = await readTxtAsText(file); }
//       else if (ext === "pdf") { setReadingProgress("Memuat library PDF..."); text = await readPdfAsText(file); }
//       else { setReadingProgress("Membaca file DOCX..."); text = await readDocxAsText(file); }
//       if (!text.trim()) throw new Error("Tidak ada teks yang bisa dibaca dari file.");
//       setStatus("parsing"); setReadingProgress("AI sedang menganalisis soal...");
//       const soalList = await parseQuestionsWithAI(text);
//       if (!soalList.length) throw new Error("Tidak ada soal yang berhasil diparse.");
//       setPreview(soalList); setSelected(new Set(soalList.map(s => s.id))); setStatus("preview");
//     } catch (err) { setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan"); setStatus("error"); }
//   }

//   function toggleSelect(id: string) { setSelected(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); }
//   function handleImport() { onImport(preview.filter(s => selected.has(s.id))); onClose(); }

//   return (
//     <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
//         <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 bg-violet-50 border border-violet-200 rounded-xl flex items-center justify-center"><FileUp className="w-4 h-4 text-violet-600" /></div>
//             <div><h3 className="text-base font-bold text-zinc-900">Import Soal</h3><p className="text-[11px] text-slate-400">Upload file .pdf, .docx, atau .txt berisi soal</p></div>
//           </div>
//           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-5 space-y-4">
//           {status !== "preview" && (
//             <div>
//               <button type="button" onClick={() => fileRef.current?.click()}
//                 className="w-full border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center gap-3 hover:bg-slate-50 hover:border-violet-300 transition-all group">
//                 <div className="w-12 h-12 rounded-xl bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center transition-colors"><FileUp className="w-5 h-5 text-violet-500" /></div>
//                 <div className="text-center">
//                   <p className="text-[13px] font-semibold text-zinc-700">{file ? file.name : "Klik untuk upload file soal"}</p>
//                   <p className="text-[11px] text-slate-400 mt-0.5">{file ? `${(file.size / 1024).toFixed(1)} KB · ${file.name.split(".").pop()?.toUpperCase()}` : "Format: .pdf, .docx, atau .txt"}</p>
//                 </div>
//               </button>
//               <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileChange} />
//             </div>
//           )}
//           {status === "idle" && (
//             <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
//               <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
//               <div className="text-[11px] text-blue-700 space-y-1">
//                 <p className="font-semibold">Tips format soal:</p>
//                 <p>• Nomor soal diikuti titik atau kurung: <strong>1.</strong> atau <strong>1)</strong></p>
//                 <p>• Opsi dengan huruf: <strong>a.</strong> <strong>b.</strong> dst (hingga e)</p>
//                 <p>• Kunci jawaban: <strong>Jawaban: B</strong> atau <strong>Kunci: C</strong></p>
//               </div>
//             </div>
//           )}
//           {status === "error" && <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-[12px] text-red-600"><AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMsg}</div>}
//           {(status === "reading" || status === "parsing") && (
//             <div className="flex flex-col items-center gap-3 py-8">
//               <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
//               <p className="text-[13px] font-semibold text-zinc-700">{status === "reading" ? "Membaca file..." : "AI sedang memparse soal..."}</p>
//               <p className="text-[11px] text-slate-400">{readingProgress}</p>
//             </div>
//           )}
//           {status === "preview" && (
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <p className="text-[13px] font-bold text-zinc-900">{preview.length} soal berhasil diparse</p>
//                 <div className="flex gap-2">
//                   <button onClick={() => setSelected(new Set(preview.map(s => s.id)))} className="text-[11px] font-semibold text-emerald-600 hover:underline">Pilih semua</button>
//                   <span className="text-slate-300">·</span>
//                   <button onClick={() => setSelected(new Set())} className="text-[11px] font-semibold text-red-500 hover:underline">Hapus semua</button>
//                 </div>
//               </div>
//               <div className="border border-slate-200 rounded-[14px] overflow-hidden divide-y divide-slate-50">
//                 {preview.map((s, i) => (
//                   <div key={s.id} onClick={() => toggleSelect(s.id)} className={`px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors ${selected.has(s.id) ? "bg-violet-50/50" : "hover:bg-slate-50"}`}>
//                     <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${selected.has(s.id) ? "bg-violet-600 border-violet-600" : "border-slate-300"}`}>
//                       {selected.has(s.id) && <Check className="w-3 h-3 text-white" />}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-[12px] font-medium text-zinc-900"><span className="text-slate-400 mr-1">{i + 1}.</span>{s.pertanyaan}</p>
//                       {s.tipe === "pg" && s.opsi.length > 0 && (
//                         <div className="mt-1 flex flex-wrap gap-1">
//                           {s.opsi.map((o, oi) => (
//                             <span key={oi} className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${s.jawaban === String.fromCharCode(65 + oi) ? "bg-emerald-100 text-emerald-700 font-bold" : "bg-slate-100 text-slate-600"}`}>
//                               {String.fromCharCode(65 + oi)}. {o}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                       {s.jawaban && <p className="text-[10px] text-emerald-600 mt-1 font-semibold">✓ {s.jawaban}</p>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button onClick={() => { setFile(null); setPreview([]); setStatus("idle"); }} className="text-[11px] font-semibold text-slate-500 hover:text-zinc-700 underline">← Upload file lain</button>
//             </div>
//           )}
//         </div>
//         <div className="p-5 border-t border-slate-100 shrink-0 flex gap-3">
//           <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Batal</button>
//           {status === "idle" && file && <button onClick={handleParse} className="flex-1 h-10 bg-violet-600 text-white rounded-xl text-[13px] font-bold hover:bg-violet-700 flex items-center justify-center gap-2"><Zap className="w-4 h-4" /> Parse dengan AI</button>}
//           {status === "preview" && <button onClick={handleImport} disabled={selected.size === 0} className="flex-1 h-10 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 flex items-center justify-center gap-2 disabled:opacity-40"><Plus className="w-4 h-4" /> Tambahkan {selected.size} Soal</button>}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── SoalForm ─────────────────────────────────────────────────────────────────
// function SoalForm({
//   soalPertanyaan, setSoalPertanyaan, soalTipe, setSoalTipe, soalTopik, setSoalTopik,
//   soalOpsi, setSoalOpsi, soalJawaban, setSoalJawaban, soalGambar, setSoalGambar,
//   editingId, soalListLength, soalList, onAdd, onCancelEdit, radioName,
// }: {
//   soalPertanyaan: string; setSoalPertanyaan: (v: string) => void;
//   soalTipe: "pg" | "essay"; setSoalTipe: (v: "pg" | "essay") => void;
//   soalTopik: string; setSoalTopik: (v: string) => void;
//   soalOpsi: string[]; setSoalOpsi: (v: string[]) => void;
//   soalJawaban: string; setSoalJawaban: (v: string) => void;
//   soalGambar?: string; setSoalGambar: (v?: string) => void;
//   editingId: string | null; soalListLength: number; soalList: SoalItem[];
//   onAdd: () => void; onCancelEdit: () => void; radioName: string;
// }) {
//   const liveIsValid = isSoalLiveValid(soalPertanyaan);
//   return (
//     <div className={`border rounded-[14px] p-4 space-y-3 ${editingId ? "border-amber-200 bg-amber-50/50" : liveIsValid ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 bg-slate-50/50"}`}>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <h4 className="font-semibold text-zinc-900 text-[13px]">{editingId ? `✏️ Edit Soal #${soalList.findIndex(s => s.id === editingId) + 1}` : `Soal #${soalListLength + 1}`}</h4>
//           {liveIsValid && !editingId && <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full"><Check className="w-2.5 h-2.5" /> Akan disimpan</span>}
//         </div>
//         {editingId && <button onClick={onCancelEdit} className="text-[11px] text-slate-500 hover:text-zinc-900 underline">Batal edit</button>}
//       </div>
//       <div>
//         <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Pertanyaan <span className="text-red-500">*</span></label>
//         <textarea value={soalPertanyaan} onChange={e => setSoalPertanyaan(e.target.value)} rows={2} placeholder="Tuliskan pertanyaan soal di sini..."
//           className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white" />
//       </div>
//       {/* ✅ SoalImageUpload sekarang langsung upload ke Cloudinary */}
//       <SoalImageUpload value={soalGambar} onChange={setSoalGambar} />
//       <div className="grid grid-cols-2 gap-3">
//         <div>
//           <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Tipe Soal</label>
//           <select value={soalTipe} onChange={e => setSoalTipe(e.target.value as "pg" | "essay")} className="w-full h-9 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-700 focus:outline-none bg-white">
//             <option value="pg">Pilihan Ganda</option>
//             <option value="essay">Essay</option>
//           </select>
//         </div>
//         <div>
//           <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Topik</label>
//           <input type="text" value={soalTopik} onChange={e => setSoalTopik(e.target.value)} placeholder="e.g. Limit Fungsi"
//             className="w-full h-9 px-3 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white" />
//         </div>
//       </div>
//       {soalTipe === "pg" && (
//         <div className="space-y-2">
//           <label className="text-[11px] font-semibold text-slate-500 block">Opsi Jawaban A–E <span className="text-slate-400 font-normal">(radio = jawaban benar)</span></label>
//           {soalOpsi.map((opsi, i) => {
//             const huruf = String.fromCharCode(65 + i);
//             return (
//               <div key={i} className="flex items-center gap-2">
//                 <span className="w-6 h-6 rounded-full border-[1.5px] border-slate-200 bg-white text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{huruf}</span>
//                 <input type="text" value={opsi} onChange={e => { const next = [...soalOpsi]; next[i] = e.target.value; setSoalOpsi(next); }} placeholder={`Opsi ${huruf}`}
//                   className="flex-1 h-8 px-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white" />
//                 <input type="radio" name={radioName} checked={soalJawaban === huruf} onChange={() => setSoalJawaban(huruf)} disabled={!opsi.trim()} className="flex-shrink-0 accent-emerald-600" />
//               </div>
//             );
//           })}
//           {soalJawaban && (
//             <p className="text-[10px] text-emerald-600 font-medium">✓ Jawaban benar: <strong>{soalJawaban}</strong>
//               {soalOpsi[soalJawaban.charCodeAt(0) - 65] && <span className="text-slate-400 font-normal"> — {soalOpsi[soalJawaban.charCodeAt(0) - 65]}</span>}
//             </p>
//           )}
//         </div>
//       )}
//       {soalTipe === "essay" && (
//         <div>
//           <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Kunci Jawaban (Opsional)</label>
//           <textarea value={soalJawaban} onChange={e => setSoalJawaban(e.target.value)} rows={2} placeholder="Tuliskan kunci jawaban essay..."
//             className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white" />
//         </div>
//       )}
//       <button onClick={onAdd} disabled={!soalPertanyaan.trim()}
//         className="w-full h-9 bg-zinc-900 text-white rounded-lg text-[12px] font-semibold hover:bg-zinc-800 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//         <Plus className="w-3.5 h-3.5" /> {editingId ? "Simpan Perubahan & Lanjut Soal Baru" : "Tambah & Lanjut Soal Berikutnya"}
//       </button>
//       <p className="text-[10px] text-slate-400 text-center">{liveIsValid && !editingId ? "✅ Soal ini otomatis ikut tersimpan saat klik \"Simpan\" di bawah" : "Isi pertanyaan untuk mulai membuat soal"}</p>
//     </div>
//   );
// }

// // ─── AddContentModal ──────────────────────────────────────────────────────────
// function AddContentModal({ activeTab, onClose, onSave }: {
//   activeTab: string;
//   onClose: () => void;
//   onSave: (data: { nama: string; tanggal: string; durasi: string; soalAcak: boolean; soalList: SoalItem[] }) => void;
// }) {
//   const label = TAB_LABELS[activeTab] || "Konten";
//   const draft = loadDraft(activeTab);

//   const [step, setStep] = useState<1 | 2>(draft?.step ?? 1);
//   const [nama, setNama] = useState(draft?.nama ?? "");
//   const [tanggal, setTanggal] = useState(draft?.tanggal ?? "");
//   const [durasi, setDurasi] = useState(draft?.durasi ?? "");
//   const [soalAcak, setSoalAcak] = useState<boolean>(draft?.soalAcak ?? true);
//   // soalList dari draft tidak punya gambar (sudah kita strip saat save draft)
//   const [soalList, setSoalList] = useState<SoalItem[]>(draft?.soalList ?? []);
//   const [soalPertanyaan, setSoalPertanyaan] = useState(draft?.soalPertanyaan ?? "");
//   const [soalTipe, setSoalTipe] = useState<"pg" | "essay">(draft?.soalTipe ?? "pg");
//   const [soalTopik, setSoalTopik] = useState(draft?.soalTopik ?? "");
//   const [soalOpsi, setSoalOpsi] = useState<string[]>(draft?.soalOpsi ?? [...DEFAULT_OPSI]);
//   const [soalJawaban, setSoalJawaban] = useState(draft?.soalJawaban ?? "");
//   // gambar TIDAK dimuat dari draft (expired) — selalu mulai undefined
//   const [soalGambar, setSoalGambar] = useState<string | undefined>(undefined);
//   const [editingId, setEditingId] = useState<string | null>(draft?.editingId ?? null);
//   const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(draft ? new Date() : null);
//   const [showImportModal, setShowImportModal] = useState(false);

//   const liveIsValid = isSoalLiveValid(soalPertanyaan);
//   const totalSoalPreview = soalList.length + (liveIsValid && !editingId ? 1 : 0);

//   const persistDraft = useCallback(() => {
//     // ✅ Strip gambar sebelum simpan ke sessionStorage
//     // Gambar sudah di-upload ke Cloudinary (https://) saat dipilih user
//     // tapi kita tetap strip dari draft untuk keamanan ukuran storage
//     const soalListTanpaGambar = soalList.map(s => ({ ...s, gambar: s.gambar?.startsWith("https://") ? s.gambar : undefined }));
//     saveDraft(activeTab, { step, nama, tanggal, durasi, soalAcak, soalList: soalListTanpaGambar, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, editingId });
//     setDraftSavedAt(new Date());
//   }, [step, nama, tanggal, durasi, soalAcak, soalList, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, editingId, activeTab]);

//   useEffect(() => { const timer = setTimeout(persistDraft, 400); return () => clearTimeout(timer); }, [persistDraft]);

//   function resetSoalForm() { setSoalPertanyaan(""); setSoalTopik(""); setSoalOpsi([...DEFAULT_OPSI]); setSoalJawaban(""); setSoalTipe("pg"); setSoalGambar(undefined); }

//   function commitLiveSoal(): SoalItem[] {
//     if (!liveIsValid) return soalList;
//     if (editingId) return soalList.map(s => s.id === editingId ? { id: editingId, pertanyaan: soalPertanyaan.trim(), tipe: soalTipe, opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [], jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar } : s);
//     return [...soalList, { id: Date.now().toString(), pertanyaan: soalPertanyaan.trim(), tipe: soalTipe, opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [], jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar }];
//   }

//   function handleAddSoal() {
//     if (!soalPertanyaan.trim()) return;
//     const newSoal: SoalItem = { id: editingId || Date.now().toString(), pertanyaan: soalPertanyaan.trim(), tipe: soalTipe, opsi: soalTipe === "pg" ? soalOpsi.filter(Boolean) : [], jawaban: soalJawaban, topik: soalTopik.trim(), gambar: soalGambar };
//     if (editingId) { setSoalList(prev => prev.map(s => s.id === editingId ? newSoal : s)); setEditingId(null); }
//     else setSoalList(prev => [...prev, newSoal]);
//     resetSoalForm();
//   }

//   function handleEditSoal(s: SoalItem) {
//     if (liveIsValid && !editingId) { setSoalList(commitLiveSoal()); resetSoalForm(); }
//     setEditingId(s.id); setSoalPertanyaan(s.pertanyaan); setSoalTipe(s.tipe); setSoalTopik(s.topik);
//     setSoalOpsi(s.tipe === "pg" ? [...s.opsi, "", "", "", "", ""].slice(0, 5) : [...DEFAULT_OPSI]);
//     setSoalJawaban(s.jawaban);
//     // ✅ Hanya load gambar jika URL valid (https://)
//     setSoalGambar(s.gambar?.startsWith("https://") ? s.gambar : undefined);
//   }

//   function handleSave() { const finalList = commitLiveSoal(); clearDraft(activeTab); onSave({ nama, tanggal, durasi, soalAcak, soalList: finalList }); }
//   function handleImport(imported: SoalItem[]) { setSoalList(prev => [...prev, ...imported]); }
//   const hasDraftData = nama.trim() !== "" || soalList.length > 0 || liveIsValid;

//   return (
//     <>
//       <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
//         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
//         <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
//           <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
//             <div className="flex items-center gap-3">
//               {step === 2 && <button onClick={() => setStep(1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><ArrowLeft className="w-4 h-4" /></button>}
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h3 className="text-base font-bold text-zinc-900">Tambah {label}</h3>
//                   {draftSavedAt && hasDraftData && <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full"><Save className="w-2.5 h-2.5" /> Draft tersimpan</span>}
//                 </div>
//                 <div className="flex items-center gap-1.5 mt-0.5">
//                   <span className={`w-5 h-1.5 rounded-full transition-colors ${step === 1 ? "bg-zinc-900" : "bg-zinc-200"}`} />
//                   <span className={`w-5 h-1.5 rounded-full transition-colors ${step === 2 ? "bg-zinc-900" : "bg-zinc-200"}`} />
//                   <p className="text-[10px] text-slate-400 ml-1">Langkah {step} dari 2</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               {hasDraftData && (
//                 <button onClick={() => { clearDraft(activeTab); setStep(1); setNama(""); setTanggal(""); setDurasi(""); setSoalAcak(true); setSoalList([]); resetSoalForm(); setEditingId(null); setDraftSavedAt(null); }}
//                   className="text-[10px] font-semibold text-red-400 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">Hapus draft</button>
//               )}
//               <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             {step === 1 && (
//               <div className="p-5 space-y-4">
//                 <div>
//                   <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama {label} <span className="text-red-500">*</span></label>
//                   <input type="text" value={nama} onChange={e => setNama(e.target.value)} placeholder={`e.g. UAS ${label} Semester 2`}
//                     className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label>
//                     <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
//                   </div>
//                   <div>
//                     <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label>
//                     <input type="number" value={durasi} onChange={e => setDurasi(e.target.value)} placeholder="60" className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Urutan Soal untuk Siswa</label>
//                   <div className="grid grid-cols-2 gap-2.5">
//                     <button type="button" onClick={() => setSoalAcak(true)} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${soalAcak ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
//                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${soalAcak ? "bg-violet-100" : "bg-slate-100"}`}><Shuffle className={`w-4 h-4 ${soalAcak ? "text-violet-600" : "text-slate-400"}`} /></div>
//                       <div className="flex-1 min-w-0">
//                         <p className={`text-[12px] font-bold ${soalAcak ? "text-violet-700" : "text-zinc-700"}`}>Soal Acak</p>
//                         <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Urutan soal diacak berbeda tiap siswa</p>
//                         {soalAcak && <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded-full"><Check className="w-2.5 h-2.5" /> Aktif</span>}
//                       </div>
//                     </button>
//                     <button type="button" onClick={() => setSoalAcak(false)} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${!soalAcak ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
//                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${!soalAcak ? "bg-blue-100" : "bg-slate-100"}`}><ListOrdered className={`w-4 h-4 ${!soalAcak ? "text-blue-600" : "text-slate-400"}`} /></div>
//                       <div className="flex-1 min-w-0">
//                         <p className={`text-[12px] font-bold ${!soalAcak ? "text-blue-700" : "text-zinc-700"}`}>Soal Berurutan</p>
//                         <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Semua siswa mengerjakan soal dengan urutan yang sama</p>
//                         {!soalAcak && <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full"><Check className="w-2.5 h-2.5" /> Aktif</span>}
//                       </div>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {step === 2 && (
//               <div className="p-5 space-y-4">
//                 <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-[11px] font-semibold ${soalAcak ? "bg-violet-50 border-violet-200 text-violet-700" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
//                   {soalAcak ? <Shuffle className="w-3.5 h-3.5 flex-shrink-0" /> : <ListOrdered className="w-3.5 h-3.5 flex-shrink-0" />}
//                   <span>Mode: <strong>{soalAcak ? "Soal Acak" : "Soal Berurutan"}</strong> · <button className="underline font-semibold opacity-70 hover:opacity-100" onClick={() => setStep(1)}>Ubah</button></span>
//                 </div>
//                 <button onClick={() => setShowImportModal(true)} className="w-full h-10 border-2 border-violet-200 bg-violet-50 text-violet-700 rounded-xl text-[12px] font-semibold hover:bg-violet-100 flex items-center justify-center gap-2 transition-colors">
//                   <FileUp className="w-4 h-4" /> Import Soal dari File (PDF / DOCX / TXT)
//                 </button>
//                 {soalList.length > 0 && (
//                   <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
//                     <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
//                       <h4 className="font-semibold text-zinc-900 text-[13px]">Soal Ditambahkan</h4>
//                       <span className="text-[11px] text-slate-400">{soalList.length} soal</span>
//                     </div>
//                     <div className="divide-y divide-slate-50">
//                       {soalList.map((s, i) => (
//                         <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId === s.id ? "bg-amber-50" : ""}`}>
//                           <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-[12px] font-medium text-zinc-900 truncate">{s.pertanyaan}</p>
//                             {/* ✅ Hanya tampilkan gambar jika URL valid https:// */}
//                             {s.gambar?.startsWith("https://") && (
//                               <img src={s.gambar} alt="" className="mt-1.5 h-12 rounded-lg object-cover border border-slate-200" />
//                             )}
//                             <div className="flex items-center gap-2 mt-0.5 flex-wrap">
//                               <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "pg" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{s.tipe === "pg" ? "Pilihan Ganda" : "Essay"}</span>
//                               {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
//                               {s.gambar?.startsWith("https://") && <span className="inline-flex items-center gap-0.5 text-[10px] text-violet-500 font-semibold"><ImageIcon className="w-3 h-3" /> Gambar ✓</span>}
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-1 flex-shrink-0">
//                             <button onClick={() => handleEditSoal(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
//                             <button onClick={() => setSoalList(prev => prev.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 <SoalForm
//                   soalPertanyaan={soalPertanyaan} setSoalPertanyaan={setSoalPertanyaan}
//                   soalTipe={soalTipe} setSoalTipe={setSoalTipe} soalTopik={soalTopik} setSoalTopik={setSoalTopik}
//                   soalOpsi={soalOpsi} setSoalOpsi={setSoalOpsi} soalJawaban={soalJawaban} setSoalJawaban={setSoalJawaban}
//                   soalGambar={soalGambar} setSoalGambar={setSoalGambar}
//                   editingId={editingId} soalListLength={soalList.length} soalList={soalList}
//                   onAdd={handleAddSoal} onCancelEdit={() => { setEditingId(null); resetSoalForm(); }} radioName="jawaban-benar-add"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="p-5 pt-3 shrink-0 border-t border-slate-100">
//             {step === 1 ? (
//               <div className="flex gap-3">
//                 <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup & Simpan Draft</button>
//                 <button onClick={() => { if (nama.trim()) setStep(2); }} disabled={!nama.trim()}
//                   className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
//                   Lanjut: Tambah Soal <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             ) : (
//               <div className="flex gap-3">
//                 <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup & Simpan Draft</button>
//                 <button onClick={handleSave} className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2">
//                   <Check className="w-4 h-4" /> Simpan {TAB_LABELS[activeTab]} ({totalSoalPreview} soal)
//                 </button>
//               </div>
//             )}
//             {hasDraftData && <p className="text-center text-[10px] text-slate-400 mt-2">💾 Data Anda tersimpan otomatis — aman jika modal ditutup</p>}
//           </div>
//         </div>
//       </div>
//       {showImportModal && <ImportSoalModal onClose={() => setShowImportModal(false)} onImport={handleImport} />}
//     </>
//   );
// }

// // ─── KelolaSoalModal ──────────────────────────────────────────────────────────
// function KelolaSoalModal({ ujian, onClose, onUpdate }: { ujian: Ujian; onClose: () => void; onUpdate: (id: string, soalList: SoalItem[]) => void }) {
//   const [soalList, setSoalList] = useState<SoalItem[]>(ujian.soalList || []);
//   const [pertanyaan, setPertanyaan] = useState("");
//   const [tipe, setTipe] = useState<"pg" | "essay">("pg");
//   const [topik, setTopik] = useState("");
//   const [opsi, setOpsi] = useState([...DEFAULT_OPSI]);
//   const [jawaban, setJawaban] = useState("");
//   const [gambar, setGambar] = useState<string | undefined>();
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [showImportModal, setShowImportModal] = useState(false);

//   const liveIsValid = pertanyaan.trim().length > 0;
//   const totalPreview = soalList.length + (liveIsValid && showForm && !editingId ? 1 : 0);

//   function reset() { setPertanyaan(""); setTopik(""); setOpsi([...DEFAULT_OPSI]); setJawaban(""); setTipe("pg"); setGambar(undefined); }

//   function commitLive(): SoalItem[] {
//     if (!liveIsValid || !showForm) return soalList;
//     if (editingId) return soalList.map(s => s.id === editingId ? { id: editingId, pertanyaan: pertanyaan.trim(), tipe, opsi: tipe === "pg" ? opsi.filter(Boolean) : [], jawaban, topik: topik.trim(), gambar } : s);
//     return [...soalList, { id: Date.now().toString(), pertanyaan: pertanyaan.trim(), tipe, opsi: tipe === "pg" ? opsi.filter(Boolean) : [], jawaban, topik: topik.trim(), gambar }];
//   }

//   function handleAdd() {
//     if (!pertanyaan.trim()) return;
//     const item: SoalItem = { id: editingId || Date.now().toString(), pertanyaan: pertanyaan.trim(), tipe, opsi: tipe === "pg" ? opsi.filter(Boolean) : [], jawaban, topik: topik.trim(), gambar };
//     if (editingId) { setSoalList(p => p.map(s => s.id === editingId ? item : s)); setEditingId(null); }
//     else setSoalList(p => [...p, item]);
//     reset(); setShowForm(false);
//   }

//   function handleEdit(s: SoalItem) {
//     if (liveIsValid && showForm && !editingId) { setSoalList(commitLive()); reset(); }
//     setEditingId(s.id); setPertanyaan(s.pertanyaan); setTipe(s.tipe); setTopik(s.topik);
//     setOpsi(s.tipe === "pg" ? [...s.opsi, "", "", "", "", ""].slice(0, 5) : [...DEFAULT_OPSI]);
//     setJawaban(s.jawaban);
//     // ✅ Hanya load gambar jika URL valid (https://)
//     setGambar(s.gambar?.startsWith("https://") ? s.gambar : undefined);
//     setShowForm(true);
//   }

//   function handleSaveAll() { const finalList = commitLive(); onUpdate(ujian.id, finalList); onClose(); }
//   function handleImport(imported: SoalItem[]) { setSoalList(prev => [...prev, ...imported]); }

//   return (
//     <>
//       <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
//         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
//         <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
//           <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 sticky top-0 bg-white z-10 rounded-t-2xl">
//             <div><h3 className="text-base font-bold text-zinc-900">Kelola Soal</h3><p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p></div>
//             <div className="flex items-center gap-2">
//               <span className="text-[11px] text-slate-500 font-medium">{totalPreview} soal</span>
//               {!showForm && (
//                 <button onClick={() => { setShowForm(true); setEditingId(null); reset(); }} className="inline-flex items-center gap-1.5 h-8 px-3 bg-zinc-900 text-white rounded-lg text-[11px] font-semibold hover:bg-zinc-800 transition-colors">
//                   <Plus className="w-3.5 h-3.5" /><span>Tambah Soal</span>
//                 </button>
//               )}
//               <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
//             </div>
//           </div>
//           <div className="flex-1 overflow-y-auto p-5 space-y-4">
//             <button onClick={() => setShowImportModal(true)} className="w-full h-10 border-2 border-violet-200 bg-violet-50 text-violet-700 rounded-xl text-[12px] font-semibold hover:bg-violet-100 flex items-center justify-center gap-2 transition-colors">
//               <FileUp className="w-4 h-4" /> Import Soal dari File (PDF / DOCX / TXT)
//             </button>
//             {soalList.length === 0 && !showForm && (
//               <div className="text-center py-8">
//                 <FileText className="w-10 h-10 text-slate-200 mx-auto mb-2" />
//                 <p className="text-[13px] font-semibold text-zinc-500">Belum ada soal</p>
//                 <p className="text-[11px] text-slate-400 mt-0.5">Import dari file atau klik "Tambah Soal" untuk mulai</p>
//               </div>
//             )}
//             {soalList.length > 0 && (
//               <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
//                 <div className="divide-y divide-slate-50">
//                   {soalList.map((s, i) => (
//                     <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId === s.id ? "bg-amber-50" : "hover:bg-slate-50/50"}`}>
//                       <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[12px] font-medium text-zinc-900">{s.pertanyaan}</p>
//                         {/* ✅ Hanya tampilkan gambar jika URL valid https:// — tidak ada blob/base64 */}
//                         {s.gambar?.startsWith("https://") && (
//                           <img src={s.gambar} alt="" className="mt-1.5 h-12 rounded-lg object-cover border border-slate-200" />
//                         )}
//                         <div className="flex items-center gap-2 mt-1 flex-wrap">
//                           <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "pg" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{s.tipe === "pg" ? "PG" : "Essay"}</span>
//                           {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
//                           {s.tipe === "pg" && s.opsi.length > 0 && <span className="text-[10px] text-slate-400">{s.opsi.length} opsi · Jwb: <strong className="text-emerald-600">{s.jawaban}</strong></span>}
//                           {s.gambar?.startsWith("https://") && <span className="text-[10px] text-violet-500 font-semibold">📷 Gambar</span>}
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1 flex-shrink-0">
//                         <button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
//                         <button onClick={() => setSoalList(p => p.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {!showForm && soalList.length > 0 && (
//               <button onClick={() => { setShowForm(true); setEditingId(null); reset(); }} className="w-full h-10 border-2 border-dashed border-slate-200 rounded-xl text-[12px] font-semibold text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2">
//                 <Plus className="w-4 h-4" /> Tambah Soal Manual
//               </button>
//             )}
//             {showForm && (
//               <SoalForm
//                 soalPertanyaan={pertanyaan} setSoalPertanyaan={setPertanyaan}
//                 soalTipe={tipe} setSoalTipe={setTipe} soalTopik={topik} setSoalTopik={setTopik}
//                 soalOpsi={opsi} setSoalOpsi={setOpsi} soalJawaban={jawaban} setSoalJawaban={setJawaban}
//                 soalGambar={gambar} setSoalGambar={setGambar}
//                 editingId={editingId} soalListLength={soalList.length} soalList={soalList}
//                 onAdd={handleAdd} onCancelEdit={() => { setShowForm(false); setEditingId(null); reset(); }} radioName="jawaban-kelola"
//               />
//             )}
//           </div>
//           <div className="p-5 border-t border-slate-100 shrink-0 flex gap-3">
//             <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Batal</button>
//             <button onClick={handleSaveAll} className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2">
//               <Check className="w-4 h-4" /> Simpan ({totalPreview} soal)
//             </button>
//           </div>
//         </div>
//       </div>
//       {showImportModal && <ImportSoalModal onClose={() => setShowImportModal(false)} onImport={handleImport} />}
//     </>
//   );
// }

// // ─── EditUjianModal ───────────────────────────────────────────────────────────
// function EditUjianModal({ ujian, onClose, onSave }: { ujian: Ujian; onClose: () => void; onSave: (id: string, data: { nama: string; durasi: number; tanggalMulai?: string }) => void }) {
//   const [nama, setNama] = useState(ujian.nama);
//   const [durasi, setDurasi] = useState(String(ujian.durasi));
//   const [tanggal, setTanggal] = useState(ujian.tanggalMulai ? new Date(ujian.tanggalMulai).toISOString().split("T")[0] : "");
//   return (
//     <div className="fixed inset-0 z-[300] flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl z-10 p-6">
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="text-base font-bold text-zinc-900">Edit {TAB_LABELS[ujian.tipe?.toLowerCase()] || "Ujian"}</h3>
//           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label>
//             <input type="text" value={nama} onChange={e => setNama(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label>
//               <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
//             </div>
//             <div>
//               <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label>
//               <input type="number" value={durasi} onChange={e => setDurasi(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" />
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-3 mt-4">
//           <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
//           <button onClick={() => onSave(ujian.id, { nama, durasi: parseInt(durasi) || 60, tanggalMulai: tanggal || undefined })} disabled={!nama.trim()} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40">Simpan</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── DeleteUjianModal ─────────────────────────────────────────────────────────
// function DeleteUjianModal({ ujian, onClose, onDelete }: { ujian: Ujian; onClose: () => void; onDelete: (id: string) => void }) {
//   return (
//     <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
//         <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trash2 className="w-5 h-5 text-red-600" /></div>
//         <h3 className="text-base font-bold text-zinc-900 mb-2 text-center">Hapus {TAB_LABELS[ujian.tipe?.toLowerCase()] || "Ujian"}</h3>
//         <p className="text-[13px] text-slate-500 mb-6 text-center">Yakin ingin menghapus <span className="font-semibold text-zinc-900">"{ujian.nama}"</span>?</p>
//         <div className="flex gap-3">
//           <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
//           <button onClick={() => onDelete(ujian.id)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700">Hapus</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function GuruMataPelajaranPage() {
//   const router = useRouter();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [subjects, setSubjects] = useState<MataPelajaran[]>([]);
//   const [stats, setStats] = useState({ totalSoal: 0, totalUjian: 0 });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [kelasFilter, setKelasFilter] = useState("all");
//   const [selectedSubject, setSelectedSubject] = useState<MataPelajaran | null>(null);
//   const [activeTab, setActiveTab] = useState("ujian");
//   const [ujianList, setUjianList] = useState<Ujian[]>([]);
//   const [ujianLoading, setUjianLoading] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [showKelolaSoal, setShowKelolaSoal] = useState(false);
//   const [showContentModal, setShowContentModal] = useState(false);
//   const [selectedUjian, setSelectedUjian] = useState<Ujian | null>(null);
//   const [targetMapel, setTargetMapel] = useState<MataPelajaran | null>(null);
//   const [deleteMapelDetail, setDeleteMapelDetail] = useState<DeleteMapelDetail | null>(null);
//   const [deleteMapelLoading, setDeleteMapelLoading] = useState(false);
//   const [showEditUjianModal, setShowEditUjianModal] = useState(false);
//   const [showDeleteUjianModal, setShowDeleteUjianModal] = useState(false);
//   const [targetUjian, setTargetUjian] = useState<Ujian | null>(null);
//   const [showHasilModal, setShowHasilModal] = useState(false);
//   const [hasilUjianTarget, setHasilUjianTarget] = useState<Ujian | null>(null);
//   const [soalBankList, setSoalBankList] = useState<any[]>([]);
//   const [soalBankLoading, setSoalBankLoading] = useState(false);
//   const [soalBankSearch, setSoalBankSearch] = useState("");
//   const [soalBankTipe, setSoalBankTipe] = useState("");
//   const [addForm, setAddForm] = useState({ nama: "", kelas: "", deskripsi: "", warna: "zinc" });
//   const [editForm, setEditForm] = useState<MataPelajaran | null>(null);
//   const [copiedLink, setCopiedLink] = useState(false);
//   const [copiedToken, setCopiedToken] = useState(false);
//   const [showToken, setShowToken] = useState(false);
//   const [bobotUjian, setBobotUjian] = useState(40);
//   const [bobotUlangan, setBobotUlangan] = useState(25);
//   const [bobotLatihan, setBobotLatihan] = useState(20);
//   const [bobotKuis, setBobotKuis] = useState(15);
//   const [kkm, setKkm] = useState(70);
//   const [showNilaiHasil, setShowNilaiHasil] = useState(false);
//   const [nilaiData, setNilaiData] = useState<any[]>([]);
//   const [nilaiFilter, setNilaiFilter] = useState("all");
//   const [nilaiSortKey, setNilaiSortKey] = useState("akhir");
//   const [nilaiSortAsc, setNilaiSortAsc] = useState(false);

//   const fetchSubjects = useCallback(async () => {
//     const token = getToken();
//     if (!token) { router.push("/auth/login"); return; }
//     try {
//       const res = await api.get<{ data: MataPelajaran[]; stats: any }>(`/mata-pelajaran?kelas=${kelasFilter !== "all" ? kelasFilter : ""}`);
//       setSubjects(res.data || []); if (res.stats) setStats(res.stats);
//     } catch (err) { setError(err instanceof Error ? err.message : "Gagal memuat data"); }
//     finally { setLoading(false); }
//   }, [kelasFilter, router]);

//   useEffect(() => { fetchSubjects(); }, [fetchSubjects]);

//   const fetchUjianByTipe = useCallback(async (mapelId: number, tipe: string) => {
//     setUjianLoading(true);
//     try {
//       const tipeMap: Record<string, string> = { ujian: "UJIAN", ulangan: "ULANGAN", latihan: "LATIHAN", kuis: "KUIS" };
//       const tipeParam = tipeMap[tipe];
//       const url = tipeParam ? `/mata-pelajaran/${mapelId}/ujian?tipe=${tipeParam}` : `/mata-pelajaran/${mapelId}/ujian`;
//       const res = await api.get<{ data: Ujian[] }>(url);
//       setUjianList(res.data || []);
//     } catch { setError("Gagal memuat data ujian"); }
//     finally { setUjianLoading(false); }
//   }, []);

//   useEffect(() => {
//     if (selectedSubject && ["ujian", "ulangan", "latihan", "kuis"].includes(activeTab)) fetchUjianByTipe(selectedSubject.id, activeTab);
//   }, [selectedSubject, activeTab, fetchUjianByTipe]);

//   const fetchSoalBank = useCallback(async (mapelId: number, search = "", tipe = "") => {
//     setSoalBankLoading(true);
//     try {
//       const params = new URLSearchParams();
//       if (search) params.set("search", search);
//       if (tipe) params.set("tipe", tipe);
//       const res = await api.get<{ data: any[]; total: number }>(`/mata-pelajaran/${mapelId}/soal?${params.toString()}`);
//       setSoalBankList(res.data || []);
//     } catch { setSoalBankList([]); }
//     finally { setSoalBankLoading(false); }
//   }, []);

//   useEffect(() => {
//     if (selectedSubject && activeTab === "soal") fetchSoalBank(selectedSubject.id, soalBankSearch, soalBankTipe);
//   }, [selectedSubject, activeTab, soalBankSearch, soalBankTipe, fetchSoalBank]);

//   const filtered = subjects.filter(s => !searchQuery || s.nama.toLowerCase().includes(searchQuery.toLowerCase()));

//   async function handleAdd() {
//     try { await api.post("/mata-pelajaran", addForm); setShowAddModal(false); setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" }); fetchSubjects(); }
//     catch (err) { setError(err instanceof Error ? err.message : "Gagal menambah"); }
//   }

//   async function handleEdit() {
//     if (!editForm || !targetMapel) return;
//     try { await api.put(`/mata-pelajaran/${targetMapel.id}`, editForm); setShowEditModal(false); setTargetMapel(null); setEditForm(null); fetchSubjects(); }
//     catch (err) { setError(err instanceof Error ? err.message : "Gagal mengubah"); }
//   }

//   async function openDeleteMapelModal(subject: MataPelajaran) {
//     setTargetMapel(subject); setDeleteMapelDetail(null); setDeleteMapelLoading(true); setShowDeleteModal(true);
//     try {
//       const [ujianRes, ulanganRes, latihanRes, kuisRes, soalRes] = await Promise.all([
//         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=UJIAN`),
//         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=ULANGAN`),
//         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=LATIHAN`),
//         api.get<{ data: any[] }>(`/mata-pelajaran/${subject.id}/ujian?tipe=KUIS`),
//         api.get<{ total: number }>(`/mata-pelajaran/${subject.id}/soal`),
//       ]);
//       setDeleteMapelDetail({ totalUjian: ujianRes.data?.length || 0, totalUlangan: ulanganRes.data?.length || 0, totalLatihan: latihanRes.data?.length || 0, totalKuis: kuisRes.data?.length || 0, totalSoal: soalRes.total || subject.totalSoal });
//     } catch { setDeleteMapelDetail({ totalUjian: subject.totalUjian, totalUlangan: 0, totalLatihan: 0, totalKuis: 0, totalSoal: subject.totalSoal }); }
//     finally { setDeleteMapelLoading(false); }
//   }

//   async function handleDelete() {
//     if (!targetMapel) return;
//     try {
//       await api.delete(`/mata-pelajaran/${targetMapel.id}`); setShowDeleteModal(false); setDeleteMapelDetail(null);
//       if (selectedSubject?.id === targetMapel.id) setSelectedSubject(null);
//       setTargetMapel(null); fetchSubjects();
//     } catch (err) { setError(err instanceof Error ? err.message : "Gagal menghapus"); setShowDeleteModal(false); }
//   }

//   async function handleEditUjian(ujianId: string, data: { nama: string; durasi: number; tanggalMulai?: string }) {
//     try {
//       await api.put(`/ujian/${ujianId}`, { nama: data.nama, durasi: data.durasi, tanggalMulai: data.tanggalMulai ? new Date(data.tanggalMulai).toISOString() : null });
//       setShowEditUjianModal(false); setTargetUjian(null);
//       if (selectedSubject) fetchUjianByTipe(selectedSubject.id, activeTab);
//     } catch (err) { setError(err instanceof Error ? err.message : "Gagal mengubah ujian"); }
//   }

//   async function handleDeleteUjian(ujianId: string) {
//     try {
//       await api.delete(`/ujian/${ujianId}`); setShowDeleteUjianModal(false); setTargetUjian(null);
//       if (selectedSubject) { fetchUjianByTipe(selectedSubject.id, activeTab); fetchSubjects(); }
//     } catch (err) { setError(err instanceof Error ? err.message : "Gagal menghapus ujian"); }
//   }

//   // ✅ handleSaveContent — gambar sudah berupa URL Cloudinary dari SoalImageUpload
//   // Tidak perlu upload lagi di sini
//   async function handleSaveContent(data: { nama: string; tanggal: string; durasi: string; soalAcak: boolean; soalList: SoalItem[] }) {
//     if (!selectedSubject) return;
//     const tipeMap: Record<string, string> = { ujian: "UJIAN", ulangan: "ULANGAN", latihan: "LATIHAN", kuis: "KUIS" };
//     try {
//       const ujianRes = await api.post<{ id: string; token: string }>(`/mata-pelajaran/${selectedSubject.id}/ujian`, {
//         nama: data.nama, tipe: tipeMap[activeTab] || "UJIAN", durasi: parseInt(data.durasi) || 60,
//         kelas: selectedSubject.kelas, tanggalMulai: data.tanggal || null, acakSoal: data.soalAcak, acakOpsi: false, soalIds: [],
//       });
//       const ujianId = ujianRes.id;
//       if (ujianId && data.soalList.length > 0) {
//         const soalIds: string[] = [];
//         for (const s of data.soalList) {
//           // ✅ gambar sudah URL Cloudinary (https://) atau undefined — langsung pakai
//           const gambarUrl = safeGambarUrl(s.gambar);
//           const soalRes = await api.post<{ id: string }>(`/mata-pelajaran/${selectedSubject.id}/soal`, {
//             pertanyaan: s.pertanyaan, tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
//             topik: s.topik || null, gambarUrl,
//             opsiA: s.opsi[0] || null, opsiB: s.opsi[1] || null, opsiC: s.opsi[2] || null,
//             opsiD: s.opsi[3] || null, opsiE: s.opsi[4] || null, jawabanBenar: s.jawaban || null,
//           });
//           soalIds.push(soalRes.id);
//         }
//         await api.put(`/ujian/${ujianId}`, { soalIds });
//       }
//       setShowContentModal(false);
//       await fetchUjianByTipe(selectedSubject.id, activeTab);
//       fetchSubjects();
//     } catch (err) { setError(err instanceof Error ? err.message : "Gagal menyimpan"); }
//   }

//   // ✅ handleUpdateSoal — gambar sudah berupa URL Cloudinary dari SoalImageUpload
//   async function handleUpdateSoal(ujianId: string, soalList: SoalItem[]) {
//     if (!selectedSubject) return;
//     try {
//       const soalIds: string[] = [];
//       for (const s of soalList) {
//         const isNewSoal = /^\d+$/.test(s.id) || s.id.startsWith("import_");
//         if (isNewSoal) {
//           // ✅ gambar sudah URL Cloudinary (https://) atau undefined
//           const gambarUrl = safeGambarUrl(s.gambar);
//           const soalRes = await api.post<{ id: string }>(`/mata-pelajaran/${selectedSubject.id}/soal`, {
//             pertanyaan: s.pertanyaan, tipe: s.tipe === "pg" ? "PILIHAN_GANDA" : "ESSAY",
//             topik: s.topik || null, gambarUrl,
//             opsiA: s.opsi[0] || null, opsiB: s.opsi[1] || null, opsiC: s.opsi[2] || null,
//             opsiD: s.opsi[3] || null, opsiE: s.opsi[4] || null, jawabanBenar: s.jawaban || null,
//           });
//           soalIds.push(soalRes.id);
//         } else {
//           soalIds.push(s.id);
//         }
//       }
//       await api.put(`/ujian/${ujianId}`, { soalIds });
//       await fetchUjianByTipe(selectedSubject.id, activeTab);
//       fetchSubjects();
//     } catch (err) { setError(err instanceof Error ? err.message : "Gagal menyimpan soal"); }
//   }

//   function copyToClipboard(text: string, type: "link" | "token") {
//     navigator.clipboard.writeText(text).then(() => {
//       if (type === "link") { setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); }
//       else { setCopiedToken(true); setTimeout(() => setCopiedToken(false), 2000); }
//     });
//   }

//   function hitungNilaiAkhir() {
//     const namaList = ["Adi Nugroho", "Bella Rahmawati", "Candra Wijaya", "Dewi Anggraeni", "Eko Prasetyo", "Fitri Handayani", "Gilang Ramadhan", "Hana Safitri", "Ivan Santoso", "Julia Maharani", "Kevin Pratama", "Laila Nurfadillah", "Mario Situmorang", "Nadia Kusuma", "Oka Widyatma"];
//     let seed = 12345;
//     function rand(min: number, max: number) { seed = (seed * 9301 + 49297) % 233280; return min + Math.floor((seed / 233280) * (max - min + 1)); }
//     const bU = bobotUjian / 100, bUl = bobotUlangan / 100, bL = bobotLatihan / 100, bK = bobotKuis / 100;
//     const data = namaList.map((nama, i) => {
//       const ujian = rand(55, 100), ulangan = rand(55, 100), latihan = rand(60, 100), kuis = rand(60, 100);
//       const akhir = Math.round(ujian * bU + ulangan * bUl + latihan * bL + kuis * bK);
//       return { nisn: `005${String(i + 1).padStart(5, "0")}`, nama, ujian, ulangan, latihan, kuis, akhir, lulus: akhir >= kkm, grade: akhir >= 90 ? "A" : akhir >= 80 ? "B" : akhir >= 70 ? "C" : "D" };
//     });
//     setNilaiData(data); setShowNilaiHasil(true);
//     setTimeout(() => document.getElementById("nilai-hasil-section")?.scrollIntoView({ behavior: "smooth" }), 100);
//   }

//   function getSortedNilaiData() {
//     return [...nilaiData]
//       .filter(s => { if (nilaiFilter === "lulus" && !s.lulus) return false; if (nilaiFilter === "tidak" && s.lulus) return false; return true; })
//       .sort((a, b) => { const va = a[nilaiSortKey]; const vb = b[nilaiSortKey]; return nilaiSortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1); });
//   }

//   const bobotTotal = bobotUjian + bobotUlangan + bobotLatihan + bobotKuis;
//   const isBobotValid = bobotTotal === 100;

//   const renderContentTable = () => {
//     if (ujianLoading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>;
//     const tabLabel = TAB_LABELS[activeTab] || activeTab;
//     return (
//       <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//         <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
//           <h3 className="font-semibold text-zinc-900 text-[13px]">Daftar {tabLabel}</h3>
//           <span className="text-[11px] text-slate-400 font-medium">{ujianList.length} {tabLabel.toLowerCase()}</span>
//         </div>
//         {ujianList.length === 0 ? (
//           <div className="py-12 text-center">
//             <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
//             <p className="text-[13px] text-slate-400">Belum ada {tabLabel.toLowerCase()}</p>
//             <button onClick={() => setShowContentModal(true)} className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-zinc-700 underline"><Plus className="w-3.5 h-3.5" /> Tambah {tabLabel}</button>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm" style={{ minWidth: "680px" }}>
//               <thead className="border-b border-slate-100 bg-slate-50/50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama {tabLabel}</th>
//                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Tanggal</th>
//                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Soal</th>
//                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Urutan</th>
//                   <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
//                   <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 {ujianList.map(item => {
//                   const soalCount = item.soalList?.length ?? item.totalSoal;
//                   return (
//                     <tr key={item.id} className="hover:bg-slate-50/50">
//                       <td className="px-4 py-3"><p className="font-medium text-zinc-900 text-[13px]">{item.nama}</p><p className="text-[10px] text-slate-400 mt-0.5">{item.kelas}</p></td>
//                       <td className="px-4 py-3 text-slate-500 text-[12px] hidden sm:table-cell">{item.tanggalMulai ? new Date(item.tanggalMulai).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "—"}</td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-1.5">
//                           <span className="font-semibold text-zinc-900 text-[12px]">{soalCount}</span>
//                           <button onClick={() => { setSelectedUjian(item); setShowKelolaSoal(true); }} className="inline-flex items-center gap-1 h-5 px-1.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-500 hover:bg-zinc-900 hover:text-white transition-colors">
//                             <Edit3 className="w-2.5 h-2.5" /> Kelola
//                           </button>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 hidden sm:table-cell">
//                         {item.soalAcak ? <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full"><Shuffle className="w-3 h-3" /> Acak</span>
//                           : <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full"><ListOrdered className="w-3 h-3" /> Urut</span>}
//                       </td>
//                       <td className="px-4 py-3">
//                         {item.status === "BERLANGSUNG" && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" /> BERLANGSUNG</span>}
//                         {item.status === "SELESAI" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">SELESAI</span>}
//                         {item.status === "AKTIF" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">AKTIF</span>}
//                         {item.status === "DRAFT" && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">DRAFT</span>}
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center justify-end gap-1">
//                           <button onClick={() => { setSelectedUjian(item); setShowToken(false); setCopiedLink(false); setCopiedToken(false); setShowDetailModal(true); }} className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors">Detail</button>
//                           <button onClick={() => { setHasilUjianTarget(item); setShowHasilModal(true); }} className="h-7 px-2.5 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-semibold hover:bg-emerald-100 transition-colors">Hasil</button>
//                           <button onClick={() => { setTargetUjian(item); setShowEditUjianModal(true); }} className="h-7 w-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderNilaiTab = () => (
//     <div className="space-y-4">
//       <div className="bg-white border border-slate-200 rounded-[14px] p-4 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//         <div className="flex items-start justify-between gap-3 mb-4">
//           <div><h3 className="font-bold text-zinc-900 text-[14px]">Konfigurasi Rumus Nilai Akhir</h3><p className="text-[11px] text-slate-500 mt-0.5">Total bobot harus <strong>100%</strong>.</p></div>
//           <div className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[13px] font-bold ${isBobotValid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>{bobotTotal}%</div>
//         </div>
//         <div className="space-y-3">
//           {[
//             { label: "Ujian", icon: <ClipboardList className="w-4 h-4 text-violet-600" />, desc: `${ujianList.length} ujian`, val: bobotUjian, set: setBobotUjian, color: "violet" },
//             { label: "Ulangan Harian", icon: <Book className="w-4 h-4 text-blue-600" />, desc: "Rata-rata semua ulangan", val: bobotUlangan, set: setBobotUlangan, color: "blue" },
//             { label: "Latihan", icon: <Dumbbell className="w-4 h-4 text-emerald-600" />, desc: "Rata-rata semua latihan", val: bobotLatihan, set: setBobotLatihan, color: "emerald" },
//             { label: "Kuis", icon: <Zap className="w-4 h-4 text-amber-600" />, desc: "Rata-rata semua kuis", val: bobotKuis, set: setBobotKuis, color: "amber" },
//           ].map(item => (
//             <div key={item.label} className={`p-3 rounded-xl bg-${item.color}-50 border border-${item.color}-100`}>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-7 h-7 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>{item.icon}</div>
//                   <div><p className="font-semibold text-zinc-900 text-[12px]">{item.label}</p><p className="text-[10px] text-slate-400">{item.desc}</p></div>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <input type="number" value={item.val} onChange={e => item.set(parseInt(e.target.value) || 0)} className="w-16 h-8 text-center border-[1.5px] border-slate-200 rounded-lg text-[12px] font-semibold text-zinc-900 bg-white focus:border-zinc-900 outline-none" />
//                   <span className="text-[12px] font-semibold text-slate-500">%</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 p-3 bg-slate-900 rounded-xl">
//           <p className="text-[10px] text-slate-400 mb-1 font-semibold uppercase tracking-wider">Preview Rumus</p>
//           <p className="text-[12px] text-white font-mono">NA = {bobotUjian > 0 && `Ujian×${bobotUjian}%`}{bobotUjian > 0 && bobotUlangan > 0 && " + "}{bobotUlangan > 0 && `UH×${bobotUlangan}%`}{bobotUlangan > 0 && bobotLatihan > 0 && " + "}{bobotLatihan > 0 && `Latihan×${bobotLatihan}%`}{bobotLatihan > 0 && bobotKuis > 0 && " + "}{bobotKuis > 0 && `Kuis×${bobotKuis}%`}</p>
//         </div>
//         <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
//           <KkmField kkm={kkm} setKkm={setKkm} />
//           <button onClick={hitungNilaiAkhir} disabled={!isBobotValid} className="h-10 px-5 bg-zinc-900 text-white text-[13px] font-bold rounded-xl hover:bg-zinc-800 flex items-center gap-2 disabled:opacity-40 w-full sm:w-auto justify-center">
//             <Calculator className="w-4 h-4" /> Hitung Nilai Akhir
//           </button>
//         </div>
//         {!isBobotValid && <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2"><AlertCircle className="text-red-500 w-4 h-4 flex-shrink-0" /><p className="text-[11px] text-red-600 font-medium">Total bobot harus 100%.</p></div>}
//       </div>
//       {showNilaiHasil && (
//         <div id="nilai-hasil-section" className="space-y-4">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//             {[
//               { label: "Total Siswa", val: nilaiData.length, icon: <Users className="w-3.5 h-3.5" />, color: "#18181b" },
//               { label: "Rata-rata", val: (nilaiData.reduce((a: number, b: any) => a + b.akhir, 0) / nilaiData.length).toFixed(1), icon: <BarChart2 className="w-3.5 h-3.5" />, color: "#2563eb" },
//               { label: "Nilai Tertinggi", val: Math.max(...nilaiData.map((s: any) => s.akhir)), icon: <TrendingUp className="w-3.5 h-3.5" />, color: "#059669" },
//               { label: `Lulus (≥${kkm})`, val: `${nilaiData.filter((s: any) => s.lulus).length}/${nilaiData.length}`, icon: <CheckCircle className="w-3.5 h-3.5" />, color: "#059669" },
//             ].map(s => (
//               <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//                 <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>{s.icon}</div>
//                 <div><p className="text-lg font-bold text-zinc-900">{s.val}</p><p className="text-[10px] text-slate-400 font-medium">{s.label}</p></div>
//               </div>
//             ))}
//           </div>
//           <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//             <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
//               <h3 className="font-semibold text-zinc-900 text-[13px]">Rekap Nilai Akhir Siswa</h3>
//               <select value={nilaiFilter} onChange={e => setNilaiFilter(e.target.value)} className="h-8 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-600 focus:outline-none">
//                 <option value="all">Semua</option><option value="lulus">Lulus</option><option value="tidak">Tidak Lulus</option>
//               </select>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full" style={{ minWidth: "480px" }}>
//                 <thead className="border-b border-slate-100 bg-slate-50/50">
//                   <tr>
//                     <th className="px-4 py-3 text-center text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama</th>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell cursor-pointer" onClick={() => { if (nilaiSortKey === "ujian") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("ujian"); setNilaiSortAsc(false); } }}>Ujian</th>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell cursor-pointer" onClick={() => { if (nilaiSortKey === "ulangan") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("ulangan"); setNilaiSortAsc(false); } }}>Ulangan</th>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer" onClick={() => { if (nilaiSortKey === "akhir") setNilaiSortAsc(!nilaiSortAsc); else { setNilaiSortKey("akhir"); setNilaiSortAsc(false); } }}>Nilai Akhir</th>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Grade</th>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50">
//                   {getSortedNilaiData().map((s: any) => {
//                     const ranked = [...nilaiData].sort((a: any, b: any) => b.akhir - a.akhir);
//                     const rank = ranked.findIndex((r: any) => r.nisn === s.nisn) + 1;
//                     const rankClass = rank === 1 ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white" : rank === 2 ? "bg-gradient-to-br from-slate-400 to-slate-500 text-white" : rank === 3 ? "bg-gradient-to-br from-orange-400 to-amber-600 text-white" : "bg-slate-100 text-slate-600";
//                     const akhirColor = s.akhir >= 90 ? "#059669" : s.akhir >= 80 ? "#10b981" : s.akhir >= 70 ? "#2563eb" : "#dc2626";
//                     const gradeClass: Record<string, string> = { A: "bg-emerald-50 text-emerald-700", B: "bg-blue-50 text-blue-700", C: "bg-amber-50 text-amber-700", D: "bg-red-50 text-red-700" };
//                     return (
//                       <tr key={s.nisn} className="hover:bg-slate-50/50">
//                         <td className="px-4 py-3 text-center"><span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center mx-auto ${rankClass}`}>{rank}</span></td>
//                         <td className="px-4 py-3"><p className="font-semibold text-zinc-900 text-[12px] truncate max-w-[120px]">{s.nama}</p><p className="text-[10px] text-slate-400">{s.nisn}</p></td>
//                         <td className="px-4 py-3 hidden sm:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ujian}</span></td>
//                         <td className="px-4 py-3 hidden md:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ulangan}</span></td>
//                         <td className="px-4 py-3"><span className="font-black text-[15px]" style={{ color: akhirColor }}>{s.akhir}</span></td>
//                         <td className="px-4 py-3 hidden sm:table-cell"><span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-extrabold ${gradeClass[s.grade]}`}>{s.grade}</span></td>
//                         <td className="px-4 py-3 hidden md:table-cell">
//                           {s.lulus ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>
//                             : <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
//               <span className="text-[11px] text-slate-400">{getSortedNilaiData().length} dari {nilaiData.length} siswa</span>
//               <span className="text-[11px] text-slate-500">KKM: <strong className="text-zinc-900">{kkm}</strong></span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-zinc-900" /></div>;

//   return (
//     <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
//       {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
//       <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 fixed md:relative z-50`}>
//         <Sidebar role="admin" />
//       </div>
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header title={selectedSubject ? `${selectedSubject.nama} › ${TAB_LABELS[activeTab] || activeTab}` : "Mata Pelajaran"} showHamburger onHamburgerClick={() => setSidebarOpen(true)} />
//         <div className="flex-1 overflow-y-auto">
//           {!selectedSubject && (
//             <div className="p-4 md:p-8 space-y-5">
//               {error && <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600"><AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}<button onClick={() => setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4" /></button></div>}
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div><h1 className="text-lg md:text-xl font-bold text-zinc-900">Mata Pelajaran</h1><p className="text-[13px] text-slate-500 mt-0.5">Kelola semua mata pelajaran</p></div>
//                 <button onClick={() => { setShowAddModal(true); setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" }); }} className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm w-fit">
//                   <Plus className="w-4 h-4" /> Tambah Mata Pelajaran
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                 {[{ label: "Total Mapel", val: subjects.length, icon: <BookOpen className="w-4 h-4" />, color: "#18181b" }, { label: "Total Soal", val: stats.totalSoal, icon: <FileText className="w-4 h-4" />, color: "#2563eb" }, { label: "Total Ujian", val: stats.totalUjian, icon: <ClipboardList className="w-4 h-4" />, color: "#059669" }, { label: "Kelas", val: [...new Set(subjects.map(s => s.kelas))].length, icon: <Users className="w-4 h-4" />, color: "#d97706" }].map(s => (
//                   <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//                     <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.color + "18", color: s.color }}>{s.icon}</div>
//                     <div><p className="text-lg md:text-xl font-bold text-zinc-900">{s.val}</p><p className="text-[10px] md:text-[11px] text-slate-400 font-medium">{s.label}</p></div>
//                   </div>
//                 ))}
//               </div>
//               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
//                 <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//                   <div className="flex gap-2 flex-wrap">
//                     {["all", "X", "XI", "XII"].map(k => (
//                       <button key={k} onClick={() => setKelasFilter(k)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${kelasFilter === k ? "bg-zinc-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{k === "all" ? "Semua" : k}</button>
//                     ))}
//                   </div>
//                   <div className="relative flex-1 max-w-xs">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                     <input type="text" placeholder="Cari mata pelajaran..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
//                   </div>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filtered.map(subject => {
//                   const c = COLORS[subject.warna] || COLORS.zinc;
//                   return (
//                     <div key={subject.id} className="bg-white border border-slate-200 rounded-[16px] overflow-hidden cursor-pointer hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 hover:border-slate-300 transition-all group" onClick={() => { setSelectedSubject(subject); setActiveTab("ujian"); setShowNilaiHasil(false); }}>
//                       <div className="h-[6px]" style={{ background: `linear-gradient(90deg, ${c.dot}, ${c.hex}88)` }} />
//                       <div className="p-5">
//                         <div className="flex items-start gap-3 mb-3">
//                           <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{ background: c.bg, border: `1.5px solid ${c.border}` }}><BookOpen style={{ color: c.icon }} className="w-5 h-5" /></div>
//                           <div className="flex-1 min-w-0">
//                             <p className="font-bold text-zinc-900 text-[14px] leading-tight truncate">{subject.nama}</p>
//                             <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: c.bg, color: c.icon, border: `1px solid ${c.border}` }}>{subject.kelas}</span>
//                           </div>
//                         </div>
//                         {subject.deskripsi && <p className="text-[12px] text-slate-500 mb-3 line-clamp-2">{subject.deskripsi}</p>}
//                         <div className="flex items-center gap-4 text-[12px] text-slate-500 pt-3 border-t border-slate-100">
//                           <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><FileText className="w-3 h-3 text-slate-400" /></div><span className="font-medium">{subject.totalSoal} soal</span></div>
//                           <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><ClipboardList className="w-3 h-3 text-slate-400" /></div><span className="font-medium">{subject.totalUjian} ujian</span></div>
//                           <div className="ml-auto flex items-center gap-1">
//                             <button onClick={e => { e.stopPropagation(); setTargetMapel(subject); setEditForm(subject); setShowEditModal(true); }} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
//                             <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//                 <div onClick={() => { setShowAddModal(true); setAddForm({ nama: "", kelas: "", deskripsi: "", warna: "zinc" }); }} className="border-2 border-dashed border-slate-200 rounded-[16px] p-5 flex flex-col items-center justify-center gap-2 text-center cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all min-h-[160px]">
//                   <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center"><Plus className="text-slate-400 w-5 h-5" /></div>
//                   <div><p className="text-[13px] text-zinc-700 font-semibold">Tambah Mata Pelajaran</p><p className="text-[11px] text-slate-400 mt-0.5">Buat mapel baru</p></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {selectedSubject && (
//             <div className="p-4 md:p-8 space-y-4">
//               {error && <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600"><AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}<button onClick={() => setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4" /></button></div>}
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div className="flex items-center gap-3">
//                   <button onClick={() => setSelectedSubject(null)} className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 flex-shrink-0"><ArrowLeft className="w-4 h-4" /></button>
//                   <div className="min-w-0"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mata Pelajaran</p><h1 className="text-base md:text-lg font-bold text-zinc-900 truncate">{selectedSubject.nama} — {selectedSubject.kelas}</h1></div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {["ujian", "ulangan", "latihan", "kuis"].includes(activeTab) && (
//                     <button onClick={() => setShowContentModal(true)} className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm">
//                       <Plus className="w-4 h-4" /> Tambah {TAB_LABELS[activeTab]}
//                     </button>
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                 {[{ label: "Total Soal", val: selectedSubject.totalSoal, icon: <FileText className="w-4 h-4 text-slate-400" /> }, { label: "Ujian", val: selectedSubject.totalUjian, icon: <ClipboardList className="w-4 h-4 text-slate-400" /> }, { label: "Siswa Aktif", val: 0, icon: <Users className="w-4 h-4 text-slate-400" /> }, { label: "Rata-rata", val: "0", icon: <TrendingUp className="w-4 h-4 text-slate-400" /> }].map(st => (
//                   <div key={st.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//                     <div className="flex items-center gap-2 mb-1">{st.icon}<p className="text-[11px] text-slate-400 font-medium">{st.label}</p></div>
//                     <p className="text-xl md:text-2xl font-bold text-zinc-900">{st.val}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="overflow-x-auto -mx-1 px-1">
//                 <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
//                   {Object.entries(TAB_LABELS).map(([key, label]) => (
//                     <button key={key} onClick={() => { setActiveTab(key); setShowNilaiHasil(false); }} className={`px-3 py-2 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-all ${activeTab === key ? "bg-white text-zinc-900 shadow-sm" : "text-slate-500 hover:text-zinc-900"}`}>{label}</button>
//                   ))}
//                 </div>
//               </div>
//               {(activeTab === "ujian" || activeTab === "ulangan" || activeTab === "latihan" || activeTab === "kuis") && renderContentTable()}
//               {activeTab === "soal" && (
//                 <div className="space-y-4">
//                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//                     <div className="relative flex-1 max-w-xs">
//                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
//                       <input type="text" placeholder="Cari soal..." value={soalBankSearch} onChange={e => setSoalBankSearch(e.target.value)} className="h-9 pl-8 pr-4 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 w-full" />
//                     </div>
//                     <select value={soalBankTipe} onChange={e => setSoalBankTipe(e.target.value)} className="h-9 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-white focus:outline-none">
//                       <option value="">Semua Tipe</option><option value="PILIHAN_GANDA">Pilihan Ganda</option><option value="ESSAY">Essay</option>
//                     </select>
//                   </div>
//                   <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//                     <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
//                       <h3 className="font-semibold text-zinc-900 text-[13px]">Bank Soal</h3>
//                       <span className="text-[11px] text-slate-400 font-medium">{soalBankList.length} soal</span>
//                     </div>
//                     {soalBankLoading ? <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>
//                       : soalBankList.length === 0 ? (
//                         <div className="py-12 text-center"><FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" /><p className="text-[13px] text-slate-400">Belum ada soal di bank soal ini</p><p className="text-[11px] text-slate-400 mt-1">Soal dibuat melalui tab Ujian/Latihan/Kuis</p></div>
//                       ) : (
//                         <div className="divide-y divide-slate-50">
//                           {soalBankList.map((s, i) => (
//                             <div key={s.id} className="px-4 py-3.5 hover:bg-slate-50/50 flex items-start gap-3">
//                               <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-[13px] text-zinc-900 font-medium leading-snug">{s.pertanyaan}</p>
//                                 {/* ✅ Bank soal: gambarUrl dari DB selalu https:// — aman ditampilkan */}
//                                 {s.gambarUrl && s.gambarUrl.startsWith("https://") && (
//                                   <img src={s.gambarUrl} alt="" className="mt-2 h-16 rounded-lg object-cover border border-slate-200" />
//                                 )}
//                                 <div className="flex items-center gap-2 mt-1.5 flex-wrap">
//                                   <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe === "PILIHAN_GANDA" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{s.tipe === "PILIHAN_GANDA" ? "Pilihan Ganda" : "Essay"}</span>
//                                   {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
//                                   {s.tipe === "PILIHAN_GANDA" && s.jawabanBenar && <span className="text-[10px] text-slate-400">Jwb: <strong className="text-emerald-600">{s.jawabanBenar}</strong></span>}
//                                 </div>
//                                 {s.tipe === "PILIHAN_GANDA" && (
//                                   <div className="mt-2 grid grid-cols-2 gap-1">
//                                     {[{ key: "opsiA", label: "A" }, { key: "opsiB", label: "B" }, { key: "opsiC", label: "C" }, { key: "opsiD", label: "D" }, { key: "opsiE", label: "E" }].filter(o => s[o.key]).map(o => (
//                                       <div key={o.key} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] ${s.jawabanBenar === o.label ? "bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold" : "bg-slate-50 text-slate-600"}`}>
//                                         <span className="font-bold">{o.label}.</span> {s[o.key]}
//                                       </div>
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
//                               <span className="text-[10px] text-slate-300 flex-shrink-0 mt-1">{new Date(s.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               )}
//               {activeTab === "nilai" && renderNilaiTab()}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ MODAL: Add Mapel ══ */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
//           <div className="absolute inset-0" onClick={() => setShowAddModal(false)} />
//           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
//             <div className="flex items-center justify-between mb-5"><h3 className="text-base font-bold text-zinc-900">Tambah Mata Pelajaran</h3><button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button></div>
//             <div className="space-y-4">
//               <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label><input type="text" placeholder="e.g. Matematika Peminatan" value={addForm.nama} onChange={e => setAddForm({ ...addForm, nama: e.target.value })} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" /></div>
//               <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas <span className="text-red-500">*</span></label><input type="text" placeholder="e.g. XII IPA 1" value={addForm.kelas} onChange={e => setAddForm({ ...addForm, kelas: e.target.value })} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" /></div>
//               <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label><textarea placeholder="Deskripsi singkat..." value={addForm.deskripsi} onChange={e => setAddForm({ ...addForm, deskripsi: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none" rows={3} /></div>
//               <div><label className="text-[12px] font-semibold text-slate-600 mb-2 block">Warna Tema</label><div className="flex gap-2 flex-wrap">{Object.entries(COLORS).map(([key, c]) => (<button key={key} onClick={() => setAddForm({ ...addForm, warna: key })} className={`w-8 h-8 rounded-full transition-all ${addForm.warna === key ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : "hover:scale-105"}`} style={{ background: c.hex }} title={key} />))}</div></div>
//             </div>
//             <div className="flex gap-3 mt-6"><button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button><button onClick={handleAdd} disabled={!addForm.nama.trim() || !addForm.kelas.trim()} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40">Simpan</button></div>
//           </div>
//         </div>
//       )}

//       {/* ══ MODAL: Edit Mapel ══ */}
//       {showEditModal && editForm && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
//           <div className="absolute inset-0" onClick={() => setShowEditModal(false)} />
//           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
//             <div className="flex items-center justify-between mb-5"><h3 className="text-base font-bold text-zinc-900">Edit Mata Pelajaran</h3><button onClick={() => setShowEditModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button></div>
//             <div className="space-y-4">
//               <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama</label><input type="text" value={editForm.nama} onChange={e => setEditForm({ ...editForm, nama: e.target.value })} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" /></div>
//               <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas</label><input type="text" value={editForm.kelas} onChange={e => setEditForm({ ...editForm, kelas: e.target.value })} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20" /></div>
//               <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label><textarea value={editForm.deskripsi || ""} onChange={e => setEditForm({ ...editForm, deskripsi: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none" rows={3} /></div>
//             </div>
//             <div className="flex gap-3 mt-6"><button onClick={() => setShowEditModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button><button onClick={handleEdit} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800">Simpan</button></div>
//           </div>
//         </div>
//       )}

//       {/* ══ MODAL: Delete Mapel ══ */}
//       {showDeleteModal && targetMapel && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0" onClick={() => { if (!deleteMapelLoading) { setShowDeleteModal(false); setDeleteMapelDetail(null); } }} />
//           <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
//             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trash2 className="w-6 h-6 text-red-600" /></div>
//             <h3 className="text-base font-bold text-zinc-900 text-center mb-1">Hapus Mata Pelajaran?</h3>
//             <p className="text-[13px] font-semibold text-zinc-800 text-center mb-4">"{targetMapel.nama}"</p>
//             {deleteMapelLoading ? <div className="flex flex-col items-center gap-2 py-4"><Loader2 className="w-5 h-5 animate-spin text-slate-400" /><p className="text-[11px] text-slate-400">Mengambil informasi data...</p></div>
//               : deleteMapelDetail ? (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
//                   <p className="text-[11px] font-bold text-red-700 mb-3 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Data yang akan ikut terhapus permanen:</p>
//                   <div className="space-y-2">
//                     {[{ label: "Ujian", val: deleteMapelDetail.totalUjian, icon: "📝" }, { label: "Ulangan Harian", val: deleteMapelDetail.totalUlangan, icon: "📋" }, { label: "Latihan", val: deleteMapelDetail.totalLatihan, icon: "💪" }, { label: "Kuis", val: deleteMapelDetail.totalKuis, icon: "⚡" }, { label: "Bank Soal", val: deleteMapelDetail.totalSoal, icon: "📚" }].map(item => (
//                       <div key={item.label} className="flex items-center justify-between">
//                         <span className="text-[12px] text-red-700 flex items-center gap-1.5"><span>{item.icon}</span> {item.label}</span>
//                         <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${item.val > 0 ? "bg-red-200 text-red-800" : "bg-slate-100 text-slate-400"}`}>{item.val} item</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-3 pt-3 border-t border-red-200"><p className="text-[10px] text-red-600 font-semibold text-center">⚠️ Tindakan ini tidak dapat dibatalkan!</p></div>
//                 </div>
//               ) : <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4"><p className="text-[12px] text-slate-500 text-center">Semua data terkait akan terhapus permanen.</p></div>}
//             <div className="flex gap-3">
//               <button onClick={() => { setShowDeleteModal(false); setDeleteMapelDetail(null); }} disabled={deleteMapelLoading} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50 disabled:opacity-40">Batal</button>
//               <button onClick={handleDelete} disabled={deleteMapelLoading} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700 disabled:opacity-40 flex items-center justify-center gap-2">
//                 {deleteMapelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Ya, Hapus Semua
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ══ MODAL: Detail Ujian ══ */}
//       {showDetailModal && selectedUjian && (
//         <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
//           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
//           <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
//             <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center"><ClipboardList className="w-4 h-4 text-zinc-600" /></div>
//                 <div><h3 className="text-[14px] font-bold text-zinc-900">Detail {TAB_LABELS[selectedUjian.tipe?.toLowerCase()] || "Ujian"}</h3><p className="text-[10px] text-slate-400">Informasi & Akses</p></div>
//               </div>
//               <button onClick={() => setShowDetailModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
//             </div>
//             <div className="p-5 space-y-4">
//               <div className="bg-slate-50 rounded-xl p-4 space-y-3">
//                 <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nama</p><p className="font-bold text-zinc-900 text-[14px]">{selectedUjian.nama}</p></div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {[{ icon: <Calendar className="w-3.5 h-3.5 text-slate-400" />, label: "Tanggal", val: selectedUjian.tanggalMulai ? new Date(selectedUjian.tanggalMulai).toLocaleDateString("id-ID") : "—" }, { icon: <Clock className="w-3.5 h-3.5 text-slate-400" />, label: "Durasi", val: `${selectedUjian.durasi} menit` }, { icon: <FileText className="w-3.5 h-3.5 text-slate-400" />, label: "Total Soal", val: `${selectedUjian.soalList?.length ?? selectedUjian.totalSoal} soal` }, { icon: <Users className="w-3.5 h-3.5 text-slate-400" />, label: "Peserta", val: selectedUjian.peserta }].map(it => (
//                     <div key={it.label} className="flex items-center gap-2">
//                       <div className="w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">{it.icon}</div>
//                       <div><p className="text-[9px] text-slate-400 font-semibold uppercase">{it.label}</p><p className="text-[12px] font-semibold text-zinc-700">{it.val}</p></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
//                 <div className="flex items-center gap-2 mb-2"><ExternalLink className="w-3.5 h-3.5 text-blue-500" /><p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Link Akses Siswa</p></div>
//                 <div className="flex items-center gap-2">
//                   <div className="flex-1 min-w-0 bg-white border border-blue-200 rounded-lg px-3 py-2"><p className="text-[11px] font-mono text-blue-700 truncate">{selectedUjian.linkSiswa}</p></div>
//                   <button onClick={() => copyToClipboard(selectedUjian.linkSiswa, "link")} className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedLink ? "bg-emerald-500 text-white" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}>
//                     {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedLink ? "Disalin!" : "Salin"}
//                   </button>
//                 </div>
//                 <a href={selectedUjian.linkPreview} target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"><ExternalLink className="w-3 h-3" /> Buka Preview Ujian</a>
//               </div>
//               <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
//                 <div className="flex items-center gap-2 mb-2"><Hash className="w-3.5 h-3.5 text-amber-500" /><p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Token Ujian</p></div>
//                 <div className="flex items-center gap-2">
//                   <div className="flex-1 min-w-0 bg-white border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
//                     <p className={`text-[13px] font-mono font-bold tracking-widest flex-1 ${showToken ? "text-amber-700" : "text-amber-200 select-none"}`}>{showToken ? selectedUjian.token : selectedUjian.token?.replace(/[A-Z0-9]/g, "•")}</p>
//                     <button onClick={() => setShowToken(!showToken)} className="text-amber-400 hover:text-amber-600">{showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
//                   </div>
//                   <button onClick={() => copyToClipboard(selectedUjian.token, "token")} className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedToken ? "bg-emerald-500 text-white" : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50"}`}>
//                     {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copiedToken ? "Disalin!" : "Salin"}
//                   </button>
//                 </div>
//                 <p className="text-[10px] text-amber-600 mt-2">⚠️ Bagikan token hanya kepada siswa yang berhak.</p>
//               </div>
//             </div>
//             <div className="p-5 pt-0"><button onClick={() => setShowDetailModal(false)} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup</button></div>
//           </div>
//         </div>
//       )}

//       {showContentModal && <AddContentModal activeTab={activeTab} onClose={() => setShowContentModal(false)} onSave={handleSaveContent} />}
//       {showKelolaSoal && selectedUjian && <KelolaSoalModal ujian={selectedUjian} onClose={() => { setShowKelolaSoal(false); setSelectedUjian(null); }} onUpdate={handleUpdateSoal} />}
//       {showEditUjianModal && targetUjian && <EditUjianModal ujian={targetUjian} onClose={() => { setShowEditUjianModal(false); setTargetUjian(null); }} onSave={handleEditUjian} />}
//       {showDeleteUjianModal && targetUjian && <DeleteUjianModal ujian={targetUjian} onClose={() => { setShowDeleteUjianModal(false); setTargetUjian(null); }} onDelete={handleDeleteUjian} />}
//       {showHasilModal && hasilUjianTarget && <HasilUjianModal ujian={hasilUjianTarget} onClose={() => { setShowHasilModal(false); setHasilUjianTarget(null); }} />}
//     </div>
//   );
// }










// ini sudah berhasil, tapi pecah gambar nya


"use client";
import { exportHasilUjianToExcel } from "@/lib/export-hasil-ujian";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { api, getToken } from "@/lib/api";
import {
  BookOpen, Plus, Search, Pencil, Trash2, Copy, ExternalLink,
  AlertCircle, Loader2, X, ArrowLeft, FileText, ClipboardList,
  Users, TrendingUp, BarChart2, CheckCircle, ChevronRight, Eye,
  EyeOff, Check, Hash, Clock, Calendar, Edit3, ImageIcon, Upload,
  Shuffle, ListOrdered, Save, Zap, Calculator, Dumbbell, Book, FileUp,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────
type MataPelajaran = {
  id: number; nama: string; kelas: string;
  deskripsi?: string; warna: string;
  totalSoal: number; totalUjian: number;
};
type Ujian = {
  id: string; nama: string; token: string; kelas: string;
  tipe: string; status: string; durasi: number;
  tanggalMulai?: string; totalSoal: number; peserta: string;
  linkSiswa: string; linkPreview: string;
  soalAcak?: boolean; soalList?: SoalItem[];
};
type SoalItem = {
  id: string; pertanyaan: string; tipe: "pg" | "essay";
  opsi: string[]; jawaban: string; topik: string; gambar?: string;
};
type DeleteMapelDetail = {
  totalUjian: number; totalUlangan: number;
  totalLatihan: number; totalKuis: number; totalSoal: number;
};
type HasilSiswa = {
  nisn: string; nama: string; kelas: string; nilai: number;
  benar: number; salah: number; lulus: boolean;
  pelanggaran: number; catatan: string[];
};
type HasilUjian = {
  ujian: { id: string; nama: string; durasi: string; totalSoal: number; kelas: string };
  summary: { rataRata: number; tertinggi: number; terendah: number; lulus: number; gagal: number; totalSiswa: number };
  siswa: HasilSiswa[];
  analisisSoal: {
    totalPeserta: number;
    data: {
      nomorSoal: number; jumlahBenar: number; jumlahSalah: number;
      kesukaran: number; kategori: string; reliabilitas: number | null;
    }[];
  };
};

// ─── Color System ─────────────────────────────────────────────────
const COLORS: Record<string, { bg: string; icon: string; dot: string; hex: string; border: string; light: string }> = {
  zinc:    { bg: "#f4f4f5", icon: "#18181b", dot: "#52525b", hex: "#18181b", border: "#d4d4d8", light: "#fafafa" },
  blue:    { bg: "#eff6ff", icon: "#2563eb", dot: "#3b82f6", hex: "#3b82f6", border: "#bfdbfe", light: "#eff6ff" },
  violet:  { bg: "#f5f3ff", icon: "#7c3aed", dot: "#8b5cf6", hex: "#8b5cf6", border: "#ddd6fe", light: "#f5f3ff" },
  emerald: { bg: "#ecfdf5", icon: "#059669", dot: "#10b981", hex: "#10b981", border: "#a7f3d0", light: "#ecfdf5" },
  amber:   { bg: "#fffbeb", icon: "#d97706", dot: "#f59e0b", hex: "#f59e0b", border: "#fde68a", light: "#fffbeb" },
  red:     { bg: "#fef2f2", icon: "#dc2626", dot: "#ef4444", hex: "#ef4444", border: "#fecaca", light: "#fef2f2" },
  cyan:    { bg: "#ecfeff", icon: "#0891b2", dot: "#06b6d4", hex: "#06b6d4", border: "#a5f3fc", light: "#ecfeff" },
  pink:    { bg: "#fdf2f8", icon: "#be185d", dot: "#ec4899", hex: "#ec4899", border: "#fbcfe8", light: "#fdf2f8" },
};

const TAB_LABELS: Record<string, string> = {
  ujian: "Ujian", ulangan: "Ulangan", latihan: "Latihan",
  kuis: "Kuis", soal: "Bank Soal", nilai: "Nilai Akhir",
};

// ─── Draft helpers ────────────────────────────────────────────────
const DRAFT_KEY = (tab: string) => `admin_add_content_draft_${tab}`;
interface DraftData {
  step: 1 | 2; nama: string; tanggal: string; durasi: string;
  soalAcak: boolean; soalList: SoalItem[]; soalPertanyaan: string;
  soalTipe: "pg" | "essay"; soalTopik: string; soalOpsi: string[];
  soalJawaban: string; soalGambar?: string; editingId: string | null;
}
function saveDraft(tab: string, data: DraftData) {
  try { sessionStorage.setItem(DRAFT_KEY(tab), JSON.stringify(data)); } catch (_) {}
}
function loadDraft(tab: string): DraftData | null {
  try { const raw = sessionStorage.getItem(DRAFT_KEY(tab)); return raw ? JSON.parse(raw) : null; } catch (_) { return null; }
}
function clearDraft(tab: string) {
  try { sessionStorage.removeItem(DRAFT_KEY(tab)); } catch (_) {}
}

// ══════════════════════════════════════════════════════════════════
// ─── PDF & AI HELPER FUNCTIONS ────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

// ─── Load pdf.js dari CDN ─────────────────────────────────────────
function loadPdfJs(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).pdfjsLib) { resolve((window as any).pdfjsLib); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      const lib = (window as any).pdfjsLib;
      if (lib) {
        lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(lib);
      } else reject(new Error("Gagal memuat pdf.js"));
    };
    script.onerror = () => reject(new Error("Gagal memuat library PDF"));
    document.head.appendChild(script);
  });
}

// ─── Render satu halaman PDF → base64 JPEG ───────────────────────
async function renderPdfPageToBase64(pdf: any, pageNum: number, scale = 2.0): Promise<string> {
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext("2d")!;
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
}

// ─── Crop area dari base64 image menggunakan bounding box % ───────
async function cropImageFromBase64(
  fullBase64: string,
  bbox: { x: number; y: number; w: number; h: number }
): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth: iw, naturalHeight: ih } = img;
      const x = Math.max(0, (bbox.x / 100) * iw);
      const y = Math.max(0, (bbox.y / 100) * ih);
      const w = Math.min(iw - x, (bbox.w / 100) * iw);
      const h = Math.min(ih - y, (bbox.h / 100) * ih);
      if (w < 20 || h < 20) { resolve(null); return; }
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.9).split(",")[1]);
    };
    img.onerror = () => resolve(null);
    img.src = `data:image/jpeg;base64,${fullBase64}`;
  });
}

// ─── Upload base64 image ke Cloudinary via backend ────────────────
async function uploadBase64ToCloudinary(base64: string, jwtToken: string, apiUrl: string): Promise<string | null> {
  try {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const blob = new Blob([ab], { type: "image/jpeg" });
    const file = new File([blob], `soal-gambar-${Date.now()}.jpg`, { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${apiUrl}/upload/image`, {
      method: "POST",
      headers: { Authorization: `Bearer ${jwtToken}` },
      body: formData,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url || null;
  } catch { return null; }
}

// ─── Parse PDF dengan Vision AI (teks + gambar sekaligus) ─────────
async function parsePdfWithVision(
  file: File,
  backendApiUrl: string,
  jwtToken: string,
  onProgress: (msg: string) => void
): Promise<SoalItem[]> {
  // 1. Load pdf.js
  onProgress("Memuat library PDF...");
  const pdfjsLib = await loadPdfJs();

  // 2. Baca file
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const totalPages = pdf.numPages;
  onProgress(`PDF terdeteksi: ${totalPages} halaman. Merender...`);

  // 3. Render setiap halaman → base64 JPEG
  const pageImages: string[] = [];
  for (let i = 1; i <= totalPages; i++) {
    onProgress(`Merender halaman ${i} dari ${totalPages}...`);
    const b64 = await renderPdfPageToBase64(pdf, i, 2.0);
    pageImages.push(b64);
  }

  // 4. Kirim semua halaman ke endpoint backend; API key pengguna tidak pernah ke browser.
  onProgress("AI Vision sedang membaca soal dan mendeteksi gambar...");

  const { questions: parsed } = await api.post<{ questions: any[] }>("/ai/parse-soal", {
    type: "vision",
    images: pageImages,
  });

  // 5. Untuk soal yang punya gambar → crop → upload Cloudinary
  const soalItems: SoalItem[] = [];
  let gambarCount = 0;

  for (let qi = 0; qi < parsed.length; qi++) {
    const q = parsed[qi];
    let gambarUrl: string | undefined = undefined;

    if (
      q.hasGambar &&
      q.gambarPageIndex >= 0 &&
      q.gambarPageIndex < pageImages.length &&
      q.gambarBoundingBox
    ) {
      gambarCount++;
      onProgress(`Mengekstrak & mengupload gambar soal ${q.no} (${gambarCount} gambar)...`);
      try {
        const croppedBase64 = await cropImageFromBase64(pageImages[q.gambarPageIndex], q.gambarBoundingBox);
        if (croppedBase64) {
          const uploadedUrl = await uploadBase64ToCloudinary(croppedBase64, jwtToken, backendApiUrl);
          if (uploadedUrl) gambarUrl = uploadedUrl;
        }
      } catch (err) {
        console.warn(`Gagal ekstrak gambar soal ${q.no}:`, err);
      }
    }

    soalItems.push({
      id: `import_${Date.now()}_${qi}`,
      pertanyaan: q.pertanyaan || "",
      tipe: q.tipe === "essay" ? "essay" : "pg",
      opsi: Array.isArray(q.opsi) ? q.opsi.filter(Boolean) : [],
      jawaban: q.tipe === "essay" ? q.jawaban?.trim() || "" : q.jawaban?.trim().toUpperCase() || "",
      topik: q.topik || "",
      gambar: gambarUrl,
    });
  }

  return soalItems;
}

// ─── Baca DOCX sebagai teks ───────────────────────────────────────
async function readDocxAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const decoder = new TextDecoder("utf-8", { fatal: false });
        const raw = decoder.decode(uint8Array);
        const xmlMatches = raw.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
        let text = xmlMatches.map(m => m.replace(/<[^>]+>/g, "")).join(" ").replace(/\s+/g, " ").trim();
        if (text.length < 50) {
          const allText = raw.match(/[A-Za-z0-9\u00C0-\u024F\u4e00-\u9fff\s\.\?\!\,\;\:\(\)\-\"\'\/\\%]+/g) || [];
          text = allText.filter(t => t.trim().length > 3).join(" ");
        }
        if (!text.trim()) throw new Error("Tidak ada teks yang bisa dibaca dari file DOCX.");
        resolve(text.replace(/×/g,"*").replace(/−/g,"-").replace(/\s{2,}/g," ").trim());
      } catch (err) { reject(err); }
    };
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsArrayBuffer(file);
  });
}

// ─── Baca TXT ─────────────────────────────────────────────────────
async function readTxtAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string).replace(/×/g,"*").replace(/−/g,"-").replace(/\s{2,}/g," ").trim());
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsText(file, "utf-8");
  });
}

// ─── Parse soal dari teks (DOCX/TXT) dengan AI teks ──────────────
async function parseQuestionsWithAI(text: string): Promise<SoalItem[]> {
  const { questions: parsed } = await api.post<{ questions: any[] }>("/ai/parse-soal", {
    type: "text",
    text,
  });
  return parsed.map((q, i) => ({
    id: `import_${Date.now()}_${i}`,
    pertanyaan: q.pertanyaan || q.question || "",
    tipe: (q.tipe === "essay" ? "essay" : "pg") as "pg" | "essay",
    opsi: Array.isArray(q.opsi) ? q.opsi.filter(Boolean) : [],
    jawaban: q.tipe === "essay" ? q.jawaban?.trim() || "" : q.jawaban?.trim().toUpperCase() || "",
    topik: q.topik || "",
  }));
}

// ══════════════════════════════════════════════════════════════════
// ─── KOMPONEN UI ──────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

// ─── ImportSoalModal (VERSI BARU dengan dukungan gambar PDF) ──────
function ImportSoalModal({ onClose, onImport }: { onClose: () => void; onImport: (soalList: SoalItem[]) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "reading" | "parsing" | "preview" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState<SoalItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!["pdf","docx","txt"].includes(ext || "")) {
      setErrorMsg("Hanya file .pdf, .docx, atau .txt yang didukung.");
      setStatus("error"); return;
    }
    setFile(f); setStatus("idle"); setErrorMsg(""); setPreview([]);
  }

  async function handleParse() {
    if (!file) return;
    setStatus("reading"); setErrorMsg(""); setProgress("");
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      let soalList: SoalItem[] = [];

      if (ext === "pdf") {
        // ── PDF: Vision AI — baca teks + deteksi gambar sekaligus ──
        soalList = await parsePdfWithVision(
          file,
          process.env.NEXT_PUBLIC_API_URL || "",
          getToken() || "",
          (msg) => { setProgress(msg); }
        );
      } else {
        // ── DOCX / TXT: ekstrak teks biasa ──
        let text = "";
        if (ext === "txt") { setProgress("Membaca file teks..."); text = await readTxtAsText(file); }
        else { setProgress("Membaca file DOCX..."); text = await readDocxAsText(file); }
        if (!text.trim()) throw new Error("Tidak ada teks yang bisa dibaca dari file.");
        setStatus("parsing"); setProgress("AI sedang menganalisis soal...");
        soalList = await parseQuestionsWithAI(text);
      }

      if (!soalList.length) throw new Error("Tidak ada soal yang berhasil diparse. Pastikan format soal sesuai.");
      setPreview(soalList);
      setSelected(new Set(soalList.map(s => s.id)));
      setStatus("preview");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
      setStatus("error");
    }
  }

  function toggleSelect(id: string) {
    setSelected(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }

  function handleImport() { onImport(preview.filter(s => selected.has(s.id))); onClose(); }

  const isPdf = file?.name.toLowerCase().endsWith(".pdf");
  const gambarCount = preview.filter(s => s.gambar).length;

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-50 border border-violet-200 rounded-xl flex items-center justify-center">
              <FileUp className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">Import Soal</h3>
              <p className="text-[11px] text-slate-400">PDF mendukung ekstraksi gambar otomatis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Upload area */}
          {status !== "preview" && (
            <div>
              <button type="button" onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center gap-3 hover:bg-slate-50 hover:border-violet-300 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-violet-50 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                  <FileUp className="w-5 h-5 text-violet-500" />
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-semibold text-zinc-700">{file ? file.name : "Klik untuk upload file soal"}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {file ? `${(file.size/1024).toFixed(1)} KB · ${file.name.split(".").pop()?.toUpperCase()}` : "Format: .pdf, .docx, atau .txt"}
                  </p>
                </div>
              </button>
              <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileChange} />
            </div>
          )}

          {/* Format info */}
          {status === "idle" && !file && (
            <>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { ext: "PDF", color: "bg-red-50 text-red-600 border-red-200", desc: "Teks + gambar otomatis 🖼️" },
                  { ext: "DOCX", color: "bg-blue-50 text-blue-600 border-blue-200", desc: "Word Document" },
                  { ext: "TXT", color: "bg-slate-50 text-slate-600 border-slate-200", desc: "Plain Text" },
                ].map(f => (
                  <span key={f.ext} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold ${f.color}`}>
                    <FileText className="w-3 h-3" /> {f.ext}
                    <span className="font-normal opacity-70">· {f.desc}</span>
                  </span>
                ))}
              </div>
              <div className="p-3 bg-violet-50 border border-violet-100 rounded-xl flex items-start gap-2">
                <span className="text-violet-500 mt-0.5 flex-shrink-0 text-base">🖼️</span>
                <div className="text-[11px] text-violet-700 space-y-1">
                  <p className="font-semibold">PDF: Gambar dalam soal terdeteksi & diupload otomatis!</p>
                  <p>Jika soal di PDF ada gambar/ilustrasi/diagram, AI Vision akan mendeteksinya dan mengupload ke Server secara otomatis tanpa perlu input manual.</p>
                </div>
              </div>
            </>
          )}

          {/* Info PDF dipilih */}
          {status === "idle" && file && isPdf && (
            <div className="p-3 bg-violet-50 border border-violet-100 rounded-xl flex items-start gap-2">
              <span className="text-violet-500 mt-0.5 flex-shrink-0 text-base">🖼️</span>
              <div className="text-[11px] text-violet-700 space-y-1">
                <p className="font-semibold">Mode Vision AI aktif untuk PDF ini</p>
                <p>AI akan membaca setiap halaman dan mendeteksi gambar di soal secara otomatis. Proses: 30–90 detik tergantung jumlah halaman.</p>
              </div>
            </div>
          )}

          {/* Info DOCX/TXT dipilih */}
          {status === "idle" && file && !isPdf && (
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-[11px] text-blue-700 space-y-1">
                <p className="font-semibold">Tips format soal DOCX/TXT:</p>
                <p>• Nomor soal: <strong>1.</strong> atau <strong>1)</strong></p>
                <p>• Opsi: <strong>a.</strong> <strong>b.</strong> dst (hingga e)</p>
                <p>• Kunci jawaban: <strong>Jawaban: B</strong> atau <strong>Kunci: C</strong></p>
              </div>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-[12px] text-red-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMsg}
            </div>
          )}

          {/* Loading */}
          {(status === "reading" || status === "parsing") && (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="w-10 h-10 animate-spin text-violet-500" />
              <div className="text-center space-y-1">
                <p className="text-[13px] font-bold text-zinc-800">
                  {isPdf ? "AI Vision sedang memproses PDF..." : "AI sedang menganalisis soal..."}
                </p>
                {progress && (
                  <div className="mt-2 bg-violet-50 border border-violet-100 rounded-xl px-4 py-2.5 max-w-xs mx-auto">
                    <p className="text-[11px] text-violet-700 font-medium text-center">{progress}</p>
                  </div>
                )}
                <p className="text-[11px] text-slate-400 mt-2">
                  {isPdf ? "Merender halaman → Mendeteksi gambar → Upload Server" : "Proses 10–30 detik"}
                </p>
              </div>
            </div>
          )}

          {/* Preview hasil */}
          {status === "preview" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-[13px] font-bold text-zinc-900">{preview.length} soal berhasil diparse</p>
                  {gambarCount > 0 && (
                    <p className="text-[11px] text-violet-600 font-semibold mt-0.5">
                      🖼️ {gambarCount} soal memiliki gambar (sudah diupload ke Cloudinary)
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelected(new Set(preview.map(s=>s.id)))} className="text-[11px] font-semibold text-emerald-600 hover:underline">Pilih semua</button>
                  <span className="text-slate-300">·</span>
                  <button onClick={() => setSelected(new Set())} className="text-[11px] font-semibold text-red-500 hover:underline">Hapus semua</button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-[14px] overflow-hidden divide-y divide-slate-50">
                {preview.map((s, i) => (
                  <div key={s.id} onClick={() => toggleSelect(s.id)}
                    className={`px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors ${selected.has(s.id) ? "bg-violet-50/50" : "hover:bg-slate-50"}`}>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${selected.has(s.id) ? "bg-violet-600 border-violet-600" : "border-slate-300"}`}>
                      {selected.has(s.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-zinc-900">
                        <span className="text-slate-400 mr-1">{i+1}.</span>{s.pertanyaan}
                      </p>

                      {/* Preview gambar jika ada */}
                      {s.gambar && (
                        <div className="mt-2 mb-1">
                          <img src={s.gambar} alt="Gambar soal"
                            className="h-20 rounded-lg border border-violet-200 object-contain bg-slate-50"
                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded-full">
                            🖼️ Gambar terdeteksi & diupload
                          </span>
                        </div>
                      )}

                      {s.tipe === "pg" && s.opsi.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {s.opsi.map((o, oi) => (
                            <span key={oi} className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${s.jawaban === String.fromCharCode(65+oi) ? "bg-emerald-100 text-emerald-700 font-bold" : "bg-slate-100 text-slate-600"}`}>
                              {String.fromCharCode(65+oi)}. {o}
                            </span>
                          ))}
                        </div>
                      )}
                      {s.jawaban && <p className="text-[10px] text-emerald-600 mt-1 font-semibold">✓ {s.jawaban}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => { setFile(null); setPreview([]); setStatus("idle"); }}
                className="text-[11px] font-semibold text-slate-500 hover:text-zinc-700 underline">
                ← Upload file lain
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 shrink-0 flex gap-3">
          <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Batal</button>
          {status === "idle" && file && (
            <button onClick={handleParse}
              className="flex-1 h-10 bg-violet-600 text-white rounded-xl text-[13px] font-bold hover:bg-violet-700 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              {isPdf ? "Parse PDF + Ekstrak Gambar" : "Parse dengan AI"}
            </button>
          )}
          {status === "preview" && (
            <button onClick={handleImport} disabled={selected.size === 0}
              className="flex-1 h-10 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 flex items-center justify-center gap-2 disabled:opacity-40">
              <Plus className="w-4 h-4" /> Tambahkan {selected.size} Soal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SoalImageUpload ──────────────────────────────────────────────
function SoalImageUpload({ value, onChange }: { value?: string; onChange: (v?: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg","image/png","image/webp","image/gif"];
    if (!allowedTypes.includes(file.type)) { setUploadError("Format tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF."); return; }
    if (file.size > 5*1024*1024) { setUploadError("Ukuran file terlalu besar. Maksimal 5MB."); return; }
    setUploadError(""); setUploading(true);
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload gagal");
      onChange(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Gambar Soal <span className="text-slate-400 font-normal">(opsional)</span></label>
      {uploadError && (
        <div className="mb-2 p-2 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-[11px] text-red-600">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {uploadError}
        </div>
      )}
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <img src={value} alt="" className="w-full max-h-48 object-contain" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              className="h-8 px-3 bg-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 shadow">
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {uploading ? "Mengupload..." : "Ganti"}
            </button>
            <button type="button" onClick={() => onChange(undefined)} disabled={uploading}
              className="h-8 px-3 bg-red-500 rounded-lg text-[11px] font-semibold text-white flex items-center gap-1.5 shadow">
              <Trash2 className="w-3.5 h-3.5" /> Hapus
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all group disabled:opacity-60">
          <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
            {uploading ? <Loader2 className="w-4 h-4 text-slate-400 animate-spin" /> : <ImageIcon className="w-4 h-4 text-slate-400" />}
          </div>
          <div className="text-center">
            <p className="text-[12px] font-semibold text-slate-500">{uploading ? "Mengupload ke Cloudinary..." : "Klik untuk upload gambar"}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, GIF · Maks 5MB</p>
          </div>
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFile} />
    </div>
  );
}

function isSoalLiveValid(pertanyaan: string) { return pertanyaan.trim().length > 0; }
const DEFAULT_OPSI = ["","","","",""];

// ─── KkmField ─────────────────────────────────────────────────────
function KkmField({ kkm, setKkm }: { kkm: number; setKkm: (v: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [tempVal, setTempVal] = useState(String(kkm));
  const inputRef = useRef<HTMLInputElement>(null);
  function commit() { const p = parseInt(tempVal); if (!isNaN(p) && p > 0 && p <= 100) setKkm(p); setEditing(false); }
  return (
    <div className="flex items-center gap-2">
      <label className="text-[12px] font-semibold text-slate-600">KKM:</label>
      {editing ? (
        <input ref={inputRef} type="number" value={tempVal} onChange={e=>setTempVal(e.target.value)} onBlur={commit}
          onKeyDown={e=>{if(e.key==="Enter")commit();if(e.key==="Escape")setEditing(false);}} autoFocus
          className="w-16 h-9 text-center border-[1.5px] border-zinc-900 rounded-lg text-[13px] font-semibold text-zinc-900 bg-white outline-none focus:ring-2 focus:ring-zinc-900/20" />
      ) : (
        <button onDoubleClick={()=>{setTempVal(String(kkm));setEditing(true);setTimeout(()=>inputRef.current?.select(),0);}} title="Klik 2x untuk ubah KKM"
          className="w-16 h-9 text-center border-[1.5px] border-slate-200 rounded-lg text-[13px] font-semibold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none">
          {kkm}
        </button>
      )}
      {!editing && <span className="text-[10px] text-slate-400 hidden sm:inline">klik 2x untuk ubah</span>}
    </div>
  );
}

// ─── KkmInline ────────────────────────────────────────────────────
function KkmInline({ kkmModal, setKkmModal }: { kkmModal: number; setKkmModal: (v: number) => void }) {
  const [editingKkm, setEditingKkm] = useState(false);
  const [tempKkm, setTempKkm] = useState(String(kkmModal));
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (!editingKkm) setTempKkm(String(kkmModal)); }, [kkmModal, editingKkm]);
  function commit() { const v = parseInt(tempKkm); if (!isNaN(v) && v > 0 && v <= 100) setKkmModal(v); setEditingKkm(false); }
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-slate-400">KKM:</span>
      {editingKkm ? (
        <input ref={ref} type="number" value={tempKkm} autoFocus onChange={e=>setTempKkm(e.target.value)} onBlur={commit}
          onKeyDown={e=>{if(e.key==="Enter")commit();if(e.key==="Escape")setEditingKkm(false);}}
          className="w-14 h-6 text-center border-[1.5px] border-zinc-900 rounded-md text-[11px] font-bold text-zinc-900 bg-white outline-none" />
      ) : (
        <button onDoubleClick={()=>{setTempKkm(String(kkmModal));setEditingKkm(true);setTimeout(()=>ref.current?.select(),0);}} title="Klik 2x untuk ubah KKM"
          className="min-w-[2rem] h-6 px-2 border-[1.5px] border-slate-200 rounded-md text-[11px] font-bold text-zinc-900 bg-slate-50 hover:border-zinc-400 hover:bg-white transition-colors cursor-pointer select-none">
          {kkmModal}
        </button>
      )}
      {!editingKkm && <span className="text-[10px] text-slate-300 hidden sm:inline">klik 2×</span>}
    </div>
  );
}

// ─── HasilUjianModal ──────────────────────────────────────────────
function HasilUjianModal({ ujian, onClose }: { ujian: Ujian; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HasilUjian | null>(null);
  const [error, setError] = useState("");
  const [kkmModal, setKkmModal] = useState<number>(() => { try { const s = sessionStorage.getItem(`kkm_hasil_${ujian.id}`); return s ? parseInt(s) : 70; } catch { return 70; } });
  useEffect(() => { try { sessionStorage.setItem(`kkm_hasil_${ujian.id}`, String(kkmModal)); } catch(_) {} }, [kkmModal, ujian.id]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("nama");
  const [dir, setDir] = useState<"asc"|"desc">("asc");
  const [selectedNisn, setSelectedNisn] = useState<string|null>(null);
  const [detailData, setDetailData] = useState<any|null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    async function fetchHasil() {
      setLoading(true);
      try { const res = await api.get<HasilUjian>(`/ujian/${ujian.id}/laporan`); setData(res as HasilUjian); }
      catch { setError("Gagal memuat data hasil ujian"); }
      finally { setLoading(false); }
    }
    fetchHasil();
  }, [ujian.id]);

  const siswaWithKkm = useMemo(() => { if (!data) return []; return data.siswa.map(s=>({...s, lulus: s.nilai >= kkmModal})); }, [data, kkmModal]);
  const recomputedSummary = useMemo(() => { if (!data) return null; return {...data.summary, lulus: siswaWithKkm.filter(s=>s.lulus).length, gagal: siswaWithKkm.filter(s=>!s.lulus).length}; }, [data, siswaWithKkm]);
  const filteredSiswa = useMemo(() => {
    let list = [...siswaWithKkm];
    if (filter==="lulus") list=list.filter(s=>s.lulus);
    else if (filter==="gagal") list=list.filter(s=>!s.lulus);
    else if (filter==="viol") list=list.filter(s=>s.pelanggaran>0);
    list.sort((a,b)=>{const va=(a as any)[sort],vb=(b as any)[sort];if(typeof va==="string")return dir==="asc"?va.localeCompare(vb):vb.localeCompare(va);return dir==="asc"?va-vb:vb-va;});
    return list;
  }, [siswaWithKkm, filter, sort, dir]);

  async function fetchDetailSiswa(nisn: string) {
    setDetailLoading(true); setSelectedNisn(nisn);
    try { const res = await api.get(`/ujian/${ujian.id}/laporan/siswa/${nisn}`); setDetailData(res); }
    catch { setDetailData(null); }
    finally { setDetailLoading(false); }
  }
  function toggleSort(key: string) { if (sort===key) setDir(d=>d==="asc"?"desc":"asc"); else { setSort(key); setDir("asc"); } }
  const SortIcon = ({ col }: { col: string }) => <span className={`ml-0.5 text-[9px] ${sort===col?"text-zinc-900":"text-slate-300"}`}>{sort===col?(dir==="asc"?"↑":"↓"):"↕"}</span>;
  async function handleExport() { if (!data || !recomputedSummary) return; await exportHasilUjianToExcel({...data, siswa: siswaWithKkm, summary: recomputedSummary}, ujian.nama); }

  return (
    <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-4xl shadow-2xl z-10 max-h-[95vh] flex flex-col">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div><h3 className="text-base font-bold text-zinc-900">Hasil Ujian</h3><p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p></div>
          <div className="flex items-center gap-2">
            {data && !selectedNisn && (
              <button onClick={handleExport} className="inline-flex items-center gap-1.5 h-8 px-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-semibold hover:bg-emerald-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export Excel
              </button>
            )}
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {selectedNisn && (
            <div className="border-b border-slate-100 bg-slate-50">
              <div className="p-4 flex items-center gap-2">
                <button onClick={()=>{setSelectedNisn(null);setDetailData(null);}} className="p-1.5 rounded-lg hover:bg-white border border-slate-200 text-slate-500"><ArrowLeft className="w-3.5 h-3.5" /></button>
                <p className="text-[13px] font-bold text-zinc-900">Detail Jawaban Siswa</p>
              </div>
              {detailLoading ? (
                <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-slate-400" /></div>
              ) : detailData ? (
                <div className="px-4 pb-4 space-y-3">
                  <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap gap-4">
                    {[{label:"Nama",val:detailData.siswa?.nama},{label:"NISN",val:detailData.siswa?.nisn},{label:"Kelas",val:detailData.siswa?.kelas}].map(item=>(
                      <div key={item.label}><p className="text-[10px] text-slate-400 font-semibold uppercase">{item.label}</p><p className="text-[13px] font-bold text-zinc-900">{item.val}</p></div>
                    ))}
                    <div><p className="text-[10px] text-slate-400 font-semibold uppercase">Nilai</p><p className={`text-[18px] font-black ${(detailData.siswa?.nilai??0)>=kkmModal?"text-emerald-600":"text-red-600"}`}>{detailData.siswa?.nilai}</p></div>
                    <div><p className="text-[10px] text-slate-400 font-semibold uppercase">Status</p>{(detailData.siswa?.nilai??0)>=kkmModal?<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>:<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>}</div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50"><p className="text-[12px] font-bold text-zinc-900">Rincian Jawaban</p></div>
                    <div className="divide-y divide-slate-50">
                      {(detailData.jawaban||[]).map((j:any)=>(
                        <div key={j.nomorSoal} className={`px-4 py-3 flex items-start gap-3 ${j.isBenar?"bg-emerald-50/30":"bg-red-50/30"}`}>
                          <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${j.isBenar?"bg-emerald-100 text-emerald-700":"bg-red-100 text-red-700"}`}>{j.nomorSoal}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-zinc-800 mb-1">{j.pertanyaan}</p>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="text-[11px] text-slate-500">Jawaban: <strong className={j.isBenar?"text-emerald-600":"text-red-500"}>{j.jawabanSiswa??"—"}</strong></span>
                              {!j.isBenar && <span className="text-[11px] text-slate-500">Benar: <strong className="text-emerald-600">{j.jawabanBenar}</strong></span>}
                              {j.isRagu && <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">⚑ Ragu</span>}
                            </div>
                          </div>
                          <div className="flex-shrink-0">{j.isBenar?<CheckCircle className="w-4 h-4 text-emerald-500"/>:<AlertCircle className="w-4 h-4 text-red-400"/>}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : <div className="px-4 pb-4 text-center py-6 text-[12px] text-slate-400">Gagal memuat detail</div>}
            </div>
          )}
          {!selectedNisn && (
            <div className="p-5 space-y-4">
              {error && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[12px] text-red-600 flex items-center gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0"/>{error}</div>}
              {loading ? (
                <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400"/></div>
              ) : data && recomputedSummary ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[{label:"Total Peserta",val:recomputedSummary.totalSiswa,color:"#18181b",icon:<Users className="w-3.5 h-3.5"/>},{label:"Rata-rata Nilai",val:recomputedSummary.rataRata,color:"#2563eb",icon:<BarChart2 className="w-3.5 h-3.5"/>},{label:"Tertinggi",val:recomputedSummary.tertinggi,color:"#059669",icon:<TrendingUp className="w-3.5 h-3.5"/>},{label:"Terendah",val:recomputedSummary.terendah,color:"#dc2626",icon:<TrendingUp className="w-3.5 h-3.5 rotate-180"/>},{label:"Lulus",val:recomputedSummary.lulus,color:"#059669",icon:<CheckCircle className="w-3.5 h-3.5"/>},{label:"Tidak Lulus",val:recomputedSummary.gagal,color:"#dc2626",icon:<AlertCircle className="w-3.5 h-3.5"/>}].map(s=>(
                      <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:s.color+"18",color:s.color}}>{s.icon}</div>
                        <div><p className="text-lg font-bold text-zinc-900">{s.val}</p><p className="text-[10px] text-slate-400">{s.label}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {[{val:"all",label:"Semua"},{val:"lulus",label:"Lulus"},{val:"gagal",label:"Tidak Lulus"},{val:"viol",label:"Ada Pelanggaran"}].map(f=>(
                        <button key={f.val} onClick={()=>setFilter(f.val)} className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${filter===f.val?"bg-zinc-900 text-white":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                          {f.label}{f.val!=="all"&&<span className="ml-1.5 opacity-60">({f.val==="lulus"?recomputedSummary.lulus:f.val==="gagal"?recomputedSummary.gagal:siswaWithKkm.filter(s=>s.pelanggaran>0).length})</span>}
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{filteredSiswa.length} ditampilkan</span>
                  </div>
                  {filteredSiswa.length===0 ? (
                    <div className="text-center py-12"><Users className="w-8 h-8 text-slate-200 mx-auto mb-2"/><p className="text-[13px] text-slate-400">{filter==="all"?"Belum ada peserta yang menyelesaikan ujian ini":"Tidak ada siswa yang sesuai filter ini"}</p></div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full" style={{minWidth:"600px"}}>
                          <thead className="border-b border-slate-100 bg-slate-50/50">
                            <tr>
                              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
                              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700" onClick={()=>toggleSort("nama")}>Nama <SortIcon col="nama"/></th>
                              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Kelas</th>
                              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700" onClick={()=>toggleSort("nilai")}>Nilai <SortIcon col="nilai"/></th>
                              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell" onClick={()=>toggleSort("benar")}>Benar <SortIcon col="benar"/></th>
                              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden md:table-cell" onClick={()=>toggleSort("salah")}>Salah <SortIcon col="salah"/></th>
                              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
                              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-zinc-700 hidden sm:table-cell" onClick={()=>toggleSort("pelanggaran")}>Pelang. <SortIcon col="pelanggaran"/></th>
                              <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Detail</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {filteredSiswa.map((s,i)=>{
                              const nilaiColor=s.nilai>=90?"#059669":s.nilai>=80?"#10b981":s.nilai>=70?"#2563eb":"#dc2626";
                              return (
                                <tr key={s.nisn} className="hover:bg-slate-50/50">
                                  <td className="px-4 py-3 text-[11px] text-slate-400 font-semibold">{i+1}</td>
                                  <td className="px-4 py-3"><p className="font-semibold text-zinc-900 text-[12px]">{s.nama}</p><p className="text-[10px] text-slate-400">{s.nisn}</p></td>
                                  <td className="px-4 py-3 text-[12px] text-slate-500 hidden sm:table-cell">{s.kelas}</td>
                                  <td className="px-4 py-3"><span className="text-[15px] font-black" style={{color:nilaiColor}}>{s.nilai}</span></td>
                                  <td className="px-4 py-3 hidden md:table-cell"><span className="text-[12px] font-semibold text-emerald-600">{s.benar}</span></td>
                                  <td className="px-4 py-3 hidden md:table-cell"><span className="text-[12px] font-semibold text-red-500">{s.salah}</span></td>
                                  <td className="px-4 py-3">{s.lulus?<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>:<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">GAGAL</span>}</td>
                                  <td className="px-4 py-3 hidden sm:table-cell">{s.pelanggaran>0?<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">{s.pelanggaran}x</span>:<span className="text-[11px] text-slate-300">—</span>}</td>
                                  <td className="px-4 py-3 text-right"><button onClick={()=>fetchDetailSiswa(s.nisn)} className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors">Lihat</button></td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">{filteredSiswa.length} peserta</span>
                        <KkmInline kkmModal={kkmModal} setKkmModal={setKkmModal}/>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          )}
        </div>
        <div className="p-5 border-t border-slate-100 shrink-0">
          <button onClick={onClose} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup</button>
        </div>
      </div>
    </div>
  );
}

// ─── SoalForm ─────────────────────────────────────────────────────
function SoalForm({
  soalPertanyaan, setSoalPertanyaan, soalTipe, setSoalTipe,
  soalTopik, setSoalTopik, soalOpsi, setSoalOpsi,
  soalJawaban, setSoalJawaban, soalGambar, setSoalGambar,
  editingId, soalListLength, soalList, onAdd, onCancelEdit, radioName,
}: {
  soalPertanyaan: string; setSoalPertanyaan: (v: string) => void;
  soalTipe: "pg"|"essay"; setSoalTipe: (v: "pg"|"essay") => void;
  soalTopik: string; setSoalTopik: (v: string) => void;
  soalOpsi: string[]; setSoalOpsi: (v: string[]) => void;
  soalJawaban: string; setSoalJawaban: (v: string) => void;
  soalGambar?: string; setSoalGambar: (v?: string) => void;
  editingId: string|null; soalListLength: number; soalList: SoalItem[];
  onAdd: () => void; onCancelEdit: () => void; radioName: string;
}) {
  const liveIsValid = isSoalLiveValid(soalPertanyaan);
  return (
    <div className={`border rounded-[14px] p-4 space-y-3 ${editingId?"border-amber-200 bg-amber-50/50":liveIsValid?"border-emerald-200 bg-emerald-50/30":"border-slate-200 bg-slate-50/50"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-zinc-900 text-[13px]">
            {editingId ? `✏️ Edit Soal #${soalList.findIndex(s=>s.id===editingId)+1}` : `Soal #${soalListLength+1}`}
          </h4>
          {liveIsValid && !editingId && <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full"><Check className="w-2.5 h-2.5"/>Akan disimpan</span>}
        </div>
        {editingId && <button onClick={onCancelEdit} className="text-[11px] text-slate-500 hover:text-zinc-900 underline">Batal edit</button>}
      </div>
      <div>
        <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Pertanyaan <span className="text-red-500">*</span></label>
        <textarea value={soalPertanyaan} onChange={e=>setSoalPertanyaan(e.target.value)} rows={2} placeholder="Tuliskan pertanyaan soal di sini..."
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white"/>
      </div>
      <SoalImageUpload value={soalGambar} onChange={setSoalGambar}/>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Tipe Soal</label>
          <select value={soalTipe} onChange={e=>setSoalTipe(e.target.value as "pg"|"essay")} className="w-full h-9 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-700 focus:outline-none bg-white">
            <option value="pg">Pilihan Ganda</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Topik</label>
          <input type="text" value={soalTopik} onChange={e=>setSoalTopik(e.target.value)} placeholder="e.g. Limit Fungsi"
            className="w-full h-9 px-3 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white"/>
        </div>
      </div>
      {soalTipe === "pg" && (
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-slate-500 block">Opsi Jawaban A–E <span className="text-slate-400 font-normal">(radio = jawaban benar)</span></label>
          {soalOpsi.map((opsi,i) => {
            const huruf = String.fromCharCode(65+i);
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border-[1.5px] border-slate-200 bg-white text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{huruf}</span>
                <input type="text" value={opsi} onChange={e=>{const next=[...soalOpsi];next[i]=e.target.value;setSoalOpsi(next);}} placeholder={`Opsi ${huruf}`}
                  className="flex-1 h-8 px-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white"/>
                <input type="radio" name={radioName} checked={soalJawaban===huruf} onChange={()=>setSoalJawaban(huruf)} disabled={!opsi.trim()} className="flex-shrink-0 accent-emerald-600"/>
              </div>
            );
          })}
          {soalJawaban && (
            <p className="text-[10px] text-emerald-600 font-medium">
              ✓ Jawaban benar: <strong>{soalJawaban}</strong>
              {soalOpsi[soalJawaban.charCodeAt(0)-65] && <span className="text-slate-400 font-normal"> — {soalOpsi[soalJawaban.charCodeAt(0)-65]}</span>}
            </p>
          )}
        </div>
      )}
      {soalTipe === "essay" && (
        <div>
          <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Kunci Jawaban (Opsional)</label>
          <textarea value={soalJawaban} onChange={e=>setSoalJawaban(e.target.value)} rows={2} placeholder="Tuliskan kunci jawaban essay..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none bg-white"/>
        </div>
      )}
      <button onClick={onAdd} disabled={!soalPertanyaan.trim()}
        className="w-full h-9 bg-zinc-900 text-white rounded-lg text-[12px] font-semibold hover:bg-zinc-800 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        <Plus className="w-3.5 h-3.5"/> {editingId ? "Simpan Perubahan & Lanjut Soal Baru" : "Tambah & Lanjut Soal Berikutnya"}
      </button>
      <p className="text-[10px] text-slate-400 text-center">
        {liveIsValid && !editingId ? "✅ Soal ini otomatis ikut tersimpan saat klik \"Simpan\" di bawah" : "Isi pertanyaan untuk mulai membuat soal"}
      </p>
    </div>
  );
}

// ─── AddContentModal ──────────────────────────────────────────────
function AddContentModal({ activeTab, onClose, onSave }: {
  activeTab: string; onClose: () => void;
  onSave: (data: { nama: string; tanggal: string; durasi: string; soalAcak: boolean; soalList: SoalItem[] }) => void;
}) {
  const label = TAB_LABELS[activeTab] || "Konten";
  const draft = loadDraft(activeTab);
  const [step, setStep] = useState<1|2>(draft?.step ?? 1);
  const [nama, setNama] = useState(draft?.nama ?? "");
  const [tanggal, setTanggal] = useState(draft?.tanggal ?? "");
  const [durasi, setDurasi] = useState(draft?.durasi ?? "");
  const [soalAcak, setSoalAcak] = useState<boolean>(draft?.soalAcak ?? true);
  const [soalList, setSoalList] = useState<SoalItem[]>(draft?.soalList ?? []);
  const [soalPertanyaan, setSoalPertanyaan] = useState(draft?.soalPertanyaan ?? "");
  const [soalTipe, setSoalTipe] = useState<"pg"|"essay">(draft?.soalTipe ?? "pg");
  const [soalTopik, setSoalTopik] = useState(draft?.soalTopik ?? "");
  const [soalOpsi, setSoalOpsi] = useState<string[]>(draft?.soalOpsi ?? [...DEFAULT_OPSI]);
  const [soalJawaban, setSoalJawaban] = useState(draft?.soalJawaban ?? "");
  const [soalGambar, setSoalGambar] = useState<string|undefined>(draft?.soalGambar);
  const [editingId, setEditingId] = useState<string|null>(draft?.editingId ?? null);
  const [draftSavedAt, setDraftSavedAt] = useState<Date|null>(draft ? new Date() : null);
  const [showImportModal, setShowImportModal] = useState(false);

  const liveIsValid = isSoalLiveValid(soalPertanyaan);
  const totalSoalPreview = soalList.length + (liveIsValid && !editingId ? 1 : 0);

  const persistDraft = useCallback(() => {
    saveDraft(activeTab, { step, nama, tanggal, durasi, soalAcak, soalList: soalList.map(s=>({...s,gambar:undefined})), soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, soalGambar: undefined, editingId });
    setDraftSavedAt(new Date());
  }, [step, nama, tanggal, durasi, soalAcak, soalList, soalPertanyaan, soalTipe, soalTopik, soalOpsi, soalJawaban, editingId, activeTab]);
  useEffect(() => { const t = setTimeout(persistDraft, 400); return () => clearTimeout(t); }, [persistDraft]);

  function resetSoalForm() { setSoalPertanyaan(""); setSoalTopik(""); setSoalOpsi([...DEFAULT_OPSI]); setSoalJawaban(""); setSoalTipe("pg"); setSoalGambar(undefined); }
  function commitLiveSoal(): SoalItem[] {
    if (!liveIsValid) return soalList;
    if (editingId) return soalList.map(s=>s.id===editingId?{id:editingId,pertanyaan:soalPertanyaan.trim(),tipe:soalTipe,opsi:soalTipe==="pg"?soalOpsi.filter(Boolean):[],jawaban:soalJawaban,topik:soalTopik.trim(),gambar:soalGambar}:s);
    return [...soalList,{id:Date.now().toString(),pertanyaan:soalPertanyaan.trim(),tipe:soalTipe,opsi:soalTipe==="pg"?soalOpsi.filter(Boolean):[],jawaban:soalJawaban,topik:soalTopik.trim(),gambar:soalGambar}];
  }
  function handleAddSoal() {
    if (!soalPertanyaan.trim()) return;
    const newSoal: SoalItem = {id:editingId||Date.now().toString(),pertanyaan:soalPertanyaan.trim(),tipe:soalTipe,opsi:soalTipe==="pg"?soalOpsi.filter(Boolean):[],jawaban:soalJawaban,topik:soalTopik.trim(),gambar:soalGambar};
    if (editingId) { setSoalList(prev=>prev.map(s=>s.id===editingId?newSoal:s)); setEditingId(null); }
    else setSoalList(prev=>[...prev,newSoal]);
    resetSoalForm();
  }
  function handleEditSoal(s: SoalItem) {
    if (liveIsValid && !editingId) { setSoalList(commitLiveSoal()); resetSoalForm(); }
    setEditingId(s.id); setSoalPertanyaan(s.pertanyaan); setSoalTipe(s.tipe); setSoalTopik(s.topik);
    setSoalOpsi(s.tipe==="pg"?[...s.opsi,"","","","",""].slice(0,5):[...DEFAULT_OPSI]);
    setSoalJawaban(s.jawaban); setSoalGambar(s.gambar);
  }
  function handleSave() { clearDraft(activeTab); onSave({nama,tanggal,durasi,soalAcak,soalList:commitLiveSoal()}); }
  function handleImport(imported: SoalItem[]) { setSoalList(prev=>[...prev,...imported]); }
  const hasDraftData = nama.trim()!==""||soalList.length>0||liveIsValid;

  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
        <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {step===2 && <button onClick={()=>setStep(1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><ArrowLeft className="w-4 h-4"/></button>}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-zinc-900">Tambah {label}</h3>
                  {draftSavedAt && hasDraftData && <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full"><Save className="w-2.5 h-2.5"/>Draft tersimpan</span>}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-5 h-1.5 rounded-full transition-colors ${step===1?"bg-zinc-900":"bg-zinc-200"}`}/>
                  <span className={`w-5 h-1.5 rounded-full transition-colors ${step===2?"bg-zinc-900":"bg-zinc-200"}`}/>
                  <p className="text-[10px] text-slate-400 ml-1">Langkah {step} dari 2</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasDraftData && <button onClick={()=>{clearDraft(activeTab);setStep(1);setNama("");setTanggal("");setDurasi("");setSoalAcak(true);setSoalList([]);resetSoalForm();setEditingId(null);setDraftSavedAt(null);}} className="text-[10px] font-semibold text-red-400 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">Hapus draft</button>}
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4"/></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {step===1 && (
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama {label} <span className="text-red-500">*</span></label>
                  <input type="text" value={nama} onChange={e=>setNama(e.target.value)} placeholder={`e.g. UAS ${label} Semester 2`} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"/>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label><input type="date" value={tanggal} onChange={e=>setTanggal(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"/></div>
                  <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label><input type="number" value={durasi} onChange={e=>setDurasi(e.target.value)} placeholder="60" className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"/></div>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Urutan Soal untuk Siswa</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button type="button" onClick={()=>setSoalAcak(true)} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${soalAcak?"border-violet-500 bg-violet-50":"border-slate-200 hover:border-slate-300 bg-white"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${soalAcak?"bg-violet-100":"bg-slate-100"}`}><Shuffle className={`w-4 h-4 ${soalAcak?"text-violet-600":"text-slate-400"}`}/></div>
                      <div className="flex-1 min-w-0"><p className={`text-[12px] font-bold ${soalAcak?"text-violet-700":"text-zinc-700"}`}>Soal Acak</p><p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Urutan soal diacak berbeda tiap siswa</p>{soalAcak&&<span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded-full"><Check className="w-2.5 h-2.5"/>Aktif</span>}</div>
                    </button>
                    <button type="button" onClick={()=>setSoalAcak(false)} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${!soalAcak?"border-blue-500 bg-blue-50":"border-slate-200 hover:border-slate-300 bg-white"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${!soalAcak?"bg-blue-100":"bg-slate-100"}`}><ListOrdered className={`w-4 h-4 ${!soalAcak?"text-blue-600":"text-slate-400"}`}/></div>
                      <div className="flex-1 min-w-0"><p className={`text-[12px] font-bold ${!soalAcak?"text-blue-700":"text-zinc-700"}`}>Soal Berurutan</p><p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Semua siswa mengerjakan soal dengan urutan yang sama</p>{!soalAcak&&<span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full"><Check className="w-2.5 h-2.5"/>Aktif</span>}</div>
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
                  <FileText className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"/>
                  <p className="text-[11px] text-blue-700">Di langkah berikutnya, Anda bisa menambahkan soal manual atau import dari file PDF (dengan gambar otomatis)/DOCX/TXT.</p>
                </div>
              </div>
            )}
            {step===2 && (
              <div className="p-5 space-y-4">
                <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-[11px] font-semibold ${soalAcak?"bg-violet-50 border-violet-200 text-violet-700":"bg-blue-50 border-blue-200 text-blue-700"}`}>
                  {soalAcak?<Shuffle className="w-3.5 h-3.5 flex-shrink-0"/>:<ListOrdered className="w-3.5 h-3.5 flex-shrink-0"/>}
                  <span>Mode: <strong>{soalAcak?"Soal Acak":"Soal Berurutan"}</strong> · <button className="underline font-semibold opacity-70 hover:opacity-100" onClick={()=>setStep(1)}>Ubah</button></span>
                </div>
                <button onClick={()=>setShowImportModal(true)} className="w-full h-10 border-2 border-violet-200 bg-violet-50 text-violet-700 rounded-xl text-[12px] font-semibold hover:bg-violet-100 flex items-center justify-center gap-2 transition-colors">
                  <FileUp className="w-4 h-4"/> Import Soal dari File (PDF+Gambar / DOCX / TXT)
                </button>
                {soalList.length>0 && (
                  <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="font-semibold text-zinc-900 text-[13px]">Soal Ditambahkan</h4>
                      <span className="text-[11px] text-slate-400">{soalList.length} soal</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {soalList.map((s,i)=>(
                        <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId===s.id?"bg-amber-50":""}`}>
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium text-zinc-900 truncate">{s.pertanyaan}</p>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe==="pg"?"bg-blue-50 text-blue-600":"bg-amber-50 text-amber-600"}`}>{s.tipe==="pg"?"Pilihan Ganda":"Essay"}</span>
                              {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
                              {s.gambar && <span className="inline-flex items-center gap-0.5 text-[10px] text-violet-500 font-semibold">🖼️ Gambar</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button onClick={()=>handleEditSoal(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5"/></button>
                            <button onClick={()=>setSoalList(prev=>prev.filter(x=>x.id!==s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5"/></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <SoalForm
                  soalPertanyaan={soalPertanyaan} setSoalPertanyaan={setSoalPertanyaan}
                  soalTipe={soalTipe} setSoalTipe={setSoalTipe}
                  soalTopik={soalTopik} setSoalTopik={setSoalTopik}
                  soalOpsi={soalOpsi} setSoalOpsi={setSoalOpsi}
                  soalJawaban={soalJawaban} setSoalJawaban={setSoalJawaban}
                  soalGambar={soalGambar} setSoalGambar={setSoalGambar}
                  editingId={editingId} soalListLength={soalList.length} soalList={soalList}
                  onAdd={handleAddSoal} onCancelEdit={()=>{setEditingId(null);resetSoalForm();}} radioName="jawaban-benar-add"
                />
              </div>
            )}
          </div>
          <div className="p-5 pt-3 shrink-0 border-t border-slate-100">
            {step===1 ? (
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup & Simpan Draft</button>
                <button onClick={()=>{if(nama.trim())setStep(2);}} disabled={!nama.trim()} className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                  Lanjut: Tambah Soal <ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup & Simpan Draft</button>
                <button onClick={handleSave} className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4"/> Simpan {TAB_LABELS[activeTab]} ({totalSoalPreview} soal)
                </button>
              </div>
            )}
            {hasDraftData && <p className="text-center text-[10px] text-slate-400 mt-2">💾 Data Anda tersimpan otomatis — aman jika modal ditutup</p>}
          </div>
        </div>
      </div>
      {showImportModal && <ImportSoalModal onClose={()=>setShowImportModal(false)} onImport={handleImport}/>}
    </>
  );
}

// ─── KelolaSoalModal ──────────────────────────────────────────────
function KelolaSoalModal({ ujian, onClose, onUpdate }: { ujian: Ujian; onClose: () => void; onUpdate: (id: string, soalList: SoalItem[]) => void }) {
  const [soalList, setSoalList] = useState<SoalItem[]>(ujian.soalList||[]);
  const [pertanyaan, setPertanyaan] = useState("");
  const [tipe, setTipe] = useState<"pg"|"essay">("pg");
  const [topik, setTopik] = useState("");
  const [opsi, setOpsi] = useState([...DEFAULT_OPSI]);
  const [jawaban, setJawaban] = useState("");
  const [gambar, setGambar] = useState<string|undefined>();
  const [editingId, setEditingId] = useState<string|null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const liveIsValid = pertanyaan.trim().length>0;
  const totalPreview = soalList.length+(liveIsValid&&showForm&&!editingId?1:0);

  function reset() { setPertanyaan(""); setTopik(""); setOpsi([...DEFAULT_OPSI]); setJawaban(""); setTipe("pg"); setGambar(undefined); }
  function commitLive(): SoalItem[] {
    if (!liveIsValid||!showForm) return soalList;
    if (editingId) return soalList.map(s=>s.id===editingId?{id:editingId,pertanyaan:pertanyaan.trim(),tipe,opsi:tipe==="pg"?opsi.filter(Boolean):[],jawaban,topik:topik.trim(),gambar}:s);
    return [...soalList,{id:Date.now().toString(),pertanyaan:pertanyaan.trim(),tipe,opsi:tipe==="pg"?opsi.filter(Boolean):[],jawaban,topik:topik.trim(),gambar}];
  }
  function handleAdd() {
    if (!pertanyaan.trim()) return;
    const item: SoalItem = {id:editingId||Date.now().toString(),pertanyaan:pertanyaan.trim(),tipe,opsi:tipe==="pg"?opsi.filter(Boolean):[],jawaban,topik:topik.trim(),gambar};
    if (editingId) { setSoalList(p=>p.map(s=>s.id===editingId?item:s)); setEditingId(null); }
    else setSoalList(p=>[...p,item]);
    reset(); setShowForm(false);
  }
  function handleEdit(s: SoalItem) {
    if (liveIsValid&&showForm&&!editingId) { setSoalList(commitLive()); reset(); }
    setEditingId(s.id); setPertanyaan(s.pertanyaan); setTipe(s.tipe); setTopik(s.topik);
    setOpsi(s.tipe==="pg"?[...s.opsi,"","","","",""].slice(0,5):[...DEFAULT_OPSI]);
    setJawaban(s.jawaban); setGambar(s.gambar); setShowForm(true);
  }
  function handleSaveAll() { onUpdate(ujian.id, commitLive()); onClose(); }
  function handleImport(imported: SoalItem[]) { setSoalList(prev=>[...prev,...imported]); }

  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
        <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl z-10 max-h-[92vh] flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 sticky top-0 bg-white z-10 rounded-t-2xl">
            <div><h3 className="text-base font-bold text-zinc-900">Kelola Soal</h3><p className="text-[11px] text-slate-400 mt-0.5">{ujian.nama}</p></div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-medium">{totalPreview} soal</span>
              {!showForm && (
                <button onClick={()=>{setShowForm(true);setEditingId(null);reset();}} className="inline-flex items-center gap-1.5 h-8 px-3 bg-zinc-900 text-white rounded-lg text-[11px] font-semibold hover:bg-zinc-800 transition-colors">
                  <Plus className="w-3.5 h-3.5"/><span>Tambah Soal</span>
                </button>
              )}
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4"/></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <button onClick={()=>setShowImportModal(true)} className="w-full h-10 border-2 border-violet-200 bg-violet-50 text-violet-700 rounded-xl text-[12px] font-semibold hover:bg-violet-100 flex items-center justify-center gap-2 transition-colors">
              <FileUp className="w-4 h-4"/> Import Soal dari File (PDF+Gambar / DOCX / TXT)
            </button>
            {soalList.length===0&&!showForm && (
              <div className="text-center py-8"><FileText className="w-10 h-10 text-slate-200 mx-auto mb-2"/><p className="text-[13px] font-semibold text-zinc-500">Belum ada soal</p><p className="text-[11px] text-slate-400 mt-0.5">Import dari file atau klik "Tambah Soal" untuk mulai</p></div>
            )}
            {soalList.length>0 && (
              <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
                <div className="divide-y divide-slate-50">
                  {soalList.map((s,i)=>(
                    <div key={s.id} className={`px-4 py-3 flex items-start gap-3 ${editingId===s.id?"bg-amber-50":"hover:bg-slate-50/50"}`}>
                      <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-zinc-900">{s.pertanyaan}</p>
                        {s.gambar && <img src={s.gambar} alt="" className="mt-1.5 h-12 rounded-lg object-cover border border-slate-200" onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>}
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe==="pg"?"bg-blue-50 text-blue-600":"bg-amber-50 text-amber-600"}`}>{s.tipe==="pg"?"PG":"Essay"}</span>
                          {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
                          {s.tipe==="pg"&&s.opsi.length>0 && <span className="text-[10px] text-slate-400">{s.opsi.length} opsi · Jwb: <strong className="text-emerald-600">{s.jawaban}</strong></span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={()=>handleEdit(s)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Edit3 className="w-3.5 h-3.5"/></button>
                        <button onClick={()=>setSoalList(p=>p.filter(x=>x.id!==s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5"/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!showForm&&soalList.length>0 && (
              <button onClick={()=>{setShowForm(true);setEditingId(null);reset();}} className="w-full h-10 border-2 border-dashed border-slate-200 rounded-xl text-[12px] font-semibold text-slate-500 hover:bg-slate-50 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4"/> Tambah Soal Manual
              </button>
            )}
            {showForm && (
              <SoalForm
                soalPertanyaan={pertanyaan} setSoalPertanyaan={setPertanyaan}
                soalTipe={tipe} setSoalTipe={setTipe}
                soalTopik={topik} setSoalTopik={setTopik}
                soalOpsi={opsi} setSoalOpsi={setOpsi}
                soalJawaban={jawaban} setSoalJawaban={setJawaban}
                soalGambar={gambar} setSoalGambar={setGambar}
                editingId={editingId} soalListLength={soalList.length} soalList={soalList}
                onAdd={handleAdd} onCancelEdit={()=>{setShowForm(false);setEditingId(null);reset();}} radioName="jawaban-kelola"
              />
            )}
          </div>
          <div className="p-5 border-t border-slate-100 shrink-0 flex gap-3">
            <button onClick={onClose} className="flex-1 h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Batal</button>
            <button onClick={handleSaveAll} className="flex-1 h-10 bg-zinc-900 rounded-xl text-[13px] font-bold text-white hover:bg-zinc-800 flex items-center justify-center gap-2">
              <Check className="w-4 h-4"/> Simpan ({totalPreview} soal)
            </button>
          </div>
        </div>
      </div>
      {showImportModal && <ImportSoalModal onClose={()=>setShowImportModal(false)} onImport={handleImport}/>}
    </>
  );
}

// ─── EditUjianModal ───────────────────────────────────────────────
function EditUjianModal({ ujian, onClose, onSave }: { ujian: Ujian; onClose: () => void; onSave: (id: string, data: { nama: string; durasi: number; tanggalMulai?: string }) => void }) {
  const [nama, setNama] = useState(ujian.nama);
  const [durasi, setDurasi] = useState(String(ujian.durasi));
  const [tanggal, setTanggal] = useState(ujian.tanggalMulai ? new Date(ujian.tanggalMulai).toISOString().split("T")[0] : "");
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl z-10 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-zinc-900">Edit {TAB_LABELS[ujian.tipe?.toLowerCase()]||"Ujian"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4"/></button>
        </div>
        <div className="space-y-4">
          <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label><input type="text" value={nama} onChange={e=>setNama(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"/></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Tanggal</label><input type="date" value={tanggal} onChange={e=>setTanggal(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"/></div>
            <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Durasi (menit)</label><input type="number" value={durasi} onChange={e=>setDurasi(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"/></div>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
          <button onClick={()=>onSave(ujian.id,{nama,durasi:parseInt(durasi)||60,tanggalMulai:tanggal||undefined})} disabled={!nama.trim()} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40">Simpan</button>
        </div>
      </div>
    </div>
  );
}

// ─── DeleteUjianModal ─────────────────────────────────────────────
function DeleteUjianModal({ ujian, onClose, onDelete }: { ujian: Ujian; onClose: () => void; onDelete: (id: string) => void }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trash2 className="w-5 h-5 text-red-600"/></div>
        <h3 className="text-base font-bold text-zinc-900 mb-2 text-center">Hapus {TAB_LABELS[ujian.tipe?.toLowerCase()]||"Ujian"}</h3>
        <p className="text-[13px] text-slate-500 mb-6 text-center">Yakin ingin menghapus <span className="font-semibold text-zinc-900">"{ujian.nama}"</span>? Semua soal dan data peserta akan ikut terhapus.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button>
          <button onClick={()=>onDelete(ujian.id)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700">Hapus</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ─── MAIN PAGE ────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════
export default function AdminMataPelajaranPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState<MataPelajaran[]>([]);
  const [stats, setStats] = useState({ totalSoal: 0, totalUjian: 0 });
  const [selectedSubject, setSelectedSubject] = useState<MataPelajaran|null>(null);
  const [activeTab, setActiveTab] = useState("ujian");
  const [ujianList, setUjianList] = useState<Ujian[]>([]);
  const [ujianLoading, setUjianLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showKelolaSoal, setShowKelolaSoal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedUjian, setSelectedUjian] = useState<Ujian|null>(null);
  const [targetMapel, setTargetMapel] = useState<MataPelajaran|null>(null);
  const [deleteMapelDetail, setDeleteMapelDetail] = useState<DeleteMapelDetail|null>(null);
  const [deleteMapelLoading, setDeleteMapelLoading] = useState(false);
  const [showEditUjianModal, setShowEditUjianModal] = useState(false);
  const [showDeleteUjianModal, setShowDeleteUjianModal] = useState(false);
  const [targetUjian, setTargetUjian] = useState<Ujian|null>(null);
  const [showHasilModal, setShowHasilModal] = useState(false);
  const [hasilUjianTarget, setHasilUjianTarget] = useState<Ujian|null>(null);
  const [soalBankList, setSoalBankList] = useState<any[]>([]);
  const [soalBankLoading, setSoalBankLoading] = useState(false);
  const [soalBankSearch, setSoalBankSearch] = useState("");
  const [soalBankTipe, setSoalBankTipe] = useState("");
  const [addForm, setAddForm] = useState({ nama:"", kelas:"", deskripsi:"", warna:"zinc" });
  const [editForm, setEditForm] = useState<MataPelajaran|null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showSoalPreview, setShowSoalPreview] = useState(false);
  const [bobotUjian, setBobotUjian] = useState(40);
  const [bobotUlangan, setBobotUlangan] = useState(25);
  const [bobotLatihan, setBobotLatihan] = useState(20);
  const [bobotKuis, setBobotKuis] = useState(15);
  const [kkm, setKkm] = useState(70);
  const [showNilaiHasil, setShowNilaiHasil] = useState(false);
  const [nilaiData, setNilaiData] = useState<any[]>([]);
  const [nilaiFilter, setNilaiFilter] = useState("all");
  const [nilaiSortKey, setNilaiSortKey] = useState("akhir");
  const [nilaiSortAsc, setNilaiSortAsc] = useState(false);

  const fetchSubjects = useCallback(async () => {
    const token = getToken();
    if (!token) { router.push("/auth/login"); return; }
    try {
      const res = await api.get<{data:MataPelajaran[];stats:any}>("/mata-pelajaran");
      setSubjects(res.data||[]); if (res.stats) setStats(res.stats);
    } catch(err) { setError(err instanceof Error?err.message:"Gagal memuat data"); }
    finally { setLoading(false); }
  }, [router]);
  useEffect(()=>{fetchSubjects();},[fetchSubjects]);

  const fetchUjianByTipe = useCallback(async (mapelId: number, tipe: string) => {
    setUjianLoading(true);
    try {
      const tipeMap: Record<string,string> = {ujian:"UJIAN",ulangan:"ULANGAN",latihan:"LATIHAN",kuis:"KUIS"};
      const tipeParam = tipeMap[tipe];
      const url = tipeParam ? `/mata-pelajaran/${mapelId}/ujian?tipe=${tipeParam}` : `/mata-pelajaran/${mapelId}/ujian`;
      const res = await api.get<{data:Ujian[]}>(url);
      setUjianList(res.data||[]);
    } catch { setError("Gagal memuat data ujian"); }
    finally { setUjianLoading(false); }
  }, []);
  useEffect(()=>{if(selectedSubject&&["ujian","ulangan","latihan","kuis"].includes(activeTab))fetchUjianByTipe(selectedSubject.id,activeTab);},[selectedSubject,activeTab,fetchUjianByTipe]);

  const fetchSoalBank = useCallback(async (mapelId: number, search="", tipe="") => {
    setSoalBankLoading(true);
    try {
      const params = new URLSearchParams();
      if(search) params.set("search",search); if(tipe) params.set("tipe",tipe);
      const res = await api.get<{data:any[];total:number}>(`/mata-pelajaran/${mapelId}/soal?${params.toString()}`);
      setSoalBankList(res.data||[]);
    } catch { setSoalBankList([]); }
    finally { setSoalBankLoading(false); }
  }, []);
  useEffect(()=>{if(selectedSubject&&activeTab==="soal")fetchSoalBank(selectedSubject.id,soalBankSearch,soalBankTipe);},[selectedSubject,activeTab,soalBankSearch,soalBankTipe,fetchSoalBank]);

  const filtered = subjects;

  async function handleAdd() {
    try { await api.post("/mata-pelajaran", addForm); setShowAddModal(false); setAddForm({nama:"",kelas:"",deskripsi:"",warna:"zinc"}); fetchSubjects(); }
    catch(err) { setError(err instanceof Error?err.message:"Gagal menambah"); }
  }
  async function handleEdit() {
    if(!editForm||!targetMapel) return;
    try { await api.put(`/mata-pelajaran/${targetMapel.id}`, editForm); setShowEditModal(false); setTargetMapel(null); setEditForm(null); fetchSubjects(); }
    catch(err) { setError(err instanceof Error?err.message:"Gagal mengubah"); }
  }
  async function openDeleteMapelModal(subject: MataPelajaran) {
    setTargetMapel(subject); setDeleteMapelDetail(null); setDeleteMapelLoading(true); setShowDeleteModal(true);
    try {
      const [ujianRes,ulanganRes,latihanRes,kuisRes,soalRes] = await Promise.all([
        api.get<{data:any[]}>(`/mata-pelajaran/${subject.id}/ujian?tipe=UJIAN`),
        api.get<{data:any[]}>(`/mata-pelajaran/${subject.id}/ujian?tipe=ULANGAN`),
        api.get<{data:any[]}>(`/mata-pelajaran/${subject.id}/ujian?tipe=LATIHAN`),
        api.get<{data:any[]}>(`/mata-pelajaran/${subject.id}/ujian?tipe=KUIS`),
        api.get<{total:number}>(`/mata-pelajaran/${subject.id}/soal`),
      ]);
      setDeleteMapelDetail({totalUjian:ujianRes.data?.length||0,totalUlangan:ulanganRes.data?.length||0,totalLatihan:latihanRes.data?.length||0,totalKuis:kuisRes.data?.length||0,totalSoal:soalRes.total||subject.totalSoal});
    } catch {
      setDeleteMapelDetail({totalUjian:subject.totalUjian,totalUlangan:0,totalLatihan:0,totalKuis:0,totalSoal:subject.totalSoal});
    } finally { setDeleteMapelLoading(false); }
  }
  async function handleDelete() {
    if(!targetMapel) return;
    try { await api.delete(`/mata-pelajaran/${targetMapel.id}`); setShowDeleteModal(false); setDeleteMapelDetail(null); if(selectedSubject?.id===targetMapel.id)setSelectedSubject(null); setTargetMapel(null); fetchSubjects(); }
    catch(err) { setError(err instanceof Error?err.message:"Gagal menghapus mata pelajaran"); setShowDeleteModal(false); }
  }
  async function handleEditUjian(ujianId: string, data: {nama:string;durasi:number;tanggalMulai?:string}) {
    try { await api.put(`/ujian/${ujianId}`,{nama:data.nama,durasi:data.durasi,tanggalMulai:data.tanggalMulai?new Date(data.tanggalMulai).toISOString():null}); setShowEditUjianModal(false); setTargetUjian(null); if(selectedSubject)fetchUjianByTipe(selectedSubject.id,activeTab); }
    catch(err) { setError(err instanceof Error?err.message:"Gagal mengubah ujian"); }
  }
  async function handleDeleteUjian(ujianId: string) {
    try { await api.delete(`/ujian/${ujianId}`); setShowDeleteUjianModal(false); setTargetUjian(null); if(selectedSubject){fetchUjianByTipe(selectedSubject.id,activeTab);fetchSubjects();} }
    catch(err) { setError(err instanceof Error?err.message:"Gagal menghapus ujian"); }
  }
  async function handleSaveContent(data: {nama:string;tanggal:string;durasi:string;soalAcak:boolean;soalList:SoalItem[]}) {
    if(!selectedSubject) return;
    const tipeMap: Record<string,string> = {ujian:"UJIAN",ulangan:"ULANGAN",latihan:"LATIHAN",kuis:"KUIS"};
    try {
      const ujianRes = await api.post<{id:string;token:string}>(`/mata-pelajaran/${selectedSubject.id}/ujian`,{
        nama:data.nama, tipe:tipeMap[activeTab]||"UJIAN", durasi:parseInt(data.durasi)||60,
        kelas:selectedSubject.kelas, tanggalMulai:data.tanggal||null, acakSoal:data.soalAcak, acakOpsi:false, soalIds:[],
      });
      const ujianId = ujianRes.id;
      if(ujianId&&data.soalList.length>0) {
        const soalIds: string[] = [];
        for(const s of data.soalList) {
          const soalRes = await api.post<{id:string}>(`/mata-pelajaran/${selectedSubject.id}/soal`,{
            pertanyaan:s.pertanyaan, tipe:s.tipe==="pg"?"PILIHAN_GANDA":"ESSAY",
            topik:s.topik||null, gambarUrl:s.gambar||null,
            opsiA:s.opsi[0]||null, opsiB:s.opsi[1]||null, opsiC:s.opsi[2]||null,
            opsiD:s.opsi[3]||null, opsiE:s.opsi[4]||null, jawabanBenar:s.jawaban||null,
          });
          soalIds.push(soalRes.id);
        }
        await api.put(`/ujian/${ujianId}`,{soalIds});
      }
      setShowContentModal(false); fetchUjianByTipe(selectedSubject.id,activeTab); fetchSubjects();
    } catch(err) { setError(err instanceof Error?err.message:"Gagal menyimpan"); }
  }
  async function handleUpdateSoal(ujianId: string, soalList: SoalItem[]) {
    if(!selectedSubject) return;
    try {
      const soalIds: string[] = [];
      for(const s of soalList) {
        const isNewSoal = /^\d+$/.test(s.id)||s.id.startsWith("import_");
        if(isNewSoal) {
          const soalRes = await api.post<{id:string}>(`/mata-pelajaran/${selectedSubject.id}/soal`,{
            pertanyaan:s.pertanyaan, tipe:s.tipe==="pg"?"PILIHAN_GANDA":"ESSAY",
            topik:s.topik||null, gambarUrl:s.gambar||null,
            opsiA:s.opsi[0]||null, opsiB:s.opsi[1]||null, opsiC:s.opsi[2]||null,
            opsiD:s.opsi[3]||null, opsiE:s.opsi[4]||null, jawabanBenar:s.jawaban||null,
          });
          soalIds.push(soalRes.id);
        } else {
          await api.put(`/soal/${s.id}`,{
            pertanyaan:s.pertanyaan, tipe:s.tipe==="pg"?"PILIHAN_GANDA":"ESSAY",
            topik:s.topik||null, gambarUrl:s.gambar||null,
            opsiA:s.opsi[0]||null, opsiB:s.opsi[1]||null, opsiC:s.opsi[2]||null,
            opsiD:s.opsi[3]||null, opsiE:s.opsi[4]||null, jawabanBenar:s.jawaban||null,
          });
          soalIds.push(s.id);
        }
      }
      await api.put(`/ujian/${ujianId}`,{soalIds});
      setUjianList(prev=>prev.map(u=>u.id===ujianId?{...u,soalList,totalSoal:soalList.length}:u));
      fetchSubjects();
    } catch(err) { setError(err instanceof Error?err.message:"Gagal menyimpan soal"); }
  }

  function copyToClipboard(text: string, type: "link"|"token") {
    navigator.clipboard.writeText(text).then(()=>{
      if(type==="link"){setCopiedLink(true);setTimeout(()=>setCopiedLink(false),2000);}
      else{setCopiedToken(true);setTimeout(()=>setCopiedToken(false),2000);}
    });
  }
  function hitungNilaiAkhir() {
    const namaList=["Adi Nugroho","Bella Rahmawati","Candra Wijaya","Dewi Anggraeni","Eko Prasetyo"];
    let seed=12345;
    function rand(min:number,max:number){seed=(seed*9301+49297)%233280;return min+Math.floor((seed/233280)*(max-min+1));}
    const bU=bobotUjian/100,bUl=bobotUlangan/100,bL=bobotLatihan/100,bK=bobotKuis/100;
    const data=namaList.map((nama,i)=>{const ujian=rand(55,100),ulangan=rand(55,100),latihan=rand(60,100),kuis=rand(60,100);const akhir=Math.round(ujian*bU+ulangan*bUl+latihan*bL+kuis*bK);return{nisn:`005${String(i+1).padStart(5,"0")}`,nama,ujian,ulangan,latihan,kuis,akhir,lulus:akhir>=kkm,grade:akhir>=90?"A":akhir>=80?"B":akhir>=70?"C":"D"};});
    setNilaiData(data);setShowNilaiHasil(true);
    setTimeout(()=>document.getElementById("nilai-hasil-section")?.scrollIntoView({behavior:"smooth"}),100);
  }
  function getSortedNilaiData(){
    return [...nilaiData].filter(s=>{if(nilaiFilter==="lulus"&&!s.lulus)return false;if(nilaiFilter==="tidak"&&s.lulus)return false;return true;}).sort((a,b)=>{const va=a[nilaiSortKey];const vb=b[nilaiSortKey];return nilaiSortAsc?(va>vb?1:-1):(va<vb?1:-1);});
  }
  const bobotTotal=bobotUjian+bobotUlangan+bobotLatihan+bobotKuis;
  const isBobotValid=bobotTotal===100;

  const renderContentTable = () => {
    if(ujianLoading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400"/></div>;
    const tabLabel=TAB_LABELS[activeTab]||activeTab;
    return (
      <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-zinc-900 text-[13px]">Daftar {tabLabel}</h3>
          <span className="text-[11px] text-slate-400 font-medium">{ujianList.length} {tabLabel.toLowerCase()}</span>
        </div>
        {ujianList.length===0 ? (
          <div className="py-12 text-center"><FileText className="w-8 h-8 text-slate-200 mx-auto mb-2"/><p className="text-[13px] text-slate-400">Belum ada {tabLabel.toLowerCase()}</p><button onClick={()=>setShowContentModal(true)} className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-zinc-700 underline"><Plus className="w-3.5 h-3.5"/>Tambah {tabLabel}</button></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{minWidth:"680px"}}>
              <thead className="border-b border-slate-100 bg-slate-50/50">
                <tr>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama {tabLabel}</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Tanggal</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Soal</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Urutan</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Status</th>
                  <th className="px-4 py-3 text-right text-[10px] font-bold uppercase text-slate-400">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ujianList.map(item=>{
                  const soalCount=item.soalList?.length??item.totalSoal;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3"><p className="font-medium text-zinc-900 text-[13px]">{item.nama}</p><p className="text-[10px] text-slate-400 mt-0.5">{item.kelas}</p></td>
                      <td className="px-4 py-3 text-slate-500 text-[12px] hidden sm:table-cell">{item.tanggalMulai?new Date(item.tanggalMulai).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}):"—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-zinc-900 text-[12px]">{soalCount}</span>
                          <button onClick={()=>{setSelectedUjian(item);setShowKelolaSoal(true);}} className="inline-flex items-center gap-1 h-5 px-1.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-500 hover:bg-zinc-900 hover:text-white transition-colors">
                            <Edit3 className="w-2.5 h-2.5"/>Kelola
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        {item.soalAcak?<span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full"><Shuffle className="w-3 h-3"/>Acak</span>:<span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full"><ListOrdered className="w-3 h-3"/>Urut</span>}
                      </td>
                      <td className="px-4 py-3">
                        {item.status==="BERLANGSUNG"&&<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block"/>BERLANGSUNG</span>}
                        {item.status==="SELESAI"&&<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">SELESAI</span>}
                        {item.status==="AKTIF"&&<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">AKTIF</span>}
                        {item.status==="DRAFT"&&<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">DRAFT</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={()=>{setSelectedUjian(item);setShowToken(false);setShowSoalPreview(false);setCopiedLink(false);setCopiedToken(false);setShowDetailModal(true);}} className="h-7 px-2.5 border border-slate-200 rounded-lg text-[10px] font-semibold hover:bg-slate-50 transition-colors">Detail</button>
                          <button onClick={()=>{setHasilUjianTarget(item);setShowHasilModal(true);}} className="h-7 px-2.5 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-semibold hover:bg-emerald-100 transition-colors">Hasil</button>
                          <button onClick={()=>{setTargetUjian(item);setShowEditUjianModal(true);}} className="h-7 w-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                          <button onClick={()=>{setTargetUjian(item);setShowDeleteUjianModal(true);}} className="h-7 w-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderNilaiTab = () => (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-[14px] p-4 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div><h3 className="font-bold text-zinc-900 text-[14px]">Konfigurasi Rumus Nilai Akhir</h3><p className="text-[11px] text-slate-500 mt-0.5">Total bobot harus <strong>100%</strong>.</p></div>
          <div className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[13px] font-bold ${isBobotValid?"bg-emerald-100 text-emerald-700":"bg-red-100 text-red-600"}`}>{bobotTotal}%</div>
        </div>
        <div className="space-y-3">
          {[
            {label:"Ujian",icon:<ClipboardList className="w-4 h-4 text-violet-600"/>,desc:`${ujianList.length} ujian`,val:bobotUjian,set:setBobotUjian,color:"violet"},
            {label:"Ulangan Harian",icon:<Book className="w-4 h-4 text-blue-600"/>,desc:"Rata-rata semua ulangan",val:bobotUlangan,set:setBobotUlangan,color:"blue"},
            {label:"Latihan",icon:<Dumbbell className="w-4 h-4 text-emerald-600"/>,desc:"Rata-rata semua latihan",val:bobotLatihan,set:setBobotLatihan,color:"emerald"},
            {label:"Kuis",icon:<Zap className="w-4 h-4 text-amber-600"/>,desc:"Rata-rata semua kuis",val:bobotKuis,set:setBobotKuis,color:"amber"},
          ].map(item=>(
            <div key={item.label} className={`p-3 rounded-xl bg-${item.color}-50 border border-${item.color}-100`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>{item.icon}</div>
                  <div><p className="font-semibold text-zinc-900 text-[12px]">{item.label}</p><p className="text-[10px] text-slate-400">{item.desc}</p></div>
                </div>
                <div className="flex items-center gap-1.5">
                  <input type="number" value={item.val} onChange={e=>item.set(parseInt(e.target.value)||0)} className="w-16 h-8 text-center border-[1.5px] border-slate-200 rounded-lg text-[12px] font-semibold text-zinc-900 bg-white focus:border-zinc-900 outline-none"/>
                  <span className="text-[12px] font-semibold text-slate-500">%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-slate-900 rounded-xl">
          <p className="text-[10px] text-slate-400 mb-1 font-semibold uppercase tracking-wider">Preview Rumus</p>
          <p className="text-[12px] text-white font-mono">
            NA = {bobotUjian>0&&`Ujian×${bobotUjian}%`}{bobotUjian>0&&bobotUlangan>0&&" + "}{bobotUlangan>0&&`UH×${bobotUlangan}%`}{bobotUlangan>0&&bobotLatihan>0&&" + "}{bobotLatihan>0&&`Latihan×${bobotLatihan}%`}{bobotLatihan>0&&bobotKuis>0&&" + "}{bobotKuis>0&&`Kuis×${bobotKuis}%`}
          </p>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <KkmField kkm={kkm} setKkm={setKkm}/>
          <button onClick={hitungNilaiAkhir} disabled={!isBobotValid} className="h-10 px-5 bg-zinc-900 text-white text-[13px] font-bold rounded-xl hover:bg-zinc-800 flex items-center gap-2 disabled:opacity-40 w-full sm:w-auto justify-center">
            <Calculator className="w-4 h-4"/>Hitung Nilai Akhir
          </button>
        </div>
        {!isBobotValid && <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2"><AlertCircle className="text-red-500 w-4 h-4 flex-shrink-0"/><p className="text-[11px] text-red-600 font-medium">Total bobot harus 100%. Sesuaikan sebelum menghitung.</p></div>}
      </div>
      {showNilaiHasil && (
        <div id="nilai-hasil-section" className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {label:"Total Siswa",val:nilaiData.length,icon:<Users className="w-3.5 h-3.5"/>,color:"#18181b"},
              {label:"Rata-rata",val:(nilaiData.reduce((a:number,b:any)=>a+b.akhir,0)/nilaiData.length).toFixed(1),icon:<BarChart2 className="w-3.5 h-3.5"/>,color:"#2563eb"},
              {label:"Nilai Tertinggi",val:Math.max(...nilaiData.map((s:any)=>s.akhir)),icon:<TrendingUp className="w-3.5 h-3.5"/>,color:"#059669"},
              {label:`Lulus (≥${kkm})`,val:`${nilaiData.filter((s:any)=>s.lulus).length}/${nilaiData.length}`,icon:<CheckCircle className="w-3.5 h-3.5"/>,color:"#059669"},
            ].map(s=>(
              <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:s.color+"18",color:s.color}}>{s.icon}</div>
                <div><p className="text-lg font-bold text-zinc-900">{s.val}</p><p className="text-[10px] text-slate-400 font-medium">{s.label}</p></div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-semibold text-zinc-900 text-[13px]">Rekap Nilai Akhir Siswa</h3>
              <select value={nilaiFilter} onChange={e=>setNilaiFilter(e.target.value)} className="h-8 px-2 border border-slate-200 rounded-lg text-[12px] text-slate-600 focus:outline-none"><option value="all">Semua</option><option value="lulus">Lulus</option><option value="tidak">Tidak Lulus</option></select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" style={{minWidth:"480px"}}>
                <thead className="border-b border-slate-100 bg-slate-50/50">
                  <tr>
                    <th className="px-4 py-3 text-center text-[10px] font-bold uppercase text-slate-400 w-8">#</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400">Nama</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell cursor-pointer" onClick={()=>{if(nilaiSortKey==="ujian")setNilaiSortAsc(!nilaiSortAsc);else{setNilaiSortKey("ujian");setNilaiSortAsc(false);}}}>Ujian</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell cursor-pointer" onClick={()=>{if(nilaiSortKey==="ulangan")setNilaiSortAsc(!nilaiSortAsc);else{setNilaiSortKey("ulangan");setNilaiSortAsc(false);}}}>Ulangan</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 cursor-pointer" onClick={()=>{if(nilaiSortKey==="akhir")setNilaiSortAsc(!nilaiSortAsc);else{setNilaiSortKey("akhir");setNilaiSortAsc(false);}}}>Nilai Akhir</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden sm:table-cell">Grade</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase text-slate-400 hidden md:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {getSortedNilaiData().map((s:any)=>{
                    const ranked=[...nilaiData].sort((a:any,b:any)=>b.akhir-a.akhir);
                    const rank=ranked.findIndex((r:any)=>r.nisn===s.nisn)+1;
                    const rankClass=rank===1?"bg-gradient-to-br from-amber-500 to-amber-600 text-white":rank===2?"bg-gradient-to-br from-slate-400 to-slate-500 text-white":rank===3?"bg-gradient-to-br from-orange-400 to-amber-600 text-white":"bg-slate-100 text-slate-600";
                    const akhirColor=s.akhir>=90?"#059669":s.akhir>=80?"#10b981":s.akhir>=70?"#2563eb":"#dc2626";
                    const gradeClass: Record<string,string>={A:"bg-emerald-50 text-emerald-700",B:"bg-blue-50 text-blue-700",C:"bg-amber-50 text-amber-700",D:"bg-red-50 text-red-700"};
                    return (
                      <tr key={s.nisn} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 text-center"><span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center mx-auto ${rankClass}`}>{rank}</span></td>
                        <td className="px-4 py-3"><p className="font-semibold text-zinc-900 text-[12px] truncate max-w-[120px]">{s.nama}</p><p className="text-[10px] text-slate-400">{s.nisn}</p></td>
                        <td className="px-4 py-3 hidden sm:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ujian}</span></td>
                        <td className="px-4 py-3 hidden md:table-cell"><span className="font-semibold text-[13px] text-zinc-700">{s.ulangan}</span></td>
                        <td className="px-4 py-3"><span className="font-black text-[15px]" style={{color:akhirColor}}>{s.akhir}</span></td>
                        <td className="px-4 py-3 hidden sm:table-cell"><span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-extrabold ${gradeClass[s.grade]}`}>{s.grade}</span></td>
                        <td className="px-4 py-3 hidden md:table-cell">{s.lulus?<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">LULUS</span>:<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">TIDAK LULUS</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{getSortedNilaiData().length} dari {nilaiData.length} siswa</span>
              <span className="text-[11px] text-slate-500">KKM: <strong className="text-zinc-900">{kkm}</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if(loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-zinc-900"/></div>;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={()=>setSidebarOpen(false)}/>}
      <div className={`${sidebarOpen?"translate-x-0":"-translate-x-full"} md:translate-x-0 transition-transform duration-300 fixed md:relative z-50`}>
        <Sidebar role="admin"/>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={selectedSubject?`${selectedSubject.nama} › ${TAB_LABELS[activeTab]||activeTab}`:"Mata Pelajaran"} showHamburger onHamburgerClick={()=>setSidebarOpen(true)}/>
        <div className="flex-1 overflow-y-auto">
          {/* ══ LIST MAPEL ══ */}
          {!selectedSubject && (
            <div className="p-4 md:p-8 space-y-5">
              {error && <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600"><AlertCircle className="w-5 h-5 flex-shrink-0"/>{error}<button onClick={()=>setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4"/></button></div>}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div><h1 className="text-lg md:text-xl font-bold text-zinc-900">Mata Pelajaran</h1><p className="text-[13px] text-slate-500 mt-0.5">Kelola semua mata pelajaran</p></div>
                <button onClick={()=>{setShowAddModal(true);setAddForm({nama:"",kelas:"",deskripsi:"",warna:"zinc"});}} className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm w-fit">
                  <Plus className="w-4 h-4"/>Tambah Mata Pelajaran
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{label:"Total Mapel",val:subjects.length,icon:<BookOpen className="w-4 h-4"/>,color:"#18181b"},{label:"Total Soal",val:stats.totalSoal,icon:<FileText className="w-4 h-4"/>,color:"#2563eb"},{label:"Total Ujian",val:stats.totalUjian,icon:<ClipboardList className="w-4 h-4"/>,color:"#059669"},{label:"Kelas",val:[...new Set(subjects.map(s=>s.kelas))].length,icon:<Users className="w-4 h-4"/>,color:"#d97706"}].map(s=>(
                  <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:s.color+"18",color:s.color}}>{s.icon}</div>
                    <div><p className="text-lg md:text-xl font-bold text-zinc-900">{s.val}</p><p className="text-[10px] md:text-[11px] text-slate-400 font-medium">{s.label}</p></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(subject=>{
                  const c=COLORS[subject.warna]||COLORS.zinc;
                  return (
                    <div key={subject.id} className="bg-white border border-slate-200 rounded-[16px] overflow-hidden cursor-pointer hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 hover:border-slate-300 transition-all group" onClick={()=>{setSelectedSubject(subject);setActiveTab("ujian");setShowNilaiHasil(false);}}>
                      <div className="h-[6px]" style={{background:`linear-gradient(90deg, ${c.dot}, ${c.hex}88)`}}/>
                      <div className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{background:c.bg,border:`1.5px solid ${c.border}`}}><BookOpen style={{color:c.icon}} className="w-5 h-5"/></div>
                          <div className="flex-1 min-w-0"><p className="font-bold text-zinc-900 text-[14px] leading-tight truncate">{subject.nama}</p><span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{background:c.bg,color:c.icon,border:`1px solid ${c.border}`}}>{subject.kelas}</span></div>
                        </div>
                        {subject.deskripsi && <p className="text-[12px] text-slate-500 mb-3 line-clamp-2">{subject.deskripsi}</p>}
                        <div className="flex items-center gap-4 text-[12px] text-slate-500 pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><FileText className="w-3 h-3 text-slate-400"/></div><span className="font-medium">{subject.totalSoal} soal</span></div>
                          <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center"><ClipboardList className="w-3 h-3 text-slate-400"/></div><span className="font-medium">{subject.totalUjian} ujian</span></div>
                          <div className="ml-auto flex items-center gap-1">
                            <button onClick={e=>{e.stopPropagation();setTargetMapel(subject);setEditForm(subject);setShowEditModal(true);}} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                            <button onClick={e=>{e.stopPropagation();openDeleteMapelModal(subject);}} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div onClick={()=>{setShowAddModal(true);setAddForm({nama:"",kelas:"",deskripsi:"",warna:"zinc"});}} className="border-2 border-dashed border-slate-200 rounded-[16px] p-5 flex flex-col items-center justify-center gap-2 text-center cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all min-h-[160px]">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center"><Plus className="text-slate-400 w-5 h-5"/></div>
                  <div><p className="text-[13px] text-zinc-700 font-semibold">Tambah Mata Pelajaran</p><p className="text-[11px] text-slate-400 mt-0.5">Buat mapel baru</p></div>
                </div>
              </div>
            </div>
          )}

          {/* ══ DETAIL MAPEL ══ */}
          {selectedSubject && (
            <div className="p-4 md:p-8 space-y-4">
              {error && <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600"><AlertCircle className="w-5 h-5 flex-shrink-0"/>{error}<button onClick={()=>setError("")} className="ml-auto p-1 rounded hover:bg-red-100"><X className="w-4 h-4"/></button></div>}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button onClick={()=>setSelectedSubject(null)} className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-xl bg-white text-slate-500 hover:bg-slate-50 flex-shrink-0"><ArrowLeft className="w-4 h-4"/></button>
                  <div className="min-w-0"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mata Pelajaran</p><h1 className="text-base md:text-lg font-bold text-zinc-900 truncate">{selectedSubject.nama} — {selectedSubject.kelas}</h1></div>
                </div>
                <div className="flex items-center gap-2">
                  {["ujian","ulangan","latihan","kuis"].includes(activeTab) && (
                    <button onClick={()=>setShowContentModal(true)} className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm">
                      <Plus className="w-4 h-4"/>Tambah {TAB_LABELS[activeTab]}
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{label:"Total Soal",val:selectedSubject.totalSoal,icon:<FileText className="w-4 h-4 text-slate-400"/>},{label:"Ujian",val:selectedSubject.totalUjian,icon:<ClipboardList className="w-4 h-4 text-slate-400"/>},{label:"Siswa Aktif",val:0,icon:<Users className="w-4 h-4 text-slate-400"/>},{label:"Rata-rata",val:"0",icon:<TrendingUp className="w-4 h-4 text-slate-400"/>}].map(st=>(
                  <div key={st.label} className="bg-white border border-slate-200 rounded-xl p-3 md:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-2 mb-1">{st.icon}<p className="text-[11px] text-slate-400 font-medium">{st.label}</p></div>
                    <p className="text-xl md:text-2xl font-bold text-zinc-900">{st.val}</p>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto -mx-1 px-1">
                <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
                  {Object.entries(TAB_LABELS).map(([key,label])=>(
                    <button key={key} onClick={()=>{setActiveTab(key);setShowNilaiHasil(false);}} className={`px-3 py-2 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-all ${activeTab===key?"bg-white text-zinc-900 shadow-sm":"text-slate-500 hover:text-zinc-900"}`}>{label}</button>
                  ))}
                </div>
              </div>
              {(activeTab==="ujian"||activeTab==="ulangan"||activeTab==="latihan"||activeTab==="kuis")&&renderContentTable()}
              {activeTab==="soal" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="relative flex-1 max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5"/>
                      <input type="text" placeholder="Cari soal..." value={soalBankSearch} onChange={e=>setSoalBankSearch(e.target.value)} className="h-9 pl-8 pr-4 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 w-full"/>
                    </div>
                    <select value={soalBankTipe} onChange={e=>setSoalBankTipe(e.target.value)} className="h-9 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-white focus:outline-none">
                      <option value="">Semua Tipe</option><option value="PILIHAN_GANDA">Pilihan Ganda</option><option value="ESSAY">Essay</option>
                    </select>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <h3 className="font-semibold text-zinc-900 text-[13px]">Bank Soal</h3>
                      <span className="text-[11px] text-slate-400 font-medium">{soalBankList.length} soal</span>
                    </div>
                    {soalBankLoading ? (
                      <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-zinc-400"/></div>
                    ) : soalBankList.length===0 ? (
                      <div className="py-12 text-center"><FileText className="w-8 h-8 text-slate-200 mx-auto mb-2"/><p className="text-[13px] text-slate-400">Belum ada soal di bank soal ini</p><p className="text-[11px] text-slate-400 mt-1">Soal dibuat melalui tab Ujian/Latihan/Kuis</p></div>
                    ) : (
                      <div className="divide-y divide-slate-50">
                        {soalBankList.map((s,i)=>(
                          <div key={s.id} className="px-4 py-3.5 hover:bg-slate-50/50 flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] text-zinc-900 font-medium leading-snug">{s.pertanyaan}</p>
                              {s.gambarUrl && <img src={s.gambarUrl} alt="" className="mt-2 h-16 rounded-lg object-cover border border-slate-200"/>}
                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.tipe==="PILIHAN_GANDA"?"bg-blue-50 text-blue-600":"bg-amber-50 text-amber-600"}`}>{s.tipe==="PILIHAN_GANDA"?"Pilihan Ganda":"Essay"}</span>
                                {s.topik && <span className="text-[10px] text-slate-400">{s.topik}</span>}
                                {s.tipe==="PILIHAN_GANDA"&&s.jawabanBenar && <span className="text-[10px] text-slate-400">Jwb: <strong className="text-emerald-600">{s.jawabanBenar}</strong></span>}
                              </div>
                              {s.tipe==="PILIHAN_GANDA" && (
                                <div className="mt-2 grid grid-cols-2 gap-1">
                                  {[{key:"opsiA",label:"A"},{key:"opsiB",label:"B"},{key:"opsiC",label:"C"},{key:"opsiD",label:"D"},{key:"opsiE",label:"E"}].filter(o=>s[o.key]).map(o=>(
                                    <div key={o.key} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] ${s.jawabanBenar===o.label?"bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold":"bg-slate-50 text-slate-600"}`}>
                                      <span className="font-bold">{o.label}.</span>{s[o.key]}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-300 flex-shrink-0 mt-1">{new Date(s.createdAt).toLocaleDateString("id-ID",{day:"numeric",month:"short"})}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeTab==="nilai"&&renderNilaiTab()}
            </div>
          )}
        </div>
      </div>

      {/* ══ MODAL: Add Mapel ══ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0" onClick={()=>setShowAddModal(false)}/>
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between mb-5"><h3 className="text-base font-bold text-zinc-900">Tambah Mata Pelajaran</h3><button onClick={()=>setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4"/></button></div>
            <div className="space-y-4">
              <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama <span className="text-red-500">*</span></label><input type="text" placeholder="e.g. Matematika Peminatan" value={addForm.nama} onChange={e=>setAddForm({...addForm,nama:e.target.value})} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"/></div>
              <div>
                <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas <span className="text-red-500">*</span></label>
                <select value={addForm.kelas} onChange={e=>setAddForm({...addForm,kelas:e.target.value})} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white">
                  <option value="">Pilih kelas...</option>
                  <optgroup label="Kelas X"><option value="X IPA 1">X IPA 1</option><option value="X IPA 2">X IPA 2</option><option value="X IPS 1">X IPS 1</option><option value="X IPS 2">X IPS 2</option></optgroup>
                  <optgroup label="Kelas XI"><option value="XI IPA 1">XI IPA 1</option><option value="XI IPA 2">XI IPA 2</option><option value="XI IPS 1">XI IPS 1</option><option value="XI IPS 2">XI IPS 2</option></optgroup>
                  <optgroup label="Kelas XII"><option value="XII IPA 1">XII IPA 1</option><option value="XII IPA 2">XII IPA 2</option><option value="XII IPS 1">XII IPS 1</option><option value="XII IPS 2">XII IPS 2</option></optgroup>
                </select>
              </div>
              <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label><textarea placeholder="Deskripsi singkat..." value={addForm.deskripsi} onChange={e=>setAddForm({...addForm,deskripsi:e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none" rows={3}/></div>
              <div>
                <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Warna Tema</label>
                <div className="flex gap-2 flex-wrap">{Object.entries(COLORS).map(([key,c])=><button key={key} onClick={()=>setAddForm({...addForm,warna:key})} className={`w-8 h-8 rounded-full transition-all ${addForm.warna===key?"ring-2 ring-offset-2 ring-slate-400 scale-110":"hover:scale-105"}`} style={{background:c.hex}} title={key}/>)}</div>
              </div>
            </div>
            <div className="flex gap-3 mt-6"><button onClick={()=>setShowAddModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button><button onClick={handleAdd} disabled={!addForm.nama.trim()||!addForm.kelas.trim()} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800 disabled:opacity-40">Simpan</button></div>
          </div>
        </div>
      )}

      {/* ══ MODAL: Edit Mapel ══ */}
      {showEditModal&&editForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0" onClick={()=>setShowEditModal(false)}/>
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between mb-5"><h3 className="text-base font-bold text-zinc-900">Edit Mata Pelajaran</h3><button onClick={()=>setShowEditModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4"/></button></div>
            <div className="space-y-4">
              <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Nama</label><input type="text" value={editForm.nama} onChange={e=>setEditForm({...editForm,nama:e.target.value})} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20"/></div>
              <div>
                <label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Kelas</label>
                <select value={editForm.kelas} onChange={e=>setEditForm({...editForm,kelas:e.target.value})} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 bg-white">
                  <option value="">Pilih kelas...</option>
                  <optgroup label="Kelas X"><option value="X IPA 1">X IPA 1</option><option value="X IPA 2">X IPA 2</option><option value="X IPS 1">X IPS 1</option><option value="X IPS 2">X IPS 2</option></optgroup>
                  <optgroup label="Kelas XI"><option value="XI IPA 1">XI IPA 1</option><option value="XI IPA 2">XI IPA 2</option><option value="XI IPS 1">XI IPS 1</option><option value="XI IPS 2">XI IPS 2</option></optgroup>
                  <optgroup label="Kelas XII"><option value="XII IPA 1">XII IPA 1</option><option value="XII IPA 2">XII IPA 2</option><option value="XII IPS 1">XII IPS 1</option><option value="XII IPS 2">XII IPS 2</option></optgroup>
                </select>
              </div>
              <div><label className="text-[12px] font-semibold text-slate-600 mb-1.5 block">Deskripsi</label><textarea value={editForm.deskripsi||""} onChange={e=>setEditForm({...editForm,deskripsi:e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-zinc-900/20 resize-none" rows={3}/></div>
            </div>
            <div className="flex gap-3 mt-6"><button onClick={()=>setShowEditModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50">Batal</button><button onClick={handleEdit} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl text-[13px] font-bold hover:bg-zinc-800">Simpan</button></div>
          </div>
        </div>
      )}

      {/* ══ MODAL: Delete Mapel ══ */}
      {showDeleteModal&&targetMapel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={()=>{if(!deleteMapelLoading){setShowDeleteModal(false);setDeleteMapelDetail(null);}}}/>
          <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trash2 className="w-6 h-6 text-red-600"/></div>
            <h3 className="text-base font-bold text-zinc-900 text-center mb-1">Hapus Mata Pelajaran?</h3>
            <p className="text-[13px] font-semibold text-zinc-800 text-center mb-4">"{targetMapel.nama}"</p>
            {deleteMapelLoading ? <div className="flex flex-col items-center gap-2 py-4"><Loader2 className="w-5 h-5 animate-spin text-slate-400"/><p className="text-[11px] text-slate-400">Mengambil informasi data...</p></div>
            : deleteMapelDetail ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-[11px] font-bold text-red-700 mb-3 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5"/>Data yang akan ikut terhapus permanen:</p>
                <div className="space-y-2">
                  {[{label:"Ujian",val:deleteMapelDetail.totalUjian,icon:"📝"},{label:"Ulangan Harian",val:deleteMapelDetail.totalUlangan,icon:"📋"},{label:"Latihan",val:deleteMapelDetail.totalLatihan,icon:"💪"},{label:"Kuis",val:deleteMapelDetail.totalKuis,icon:"⚡"},{label:"Bank Soal",val:deleteMapelDetail.totalSoal,icon:"📚"}].map(item=>(
                    <div key={item.label} className="flex items-center justify-between"><span className="text-[12px] text-red-700 flex items-center gap-1.5"><span>{item.icon}</span>{item.label}</span><span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${item.val>0?"bg-red-200 text-red-800":"bg-slate-100 text-slate-400"}`}>{item.val} item</span></div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-red-200"><p className="text-[10px] text-red-600 font-semibold text-center">⚠️ Tindakan ini tidak dapat dibatalkan!</p></div>
              </div>
            ) : <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4"><p className="text-[12px] text-slate-500 text-center">Semua data terkait akan terhapus permanen.</p></div>}
            <div className="flex gap-3">
              <button onClick={()=>{setShowDeleteModal(false);setDeleteMapelDetail(null);}} disabled={deleteMapelLoading} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[13px] font-semibold hover:bg-slate-50 disabled:opacity-40">Batal</button>
              <button onClick={handleDelete} disabled={deleteMapelLoading} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-[13px] font-bold hover:bg-red-700 disabled:opacity-40 flex items-center justify-center gap-2">
                {deleteMapelLoading?<Loader2 className="w-4 h-4 animate-spin"/>:<Trash2 className="w-4 h-4"/>}Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL: Detail Ujian ══ */}
      {showDetailModal&&selectedUjian && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={()=>setShowDetailModal(false)}/>
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center"><ClipboardList className="w-4 h-4 text-zinc-600"/></div>
                <div><h3 className="text-[14px] font-bold text-zinc-900">Detail {TAB_LABELS[selectedUjian.tipe?.toLowerCase()]||"Ujian"}</h3><p className="text-[10px] text-slate-400">Informasi & Akses</p></div>
              </div>
              <button onClick={()=>setShowDetailModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X className="w-4 h-4"/></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nama</p><p className="font-bold text-zinc-900 text-[14px]">{selectedUjian.nama}</p></div>
                <div className="grid grid-cols-2 gap-3">
                  {[{icon:<Calendar className="w-3.5 h-3.5 text-slate-400"/>,label:"Tanggal",val:selectedUjian.tanggalMulai?new Date(selectedUjian.tanggalMulai).toLocaleDateString("id-ID"):"—"},{icon:<Clock className="w-3.5 h-3.5 text-slate-400"/>,label:"Durasi",val:`${selectedUjian.durasi} menit`},{icon:<FileText className="w-3.5 h-3.5 text-slate-400"/>,label:"Total Soal",val:`${selectedUjian.soalList?.length??selectedUjian.totalSoal} soal`},{icon:<Users className="w-3.5 h-3.5 text-slate-400"/>,label:"Peserta",val:selectedUjian.peserta}].map(it=>(
                    <div key={it.label} className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">{it.icon}</div>
                      <div><p className="text-[9px] text-slate-400 font-semibold uppercase">{it.label}</p><p className="text-[12px] font-semibold text-zinc-700">{it.val}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-emerald-100 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
                  <div><p className="text-[11px] font-bold text-emerald-700">Preview Soal & Kunci Jawaban</p><p className="text-[10px] text-emerald-600 mt-0.5">Tampilan khusus guru, kunci tidak terlihat oleh siswa.</p></div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-700">{selectedUjian.soalList?.length??0} soal</span>
                    <button type="button" onClick={()=>setShowSoalPreview(show=>!show)} aria-expanded={showSoalPreview} className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-white px-2 py-1 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100">
                      {showSoalPreview?<EyeOff className="w-3 h-3"/>:<Eye className="w-3 h-3"/>}{showSoalPreview?"Hide":"Tampilkan"}
                    </button>
                  </div>
                </div>
                {showSoalPreview&&!selectedUjian.soalList?.length ? <p className="p-4 text-[12px] text-slate-400 text-center">Belum ada soal pada ujian ini.</p> : showSoalPreview ? (
                  <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-100">
                    {selectedUjian.soalList?.map((soal,index)=>(
                      <article key={soal.id} className="p-4 space-y-3">
                        <div className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{index+1}</span><div className="min-w-0 flex-1"><p className="text-[13px] font-medium text-zinc-900 leading-relaxed">{soal.pertanyaan}</p>{soal.topik&&<p className="mt-1 text-[10px] text-slate-400">{soal.topik}</p>}</div></div>
                        {soal.gambar&&<img src={soal.gambar} alt={`Gambar soal ${index+1}`} className="max-h-48 rounded-lg border border-slate-200 object-contain"/>}
                        {soal.tipe==="pg"&&<div className="grid gap-1.5 sm:grid-cols-2">{soal.opsi.map((opsi,opsiIndex)=>{const label=String.fromCharCode(65+opsiIndex);const isCorrect=soal.jawaban===label;return <div key={`${label}-${opsi}`} className={`rounded-lg border px-2.5 py-2 text-[11px] ${isCorrect?"border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold":"border-slate-100 bg-slate-50 text-slate-600"}`}><strong>{label}.</strong> {opsi}</div>;})}</div>}
                        <p className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700"><CheckCircle className="w-3.5 h-3.5"/>Kunci jawaban: {soal.jawaban||"Belum diisi"}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2"><ExternalLink className="w-3.5 h-3.5 text-blue-500"/><p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Link Akses Siswa</p></div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0 bg-white border border-blue-200 rounded-lg px-3 py-2"><p className="text-[11px] font-mono text-blue-700 truncate">{selectedUjian.linkSiswa}</p></div>
                  <button onClick={()=>copyToClipboard(selectedUjian.linkSiswa,"link")} className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedLink?"bg-emerald-500 text-white":"bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}>
                    {copiedLink?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>}{copiedLink?"Disalin!":"Salin"}
                  </button>
                </div>
                <a href={selectedUjian.linkPreview} target="_blank" rel="noopener noreferrer" className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"><ExternalLink className="w-3 h-3"/>Buka Preview Ujian</a>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2"><Hash className="w-3.5 h-3.5 text-amber-500"/><p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Token Ujian</p></div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0 bg-white border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <p className={`text-[13px] font-mono font-bold tracking-widest flex-1 ${showToken?"text-amber-700":"text-amber-200 select-none"}`}>{showToken?selectedUjian.token:selectedUjian.token.replace(/[A-Z0-9]/g,"•")}</p>
                    <button onClick={()=>setShowToken(!showToken)} className="text-amber-400 hover:text-amber-600">{showToken?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
                  </div>
                  <button onClick={()=>copyToClipboard(selectedUjian.token,"token")} className={`flex-shrink-0 h-9 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all ${copiedToken?"bg-emerald-500 text-white":"bg-white border border-amber-200 text-amber-700 hover:bg-amber-50"}`}>
                    {copiedToken?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>}{copiedToken?"Disalin!":"Salin"}
                  </button>
                </div>
                <p className="text-[10px] text-amber-600 mt-2">⚠️ Bagikan token hanya kepada siswa yang berhak.</p>
              </div>
            </div>
            <div className="p-5 pt-0"><button onClick={()=>setShowDetailModal(false)} className="w-full h-10 border border-slate-200 rounded-xl text-[13px] font-semibold text-zinc-700 hover:bg-slate-50">Tutup</button></div>
          </div>
        </div>
      )}

      {showContentModal && <AddContentModal activeTab={activeTab} onClose={()=>setShowContentModal(false)} onSave={handleSaveContent}/>}
      {showKelolaSoal&&selectedUjian && <KelolaSoalModal ujian={selectedUjian} onClose={()=>{setShowKelolaSoal(false);setSelectedUjian(null);}} onUpdate={handleUpdateSoal}/>}
      {showEditUjianModal&&targetUjian && <EditUjianModal ujian={targetUjian} onClose={()=>{setShowEditUjianModal(false);setTargetUjian(null);}} onSave={handleEditUjian}/>}
      {showDeleteUjianModal&&targetUjian && <DeleteUjianModal ujian={targetUjian} onClose={()=>{setShowDeleteUjianModal(false);setTargetUjian(null);}} onDelete={handleDeleteUjian}/>}
      {showHasilModal&&hasilUjianTarget && <HasilUjianModal ujian={hasilUjianTarget} onClose={()=>{setShowHasilModal(false);setHasilUjianTarget(null);}}/>}
    </div>
  );
}
