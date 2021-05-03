import React, { useRef, useState } from "react";
import avatar from "../../../assets/images/users/avatar.jpg";
import ICONS from "../../../components/Common/icons";
import Notify from "../../../components/Common/notification";
import { profile, site } from "../../../helpers/endpoints";
import { patchMultipartItem } from "../../../helpers/requests_helper";
import { HTTPSTATUS, prettifyJsonStr } from "../../../helpers/utility";

const ProfilePic = (props) => {
  const localProfPic = localStorage.getItem("avatar"); // get stored profile pic src

  const getProfPicSrc =
    localProfPic !== "null" ? `${site}${localProfPic}` : avatar;
  // set profile pic
  const [profilePic, setProfilePic] = useState(getProfPicSrc);
  // actions states
  const [saving, toggleSaving] = useState(false);
  const [uploaded, toggleUploaded] = useState(false);

  let formData = useRef(new FormData()); // form data used to upload profile image

  const handlePicUpload = () => {
    let inputElement = document.createElement("input");

    inputElement.type = "file";
    inputElement.accept = "image/*";

    inputElement.addEventListener("change", (ev) => showPreview(ev));

    inputElement.dispatchEvent(new MouseEvent("click"));
  };

  const showPreview = (ev) => {
    if (ev.target.files.length > 0) {
      let src = URL.createObjectURL(ev.target.files[0]);

      formData.current.set("profile_picture", ev.target.files[0]);

      setProfilePic(src);
      toggleUploaded(true);
    }
  };

  const saveChanges = async () => {
    toggleSaving(true);

    const resObj = await patchMultipartItem(
      profile,
      props.token,
      formData.current
    );

    if (resObj.status === HTTPSTATUS.ok) {
      Notify(
        "Congrats",
        "your profile picture has been updated successfuly",
        "success"
      );
      localStorage.setItem("avatar", resObj.body.profile_picture);
      setProfilePic(getProfPicSrc);
    } else {
      setProfilePic(getProfPicSrc);
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
    }

    toggleSaving(false);
    toggleUploaded(false);
  };

  return (
    <div className="cuddler">
      <div className="prof-div">
        <img
          src={profilePic}
          alt=""
          className="avatar-md rounded-circle img-thumbnail prof-image"
        />
      </div>
      <div className="middle">
        {saving ? (
          <div className="spinner-border text-primary m-1" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <React.Fragment>
            <div className="text-on-img">
              <i
                className={`${ICONS.penIcon} fa-lg`}
                title="edit"
                onClick={handlePicUpload}
              ></i>
            </div>
            <br></br>
            {uploaded ? (
              <div className="text-on-img">
                <i
                  className={`${ICONS.saveIcon} fa-2x`}
                  title="save"
                  onClick={saveChanges}
                ></i>
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ProfilePic;
