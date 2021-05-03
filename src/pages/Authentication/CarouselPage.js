import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col } from "reactstrap";

const slidesContent = [
  "Register, control your devices",
  "Monitor your device metrics with rich metrics charts",
  "Track your devices with an interactive map",
  "What you are waiting for? sign up now for free!",
];

const CarouselPage = (props) => {
  return (
    <React.Fragment>
      <Col xl={9}>
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div className="bg-overlay"></div>
            <div className="d-flex h-100 flex-column">
              <div className="py-5 px-4 mt-auto">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    <div className="text-center">
                      <h4 className="mb-1">
                        <i className="bx bxs-quote-alt-left text-primary h1 align-middle mr-3"></i>
                        Focus on being productive instead of busy
                      </h4>
                      <Carousel
                        showThumbs={false}
                        autoPlay
                        className="slider_css"
                      >
                        {slidesContent.map((content, key) => (
                          <div key={`cont_${key}`}>
                            <div className="item">
                              <div className="py-3">
                                <p className="font-size-24 mb-4">{content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};
export default CarouselPage;
