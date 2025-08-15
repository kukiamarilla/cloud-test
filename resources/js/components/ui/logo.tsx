export const LogoText = () => {

    return (
        <div className='flex items-center gap-2 mb-2' style={{position: 'relative'}}>
            <div>
                <span className='text-4xl font-bold text-foreground'>escama</span>
                <span className='text-sm text-muted-foreground'> v0.1.0</span>
            </div>
            <span  style={{
                position: 'absolute', 
                bottom: '0px', 
                left: "2px",
                width: '15px',
                height: '3px',
                backgroundColor: '#11dd11',
                content: '""',
            }}/>
            <span  style={{
                position: 'absolute', 
                top: '7px', 
                right: '43px',
                width: '15px',
                height: '3px',
                backgroundColor: 'red',
                content: '""',
            }}/>
        </div>
    );
};