import { Separator } from "@/components/ui/separator"
import ListFiles from "@/app/dashboard/filesManagement/listFiles"

export default function AdminUserPage() {
  return (
    <div id="filesManagement-page-container" className="space-y-6">
      <Separator />
      <ListFiles />
    </div>
  )
}
