import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const addFav = async (pid) => {
  try {
    const response = await fetch('http://localhost:3005/api/addFavorite', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pid }),
    })
    return await response.json()
  } catch (error) {
    console.error('Error adding to favorites:', error)
    return { status: 'error', message: 'Error adding to favorites' }
  }
}

// 定義 removeFav 函數
const removeFav = async (pid) => {
  try {
    const response = await fetch(`http://localhost:3005/api/deleteFavorite`, {
      method: 'DELETE', // 使用 DELETE 方法
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pid }),
    })
    return await response.json()
  } catch (error) {
    console.error('Error removing from favorites:', error)
    return { status: 'error', message: 'Error removing from favorites' }
  }
}

const Heart = ({ size = 20, color = 'red' }) => (
  <svg
    className="heart"
    viewBox="0 0 32 29.6"
    style={{ width: size, fill: color, stroke: 'red', position: 'relative' }}
  >
    <path d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 21.2 6.1-9.3 16-12.1 16-21.2C32 3.8 28.2 0 23.6 0z" />
  </svg>
)

const FavFcon = ({ id, favorites, setFavorites }) => {
  // 手動驗證當前token 確認燈狀態是否為訪客
  const [user, setUser] = useState({
    user_id: '',
  })

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

        setUser({ user_id: data.user_id })
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const isLoggedIn = !!user.user_id

  const handleTriggerFav = (pid) => {
    if (favorites.includes(pid)) {
      setFavorites(favorites.filter((v) => v !== pid))
    } else {
      setFavorites([...favorites, pid])
    }
  }

  const handleAddFav = async (pid) => {
    const res = await addFav(pid)

    if (res.status === 'success') {
      handleTriggerFav(pid)
      toast.success(`加入成功!`)
    }
  }

  const handleRemoveFav = async (pid) => {
    const res = await removeFav(pid)
    console.log(res.status)
    if (res.status === 'success') {
      handleTriggerFav(pid)
      toast.success(`取消成功!`)
    }
  }

  return (
    <>
      {favorites.includes(id) ? (
        <button
          style={{ padding: 0, border: 'none', background: 'none' }}
          onClick={() => {
            if (!isLoggedIn) {
              return toast.error('會員才能使用!')
            }
            handleRemoveFav(id)
          }}
        >
          <Heart />
        </button>
      ) : (
        <button
          style={{ padding: 0, border: 'none', background: 'none' }}
          onClick={() => {
            if (!isLoggedIn) {
              return toast.error('會員才能使用!')
            }
            handleAddFav(id)
          }}
        >
          <Heart color="white" />
        </button>
      )}
    </>
  )
}

export default FavFcon
