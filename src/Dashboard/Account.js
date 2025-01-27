import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import InputWithIcon from "../components/input/InputWithIcon";
import { FaRegUser } from "react-icons/fa";
import { setProfile } from "../store/slices/dashboardSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DashboardApis from "../services/DashboardApis";

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileImage, data } = useSelector((state) => state.dashboard);
  const [isEdit, setIsEdit] = useState(false);

  // Function to handle profile picture upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file size is larger than 100 KB
      if (file.size > 100 * 1024) {
        Swal.fire({
          icon: "error",
          title: "Ukuran gambar terlalu besar!",
          text: "Ukuran gambar harus kurang dari 100 KB.",
          confirmButtonText: "Oke",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await DashboardApis.uploadImage(formData);

        if (response.status === 200) {
          dispatch(
            setProfile({
              data: data,
              profile_image: response?.data?.data?.profile_image,
            })
          );
          Swal.fire({
            icon: "success",
            title: "Gambar berhasil diperbarui!",
            text: response?.data?.message,
            confirmButtonText: "Oke",
          });
        } else {
          throw new Error("Gagal memperbarui gambar");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan saat memperbarui gambar!",
          text: error.message || "Terjadi kesalahan saat memperbarui gambar.",
          confirmButtonText: "Coba Lagi",
        });
      }
    }
  };

  // Function to handle input changes (first name/last name)
  const handleInputChange = (value, field) => {
    dispatch(
      setProfile({
        data: {
          ...data,
          [field]: value,
        },
        profile_image: profileImage,
      })
    );
  };

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/auth/sign-in");
  };

  // Function to send profile change form
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await DashboardApis.updateProfile({
        first_name: data.first_name,
        last_name: data.last_name,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: response?.data?.message,
          icon: "success",
          button: "OK",
        }).then(() => {
          setIsEdit(!isEdit);
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response?.data?.message,
          icon: "error",
          button: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "93vh",
        overflow: "hidden",
      }}
    >
      <div className="text-center" style={{ maxWidth: "700px", width: "100%" }}>
        <div className="d-flex align-items-center mb-3 justify-content-center">
          <img
            src={profileImage}
            alt="Avatar"
            className="img-profile rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
          <label
            htmlFor="profileImageUpload"
            style={{
              cursor: "pointer",
              border: "2px solid #ccc",
              borderRadius: "50%",
              padding: "5px",
              height: 25,
              width: 25,
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: -25,
              marginTop: 60,
            }}
          >
            <FaPen size={10} color="grey" />
          </label>
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <h3>
          {data?.first_name} {data?.last_name}
        </h3>
        <form className="mt-4">
          <div className="form-group mb-4">
            <label htmlFor="email" style={{ float: "left", marginBottom: 6 }}>
              Email
            </label>
            <InputWithIcon
              icon="@"
              type="email"
              placeholder="walid@visutech.com"
              value={data?.email}
              disabled
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" style={{ float: "left", marginBottom: 6 }}>
              Nama Depan
            </label>
            <InputWithIcon
              icon={<FaRegUser />}
              type="text"
              placeholder="Kristianto"
              value={data?.first_name}
              onChange={(e) => handleInputChange(e.target.value, "first_name")}
              disabled={!isEdit}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" style={{ float: "left", marginBottom: 6 }}>
              Nama Belakang
            </label>
            <InputWithIcon
              icon={<FaRegUser />}
              type="text"
              placeholder="Wibowo"
              value={data?.last_name}
              onChange={(e) => handleInputChange(e.target.value, "last_name")}
              disabled={!isEdit}
            />
          </div>
          {!isEdit ? (
            <>
              <button
                type="button"
                className="btn btn-white w-100 text-danger mb-2 border-danger"
                style={{ fontSize: 12 }}
                onClick={() => setIsEdit(!isEdit)}
              >
                Edit Profile
              </button>
              <button
                onClick={() => handleLogout()}
                style={{
                  fontSize: 12,
                  backgroundColor: "rgb(244 45 45 / 95%)",
                }}
                type="button"
                className="btn w-100 text-white mb-3"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                style={{
                  fontSize: 12,
                }}
                onClick={(e) => onSubmit(e)}
                className="btn btn-white w-100 text-danger mb-2 border-danger"
              >
                Simpan
              </button>
              <button
                type="button"
                style={{
                  fontSize: 12,
                  backgroundColor: "rgb(244 45 45 / 95%)",
                }}
                onClick={() => setIsEdit(!isEdit)}
                className="btn  w-100 text-white mb-3"
              >
                Batalkan
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Account;
