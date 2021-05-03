import React, { useState, useEffect, useRef } from "react";
import { IconPickerItem } from "react-fa-icon-picker";
import { useDispatch } from "react-redux";
import { edit } from "../../../redux-utility/Commands/commandsSlice";
import NoData from "../../../components/Common/NoData";
import { Loader, renderActions, showInfo } from "../../../helpers/utility";
import { Table, Pagination } from "reactstrap";
import TableTitles from "../../../components/Common/TableTitles";
import ICONS from "../../../components/Common/icons";
import { getPages } from "../../../helpers/utility";
import { Link } from "react-router-dom";
import DeleteCommandModal from "../../../components/Common/Modals/DeleteCommandModal";
import EditCommandModal from "../../../components/Common/Modals/EditCommandModal";
import CustomButton from "../../../components/Common/customButton";

const CommandsTab = (props) => {
  const dispatch = useDispatch();

  // loading state
  const [fetching, toggleFetching] = useState(true);
  // data state
  const [curPage, setCurPage] = useState(1);
  const [pageCount] = useState(1);
  // modal state
  const [isEditCommandModalOpen, toggleEditCommandModal] = useState(false);
  const [isDeleteCommandModalOpen, toggleDeleteCommandModal] = useState(false);

  const titles = ["title", "payload", "show_in_list", "icon"];

  let selectedCommand = useRef({ types: [] }); // store selected command
  //let commandsBackup = useRef([]); // store backup for devices for search purposes

  const enableDisableCommand = async (command) => {
    /*const info = {
      show_in_list: !command.show_in_list,
    };

    const resObj = await patchItem(commands, command.id, props.token, info);

    if (resObj.status === HTTPSTATUS.ok) {
      props.setCommands(updateStateList(props.Commands, resObj.body, "edit"));
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);*/
    dispatch(
      edit({
        id: command.id,
        show_in_list: !command.show_in_list,
      })
    );
  };

  // operations that can be done on a command
  const actions = [
    (key, command) => (
      <Link key={`act_${key}`} to="#">
        <i
          title="show this command execution history"
          className={`${ICONS.historyIcon} fa-lg cursor-pointer`}
          onClick={() => {
            localStorage.setItem("command-title", command.title);
          }}
        ></i>
      </Link>
    ),
    (key, command) => (
      <i
        key={`act_${key}`}
        title="edit command information"
        className={`${ICONS.penIcon} fa-lg action-style cursor-pointer`}
        onClick={() => {
          selectedCommand.current = command;
          toggleEditCommandModal(true);
        }}
      ></i>
    ),
    (key, command) => (
      <i
        key={`act_${key}`}
        title="delete command"
        className={`${ICONS.trashIcon} fa-lg action-style cursor-pointer`}
        onClick={() => {
          selectedCommand.current = command;
          toggleDeleteCommandModal(true);
        }}
      ></i>
    ),
    (key, command) => (
      <CustomButton
        key={`act_${key}`}
        title="hide or show command in the device control list"
        extraStyleClass="action-style"
        text={command.show_in_list ? "Disable command" : "Enable command"}
        handler={() => enableDisableCommand(command)}
      />
    ),
  ];

  const getCommands = () => {
    /*const resObj = await fetchItems(commands, props.token, curPage);

    if (resObj.status === HTTPSTATUS.ok) {
      props.setCommands(resObj.body.results);
      setPageCount(Math.ceil(resObj.body.count / ITEMSPERPAGE));
      commandsBackup.current = resObj.body.results;
    } else
      Notify(prettifyJsonStr(JSON.stringify(resObj.body)), "Error", "error");

    toggleFetching(false);*/
    setTimeout(() => toggleFetching(false), 1000);
  };

  useEffect(() => {
    /*if (props.searchWord.length) {
      searchHandler(props.searchWord);
      return;
    }*/

    getCommands();
  }, [curPage, props.searchWord]); // eslint-disable-line react-hooks/exhaustive-deps

  const modals = [
    (key) =>
      isEditCommandModalOpen ? (
        <EditCommandModal
          key={`modaly_${key}`}
          isOpen={isEditCommandModalOpen}
          toggle={() => toggleEditCommandModal(false)}
          token={props.token}
          Commands={props.Commands}
          Types={props.Types}
          selectedCommand={selectedCommand.current}
          setCommands={props.setCommands}
        ></EditCommandModal>
      ) : null,
    (key) => (
      <DeleteCommandModal
        key={`modaly_${key}`}
        isOpen={isDeleteCommandModalOpen}
        toggle={() => toggleDeleteCommandModal(false)}
        token={props.token}
        Commands={props.Commands}
        selectedCommand={selectedCommand.current}
        setCommands={props.setCommands}
      ></DeleteCommandModal>
    ),
  ];

  /*const searchHandler = (searchWord) => {
    props.setCommands(
      commandsBackup.current.filter((command) =>
        command.title.toLowerCase().includes(searchWord.toLowerCase())
      )
    );
  };*/

  if (fetching) return <Loader />;

  return props.Commands.length ? (
    <React.Fragment>
      <div id="commands_table" className="table-responsive">
        <Table className="table table-centered table-nowrap table-striped">
          <TableTitles titles={[...titles, ""]} color=""></TableTitles>
          <tbody>
            {showInfo(
              props.Commands,
              titles,
              "",
              (command) => (
                <IconPickerItem
                  icon={command.icon}
                  size={15}
                  color={command.color}
                />
              ),
              (item) => renderActions(item, actions)
            )}
          </tbody>
        </Table>
      </div>
      <Pagination className="pagination pagination-rounded justify-content-center mb-2">
        {getPages(pageCount, curPage, setCurPage).map((page) => page)}
      </Pagination>
      {modals.map((modal, key) => modal(key))}
      {/*modals.map((modal, key) => modal(key))*/}
    </React.Fragment>
  ) : (
    //rendered in the absence of data
    <div id="commands_table">
      <NoData
        message="No commands are available!"
        subMessage="you can create a new command from the create command button"
      ></NoData>
    </div>
  );
};

export default CommandsTab;
