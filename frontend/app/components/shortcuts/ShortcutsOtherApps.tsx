import {Button} from '@/components/ui/button'
import Image from 'next/image'

import {shortcutsOtherAppsData} from './utils/shortcutsOtherAppsData'
import Link from 'next/link'

const DEFAULT_ICON = '/icons/default.svg'

function ShortcutsOtherApps() {

    return (
        <>
            {shortcutsOtherAppsData.map((app, index) => (
                <div 
                    key={index}
                    id='shortcut-buttons-main-container'
                    className='flex flex-col items-center justify-center'
                >
                    <Button
                        key={index}
                        className='items-center h-20 w-20 bg-blue-200 hover:bg-blue-300 border-2 border-blue-800 rounded-full'
                    >

                        <Link
                            href={app.link}
                            target='blank'
                        >
                            <Image
                                alt={`logo_${index}`}
                                src={ app.icon_path_jpg || app.icon_path_svg || DEFAULT_ICON}
                                width={100}
                                height={100}
                            />
                        </Link>
                    </Button>
                    <span className='font-bold text-black text-xs text-wrap mt-1'>
                        {app.name.toUpperCase()}
                    </span>
                </div>
          ))}
        </>
    )
}

export default ShortcutsOtherApps
