import express from 'express'
import mydb from '../configs/mydb.js'
import mysql from 'mysql2'
import authenticate from '##/middlewares/Myauthenticate.js'
const router = express.Router()

router.get('/set_total_minute', async (req, res) => {
  const [rows] = await mydb.execute(
    `SELECT product.id, product.product_type,product.valid
    FROM product 
    WHERE product.product_type = 2
    AND product.valid = 1 `
  )
  rows.forEach(async (row) => {
    console.log('id', row.id)

    const [rows2] = await mydb.execute(
      `SELECT * FROM course_units WHERE course_id = ${row.id}`
    )
    row.units = rows2
    let total_minute = 0
    let total_second = 0
    for (const unit of rows2) {
      const [rows3] = await mydb.execute(
        `SELECT * FROM course_sub_units WHERE unit_id = ${unit.id}`
      )
      unit.sub_units = rows3
      for (const sub_unit of rows3) {
        let min = Number(sub_unit.video_len.split(':')[0])
        let sec = Number(sub_unit.video_len.split(':')[1])
        total_minute += min
        total_second += sec
      }
    }
    total_minute += Math.floor(total_second / 60)
    row.total_minute = total_minute
    await mydb.execute(
      `UPDATE course_product SET total_minute = ${total_minute} WHERE product_id = ${row.id}`
    )
  })
  res.status(200).send(rows)
})

router.get('/collectionBack', authenticate, async (req, res) => {
  const user_id = req.user.user_id
  const [rows] = await mydb.execute(
    `SELECT *,teacher.name as teacher_name FROM course_collection 
    JOIN product ON course_collection.pid=product.id
    JOIN course_product ON product.id=course_product.product_id 
    JOIN course_category ON course_product.category_id=course_category.id
    JOIN course_teacher ON course_product.teacher_id=course_teacher.id
    WHERE uid = ${user_id}`
  )
  res.send(rows)
})

router.get('/collection', async (req, res) => {
  const [rows] = await mydb.execute(`SELECT * FROM course_collection`)
  res.send(rows)
})

router.get('/addCollection', async (req, res) => {
  const { user_id, product_id } = req.query
  const [rows] = await mydb.execute(
    `SELECT * FROM course_collection WHERE uid = ${user_id} AND pid = ${product_id}`
  )
  if (rows.length === 0) {
    await mydb.execute(
      `INSERT INTO course_collection (uid, pid) VALUES (${user_id}, ${product_id})`
    )
    res.status(200).send({ message: 'add collection success' })
  } else {
    res.status(400).send({ message: 'already add collection' })
  }
})

router.get('/removeCollection', async (req, res) => {
  const { user_id, product_id } = req.query
  await mydb.execute(
    `DELETE FROM course_collection WHERE uid = ${user_id} AND pid = ${product_id}`
  )
  res.status(200).send({ message: 'remove collection success' })
})

router.get('/courseALL', async (req, res) => {
  const [rows] = await mydb.execute(
    `SELECT product.*, course_product.*, course_category.category_name, course_teacher.name AS teacher_name
    FROM product
    JOIN course_product ON product.id = course_product.product_id
    JOIN course_category ON course_product.category_id = course_category.id
    JOIN course_teacher ON course_product.teacher_id = course_teacher.id
    WHERE product.product_type = 2
    AND product.valid = 1`
  )
  res.status(200).send(rows)
})

router.get('/my_course', async (req, res) => {
  const [rows] = await mydb.execute(
    `SELECT * FROM \`order\` JOIN order_item ON order_item.order_id = \`order\`.id WHERE product_id BETWEEN 214 AND 273`
  )
  res.send(rows)
})

router.get('/teacher', async (req, res) => {
  const [rows] = await mydb.execute(`SELECT * FROM course_teacher`)
  res.status(200).send(rows)
})

router.get('/overview', async (req, res) => {
  const type = req.query.type || null
  const state = req.query.state || null
  const search = req.query.search || null
  const page = req.query.page || 1
  const sort = req.query.sort || 'DESC'
  console.log('state:', typeof state)

  const baseSQL = `
    SELECT product.*, course_product.*, course_category.category_name, course_teacher.name AS teacher_name
    FROM product
    JOIN course_product ON product.id = course_product.product_id
    JOIN course_category ON course_product.category_id = course_category.id
    JOIN course_teacher ON course_product.teacher_id = course_teacher.id
    WHERE product.valid = 1
    `

  let finalSQL = baseSQL
  let inserts = []

  if (type) {
    finalSQL += ` AND category_id = ${type}`
    // inserts.push(type)
  }
  if (search) {
    finalSQL += ` AND (product.name LIKE '${'%' + search + '%'}' OR course_teacher.name LIKE '${'%' + search + '%'}')`
    // inserts.push('%' + search + '%', '%' + search + '%')
  }

  if (state === '1') {
    finalSQL += ` ORDER BY student_num DESC`
  } else if (state === '2') {
    finalSQL += ` ORDER BY price ${sort}`
  } else if (state === '3') {
    finalSQL += ` ORDER BY created_at ${sort}`
  }
  let totalSQL = finalSQL
  const [total_data] = await mydb.execute(totalSQL)
  const total_page = Math.ceil(total_data.length / 12)

  if (page) {
    finalSQL += ` LIMIT 12 OFFSET ?`
    inserts.push((page - 1) * 12)
  }

  finalSQL = mysql.format(finalSQL, inserts)
  console.log('finalSQL:', finalSQL)

  try {
    const [results] = await mydb.execute(finalSQL)
    res.send({ results, total_page })
    // res.send(results)
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }
})

router.get('/', async (req, res) => {
  try {
    const num = req.query.num || 3
    const [newest] = await mydb.execute(
      `SELECT product.*, course_product.*, course_category.category_name, course_teacher.name AS teacher_name
      FROM product
      JOIN course_product ON product.id = course_product.product_id
      JOIN course_category ON course_product.category_id = course_category.id
      JOIN course_teacher ON course_product.teacher_id = course_teacher.id
      WHERE product.product_type = 2
      AND product.valid = 1
      ORDER BY created_at DESC
      LIMIT ${num}`
    )
    const [hot] = await mydb.execute(
      `SELECT product.*, course_product.*, course_category.category_name, course_teacher.name AS teacher_name
      FROM product
      JOIN course_product ON product.id = course_product.product_id
      JOIN course_category ON course_product.category_id = course_category.id
      JOIN course_teacher ON course_product.teacher_id = course_teacher.id
      WHERE product.product_type = 2
      AND product.valid = 1
      ORDER BY student_num DESC
      LIMIT ${num}`
    )
    const [handwriting] = await mydb.execute(
      `SELECT product.*, course_product.*, course_category.category_name, course_teacher.name AS teacher_name
      FROM product
      JOIN course_product ON product.id = course_product.product_id
      JOIN course_category ON course_product.category_id = course_category.id
      JOIN course_teacher ON course_product.teacher_id = course_teacher.id
      WHERE product.product_type = 2
      AND product.valid = 1
      AND course_product.category_id = 1
      LIMIT ${num}`
    )
    const [painting] = await mydb.execute(
      `SELECT product.*, course_product.*, course_category.category_name, course_teacher.name AS teacher_name
      FROM product
      JOIN course_product ON product.id = course_product.product_id
      JOIN course_category ON course_product.category_id = course_category.id
      JOIN course_teacher ON course_product.teacher_id = course_teacher.id
      WHERE product.product_type = 2
      AND product.valid = 1
      AND course_product.category_id = 2
      LIMIT ${num}`
    )
    res.send([newest, hot, handwriting, painting])
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }
})

router.get('/:id', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res.status(400).send({ message: 'Invalid ID' })
    return
  }
  if (req.params.id < 214 || req.params.id > 273) {
    res.status(404).send({ message: 'Not found' })
    return
  }
  const [rows] = await mydb.execute(
    `SELECT product.*, course_product.*, course_category.category_name as category, course_teacher.name AS teacher, course_teacher.image AS teacher_image,course_teacher.introduction AS teacher_introduction,
    course_news.title AS news_title, course_news.content AS news_content, course_news.date AS news_date
    FROM product  
    JOIN course_product ON product.id = course_product.product_id 
    JOIN course_category ON course_product.category_id = course_category.id
    JOIN course_teacher ON course_product.teacher_id = course_teacher.id
    JOIN course_news ON course_product.product_id = course_news.course_id
    WHERE product.product_type = 2
    AND product.valid = 1 
    AND product.id = ${req.params.id}`
  )
  rows[0].type = 'course'
  const [rows2] = await mydb.execute(
    `SELECT * FROM course_units WHERE course_id = ${req.params.id}`
  )
  rows[0].units = rows2
  for (const unit of rows[0].units) {
    const [rows3] = await mydb.execute(
      `SELECT * FROM course_sub_units WHERE unit_id = ${unit.id}`
    )
    unit.sub_units = rows3
  }
  if (rows.length === 0) {
    res.status(404).send({ message: 'Course Not found' })
    return
  }
  res.status(200).send(rows)
})

export default router
