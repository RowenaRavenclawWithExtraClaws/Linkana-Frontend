import React from "react";
import { render } from "@testing-library/react";
import RegisterDeviceModal from "../components/Common/Modals/RegisterDeviceModal";
import CreateCommandModal from "../components/Common/Modals/CreateCommandModal";
import ChangeDeviceStateModal from "../components/Common/Modals/ChangeDeviceStateModal";
import DeleteDeviceModal from "../components/Common/Modals/DeleteDeviceModal";
import ResetLayoutModal from "../components/Common/Modals/ResetLayoutModal";
import AddUserModal from "../components/Common/Modals/AddUserModal";
import DeleteUserModal from "../components/Common/Modals/DeleteUserModal";

describe("Modals test suite", () => {
  const modals = [
    {
      title: "render register device modal",
      component: (
        <RegisterDeviceModal
          isOpen={true}
          toggle={() => {}}
          token="dasdf"
          Groups={[]}
          Types={[]}
        />
      ),
      renderedText: "Register device",
    },
    {
      title: "render create command modal",
      component: (
        <CreateCommandModal
          isOpen={true}
          toggle={() => {}}
          token="dasdf"
          Types={[]}
        />
      ),
      renderedText: "Create new command",
    },
    {
      title: "render change device state modal",
      component: (
        <ChangeDeviceStateModal
          isOpen={true}
          toggle={() => {}}
          token="dasdf"
          device={{}}
          Devices={[]}
          setDevices={() => {}}
        />
      ),
      renderedText: "Are you sure you want to disable this device ?",
    },
    {
      title: "render delete device modal",
      component: (
        <DeleteDeviceModal
          isOpen={true}
          toggle={() => {}}
          token="dasdf"
          device={{}}
          Devices={[]}
          setDevices={() => {}}
        />
      ),
      renderedText: "Are you sure you want to delete this device ?",
    },
    {
      title: "render reset layout modal",
      component: (
        <ResetLayoutModal
          isOpen={true}
          toggle={() => {}}
          okHandler={() => {}}
        />
      ),
      renderedText: "Are you sure you want to reset your layout?",
    },
    {
      title: "render add user modal",
      component: (
        <AddUserModal
          isOpen={true}
          toggle={() => {}}
          token="dasdf"
          setUsers={() => {}}
        />
      ),
      renderedText: "Add new user",
    },
    {
      title: "render delete user modal",
      component: (
        <DeleteUserModal
          isOpen={true}
          toggle={() => {}}
          selectedUser={{}}
          token="asdads"
          Users={[]}
          setUsers={() => {}}
        />
      ),
      renderedText: "Are you sure you want to delete this users ?",
    },
  ];

  modals.forEach((modal) =>
    test(modal.title, () => {
      const { getByText } = render(modal.component);

      const renderedText = getByText(modal.renderedText);

      expect(renderedText).toBeInTheDocument();
    })
  );
});
