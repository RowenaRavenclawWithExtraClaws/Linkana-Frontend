import React, { useState } from "react";
import { Row, Col, Popover, PopoverBody } from "reactstrap";

function Breadcrumbs(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <h4 className="mb-0 font-size-21 inline">{props.breadcrumbItem}</h4>
          <div className="inline popover-margin">
            <i id="Popover1" className="far fa-question-circle fa-lg"></i>
            <Popover
              placement="right"
              isOpen={popoverOpen}
              target="Popover1"
              toggle={() => setPopoverOpen(!popoverOpen)}
            >
              <PopoverBody>{props.purpose}</PopoverBody>
            </Popover>
          </div>
          <div className="but-div">
            {props.buttons ? props.buttons.map((button) => button) : null}
          </div>
          <div>{props.action}</div>
        </Col>
      </Row>
      <br></br>
    </React.Fragment>
  );
}

export default Breadcrumbs;
