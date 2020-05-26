
import mongoose, {ConnectionOptions} from 'mongoose';
import config from './config/config';

//propiedad de typescript que sirve para indicarle para que se va a utilizar este objeto por eso se utiliza :
const DBoptions:ConnectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
mongoose.connect(config.DB.URI, DBoptions);

const connect = mongoose.connection;

connect.once('open', () => {
    console.log('Mongodb its OnFire!!')
});

connect.on('error', err => {
    console.log(err)
    process.exit(0);
});

