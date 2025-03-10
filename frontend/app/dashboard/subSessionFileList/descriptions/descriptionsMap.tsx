import SFH_Description from './SFH_Description'
import SEDIME_Description from './SEDIME_Description'
import PME_Description from './PME_Description'

export const descriptionMap = (title: string) => {
    switch (title) {
        case 'SERVICO_DE_FARMACIA_HOSPITALAR':
            return <SFH_Description/>
        case 'SEDIME':
            return <SEDIME_Description/>
        case 'PROGRAMA DE MEDICAMENTOS ESPECIAIS':
            return <PME_Description/>
        // case 'ORGANOGRAMA':
        //     return true
        default: return null
    }
    
}

export default descriptionMap
