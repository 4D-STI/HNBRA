import * as React from "react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,

} from "@/components/ui/card"
import Image from "next/image"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import {pracaPadraoType,servidorCivilPadraoType} from '@/app/components/utils/shadcn_demo_components/types/card_with_highlights_type'

type CardWithHighlightsType = {
  pracaPadrao?: pracaPadraoType,
  servidorCivilPadrao?: servidorCivilPadraoType,
}

export function CardWithHighlights({pracaPadrao, servidorCivilPadrao}: CardWithHighlightsType) {
  
  if (pracaPadrao) {
    return (
      <Card className="w-[300px] h-[291px]">

          {/* container foto */}
          <div 
            id="praca-padrao-image-container"
            className="relative w-full h-2/3 bg-red-400 rounded-t-xl"
          >
          
            {/* foto */}
            <Image
              src={pracaPadrao.image}
              alt={`foto do praça padrão ${pracaPadrao.name}`}
              // width={100}
              // height={100}
              fill
              objectFit="cover"
              className="rounded-t-xl"
            />

          </div>
          
        
        {/* conteudo */}
        <CardHeader>
          
          {/* sigla + nome */}
          <CardTitle
            className="text-sm font-bold"
          >
            {`${pracaPadrao.sigla.toLocaleUpperCase()} ${pracaPadrao.name.toUpperCase()}`}
          </CardTitle>
          
          {/* patente */}
          <CardTitle
            className="text-xs"
          >
            {pracaPadrao.patente.toUpperCase()}
          </CardTitle>
          
          {/* descrição */}
          <CardDescription 
            className="text-xs"
          >
            {pracaPadrao.description.toUpperCase()}
          </CardDescription>

        </CardHeader>

      </Card>
    )
  }

  if (servidorCivilPadrao) {
    return (
      <Card className="w-[300px]">
        
        {/* foto container */}
        <div id="servidor-padraoimage-container" className="relative w-full h-2/3 bg-red-100 rounded-t-xl">
          {/* foto */}
          <Image
            src={servidorCivilPadrao.image}
            alt={`foto do servidor(a) civil padrão ${servidorCivilPadrao.name}`}
            className="rounded-t-xl"
            fill
            objectFit="cover"
          />
        </div>
        
        {/* conteudo */}
        <CardHeader>
          
          {/* sigla + nome */}
          <CardTitle
            className="text-sm font-bold"
          >
            {`${servidorCivilPadrao.sigla.toUpperCase()} ${servidorCivilPadrao.name.toUpperCase()}`}
          </CardTitle>

          {/* cargo */}
          <CardTitle
            className="text-xs"
          >
            {servidorCivilPadrao.role.toUpperCase()}
          </CardTitle>

          {/* descrição */}
          <CardDescription
            className="text-xs"
          >
            {servidorCivilPadrao.description.toUpperCase()}
          </CardDescription>

        </CardHeader>

      </Card>
    )
  }
  
  
  
}
