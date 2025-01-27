import React, { useEffect } from "react";
import ProfileCard from "../components/ProfileCard ";
import { formatRupiah } from "../components/formatRupiah ";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { isEmpty } from "lodash";
import DashboardApis from "../services/DashboardApis";
import {
  setHistory,
  setLoading,
  setOffset,
} from "../store/slices/transactionSlice";
import Skeleton from "react-loading-skeleton";

function Transaction() {
  const dispatch = useDispatch();

  const { profileImage, data, balance } = useSelector(
    (state) => state.dashboard
  );

  const { history, loading, offset } = useSelector(
    (state) => state.transaction
  );

  const limit = 5;

  // Function to retrieve transaction history data from API
  const getHistory = async (offset) => {
    dispatch(setLoading(true));
    let param = { params: { offset, limit } };
    try {
      const getHistoryResponse = await DashboardApis.getHistory(param);
      if (offset === 0) {
        dispatch(setHistory(getHistoryResponse.data.data.records));
      } else {
        dispatch(
          setHistory([...history, ...getHistoryResponse.data.data.records])
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setOffset(0));
    getHistory(0);
  }, [dispatch]);

  // Function to load more transactions
  const handleShowMore = () => {
    dispatch(setOffset(offset + limit));
    getHistory(offset + limit);
  };

  return (
    <>
      <ProfileCard
        profileImage={profileImage}
        firstName={data.first_name}
        lastName={data.last_name}
        balance={balance}
      />
      <div className="mt-3">
        <label className="my-3 fw-bold">Semua Transaksi</label>
        <div className="row">
          {loading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <div className="col-12 col-md-6 col-lg-12 m-1" key={index}>
                  <div className="row border rounded-3 border-muted">
                    <div className="col-6 text-start">
                      <Skeleton width={100} height={20} />
                      <Skeleton width={200} height={15} className="mt-1" />
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                      <Skeleton width={150} height={15} />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            !isEmpty(history) &&
            history.map((res, index) => {
              return (
                <div className="col-12 col-md-6 col-lg-12 m-1" key={index}>
                  <div className="row border rounded-3 border-muted">
                    <div className="col-6 text-start">
                      <div
                        className={`${
                          res?.total_amount > 0 ? "text-success" : "text-danger"
                        } fw-bold fs-5`}
                      >
                        {res?.total_amount > 0 ? "+" : "-"}{" "}
                        {formatRupiah(Math.abs(res?.total_amount || 0))}
                      </div>
                      <div
                        className="mt-1"
                        style={{ color: "#bebcbc", fontSize: 12 }}
                      >
                        {moment(res?.created_on).format("DD MMMM YYYY HH:mm")}{" "}
                        WIB
                      </div>
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                      <span style={{ fontSize: 12 }}>{res?.description}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {history.length > 0 && !loading && (
            <div
              onClick={handleShowMore}
              className="d-flex justify-content-center align-items-center my-3"
              style={{
                cursor: "pointer",
                color: "rgb(244 45 45 / 95%)",
              }}
            >
              <div className="fs-6 fw-bold">Show more</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Transaction;
