import { useSelector } from 'react-redux';



import classes from '../styles/components/Layout.module.css';
import Footer from './Footer';
import Header from './Header';
import Header2 from './Header2';

const Layout = (props) =>{
    const { children } = props;
    const isConnected = useSelector(state=>state.meta.isConnected);

    return(
        <main className={classes.parent}>
            {!isConnected &&<Header />}
            {isConnected && <Header2 />}
            {children}
            <Footer />
        </main>
    )
}

export default Layout;