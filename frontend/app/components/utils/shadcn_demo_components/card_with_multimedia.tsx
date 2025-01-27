import * as React from "react"

// import { Button } from "@/components/ui/button"
import {
  Card,
  // CardContent,
  // CardDescription,
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
const URL_NOTICIAS_DO_CERRADO = "https://www.ceimbra.mb/cerrado"
// const URL_NOTICIAS_DO_CERRADO_API = "/dashboard/subSessionFileList?SubSessionFileList_name=NOTICIAS_DO_CERRADO"

export function CardWithMultiMedia() {
  return (
    <Card className="w-full h-[291px]">

      {/* todo: link para lista com todas as edições da revista */}
      <Link href={URL_NOTICIAS_DO_CERRADO} target="_blank">
        <div
          className="relative w-full h-2/3 bg-red-400 rounded-t-xl"
        >
          <Image
            src={noticiasDoCerradoCapa}
            alt={"capa da revista notícias do cerrado"}
            // height={200}
            fill
            objectFit="cover"
            className="rounded-t-xl"
          />
        </div>
      </Link>

      {/* todo: link para edição especifica ndc17 */}
      <Link 
        href={URL_NOTICIAS_DO_CERRADO}
        target="_blank"
        className="flex h-1/3 flex-col hover:underline underline-offset-4 hover:text-blue-600 font-bold items-center justify-center"
      >
        <CardHeader>
          <CardTitle>Revista Notícias do Cerrado</CardTitle>
          {/* <CardDescription
            className="hover:underline underline-offset-4 hover:text-blue-600"
          >Revista Notícias do Cerrado</CardDescription> */}
        </CardHeader>
      </Link>
    </Card>
  )
}
