import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';
import MoodCard from "../components/MoodCard";
import MoodCardForm from "../components/MoodCardForm";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const getData = async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const res = await axios.get('http://localhost:3000/api/v1/get-user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setUserData(res.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!profilePicture) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const res = await axios.post('http://localhost:3000/api/v1/upload-profil-picture', formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', res.data);
      setUserData(prevData => ({
        ...prevData,
        profilePicture: res.data.fileName // Yeni dosya yolunu userData'ya ekleyin
      }));
      await getData()
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log('User Data Updated:', userData);
  }, [userData]);

  if (!userData) {
    return <p>Loading...</p>; // Veriler yüklenirken kullanıcıya bilgi ver
  }

  return (
    <>
      <Navbar />
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src={`http://localhost:3000/uploads/userProfileImages/${userData.profilePicture}`}alt="avatar"
                    className="rounded-circle img-fluid" style={{ width: '150px' }} />
                  <h5 className="my-3">{userData.fullname}</h5>
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                  <div className="d-flex justify-content-center mb-2">
                    <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFileChange}/>
                    <button onClick={handleFileUpload}>Upload Profile Pic</button>
                  </div>
                </div>
              </div>

              <MoodCardForm/>
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.fullname}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Username</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.username}</p>
                    </div>
                  </div>
                </div>
              </div>



              <MoodCard/>




              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
