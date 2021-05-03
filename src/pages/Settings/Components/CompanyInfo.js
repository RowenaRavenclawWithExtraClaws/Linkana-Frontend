import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import CustomButton from "../../../components/Common/customButton";
import Notify from "../../../components/Common/notification";
import { profile } from "../../../helpers/endpoints";
import { patchItem } from "../../../helpers/requests_helper";
import { HTTPSTATUS, prettifyJsonStr } from "../../../helpers/utility";

const ProfileInfo = (props) => {
  const formElements = [
    {
      label: "Name",
      type: "text",
      id: "nam1",
      defVal: props.Company.name,
    },
    { label: "Email", type: "email", id: "ema1", defVal: props.Company.email },
    {
      label: "Phone",
      type: "text",
      id: "pho1",
      defVal: () => props.Company.phone,
    },
    {
      label: "Address",
      type: "text",
      id: "add1",
      defVal: () => props.Company.address,
    },
  ];

  const saveChanges = async () => {
    let info = {
      name: document.getElementById("nam1").value,
      email: document.getElementById("ema1").value,
      phone: document.getElementById("pho1").value,
      address: document.getElementById("add1").value,
    };

    const resObj = await patchItem(`${profile}company/`, "", props.token, info);

    if (resObj.status === HTTPSTATUS.ok)
      Notify(
        "your company information has been updated successfuly",
        "Congrats",
        "success"
      );
    else Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");
  };

  return (
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
  );
};

export default ProfileInfo;
