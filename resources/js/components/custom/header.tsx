// @ts-ignore
import logo from '../../../img/escama-logo.svg';

export const Header = () => {
    return (
        <header className='flex flex-row items-center justify-between p-4'>
                <div className='flex flex-row items-center gap-2' style={{position: 'relative'}}>
                    <img src={logo} alt="logo" className='w-16 h-16' />
                    <span className='text-2xl font-bold'>escama</span>
                    <span className='text-sm text-gray-500' style={{position: 'absolute', bottom: '18px', left: 'calc(100% + 10px)'}}>v0.1.0</span>
                    <span  style={{
                        position: 'absolute', 
                        bottom: '18px', 
                        left: "calc(64px + 0.5rem + 2px)",
                        width: '10px',
                        height: '2px',
                        backgroundColor: '#11dd11',
                        content: '""',
                    }}/>
                    <span  style={{
                        position: 'absolute', 
                        top: '24px', 
                        // left: "calc(64px + 0.5rem + 12px)",
                        right: '1px',
                        width: '10px',
                        height: '2px',
                        backgroundColor: 'red',
                        content: '""',
                    }}/>
                </div>
            </header>
    )
}