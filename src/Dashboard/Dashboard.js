/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import TopUp from "./TopUp";
import Transaction from "./Transaction";
import Account from "./Account";
import ProfileCard from "../components/ProfileCard ";
import { isEmpty } from "lodash";
import DashboardApis from "../services/DashboardApis";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfile,
  setService,
  setBanner,
  setBalance,
  setLoading,
  setError,
  setPayment,
  setActiveTab,
} from "../store/slices/dashboardSlice";
import Skeleton from "react-loading-skeleton";
import { MdMoney } from "react-icons/md";
import { formatRupiah } from "../components/formatRupiah ";
import Swal from "sweetalert2";

const tabs = [
  { name: "Top Up", value: "topUp" },
  { name: "Transaction", value: "transaction" },
  { name: "Akun", value: "akun" },
];

const Payment = () => {
  const dispatch = useDispatch();
  const { payment, loading } = useSelector((state) => state.dashboard);

  // Function to make payment
  const handlePayment = async () => {
    Swal.fire({
      title: "Konfirmasi Pembayaran",
      text: `Apakah Anda yakin ingin membayar sebesar Rp ${formatRupiah(
        payment?.service_tariff
      )}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Bayar",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        try {
          const response = await DashboardApis.Transaction({
            service_code: payment.service_code,
          });

          Swal.fire({
            icon: "success",
            title: "Pembayaran Berhasil",
            text: response?.message || "Pembayaran berhasil dilakukan",
          }).then(() => {
            dispatch(setActiveTab("dashboard"));
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Pembayaran Gagal",
            text:
              error?.response?.data?.message || "Terjadi kesalahan, coba lagi.",
          });
        } finally {
          dispatch(setLoading(false));
        }
      }
    });
  };

  return (
    <div className="mt-5">
      <label>Pembayaran</label>
      <div className="mt-2">
        <img
          src={payment?.service_icon}
          alt={payment?.service_name}
          loading="lazy"
          className="img-hover-shadow"
          style={{
            maxWidth: "50px",
            cursor: "pointer",
            height: "auto",
          }}
        />
        <label style={{ marginLeft: 10 }} className="fw-bold">
          {payment?.service_name}
        </label>
        <div className="row mt-5">
          <div className="col-12">
            <div className="mb-2">
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    borderRight: "none",
                    color: "#bebcbc",
                    fontSize: 12,
                  }}
                >
                  <MdMoney />
                </span>
                <input
                  type="text"
                  className="form-control input-disabled"
                  disabled
                  value={formatRupiah(payment?.service_tariff)}
                  style={{ borderLeft: "none", fontSize: 12 }}
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-3 btn btn-white w-100 text-danger mb-2"
              style={{ fontSize: 12, borderColor: "rgb(244 45 45 / 95%)" }}
              onClick={() => handlePayment()}
              disabled={loading}
            >
              {loading ? "Loading..." : "Bayar"}
            </button>
            <button
              type="submit"
              className="btn w-100 text-white mb-3"
              onClick={() => dispatch(setActiveTab("dashboard"))}
              style={{ fontSize: 12, backgroundColor: "rgb(244 45 45 / 95%)" }}
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const dispatch = useDispatch();

  const {
    profileImage,
    data,
    balance,
    service,
    banner,
    activeTab,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  // Function to retrieve dashboard data
  const fetchDashboardData = () => {
    dispatch(setLoading(true));

    Promise.all([
      DashboardApis.getProfile(),
      DashboardApis.getService(),
      DashboardApis.getBanner(),
      DashboardApis.getBalance(),
    ])
      .then(
        ([
          profileResponse,
          serviceResponse,
          bannerResponse,
          balanceResponse,
        ]) => {
          const { data } = profileResponse?.data;

          dispatch(
            setProfile({
              data: data,
              profile_image: data?.profile_image?.includes("/null")
                ? "/assets/Profile-Photo.png"
                : data?.profile_image,
            })
          );
          dispatch(setService(serviceResponse?.data?.data || []));
          dispatch(setBanner(bannerResponse?.data?.data || []));
          dispatch(setBalance(balanceResponse?.data?.data || {}));
        }
      )
      .catch(() => {
        dispatch(setError("Failed to load dashboard data"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  // Function to handle clicks on the service
  const handlePayment = (code) => {
    dispatch(setActiveTab("payment"));

    let newObj = service.find((res) => res.service_code === code);
    dispatch(setPayment(newObj));
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ProfileCard
        profileImage={profileImage}
        firstName={data?.first_name}
        lastName={data?.last_name}
        balance={balance}
        loading={loading}
      />

      {activeTab !== "payment" ? (
        <>
          {/* Services */}
          <div className="row mt-5">
            {loading
              ? Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="col-6 col-md-3 d-flex flex-column align-items-center justify-content-center text-center h-100"
                    >
                      <Skeleton height={50} width={70} />
                      <Skeleton width={70} height={20} className="mt-3" />
                    </div>
                  ))
              : !isEmpty(service) &&
                service.map((res, index) => (
                  <div
                    key={index}
                    className="col-lg-1 col-3 col-md-3 d-flex flex-column align-items-center justify-content-center text-center h-100 mb-2"
                  >
                    <img
                      src={res?.service_icon}
                      alt={res?.service_name}
                      onClick={() => handlePayment(res?.service_code)}
                      loading="lazy"
                      className="img-hover-shadow"
                      style={{
                        maxWidth: "100%",
                        cursor: "pointer",
                        height: "auto",
                      }}
                    />
                    <label className="mt-3" style={{ fontSize: 12 }}>
                      {res?.service_name}
                    </label>
                  </div>
                ))}
          </div>

          {/* Banner */}
          <>
            <div className="my-3">Temukan Promo Menarik</div>
            <div
              style={{
                gap: "1rem",
                scrollbarWidth: "none",
              }}
              className="hide-scrollbar d-flex overflow-auto hide-scrollbar"
            >
              {loading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "400px",
                          height: "140px",
                          cursor: "pointer",
                        }}
                      >
                        <Skeleton
                          width={400}
                          height={140}
                          borderRadius={10}
                          containerClassName="img-hover-shadow"
                        />
                      </div>
                    ))
                : !isEmpty(banner) &&
                  banner.map((res, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "400px",
                        height: "140px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={res?.banner_image}
                        alt={res?.banner_name}
                        className="img-hover-shadow"
                        style={{
                          maxWidth: "400px",
                          height: "auto",
                          borderRadius: 10,
                        }}
                      />
                    </div>
                  ))}
            </div>
          </>
        </>
      ) : (
        <Payment />
      )}
    </>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.dashboard);

  const tabContent = {
    topUp: <TopUp />,
    transaction: <Transaction />,
    akun: <Account />,
  };

  const renderContent = tabContent[activeTab] || <DashboardPage />;

  return (
    <>
      <Navigation
        setActiveTab={(tab) => dispatch(setActiveTab(tab))}
        tabs={tabs}
        activeTab={activeTab}
      />
      <div className="container mt-5">{renderContent}</div>
    </>
  );
};

export default Dashboard;
