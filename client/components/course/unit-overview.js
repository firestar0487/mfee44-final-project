import Accordion from 'react-bootstrap/Accordion';

export default function UnitOverview() {
  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>單元一</Accordion.Header>
        <Accordion.Body>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <p className="mx-2">01</p>
              <p>小節1</p>
            </div>
            <p>01:00</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <p className="mx-2">02</p>
              <p>小節2</p>
            </div>
            <p>01:10</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <p className="mx-2">03</p>
              <p>小節3</p>
            </div>
            <p>01:20</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <p className="mx-2">04</p>
              <p>小節4</p>
            </div>
            <p>01:30</p>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>單元二</Accordion.Header>
        <Accordion.Body>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <p className="mx-2">01</p>
              <p>小節1</p>
            </div>
            <p>01:00</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <p className="mx-2">02</p>
              <p>小節2</p>
            </div>
            <p>01:10</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <p className="mx-2">03</p>
              <p>小節3</p>
            </div>
            <p>01:20</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <p className="mx-2">04</p>
              <p>小節4</p>
            </div>
            <p>01:30</p>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

