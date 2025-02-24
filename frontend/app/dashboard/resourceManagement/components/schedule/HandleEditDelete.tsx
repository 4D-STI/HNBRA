import {
    // Pencil,
     X} from 'lucide-react'
import { handleDelete } from './utils/handleDelete'
import useScheduleContext from '@/app/custom_hook/useScheduleContext'

interface HandleEditDeleteProps {
    scheduleId: number;
    token: string
  }

export const HandleEditDelete: React.FC<HandleEditDeleteProps> = ({scheduleId, token}) => {
    const {updateScheduleData} = useScheduleContext()
    return (
        <>
            <td className='flex flex-row justify-center content-center'>
                {/* editar */}
                {/* <button className='hover:bg-blue-300 p-2 rounded-xl'
                    onClick={() => ''}
                >
                    <Pencil/>
                </button> */}
                {/* deletar */}
                <button className='hover:bg-red-400 p-2 rounded-xl'
                    onClick={() => (
                        handleDelete(scheduleId, token),
                        updateScheduleData()
                    )}
                >
                    <X/>
                </button>
            </td>
        </>
    )
}
