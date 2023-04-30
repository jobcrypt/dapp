


const Wrapper = (props) =>{
   const { children, width, height, position } = props;

   const styles = {
    width: width || '100%',
    minHeight: height || '630px',
    display: 'flex',
    justifyContent: position || 'center',
    alignItems: position || 'center',
    flexDirection: 'column',
    msFlexDirection: 'column',
    rowGap: '10px',
    overflow: 'hidden'
    // backgroundColor: 'red'
   }


   return(
    <div style={styles}>
        {children}
    </div>
   )
}

export default Wrapper;