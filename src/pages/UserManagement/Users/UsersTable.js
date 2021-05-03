import React, { useState, useEffect, useRef } from "react";
import NoData from "../../../components/Common/NoData";
import { Loader } from "../../../helpers/utility";
import { Table, Pagination } from "reactstrap";
import TableTitles from "../../../components/Common/TableTitles";
import ICONS from "../../../components/Common/icons";
import { getPages } from "../../../helpers/utility";
import DeleteUserModal from "../../../components/Common/Modals/DeleteUserModal";

const UsersTable = (props) => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data state
  const [curPage, setCurPage] = useState(1);
  const [pageCount] = useState(1);
  // modal state
  const [isDeleteUserModalOpen, toggleDeleteUserModal] = useState(false);

  const titles = ["avatar", "username", "email", "first_name", "last_name"];

  let selectedUser = useRef({}); // store selected user

  // operations that can be done on a user
  const actions = [
    (key, user) => (
      <i
        key={`act_${key}`}
        title="delete user"
        className={`${ICONS.trashIcon} fa-lg cursor-pointer`}
        onClick={() => {
          selectedUser.current = user;
          toggleDeleteUserModal(true);
        }}
      ></i>
    ),
  ];

  const getUsers = async () => {
    /*const resObj = await fetchItems(users, props.token, curPage);

    if (resObj.status === HTTPSTATUS.ok) {
      props.setUsers(resObj.body.results);
      setPageCount(Math.ceil(resObj.body.count / ITEMSPERPAGE));
      usersBackup.current = resObj.body.results;
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);*/
    setTimeout(() => toggleFetching(false), 1000);
  };

  useEffect(() => {
    /*if (typeof props.searchWord === "string") {
      searchHandler(props.searchWord);
      return;
    }*/
    getUsers();
  }, [curPage, props.searchWord]); // eslint-disable-line react-hooks/exhaustive-deps

  const modals = [
    (key) => (
      <DeleteUserModal
        key={`modaly_${key}`}
        isOpen={isDeleteUserModalOpen}
        toggle={() => toggleDeleteUserModal(false)}
        token={props.token}
        Users={props.Users}
        selectedUser={selectedUser.current}
        setUsers={props.setUsers}
      ></DeleteUserModal>
    ),
  ];

  const showUsersInfo = () =>
    props.Users.map((user, key) => (
      <tr key={"_order_" + key}>
        <td>
          <div className="avatar-xs">
            <span className="avatar-title rounded-circle">
              {user.username.charAt(0)}
            </span>
          </div>
        </td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>
          <div style={{ float: "right" }}>
            {actions.map((action, key) => action(key, user))}
          </div>
        </td>
      </tr>
    ));

  /*const searchHandler = (searchWord) => {
    props.setUsers(
      usersBackup.current.filter((user) =>
        user.username.toLowerCase().includes(searchWord.toLowerCase())
      )
    );
  };*/

  if (fetching) return <Loader />;

  return props.Users.length ? (
    <React.Fragment>
      <div id="users_table" className="table-responsive">
        <Table className="table table-centered table-nowrap table-striped">
          <TableTitles titles={[...titles, ""]} color=""></TableTitles>
          <tbody>{showUsersInfo()}</tbody>
        </Table>
      </div>
      <Pagination className="pagination pagination-rounded justify-content-center mb-2">
        {getPages(pageCount, curPage, setCurPage).map((page) => page)}
      </Pagination>
      {modals.map((modal, key) => modal(key))}
    </React.Fragment>
  ) : (
    //rendered in the absence of data
    <div id="users_table">
      <NoData
        message="No user registered for this company!"
        subMessage="you can add a new command from the Add user button"
      ></NoData>
    </div>
  );
};

export default UsersTable;
