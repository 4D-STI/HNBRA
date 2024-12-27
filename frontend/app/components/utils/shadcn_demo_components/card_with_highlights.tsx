import * as React from "react"

import {
  Card,
  CardDescription,
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

export function CardWithHighlights() {
  return (
    <Card className="w-[180px]">
      <Image src={fotoDog} alt={"Foto da Divisão de Odontologia do Guará"} />
      <CardHeader>
        <CardTitle>SO-CO Albino</CardTitle>
        <CardTitle>Suboficial</CardTitle>
        <CardDescription>Destaque em liderança</CardDescription>
      </CardHeader>
    </Card>
  )
}
