import { useState } from 'react'
import MyCourseCard from './my-course-card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function CardGroup({ data = [] }) {
  return (
    <>
      <div className="mb-5">
        <Row xs={1} md={3} className="g-4">
          {data.map((item, idx) => (
            <Col key={idx}>
              <MyCourseCard {...item} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}
