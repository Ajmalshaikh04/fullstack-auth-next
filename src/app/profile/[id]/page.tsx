const UserProfile = ({params}:any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr/>
        <p className="p-2 text-4xl">Profile page
        <span className="p-2 ml-2 font-semibold text-black bg-yellow-400 rounded-xl">
        {params.id}
        </span>
        </p>
    </div>
  )
}

export default UserProfile