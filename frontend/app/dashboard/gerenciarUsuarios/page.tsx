import { Separator } from "@/components/ui/separator"
import ListUsers from "@/app/dashboard/gerenciarUsuarios/listUsers"

export default function AdminUserPage() {
  return (
    <div className="space-y-6">
    
      <Separator />
      <ListUsers />
    </div>
  )
}