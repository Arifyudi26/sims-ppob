export const formatRupiah = (amount) => {
  if (amount === undefined || amount === null) {
    return "";
  }
  const numberString = amount.toString();
  const split = numberString.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] ? rupiah + "," + split[1] : rupiah;
  return rupiah;
};
