function ubahFormatTanggal(tanggalISO) {
  const daftarHari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const daftarBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const tanggalAwal = new Date(tanggalISO);
  const hari = daftarHari[tanggalAwal.getUTCDay()];
  const tanggal = tanggalAwal.getUTCDate();
  const bulan = daftarBulan[tanggalAwal.getUTCMonth()];
  const tahun = tanggalAwal.getUTCFullYear();

  return `${hari}, ${tanggal} ${bulan} ${tahun}`;
}

export default ubahFormatTanggal;
