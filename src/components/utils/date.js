const ubahFormatDate = (tanggalWaktuAwal) => {
  const tanggalWaktu = new Date(tanggalWaktuAwal);

  const hari = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const bulan = [
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

  const hariOfWeek = hari[tanggalWaktu.getDay()];
  const tanggalBulanTahun = `${tanggalWaktu.getDate()} ${
    bulan[tanggalWaktu.getMonth()]
  } ${tanggalWaktu.getFullYear()}`;

  const hasilAkhir = `${hariOfWeek}, ${tanggalBulanTahun}`;

  return hasilAkhir;
};

export default ubahFormatDate;
