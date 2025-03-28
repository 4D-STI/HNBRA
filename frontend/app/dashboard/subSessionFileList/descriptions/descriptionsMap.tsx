import SFH_Description from './SFH_Description'
import SEDIME_Description from './SEDIME_Description'
import PME_Description from './PME_Description'

interface IDescriptionMapProps {
    id: string
}

export const descriptionMap = ({id}: IDescriptionMapProps) => {
    switch (id) {
        case '122':
            return <SFH_Description/>
        case '167':
            return <SEDIME_Description/>
        case '172':
            return <PME_Description/>
        // case 'ORGANOGRAMA':
        //     return true
        default: return null
    }
    
}

export default descriptionMap
