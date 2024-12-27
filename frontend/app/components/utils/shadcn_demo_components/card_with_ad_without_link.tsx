import * as React from "react"

// import { Button } from "@/components/ui/button"
import {
  Card,
  // CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

type CardForAdvertisementType = {
  session: string;
  content: string;
}

export function CardForAdvertisementWithoutLink({session, content}: CardForAdvertisementType) {
  return (
      <Card className="w-[400px] h-[80px]">
        <CardHeader>
          <CardTitle>{session}</CardTitle>
          <CardDescription>{content}</CardDescription>
        </CardHeader>
      </Card>
  )
}
