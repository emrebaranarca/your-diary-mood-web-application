import axios from 'axios'


const MoodCardForm=()=>{
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const moodData = {
            feel: e.target.elements.feel.value,
            note: e.target.elements.note.value
        }
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            const res=await axios.post('http://localhost:3000/api/v1/moodCard/create-moodCard',
                moodData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            )
            window.location.reload()
        } catch (error) {
            alert(error.response.data.message)
            console.error(error.response.data.message)
        }

    }

    return (
        <>
            <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Your Feel</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Happy" name="feel" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Note</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Today is the best day in my life" name="note"></textarea>
                    </div>

                    <div className="mb-3 mx-auto">
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-dark" type="submit">ADD</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}


export default MoodCardForm