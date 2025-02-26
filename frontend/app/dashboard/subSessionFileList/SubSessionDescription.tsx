import { descriptionMap } from './descriptions/descriptionsMap'

interface ISubSessionDescription {
    title: string
}

export const SubSessionDescription = ({title}: ISubSessionDescription) => {
    if (!descriptionMap(title)) return null
    
    return (
        <div className="">
            {descriptionMap(title) && (
                <div id="description-container" className="py-4 px-8 bg-white shadow-lg rounded-lg">
                    {descriptionMap(title)}
                </div>
            )}
        </div>
    )
}
