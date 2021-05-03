import React, { useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CustomButton from "../../components/Common/customButton";
import AddUserModal from "../../components/Common/Modals/AddUserModal";
import users from "../../data/users";
import { SearchField, VerticalSpace } from "../../helpers/utility";
import UsersTable from "./Users/UsersTable";

const UserManagement = () => {
  // data states
  const [Users, setUsers] = useState(users);
  // modal states
  const [isAddUserModalOpen, toggleAddUserModal] = useState(false);
  // passed search word state
  const [searchWord, setSearchWord] = useState(null);

  const token = localStorage.getItem("authUser");

  const modals = [
    (key) => (
      <AddUserModal
        key={`moda_${key}`}
        isOpen={isAddUserModalOpen}
        toggle={() => toggleAddUserModal(false)}
        token={token}
        Users={Users}
        setUsers={setUsers}
      ></AddUserModal>
    ),
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="User management"
          purpose="view company registered users, add a new one or delete one"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <SearchField
              field="username"
              setSearchWord={setSearchWord}
            ></SearchField>
            <CustomButton
              id="users_add"
              title="add new user to the company"
              float="right"
              handler={() => toggleAddUserModal(true)}
              text="Add user"
            ></CustomButton>
            <VerticalSpace></VerticalSpace>
            <UsersTable
              Users={Users}
              setUsers={setUsers}
              token={token}
              searchWord={searchWord}
            ></UsersTable>
          </CardBody>
        </Card>
        {modals.map((modal, key) => modal(key))}
      </Container>
    </div>
  );
};

export default UserManagement;
