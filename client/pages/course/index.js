import React, { useRef, useState, useEffect,  } from 'react'
import CourseCarousel from '@/components/course/course-carousel.js'
import CardGroup from '@/components/course/card-group.js'
import CardGroupTitle from '@/components/course/card-group-title.js'
import MyCardGroup from '@/components/course/my-card-group.js'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function CoursePage() {
  const titleData = [
    {
      title: '我的課程',
      subTitle: '新的一天持續學習',
    },
    {
      title: '最新課程',
      subTitle: '學習最新的知識',
    },
    {
      title: '熱門課程',
      subTitle: '與大家一同學習',
    },
    {
      title: '手寫字課程',
      subTitle: '提升你的書寫能力',
    },
    {
      title: '繪畫課程',
      subTitle: '發揮你的創意',
    },
  ]
  const [data, setData] = useState([])

  const [login, setLogin] = useState(false)
  const [courseOrder, setCourseOrder] = useState([])
  const [courseALL, setCourseALL] = useState([])

  // 所有課程
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/course')
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  // 會員資料
  const [user, setUser] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthdate: '',
    year: '',
    month: '',
    day: '',
  })
  const [loading, setLoading] = useState(true)
  console.log(user)
  // 定義年份、月份、日期的選項數組
  const years = Array.from(
    new Array(100),
    (_, index) => new Date().getFullYear() - index
  )
  const months = Array.from(new Array(12), (_, index) => index + 1)
  const days = Array.from(new Array(31), (_, index) => index + 1)

  // 載入時時獲取用戶數據
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/profile', {
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()

        const newUser = {
          ...data,
          year: data.birthdate ? data.birthdate.split('-')[0] : '',
          month: data.birthdate ? data.birthdate.split('-')[1] : '',
          day: data.birthdate ? data.birthdate.split('-')[2] : '',
        }

        setUser(newUser)
        if (newUser.firstname === '') {
          setLogin(false)
        } else {
          setLogin(true)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchUserCourse = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/course/my_course'
        )

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()

        setCourseOrder(data)
      } catch (error) {
        console.error('Failed to fetch user course:', error)
      }
    }
    fetchUserCourse()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/course/courseALL'
        )
        const data = await response.json()
        setCourseALL(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])
  let myCourse = courseOrder.filter((item) => item.user_id === user.user_id)
  let myCourseALL = myCourse.map((item) => {
    let course = courseALL.filter((course) => course.id === item.product_id)
    return course[0]
  })
  console.log('user', user)
  // console.log('data', data)
  // console.log('courseOrder', courseOrder)
  // console.log('myCourse', myCourse)
  // console.log('courseALL', courseALL)
  console.log('myCourseALL', myCourseALL)


  return (
    <>
      <div className="mb-5">
        <CourseCarousel />
      </div>

      {/* 我的學習 */}
      {login && myCourseALL.length > 0 && (
        <div>
          <CardGroupTitle
            title={titleData[0].title}
            subTitle={titleData[0].subTitle}
            linkUrl="http://localhost:3000/course/user"
          />      
          <MyCardGroup data={myCourseALL.slice(0, 3)} />
        </div>
      )}

      <div className="mb-5">
        <CardGroupTitle
          title={titleData[1].title}
          subTitle={titleData[1].subTitle}
          linkUrl="http://localhost:3000/course/overview?state=3"
        />
        <CardGroup data={data[0]} />
      </div>
      <div className="mb-5">
        <CardGroupTitle
          title={titleData[2].title}
          subTitle={titleData[2].subTitle}
          linkUrl="http://localhost:3000/course/overview?state=1"
        />
        <CardGroup data={data[1]} />
      </div>
      <div className="mb-5">
        <CardGroupTitle
          title={titleData[3].title}
          subTitle={titleData[3].subTitle}
          linkUrl="http://localhost:3000/course/overview?type=1"
        />
        <CardGroup data={data[2]} />
      </div>
      <div className="mb-5">
        <CardGroupTitle
          title={titleData[4].title}
          subTitle={titleData[4].subTitle}
          linkUrl="http://localhost:3000/course/overview?type=2"
        />
        <CardGroup data={data[3]} />
      </div>
    </>
  )
}
