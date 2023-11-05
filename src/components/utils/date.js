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

function formatWaktuArtikel(rawDate) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const date = new Date(rawDate);
  const day = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  let ampm = "WIB";

  // Konversi jam ke format 12 jam
  if (hours > 12) {
    hours -= 12;
    ampm = "WITA";
  } else if (hours === 12) {
    ampm = "WITA";
  }

  // Tambahkan nol di depan jam dan menit jika kurang dari 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedDate = `${day}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes} ${ampm}`;
  return formattedDate;
}

export { ubahFormatDate as default, formatWaktuArtikel };
