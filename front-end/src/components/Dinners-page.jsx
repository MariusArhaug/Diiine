import client from '../feathers';

export const DinnersPage = () => {
    
    const findDinners = () => {
        const result = client.service('dinners').find();
        console.log(result);
    }
    return (
        <div>
            <button onClick={findDinners}>
                Find dinners!
            </button>
        </div>
    );
}