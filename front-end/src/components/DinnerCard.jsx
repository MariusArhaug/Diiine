
export const DinnerCard = (dinner) => {

    return (
        <div class="card">
            <img src={dinner.picture} alt="Meal" style={{width: "100%"}} />
            <div class="container">
                <h4><b>{dinner.name}</b></h4>
                <p>{dinner.description}</p>
            </div>
            
        </div>
        
    );
}