import { Link,  useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError();
    // THROW this, when user inputs incorrect path
    // For example: /users/1 <- users route does not exist
    if (error.status === 404) return (
        <div className='ErrorPage'>
            <h1>Oy! 404 - Not Found</h1>
            <p>The requested page is not here</p>
            <Link to={"/"}> Return to Main page</Link>
        </div>
    );
    // Otherwise, in this assignment, we are dealing with
    // incorrect Contact ID

    // The error key-value pairs defined in Contacts.jsx
    return (
        <div className='ErrorPage'>
            <h1>({error.status}) {error.statusText}</h1>
            {error.data?.message && <p>{error.data.message}</p>}
            <Link to={"/"}> Return to Main page</Link>
        </div>
    );
}


