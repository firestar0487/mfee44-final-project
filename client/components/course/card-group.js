import { useState } from 'react'
import CourseCard from '@/components/course/course-card.js'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { motion } from 'framer-motion'

export default function CardGroup({ data = [], cms = false }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          type: 'tween',
          delay: 0.2,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mb-5"
      >
        <Row xs={1} md={3} className="g-4">
          {data.map((item, idx) => (
            <Col key={idx}>
              <CourseCard {...item} cms={cms} order={idx} />
            </Col>
          ))}
        </Row>
      </motion.div>
    </>
  )
}
