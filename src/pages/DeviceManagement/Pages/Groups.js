import React, { useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CustomButton from "../../../components/Common/customButton";
import CreateGroupModal from "../../../components/Common/Modals/CreateGroupModal";
import DeviceGroupsTab from "../Tabs/DeviceGroupsTab";

const Groups = () => {
  // data states
  const [Groups, setGroups] = useState([]);
  // modal states
  const [isCreateGroupModalOpen, toggleCreateGroupModal] = useState(false);

  const token = localStorage.getItem("authUser");

  const modals = [
    (key) => (
      <CreateGroupModal
        key={`moda_${key}`}
        isOpen={isCreateGroupModalOpen}
        toggle={() => toggleCreateGroupModal(false)}
        token={token}
        Groups={Groups}
        setGroups={setGroups}
      ></CreateGroupModal>
    ),
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Groups"
          purpose="view group information, create, edit or delete a group and more"
          buttons={[
            <CustomButton
              id="group_create"
              key="but12"
              keyy="but2"
              title="create a new group"
              display="inline-block"
              float="right"
              handler={() => toggleCreateGroupModal(true)}
              text="Create group"
            ></CustomButton>,
          ]}
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <DeviceGroupsTab
              token={token}
              Groups={Groups}
              setGroups={setGroups}
            />
          </CardBody>
        </Card>
        {modals.map((modal, key) => modal(key))}
      </Container>
    </div>
  );
};

export default Groups;
