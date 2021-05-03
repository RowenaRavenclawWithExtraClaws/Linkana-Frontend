import React, { useState, useEffect, useRef } from "react";
import NoData from "../../../components/Common/NoData";
import Notify from "../../../components/Common/notification";
import { groups } from "../../../helpers/endpoints";
import { fetchItems } from "../../../helpers/requests_helper";
import {
  HTTPSTATUS,
  ITEMSPERPAGE,
  Loader,
  prettifyJsonStr,
  renderActions,
  showInfo,
} from "../../../helpers/utility";
import { Table, Pagination } from "reactstrap";
import TableTitles from "../../../components/Common/TableTitles";
import ICONS from "../../../components/Common/icons";
import { getPages } from "../../../helpers/utility";
import { Link } from "react-router-dom";
import ROUTES from "../../../helpers/routes_helper";
import EditGroupModal from "../../../components/Common/Modals/EditGroupModal";
import DeleteGroupModal from "../../../components/Common/Modals/DeleteGroupModal";

const DeviceGroupsTab = (props) => {
  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data state
  const [curPage, setCurPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  // modal state
  const [isEditGroupModalOpen, toggleEditGroupModal] = useState(false);
  const [isDeleteGroupModalOpen, toggleDeleteGroupModal] = useState(false);

  const titles = ["name", "description", "devices_count"];
  let selectedGroup = useRef({}); // store selected group

  // operations that can be done on a group
  const actions = [
    (key, group) => (
      <Link key={`act_${key}`} to={ROUTES.groupDevices}>
        <i
          title="show devices in this group"
          className={`${ICONS.groupDevicesIcon} fa-lg cursor-pointer`}
          onClick={() => localStorage.setItem("group-slug", group.slug)}
        ></i>
      </Link>
    ),
    (key, group) => (
      <i
        key={`act_${key}`}
        title="edit group information"
        className={`${ICONS.penIcon} fa-lg ${
          group.slug !== "default" ? "cursor-pointer" : ""
        } action-style`}
        onClick={() => {
          if (group.slug !== "default") {
            selectedGroup.current = group;
            toggleEditGroupModal(true);
          }
        }}
      ></i>
    ),
    (key, group) => (
      <i
        key={`act_${key}`}
        title="delete group"
        className={`${ICONS.trashIcon} fa-lg ${
          group.slug !== "default" ? "cursor-pointer" : ""
        } action-style`}
        onClick={() => {
          if (group.slug !== "default") {
            selectedGroup.current = group;
            toggleDeleteGroupModal(true);
          }
        }}
      ></i>
    ),
  ];

  const getGroups = async (url) => {
    const resObj = await fetchItems(url, props.token, curPage);

    if (resObj.status === HTTPSTATUS.ok) {
      props.setGroups(resObj.body.results);
      setPageCount(Math.ceil(resObj.body.count / ITEMSPERPAGE));
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);
  };

  useEffect(() => {
    getGroups(groups);
  }, [curPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const modals = [
    (key) => (
      <EditGroupModal
        key={`modaly_${key}`}
        isOpen={isEditGroupModalOpen}
        toggle={() => toggleEditGroupModal(false)}
        token={props.token}
        Groups={props.Groups}
        selectedGroup={selectedGroup.current}
        setGroups={props.setGroups}
      ></EditGroupModal>
    ),
    (key) => (
      <DeleteGroupModal
        key={`modaly_${key}`}
        isOpen={isDeleteGroupModalOpen}
        toggle={() => toggleDeleteGroupModal(false)}
        token={props.token}
        Groups={props.Groups}
        selectedGroup={selectedGroup.current}
        setGroups={props.setGroups}
      ></DeleteGroupModal>
    ),
  ];

  if (fetching) return <Loader />;

  return props.Groups.length ? (
    <React.Fragment>
      <div id="devices_table" className="table-responsive">
        <Table className="table table-centered table-nowrap table-striped">
          <TableTitles titles={[...titles, ""]} color=""></TableTitles>
          <tbody>
            {showInfo(props.Groups, titles, "", null, (item) =>
              renderActions(item, actions)
            )}
          </tbody>
        </Table>
      </div>
      <Pagination className="pagination pagination-rounded justify-content-center mb-2">
        {getPages(pageCount, curPage, setCurPage).map((page) => page)}
      </Pagination>
      {modals.map((modal, key) => modal(key))}
    </React.Fragment>
  ) : (
    //rendered in the absence of data
    <div id="devices_table">
      <NoData
        message="No groups are available!"
        subMessage="you can create a new group from the create group button"
      ></NoData>
    </div>
  );
};

export default DeviceGroupsTab;
