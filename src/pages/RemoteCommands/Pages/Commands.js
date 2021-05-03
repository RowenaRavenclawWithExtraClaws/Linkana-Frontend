import React, { useState } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { useSelector } from "react-redux";
import { selectCommands } from "../../../redux-utility/Commands/commandsSlice";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CustomButton from "../../../components/Common/customButton";
import CreateCommandModal from "../../../components/Common/Modals/CreateCommandModal";
import { SearchField, VerticalSpace } from "../../../helpers/utility";
import CommandsTab from "../Tabs/CommandsTab";

const Devices = () => {
  // data states
  const commands = useSelector(selectCommands);
  const [Types] = useState([]);
  // modal states
  const [isCreateCommandModalOpen, toggleCreateCommandModal] = useState(false);

  // passed search word state
  const [searchWord, setSearchWord] = useState("");

  const token = localStorage.getItem("authUser");

  const modals = [
    (key) => (
      <CreateCommandModal
        key={`moda_${key}`}
        Types={Types}
        isOpen={isCreateCommandModalOpen}
        toggle={toggleCreateCommandModal}
        token={token}
        Commands={commands}
        setCommands={() => {}}
      ></CreateCommandModal>
    ),
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Commands"
          purpose="display, create, edit and delete device commands"
        ></Breadcrumbs>
        <Card>
          <CardBody>
            <CustomButton
              id="command_create"
              title="create a new command"
              float="right"
              handler={() => toggleCreateCommandModal(true)}
              text="Create command"
            ></CustomButton>
            <SearchField
              field="title"
              setSearchWord={setSearchWord}
            ></SearchField>
            <VerticalSpace></VerticalSpace>
            <CommandsTab
              token={token}
              Commands={commands}
              Types={Types}
              setCommands={() => {}}
              searchWord={searchWord}
            />
          </CardBody>
        </Card>
        {modals.map((modal, key) => modal(key))}
      </Container>
    </div>
  );
};

export default Devices;
