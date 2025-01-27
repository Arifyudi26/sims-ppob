import React from "react";
import ProfileCard from "../components/ProfileCard ";
import InputWithIcon from "../components/input/InputWithIcon";
import { useDispatch, useSelector } from "react-redux";
import { setAmount, resetForm, setLoading } from "../store/slices/topUpSlice";
import { MdMoney } from "react-icons/md";
import Swal from "sweetalert2";
import DashboardApis from "../services/DashboardApis";
import { formatRupiah } from "../components/formatRupiah ";
import { setBalance } from "../store/slices/dashboardSlice";

function TopUp() {
  const dispatch = useDispatch();
  const { profileImage, data, balance } = useSelector(
    (state) => state.dashboard
  );
  const { amount, loading } = useSelector((state) => state.topUp);

  // Function to handle clicks on the specified top up amount
  const handleAmountClick = (value) => {
    dispatch(setAmount(value));
  };

  const minAmount = 10000;
  const maxAmount = 1000000;

  // Function to handle the top up form submission process
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    // Validate top up amount that is less than the minimum value
    if (amount < minAmount) {
      Swal.fire({
        title: "Invalid Amount!",
        text: `Minimum nominal yang diterima untuk proses top up adalah Rp${minAmount.toLocaleString(
          "id-ID"
        )}.`,
        icon: "warning",
        button: "OK",
      });
      return;
    }

    // Validate top up amount that is greater than the maximum value
    if (amount > maxAmount) {
      Swal.fire({
        title: "Invalid Amount!",
        text: `Maksimum nominal yang diterima untuk proses top up adalah Rp${maxAmount.toLocaleString(
          "id-ID"
        )}.`,
        icon: "warning",
        button: "OK",
      });
      return;
    }

    try {
      const response = await DashboardApis.topUp({
        top_up_amount: amount,
      });

      const message = response?.data?.message || "Top up berhasil!";

      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        button: "OK",
      }).then(() => {
        dispatch(resetForm());
        dispatch(setBalance({ balance: response?.data?.data?.balance }));
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again later.";

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        button: "OK",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Function to handle changes to the top up nominal input
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    dispatch(setAmount(parseInt(rawValue)));
  };

  return (
    <>
      <ProfileCard
        profileImage={profileImage}
        firstName={data.first_name}
        lastName={data.last_name}
        balance={balance}
      />

      <div className="mt-3 mb-4">
        <label className="mt-3">Silahkan Masukan</label>
        <h4 className="mt-1">Nominal Top Up</h4>
      </div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-lg-9 col-12">
            <div className="mb-2">
              <InputWithIcon
                icon={<MdMoney />}
                type="text"
                placeholder="Masukkan Nominal Top Up"
                maxLength={8}
                value={formatRupiah(amount)}
                onChange={handleChange}
              />
              {amount > maxAmount && (
                <div
                  style={{
                    fontSize: 8,
                    marginLeft: 2,
                    color: "red",
                    marginTop: 2,
                  }}
                >
                  Maksimal Nominal Rp1.000.000
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn w-100 text-white mb-3"
              disabled={!amount || loading}
              style={{ fontSize: 12, backgroundColor: "rgb(244 45 45 / 95%)" }}
            >
              {!loading ? "Top Up" : "Loading..."}
            </button>
          </div>

          <div className="col-lg-3 col-12">
            <div className="d-flex flex-wrap justify-content-start">
              {[100000, 250000, 500000, 10000, 20000, 50000].map(
                (amount, index) => (
                  <div
                    key={index}
                    onClick={() => handleAmountClick(amount)}
                    className="border border-muted rounded-3 d-flex justify-content-center align-items-center img-hover-shadow mb-2"
                    style={{
                      height: "32px",
                      width: "80px",
                      marginRight: 5,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Rp{formatRupiah(amount)}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default TopUp;
