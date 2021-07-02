export const authController = {
    
    async signin(email,password){
        const response = await fetch(`http://localhost:8000/api/v1/auth/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: "include",
            body: JSON.stringify({
                email,
                password
            })
        });

        if(!response.ok){
            return false;
        }

        const content = await response.json();
        
        return {user:content.user, messages:content.messages};
        
    },

    async signup(name,surname,email,password){
        const response = await fetch(`http://localhost:8000/api/v1/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                name,
                surname,
                email,
                password,
            })
        });
        if(!response.ok){
            return false;
        }
        const content = await response.json();

        return content.user;
    },

    async signout(){
        const response = await fetch('http://localhost:8000/api/v1/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if(!response.ok){
            return false;
        }

        return true;
        
    },

    async me(){
        const response = await fetch('http://localhost:8000/api/v1/auth/me', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if(!response.ok){
            return false;
        }
        
        const content = await response.json();

        return content.user;

    }
} 