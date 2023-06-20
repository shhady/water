/**
 * A wrapper for the Form component that adds a title to the form.       
 * @param {string} title - the title to display for the form.       
 * @param {React.ReactNode} children - the children to render in the form.       
 * @param {string} [className] - the class name to apply to the form.       
 * @param {object} [style] - the style to apply to the form.       
 * @returns None       
 */
export function FormWrapper({ title, children ,className,style}) {
    return (
      <>
        <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
          {title}
        </h2>
        <div className={className?className:null} style={style?{...style}:{}} >
          {children}
        </div>
      </>
    )
  }