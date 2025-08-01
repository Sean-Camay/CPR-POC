import axios from 'axios'
import { useEffect, useState } from 'react'

interface TestViewProps {
  title?: string
}

interface Person {
  id: number
  name: string
  username: string
  email: string
}

export const TestView = ({ title }: TestViewProps) => {
  const [count, setCount] = useState(0)
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    const getPeople = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        )

        setPeople(response.data)

        console.log('People:', response.data)
      } catch (error) {
        console.error('Error fetching people:', error)
      }
    }

    getPeople()
  }, [])

  return (
    <div>
      <h1>{title ? title : 'Test View'}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.name} - {person.username} - {person.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
