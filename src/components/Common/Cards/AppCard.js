import React from "react";
import PropTypes from "prop-types";
import { IconPickerItem } from "react-fa-icon-picker";
import { Link } from "react-router-dom";
import { Card, CardBody, Media } from "reactstrap";
import ICONS from "../icons";
import { COLORS } from "../../../helpers/utility";

const AppCard = (props) => {
  return (
    <Card style={{ backgroundColor: COLORS.darker }}>
      <CardBody>
        <Media>
          <div className="avatar-md mr-4">
            <span>
              <IconPickerItem
                icon={props.app.icon}
                size={40}
                color={props.app.color}
              />
            </span>
          </div>
          <Media className="overflow-hidden" body>
            <Link to="#" className="text-dark">
              <h5>{props.app.title}</h5>
            </Link>
            <h6 title={props.app.description} className="app-desc">
              {props.app.description}
            </h6>
          </Media>
        </Media>
        <br></br>
        {!props.app.is_enabled ? (
          <Media
            className="breadcrumb-action action-style"
            onClick={() => props.deleteHandler(props.app)}
          >
            <i
              title="delete application"
              className={`${ICONS.trashIcon} fa-lg`}
            ></i>
          </Media>
        ) : null}
        <Media
          className="breadcrumb-action action-style"
          onClick={() => props.enableDisableHandler(props.app)}
        >
          {!props.app.is_enabled ? (
            <i
              title="activate application"
              className={`${ICONS.enableIcon} fa-lg`}
            ></i>
          ) : (
            <i
              title="deactivate application"
              className={`${ICONS.disableIcon} fa-lg`}
            ></i>
          )}
        </Media>
        <Media
          className="breadcrumb-action action-style"
          onClick={() => props.editHandler(props.app)}
        >
          <i
            title="edit application information"
            className={`${ICONS.penIcon} fa-lg`}
          ></i>
        </Media>
      </CardBody>
    </Card>
  );
};

AppCard.propTypes = {
  app: PropTypes.object,
  linkHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  enableDisableHandler: PropTypes.func,
  editHandler: PropTypes.func,
};

export default AppCard;
