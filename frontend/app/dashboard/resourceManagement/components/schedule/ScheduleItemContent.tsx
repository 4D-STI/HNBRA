// Example usage in a parent component
import ScheduleItemTable from './ScheduleItemTable';
import { IScheduleItem } from './schedule_interface/scheduleInterface'

interface IscheduleItemContent {
    data: IScheduleItem[]
}

const ScheduleItemContent = ({data}: IscheduleItemContent) => {
    const scheduleData = [...data]    
    return (
        <table className="table-auto w-full bg-white/40">
            
            <thead>
                <tr className="bg-gray-100 text-nowrap text-center text-sm">
                    <th
                        onClick={(e) => console.log('quer filtar: ', e.currentTarget.innerText)}
                        className="px-4 py-2 w-[100px] ">Data do Agendamento</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[120px] ">Horário</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[80px] ">Responsável</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[70px] ">NIP</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[60px] ">Ramal</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[120px] ">Data de criação</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[120px] ">Tema</th>
                    <th
                        onClick={() => console.log('quer filtrar')}
                        className="px-4 py-2 w-[200px] ">Descrição</th>
                </tr>
            </thead>
            
            <tbody className='w-full'>
                
                {
                    scheduleData.map((item, index) => (
                        <ScheduleItemTable key={index} item={item}/>
                    ))
                }
            </tbody>
        </table>
    );
};

export default ScheduleItemContent;
