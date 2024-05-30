import Button from "./components/Elements/Button";

function App() {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen gap-x-8">
                <Button variant="bg-red-700">Login</Button>
                <Button variant="bg-slate-700">Logout</Button>
                <Button></Button>
            </div>
        </>
    );
}

export default App;
