// project import
import Routes from 'routes';
import ScrollTop from 'components/ScrollTop';
import Notistack from 'components/third-party/Notistack';


const App = () => (
    <ScrollTop >
        <Notistack>

            <Routes />
        </Notistack>
    </ScrollTop>
);

export default App;