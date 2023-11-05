const ubahFormatDate = (tanggalWaktuAwal) => {
  const tanggalWaktu = new Date(tanggalWaktuAwal);

  const hari = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

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

const formatWaktuArtikel = (tanggalWaktuAwal) => {
  const tanggalWaktu = new Date(tanggalWaktuAwal);

  const hari = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

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

  const jam = tanggalWaktu.getHours();
  const menit = tanggalWaktu.getMinutes();
  const detik = tanggalWaktu.getSeconds();

  const jamFormatted = jam.toString().padStart(2, "0");
  const menitFormatted = menit.toString().padStart(2, "0");
  const detikFormatted = detik.toString().padStart(2, "0");

  const waktu = `${jamFormatted}:${menitFormatted}:${detikFormatted} WIB`;

  const hasilAkhir = `${hariOfWeek}, ${tanggalBulanTahun} (${waktu})`;

  return hasilAkhir;
};

export { ubahFormatDate as default, formatWaktuArtikel };
