import {
  BsClockFill,
  BsFillPlayCircleFill,
  BsFillPeopleFill,
  BsFillEyeFill,
} from 'react-icons/bs'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function CourseSubInfo({
  total_minute,
  units_length,
  sub_units_num,
  student_num,
}) {
  return (
    <>
      <Container>
        <Row className="mb-2">
          <Col>
            <div className="course-sub-info-item d-flex align-items-center">
              <BsClockFill
                className="me-2 text-primary"
                style={{ width: '40px', fontSize: '50px' }}
              />
              <div className="info">
                <div className="label">課程時長</div>
                <div className="value">{total_minute}分鐘</div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="course-sub-info-item d-flex align-items-center">
              <BsFillPlayCircleFill
                className="me-2 text-primary"
                style={{ width: '40px', fontSize: '50px' }}
              />
              <div className="info">
                <div className="label">單元數</div>
                <div className="value">{`${units_length}章${sub_units_num}單元`}</div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="course-sub-info-item d-flex align-items-center">
              <BsFillPeopleFill
                className="me-2 text-primary"
                style={{ width: '40px', fontSize: '50px' }}
              />
              <div className="info">
                <div className="label">課程總人數</div>
                <div className="value">{student_num}位同學</div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="course-sub-info-item d-flex align-items-center">
              <BsFillEyeFill
                className="me-2 text-primary"
                style={{ width: '40px', fontSize: '50px' }}
              />
              <div className="info">
                <div className="label">觀看次數</div>
                <div className="value">不限觀看次數</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
