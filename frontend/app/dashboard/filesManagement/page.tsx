// import { Separator } from "@/components/ui/separator"
import ListFiles from "@/app/dashboard/filesManagement/listFiles"

export default function AdminUserPage() {
  return (
    <div id="filesManagement-page-container" className="space-y-6 mt-10">
      {/* <Separator /> */}
      <ListFiles />
    </div>
  )
}
