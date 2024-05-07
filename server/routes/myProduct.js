import express from 'express'
import mydb from '##/configs/mydb.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    let sql = `SELECT 
      p.id AS product_id, p.name, p.product_type, p.price, p.description, p.image, p.updated_at,
      g.product_id, g.brand_id, g.nib_id, g.material_id, g.color_id, g.stock, g.series,
      b.brand_id, b.brand_name,
      n.nib_id, n.nib_name,
      m.material_id, m.material_name,
      c.color_id, c.color_name, c.color_bg
      FROM 
      product AS p
      INNER JOIN general_product AS g ON p.id = g.product_id
      INNER JOIN brand AS b ON g.brand_id = b.brand_id
      INNER JOIN nib AS n ON g.nib_id = n.nib_id
      INNER JOIN material AS m ON g.material_id = m.material_id
      INNER JOIN color AS c ON g.color_id = c.color_id
      WHERE product_type = 1`

    if (req.query.nibs) {
      const nibs = req.query.nibs
        .split(',')
        .map((nib) => `"${nib}"`)
        .join(',')
      sql += ` AND nib_name IN (${nibs})`
    }
    if (req.query.colors) {
      const colors = req.query.colors
        .split(',')
        .map((color) => `"${color}"`)
        .join(',')
      sql += ` AND color_name IN (${colors})`
    }
    if (req.query.brands) {
      const brands = req.query.brands
        .split(',')
        .map((brand) => `"${brand}"`)
        .join(',')
      sql += ` AND brand_name IN (${brands})`
    }
    if (req.query.materials) {
      const materials = req.query.materials
        .split(',')
        .map((material) => `"${material}"`)
        .join(',')
      sql += ` AND material_name IN (${materials})`
    }
    if (req.query.priceRange) {
      const [minPrice, maxPrice] = req.query.priceRange.split('-')
      sql += ` AND p.price BETWEEN ${minPrice} AND ${maxPrice}`
    }
    if (req.query.searchQuery) {
      const searchQuery = req.query.searchQuery
      sql += ` AND p.name LIKE '%${searchQuery}%'`
    }
    if (req.query.sortingOption === 'newest') {
      sql += ` ORDER BY p.updated_at ASC`
    }
    if (req.query.sortingOption === 'low-to-high') {
      sql += ` ORDER BY p.price ASC`
    }
    if (req.query.sortingOption === 'high-to-low') {
      sql += ` ORDER BY p.price DESC`
    }

    const [products] = await mydb.execute(sql)

    const [nibs] = await mydb.execute(`SELECT * FROM nib`)
    const [colors] = await mydb.execute(`SELECT * FROM color`)
    const [brands] = await mydb.execute(`SELECT * FROM brand`)
    const [materials] = await mydb.execute(`SELECT * FROM material`)
    const productsPerPage = 12
    const totalPages = Math.ceil(products.length / productsPerPage)

    res.send({
      products: products,
      nibs: nibs,
      colors: colors,
      brands: brands,
      materials: materials,
      totalPages: totalPages,
    })
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }
})

export default router
