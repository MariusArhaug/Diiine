import client from '../feathers';

export const DinnersPage = () => {
    
    const findDinners = () => {
        const result = client.service('dinners').find().catch(e => {console.log('error', e);});
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