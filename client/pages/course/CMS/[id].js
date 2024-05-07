import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function CoursePage() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState([])
  const [teacherData, setTeacherData] = useState([])
  const [error, setError] = useState(null)
  const [teacherSelect, setTeacherSelect] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        // course data
        const response = await fetch(`http://localhost:3005/api/course/${id}`)
        const data = await response.json()

        // teacher data
        const teacherResponse = await fetch(
          `http://localhost:3005/api/course/teacher`
        )
        const teacherData = await teacherResponse.json()

        setData(data[0])
        setTeacherData(teacherData)
        setTeacherSelect(data[0].teacher)
      } catch (error) {
        console.error('Error:', error)
        setError(error)
      }
    }
    fetchData()
  }, [id]) // 更新依賴性陣列，當 id 變化時重新執行 useEffect
  const {
    name = '',
    price = '',
    description = '',
    image = '',
    teacher = '',
    teacher_image = '',
    rank = '',
    total_minute = '',
    student_num = '',
    teacher_introduction = '',
    article = '',
    units = [],
    news_title = '',
    news_date = '',
    news_content = '',
  } = data || {}

  return (
    <>
      {/* data = {
    id: 214,
    name: '筆墨悠揚：掌握書法之道',
    product_type: 2,
    price: 1300,
    description: '專為初學者設計的鋼筆書法課，輕鬆學習優雅書寫技巧。',
    image: 'course_1.jpg',
    created_at: '2023-12-04T16:00:00.000Z',
    updated_at: '2023-12-04T16:00:00.000Z',
    valid: 1,
    product_id: 214,
    category_id: 1,
    teacher_id: 4,
    total_minute: 12,
    rank: 5,
    student_num: 24,
    article:
      '<h4>你想寫美字嗎？</h4>\n\n<p>寫一手好字或許是大部分人的嚮往，但礙於種種現實因素，常常就此被遺忘。</p>\n\n<p>&nbsp;</p>\n\n<p>但在看到每每在看到他人的一手美字，你總還是止不了心中的蕩漾。</p>\n\n<p>如果你對此心有戚戚焉......</p>\n\n<blockquote>那麼那麼這堂課就是為那個裹足不前的你而開的</blockquote>\n\n<p>&nbsp;</p>\n\n<p>在基礎篇裡頭，我會將我個人的醜字蛻變經歷中，整理出系統的寫字要領，</p>\n\n<p>&nbsp;</p>\n\n<ol>\n <li>包含基本筆法和結構的小秘訣，讓學習者更容易入門寫好字。<br />\n <br />\n 本課程的教學示範刻意採用一般文具店就可以買到的「SKB 秘書 0.7中油性原子筆」，<br />\n 避免因為老師、學生所使用工具上的差異而的學習阻礙。</li>\n</ol>\n\n<p><br />\n<strong>&darr;來看看關於我寫字的故事吧。</strong></p>\n\n<p>&nbsp;</p>\n\n<h4>課程教學內容</h4>\n\n<p>&nbsp;</p>\n\n<p><strong>1.美字關鍵概述</strong>---練好字之前有幾個成功心法要跟大家分享，觀念正確了，寫字會是一個很享受的過程。</p>\n\n<p><strong>2.如何尋找適合的書寫工具</strong>---這部分將為大家展示鉛筆、原子筆、鋼筆等各種常用的書寫工具，實際示範使用的技巧，並將各種工具的優缺點提出來給入門者參考。</p>\n\n<p><strong>3.基本筆畫要領</strong>---不要小看基本筆畫，一筆一畫都可能是美字的要素。</p>\n\n<p><strong>4.美字結構密訣秘訣</strong>---讓字可以在短時間提升美感的方法就要靠改變結構，這個單元中會提供你所需要的小撇步。</p>\n\n<p>5.&nbsp;<strong>課程補充</strong>---左撇子執筆與運筆、文字的排列</p>\n\n<p>&nbsp;</p>\n\n<blockquote>硬筆習字的三大法寶</blockquote>\n\n<p>&nbsp;</p>\n\n<p>除了用原子筆做為主要示範的工具外，也會特別分享關於「筆、紙、墊」等三樣重要工具之使用經驗。</p>\n\n<p>&nbsp;</p>\n',
    category: '手寫字',
    teacher: '林志成',
    teacher_image: 'teacher_7.jpg',
    teacher_introduction: '鋼筆書法老師，教學風趣有趣。',
    news_title: '「鋼筆」加購服務',
    news_content:
      '本次課程，老師特別與墨韻雅筆合作，由老師精心挑選適合學員的書寫鋼筆，其中鋼筆的製作更由老師親自指導修改了八次才確定，並以優惠的價格提供學員選購，讓大家以最適當且方便的文房工具開始屬於自己的書寫。',
    news_date: '2023-02-25T16:00:00.000Z',
    type: 'course',
    units: [
      {
        id: 1,
        course_id: 214,
        title: '書法進階',
        sub_units: [
          {
            id: 1,
            unit_id: 1,
            title: '創意書法實踐與評論',
            video_path: 'v_1.mp4',
            video_len: '01:35',
          },
          {
            id: 2,
            unit_id: 1,
            title: '書法作品展示',
            video_path: 'v_2.mp4',
            video_len: '02:26',
          },
        ],
      },
      {
        id: 2,
        course_id: 214,
        title: '創意書法實踐',
        sub_units: [
          {
            id: 3,
            unit_id: 2,
            title: '書法藝術風格導讀',
            video_path: 'v_3.mp4',
            video_len: '01:58',
          },
          {
            id: 4,
            unit_id: 2,
            title: '日常書寫實用技巧',
            video_path: 'v_4.mp4',
            video_len: '01:51',
          },
        ],
      },
      {
        id: 3,
        course_id: 214,
        title: '創意書法實踐',
        sub_units: [
          {
            id: 5,
            unit_id: 3,
            title: '書法達人分享',
            video_path: 'v_5.mp4',
            video_len: '01:24',
          },
          {
            id: 6,
            unit_id: 3,
            title: '字型結構解析',
            video_path: 'v_6.mp4',
            video_len: '02:55',
          },
        ],
      },
    ],
  } */}
      {/* <div>{JSON.stringify(data, null, 2)}</div> */}
      <Form className="mb-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" name="id" defaultValue={id} disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>課程名稱</Form.Label>
          <Form.Control type="text" name="name" defaultValue={name} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>價格</Form.Label>
          <Form.Control type="text" name="price" defaultValue={price} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>課程描述</Form.Label>
          <Form.Control
            type="text"
            name="description"
            defaultValue={description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>圖片</Form.Label>
          <Form.Control type="file" name="image" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTeacher">
          <Form.Label>老師</Form.Label>
          <Form.Control
            type="text"
            name="teacher"
            defaultValue={teacher}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTeacherIntroduction">
          <Form.Label>老師介紹</Form.Label>
          <Form.Control
            type="text"
            name="teacher_introduction"
            defaultValue={teacher_introduction}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRank">
          <Form.Label>評分</Form.Label>
          <Form.Control type="text" name="rank" defaultValue={rank} disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTotalMinute">
          <Form.Label>總分鐘</Form.Label>
          <Form.Control
            type="text"
            name="total_minute"
            defaultValue={total_minute}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStudentNum">
          <Form.Label>學生人數</Form.Label>
          <Form.Control
            type="text"
            name="student_num"
            defaultValue={student_num}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicArticle">
          <Form.Label>文章</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="article"
            defaultValue={article}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUnits">
          <Form.Label>單元</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="units"
            defaultValue={JSON.stringify(units, null, 2)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}
