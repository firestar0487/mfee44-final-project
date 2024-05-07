import React, { useState, useEffect } from 'react'
import MyCardGroup from '@/components/course/my-card-group.js'

export default function CourseUserPage() {
  // user course
  const [login, setLogin] = useState(false)
  const [courseOrder, setCourseOrder] = useState([])
  const [courseALL, setCourseALL] = useState([])

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
  console.log('myCourseALL', myCourseALL)
  // user course end

  return (
    <>
      <div>
        <p className="text-h1 d-flex justify-content-center mb-5">我的課程</p>
      </div>
      <MyCardGroup data={myCourseALL} />
    </>
  )
}
