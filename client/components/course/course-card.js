import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import Ratio from 'react-bootstrap/Ratio'
import {
  BsFillStarFill,
  BsClockFill,
  BsFillPeopleFill,
  BsFillEasel2Fill,
  BsFillPenFill,
} from 'react-icons/bs'

export default function CourseCard({
  id,
  name,
  price,
  description,
  image,
  teacher_name,
  rank,
  total_minute,
  student_num,
  category_name,
  cms,
}) {
  price = price || 0
  const cardLink = cms
    ? `http://localhost:3000/course/CMS/${id}`
    : `http://localhost:3000/course/${id}`
  const [isHovered, setIsHovered] = useState(false)
  let imageURL = ''

  if (image && image !== '') {
    imageURL = `http://localhost:3005/course/images/course_${
      image.split('_')[1].split('.')[0] % 25
    }.jpg`
  }
  return (
    <>
      <Link href={cardLink}>
        <Card
          style={{ width: '100%', borderRadius: 0 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Ratio aspectRatio="16x9" style={{ overflow: 'hidden' }}>
            <Card.Img
              variant="top"
              src={imageURL}
              className="image-style"
              style={{
                transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.5s  ease-out',
              }}
            />
          </Ratio>

          <Card.Body className="d-flex flex-column">
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="text-muted">
              <p className="mb-2">{`By ${teacher_name}`}</p>
            </Card.Subtitle>
            <Card.Text
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal',
              }}
              className="flex-fill"
            >
              {description}
            </Card.Text>
            <Card.Text className="d-flex flex-lg-row align-items-lg-center">
              {/* <span className="me-1 text-my-black">
                <BsFillStarFill
                  style={{
                    fontSize: '16px',
                    marginBottom: '2px',
                    marginRight: '5px',
                  }}
                />
                {rank}
              </span> */}
              <span className="me-1 text-my-black">
                <BsClockFill style={{ padding: '5px', fontSize: '24px' }} />
                {total_minute}分鐘
              </span>
              <span className="me-1 text-my-black">
                <BsFillPeopleFill
                  style={{ padding: '5px', fontSize: '24px' }}
                />
                {student_num}人
              </span>
              <span className="me-1 text-my-black">
                {category_name === '手寫字' ? (
                  <BsFillPenFill className=" mb-1 me-1  " />
                ) : (
                  <BsFillEasel2Fill className="mb-1 me-1" />
                )}
                {category_name}
              </span>
            </Card.Text>
            <Card.Text className="text-h3 text-my-notice">
              ${price.toLocaleString()}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <style jsx>{`
        .image-style {
          transition: transform 0.3s ease;
        }
        .image-style:hover {
          &img {
            transform: scale(1.1);
          }
        }
      `}</style>
    </>
  )
}
