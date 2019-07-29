import Token from './Token'
import AppStorage from './AppStorage'
import Exception from './Exception'

class User {
    login(data){
       
        axios.post('/api/auth/login', data)
        .then(res => { this.responseAfterLogin(res) })
        .catch(error => {Exception.handle(error.response.data) })
    }
    responseAfterLogin(res){
        const access_token = res.data.access_token;
        const username = res.data.user;
        if(Token.isValid(access_token)){
            AppStorage.store(username, access_token);
            window.location = '/forum'
        }
    }

    hasToken(){
        const storedToken = AppStorage.getToken();
        
        if(storedToken){
            return Token.isValid(storedToken) ? true : User.logout()
        }
        return false;
    }

    loggedIn(){
        return this.hasToken()
    }

    logout(){
        AppStorage.clear()
        window.location = '/forum'
    }

    name(){
        if(this.loggedIn()){
            return AppStorage.getUser();
        }
    }

    id(){
        if(this.loggedIn()){
            const payload = Token.payload(AppStorage.getToken())
            return payload.sub
        }
    }

    own(id){
        if(this.id() == id){
            return true;
        } 
        return false;
    }
}

export default User = new User()
