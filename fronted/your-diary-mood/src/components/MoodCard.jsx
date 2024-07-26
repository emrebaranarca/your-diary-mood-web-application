import axios from 'axios';
import { useEffect, useState } from 'react';

const MoodCard = () => {
  const [moodCards, setMoodCards] = useState([]);

  const getData = async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const res = await axios.get('http://localhost:3000/api/v1/moodCard/get-moodCards', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setMoodCards(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMoodCard = async (cardID) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/moodCard/delete-moodCard/${cardID}`);
      setMoodCards(moodCards.filter(mood => mood._id !== cardID));
      await getData()
    } catch (error) {
      console.error('Error deleting mood card:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="row">
        <br />
        {moodCards.map((mood, index) => (
          <div key={index} className="col-md-6">
            <br/>
            <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4"><span className="text-primary font-italic me-1">MOOD CARD</span></p>
                <hr />
                <p>{mood.feel}</p>
                <hr />
                <p>{mood.note}</p>
                <hr />
                <button onClick={()=>deleteMoodCard(mood.id)}><i class="fa-solid fa-trash"></i></button>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MoodCard;
