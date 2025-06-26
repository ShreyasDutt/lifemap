"use client"
import { useEffect, useState } from "react"
import { SearchUser } from "@/app/actions/userActions"
import { User } from "lucide-react"
import Image from "next/image"

const SearchFilter = ({ filter }) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!filter) {
      setResults([])
      return
    }

    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await SearchUser(filter)
        setResults(res || [])
      } catch (err) {
        console.error("Failed to search users:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [filter])

  console.log(results);

  return (
    <div className="mt-2 space-y-2">
      {loading ? (
        <div>Searching...</div>
      ) : results.length === 0 ? (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <User className="w-4 h-4" />
          No users found
        </div>
      ) : (
        results.map((user) => (
          <div
            key={user._id}
            className="text-sm p-2 flex items-center gap-3 border rounded hover:bg-accent cursor-pointer"
            // Add logic here to add user to group on click
          >
            <Image src={user.profilepic} width={40} height={40} className="rounded-full" alt="ProfileImage"/>
            <div className="flex-col">
              <p>{user.firstname}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              </div>

          </div>
        ))
      )}
    </div>
  )
}

export default SearchFilter
