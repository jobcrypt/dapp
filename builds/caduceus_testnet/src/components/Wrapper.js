


const Wrapper = (props) =>{
   const { children } = props;

   const styles = {
    width: '100%',
    minHeight: '630px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    msFlexDirection: 'column',
    rowGap: '10px',
    // backgroundColor: 'red'
   }


   return(
    <div style={styles}>
        {children}
    </div>
   )
}

export default Wrapper;