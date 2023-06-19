
/**
 * A React component that renders a window. 
 * @param children - The children of the window. 
 * @param title - The title of the window. 
 * @param headerColor - The color of the header. 
 * @param style - The style of the window. 
 * @param className - The class name of the window. 
 * @param smallTitle - The small title of the window. 
 * @returns A React component that renders a window. 
 */
export default function Window({children, title, headerColor, style, className='',smallTitle }) {
    return (
        <div className={`window ${className} `} style={style?{...style}:{}} >
            <header>
                <h3 className='title' style={headerColor?{color:headerColor}:{}}>{title}</h3>
            </header>
                {(smallTitle) && <h6 style={{textAlign:'center',margin:'0.5rem'}}>{smallTitle}</h6>}
            {children}
        </div>
    )
}
