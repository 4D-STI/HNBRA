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
                    <Link

                        href={app.link}
                        target='blank'
                    >
                        <Button
                            key={index}
                            className='items-center h-20 w-20 bg-blue-200 hover:bg-blue-300 hover:border-2 hover:border-blue-300 rounded-full shadow-xl mt-2'
                        >
                            <Image
                                alt={`logo_${index}`}
                                src={ app.icon_path_svg ||  app.icon_path_jpg || DEFAULT_ICON}
                                width={100}
                                height={100}
                            />
                        </Button>
                    </Link>
                    <span className='font-bold text-black text-xs text-wrap mt-1 text-center'>
                        {app.name.toUpperCase()}
                    </span>
                </div>
          ))}
        </>
    )
}

export default ShortcutsOtherApps
