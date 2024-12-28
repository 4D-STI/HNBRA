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
import noticiasDoCerradoCapa from "@/public/images/noticias_do_cerrado/noticias_do_cerrado_capa_cardWithMultimedia_arara_450x200.png"
import Link from "next/link"
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

      {/* todo: link para lista com todas as edições da revista */}
      <Link href={"#"}>
        <Image
          src={noticiasDoCerradoCapa}
          alt={"capa da revista notícias do cerrado"}
          height={200}
          className="rounded-t-xl"
        />
      </Link>

      {/* todo: link para edição especifica ndc17 */}
      <Link href={"#"}>
        <CardHeader>
          <CardTitle>Revista Notícias do Cerrado</CardTitle>
          <CardDescription
            className="hover:underline underline-offset-4 hover:text-blue-600"
          >
            Última edição: NdC17 | DEZEMBRO | 2024 | Com7ºDN
          </CardDescription>
        </CardHeader>
      </Link>
      
    </Card>
  )
}
