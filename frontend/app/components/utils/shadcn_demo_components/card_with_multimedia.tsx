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
import Image from "next/image"
import fotoDog from "@/public/images/dog/dog-foto.jpg"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

export function CardWithMultiMedia() {
  return (
    <Card className="w-[450px]">
      <Image src={fotoDog} alt={"Foto da Divisão de Odontologia do Guará"} />
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
    </Card>
  )
}
