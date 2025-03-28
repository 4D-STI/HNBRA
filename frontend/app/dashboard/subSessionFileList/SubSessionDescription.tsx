import { descriptionMap } from './descriptions/descriptionsMap'

interface ISubSessionDescription {
    id: string
}

export const SubSessionDescription = ({id}: ISubSessionDescription) => {
    if (!id || !descriptionMap({id})) return null
    
    return (
        <div className="">
            {descriptionMap({id}) && (
                <div id="description-container" className="py-4 px-8 bg-white shadow-lg rounded-lg">
                    {descriptionMap({id})}
                </div>
            )}
        </div>
    )
}
