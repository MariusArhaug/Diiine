import client from '../feathers';

export default function DinnersPage() {
    
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