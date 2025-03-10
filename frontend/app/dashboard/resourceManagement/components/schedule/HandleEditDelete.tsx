import {
    // Pencil,
     X} from 'lucide-react'
import { handleDelete } from './utils/handleDelete'
import useScheduleContext from '@/app/custom_hook/useScheduleContext'
import { ToastAction } from "@radix-ui/react-toast"
import { useToast } from '@/hooks/use-toast'

interface HandleEditDeleteProps {
    scheduleId: number;
    token: string
  }

export const HandleEditDelete: React.FC<HandleEditDeleteProps> = ({scheduleId, token}) => {
    const {updateScheduleData} = useScheduleContext()
    const { toast } = useToast()
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
                        // handleDelete(scheduleId, token),
                        toast(
                            {
                                variant: 'destructive',
                                title: 'Deletar o agendamento?',
                                description: 'Confirme para deletar o agendamento.',
                                action: <ToastAction 
                                            className="bg-white/80 text-black rounded-md py-2 px-4 hover:border-none transition-border-color ease-in" altText="Logar"
                                            onClick={async () =>  (
                                                await handleDelete(scheduleId, token),
                                                await updateScheduleData()   
                                            )}
                                            > DELETAR
                                        </ToastAction>
                            }
                        )
                    )}
                >
                    <X/>
                </button>
            </td>
        </>
    )
}
