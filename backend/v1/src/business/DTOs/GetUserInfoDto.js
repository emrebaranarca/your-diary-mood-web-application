class GetUserInfoDto{
    constructor(email,username,fullname,profilePicture) {
        this.email = email;
        this.username = username;
        this.fullname=fullname
        this.profilePicture=profilePicture
    }
}

module.exports=GetUserInfoDto