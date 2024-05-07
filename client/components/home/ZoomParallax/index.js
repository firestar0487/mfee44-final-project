import styles from './styles.module.scss'
import Picture1 from '@/public/images/common/banner2.png'
import Picture2 from '@/public/images/common/zoom/image1.png'
import Picture3 from '@/public/images/common/zoom/image2.png'
import Picture4 from '@/public/images/common/zoom/image3.png'
import Picture5 from '@/public/images/common/zoom/image4.png'
import Picture6 from '@/public/images/common/zoom/image5.png'
import Picture7 from '@/public/images/common/zoom/image6.png'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function Index() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  const blurValues = useTransform(scrollYProgress, [0, 1], ['0px', '20px'])

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ]

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale, filter: `blur(${blurValues})` }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: 'tween',
                delay: index * 1,
                duration: 1,
                ease: 'easeInOut',
              }}
              className={styles.el}
            >
              <div className={styles.imageContainer}>
                <Image src={src} fill alt="image" placeholder="blur" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
