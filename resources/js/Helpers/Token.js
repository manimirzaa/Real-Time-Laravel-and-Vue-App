class Token{

    isValid(token){
        const payload = this.payload(token);
        if(payload){
            return payload.iss == "http://realtimeapp.test/api/auth/login" ? true : false
        } 
        return false;
    }

    payload(token){
        const payload = token.split('.')[1];
        return this.decode(payload);        
        
    }

    decode(paylod){
        return JSON.parse(atob(paylod));
    }

}

export default Token = new Token();