"use client"

import { useEffect, useState } from "react"
import { Menu, MenuHandler, MenuList, MenuItem, Typography, Button, Avatar, Chip } from "@material-tailwind/react"
import { EnvelopeIcon, PhoneIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"
import myaxios from "@/utils/myaxios"

export function UserProfileMenu() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  // Demo profile image - this is a placeholder
  const demoProfileImage =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setLoading(true)
      myaxios
        .get("users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching user details:", error)
          setLoading(false)
        })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/auth/sign-in"
  }

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Handle image load error
  const handleImageError = () => {
    setImageError(true)
  }

  // Get status color based on role
  const getStatusColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "green"
      case "manager":
        return "blue"
      case "user":
        return "gray"
      default:
        return "gray"
    }
  }

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <div className="flex items-center gap-2 cursor-pointer rounded-full p-1 pr-2 hover:bg-gray-100 transition-colors">
          {imageError ? (
            <Avatar size="sm" variant="circular" className="border border-gray-200">
              {getInitials(user?.name)}
            </Avatar>
          ) : (
            <Avatar
              size="sm"
              variant="circular"
              alt={user?.name || "User"}
              className="border border-gray-200"
              src={demoProfileImage}
              onError={handleImageError}
            />
          )}
          <div className="hidden md:block">
            <Typography variant="small" color="blue-gray" className="font-medium">
              {loading ? "Loading..." : user?.name}
            </Typography>
          </div>
        </div>
      </MenuHandler>
      <MenuList className="w-72 p-0 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-6 space-y-2">
            <div className="animate-pulse rounded-full bg-gray-200 h-16 w-16"></div>
            <div className="animate-pulse rounded h-4 bg-gray-200 w-24 mt-2"></div>
            <div className="animate-pulse rounded h-3 bg-gray-200 w-32 mt-1"></div>
          </div>
        ) : user ? (
          <>
            {/* Banner and Avatar Section */}
            <div className="relative">
              <div className="h-20 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              {imageError ? (
                <Avatar
                  size="lg"
                  variant="circular"
                  className="absolute -bottom-6 left-4 border-4 border-white shadow-md"
                >
                  {getInitials(user.name)}
                </Avatar>
              ) : (
                <Avatar
                  size="lg"
                  variant="circular"
                  alt={user.name}
                  src={demoProfileImage}
                  className="absolute -bottom-6 left-4 border-4 border-white shadow-md"
                  onError={handleImageError}
                />
              )}
              <Chip
                value={user.role}
                color={getStatusColor(user.role)}
                size="sm"
                className="absolute bottom-1 right-2 capitalize"
              />
            </div>

            {/* User Info Section */}
            <div className="pt-8 pb-2 px-4">
              <Typography variant="h6" color="blue-gray" className="font-bold">
                {user.name}
              </Typography>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="h-4 w-4 text-blue-gray-500" />
                  <Typography variant="small" color="gray" className="font-normal">
                    {user.email}
                  </Typography>
                </div>

                {user.phone_number && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-blue-gray-500" />
                    <Typography variant="small" color="gray" className="font-normal">
                      {user.phone_number}
                    </Typography>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-blue-gray-500" />
                  <Typography variant="small" color="gray" className="font-normal">
                    ID: {user.id || "N/A"}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="border-t border-blue-gray-50 p-3 grid grid-cols-2 gap-2">
              <Button variant="outlined" color="blue-gray" size="sm" className="flex items-center justify-center gap-2">
                <Cog6ToothIcon className="h-4 w-4" />
                Settings
              </Button>

              <Button color="red" size="sm" onClick={handleLogout} className="flex items-center justify-center gap-2">
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </>
        ) : (
          <MenuItem className="p-4">
            <Typography variant="small" color="gray">
              No user data available
            </Typography>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}

export default UserProfileMenu
