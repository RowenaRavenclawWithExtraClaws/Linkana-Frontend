import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardFooter, Table } from "reactstrap";
import TableTitles from "../TableTitles";
import { showInfo } from "../../../helpers/utility";
import NoData from "../NoData";

const OverviewCard = (props) => {
  return (
    <Card id="devices_card">
      <CardBody style={{ height: props.height }}>
        <h5
          className="font-size-16 font-weight-medium inline"
          style={{
            color: props.invertedColor,
          }}
        >
          {props.title}
        </h5>
        {props.items.length ? (
          <div id="devices_table" className="table-responsive">
            <Table className="table table-centered table-nowrap table-striped">
              <TableTitles
                titles={props.titles}
                color={props.invertedColor}
              ></TableTitles>
              <tbody>
                {showInfo(
                  props.items,
                  props.titles,
                  props.invertedColor,
                  props.formatLast
                )}
              </tbody>
            </Table>
          </div>
        ) : (
          //rendered in the absence of data
          <div id="devices_table">
            <NoData message={props.noDataMessage}></NoData>
          </div>
        )}
      </CardBody>
      <CardFooter>
        {/* counts for online and offline devices, errors and groups */}
        {props.badges}
      </CardFooter>
    </Card>
  );
};

OverviewCard.propTypes = {
  height: PropTypes.number,
  color: PropTypes.string,
  invertedColor: PropTypes.string,
  title: PropTypes.string,
  noDataMessage: PropTypes.string,
  items: PropTypes.array,
  titles: PropTypes.any,
  badges: PropTypes.any,
  changeColorHandler: PropTypes.func,
  formatLast: PropTypes.func,
};

export default OverviewCard;
