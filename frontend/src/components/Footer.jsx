
function Footer() {

    return (
        <>
            <footer className="bg-dark text-center text-light text-lg-start" style={{
                position: 'fixed',
                bottom: '0',
                width: '100%'
            }}>
                <div className="text-center p-3" style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                }}>
                    © 2023 Copyright:  
                    <a className="text-light" href="https://github.com/AsyncXeNo/AttendanceAutomationSystem" style={{
                        textDecoration: 'none'
                    }}> AAS</a>
                </div>
            </footer>
        </>
    )
    
}

export default Footer