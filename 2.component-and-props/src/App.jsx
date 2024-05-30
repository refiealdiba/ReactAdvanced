// menggunakan arrow function untuk deklarasi component
const Button = (props) => {
    // membuat nilai default dari props dengan cara destructuring object
    const { children = "...", variant = "bg-black" } = props;
    return (
        <button
            className={`h-10 px-6 font-semibold rounded-md ${variant} text-white`}
            type="submit"
        >
            {/* menggunakan children untuk mengisi seperti tag html pada pemanggilan component*/}
            {children}
        </button>
    );
};

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
