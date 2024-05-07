import React, { useState, useEffect, useRef, useCallback } from 'react'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Section from '@/components/course/section'
import New from '@/components/course/new'
import { BsListOl, BsArrowDown, BsArrowUp } from 'react-icons/bs'
import CourseSubInfo from '@/components/course/course-sub-info'
import { useAuth } from '@/hooks/useAuth'

export default function LearnPage() {
  // useAuth()
  const router = useRouter()
  const { id } = router.query
  const [isReady, setIsReady] = useState(false)
  const [lgShow, setLgShow] = useState(false)
  const [startAt, setStartAt] = useState(0)
  const playerRef = useRef()
  const onReady = useCallback(() => {
    if (!isReady) {
      playerRef.current.seekTo(startAt, 'seconds')
      setIsReady(true)
    }
  }, [isReady, startAt])

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [articleOpen, setArticleOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState(`${id}_intro.mp4`)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/course/${id}`)
        const data = await response.json()
        setData(data[0])
        setVideoUrl(`${id}_intro_1.mp4`)
      } catch (error) {
        console.error('Error:', error)
        setError(error)
      }
    }
    fetchData()
  }, [id]) // 更新依賴性陣列，當 id 變化時重新執行 useEffect
  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }
  const {
    name,
    price,
    description,
    image,
    teacher_name,
    teacher_image,
    rank,
    total_minute,
    student_num,
    teacher,
    teacher_introduction,
    article,
    units,
    news_title,
    news_date,
    news_content,
  } = data

  const sub_units_num = units
    .map((v) => v.sub_units.length)
    .reduce((a, b) => a + b)

  return (
    <>
      <div className="container">
        <h1 className="text-h1 d-flex justify-content-center my-5">{name}</h1>
        <div className="row mb-5">
          {/* 播放器 */}
          <div className="video col-xl-8 col-12 mb-2 mb-xl-0">
            <ReactPlayer
              ref={playerRef}
              playing={true}
              muted={true}
              width="100%"
              height="100%"
              controls="true"
              url={`http://localhost:3005/course/video/${videoUrl}`}
              onReady={onReady}
            />
          </div>
          {/* 章節選擇 */}
          {/* 電腦版 */}
          <div className="scrollable col-xl-4 col-12 mb-1 mb-xl-0 d-lg-block d-none">
            <p className="text-h3 d-flex justify-content-center">章節選擇</p>
            <Accordion defaultActiveKey={[]} alwaysOpen>
              {units.map((v, index) => {
                return (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>
                      <BsListOl className="me-1" />
                      {v.title}
                    </Accordion.Header>
                    <Accordion.Body>
                      {v.sub_units.map((v, index) => {
                        return (
                          <div
                            onClick={() => {
                              setVideoUrl(v.video_path.split('.')[0] + '_1.mp4')
                              // 設定影片開始時間
                              // setStartAt(Number(v.video_len.split(':')[1]))
                              setStartAt(0)
                              setIsReady(false)
                            }}
                            className={`cursor-pointer ${
                              videoUrl === v.video_path.split('.')[0] + '_1.mp4'
                                ? 'active'
                                : ''
                            }`}
                          >
                            <Section
                              key={index}
                              secNum={index + 1}
                              secTitle={`${v.title}`}
                              secTime={`${v.video_len}`}
                            />
                          </div>
                        )
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                )
              })}
            </Accordion>
          </div>
          {/* 手機板 */}
          <div className="d-lg-none d-flex justify-content-center">
            <Button onClick={() => setLgShow(true)}>章節選擇</Button>
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  章節選擇
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Accordion
                  defaultActiveKey={Array.from(
                    { length: units.length },
                    (_, i) => i.toString()
                  )}
                  alwaysOpen
                >
                  {units.map((v, index) => {
                    return (
                      <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>
                          <BsListOl className="me-1" />
                          {v.title}
                        </Accordion.Header>
                        <Accordion.Body>
                          {v.sub_units.map((v, index) => {
                            return (
                              <div
                                onClick={() => {
                                  setVideoUrl(
                                    v.video_path.split('.')[0] + '_1.mp4'
                                  )
                                  // 設定影片開始時間
                                  setStartAt(0)
                                  setIsReady(false)
                                  setLgShow(false)
                                }}
                                className={`cursor-pointer ${
                                  videoUrl ===
                                  v.video_path.split('.')[0] + '_1.mp4'
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <Section
                                  key={index}
                                  secNum={index + 1}
                                  secTitle={`${v.title}`}
                                  secTime={`${v.video_len}`}
                                />
                              </div>
                            )
                          })}
                        </Accordion.Body>
                      </Accordion.Item>
                    )
                  })}
                </Accordion>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <div>
          {/* info */}
          <div className="mb-5">
            <p className="text-h2">關於課程{/*ㄣ*/}</p>
            <div className="course-sub-info">
              <CourseSubInfo
                total_minute={total_minute}
                units_length={units.length}
                sub_units_num={sub_units_num}
                student_num={student_num}
              />
            </div>
          </div>
          {/* info end */}

          {/* news */}
          <div className="news mb-5">
            <div className="d-flex justify-content-between mb-3">
              <div className="text-h2">最新消息</div>
              {/* <div className="text_fold">收起消息</div> */}
            </div>
            <div className>
              <New
                date={news_date.split('T')[0]}
                title={news_title}
                message={news_content}
              />
            </div>
          </div>
          {/* news end */}

          {/* course content */}
          <div className="course_content mb-5">
            <div className="d-flex justify-content-between mb-4">
              <div className="text-h2">課程內容</div>
            </div>
            <div
              className={`${
                articleOpen
                  ? 'course_content_item_open'
                  : 'course_content_item_close'
              }`}
              dangerouslySetInnerHTML={{ __html: article }}
            ></div>
            <div
              className="text_fold d-flex justify-content-center"
              onClick={() => setArticleOpen(!articleOpen)}
              onKeyDown={() => setArticleOpen(!articleOpen)}
              role="button"
              tabIndex={0}
            >
              {articleOpen ? (
                <BsArrowUp className="text-h2" />
              ) : (
                <BsArrowDown className="text-h2" />
              )}
            </div>
          </div>
          {/* course content end*/}

          {/* teacher */}
          <div className="teacher-info">
            <div className="d-flex justify-content-between mb-4">
              <div className="text-h2">關於講師</div>
            </div>
            <div className="teacher-info-item mb-5">
              <div className="teacher-info-item-title mb-2">
                <div className="d-flex">
                  <div className="teacher-info-item-title-img ">
                    <Image
                      src={
                        'http://localhost:3005/course/images/' + 'default.jpg'
                      }
                      width={50}
                      height={50}
                      style={{ borderRadius: '50%' }}
                      alt="teacher image"
                    />
                  </div>
                  <div className="teacher-info-item-title-info d-flex align-items-center">
                    <p className="text-h3 mb-0 mx-3">{teacher}</p>
                  </div>
                </div>
              </div>
              <div className="teacher-info-item-content">
                <p className="text-h4">{teacher_introduction}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollable {
          max-height: 500px;
          overflow: auto;
          width: 100%;
          padding: 0;
          @media (max-width: 1400px) {
            max-height: 430px;
          }
          @media (max-width: 1200px) {
            max-height: 360px;
          }
          &::-webkit-scrollbar {
            width: 6px;
            height: 1px;
          }
          &::-webkit-scrollbar-track {
            background-color: white;
            border-radius: 10px;
            margin: 5px 130px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: var(--my-primary);
          }
        }
        video {
          width: 100%;
        }
        @media (min-width: 992px) {
          .scrollable {
            width: 30%;
            height: 100%;
          }
          .video {
            width: 70%;
          }
        }
        .teacher-info {
          & img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .course-sub-info {
          display: flex;
          @media (max-width: 992px) {
            flex-wrap: wrap;
          }
          .course-sub-info-item {
            display: flex;
            align-items: flex-start;
            margin-right: 30px;

            & i {
              font-size: 40px;
              margin-top: 10px;
              margin-right: 5px;
              color: $primary;
            }
          }
        }
        .course_content {
          .course_content_item_close {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 8; /* 顯示行數 */
            overflow: hidden;
          }
          .course_content_item_open {
            display: block;
          }
        }
        .cursor-pointer {
          cursor: pointer;
          transition: 0.2s;
          &:hover {
            background-color: white;
            color: var(--my-notice);
          }
        }
        .active {
          background-color: white;
          color: var(--my-notice);
        }
      `}</style>
    </>
  )
}
