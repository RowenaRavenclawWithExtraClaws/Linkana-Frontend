import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import CustomButton from "../../../components/Common/customButton";
import NavigationBar from "../../../components/Common/NavigationBar";
import Notify from "../../../components/Common/notification";
import { profile } from "../../../helpers/endpoints";
import { patchMultipartItem, putItem } from "../../../helpers/requests_helper";
import { code, HTTPSTATUS, prettifyJsonStr } from "../../../helpers/utility";

const ProfileInfo = (props) => {
  const [activeTab, switchTab] = useState("0");

  const titles = ["Basic information", "Change password"];

  const formElements = [
    {
      label: "First name",
      type: "text",
      id: "fnam1",
      defVal: props.Profile.first_name,
    },
    {
      label: "Last name",
      type: "text",
      id: "lnam1",
      defVal: props.Profile.last_name,
    },
    { label: "Email", type: "email", id: "ema1", defVal: props.Profile.email },
  ];

  const passwordFormElements = [
    {
      label: "Old password",
      type: "password",
      id: "opass1",
    },
    {
      label: "New password",
      type: "password",
      id: "npass1",
    },
    {
      label: "Confirm new password",
      type: "password",
      id: "confnpass1",
    },
  ];

  const saveChanges = async () => {
    let formData = new FormData();

    formData.set("first_name", document.getElementById("fnam1").value);
    formData.set("last_name", document.getElementById("lnam1").value);
    formData.set("email", document.getElementById("ema1").value);

    const resObj = await patchMultipartItem(profile, props.token, formData);

    if (resObj.status === HTTPSTATUS.ok)
      Notify(
        "your profile information has been updated successfuly",
        "Congrats",
        "success"
      );
    else Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
  };

  const savePasswordChanges = async () => {
    const info = {
      old_password: document.getElementById("opass1").value,
      new_password1: document.getElementById("npass1").value,
      new_password2: document.getElementById("confnpass1").value,
    };

    const resObj = await putItem(profile, props.token, info);

    if (resObj.status === HTTPSTATUS.ok) {
      Notify(
        "your password has been updated successfuly",
        "Congrats",
        "success"
      );

      localStorage.set("authUser", code.decryptMessage(resObj.token));
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
  };

  return (
    <React.Fragment>
      <NavigationBar
        titles={titles}
        activeTab={activeTab}
        switchTab={switchTab}
      ></NavigationBar>
      <br></br>
      {activeTab === "0" ? (
        <Form>
          {formElements.map((elem, key) => (
            <FormGroup key={`form_${key}`}>
              <Label for={elem.id}>{elem.label}</Label>
              <Input id={elem.id} defaultValue={elem.defVal} />
            </FormGroup>
          ))}
          <CustomButton
            text="Save changes"
            margin={10}
            float="right"
            handler={saveChanges}
          ></CustomButton>
        </Form>
      ) : (
        <Form>
          {passwordFormElements.map((elem, key) => (
            <FormGroup key={`for_${key}`}>
              <Label for={elem.id}>{elem.label}</Label>
              <Input id={elem.id} />
            </FormGroup>
          ))}
          <CustomButton
            text="Save changes"
            margin={10}
            float="right"
            handler={savePasswordChanges}
          ></CustomButton>
        </Form>
      )}
    </React.Fragment>
  );
};

export default ProfileInfo;
