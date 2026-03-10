// src/useMockData.js
import { useEffect, useState } from 'react'

function useMockData() {
    const [data, setData] = useState([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/mockData.json')
                const result = await response.json()
                setData(result)
            } catch (err) {
                console.error(err)
                setError('Failed to fetch data')
            }
        }

        fetchData()
    }, [])

    return { data, error }
}

export default useMockData
