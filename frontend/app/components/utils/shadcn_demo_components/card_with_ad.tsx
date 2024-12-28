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
import Link from "next/link";
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
  link: string
}

export function CardForAdvertisement({session, content, link}: CardForAdvertisementType) {
  return (
    <Link href={link} target="blank">
      <Card className="w-[400px] h-[80px]">
        <CardHeader>
          <CardTitle>{session}</CardTitle>
          <CardDescription className="hover:underline underline-offset-4 hover:text-blue-600">{content}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
