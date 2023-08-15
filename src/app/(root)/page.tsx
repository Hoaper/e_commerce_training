import {UserButton} from "@clerk/nextjs"

export default function RootPage() {
    return (
        <div className="p-2">
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}
  