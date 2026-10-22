
import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        age: ""
    });
    const [search, setSearch] = useState("");

    function load() {
        fetch("http://localhost:3000/")
            .then(res => res.json())
            .then(setData);
    }

    useEffect(() => {
        load();
    }, []);

    function add() {
        if (!form.name || !form.email || !form.age) {
            alert("All fields are required");
            return;
        }

        if (!form.email.includes("@")) {
            alert("Enter a valid email");
            return;
        }

        if (isNaN(form.age) || Number(form.age) <= 0) {
            alert("Enter a valid age");
            return;
        }

        fetch("http://localhost:3000/add/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then(() => {
            setForm({ name: "", email: "", age: "" });
            load();
            alert("Student added successfully");
        });
    }

    function put(id) {
        const name = prompt("Enter name");
        const email = prompt("Enter email");
        const age = prompt("Enter age");

        if (!name || !email || !age) {
            alert("All fields are required");
            return;
        }

        if (!email.includes("@")) {
            alert("Enter a valid email");
            return;
        }

        if (isNaN(age) || Number(age) <= 0) {
            alert("Enter a valid age");
            return;
        }

        fetch("http://localhost:3000/update/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, age })
        }).then(() => load());
    }

    function del(id) {
        fetch("http://localhost:3000/delete/" + id, {
            method: "DELETE"
        }).then(() => load());
    }

    return (
        <div>
            <h1>Student Form</h1>

            <input
                placeholder="Name"
                value={form.name}
                onChange={e =>
                    setForm({ ...form, name: e.target.value })
                }
            />

            <input
                placeholder="Email"
                value={form.email}
                onChange={e =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <input
                placeholder="Age"
                value={form.age}
                onChange={e =>
                    setForm({ ...form, age: e.target.value })
                }
            />

            <button type="button" onClick={add}>Add</button>

            <hr />

            <input
                placeholder="Search by name"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <button
                onClick={() =>
                    setData([...data].sort((a, b) =>
                        a.name.localeCompare(b.name)
                    ))
                }
            >
                Sort by Name
            </button>

            {data
                .filter(s =>
                    s.name.toLowerCase().includes(search.toLowerCase())
                )
                .map(s => (
                    <div key={s._id}>
                        {s.name} - {s.email} - {s.age}

                        <button onClick={() => put(s._id)}>
                            Update
                        </button>

                        <button onClick={() => del(s._id)}>
                            Delete
                        </button>
                    </div>
                ))}
        </div>
    );
}

export default App;
