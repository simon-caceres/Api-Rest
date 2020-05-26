import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authroutes from './routes/out.routes';
import passport from 'passport';
import passportMiddle from './middlewares/passport'
import privRoutes from './routes/priv.routes'
//iniciadores
const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddle);
//rutas
app.get('/', (req,res) => {
    res.send(`API is at http://localhost:${app.get('port')}`)
} );
app.use(authroutes);
app.use(privRoutes);

export default app;