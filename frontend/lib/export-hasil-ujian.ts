type HasilSiswa = {
  nisn: string;
  nama: string;
  kelas: string;
  nilai: number;
  benar: number;
  salah: number;
  lulus: boolean;
  pelanggaran: number;
};

type AnalisisSoal = {
  nomorSoal: number;
  jumlahBenar: number;
  jumlahSalah: number;
  kesukaran: number;
  kategori: string;
  reliabilitas: number | null;
};

type HasilUjianExport = {
  summary: {
    rataRata: number;
    tertinggi: number;
    terendah: number;
    lulus: number;
    gagal: number;
    totalSiswa: number;
  };
  siswa: HasilSiswa[];
  analisisSoal: {
    totalPeserta: number;
    data: AnalisisSoal[];
  };
};

const headerFill = "1F4E78";
const categoryColors: Record<string, string> = {
  Sukar: "DC2626",
  Sedang: "D97706",
  Mudah: "059669",
};

function styleHeader(row: import("exceljs").Row) {
  row.font = { bold: true, color: { argb: "FFFFFFFF" } };
  row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${headerFill}` } };
  row.alignment = { vertical: "middle", horizontal: "center" };
}

export async function exportHasilUjianToExcel(data: HasilUjianExport, ujianNama: string) {
  const ExcelJS = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Sistem Penilaian Siswa";
  workbook.created = new Date();

  const hasilSheet = workbook.addWorksheet("Hasil Ujian");
  hasilSheet.mergeCells("A1:I1");
  hasilSheet.getCell("A1").value = `HASIL UJIAN - ${ujianNama}`;
  hasilSheet.getCell("A1").font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  hasilSheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${headerFill}` } };
  hasilSheet.getCell("A1").alignment = { horizontal: "center" };
  hasilSheet.addRow([]);
  const hasilHeader = hasilSheet.addRow(["No", "NISN", "Nama", "Kelas", "Nilai", "Benar", "Salah", "Status", "Pelanggaran"]);
  styleHeader(hasilHeader);
  data.siswa.forEach((siswa, index) => {
    hasilSheet.addRow([
      index + 1, siswa.nisn, siswa.nama, siswa.kelas, siswa.nilai, siswa.benar, siswa.salah,
      siswa.lulus ? "LULUS" : "TIDAK LULUS", siswa.pelanggaran,
    ]);
  });
  hasilSheet.addRow([]);
  hasilSheet.addRow(["RINGKASAN"]);
  [
    ["Total Peserta", data.summary.totalSiswa],
    ["Rata-rata Nilai", data.summary.rataRata],
    ["Nilai Tertinggi", data.summary.tertinggi],
    ["Nilai Terendah", data.summary.terendah],
    ["Lulus", data.summary.lulus],
    ["Tidak Lulus", data.summary.gagal],
  ].forEach((row) => hasilSheet.addRow(row));
  hasilSheet.columns = [
    { width: 7 }, { width: 18 }, { width: 28 }, { width: 12 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 16 }, { width: 14 },
  ];
  hasilSheet.views = [{ state: "frozen", ySplit: 3 }];

  const analysisSheet = workbook.addWorksheet("Analisis Soal");
  analysisSheet.mergeCells("A1:F1");
  analysisSheet.getCell("A1").value = `ANALISIS TINGKAT KESUKARAN - ${ujianNama}`;
  analysisSheet.getCell("A1").font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  analysisSheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${headerFill}` } };
  analysisSheet.getCell("A1").alignment = { horizontal: "center" };
  analysisSheet.mergeCells("A2:F2");
  analysisSheet.getCell("A2").value = `Peserta yang dianalisis: ${data.analisisSoal.totalPeserta}. Kesukaran = proporsi peserta yang menjawab benar. Reliabilitas = korelasi point-biserial.`;
  analysisSheet.getCell("A2").font = { italic: true, size: 10, color: { argb: "FF475569" } };
  analysisSheet.addRow([]);
  const analysisHeader = analysisSheet.addRow(["Nomor Soal", "Jumlah Benar", "Jumlah Salah", "Kesukaran", "Kategori", "Reliabilitas"]);
  styleHeader(analysisHeader);
  data.analisisSoal.data.forEach((item) => {
    const row = analysisSheet.addRow([
      item.nomorSoal,
      item.jumlahBenar,
      item.jumlahSalah,
      item.kesukaran,
      item.kategori,
      item.reliabilitas,
    ]);
    row.getCell(4).numFmt = "0.0%";
    row.getCell(6).numFmt = "0.000";
    row.getCell(5).font = { bold: true, color: { argb: `FF${categoryColors[item.kategori]}` } };
  });
  analysisSheet.columns = [{ width: 14 }, { width: 15 }, { width: 15 }, { width: 14 }, { width: 13 }, { width: 14 }];
  analysisSheet.views = [{ state: "frozen", ySplit: 4 }];

  analysisSheet.mergeCells("H1:AC1");
  analysisSheet.getCell("H1").value = "GRAFIK BATANG TINGKAT KESUKARAN";
  analysisSheet.getCell("H1").font = { bold: true, color: { argb: "FFFFFFFF" } };
  analysisSheet.getCell("H1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${headerFill}` } };
  analysisSheet.getCell("H1").alignment = { horizontal: "center" };
  analysisSheet.getCell("H2").value = "0%";
  analysisSheet.getCell("R2").value = "50%";
  analysisSheet.getCell("AC2").value = "100%";
  analysisSheet.getCell("H3").value = "Soal";
  analysisSheet.getCell("I3").value = "Persentase";
  for (let column = 8; column <= 29; column++) {
    const cell = analysisSheet.getRow(3).getCell(column);
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${headerFill}` } };
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
  }
  data.analisisSoal.data.forEach((item, index) => {
    const rowNumber = index + 4;
    const barLength = Math.round(item.kesukaran * 20);
    analysisSheet.getCell(rowNumber, 8).value = `Soal ${item.nomorSoal}`;
    analysisSheet.getCell(rowNumber, 9).value = item.kesukaran;
    analysisSheet.getCell(rowNumber, 9).numFmt = "0.0%";
    for (let barColumn = 10; barColumn <= 29; barColumn++) {
      const cell = analysisSheet.getCell(rowNumber, barColumn);
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: `FF${barColumn - 10 < barLength ? categoryColors[item.kategori] : "E2E8F0"}` },
      };
    }
  });
  analysisSheet.getColumn(8).width = 12;
  analysisSheet.getColumn(9).width = 12;
  for (let column = 10; column <= 29; column++) analysisSheet.getColumn(column).width = 2.4;

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Hasil_${ujianNama.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
